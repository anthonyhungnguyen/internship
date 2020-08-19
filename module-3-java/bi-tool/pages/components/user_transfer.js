import MUIDataTable from 'mui-datatables'

const columns = [
	{
		name: 'sender',
		label: 'Sender',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'receiver',
		label: 'Receiver',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'transId',
		label: 'Transaction ID',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'reqDate',
		label: 'Request Date',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'amount',
		label: 'Amount',
		options: {
			sort: true
		}
	}
]

const options = {
	download: false,
	print: false
}

const UserTransfer = ({ data }) => {
	return (
		<MUIDataTable title={'User Transfer'} data={data} columns={columns} options={options} className="w-2/3 my-2" />
	)
}

export default UserTransfer
