'use strict'
const chai = require('chai'),
	{expect} = chai,
	chaiHttp = require('chai-http'),
	express = require('express'),
	gitlabEvent = require('../js/gitlabEvent').default

chai.use(chaiHttp)

var lastPayload
const processEvent = payload => Promise.resolve(lastPayload = payload)

const app = express(),
	error = err => {throw err}
app.use(express.json())
app.use(gitlabEvent(processEvent))

const payload = {project:{path_with_namespace:'scope/my-project'}}

describe('gitlabEvent function returning express middleware', () => {
	beforeEach(() => lastPayload = undefined)
	it('uses "processEvent" function to process gitlab event', () =>
		chai.request(app).post('/').send(payload).then(
			() => {
				expect(lastPayload.package_scope).to.equal('scope')
			}, error
		)
	)
	it('creates middleware, which does create valid http resonse', () =>
		chai.request(app).post('/').send(payload).then(
			res => {
				expect(res).to.have.status(200)
				expect(lastPayload.package_scope).to.equal('scope')
			}, error
		)
	)
})
