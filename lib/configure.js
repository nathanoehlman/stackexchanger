var _ = require('lodash'),	
	OAuth2 = require('oauth').OAuth2,
	_options = {
		authorizationURL: 'https://stackexchange.com/oauth',
		tokenURL: 'https://stackexchange.com/oauth/access_token',
		apiURL: 'https://api.stackexchange.com'
	};


exports.configure = function(opts) {
	_options = _.extend(_options, opts);
}

exports.getOptions = function() {
	return _options;
}

exports.getOAuth2 = function(opts) {
	var params = _.extend(_options, opts);
	return new OAuth2(params.clientID, params.clientSecret, '', params.authorizationURL, params.tokenURL, params.customHeaders);
}