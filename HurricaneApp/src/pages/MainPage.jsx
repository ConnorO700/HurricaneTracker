import React, { useEffect, useState } from 'react'
import Table from '../components/TableView'
import { stormHeaderColumns, tableCustomStyles } from '../consts/tableStormColumns'
import ApiEndpoints from '../ApiEndpoints'

function MainPage() {
	/* these coordates are meant to form a box such that
		31 North is the 31st N parallel
		24 South is the 24th N parallel
		-87 West is the 87th W meridian
		-79 East in the 79th W meridian
		
		where North is positive, South is negative, East is positive, West is negative.
	*/
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