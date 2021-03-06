var strength = {
    0: "very weak",
    1: "weak",
    2: "medium",
    3: "strong",
    4: "very strong"
};

var password = document.getElementById('id_password');
var passtext = document.getElementById('id_last_name');

// Decides which password strength a user sees based on username length
function update() {
    var username = document.getElementById('id_username');
    if ((username.value.length) % 2 === 0) {
        updateStrength()
    }
    else {
        updateTime()
    }
}

// Updates relative strength message using zxcvbn algorithm
function updateStrength() {
    var val = password.value;
    var result = zxcvbn(val);
    var text = document.getElementById('password-strength');
    if(val !== "") {
        text.innerHTML = "Your password strength: <u><b>" + strength[result.score] + "</b></u>";
    }
    else {
        text.innerHTML = "<br/>";
    }
}

// Updates cracking time message using zxcvbn algorithm
function updateTime() {
    var val = password.value;
    var result = zxcvbn(val);
    var text = document.getElementById('password-strength');
    if (val !== "") {
        text.innerHTML = "Your password can be cracked by a modern PC in <u><b>" + result.crack_times_display["offline_slow_hashing_1e4_per_second"] + "</b></u>";
    }
    else {
        text.innerHTML = "<br/>";
    }
}

// Disable the submit button until password requirements are met
function validate() {
    document.getElementById('submit').disabled = true;
    var val = passtext.value;
    var text = document.getElementById('password-match');
    if (password.value.length < 8) {
        return
    }
    if (val !== "") {

        if (val === password.value) {
            text.innerHTML = "<u><b>Correct<u><b>";
            document.getElementById('submit').disabled = false;
        }
        else {
            text.innerHTML = "<u><b>Incorrect<u><b>";
        }
    }
    else {
        text.innerHTML = "<br/>";
    }
}

password.addEventListener('input', update);
passtext.addEventListener('input', validate);
password.addEventListener('input', validate);