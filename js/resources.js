'use strict'
const {promisify} = require('util'),
	fs = require('fs'),
	readFile = promisify(fs.readFile)

exports.default = req => {
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