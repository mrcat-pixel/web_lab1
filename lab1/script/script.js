function sendButton() {
    let checker = 0;
    if (!checkCbx()) {
        document.getElementById("x_inc").innerHTML = "Некорректный ввод!";
    }
    else {
        document.getElementById("x_inc").innerHTML = "";
        checker += 1;
    }
    if (!checkTbx()) {
        document.getElementById("y_inc").innerHTML = "Некорректный ввод!";
    }
    else {
        document.getElementById("y_inc").innerHTML = "";
        checker += 1;
    }
    if (!checkRadio()) {
        document.getElementById("r_inc").innerHTML = "Некорректный ввод!";
    }
    else {
        document.getElementById("r_inc").innerHTML = "";
        checker += 1;
    }
    if (checker !== 3) return;
    $.ajax(
        {
        url: "return-page.php",
        data: {X : getX(), Y : getY(), R : getR()},
        type: "GET",
        success: function(data) {
            document.getElementById("table-place").innerHTML += data;
            window.sessionStorage.setItem("stored", document.getElementById("table-place").innerHTML);
        },
        error: function (jqXHR, exception) {
        let msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connected.\n Verify Network.';
        } else if (jqXHR.status === 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status === 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $('#post').html(msg);
        }
    }
    );
}

function getX() {
    for(let i=1; i<=9; i++) {
        if (document.getElementById('cbx_x' + i).checked) {
            return (i-6);
        }
    }
}

function getY() {
    return parseFloat(document.getElementById('tbx_y').value.slice(0, 10));
}

function getR() {
    for(let i=1; i<=5; i++) {
        if (document.getElementById('radio_r' + i).checked) {
            return i;
        }
    }
}

function checkRadio() {
    let checker = 0;
    for(let i=1; i<=5; i++) {
        checker += document.getElementById('radio_r' + i).checked;
    }
    return checker === 1;
}

function checkCbx() {
    let checker = 0;
    for(let i=1; i<=9; i++) {
        checker += document.getElementById('cbx_x' + i).checked;
    }
    return checker === 1;
}

function checkTbx() {
    let textGotten = document.getElementById('tbx_y').value;
    textGotten = textGotten.slice(0, 10);
    let floatGotten = parseFloat(textGotten);
    if (textGotten.includes(" ")) {
        return false;
    }
    if (isNaN(floatGotten)) {
        return false;
    }
    if (floatGotten > 5) {
        return false;
    }
    return floatGotten >= -5;

}


function sendReset() {
    for(let i=1; i<=5; i++) {
        document.getElementById('radio_r' + i).checked = false;
    }
    for(let i=1; i<=9; i++) {
        document.getElementById('cbx_x' + i).checked = false;
    }
    document.getElementById('tbx_y').value = '';
    document.getElementById("x_inc").innerHTML = "";
    document.getElementById("y_inc").innerHTML = "";
    document.getElementById("r_inc").innerHTML = "";
    document.getElementById("table-place").innerHTML = "";
    window.sessionStorage.setItem("stored", "");
}

window.onload = function loadSessionStorage() {
    document.getElementById("table-place").innerHTML = window.sessionStorage.getItem("stored");
}