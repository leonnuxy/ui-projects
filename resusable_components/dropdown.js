// dropdown.js - Dropdown component logic
export function createDropdown({ options = [], onChange, placeholder = 'Select...' }) {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';
    const select = document.createElement('select');
    select.className = 'block w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400';
    if (placeholder) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.disabled = true;
        opt.selected = true;
        opt.textContent = placeholder;
        select.appendChild(opt);
    }
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
    });
    select.onchange = e => onChange && onChange(e.target.value);
    wrapper.appendChild(select);
    return wrapper;
}
