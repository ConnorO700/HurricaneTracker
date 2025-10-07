import React, {useState} from 'react'
import DataTable from 'react-data-table-component'

function TableView({title, data, columns, tableStyles}) {
	return (
		<>
        <section className={'bg-blue-100 px-4 py-10'}>
        <div className="container-xl m-auto">
            <h2 className={'text-3xl font-bold unicolorstxt mb-6 text-center'}>
            {title}
            </h2>
            <div className="container-xl rounded-lg lg:container m-auto">
            <DataTable columns = {columns}
            data = {data}
            defaultSortFieldId={1}
            pagination
            defaultPageSize={20}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
            highlightOnHover
            striped
            customStyles={tableStyles}
            /> 
            </div>
        </div>
        </section>
    </>
	)
}

export default TableView