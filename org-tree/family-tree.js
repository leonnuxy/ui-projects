// Data for the reference family tree - starting simple
const people = [
  { id: 1, initials: 'UT', name: 'Username', year: 1990, border: 'purple' },
  { id: 2, initials: 'WT', name: 'Wife', year: 1992, border: 'red' },
];

function createPersonCard(person) {
  const card = document.createElement('div');
  card.className = `person-card border-${person.border}`;
  card.innerHTML = `
    <div class="initials-circle initials-${person.border}">${person.initials}</div>
    <div class="person-name">${person.name}</div>
    ${person.year ? `<div class="person-dob">${person.year}</div>` : ''}
  `;
  card.addEventListener('click', () => showPersonModal(person));
  return card;
}

function showPersonModal(person) {
  let modal = document.getElementById('person-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'person-modal';
    modal.className = 'person-modal-overlay';
    modal.innerHTML = `
      <div class="person-modal">
        <button class="person-modal-close">&times;</button>
        <div class="person-modal-content"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.person-modal-close').onclick = () => modal.style.display = 'none';
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
  }
  const content = modal.querySelector('.person-modal-content');
  content.innerHTML = `
    <div class="initials-circle initials-${person.border}" style="margin-bottom:18px;">${person.initials}</div>
    <div class="person-modal-name">${person.name}</div>
    <div class="person-modal-dob">Date of Birth: ${person.year || 'N/A'}</div>
    <button class="person-modal-profile-btn">View Profile</button>
  `;
  modal.style.display = 'flex';
  content.querySelector('.person-modal-profile-btn').onclick = () => {
    alert('Profile page coming soon!');
  };
}

function renderFamilyTree(container) {
  // Main wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'family-tree-wrapper';

  // Spouses row with relative positioning
  const spousesRow = document.createElement('div');
  spousesRow.className = 'spouses-row';
  spousesRow.style.position = 'relative';

  // Card containers for spacing
  const userCardContainer = document.createElement('div');
  userCardContainer.className = 'spouse-card-container';
  const spouseCardContainer = document.createElement('div');
  spouseCardContainer.className = 'spouse-card-container';

  const userCard = people.find(p => p.id === 1);
  const spouseCard = people.find(p => p.id === 2);
  userCardContainer.appendChild(createPersonCard(userCard));
  spouseCardContainer.appendChild(createPersonCard(spouseCard));

  spousesRow.appendChild(userCardContainer);
  spousesRow.appendChild(spouseCardContainer);

  // Marriage line absolutely positioned between the two cards
  const marriageLine = document.createElement('div');
  marriageLine.className = 'marriage-line';
  spousesRow.appendChild(marriageLine);

  wrapper.appendChild(spousesRow);
  container.appendChild(wrapper);
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('org-tree-root');
  root.innerHTML = '';
  renderFamilyTree(root);
});
