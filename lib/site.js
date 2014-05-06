var _ = require('lodash'),
	URL = require('url'),
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
		url: '/me',
		site: this._site,
		access_token: this._options.access_token
	}, function(err, data) {
		if (err) return callback(err);
		if (!data || data.length == 0) return callback();
		return callback(null, data[0]);
	});
}

/**
  Returns the user context for this site. Pass 'me' to use the current site user, or a valid user id
 **/
Site.prototype.user = function(uId) {
	return User(uId, this);
}

/**
  User context
 **/
function User(uId, site) {
	this._baseUrl = (uId === 'me' ? '/me' : '/users/' + uId);
	this.site = site;
}

/**
  Generic request method
 **/
User.prototype.request = function(method, opts, callback) {
	return api.request({
		url: this._baseUrl + '/' + method,
		site: this.site._site,
		access_token: this.site._options.access_token
	}, function(err, data) {
		if (err) return callback(err);
		if (!data || data.length == 0) return callback();
		return callback(null, data[0]);
	});	
}

module.exports = function(site, opts) {
	return new Site(site, opts);
}