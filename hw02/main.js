// task 1
let letters = []
const str = "Backend As A Service"

let arr = str.split(" ")

for (let i = 0; i < arr.length; i++) {
	letters.push(arr[i][0])
}

console.log(letters)
console.log(letters.join(", "))

// task 2
const getDateFromNumber = function(number) {
	typeof(number) === 'number'
		? console.log(new Date().toLocaleString())
			: console.log("Неверный тип данных")
}