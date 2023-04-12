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
