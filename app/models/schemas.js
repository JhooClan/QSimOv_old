/** schemas.js **/

schemas = {
	qgateschema: {
		id: null,
		matrix: null,
		multiplier: null,
		size: null,
		name: null,
		desc: null
	},
	qginstanceschema: {
		id: null,
		qgateid: null,
		qbits: null
	},
	qcircuitschema: {
		id: null,
		name: null,
		desc: null,
		gates: null,
		nQBits: null,
		initV: null,
		timeLine: null
	}
}

module.exports = schemas;
