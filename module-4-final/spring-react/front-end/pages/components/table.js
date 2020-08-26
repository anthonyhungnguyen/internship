import { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'

const RenderTable = () => {
	const [ groups, setGroups ] = useState([])
	const columns = [ { name: 'name', label: 'Name' }, { name: 'Address', label: 'Address' } ]

	const options = {
		filterType: 'checkbox',
		onRowsDelete: (rowsDeleted, _) => {
			handleGroupDelete(rowsDeleted)
		}
	}

	useEffect(() => {
		const getAllGroups = async () => {
			const response = await fetch('http://localhost:8081/api/groups')
			const data = await response.json()
			const preprocessedData = data.map((d) => ({
				id: d.id,
				address: `${d.address || ''} ${d.city || ''} ${d.stateOrProvince || ''}`,
				name: d.name
			}))
			setGroups(preprocessedData)
		}
		getAllGroups()
	}, [])

	const deleteGroupById = async (id) => {
		await fetch(`http://localhost:8081/api/group/${id}`, {
			method: 'DELETE'
		})
	}

	const handleGroupDelete = (e) => {
		deleteGroupById(groups[e.data[0].index].id)
	}

	return <MUIDataTable title={'Group List'} data={groups} columns={columns} options={options} />
}

export default RenderTable
