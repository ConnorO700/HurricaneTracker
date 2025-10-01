import React, {useEffect, useState} from 'react'
import Table from '../components/TableView'
import { stormDetailColumns, tableCustomStyles } from '../consts/tableStormColumns'
import ApiEndpoints from '../ApiEndpoints'
import { useParams } from 'react-router-dom'

function HurricaneView() {
		const { stormId } = useParams();
		const [stormData, setData] = useState([]);

	useEffect(() => {
		const fetchStorm = async () => {
			var result = await ApiEndpoints.GetStormById(stormId)
			setData(result);
		}
		fetchStorm();
	}, [])
	return (
		<>
		<div>
			
			<Table title={`${stormData.name}'s Table`} data={stormData.hurricaneDetails} columns={stormDetailColumns} tableStyles={tableCustomStyles} />
			<div>might add a map here idk</div>
		</div>
		</>
	)
}

export default HurricaneView