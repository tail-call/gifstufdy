const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const input = "SGl0bGVyIGRpZCBub3RoaW5nIHdyb25nSGl0bGVyIGRpZCBub3RoaW5nIHdyb25nSGl0bGVyIGRpZCBub3RoaW5nIHdyb25n";

function makeDictionary() {
    return Array.from(latinOne(alphabet));
}

function latinOne(b64) {
    return [...b64].map(c => String.fromCharCode(alphabet.indexOf(c))).join('');
}

console.log(JSON.stringify(latinOne(input)));

function compress(string, dictionary = makeDictionary()) {
    const initialDictionary = dictionary.slice();

   console.log(Array.from(string).map(c => c.charCodeAt(0)));
    let output = [];
    let stringOutput = [];

    for (let i = 0; i < string.length;) {
        let word = string[i];
        let lastDictIndex = word.charCodeAt(0);
        let fragmentLength = 1;

        for (let dictIndex = dictionary.indexOf(word);
             dictIndex >= 0 && string[i + fragmentLength];
             dictIndex = dictionary.indexOf(word))
        {
            lastDictIndex = dictIndex;
            word += string[i + fragmentLength];
            fragmentLength += 1;
        }

        console.log(i);
        if (lastDictIndex !== undefined && fragmentLength > 1) {
            dictionary.push(word);
            output.push(lastDictIndex);
            stringOutput.push(dictionary[lastDictIndex]);
            if (dictionary.length >= 255) {
                console.log('dict overflow at', i);
                dictionary = initialDictionary.slice();
            }
            i += fragmentLength - 1;
        } else {
            const code = string[i].charCodeAt(0);
            output.push(code);
            stringOutput.push(dictionary[code]);
            i += 1;
        }

    }

    return [output, stringOutput];
}
const result0 = compress(latinOne(input + input + input + input + input + input + input + input + input + input))[0].map(c => String.fromCharCode(c)).join('');

const result = Buffer.from(result0).toString('base64');

const result2 = compress(result0)[1].map(c => {
   return (c
           ? Array.from(c).map(c => alphabet[c.charCodeAt(0)]).join('')
           : '?');
}).join('');

console.log(
    'result2',
    JSON.stringify(result2)

    // Buffer.from(
    // ).toString('base64')
);
