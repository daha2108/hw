// var promise = new Promise(function(resolve, reject) {
//     document.write('Wait, pease...<br>')
//     setTimeout(() => resolve("OK, you are here ?"), 2000)
// })

// promise.then(response => document.write(response))

import promise from './promise.js'

promise.then(response =>
    document.querySelector('.sampleClass')
    .innerText += response)