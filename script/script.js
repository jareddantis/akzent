/* jshint esversion: 6 */
// copyright @jareddantis, 2018

window.onload = () => {
    let button = document.getElementById('submit');
    let output = document.querySelector('#output p');
    button.addEventListener('click', e => {
        let str = document.querySelector('#input textarea').value;

        if (str) {
            let newstr = '';
            for (let i = 0; i < str.length; i++) {
                let char = str[i];
                let willChange = Math.random() >= 0.5; // 50% of the time, we leave the character alone

                if (willChange && char != ' ' && dictionary.hasOwnProperty(char)) {
                    let idx = Math.floor(Math.random() * dictionary[char].length);
                    newstr += dictionary[char][idx];
                } else
                    newstr += char;
            }
            output.innerText = newstr;
        } else
            output.innerText = "";
    }, false);

    // Copy text to clipboard on click
    output.addEventListener('click', () => {
        document.execCommand("copy");
    });
    output.addEventListener('copy', (e) => {
        e.preventDefault();
        if (e.clipboardData) {
            e.clipboardData.setData("text/plain", output.textContent);
            console.log(e.clipboardData.getData("text"));
        }
    });
};

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

