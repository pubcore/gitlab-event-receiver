import {promisify} from 'util'
import fs from 'fs'
const readFile = promisify(fs.readFile)

export default req => {
	var webhook_secret,
		{component} = req,
		{webhook_secret_path} = component

	return Promise.all([
		new Promise((res, rej) =>
			readFile(webhook_secret_path, {encoding:'utf8'}).then(
				content => res(webhook_secret = content.trim()),
				err => rej(err)
			)
		)
	]).then(() => ({webhook_secret}))
}