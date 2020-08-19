import MUIDataTable from 'mui-datatables'

const columns = [
	{
		name: 'userId',
		label: 'User ID',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'appId',
		label: 'App ID',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'totalAmount',
		label: 'Total Amount',
		options: {
			sort: true
		}
	}
]

const options = {
	download: false,
	print: false,
	isRowSelectable: false
}

const UserPayApp = ({ data }) => {
	return (
		<MUIDataTable title={'User Pay App'} data={data} columns={columns} options={options} className="w-2/3 my-2" />
	)
}

export default UserPayApp
