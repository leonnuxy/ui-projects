// cards.js - Card component logic
export function createCard({ title, content, image, actions = [] }) {
    const card = document.createElement('div');
    card.className = 'card bg-white rounded-xl shadow-md overflow-hidden flex flex-col';
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.alt = title;
        img.className = 'w-full h-40 object-cover';
        card.appendChild(img);
    }
    const body = document.createElement('div');
    body.className = 'p-4 flex-1 flex flex-col';
    const h3 = document.createElement('h3');
    h3.className = 'font-bold text-lg mb-2';
    h3.textContent = title;
    body.appendChild(h3);
    const p = document.createElement('p');
    p.className = 'text-gray-600 flex-1';
    p.textContent = content;
    body.appendChild(p);
    if (actions.length) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'mt-4 flex gap-2';
        actions.forEach(({ label, onClick }) => {
            const btn = document.createElement('button');
            btn.className = 'bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600';
            btn.textContent = label;
            btn.onclick = onClick;
            actionsDiv.appendChild(btn);
        });
        body.appendChild(actionsDiv);
    }
    card.appendChild(body);
    return card;
}
