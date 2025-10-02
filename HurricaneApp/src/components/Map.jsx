import React, {useEffect, useState} from 'react'
import { ComposableMap, Geographies, Geography, Line, Sphere, Marker } from '@vnedyalk0v/react19-simple-maps';
import startIcon from '../assets/s-start.png'
import endIcon from '../assets/e-end.png'
const geoUrl = 'https://unpkg.com/world-atlas@2/countries-110m.json';
function Map({ coords }) {
	return (
		<>
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
									hover: { fill: '#3e5bddff', outline: 'none' },
									pressed: { fill: '#1a41f1ff', outline: 'none' },
								}}
							/>
						))
					}
				</Geographies>
				<Line
					coordinates={coords}
					stroke="#FF5533"
					strokeWidth={3}
					strokeLinecap="round"
				/>
				<Marker coordinates={coords[0] ?? [0,0]}>
					<image
            href={startIcon}
            x={-7} // Adjust x and y for image centering/positioning
            y={-7}
            width="14" // Set image width
            height="14" // Set image height
            alt={"start"}
          />
				</Marker>
				<Marker coordinates={coords[coords.length -1] ?? [0,0]}>
					<image
            href={endIcon}
            x={-7} // Adjust x and y for image centering/positioning
            y={-7}
            width="14" // Set image width
            height="14" // Set image height
            alt={"end"}
          />
				</Marker>
				
				<Sphere stroke="#1a41f1ff" />
			</ComposableMap>
		</>
	)
}

export default Map