// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = require('../../lib/db')
const escape = require('sql-template-strings')

export default async (req, res) => {
	const bank = await db.query(escape`SELECT * FROM bank`)
	res.status(200).json({ bank })
}
