// Marcus, Makj0005: First Handin

// I've chosen to describe my code using JSDoc:
// https://www.jetbrains.com/help/webstorm/creating-jsdoc-comments.html#ws_js_jsdoc_typescript_syntax

//////////////////////
// 1 - What to wear //
//////////////////////
console.log("1 - What to wear");

/**
 * Determines what to wear based on the given temperature.
 * @param {number} temperature - The temperature in Celsius.
 * @returns {string|void} - The recommended clothing.
 */
const whatToWear = (temperature) => {
    if (typeof temperature !== 'number') {
        console.error("Error: Input should be a temperature number in Celsius");
        return;
    }

    let resultSentence = "";

    switch (true) {
        case temperature < 5:
            resultSentence = "You should wear a winter jacket";
            break;
        case temperature < 15:
            resultSentence = "You should wear normal clothes with a light jacket";
            break;
        case temperature >= 15:
            resultSentence = "You should wear a t-shirt and shorts";
            break;
    }

    return resultSentence;
}

const temperature = 15;
const clothesToWear = whatToWear(temperature);
console.log(`Temperature is: ${temperature}°C, ${clothesToWear}`);



///////////////////
// 2 - Dice game //
///////////////////
console.log(" ");
console.log("2 - Dice game");

    //////////////////////////////////////////////////////////
    // Part 1 (extra: diceArray to showcase all dice rolls) //
    //////////////////////////////////////////////////////////
    console.log("  part 1:");

/**
 * (I've made a separate function for a single dice roll, to avoid redundant code in part 1 and 2)
 * Rolls a single six-sided dice.
 * @returns {number} - The result of the dice roll (1-6).
 */
const rollDice = () => Math.floor(Math.random() * 6) + 1;

/**
 * Rolls multiple dice based on the given number of rolls
 * @param {number} numberOfRolls - The number of dice rolls.
 */
const diceArray1 = [] // Extra
const rollMultipleDices = (numberOfRolls) => {
    if (typeof numberOfRolls !== 'number') {
        console.error("Error: Input should be a number");
        return;
    }

    for (let i = 0; i < numberOfRolls; i++) {
        const diceRollValue = rollDice();
        diceArray1.push(diceRollValue); // Extra

        if (diceRollValue === 6)
            console.log("You just hit 6!");
    }
}

const randomNumber1 = rollDice(); // randomize 1-6
rollMultipleDices(randomNumber1);
console.log("You hit:", diceArray1); // Extra


    //////////////////////////////////////////////////////////
    // Part 2 (extra: diceArray to showcase all dice rolls) //
    //////////////////////////////////////////////////////////
    console.log("  part 2:");

/**
 * Rolls multiple dice based on the given number of rolls and checks for a jackpot.
 * @param {number} numberOfRolls - The number of dice rolls.
 */
const diceArray2 = [] // Extra
const rollMultipleDicesJackpot = (numberOfRolls) => {
    if (typeof numberOfRolls !== 'number') {
        console.error("Error: Input should be a number");
        return;
    }

    let sixCounter = 0;

    for (let i = 0; i < numberOfRolls; i++) {
        const diceRollValue = rollDice();
        diceArray2.push(diceRollValue); // Extra

        if (diceRollValue === 6) {
            sixCounter++;
        }
    }

    const isJackpot = (sixCounter === numberOfRolls);

    if (isJackpot) {
        console.log("Jackpot 🎉");
    } else {
        // Assuming it's needed to console.log everytime 6 is hit
        for (let i = 0; i < sixCounter; i++) {
            console.log("You just hit 6!");
        }
    }
}

const randomNumber2 = rollDice(); // randomize 1-6
rollMultipleDicesJackpot(randomNumber2);
console.log("You hit:", diceArray2); // Extra



////////////////////////////////////
// 3 - Build a sentiment analyzer //
////////////////////////////////////
console.log(" ");
console.log("3 - Build a sentiment analyzer");

/**
 * Analyzes the sentiment of a given sentence, based on keywords.
 * @param {string} sentence - The input sentence.
 * @returns {Object} - An object containing sentiment analysis results.
 */
const getSentimentScore = (sentence) => {
    if (typeof sentence !== 'string') {
        console.error("Error: Input should be a sentence as a string");
        return;
    }

    const positiveKeywords = new Set(['super', 'awesome', 'happy']);
    const negativeKeywords = new Set(['exhausted']);

    const sentenceWords = sentence.split(" ");

    let positiveWords = [];
    let negativeWords = [];
    let score = 0;

    for (const word of sentenceWords) {
        if (positiveKeywords.has(word)) {
            positiveWords.push(word);
            score++;
        } else if (negativeKeywords.has(word)) {
            negativeWords.push(word);
            score--;
        }
    }

    return {
        score: score,
        positiveWords: positiveWords,
        negativeWords: negativeWords
    };
}

const sentence1 = 'I am mega super awesome happy and a little exhausted';
const sentimentScoreObject1 = getSentimentScore(sentence1);
console.log(sentimentScoreObject1);

const sentence2 = 'I am really exhausted today';
const sentimentScoreObject2 = getSentimentScore(sentence2);
console.log(sentimentScoreObject2);



//////////////////////////////////////////
// 4 - Character frequencies (optional) //
//////////////////////////////////////////
console.log(" ");
console.log("4 - Character frequencies");


/**
 * In this solution I've chosen to use Map datastructure, that I've learned through a DTU course
 * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 *
 * Calculates and returns the frequencies of characters in a given string.
 * @param {string} string - The input string.
 * @returns {Object} - An object containing character frequencies and length.
 */
const getCharacterFrequencies = (string) => {
    if (typeof string !== 'string') {
        console.error("Error: Input should be a string");
        return;
    }

    // Convert string to an array of lowercase characters
    const stringLowerCase = string.toLowerCase(); // H and h will be counted as the same character

    // Creating an empty Map object that will store character keys and their corresponding values
    const characterMap = new Map();

    /* Iterate through stringCharacters array with for-of-loop
        if character key exists in Map, the value will be incremented by 1
        if character key does not exist in Map and is not a space, a new character key will be added with value set to 1 */
    for (const character of stringLowerCase) {
        const isExistingCharacter = characterMap.has(character);
        const isSpaceCharacter = (character === " ");

        if (!isSpaceCharacter) {
            if (isExistingCharacter) {
                characterMap.set(character, characterMap.get(character) + 1);
            } else {
                characterMap.set(character, 1);
            }
        }
    }

    // Converting Map to an array of objects to return in correct format with Array.from()
    // source: https://bobbyhadz.com/blog/javascript-convert-map-to-array-of-objects
    const charactersFrequenciesArray = Array.from(characterMap, ([character, count]) => ({
        character,
        count,
    }));

    return {
        characters: charactersFrequenciesArray,
        length: charactersFrequenciesArray.length // assuming it's length of characterArray
    };
}

console.log(getCharacterFrequencies('KayAk'));
console.log(getCharacterFrequencies('ThiS is a long sentence!'));



/////////////////////////////////////////////////
// 5 - Credit card number formatter (optional) //
/////////////////////////////////////////////////
console.log(" ");
console.log("5 - Credit card number formatter");

/**
 * Formats a credit card number with spaces every fourth digit.
 * @param {number} cardNumber - The credit card number to format.
 * @returns {Object} - An object containing the original and formatted card numbers.
 */
const formatCreditCardNumber = (cardNumber) => {
    const isNumber = (typeof cardNumber === 'number');

    // RegEx test: 16-digit number (assuming: 16 is max length and input can be 1-16 digits, as in the example code)
    const regExPattern = /^(\d{1,16})$/;
    const cardNumberAsString = cardNumber.toString();
    const isValidFormat = regExPattern.test(cardNumberAsString);

    if (isNumber && isValidFormat) {
        let formattedCardNumber = '';

        for (let i = 0; i < cardNumberAsString.length; i++) {
            const everyFourthDigit = (i % 4 === 0);
            const firstOrLastDigit = (i === 0 || i === cardNumberAsString.length); // avoid spacing in front or after card-number

            if (everyFourthDigit && !firstOrLastDigit) {
                formattedCardNumber += " ";
            }

            formattedCardNumber += cardNumberAsString[i];
        }

        return {
            original: cardNumber,
            formatted: formattedCardNumber
        }
    } else {
        console.error("Error: Input should be a card number between 1-16 digits");
    }
}

const cardNumber1 = 123456789;
const formattedCreditCardObject1 = formatCreditCardNumber(cardNumber1);
console.log(formattedCreditCardObject1);

const cardNumber2 = 1234567891234567;
const formattedCreditCardObject2 = formatCreditCardNumber(cardNumber2);
console.log(formattedCreditCardObject2);


// Marcus, Makj0005: First Handin