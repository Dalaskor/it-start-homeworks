class Product {
	constructor(name = '', price = 0, quantity = 0, description = '') {
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.description = description;
	}

	get name() {
		return this._name;
	}

	get price() {
		return this._price;
	}

	get quantity() {
		return this._quantity;
	}

	get description() {
		return this._description;
	}

	set name(value) {
		this._name = value;
	}


	set price(value) {
		if (!isFinite(value)){
			console.log('Is not a number.');
			return;
		}
		this._price = value;
	}

	set quantity(value) {
		if (!isFinite(value)){
			console.log('Is not a number.');
			return;
		}
		this._quantity = value;
	}

	set description(value) {
		this._description = value;
	}
}

// Constants
const FIELDS = {
	NAME: 'name',
	QUANTITY: 'quantity',
	PRICE: 'price',
	DESCRIPTION: 'description',
};

const ACTIONS_STR = {
	CONTAINS: 'contains',
	STARTS: 'starts',
	ENDS: 'ends',
};

const ACTIONS_NUMS = {
	LESS: '<',
	MORE: '>',
	EQUALS: '=',
	LESS_EQUALS: '<=',
	MORE_EQUALS: '>=',
};

// Array
const products = [];

products.push(new Product(
	'Keyboard',
	8000,
	60,
	'Best keyboard in the whole word'
));
products.push(new Product(
	'Coumputer mouse',
	7000,
	143,
	'Best computer mouse in the whole word'
));
products.push(new Product(
	'fdCoumpufdter mouse',
	2,
	143,
	'Best computer mouse in the whole wordabc'
));

// ----------------------------

const productsFilter = (filterStr = '') => {
	// Парсер строки фильтров
	const filterParser = (filterStr = '') => {
		const filterArr = filterStr.split('&');
		let filters = [];

		for (let filter of filterArr) {
			filters.push([]);
			let inx_filter = filters.length - 1;

			// Поле в фильтре
			if (filter.indexOf(FIELDS.NAME) === 0) {
				filters[inx_filter].push(FIELDS.NAME);
			} else if (filter.indexOf(FIELDS.DESCRIPTION) === 0) {
				filters[inx_filter].push(FIELDS.DESCRIPTION);
			} else if (filter.indexOf(FIELDS.PRICE) === 0) {
				filters[inx_filter].push(FIELDS.PRICE);
			} else if (filter.indexOf(FIELDS.QUANTITY) === 0) {
				filters[inx_filter].push(FIELDS.QUANTITY);
			}

			// Условие в фильтре
			let inxCondition = 0;
			if (filters[inx_filter][0] === FIELDS.NAME ||
				filters[inx_filter][0] === FIELDS.DESCRIPTION) {
				if (filter.indexOf(ACTIONS_STR.CONTAINS) != -1) {
					filters[inx_filter].push(ACTIONS_STR.CONTAINS);
					inxCondition = filter.indexOf(ACTIONS_STR.CONTAINS);
				} else if (filter.indexOf(ACTIONS_STR.STARTS) != -1) {
					filters[inx_filter].push(ACTIONS_STR.STARTS);
					inxCondition = filter.indexOf(ACTIONS_STR.STARTS);
				} else if (filter.indexOf(ACTIONS_STR.ENDS) != -1) {
					filters[inx_filter].push(ACTIONS_STR.ENDS);
					inxCondition = filter.indexOf(ACTIONS_STR.ENDS);
				}

				// Значение условия в фильтре
				let inxConditionValue = inxCondition + filters[inx_filter][1].length + 1;
				let filterValue = filter.slice(inxConditionValue);
				filters[inx_filter].push(filterValue);
			} else if (filters[inx_filter][0] === FIELDS.PRICE ||
				filters[inx_filter][0] === FIELDS.QUANTITY) {
				if (filter.indexOf(ACTIONS_NUMS.MORE_EQUALS) != -1) {
					filters[inx_filter].push(ACTIONS_NUMS.MORE_EQUALS);
					inxCondition = filter.indexOf(ACTIONS_NUMS.MORE_EQUALS);
				} else if (filter.indexOf(ACTIONS_NUMS.LESS_EQUALS) != -1) {
					filters[inx_filter].push(ACTIONS_NUMS.LESS_EQUALS);
					inxCondition = filter.indexOf(ACTIONS_NUMS.LESS_EQUALS);
				} else if (filter.indexOf(ACTIONS_NUMS.EQUALS) != -1) {
					filters[inx_filter].push(ACTIONS_NUMS.EQUALS);
					inxCondition = filter.indexOf(ACTIONS_NUMS.EQUALS);
				} else if (filter.indexOf(ACTIONS_NUMS.MORE) != -1) {
					filters[inx_filter].push(ACTIONS_NUMS.MORE);
					inxCondition = filter.indexOf(ACTIONS_NUMS.MORE);
				} else if (filter.indexOf(ACTIONS_NUMS.LESS) != -1) {
					filters[inx_filter].push(ACTIONS_NUMS.LESS);
					inxCondition = filter.indexOf(ACTIONS_NUMS.LESS);
				}
				// Значение условия в фильтре
				let inxConditionValue = inxCondition + filters[inx_filter][1].length;
				let filterValue = filter.slice(inxConditionValue);
				filters[inx_filter].push(filterValue);
			}

		}

		return filters;
	}

	// Проверка продуктов по фильтру
	const checkProductFilter = (product = new Product(), filters = []) => {
		for (let filter of filters) {
			if (filter[0] === FIELDS.NAME || filter[0] === FIELDS.DESCRIPTION) {
				switch(filter[1]) {
					case ACTIONS_STR.CONTAINS:
						if (product[filter[0]].indexOf(filter[2]) === -1) return false;
						break;
					case ACTIONS_STR.STARTS:
						if (product[filter[0]].indexOf(filter[2]) != 0) return false;
						break;
					case ACTIONS_STR.ENDS:
						let startInx = product[filter[0]].length - filter[2].length;
						if (product[filter[0]].slice(startInx) != filter[2]) return false;
						break;
				}
			} else if (filter[0] === FIELDS.QUANTITY || filter[0] === FIELDS.PRICE) {
				switch(filter[1]) {
					case ACTIONS_NUMS.MORE_EQUALS:
						if (Number(product[filter[0]]) < Number(filter[2])) return false;
						break;
					case ACTIONS_NUMS.LESS_EQUALS:
						if (Number(product[filter[0]]) > Number(filter[2])) return false;
						break;
					case ACTIONS_NUMS.EQUALS:
						if (Number(product[filter[0]]) != Number(filter[2])) return false;
						break;
					case ACTIONS_NUMS.MORE:
						if (Number(product[filter[0]]) <= Number(filter[2])) return false;
						break;
					case ACTIONS_NUMS.LESS:
						if (Number(product[filter[0]]) >= Number(filter[2])) return false;
						break
				}
			}
		}
		return true;
	}

	// Проверка продуктов по фильтру
	let filters = filterParser(filterStr);
	let result = [];
	for (let product of products) {
		if(checkProductFilter(product, filters)) {
			result.push(product);
		}
	}

	return result;
}

/* let filterString = "name-contains-fd&price-=2&quantity->5&description-ends-abc";
console.log(productsFilter(filterString)) */
