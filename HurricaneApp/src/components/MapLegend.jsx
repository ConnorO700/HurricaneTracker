import React from 'react'

function MapLegend({ dataCategories }) {
	return (
		<div className='flex justify-center'>
			{dataCategories.map((category, index) => (
				<div key={index} className='flex pr-4'>
					<div
						style={{
							width: "20px",
							height: "20px",
							backgroundColor: category.color,
							marginRight: "10px",
							border: "1px solid #eee",
						}}
					></div>
					<span>{category.name}</span>
				</div>
			))}
		</div>
	)
}

export default MapLegend