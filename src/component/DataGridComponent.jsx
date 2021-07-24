import { DataGrid } from "@material-ui/data-grid";


const DataGridComponent = ({ tableData, columns, pageSize, loading }) => {
    return (
         <DataGrid
            rows={tableData ?? []}
            columns={columns}
            pageSize={pageSize}
            loading={loading}
            checkboxSelection
        />
    )
}

export default DataGridComponent