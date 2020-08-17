// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = require('../../lib/db')
const escape = require('sql-template-strings')

export default async (req, res) => {
	const user_pay_app = await db.query(escape`SELECT * FROM user_pay_app WHERE user_id = ${req.body}`)
	res.status(200).json({ user_pay_app })
}
