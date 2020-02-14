var promise = new Promise(function(resolve, reject) {
    document.write('Wait, pease...<br>')
    setTimeout(() => resolve("OK, you are here ?"), 2000)
})

export default promise