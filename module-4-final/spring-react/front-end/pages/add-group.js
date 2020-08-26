import Head from 'next/head'
import NavBar from './components/navbar'
import { useForm } from 'react-hook-form'

export default function AddGroup() {
	const { register, handleSubmit, errors } = useForm()
	const onSubmit = async (data) => {
		const response = await fetch('http://localhost:8081/api/group', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		const dataRes = await response.json()
		console.log(dataRes)
	}
	return (
		<div>
			<Head>
				<title>Add Group</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<NavBar />
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' id='name' ref={register({ required: true })} className='block' />
				<label htmlFor='address'>Address</label>
				<input type='text' name='address' id='address' ref={register} className='block' />
				<label htmlFor='city'>City</label>
				<input type='text' name='city' id='city' ref={register} className='block' />
				<label htmlFor='state'>State/Province</label>
				<input type='text' name='state' id='state' ref={register} className='block' />
				<label htmlFor='country'>Country</label>
				<input type='text' name='country' id='country' ref={register} className='block' />
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' name='postal' id='postal' ref={register} className='block' />
				<input type='submit' />
			</form>
		</div>
	)
}
