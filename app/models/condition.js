/** condition.js **/

var db = require("../../config/db.js");
var schemas = require("./schemas.js");
var _ = require("lodash");

var Condition = function (data) {
	this.data = this.sanitize(data);
}

Condition.prototype.data = {}

Condition.prototype.get = function (name) {
	return this.data[name];
}

Condition.prototype.set = function (name, value) {
	this.data[name] = value;
}

Condition.prototype.sanitize = function (data) {
	data = data || {};
	schema = schemas.conditionschema;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Condition.prototype.save = function (callback) {
    var self = this;
    this.data = this.sanitize(this.data);
    var s = db.update('conditions', {id: this.data.id}, JSON.stringify(this.data));
}

Condition.findById = function (id) {
	var fnd = db.get('conditions', {id: id})
	if (fnd !== null) {
		return new Condition(JSON.parse(fnd));
	}
    else {
		return null;
	}
}

module.exports = Condition;