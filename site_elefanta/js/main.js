const signIn = document.getElementById('sign_in')
const signInContainer = document.getElementById('sign_in_container')
const signInLogin = document.getElementById('sign_in_login')
const signInPass = document.getElementById('sign_in_pass')
const signInSubmit = document.getElementById('sign_in_submit')
signInSubmit.disabled = true

const signUp = document.getElementById('sign_up')
const signUpContainer = document.getElementById('sign_up_container')
const signUpContainerSuccess = document.getElementById('sign_up_container_success')
const signUpLogin = document.getElementById('sign_up_login')
const signUpPass1 = document.getElementById('sign_up_pass1')
const signUpPass2 = document.getElementById('sign_up_pass2')
signUpPass2.disabled = true
const signUpSubmit = document.getElementById('sign_up_submit')
signUpSubmit.disabled = true

const img = document.getElementById('img')
const imgUser = document.getElementById('img_user')
imgUser.style.display = `none`
const avatar = document.getElementById('avatar')
const logout = document.getElementById('logout')

signUp.onclick = function(event) {
    signUpContainer.style.display = `block`
    signInContainer.style.display = `none`
}

avatar.onchange = function(event) {
    let data
    const reader = new FileReader
    reader.onload = function(event) {
        data = event.target.result
        img.src = data
    }
    reader.readAsDataURL(event.target.files[0])
}

let hash = '',
    test

signUpLogin.oninput = function(event) {
    event.target.test = Boolean(event.target.value.match(/[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/))
    event.target.style.color = event.target.test ? 'green' : 'red'
}

signUpPass1.oninput = function(event) {
    event.target.test = Boolean(event.target.value.match(/\d/) &&
        event.target.value.match(/[A-z]/) &&
        event.target.value.length > 7)
    event.target.style.color = event.target.test ? 'green' : 'red'
}

signUpPass1.onchange = function(event) {
    if (event.target.test) {
        signUpPass2.disabled = false
    }
}

signUpPass2.oninput = function(event) {
    event.target.style.color =
        event.target.value === signUpPass1.value ?
        'green' : 'red'
}

signUpPass2.onchange = function(event) {
    if (event.target.value === signUpPass1.value) {
        hash = Sha256.hash(event.target.value)
        signUpSubmit.disabled = !(hash && signUpLogin.value.match(/\S/))
    }
}

signUpSubmit.onclick = function(event) {
    fetch(`https://garevna-rest-api.glitch.me/user/${signUpLogin.value}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            passhash: hash,
            avatar: img.src
        })
    }).then((response) => {
        if (response.ok) {
            document.cookie = `login = ${signUpLogin.value}`
            document.cookie = `hash = ${hash}`
            signUpContainer.style = `
				display: none;`
            signUpContainerSuccess.style = `
				display: block;`
            signUpContainerSuccess.innerText = `${signUpLogin.value}, you have successfully registered!`
            signInContainer.style = `
				display: block;`
        } else {
            throw new Error('Fetch failed')
        }
    })
}

signIn.onclick = function(event) {
    signInContainer.style.display = `block`
    signUpContainer.style.display = `none`
}

signInLogin.oninput = signUpLogin.oninput

signInPass.oninput = function(event) {
    event.target.test = Boolean(event.target.value.match(/\d/) &&
        event.target.value.match(/[A-z]/) &&
        event.target.value.length > 7)
    event.target.style.color = event.target.test ? 'green' : 'red'
}

signInPass.onchange = function(event) {
    hash = Sha256.hash(event.target.value)
    signInSubmit.disabled = false
}

// signInLogin.oninput = function(event) {
//     function getCookies() {
//         var res = document.cookie
//             .split("; ")
//             .map(
//                 x => {
//                     var tmp = x.split("=")
//                     var elem = {}
//                     elem[tmp[0]] = tmp[1]
//                     return elem
//                 }
//             )
//         return Object.assign({}, ...res)
//     }
//     event.target.value = Boolean(getCookies().login) ? getCookies().login : console.log("need sign up")
// }

signInSubmit.onclick = function(event) {
    fetch("https://garevna-rest-api.glitch.me/user/`${signInLogin}`")
        .then(response => response.json())
        .then(response => response.passhash === hash ?
            imgUser.src = response.avatar :
            console.log('invalid login or password')
        )
    imgUser.style.display = `block;`
}

// fetch ( 'https://avatars2.githubusercontent.com/u/46?v=4' )
//     .then ( response => {
//         response.blob().then ( response => {
//     	    urlObject = URL.createObjectURL( response)
//     	    picture.src = urlObject
//         })
//     })