var fs = require('fs');

var db = {
	data: require('./data.json'),
	getId: function (table, sch) {
		if (this.data.hasOwnProperty(table)) {
			for (var i=0, len=this.data[table].length; i < len; ++i) {
				var found = true;
				
				for (var k in sch) {
					if (sch.hasOwnProperty(k)) {
						if (this.data[table][i].hasOwnProperty(k)) {
						   if (this.data[table][i][k] !== sch[k]) {
							   found = false;
							   break;
						   }
						}
						else {
							console.log("Key " + k + " doesn't exist!");
							return null;
						}
					}
				}
				
				if (found) {
					return i;
				}
			}
		}
		else {
			console.log("Table " + table + " doesn't exists")
			return null;
		}
		return null;
    },
    get: function (table, sch) {
		var i = this.getId(table, sch);
		if (i !== null) {
			return JSON.stringify(this.data[table][i]);
		}
		else {
			return null;
		}
    }, 
    update: function(table, sch, data) {
		var i = this.getId(table, sch);
		if (i !== null) {
			this.data[table][i] = JSON.parse(data);
			console.log('Updated!');
		}
		else {
			if (!this.data.hasOwnProperty(table)) {
				console.log('Creating table...');
				this.data[table] = [];
			}
			console.log('Adding new item...');
			this.data[table].push(JSON.parse(data))
			i = this.data[table].length - 1;
		}
		
		fs.writeFile("./config/data.json", JSON.stringify(this.data), function(err) {
			if(err) {
				return console.log(err);
			}
		});
		return JSON.stringify(this.data[table][i]);
    }
};



module.exports = db;
