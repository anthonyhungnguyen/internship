export default function Search() {
	return (
		<div className="flex border-b w-full justify-between">
			<input type="text" placeholder="enter device id" className="w-2/3 p-4" />
			<button className="p-4 mr-5 bg-blue-500 w-1/12 text-white font-bold">Search</button>
		</div>
	)
}
