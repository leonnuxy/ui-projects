// Project configuration and dynamic loading
const projects = [
    {
        id: 'restaurant_v2',
        title: 'Bistro Luxe - Premium Restaurant Experience',
        image: './restaurant_v2/restaurant-v2-screenshot.png',
        technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
        liveUrl: './restaurant_v2/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Restaurant & Hospitality'
    },
    {
        id: 'finance_app',
        title: 'Personal Finance Dashboard',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
        liveUrl: './finance_app/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Finance & Analytics'
    },
    {
        id: 'rental_booking',
        title: 'Property Rental Platform',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
        liveUrl: './rental_booking/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Real Estate & Booking'
    },
    {
        id: 'restaurant',
        title: 'Big Fish & Open Range Restaurant (Original)',
        image: './restaurant/restaurant-screenshot.png',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
        liveUrl: './restaurant/index.html',
        githubUrl: '#',
        featured: false,
        category: 'Restaurant & Hospitality'
    },
    {
        id: 'real_estate',
        title: 'Real Estate Listing Platform',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        technologies: ['HTML5', 'CSS3', 'Typescript', 'API Integration',],
        liveUrl: './real_estate/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Real Estate & Booking'
    },
    // Reusable Components Demo
    {
        id: 'resusable_components',
        title: 'Reusable UI Components Demo',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Modular Components'],
        liveUrl: './resusable_components/index.html',
        githubUrl: '#',
        featured: false,
        category: 'UI Components'
    }
    // Add more projects here as you create them
];

// Function to create project cards
// Function to create project cards with the title moved to the bottom
function createProjectCard(project) {
    // Generate tech tags
    const techTags = project.technologies.map(tag =>
        `<span class="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">${tag}</span>`
    ).join('');

    // Conditionally create the GitHub button
    const githubButton = project.githubUrl && project.githubUrl !== '#' ? `
        <a href="${project.githubUrl}" target="_blank" 
           class="bg-white/10 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center" title="View on GitHub">
            <i class="fab fa-github text-lg"></i>
        </a>
    ` : '';

    // Main HTML structure for the card
    // Note: The card-glow class is not in the provided code, but you can add it back if you wish.
    return `
        <div class="relative rounded-3xl shadow-2xl overflow-hidden group h-[520px] flex flex-col justify-end text-white bg-gray-900">

            <img src="${project.image}" alt="${project.title}"
                 class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110" />

            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
            
            <div class="absolute top-4 right-4 z-20">
                ${project.featured ? '<span class="bg-green-500/30 backdrop-blur-md text-green-100 px-3 py-1 rounded-full text-sm font-semibold">Featured</span>' : ''}
            </div>

            <div class="relative z-20 p-6 w-full flex flex-col flex-grow">
                
                <p class="text-sm font-semibold uppercase tracking-wider text-green-400 mb-2 text-shadow">${project.category}</p>
                
                
                <div class="mt-auto pt-6 border-t border-white/10">
                <div class="flex flex-wrap gap-2 mb-6">
                    ${techTags}
                </div>
                <h3 class="text-3xl font-bold mb-4 text-shadow line-clamp-3">${project.title}</h3>

                    <div class="flex gap-3">
                        <a href="${project.liveUrl}" target="_blank" 
                           class="flex-1 bg-gradient-to-r from-green-500 to-green-400 text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                            <i class="fas fa-external-link-alt text-sm"></i>
                            <span>Live Demo</span>
                        </a>
                        ${githubButton}
                    </div>
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
document.addEventListener('DOMContentLoaded', function () {
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
