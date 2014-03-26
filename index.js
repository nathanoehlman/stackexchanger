var stackexchanger = module.exports = {
	authentication: require('./lib/authentication'),
	configure: require('./lib/configure'),
	network: require('./lib/network'),
	site: require('./lib/site'),

	setup: function(opts) { return stackexchanger.configure.configure(opts); }
};