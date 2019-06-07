'use strict'
const gitlabEvent = require('./gitlabEvent').default,
	login = require('./login').default,
	resources = require('./resources').default

module.exports = {
	gitlabEvent, login, resources,
	default:{
		login,
		resources,
		public:false,
		http: [
			{
				routePath: '/',
				map: gitlabEvent(() => Promise.resolve()),
				method: 'POST',
				accepted: ['application/json']
			}
		]
	}
}