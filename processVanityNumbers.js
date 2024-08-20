



function generateVanityNumbers(PhoneNumber) {
    const vanityNumbers = [];
    const PHONE_LETTER_MAP = {
        2: "ABC", 3: "DEF", 4: "GHI",
        5: "JKL", 6: "MNO", 7: "PQRS",
        8: "TUV", 9: "WXYZ"
    };
    function recurse(current, index) {
        if (index === PhoneNumber.length) {
            vanityNumbers.push(current);
            return;
        }
        const digit = PhoneNumber[index];
        const letters = PHONE_LETTER_MAP[digit] || digit;
        for (let i = 0; i < letters.length; i++) {
            recurse(current + letters[i], index + 1);
        }
    }

    recurse('', 0);
    return vanityNumbers;
}

function scoreVanityNumber(vanityNumber) {
    // Score based on the number of letters (words > numbers)
    return vanityNumber.replace(/[^A-Z]/g, '').length;
}

function selectBestVanityNumbers(vanityNumbers) {
    return vanityNumbers
        .sort((a, b) => scoreVanityNumber(b) - scoreVanityNumber(a))
        .slice(0, 3);
}

module.exports = {
    generateVanityNumbers,
    scoreVanityNumber,
    selectBestVanityNumbers
}