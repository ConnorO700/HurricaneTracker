import React, { useEffect, useState } from 'react'
import Table from '../components/TableView'
import { stormDetailColumns, tableCustomStyles } from '../consts/tableStormColumns'
import ApiEndpoints from '../ApiEndpoints'
import { useParams } from 'react-router-dom'
import Map from '../components/Map'

function HurricaneView() {
	const { stormId } = useParams();
	const [stormData, setData] = useState([]);
	const [stormCoords, setStormCoords] = useState([]);
	useEffect(() => {
		const fetchStorm = async () => {
			var result = await ApiEndpoints.GetStormById(stormId)
			setData(result);
			const coords = result.hurricaneDetails.map((hd) => {
				return [hd.longitude, hd.latitude];
			})
			setStormCoords(coords);
		}
		fetchStorm();
	}, [])
	return (
		<>
			<div>

				<Table title={`${stormData.name}'s Table`} data={stormData.hurricaneDetails} columns={stormDetailColumns} tableStyles={tableCustomStyles} />
				<Map coords={stormCoords} />
			</div>
		</>
	)
}

export default HurricaneView