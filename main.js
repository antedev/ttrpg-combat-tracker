document.getElementById('combatant-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const initiative = document.getElementById('initiative').value;
    const maxHp = document.getElementById('max-hp').value;
    const effects = document.getElementById('effects').value;

    addCombatant(name, initiative, maxHp, effects);

    clearForm();
});

function addCombatant(name, initiative, maxHp, effects) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.innerHTML = `
        ${name} (Initiative: ${initiative})
        <span>
            Max HP: ${maxHp} | Effects: ${effects}
        </span>
    `;

    document.getElementById('combatant-list').appendChild(listItem);
}

function clearForm() {
    document.getElementById('combatant-form').reset();
}

// Create an array to store combatants
const combatants = [];

document.getElementById('combatant-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const initiative = document.getElementById('initiative').value;
    const maxHp = document.getElementById('max-hp').value;
    const effects = document.getElementById('effects').value;
    const isPlayer = document.getElementById('is-player').checked;

    addCombatant(name, initiative, maxHp, effects, isPlayer);
    renderCombatants();

    clearForm();
});

function addCombatant(name, initiative, maxHp, effects, isPlayer) {
    const combatant = {
        name,
        initiative: parseInt(initiative),
        maxHp: parseInt(maxHp),
        effects,
        isPlayer
    };

    combatants.push(combatant);

    // Sort combatants by initiative (descending) and prioritize players in case of ties
    combatants.sort((a, b) => {
        if (a.initiative === b.initiative) {
            return b.isPlayer - a.isPlayer;
        }
        return b.initiative - a.initiative;
    });
}

function renderCombatants() {
    const combatantList = document.getElementById('combatant-list');
    combatantList.innerHTML = '';

    combatants.forEach(combatant => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${combatant.name} (Initiative: ${combatant.initiative})
            <span>
                Max HP: ${combatant.maxHp} | Effects: ${combatant.effects}
            </span>
        `;

        combatantList.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('combatant-form').reset();
}
