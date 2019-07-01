'use strict'

exports.default = process => (req, res) => {
	//https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#events
	var {body, component} = req,
		{project} = body,
		{path_with_namespace} = project,
		[package_scope, package_name] = path_with_namespace.split('/'),
		{config_module} = component || {}

	process({gitlabEvent:body, package_scope, package_name, config_module}).then(
		() => res.json({status:{code:'OK'}, result:{package_name, package_scope}}),
		() => res.status(500).send()
	)
}