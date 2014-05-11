exports.renderHome = function(req,res) {
	res.render('index');	
};

exports.setUserProfileDataInRequest = function(req,res,next) {
	console.log(req.user);
	res.locals.user = req.user;
	next();
};