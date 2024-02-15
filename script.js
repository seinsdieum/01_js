const submit = document.querySelector('#submit')
const warning = document.querySelector('.warning')
const form = document.querySelector('#form')
const modal = document.querySelector('#modal-cover')

const inputs = document.querySelectorAll('input')
const select = document.querySelector('select')
const about = document.querySelector('textarea')

function val(input, match) {
    return input?.value?.match(match)
}

function addWarning(value, id) {
    const r = warning.querySelector('#warn-'+id)
    console.log(r)
    if(!r) warning.innerHTML += `<div id="warn-${id}">${value}</div>`
}

function removeWarning(id) {
    const r = warning.querySelector('#warn-'+id)
    if(r) warning.removeChild(r)
}

const validation = {
    'name': false,
    'lastname': false,
    'email': false,
    'phone': false,
    'about': false,
}

const formIsReady = () => {
    for(let i of Object.entries(validation)) {{
        console.log(i)
        if(i[1] === false) return false
    }}

        return true
}

const validateInput = (input) => {
    switch(input.name) {
        case 'name':

            if(val(input, '[a-zA-Zа-яА-Я]')) {
                removeWarning('name')
                validation['name'] = true
            } else {
                addWarning('Некорректное имя', 'name')
                validation['name'] = false
            }
            break;
        case 'lastname':
            if(val(input, '[a-zA-Zа-яА-Я]')) {
                removeWarning('lastname')
                validation['lastname'] = true
            }
            else {
                addWarning('Некорректная фамилия', 'lastname')
                validation['lastname'] = false
            }
            break;
        case 'email':
            if(val(input, '[a-zA-Z]@[a-zA-Z]{5}.[a-zA-Z]{2,3}')) {
                removeWarning('email')
                validation['email'] = true
            }
            else {
                addWarning('Некорректный email', 'email')
                validation['email'] = false
            }
            break;
        case 'phone':
            if(val(input, "\\(0[0-9]{2}\\)\\d{3}-\\d{2}-\\d{2}")) {
                removeWarning('phone')
                validation["phone"] = true
            }
            else {
                addWarning('Некорректный телефон', 'phone')
                validation['phone'] = false
            }
            break;
        case 'about':
            if(val(input, ".+")) {
                removeWarning('about')
                validation['about'] = true
            }
        else {
                addWarning('Напишите хоть что-нибудь о себе!', 'about')
                validation['about'] = false
            }

            break;
    }
}

submit.addEventListener('click', e => {
    e.preventDefault()
    if(formIsReady()) {
        modal.style.display = 'flex'
        modal.addEventListener('animationend', () => {
            modal.style.display = 'none'
        })
    } else {
        for(let i of inputs) {
                validateInput(i)
        }
        validateInput(about)
    }
})

for(let i of inputs) {
    i.addEventListener('blur', () => {
        validateInput(i)
    })
}

about.addEventListener('blur', () => {
    validateInput(about)
})

warning.innerHTML = ''
