const dateOptions = {
	month: 'numeric',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit'
};

export const StormColumns = [
	{
		name: 'Storm Id',
		selector: row => row.id,
		reorder: true,
		width: "240px",
	},
	{
		name: 'Name',
		selector: row => row.name,
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