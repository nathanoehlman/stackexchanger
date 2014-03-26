var _ = require('lodash'),
	configure = require('./configure');

/**
  Attempts to convert a code to an access token

  Options
  	code (required) 
  	callbackURL
  	clientID
  	clientSecret
 **/
exports.token = function(opts, callback) {
	if (!opts || !opts.code || !opts.clientID || !opts.clientSecret) return callback('Invalid token options');

	var oauth = configure.getOAuth2(opts);
	return oauth.getOAuthAccessToken(
		opts.code, 
		{ grant_type: 'authorization_code', redirect_uri: opts.callbackURL || configure._options.callbackURL },
		callback
	);
}