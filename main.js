const combatants = [];
let selectedCombatantIndex = null;

document.getElementById('combatant-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const initiative = document.getElementById('initiative').value;
    const maxHp = document.getElementById('max-hp').value;
    const currentHp = document.getElementById('current-hp').value;
    const effects = document.getElementById('effects').value;
    const isPlayer = document.getElementById('is-player').checked;

    addCombatant(name, initiative, maxHp, currentHp, effects, isPlayer);
    renderCombatants();

    clearForm();
});

function addCombatant(name, initiative, maxHp, currentHp, effects, isPlayer) {
    const combatant = {
        name,
        initiative: parseInt(initiative),
        maxHp: parseInt(maxHp),
        currentHp: parseInt(currentHp),
        effects,
        isPlayer
    };

    if (selectedCombatantIndex === null) {
        combatants.push(combatant);
    } else {
        combatants[selectedCombatantIndex] = combatant;
        selectedCombatantIndex = null;
    }

    sortCombatants();
}

function sortCombatants() {
    // Sort combatants by initiative (descending) and prioritize players in case of ties
    combatants.sort((a, b) => {
        if (a.initiative === b.initiative) {
            return b.isPlayer - a.isPlayer;
        }
        return b.initiative - a.initiative;
    });

    renderCombatants();
}

function renderCombatants() {
    const combatantList = document.getElementById('combatant-list');
    combatantList.innerHTML = '';

    combatants.forEach((combatant, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.style.color = combatant.currentHp <= 0 ? 'gray' : 'inherit';
        listItem.innerHTML = `
            ${combatant.name} (Initiative: ${combatant.initiative})
            <span>
                Max HP: ${combatant.maxHp} | Current HP: ${combatant.currentHp} | Effects: ${combatant.effects}
            </span>
            <button type="button" class="btn btn-sm btn-secondary" onclick="editCombatant(${index})">Edit</button>
        `;

        combatantList.appendChild(listItem);
    });
}

function editCombatant(index) {
    const combatant = combatants[index];
    selectedCombatantIndex = index;

    document.getElementById('name').value = combatant.name;
    document.getElementById('initiative').value = combatant.initiative;
    document.getElementById('max-hp').value = combatant.maxHp;
    document.getElementById('current-hp').value = combatant.currentHp;
    document.getElementById('effects').value = combatant.effects;
    document.getElementById('is-player').checked = combatant.isPlayer;
}

function clearForm() {
    document.getElementById('combatant-form').reset();
}
