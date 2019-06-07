'use strict'
const resources = require( '../js/resources').default,
	{deepStrictEqual, rejects} = require('assert')

var req = {component:{
	webhook_secret_path:`${__dirname}/secrets/webhook_secret`}
}

describe('resource loader', () => {
	it('loads secret for webhook', () =>
		resources(req).then(
			res => deepStrictEqual(res, {webhook_secret:'test!'})
		)
	)
	it('rejects, if load failes', () =>
		rejects(
			resources({component:{webhook_secret_path:'/does/not/exists'}}),
			{name: 'Error'}
		)
	)
})