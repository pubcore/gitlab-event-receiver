export default (req, res, next) => {
	var token = req.get('X-Gitlab-Token'),
		{resources} = req,
		{webhook_secret} = resources

	if(!token || token != webhook_secret){
		res.status(403).json({status:{code:'ERROR', message:'access denied'}})
	}else{
		req.user = {}
		next()
	}
}