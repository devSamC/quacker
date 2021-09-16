const animals = require('./animals');
const adjectives = require('./adjectives')
function generateCombination(numAdjectives, delimiter, seed, capitalizeFirstLetter) {
    console.log(seed)
    let combination = '';
    if (seed === 6942042069 || seed === "6942042069") {return "quack-with-Blocker"}
    const randomIshOne = (seed * 9301 + 49297) % 233280
    const randomIshTwo = (seed * 8 * 9301 + 49297) % 233280
    const pseudoRandomOne = randomIshOne / 233280
    const pseudoRandomTwo = randomIshTwo / 233280

    const animal = animals[Math.floor(pseudoRandomOne * animals.length)];

    for (let i = 0; i < numAdjectives; i++) {
        const adjective = adjectives[(Math.floor(pseudoRandomTwo * (i + 1) * adjectives.length)) % adjectives.length];

        combination += capitalizeFirstLetter ? adjective.charAt(0).toUpperCase() + adjective.slice(1) + delimiter : adjective + delimiter;
    }

    combination += capitalizeFirstLetter ? animal.charAt(0).toUpperCase() + animal.slice(1) : animal;
    return combination;
}
module.exports = generateCombination;