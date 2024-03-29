'use strict'
const chai = require('chai'),
	{expect} = chai,
	chaiHttp = require('chai-http'),
	composition = require('@pubcore/node-composition').default,
	express = require('express'),
	{login, gitlabEvent, resources} = require('../js/index')

const compositionConf = {
		components:{'../js/index':{context_path:'/gitlab-event'}},
		componentDefault:{
			webhook_secret_path:`${__dirname}/secrets/webhook_secret`
		}
	},
	app = express()
app.use(composition(compositionConf, require))

chai.use(chaiHttp)
const error = err => {throw err}

describe('default export "pubcore component object" for gitlab request', () => {
	it('denies access, without valid token', () =>
		chai.request(app).post('/gitlab-event').send().then(
			res => {
				expect(res).to.have.status(403)
				expect(res.text).to.contain('access denied')
			}, error
		)
	)
	it('respond valid http', () =>
		chai.request(app).post('/gitlab-event')
			.set('X-Gitlab-Token', 'test!')
			.send({project:{path_with_namespace:'@scope/name'}}).then(
				res => {
					expect(res).to.have.status(200)
				}
			)
	)
	describe('named exports', () => {
		it('login', () => {expect(login).to.be.a('function')})
		it('gitlabEvent', () => {expect(gitlabEvent).to.be.a('function')})
		it('resources', () => {expect(resources).to.be.a('function')})
	})
})
