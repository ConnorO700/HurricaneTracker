import React, { useEffect, useState } from 'react'
import Table from '../components/TableView'
import { stormDetailColumns, tableCustomStyles } from '../consts/tableStormColumns'
import ApiEndpoints from '../ApiEndpoints'
import { useParams } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Line } from '@vnedyalk0v/react19-simple-maps';
const geoUrl = 'https://unpkg.com/world-atlas@2/countries-110m.json';

function HurricaneView() {
	const { stormId } = useParams();
	const [stormData, setData] = useState([]);
	const [stormCoords, setStormCoords] = useState([]);
	useEffect(() => {
		const fetchStorm = async () => {
			var result = await ApiEndpoints.GetStormById(stormId)
			setData(result);
			const coords = result.hurricaneDetails.map((hd) =>{
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
				<ComposableMap
					projection="geoEqualEarth"
					projectionConfig={{
						scale: 147,
						center: [0, 0],
					}}
					width={800}
					height={500}
				>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									style={{
										default: { fill: '#D6D6DA', outline: 'none' },
										hover: { fill: '#F53', outline: 'none' },
										pressed: { fill: '#E42', outline: 'none' },
									}}
								/>
							))
						}
					</Geographies>
					<Line
						coordinates={stormCoords}
						stroke="#FF5533"
						strokeWidth={3}
						strokeLinecap="round"
					/>
				</ComposableMap>
			</div>
		</>
	)
}

export default HurricaneView