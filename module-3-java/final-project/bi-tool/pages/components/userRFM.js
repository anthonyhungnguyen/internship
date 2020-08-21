import MUIDataTable from 'mui-datatables'

const columns = [
	{
		name: 'recency',
		label: 'Recency'
	},
	{
		name: 'frequency',
		label: 'Frequency'
	},
	{
		name: 'monetary',
		label: 'Monetary'
	},
	{
		name: 'rscore',
		label: 'R Score'
	},
	{
		name: 'fscore',
		label: 'F Score'
	},
	{
		name: 'mscore',
		label: 'M Score'
	},
	{
		name: 'rfmScore',
		label: 'RFM Score'
	}
]

const options = {
	download: false,
	print: false
}
const UserRFM = ({ data }) => {
	return (
		<MUIDataTable title={'User RFM'} data={[ data ]} columns={columns} options={options} className='w-2/3 my-2' />
	)
}

export default UserRFM
