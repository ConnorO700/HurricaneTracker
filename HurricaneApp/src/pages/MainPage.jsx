import React, { useEffect, useState } from 'react'
import Table from '../components/TableView'
import { stormHeaderColumns, tableCustomStyles } from '../consts/tableStormColumns'
import ApiEndpoints from '../ApiEndpoints'

function MainPage() {
	const [area, setArea] = useState({
		"NorthLatitude": 31,
		"SouthLatitude": 24,
		"WestLongitude": -87,
		"EastLongitude": -79
	})
	const [apidata, setData] = useState([]);


	useEffect(() => {
		const fetchStorms = async () => {
			var result = await ApiEndpoints.GetStormsFromArea(area)
			setData(result)
		}
		fetchStorms();
	}, [])

	return (
		<>
			<Table title="Storm Table" data={apidata} columns={stormHeaderColumns} tableStyles={tableCustomStyles} />
		</>
	)
}

export default MainPage