const char = {
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    special: '`~!@#$%^&*()_+-=[]{}\\|;:\'\"/?<>.,'
}

// Inclusive range
const range = { min: 8, max: 128 }

const inRange = (int) => { 
    return int >= range.min && int <= range.max 
}

const random = (size) => {
    return Math.floor(Math.random() * size)
}

const newPassword = (lower, upper, num, spec, leng) => {
    // Ensure at least 1 type selected
    if (!(lower || upper || num || spec)) return -1
    // Ensure length in range
    if (!inRange(leng)) return -2

    const src = (lower ? char.alpha.toLowerCase() : '') + (upper ? char.alpha : '') +
                (num ? char.number : '') + (spec ? char.special : '')
    let out = ''
    for (var i = 0; i < leng; i++) {
        out += src.charAt(random(src.length))
    }
    return out
}


const input_box = document.getElementsByClassName("input")[0]

const gen = () => {
    const pass = newPassword(
        confirm("Use lowercase letters?"),
        confirm("Use uppercase letters?"),
        confirm("Use numbers?"),
        confirm("Use special characters? (" + char.special + ")"),
        prompt("Password Length (" + range.min + " to " + range.max + " inclusive)")
    )
    if (pass == -2) {
        alert("Password length must be between " + range.min + " and " + range.max + " (inclusive)")
    } else if (pass == -1) {
        alert("At least 1 character type must be selected.")
    } else {
        input_box.value = pass
    }
}

