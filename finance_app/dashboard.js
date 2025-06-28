// Load sidebar and header from external files and initialize app
async function loadComponents() {
    try {
        // Load sidebar and header in parallel
        const [sidebarResponse, headerResponse] = await Promise.all([
            fetch('sidebar.html'),
            fetch('header.html')
        ]);
        
        const sidebarHTML = await sidebarResponse.text();
        const headerHTML = await headerResponse.text();
        
        document.getElementById('sidebar-container').innerHTML = sidebarHTML;
        document.getElementById('header-container').innerHTML = headerHTML;
        
        initializeApp();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initializeApp() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');
    const openMobileSidebarButton = document.getElementById('openMobileSidebar');
    const closeMobileSidebarButton = document.getElementById('closeMobileSidebar');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const desktopSidebar = document.getElementById('desktopSidebar');
    const mainContent = document.querySelector('.main-content');
    const profileDropdownToggle = document.getElementById('profileDropdownToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    const headerUploadBtn = document.getElementById('headerUploadBtn');
    const headerUploadBtnMobile = document.getElementById('headerUploadBtnMobile');
    const uploadStatementCTA = document.getElementById('uploadStatementCTA');

    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId + '-page') {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        window.location.hash = pageId;
        closeMobileSidebar();
    }

    function openMobileSidebar() {
        if (mobileSidebar && sidebarOverlay) {
            mobileSidebar.classList.add('open');
            sidebarOverlay.classList.add('show');
            document.body.classList.add('body-overlay-active');
        }
    }

    function closeMobileSidebar() {
        if (mobileSidebar && sidebarOverlay) {
            mobileSidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
            document.body.classList.remove('body-overlay-active');
        }
    }

    function toggleSidebar() {
        if (desktopSidebar) {
            const isCollapsed = desktopSidebar.classList.contains('sidebar-collapsed');
            if (isCollapsed) {
                expandSidebar();
            } else {
                collapseSidebar();
            }
        }
    }

    function collapseSidebar() {
        if (desktopSidebar && mainContent) {
            desktopSidebar.classList.add('sidebar-collapsed');
            mainContent.classList.add('sidebar-collapsed');
            const toggleIcon = sidebarToggle?.querySelector('.material-icons');
            if (toggleIcon) {
                toggleIcon.textContent = 'chevron_right';
            }
            localStorage.setItem('sidebarCollapsed', 'true');
        }
    }

    function expandSidebar() {
        if (desktopSidebar && mainContent) {
            desktopSidebar.classList.remove('sidebar-collapsed');
            mainContent.classList.remove('sidebar-collapsed');
            const toggleIcon = sidebarToggle?.querySelector('.material-icons');
            if (toggleIcon) {
                toggleIcon.textContent = 'chevron_left';
            }
            localStorage.setItem('sidebarCollapsed', 'false');
        }
    }

    function initializeSidebarState() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            collapseSidebar();
        } else {
            expandSidebar();
        }
    }

    function toggleProfileDropdown() {
        if (profileDropdown) {
            const isOpen = profileDropdown.classList.contains('profile-dropdown-open');
            if (isOpen) {
                closeProfileDropdown();
            } else {
                openProfileDropdown();
            }
        }
    }

    function openProfileDropdown() {
        if (profileDropdown) {
            profileDropdown.classList.add('profile-dropdown-open');
            profileDropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
            profileDropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
        }
    }

    function closeProfileDropdown() {
        if (profileDropdown) {
            profileDropdown.classList.remove('profile-dropdown-open');
            profileDropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
            profileDropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
        }
    }

    function triggerUpload() {
        console.log('Upload functionality triggered');
    }

    // Event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            if (pageId) showPage(pageId);
        });
    });

    if (openMobileSidebarButton) openMobileSidebarButton.addEventListener('click', openMobileSidebar);
    if (closeMobileSidebarButton) closeMobileSidebarButton.addEventListener('click', closeMobileSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileSidebar);
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
    if (profileDropdownToggle) profileDropdownToggle.addEventListener('click', toggleProfileDropdown);
    if (headerUploadBtn) headerUploadBtn.addEventListener('click', triggerUpload);
    if (headerUploadBtnMobile) headerUploadBtnMobile.addEventListener('click', triggerUpload);
    if (uploadStatementCTA) uploadStatementCTA.addEventListener('click', triggerUpload);

    document.addEventListener('click', (e) => {
        if (profileDropdown && profileDropdownToggle && 
            !profileDropdownToggle.contains(e.target) && 
            !profileDropdown.contains(e.target)) {
            closeProfileDropdown();
        }
    });

    initializeSidebarState();
    const initialPage = window.location.hash.substring(1) || 'dashboard';
    showPage(initialPage);
}

document.addEventListener('DOMContentLoaded', loadComponents);
