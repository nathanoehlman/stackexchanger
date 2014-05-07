var _ = require('lodash'),
    request = require('request'),
    util = require('util'),
    zlib = require('zlib'),
    Stream = require('stream'),
    configure = require('./configure');

/**
  Performs a request against the Stack Exchange API
 **/
exports.request = function(opts, callback) {
    if (!callback && typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    var destination = new ClearStream();
    destination.on('error', callback);
    destination.on('finish', function(data) {
        var json = JSON.parse(data);
        return callback(null, json.items, json, data);
    });

    var params = _.extend(_.pick(opts, 'url'), opts.opts || {}, { 
            headers: {'accept-encoding': 'gzip'}, 
            url: configure.getOptions().apiURL + opts.url
        });

    if (params.body) params.json = true;

    params.qs = params.qs || {};
    var payload = params[(params.form ? 'form' : 'qs')] = params[(params.form ? 'form' : 'qs')] || {};
    if (opts.site) {
        payload.site = opts.site;       
    }

    if (opts.access_token) {
        payload.access_token = opts.access_token;
        // Key is required
        if (!payload.key) {
            payload.key = configure.getOptions().key;
        }
    }

    return request(params)
        .pipe(zlib.createGunzip())
        .pipe(destination);
}

function ClearStream() {
    this.writable = true;
    this._data = "";
};
util.inherits(ClearStream, Stream);

ClearStream.prototype.write = function(chunk) {
    this._data += chunk.toString();
    return true;
}

ClearStream.prototype.end = function(data) {
    if (data) {
        this._data += data.toString();    
    }
    this.emit('finish', this._data);
}