// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = require('../../lib/db')
const escape = require('sql-template-strings')
export default async (req, res) => {
	const { body } = req
	const bank_success = await db.query(escape`SELECT * FROM bank_success WHERE bank_code = ${body}`)
	res.status(200).json({ bank_success })
}
