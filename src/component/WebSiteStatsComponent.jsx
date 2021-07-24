import React, { useState, useEffect } from "react";
import axios from "axios";
import DateRangeComponent from "./DateRangeComponent";
import DataGridComponent from "./DataGridComponent";
import { Alert, Button, Snackbar } from "@material-ui/core";
import getCustomDate from "../utility/dateparser";


const URL = "http://45.79.111.106/interview.json";
const columns = [
  { field: "websiteId", headerName: "Website ID", width: 400 },
  { field: "chats", headerName: "Chats", width: 400 },
  { field: "missedChats", headerName: "Missed Chats", width: 600 },
];

export const WebSiteContext = React.createContext({})

const WebSiteStatsComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [value, setValue] = useState([null, null]);
  const [open, setOpen] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(async () => {
    try {
      await onShowAll()
      setOpen(false)
    } catch {
      setOpen(true)
    }
  }, []);


  const getData = async () => {
    try {
      setloading(true)
      let result = await axios.get(URL)
      setloading(false)
      return result.data.map((d, i) => ({ ...d, id: i, date: getCustomDate(d.date) }))
    } catch {
      setOpen(true)
    }
    setloading(false)
  }
  const getFilteredData = (formattedResult) => {
    return formattedResult
      .map((item) => item.websiteId)
      .filter((item, index, self) => self.indexOf(item) === index)
      .map((websiteId) =>
        formattedResult
          .filter((_item) => _item.websiteId === websiteId)
          .reduce(
            (r, c) => {
              r.chats += c.chats
              r.missedChats += c.missedChats
              r.websiteId = c.websiteId
              r.id = c.id
              r.date = c.date
              return r;
            },
            { chats: 0, missedChats: 0 }
          )
      );
  }

  const onFilter = async () => {
    try {
      let fromDate = new Date(value[0])
      let toDate = new Date(value[1])
      let response = await getData()
      let formattedResult = response
        .filter((_item) => _item.date >= fromDate && _item.date <= toDate);
      let data = getFilteredData(formattedResult)
      setTableData(data)
    } catch {
      setOpen(true)
    }
  }

  const onShowAll = async () => {
    try {
      let response = await getData()
      let data = getFilteredData(response)
      setTableData(data)
    } catch {
      setOpen(true)
    }
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <WebSiteContext.Provider value={{ setValue: setValue, value: value }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DateRangeComponent />
        <div style={{ margin: '10px' }}>
          <Button variant="contained"
            style={{ margin: '10px' }}
            onClick={onFilter}>Filter</Button>
          <Button variant="contained"
            style={{ margin: '10px' }}
            onClick={onShowAll}>Show All</Button>
        </div>
      </div>
      <div style={{ height: 700, width: "100%" }}>
        <DataGridComponent
          tableData={tableData}
          columns={columns}
          loading={loading}
          pageSize={10} />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={onClose} severity="error">
          Something went wrong! Please try again
        </Alert>
      </Snackbar>
    </WebSiteContext.Provider>
  );
};

export default WebSiteStatsComponent;
