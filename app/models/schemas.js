/** schemas.js **/

schemas = {
	qgateschema: {		// Definicion de la estructura de una puerta cuantica
		id: null,			// ID de la puerta, para referenciarla en las instancias
		matrix: null,		// Matriz que define el funcionamiento de la puerta
		multiplier: null,	// Escalar que multiplica la matriz
		size: null,			// Numero de QuBits que admite la puerta
		name: null,			// Nombre completo de la puerta
		alias: null,		// Nombre de no mas de tres caracteres que se mostrara en el diagrama del circuito
		desc: null			// Descripcion de la puerta
	},
	conditionschema: {	// Definicion de una condicion clasica
		id: null,			// ID de la condicion, para referenciarla en una instancia
		value1:				// Valor 1 sobre el que aplicar el operador
		{
			isCReg: null,	// Si es cierto, num es el numero del registro clasico cuyo contenido se compara
			num: null		// Si es falso, num es el numero a comparar
		},
		value2:				// Valor 2 sobre el que aplicar el operador
		{
			isCReg: null,	// Si es cierto, num es el numero del registro clasico cuyo contenido se compara
			num: null		// Si es falso, num es el numero a comparar
		},
		oprel: null,		// El operador relacional usado en la operacion. Puede ser =, !=, <=, >=, < y >
		result: null		// Devuelve el resultado de evaluar "value1 oprel value2"
	},
	qginstanceschema: {	// Definicion de la estructura de una instancia en la timeline
		id: null,			// ID de la instancia, de momento sin uso, tal vez se elimine
		qgateid: null,		// ID de la puerta de la que es una instancia
		transpose: null,	// Es verdadero si se aplica la transpuesta de la puerta
		invert: null,		// Es verdadero si se aplica la inversa de la puerta
		conds: null,		// Lista de ids de condiciones que se deben evaluar como ciertas para aplicar esta instancia
		notConds: null,		// Lista de ids de condiciones que se deben evaluar como falsas para aplicar esta instancia
		qbits: null			// Indica los QuBits sobre los que se aplica la puerta
	},
	qcircuitschema: {	// Definicion de la estructura de un circuito cuantico
		id: null,			// ID del circuito, de momento sin uso
		name: null,			// Nombre dado por el creador del circuito
		desc: null,			// Descripcion del circuito
		gates: null,		// Lista de puertas usadas en el circuito
		nQBits: null,		// Numero de QuBits disponibles
		nCReg: null,		// Numero de registros clasicos disponibles
		initV: null,		// Valores iniciales de los QuBits. Lista de longitud nQBits, de tuplas de numeros complejos
		timeLine: null		// Lista de listas. La posicion en la lista indica el tiempo. Las listas dentro de estas son instancias o condiciones que se ejecutan en ese momento
	}
}

module.exports = schemas;
