////////////// ATRIUM NODES //////////////
const atriumNodes = [
    {
        id: 1,
        stage: "Atrium 1",
        options: [
            {
                text: 'Diamonds',
                passed: false,
                nextAtrium: 2
            },
            {
                text: 'Clubs',
                passed: false,
                setState: { death: true },
                nextAtrium: 2
            },
            {
                text: 'Hearts',
                passed: false,
                setState: { death: true },
                nextAtrium: 2
            },
            {
                text: 'Spades',
                passed: false,
                setState: { death: true },
                nextAtrium: 2
            }
        ]
    }, 
    {
        id: 2,
        stage: "Atrium 2",
        options: [
            {
                text: 'Diamonds',
                passed: false,
                setState: { death: true },
                nextAtrium: 3
            },
            {
                text: 'Clubs',
                passed: false,
                setState: { death: true },
                nextAtrium: 3
            },
            {
                text: 'Hearts',
                passed: false,
                setState: { death: true },
                nextAtrium: 3
            },
            {
                text: 'Spades',
                passed: false,
                nextAtrium: 3
            }
        ]
    },
    {
        id: 3,
        stage: "Atrium 3",
        options: [
            {
                text: 'Diamonds',
                passed: false,
                setState: { death: true },
                nextAtrium: 4
            },
            {
                text: 'Clubs',
                passed: false,
                nextAtrium: 4
            },
            {
                text: 'Hearts',
                passed: false,
                setState: { death: true },
                nextAtrium: 4
            },
            {
                text: 'Spades',
                passed: false,
                setState: { death: true },
                nextAtrium: 4
            }
        ]
    }, 
    {
        id: 4,
        stage: "Success!!!",
        options: [
            {
                text: 'Now what?',
                passed: false,
                setState: { death: false },
                nextAtrium: -1
            }
        ]
    }, 
    {
        id: 10,
        stage: "Death",
        options: [
            {
                text: 'Restart Game',
                passed: false,
                setState: { death: false },
                nextAtrium: -1
            }
        ]
    } 
]
///////////// ATRIUM NODES END ///////////////////

// HTML element that states the list of options
const optionsContainer = document.getElementById('options-container');

// HTML element that states the current stage
const textElement = document.getElementById('stage');

// General parameter for game states
let state = {}

//Explored atrium element
const gameLog = document.getElementById('explored');

//Passindex for respawning
var passIndex = 0;


//Starts the game fresh with the original parameters defined above
function startGame() {
    state = {};
    showAtriumNode(1);
}

//Shows the options based on the current Atrium
function showAtriumNode(atriumNodeIndex) {
    const atriumNode = atriumNodes.find(atriumNode => atriumNode.id === atriumNodeIndex)
    textElement.innerText = atriumNode.stage;

    while(optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    var length = atriumNode.options.length;
    passIndex = 0;
    atriumNode.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectOption(option, atriumNode));
        optionsContainer.appendChild(button);

        if (showOption(option)) {
            button.style.pointerEvents = "auto";
        }
        else {
            passIndex = passIndex + 1;
            button.style.pointerEvents = "none";
            button.style.backgroundColor = "red";
        }
    })
    
    if (passIndex >= length) {
        showAtriumNode(atriumNodeIndex + 1);
    }
}

function showOption(option, passIndex) {
    if (option.passed == false) {
        return  true;
    }
}
function selectOption(option, atriumNode) {
    var nextAttriumNodeId = option.nextAtrium;
    var atriumInfo = document.createElement('p');

    atriumInfo.innerHTML = "<strong>"+atriumNode.stage+"</strong>" + ": " + option.text;
    gameLog.appendChild(atriumInfo);
    console.log(atriumInfo);

    state = Object.assign(state, option.setState);

    if (nextAttriumNodeId <= 0 ) {
        return startGame();
    }

    else if (state.death == true) {
        nextAttriumNodeId = 10;
    }

    option.passed = true;
    showAtriumNode(nextAttriumNodeId);
}

startGame();