// tabs.js - Tabs component logic
export function createTabs({ tabs = [], onTabChange }) {
    const wrapper = document.createElement('div');
    wrapper.className = 'tabs';
    const tabList = document.createElement('div');
    tabList.className = 'flex border-b mb-4';
    let activeIndex = 0;
    tabs.forEach((tab, idx) => {
        const btn = document.createElement('button');
        btn.className = 'px-4 py-2 font-semibold ' + (idx === 0 ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600');
        btn.textContent = tab.label;
        btn.onclick = () => {
            activeIndex = idx;
            Array.from(tabList.children).forEach((b, i) => {
                b.className = 'px-4 py-2 font-semibold ' + (i === idx ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600');
            });
            tabPanels.childNodes.forEach((panel, i) => {
                panel.style.display = i === idx ? 'block' : 'none';
            });
            onTabChange && onTabChange(tab, idx);
        };
        tabList.appendChild(btn);
    });
    wrapper.appendChild(tabList);
    const tabPanels = document.createElement('div');
    tabPanels.className = 'tab-panels';
    tabs.forEach((tab, idx) => {
        const panel = document.createElement('div');
        panel.className = 'tab-panel';
        panel.style.display = idx === 0 ? 'block' : 'none';
        if (typeof tab.content === 'string') {
            panel.innerHTML = tab.content;
        } else if (tab.content instanceof HTMLElement) {
            panel.appendChild(tab.content);
        }
        tabPanels.appendChild(panel);
    });
    wrapper.appendChild(tabPanels);
    return wrapper;
}
