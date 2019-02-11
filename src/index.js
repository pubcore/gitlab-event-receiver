import gitlabEvent from './gitlabEvent'
import login from './login'
import resources from './resources'

export default {
	login,
	resources,
	public:false,
	http: [
		{
			routePath: '/',
			map: gitlabEvent(() => {}),
			method: 'POST',
			accepted: ['application/json']
		}
	]
}

export {gitlabEvent, login, resources}