var strength = {
    0: "very weak",
    1: "weak",
    2: "medium",
    3: "strong",
    4: "very strong"
};

var password = document.getElementById('id_password');
var passtext = document.getElementById('id_last_name');


function update() {
    var username = document.getElementById('id_username');
    if ((username.value.length) % 2 == 0) {
        updateStrength()
    }
    else {
        updateTime()
    }
}

function updateStrength() {
    var val = password.value;
    var result = zxcvbn(val);
    var text = document.getElementById('password-strength');
    if(val !== "") {
        text.innerHTML = "Password strength: <u>" + strength[result.score] + "</u>";
    }
    else {
        text.innerHTML = "<br/>";
    }
}

function updateTime() {
    var val = password.value;
    var result = zxcvbn(val);
    var text = document.getElementById('password-strength');
    if (val !== "") {
        text.innerHTML = "Your password can be cracked by a modern desktop in <u>" + result.crack_times_display["offline_slow_hashing_1e4_per_second"] + "</u>";
    }
    else {
        text.innerHTML = "<br/>";
    }
}

function validate() {
    document.getElementById('submit').disabled = true;
    var val = passtext.value;
    var text = document.getElementById('password-match');
    if (password.value.length < 8) {
        return
    }
    if (val !== "") {

        if (val === password.value) {
            text.innerHTML = "Correct<br/>";
            document.getElementById('submit').disabled = false;
        }
        else {
            text.innerHTML = "Incorrect<br/>";
        }
    }
    else {
        text.innerHTML = "<br/>";
    }
}

password.addEventListener('input', update);
passtext.addEventListener('input', validate);
password.addEventListener('input', validate);