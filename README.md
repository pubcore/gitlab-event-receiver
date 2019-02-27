## Pubcore component to receive gitlab webhooks
This package can be used in context of @pubcore/node-composition.

#### Prerequisites
* latest versions of nodejs installed
* knowledge of expressjs

#### Example usage in context of a @pubcore/node-composition

	import {login, resources, gilabEvent} from '@pubcore/gitlab-event-receiver'

	//process gitlab event data
	const process = ({gitlabEvent, package_scope, package_name}) =>  
		new Promise((res, rej) => {... do something with given data ...})

	export default {
		login,
		resources,
		public:false,
		http: [
			{
				routePath: '/',
				map: gitlabEvent(process),
				method: 'POST',
				accepted: ['application/json']
			}
		],
		webhook_secret_path:'/path/to/authentication/token'
	}


#### Tested features

	default export "pubcore component object" express middleware
	✓ denies access, without valid token
	✓ respond valid http

	named exports
	✓ login
	✓ gitlabEvent
	✓ resources

	gitlabEvent function returning express middleware
	✓ uses "processEvent" function to process gitlab event
	✓ creates middleware, which does create valid http resonse

	resources loader
	✓ loads secret for webhook
	✓ rejects, if load failes

