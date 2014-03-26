var stackexchanger = module.exports = {
	configure: require('./lib/configure'),
	authentication: require('./lib/authentication'),

	setup: function(opts) { return stackexchanger.configure.configure(opts); }
};