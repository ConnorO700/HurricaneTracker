import React, { useEffect, useState } from 'react'
import Table from '../components/TableView'
import { stormDetailColumns, tableCustomStyles } from '../consts/tableStormColumns'
import ApiEndpoints from '../ApiEndpoints'
import { useParams } from 'react-router-dom'
import Map from '../components/Map'

function GetColor(speed) {
	if (speed <= 40) {
		return "#f6fa00ff";
	}
	else if (speed <= 80) {
		return "#f87902ff";
	}
	else if (speed <= 120) {
		return "#ff0000ff";
	}
	else {
		return "#000000ff";
	}
}

function HurricaneView() {
	const { stormId } = useParams();
	const [stormData, setData] = useState([]);
	const [stormPath, setStormPath] = useState([{ key: 0, coords: [[0,0],[0,0]], color:"blue" }]);
	useEffect(() => {
		const fetchStorm = async () => {
			var result = await ApiEndpoints.GetStormById(stormId)
			setData(result);
			var sp =[];
			for (let i = 0; i < result.hurricaneDetails.length -1; i++){
				let hd = result.hurricaneDetails[i];
				let nexthd = result.hurricaneDetails[i+1];
				sp.push(
					{
						key: i,
						 coords: [[hd.longitude, hd.latitude],[nexthd.longitude, nexthd.latitude]],
						  color: GetColor(hd.windSpeed_Knots)
					}
				)
			}
			setStormPath(sp);
		}
		fetchStorm();
	}, [])
	return (
		<>
			<div>
				<Table title={`${stormData.name}'s Table`} data={stormData.hurricaneDetails} columns={stormDetailColumns} tableStyles={tableCustomStyles} />
				<Map title={`${stormData.name}'s Path`} stormPath={stormPath} />
			</div>
		</>
	)
}

export default HurricaneView