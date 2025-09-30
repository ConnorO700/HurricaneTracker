import React, {useState} from 'react'
import DataTable from 'react-data-table-component'
const tableCustomStyles = {
    headRow: {
    style: {
        color:'#223336',
        backgroundColor: '#6bd0ffff'
    },
    },
    rows: {
    style: {
        color: 'black',
        backgroundColor: '#d1f5faff'
    },
    stripedStyle: {
        color: 'black',
        backgroundColor: 'white'
    }
    }
}

function TableView({title, data, columns}) {
	return (
		<>
        <section className={'bg-blue-100 px-4 py-10'}>
        <div className="container-xl m-auto">
            <h2 className={'text-3xl font-bold unicolorstxt mb-6 text-center'}>
            {title}
            </h2>
            <div className="container-xl lg:container m-auto">
            <DataTable columns = {columns}
            data = {data}
            defaultSortFieldId={1}
            pagination
            defaultPageSize={20}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
            highlightOnHover
            striped
            customStyles={tableCustomStyles}
            /> 
            </div>
        </div>
        </section>
    </>
	)
}

export default TableView