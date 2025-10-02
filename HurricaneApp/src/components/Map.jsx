import React, { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography, Line, Sphere, Marker } from '@vnedyalk0v/react19-simple-maps';
import startIcon from '../assets/s-start.png'
import endIcon from '../assets/e-end.png'
import MapLegend from './MapLegend';

const geoUrl = 'https://unpkg.com/world-atlas@2/countries-110m.json';
const dataCategories = [
	{ name: "WindSpeed > 120 Knots", color: "#000000ff" },
	{ name: "WindSpeed > 80 Knots", color: "#FF0000" },
	{ name: "WindSpeed > 40 Knots", color: "#FFA500" },
	{ name: "WindSpeed < 40 Knots", color: "#FFFF00" },
];
function Map({ title, stormPath }) {
	return (
		<>
			<h2 className={'text-3xl font-bold unicolorstxt mt-6 text-center'}>
				{title}
			</h2>
			<MapLegend dataCategories={dataCategories} />
			<ComposableMap
				projection="geoEqualEarth"
				projectionConfig={{
					scale: 147,
					center: [0, 0],
				}}
				width={600}
				height={400}
			>
				<Geographies geography={geoUrl}>
					{({ geographies }) =>
						geographies.map((geo, index) => (
							<Geography
								key={index}
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
				{
					stormPath.map((lineSegment) => (
						<Line
							key={lineSegment.id}
							coordinates={lineSegment.coords}
							stroke={lineSegment.color}
							strokeWidth={1}
							strokeLinecap="round"
						/>
					))}
				<Marker coordinates={stormPath[0].coords[0] ?? [0, 0]}>
					<image
						href={startIcon}
						x={-5} // Adjust x and y for image centering/positioning
						y={-5}
						width="10" // Set image width
						height="10" // Set image height
						alt={"start"}
					/>
				</Marker>
				<Marker coordinates={stormPath[stormPath.length - 1].coords[1] ?? [0, 0]}>
					<image
						href={endIcon}
						x={-5} // Adjust x and y for image centering/positioning
						y={-5}
						width="10" // Set image width
						height="10" // Set image height
						alt={"end"}
					/>
				</Marker>

				<Sphere stroke="#1a41f1ff" />
			</ComposableMap>
		</>
	)
}

export default Map