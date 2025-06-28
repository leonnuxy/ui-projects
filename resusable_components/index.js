// index.js - Entry point to tie all reusable components together
import { createCard } from './cards.js';
import { createDropdown } from './dropdown.js';
import { createTabs } from './tabs.js';
import { createSettings } from './settings.js';

window.addEventListener('DOMContentLoaded', () => {
    // Cards Example
    const cardsContainer = document.getElementById('cards-demo');
    if (cardsContainer) {
        const card1 = createCard({
            title: 'Sample Card',
            content: 'This is a reusable card component.',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            actions: [
                { label: 'Action', onClick: () => alert('Card Action!') }
            ]
        });
        cardsContainer.appendChild(card1);
    }

    // Dropdown Example
    const dropdownContainer = document.getElementById('dropdown-demo');
    if (dropdownContainer) {
        const dropdown = createDropdown({
            options: [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' }
            ],
            onChange: val => alert('Selected: ' + val)
        });
        dropdownContainer.appendChild(dropdown);
    }

    // Tabs Example
    const tabsContainer = document.getElementById('tabs-demo');
    if (tabsContainer) {
        const tabs = createTabs({
            tabs: [
                { label: 'Tab 1', content: 'Content for Tab 1' },
                { label: 'Tab 2', content: 'Content for Tab 2' }
            ],
            onTabChange: (tab, idx) => console.log('Tab changed:', tab, idx)
        });
        tabsContainer.appendChild(tabs);
    }

    // Settings Example
    const settingsContainer = document.getElementById('settings-demo');
    if (settingsContainer) {
        const settings = createSettings({
            settings: [
                { key: 'darkMode', label: 'Dark Mode', type: 'toggle', value: false },
                { key: 'username', label: 'Username', type: 'text', value: 'User' }
            ],
            onChange: (key, value) => console.log('Setting changed:', key, value)
        });
        settingsContainer.appendChild(settings);
    }
});
