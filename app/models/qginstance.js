/** qginstance.js **/

var db = require("../../config/db.js");
var schemas = require("./schemas.js");
var _ = require("lodash");

var QGInstance = function (data) {
	this.data = this.sanitize(data);
}

QGInstance.prototype.data = {}

QGInstance.prototype.get = function (name) {
	return this.data[name];
}

QGInstance.prototype.set = function (name, value) {
	this.data[name] = value;
}

QGInstance.prototype.sanitize = function (data) {
	data = data || {};
	schema = schemas.qgateschema;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

QGInstance.prototype.save = function (callback) {
    var self = this;
    this.data = this.sanitize(this.data);
    var s = db.update('qginstances', {id: this.data.id}, JSON.stringify(this.data));
}

QGInstance.findById = function (id) {
	var fnd = db.get('qginstances', {id: id})
	if (fnd !== null) {
		return new QGInstance(JSON.parse(fnd));
	}
    else {
		return null;
	}
}

module.exports = QGInstance;