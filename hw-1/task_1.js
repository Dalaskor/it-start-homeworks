// task 1.1
const toUpLow = (str = '') => {
	str = str.toLowerCase()
	str = str[0].toUpperCase() + str.slice(1)
	return str;
}

// task 1.2
const trueSpaces = (str = '') => {
	str = str.replace(/ +/g, ' ').trim();
	let marks = ['.', ',', '?', '!', ';', ':']
	for (let i = 0; i < str.length; i++) {
		if (i != str.length - 1 && str[i] === ' ' && marks.indexOf(str[i+1]) != -1) {
			str = str.slice(0, i) + str.slice(i+1)
			i--;
		}
		if (i != str.length - 1 && marks.indexOf(str[i]) != -1 && str[i+1] != ' ') {
			str = str.slice(0, i+1) + ' ' + str.slice(i+1)
		}
	}
	return str;
} 

// task 1.3
const countWords = (str = '') => {
	let count = 1
	str = str.replace(/ +/g, ' ').trim();
	if (str === '') {
		return 0;
	}
	for (let i = 0; i < str.length; i++) {
		if (str[i] === ' ') {
			count++;
		}
	}
	return count;
}

// task 1.4
const countUniqWords = (str = '') => {
	str = str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	str = str.replace(/\s{2,}/g," ");
	let words = str.split(' ')
	let wordsCounts = new Object()
	for (let word of words) {
		if (!wordsCounts.hasOwnProperty(word)) {
			wordsCounts[word] = 0
		}
		wordsCounts[word] += 1
	}
	for (let key in wordsCounts) {
		console.log(`${key} - ${wordsCounts[key]}`)
	}
}

// export {toUpLow, trueSpaces, countWords, countUniqWords}

