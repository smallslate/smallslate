var indexCtrl = require('../controller/indexCtrl');

module.exports = function(app) {
	//app.all('*',indexCtrl.setUserProfileDataInRequest);
	app.get('/',indexCtrl.renderHome);
};