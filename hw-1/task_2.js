const sumNums = (a = 0, b = 0) => {
	return Number(a) + Number(b);
}

const mulNums = (a = 0, b = 0) => {
	return Number(a) * Number(b);
}

const subNums = (a = 0, b = 0) => {
	return Number(a) - Number(b);
}

const divNums = (a = 0, b = 0) => {
	return b != 0 ? Number(a) / Number(b) : NaN;
}

// export {sumNums, mulNums, subNums, divNums}

