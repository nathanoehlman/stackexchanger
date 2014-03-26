var _ = require('lodash'),
	URL = requrire('url'),
	api = require('./api');

function Site(site, opts) {

	if (site && site.indexOf('http') >= 0) {
		this._site = URL.parse(site).host;
	} else {
		this._site = site;
	}	

	this._options = opts;
}

/**
  Attempts to get a best guess profile for the user, by getting associated accounts using the current token and then
  loading the indicated profile
 **/
Site.prototype.me = function(callback) {
	return api.request({
		url: '/me/associated',
		site: this._site,
		access_token: this._options.accessToken
	}, callback);
}

module.exports = Site;