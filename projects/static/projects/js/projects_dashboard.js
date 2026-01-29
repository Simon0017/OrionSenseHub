// Mock Projects Data
const mockProjects = [
    {
        id: 1,
        name: 'Smart Home System',
        description: 'Comprehensive home automation system with temperature, lighting, and security controls for modern residential buildings.',
        category: 'smart-home',
        status: 'active',
        devices: 32,
        owner: 'John Doe',
        members: [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Smith', email: 'jane@example.com' },
            { name: 'Mike Johnson', email: 'mike@example.com' }
        ],
        createdAt: '2025-12-15',
        updatedAt: '2026-01-29',
        analytics: {
            dataPoints: 45600,
            uptime: 99.8,
            alerts: 3
        }
    },
    {
        id: 2,
        name: 'Industrial Monitoring',
        description: 'Real-time monitoring system for factory equipment with predictive maintenance capabilities and safety alerts.',
        category: 'industrial',
        status: 'active',
        devices: 48,
        owner: 'Sarah Williams',
        members: [
            { name: 'Sarah Williams', email: 'sarah@example.com' },
            { name: 'Tom Brown', email: 'tom@example.com' },
            { name: 'Lisa Anderson', email: 'lisa@example.com' },
            { name: 'David Lee', email: 'david@example.com' },
            { name: 'Emily Chen', email: 'emily@example.com' }
        ],
        createdAt: '2025-11-20',
        updatedAt: '2026-01-29',
        analytics: {
            dataPoints: 128500,
            uptime: 99.9,
            alerts: 1
        }
    },
    {
        id: 3,
        name: 'Environmental Sensors',
        description: 'Network of environmental monitoring sensors for air quality, noise levels, and weather conditions across urban areas.',
        category: 'environmental',
        status: 'idle',
        devices: 24,
        owner: 'Michael Green',
        members: [
            { name: 'Michael Green', email: 'michael@example.com' },
            { name: 'Anna White', email: 'anna@example.com' }
        ],
        createdAt: '2026-01-05',
        updatedAt: '2026-01-28',
        analytics: {
            dataPoints: 18200,
            uptime: 97.5,
            alerts: 8
        }
    },
    {
        id: 4,
        name: 'Agriculture IoT',
        description: 'Precision agriculture system monitoring soil moisture, temperature, and crop health for optimal yield management.',
        category: 'agriculture',
        status: 'active',
        devices: 52,
        owner: 'Robert Farm',
        members: [
            { name: 'Robert Farm', email: 'robert@example.com' },
            { name: 'Maria Garcia', email: 'maria@example.com' },
            { name: 'James Wilson', email: 'james@example.com' }
        ],
        createdAt: '2025-10-10',
        updatedAt: '2026-01-29',
        analytics: {
            dataPoints: 95400,
            uptime: 98.7,
            alerts: 5
        }
    },
    {
        id: 5,
        name: 'Healthcare Monitoring',
        description: 'Patient vital signs monitoring system for remote healthcare with real-time alerts and data analytics.',
        category: 'healthcare',
        status: 'active',
        devices: 28,
        owner: 'Dr. Patricia Moore',
        members: [
            { name: 'Dr. Patricia Moore', email: 'patricia@example.com' },
            { name: 'Nurse Kelly', email: 'kelly@example.com' }
        ],
        createdAt: '2025-12-01',
        updatedAt: '2026-01-29',
        analytics: {
            dataPoints: 67800,
            uptime: 99.95,
            alerts: 2
        }
    },
    {
        id: 6,
        name: 'Warehouse Logistics',
        description: 'Automated warehouse management with inventory tracking, location monitoring, and optimization algorithms.',
        category: 'industrial',
        status: 'archived',
        devices: 18,
        owner: 'Alex Turner',
        members: [
            { name: 'Alex Turner', email: 'alex@example.com' }
        ],
        createdAt: '2025-08-15',
        updatedAt: '2025-12-20',
        analytics: {
            dataPoints: 42100,
            uptime: 96.2,
            alerts: 12
        }
    }
];

// Global state
let projects = [...mockProjects];
let currentFilter = 'all';
let currentSort = 'updated';
let projectToDelete = null;

// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const projectsList = document.getElementById('projectsList');
const createProjectBtn = document.getElementById('createProjectBtn');
const createProjectModal = document.getElementById('createProjectModal');
const deleteProjectModal = document.getElementById('deleteProjectModal');
const searchInput = document.getElementById('searchProjects');
const sortSelect = document.getElementById('sortSelect');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeFilters();
    initializeSort();
    initializeSearch();
    initializeModals();
    renderProjects();
});

// Sidebar Toggle
function initializeSidebar() {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.querySelector('a').getAttribute('href').includes('.html')) {
                e.preventDefault();
            }
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderProjects();
        });
    });
}

// Sort
function initializeSort() {
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProjects();
    });
}

// Search
function initializeSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderProjects(searchTerm);
    });
}

// Modal Management
function initializeModals() {
    // Create Project Modal
    createProjectBtn.addEventListener('click', openCreateModal);
    document.getElementById('closeCreateModal').addEventListener('click', closeCreateModal);
    document.getElementById('cancelCreate').addEventListener('click', closeCreateModal);
    document.getElementById('modalOverlay').addEventListener('click', closeCreateModal);
    
    // Delete Project Modal
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
    document.getElementById('deleteModalOverlay').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDelete').addEventListener('click', confirmDeleteProject);
    
    // Create Project Form Submit
    document.getElementById('createProjectForm').addEventListener('submit', handleCreateProject);
}

function openCreateModal() {
    createProjectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCreateModal() {
    createProjectModal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('createProjectForm').reset();
}

function openDeleteModal(project) {
    projectToDelete = project;
    const deleteInfo = document.getElementById('deleteProjectInfo');
    deleteInfo.innerHTML = `
        <div class="delete-project-name">${project.name}</div>
        <div class="delete-project-meta">
            ${project.devices} devices • Created ${formatDate(project.createdAt)}
        </div>
    `;
    deleteProjectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
    deleteProjectModal.classList.remove('active');
    document.body.style.overflow = '';
    projectToDelete = null;
}

function confirmDeleteProject() {
    if (projectToDelete) {
        projects = projects.filter(p => p.id !== projectToDelete.id);
        closeDeleteModal();
        renderProjects();
        showNotification('Project deleted successfully', 'success');
    }
}

// Create Project
function handleCreateProject(e) {
    e.preventDefault();
    
    const formData = {
        id: projects.length + 1,
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        category: document.getElementById('projectCategory').value,
        status: document.getElementById('projectStatus').value,
        devices: 0,
        owner: 'John Doe',
        members: parseMembers(document.getElementById('projectMembers').value),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        analytics: {
            dataPoints: 0,
            uptime: 100,
            alerts: 0
        }
    };
    
    projects.unshift(formData);
    closeCreateModal();
    renderProjects();
    showNotification('Project created successfully', 'success');
}

function parseMembers(membersString) {
    if (!membersString.trim()) return [{ name: 'John Doe', email: 'john@example.com' }];
    
    const emails = membersString.split(',').map(e => e.trim()).filter(e => e);
    return emails.map(email => ({
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email
    }));
}

// Render Projects
function renderProjects(searchTerm = '') {
    let filteredProjects = projects;
    
    // Apply filter
    if (currentFilter !== 'all') {
        filteredProjects = filteredProjects.filter(p => p.status === currentFilter);
    }
    
    // Apply search
    if (searchTerm) {
        filteredProjects = filteredProjects.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.owner.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply sort
    filteredProjects = sortProjects(filteredProjects, currentSort);
    
    // Render
    if (filteredProjects.length === 0) {
        projectsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-folder-open"></i></div>
                <h2 class="empty-title">No projects found</h2>
                <p class="empty-description">
                    ${searchTerm ? 'Try adjusting your search or filters' : 'Get started by creating your first project'}
                </p>
                ${!searchTerm ? '<button class="btn-primary" onclick="openCreateModal()"><i class="fas fa-plus"></i> Create Project</button>' : ''}
            </div>
        `;
    } else {
        projectsList.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');
        attachProjectEventListeners();
    }
}

function sortProjects(projects, sortBy) {
    const sorted = [...projects];
    
    switch(sortBy) {
        case 'updated':
            return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        case 'created':
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'devices':
            return sorted.sort((a, b) => b.devices - a.devices);
        default:
            return sorted;
    }
}

function createProjectCard(project) {
    const statusColor = getStatusColor(project.status);
    const categoryIcon = getCategoryIcon(project.category);
    
    return `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-card-header">
                <div class="project-title-section">
                    <div class="project-title">
                        <div class="project-icon">
                            <i class="fas ${categoryIcon}"></i>
                        </div>
                        ${project.name}
                    </div>
                    <p class="project-description">${project.description}</p>
                </div>
                <div class="project-actions">
                    <button class="action-btn edit-btn" title="Edit Project">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete delete-btn" title="Delete Project">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="project-meta">
                <div class="meta-item">
                    <div class="meta-icon devices">
                        <i class="fas fa-microchip"></i>
                    </div>
                    <div class="meta-content">
                        <div class="meta-label">Devices</div>
                        <div class="meta-value">${project.devices}</div>
                    </div>
                </div>
                
                <div class="meta-item">
                    <div class="meta-icon status">
                        <i class="fas fa-${getStatusIcon(project.status)}"></i>
                    </div>
                    <div class="meta-content">
                        <div class="meta-label">Status</div>
                        <div class="meta-value" style="color: ${statusColor}">${capitalizeFirst(project.status)}</div>
                    </div>
                </div>
                
                <div class="meta-item">
                    <div class="meta-icon members">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="meta-content">
                        <div class="meta-label">Team Members</div>
                        <div class="meta-value">${project.members.length}</div>
                    </div>
                    ${renderMembersAvatars(project.members)}
                </div>
                
                <div class="meta-item">
                    <div class="meta-icon owner">
                        <i class="fas fa-user-shield"></i>
                    </div>
                    <div class="meta-content">
                        <div class="meta-label">Owner</div>
                        <div class="meta-value">${project.owner}</div>
                    </div>
                </div>
            </div>
            
            <div class="project-stats">
                <div class="stat-box">
                    <div class="stat-box-value">${formatNumber(project.analytics.dataPoints)}</div>
                    <div class="stat-box-label">Data Points</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-value">${project.analytics.uptime}%</div>
                    <div class="stat-box-label">Uptime</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-value">${project.analytics.alerts}</div>
                    <div class="stat-box-label">Active Alerts</div>
                </div>
            </div>
            
            <div class="project-footer">
                <div class="project-timestamps">
                    <div class="timestamp">
                        <i class="fas fa-calendar-plus"></i>
                        Created: ${formatDate(project.createdAt)}
                    </div>
                    <div class="timestamp">
                        <i class="fas fa-calendar-check"></i>
                        Updated: ${formatDate(project.updatedAt)}
                    </div>
                </div>
                <div class="project-cta">
                    <button class="btn-outline view-project-btn">
                        <i class="fas fa-arrow-right"></i> View Project
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderMembersAvatars(members) {
    if (members.length === 0) return '';
    
    const maxDisplay = 3;
    const displayMembers = members.slice(0, maxDisplay);
    const remaining = members.length - maxDisplay;
    
    let html = '<div class="members-avatars">';
    displayMembers.forEach(member => {
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=667eea&color=fff`;
        html += `<img src="${avatarUrl}" alt="${member.name}" class="member-avatar" title="${member.name}">`;
    });
    
    if (remaining > 0) {
        html += `<div class="members-more" title="${remaining} more members">+${remaining}</div>`;
    }
    
    html += '</div>';
    return html;
}

function attachProjectEventListeners() {
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = parseInt(btn.closest('.project-card').dataset.projectId);
            const project = projects.find(p => p.id === projectId);
            if (project) openDeleteModal(project);
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification('Edit functionality coming soon!', 'info');
        });
    });
    
    // View project buttons
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.closest('.project-card').dataset.projectId;
            showNotification(`Opening project ${projectId}...`, 'info');
        });
    });
}

// Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getStatusColor(status) {
    const colors = {
        active: '#10b981',
        idle: '#f59e0b',
        archived: '#64748b'
    };
    return colors[status] || '#64748b';
}

function getStatusIcon(status) {
    const icons = {
        active: 'check-circle',
        idle: 'pause-circle',
        archived: 'archive'
    };
    return icons[status] || 'circle';
}

function getCategoryIcon(category) {
    const icons = {
        'smart-home': 'fa-home',
        'industrial': 'fa-industry',
        'agriculture': 'fa-seedling',
        'healthcare': 'fa-heartbeat',
        'environmental': 'fa-leaf',
        'other': 'fa-folder'
    };
    return icons[category] || 'fa-folder';
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Projects dashboard initialized with', projects.length, 'projects');