/** qgate.js **/

var db = require("../../config/db.js");
var schemas = require("./schemas.js");
var _ = require("lodash");

var QGate = function (data) {
	this.data = this.sanitize(data);
}

QGate.prototype.data = {}

QGate.prototype.get = function (name) {
	return this.data[name];
}

QGate.prototype.set = function (name, value) {
	this.data[name] = value;
}

QGate.prototype.sanitize = function (data) {
	data = data || {};
	schema = schemas.qgateschema;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

QGate.prototype.save = function (callback) {
    var self = this;
    this.data = this.sanitize(this.data);
    var s = db.update('qgates', {id: this.data.id}, JSON.stringify(this.data));
}

QGate.findById = function (id) {
	var fnd = db.get('qgates', {id: id})
	if (fnd !== null) {
		return new QGate(JSON.parse(fnd));
	}
    else {
		return null;
	}
}

module.exports = QGate;