/** qcircuit.js **/

var db = require("../../config/db.js");
var schemas = require("./schemas.js");
var _ = require("lodash");

var QCircuit = function (data) {
	this.data = this.sanitize(data);
}

QCircuit.prototype.data = {}

QCircuit.prototype.get = function (name) {
	return this.data[name];
}

QCircuit.prototype.set = function (name, value) {
	this.data[name] = value;
}

QCircuit.prototype.sanitize = function (data) {
	data = data || {};
	schema = schemas.qcircuitschema;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

QCircuit.prototype.save = function (callback) {
    var self = this;
    this.data = this.sanitize(this.data);
    var s = db.update('qcircuits', {id: this.data.id}, JSON.stringify(this.data));
}

QCircuit.findById = function (id) {
	var fnd = db.get('qcircuits', {id: id})
	if (fnd !== null) {
		return new QCircuit(JSON.parse(fnd));
	}
    else {
		return null;
	}
}

module.exports = QCircuit;