import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import { WebSiteContext } from './WebSiteStatsComponent';

const DateRangeComponent = () => {
  const context = useContext(WebSiteContext)
  return (
    context && 
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="WebSiteStat-From"
        endText="WebSiteStat-To"
        openTo="year"
        value={context.value}
        onChange={(newValue) => {
          context.setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 1 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  )
}

export default DateRangeComponent

