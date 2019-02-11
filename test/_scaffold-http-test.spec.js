import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import express from 'express'

chai.use(chaiHttp)

const app = express(),
	error = err => {throw err}
app.use((req, res, next) => {
	//add some test data to req object ..
	next()
})
app.use((req, res) => res.send('Hello World example'))

describe('stub', () => {
	it('response with Hello World', () => {
		return chai.request(app).get('/foo').send().then(
			res => {
				expect(res).to.have.status(200)
				expect(res.text).to.contain('Hello World example')
			}, error
		)
	})
})
