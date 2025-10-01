import { Link } from 'react-router-dom';

const dateOptions = {
	month: 'numeric',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit'
};

/*
this file is for the column formatting for react-data-table-component
selectors will be sorted on, cells are for formating

*/

export const tableCustomStyles = {
	headRow: {
		style: {
			color: '#223336',
			backgroundColor: '#6bd0ffff'
		},
	},
	rows: {
		style: {
			color: 'black',
			backgroundColor: '#d1f5faff'
		},
		stripedStyle: {
			color: 'black',
			backgroundColor: 'white'
		}
	}
}

export const stormHeaderColumns = [
	{
		name: 'Name',
		selector: row => row.name,
		cell: cell => <div>
			<Link className='my-link'to={`/${cell.id}`}>
				{cell.name}
			</Link>
		</div>,
		sortable: true,
		reorder: true,
		width: "200px",
	},
	{
		name: 'Cyclone #',
		selector: row => row.atcfCycloneNumber,
		sortable: true,
		reorder: true,
		width: "100px",
	},
	{
		name: 'Basin',
		selector: row => row.basin,
		sortable: true,
		reorder: true,
		width: "100px"
	},
	{
		name: 'Year',
		selector: row => row.year,
		sortable: true,
		reorder: true,
		width: "100px",
	},
	{
		name: 'LandFallDate',
		selector: row => row.landFallDate,
		sortable: true,
		cell: cell => <div>
			{cell.landFallDate != '0001-01-01T01:00:00Z' ? new Date(cell.landFallDate).toLocaleDateString(navigator.language, dateOptions) : "N/A"}
		</div>,
		sortFunction: (rowA, rowB) => {
			const dateA = new Date(rowA.landFallDate);
			const dateB = new Date(rowB.landFallDate);
			return dateA.getTime() - dateB.getTime(); // Ascending order
			// For descending order: return dateB.getTime() - dateA.getTime();
		},
		reorder: true,
		width: "200px",
	},
	{
		name: 'Max Wind Speed',
		selector: row => row.maxWindSpeed_Knots,
		cell: cell => <div>
			{cell.maxWindSpeed_Knots} Knots
		</div>,
		sortable: true,
		reorder: true,
		width: "200px",
	}
];

export const stormDetailColumns = [
	{
		name: 'Date',
		selector: row => row.date,
		cell: cell => <div>{new Date(cell.date).toLocaleDateString(navigator.language, dateOptions)}</div>,
		sortable: true,
		sortFunction: (rowA, rowB) => {
			const dateA = new Date(rowA.date);
			const dateB = new Date(rowB.date);
			return dateA.getTime() - dateB.getTime();
		},
		reorder: true,
		width: "140px",
	},
	{
		name: 'Record Identifier',
		selector: row => row.recordIdentifier,
		sortable: true,
		reorder: true,
		width: "140px",
	},
	{
		name: 'System Status',
		selector: row => row.systemStatus,
		sortable: true,
		reorder: true,
		width: "130px",
	},
	{
		name: 'Latitude',
		selector: row => row.latitude,
		sortable: true,
		reorder: true,
		width: "100px",
	},
	{
		name: 'Longitude',
		selector: row => row.longitude,
		sortable: true,
		reorder: true,
		width: "110px",
	},
	{
		name: 'Wind Speed',
		selector: row => row.windSpeed_Knots,
		cell: cell => <div>{cell.windSpeed_Knots} Knots</div>,
		sortable: true,
		reorder: true,
		width: "140px",
	},
	{
		name: 'Minimum Pressure',
		selector: row => row.minimumPressure_Millibars,
		cell: cell => <div>{cell.minimumPressure_Millibars != -999 ? <div>{cell.minimumPressure_Millibars} Millibars</div> : <div>N/A</div>}</div>,
		sortable: true,
		reorder: true,
		width: "160px",
	},
	{
		name: 'Maximum Wind Radius',
		selector: row => row.maximumWindRadius_NM,
		cell: cell => <div>{cell.maximumWindRadius_NM != -999 ? <div>{cell.maximumWindRadius_NM} Nautical Miles</div> : <div>N/A</div>}</div>,
		sortable: true,
		reorder: true,
		width: "200px",
	}
	// I'm honestly not going to include all the windRadii stuff, 
	// I'm sure it's important but i don't know what to make of it and it would be a lot of copy-pasting

];