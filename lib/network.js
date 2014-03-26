var _ = require('lodash'),
	api = require('./api'),
	site = require('./site');
/**
  Attempts to get a best guess profile for the user, by getting associated accounts using the current token and then
  loading the indicated profile
 **/
exports.profile = function(accessToken, callback) {

	return api.request({
		url: '/me/associated',
		access_token: accessToken
	}, function(err, data) {
		if (err) return callback(err);
		if (!data || data.length === 0) return callback('Unable to determine profile');

		var account = data[0],
			siteApi = site(account.site_url, { access_token: accessToken });

		siteApi.me(function(err, profile) {
			if (err || !profile) return callback(err || 'Unable to get linked profile');
			profile.associated = data;
			return callback(null, profile);
		});
	});
}