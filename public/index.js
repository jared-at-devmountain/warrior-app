const warriorForm = document.getElementById("warrior-form")
const warriorName = document.getElementById("warrior-name")
const warriorPower = document.getElementById("warrior-power")
const weaponForm = document.getElementById("weapon-form")
const weaponName = document.getElementById("weapon-name")
const weaponPower = document.getElementById("weapon-power")
const showButton = document.getElementById("show-button")
const displaySection = document.getElementById("display")
const pairForm = document.getElementById("pair-form")
const pairWarrior = document.getElementById("pair-warrior")
const pairWeapon = document.getElementById("pair-weapon")

function submitWarrior(event) {
    event.preventDefault()

    let bodyObj = {
        name: warriorName.value,
        power: warriorPower.value
    }

    axios.post('', bodyObj)
    .then((response) => {
        alert(bodyObj.name + ' added to warrior list!')
    })
    .catch((err) => {
        console.log('oh no!')
    })
}

function submitWeapon(event) {
    event.preventDefault()

    let bodyObj = {
        name: weaponName.value,
        power: weaponPower.value
    }

    axios.post('', bodyObj)
    .then((response) => {
        alert(bodyObj.name + ' added to weapons store!')
    })
    .catch((err) => {
        console.log('oh no!')
    })
}

function pair(event) {
    event.preventDefault()

    let bodyObj = {
        warrior: pairWarrior.value,
        weapon: pairWeapon.value
    }

    axios.post('', bodyObj)
    .then((response) => {
        alert(bodyObj.warrior + ' ' + bodyObj.weapon + ' are paired!')
    })
    .catch((err) => {
        console.log('oh no!')
    })
}

function showWarriorWeapons() {
    axios.get('')
    .then((response) => {
        let pairingArray = response.data

        for (let i = 0; i < pairingArray.length; i++) {
            let pairing = pairingArray[i]
            let pairContainerElement = document.createElement('div')
            let pairWarriorNameElement = document.createElement('span')
            let pairWeaponNameElement = document.createElement('span')
            let pairSentenceElement = document.createElement('span')
            
            pairWarriorNameElement.innerHTML = pairing.warrior
            pairWeaponNameElement.innerHTML = pairing.weapon
            pairSentenceElement.innerHTML = ' has '

            pairContainerElement.appendChild(pairWarriorNameElement)
            pairContainerElement.appendChild(pairSentenceElement)
            pairContainerElement.appendChild(pairWeaponNameElement)

            displaySection.appendChild(pairContainerElement)
        }
    })
    .catch((err) => {
        console.log('something went wrong:')
        console.log(err)
    })
}

warriorForm.addEventListener('submit', submitWarrior)
weaponForm.addEventListener('submit', submitWeapon)
pairForm.addEventListener('submit', pair)
showButton.addEventListener('click', showWarriorWeapons)