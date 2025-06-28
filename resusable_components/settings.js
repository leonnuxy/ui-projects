// settings.js - Settings component logic
export function createSettings({ settings = [], onChange }) {
    const wrapper = document.createElement('div');
    wrapper.className = 'settings space-y-4';
    settings.forEach(setting => {
        const row = document.createElement('div');
        row.className = 'flex items-center gap-4';
        const label = document.createElement('label');
        label.className = 'font-medium';
        label.textContent = setting.label;
        row.appendChild(label);
        let input;
        if (setting.type === 'toggle') {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = !!setting.value;
            input.className = 'toggle-checkbox';
            input.onchange = e => onChange && onChange(setting.key, e.target.checked);
        } else {
            input = document.createElement('input');
            input.type = setting.type || 'text';
            input.value = setting.value || '';
            input.className = 'border px-2 py-1 rounded';
            input.oninput = e => onChange && onChange(setting.key, e.target.value);
        }
        row.appendChild(input);
        wrapper.appendChild(row);
    });
    return wrapper;
}
