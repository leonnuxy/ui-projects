// Project configuration and dynamic loading
const projects = [
    {
        id: 'restaurant_v2',
        title: 'Big Fish & Open Range Restaurant v2',
        description: 'A premium, modern restaurant website with elegant golden accents, glassmorphic design, sophisticated typography, and luxury dining experience showcase.',
        image: 'https://images.squarespace-cdn.com/content/v1/5fcae5b390791d2ff52253a6/e0504a2d-2808-4282-bb8c-ff5bf40d215a/Marda+Loop.jpg',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Glassmorphism', 'Golden UI'],
        liveUrl: './restaurant_v2/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Restaurant & Hospitality'
    },
    {
        id: 'restaurant',
        title: 'Big Fish & Open Range Restaurant (Original)',
        description: 'The original version of the restaurant website featuring modular components, interactive elements, and beautiful typography.',
        image: 'https://images.squarespace-cdn.com/content/v1/5fcae5b390791d2ff52253a6/e0504a2d-2808-4282-bb8c-ff5bf40d215a/Marda+Loop.jpg',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
        liveUrl: './restaurant/index.html',
        githubUrl: '#',
        featured: false,
        category: 'Restaurant & Hospitality'
    },
    // Add more projects here as you create them
];

// Function to create project cards
function createProjectCard(project) {
    const techTags = project.technologies.map(tech => 
        `<span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">${tech}</span>`
    ).join('');

    return `
        <div class="project-card rounded-xl overflow-hidden card-hover">
            <div class="relative h-48 overflow-hidden">
                <img src="${project.image}" alt="${project.title}" 
                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
                <div class="absolute top-4 right-4">
                    ${project.featured ? '<span class="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>' : ''}
                </div>
            </div>
            <div class="p-6">
                <div class="mb-2">
                    <span class="text-sm text-gray-500 font-medium">${project.category}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">${project.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${project.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                    ${techTags}
                </div>
                
                <div class="flex space-x-3">
                    <a href="${project.liveUrl}" target="_blank" 
                       class="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-primary-dark transition duration-300">
                        <i class="fas fa-external-link-alt mr-2"></i>Live Demo
                    </a>
                    <a href="${project.githubUrl}" target="_blank" 
                       class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-300">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Function to render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="bg-white rounded-xl p-8 border border-gray-200">
                    <i class="fas fa-code text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Projects Coming Soon</h3>
                    <p class="text-gray-600 mb-6">
                        This hub is ready to showcase your frontend projects. Add your project folders to get started!
                    </p>
                    <div class="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                        <p class="text-sm font-mono text-gray-700 mb-2">Expected structure:</p>
                        <pre class="text-xs text-gray-600">
├── project-1/
│   ├── index.html
│   └── ...
├── project-2/
│   ├── index.html
│   └── ...
└── index.html (this hub)
                        </pre>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = projects.map(createProjectCard).join('');
}

// Auto-discover projects (for future enhancement)
async function discoverProjects() {
    // This function can be enhanced to automatically discover projects
    // by checking for folders with index.html files
    console.log('Project discovery feature - ready for implementation');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    discoverProjects();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects, createProjectCard, renderProjects };
}
