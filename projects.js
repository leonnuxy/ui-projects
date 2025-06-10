// Project configuration and dynamic loading
const projects = [
    {
        id: 'restaurant_v2',
        title: 'Bistro Luxe - Premium Restaurant Experience',
        description: 'A fully refactored, modular restaurant website with elegant golden accents, glassmorphic design, sophisticated typography, interactive features, and premium dining experience showcase.',
        image: './restaurant_v2/restaurant-v2-screenshot.png',
        technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Tailwind CSS', 'Glassmorphism', 'Modular Architecture'],
        liveUrl: './restaurant_v2/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Restaurant & Hospitality'
    },
    {
        id: 'finance_app',
        title: 'Personal Finance Dashboard',
        description: 'A comprehensive financial management application with expense tracking, budget planning, investment portfolio overview, and detailed analytics for personal finance management.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'LocalStorage', 'Responsive Design'],
        liveUrl: './finance_app/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Finance & Analytics'
    },
    {
        id: 'rental_booking',
        title: 'Property Rental Platform',
        description: 'A modern property rental booking system with search functionality, detailed listings, booking management, and user-friendly interface for both property owners and renters.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Form Validation', 'Responsive Design'],
        liveUrl: './rental_booking/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Real Estate & Booking'
    },
    {
        id: 'restaurant',
        title: 'Big Fish & Open Range Restaurant (Original)',
        description: 'The original version of the restaurant website featuring modular components, interactive elements, and beautiful typography.',
        image: './restaurant/restaurant-screenshot.png',
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
        `<span class="glass-morphism px-3 py-1 rounded-full text-sm font-medium text-neon-green-400 border border-dark-green-500/30">${tech}</span>`
    ).join('');

    return `
        <div class="glass-morphism rounded-3xl overflow-hidden card-hover-effect group min-h-[600px] flex flex-col">
            <div class="relative h-48 overflow-hidden">
                <img src="${project.image}" alt="${project.title}" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-dark-bg-primary/80 via-transparent to-transparent"></div>
                <div class="absolute top-4 right-4">
                    ${project.featured ? '<span class="glass-morphism-green text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse-green">Featured</span>' : ''}
                </div>
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <div class="mb-3">
                    <span class="text-sm text-dark-green-400 font-semibold uppercase tracking-wider">${project.category}</span>
                </div>
                <div class="h-16 mb-4 flex items-start">
                    <h3 class="text-2xl font-bold text-white group-hover:text-neon-green-400 transition-colors duration-300 line-clamp-2">${project.title}</h3>
                </div>
                <div class="flex-grow mb-6 hidden sm:block">
                    <p class="text-gray-300 leading-relaxed text-sm line-clamp-4">${project.description}</p>
                </div>
                
                <div class="flex flex-wrap gap-2 mb-4 sm:mb-6 min-h-[60px] sm:min-h-[80px] content-start">
                    ${techTags}
                </div>
                
                <div class="flex space-x-2 sm:space-x-3 mt-auto">
                    <a href="${project.liveUrl}" target="_blank" 
                       class="flex-1 bg-gradient-to-r from-dark-green-500 to-neon-green-400 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-2xl sm:rounded-3xl font-medium sm:font-semibold text-center text-sm sm:text-base hover:shadow-lg hover:shadow-dark-green-500/25 transition-all duration-300 transform hover:scale-105">
                        <i class="fas fa-external-link-alt mr-1 sm:mr-2 text-xs sm:text-sm"></i><span class="hidden xs:inline">Live </span>Demo
                    </a>
                    <a href="${project.githubUrl}" target="_blank" 
                       class="glass-morphism px-3 py-2 sm:px-6 sm:py-3 border border-white/10 text-white rounded-2xl sm:rounded-3xl font-medium sm:font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                        <i class="fab fa-github text-xs sm:text-sm"></i>
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
