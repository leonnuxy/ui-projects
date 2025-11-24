// Example org tree data
const orgData = [
  {
    label: 'CEO',
    children: [
      {
        label: 'CTO',
        children: [
          { label: 'Dev Team Lead', children: [
            { label: 'Frontend Dev' },
            { label: 'Backend Dev' },
            { label: 'QA Engineer' }
          ] },
          { label: 'DevOps' }
        ]
      },
      {
        label: 'CFO',
        children: [
          { label: 'Accountant' },
          { label: 'Financial Analyst' }
        ]
      },
      {
        label: 'COO',
        children: [
          { label: 'Operations Manager' },
          { label: 'HR Manager', children: [
            { label: 'Recruiter' },
            { label: 'HR Assistant' }
          ] }
        ]
      }
    ]
  }
];

function createTreeNode(node) {
  const li = document.createElement('li');
  const hasChildren = node.children && node.children.length > 0;
  if (hasChildren) {
    const toggle = document.createElement('span');
    toggle.className = 'toggle';
    toggle.textContent = '▼';
    li.appendChild(toggle);
    li.classList.add('collapsible');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      li.classList.toggle('collapsed');
      toggle.textContent = li.classList.contains('collapsed') ? '►' : '▼';
    });
  }
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = node.label;
  li.appendChild(label);
  if (hasChildren) {
    const ul = document.createElement('ul');
    node.children.forEach(child => {
      ul.appendChild(createTreeNode(child));
    });
    li.appendChild(ul);
  }
  return li;
}

function renderOrgTree(data, container) {
  const ul = document.createElement('ul');
  ul.className = 'org-tree';
  data.forEach(node => {
    ul.appendChild(createTreeNode(node));
  });
  container.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('org-tree-root');
  renderOrgTree(orgData, root);
});
