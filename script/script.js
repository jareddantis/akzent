/* jshint esversion: 6 */
// copyright @jareddantis, 2018

const dictionary = {
    "a": "àáâãäåæā",
    "b": "ß",
    "c": "çćč",
    "e": "èéæœêëē",
    "i": "ìíîïįī",
    "l": "ł",
    "n": "ñń",
    "o": "òóœðøôõö",
    "s": "śš",
    "u": "ùúûüū",
    "y": "ýÿ",
    "z": "žźż",
    "A": "ÀÁÂÃÄÅÆĀ",
    "B": "SS",
    "C": "ÇĆČ",
    "E": "ÈÉÆŒÊËĒ",
    "I": "ÌÍÎÏĮĪ",
    "L": "Ł",
    "N": "ÑŃ",
    "O": "ÒÓŒÐØÔÕÖ",
    "S": "ŚŠ",
    "U": "ÙÚÛÜŪ",
    "Y": "ÝŸ",
    "Z": "ŽŹŻ",
    "?": "¿‽",
    "!": "¡"
};

// Dialog methods
var intervalId = 1;
function showDialog(dialog) {
    dialog.classList.add('visible');
    intervalId = window.setInterval(() => {
        dialog.classList.remove('visible');
    }, 2000);
}
function dismissDialog(dialog) {
    if (dialog.classList.contains('visible')) {
        window.clearInterval(intervalId);
        dialog.classList.remove('visible');
    }
}

var educated = false;
window.onload = () => {
    let button = document.getElementById('submit');
    let output = document.querySelector('#output p');
    let textArea = document.querySelector('#input textarea');
    let dialog = document.getElementById('dialog');
    let dialogMsg = document.querySelector('#dialog span');

    // Focus on textarea after page loads
    textArea.focus();

    // Remove 'press Enter' message on mobile
    if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
        let msg = document.getElementById('desktop');
        msg.parentNode.removeChild(msg);
    }

    // Process on button click/Enter press
    let accentify = (e) => {
        let str = textArea.value;

        if (str.length > 0) {
            let newstr = '';
            for (let i = 0; i < str.length; i++) {
                let char = str[i];
                let willChange = Math.random() >= 0.3; // 30% of the time, we leave the character alone

                if (willChange && char != ' ' && dictionary.hasOwnProperty(char)) {
                    let idx = Math.floor(Math.random() * dictionary[char].length);
                    newstr += dictionary[char][idx];
                } else
                    newstr += char;
            }
            output.innerText = newstr;

            // Tell user what to do (but only once)
            if (!educated) {
                educated = true;
                dismissDialog(dialog);
                dialogMsg.innerText = "Tap/click text to copy";
                showDialog(dialog);
            }
        } else
            output.innerText = "";
    };
    button.addEventListener('click', accentify, false);
    textArea.addEventListener('keydown', e => {
        // Process on Enter, but only add new line on Shift+Enter
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            accentify(e);
        }
    });

    // Copy text to clipboard on click
    output.addEventListener('click', (e) => {
        // Don't do anything if there's nothing to copy
        if (output.innerText.trim().length == 0)
            return;

        // Make hidden textarea
        let tempArea = document.createElement('textarea');
        tempArea.classname = 'clipboard';
        tempArea.contentEditable = true;
        tempArea.readonly = false;
        tempArea.value = output.innerText;
        document.body.appendChild(tempArea);
        tempArea.focus();
        tempArea.select();

        // Dismiss dialog if visible
        dismissDialog(dialog);

        // Special treatment for iOS
        if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
            let range = document.createRange();
            let sel = window.getSelection();
            range.selectNodeContents(tempArea);
            sel.removeAllRanges();
            sel.addRange(range);
            tempArea.setSelectionRange(0, 999999);
        }

        try {
            document.execCommand('copy');
            dialogMsg.innerText = 'Copied to clipboard';
        } catch (err) {
            dialogMsg.innerText = 'Error copying to clipboard';
        }

        // Dismiss interval after 2 sec
        showDialog(dialog);

        document.body.removeChild(tempArea);
    });
};
