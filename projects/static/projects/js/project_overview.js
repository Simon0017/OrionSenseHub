// Mock Project Data
const projectData = {
    id: 4,
    name: 'Agriculture IoT',
    description: 'Precision agriculture system monitoring soil moisture, temperature, and crop health for optimal yield management.',
    status: 'active',
    category: 'agriculture',
    devices: 52,
    createdAt: '2025-10-10',
    members: [
        {
            id: 1,
            name: 'Robert Farm',
            email: 'robert@farm.com',
            role: 'admin',
            joinedAt: '2025-10-10'
        },
        {
            id: 2,
            name: 'Maria Garcia',
            email: 'maria@farm.com',
            role: 'editor',
            joinedAt: '2025-10-15'
        },
        {
            id: 3,
            name: 'James Wilson',
            email: 'james@farm.com',
            role: 'viewer',
            joinedAt: '2025-11-01'
        }
    ],
    apiKeys: [
        {
            id: 1,
            name: 'Production Key',
            key: 'agri_prod_a8f7d9e2b4c1f3a5e9d6b2c8f4a1e7d3',
            createdAt: '2025-10-10',
            lastUsed: '2 mins ago',
            requests: '1.2M'
        },
        {
            id: 2,
            name: 'Development Key',
            key: 'agri_dev_3c5e7f9a1b6d4e2c8a5f9b3d7e1a4c6f',
            createdAt: '2025-10-12',
            lastUsed: '1 hour ago',
            requests: '48K'
        }
    ]
};

// Mock Device Data Stream
let deviceDataStream = [
    { time: '14:32:45', device: 'Soil Moisture-01', type: 'Humidity', value: '45%', status: 'normal' },
    { time: '14:32:43', device: 'Temperature-03', type: 'Temperature', value: '24.5°C', status: 'normal' },
    { time: '14:32:40', device: 'Soil Moisture-02', type: 'Humidity', value: '38%', status: 'warning' },
    { time: '14:32:38', device: 'Light Sensor-04', type: 'Light', value: '1024 lux', status: 'normal' },
    { time: '14:32:35', device: 'NDVI Camera-05', type: 'Health Index', value: '0.78', status: 'normal' },
];

// Mock Analytics Data
const analyticsData = [
    {
        id: 1,
        icon: 'success',
        iconClass: 'fa-check-circle',
        title: 'Optimal Soil Conditions',
        content: 'All monitored fields show ideal moisture levels between 40-60%. No irrigation needed for the next 24 hours.',
        timestamp: '5 mins ago'
    },
    {
        id: 2,
        icon: 'warning',
        iconClass: 'fa-exclamation-triangle',
        title: 'Temperature Alert',
        content: 'Field 2 temperature exceeding optimal range. Consider increasing irrigation frequency.',
        timestamp: '15 mins ago'
    },
    {
        id: 3,
        icon: 'info',
        iconClass: 'fa-leaf',
        title: 'Crop Health Analysis',
        content: 'NDVI analysis shows 95% of crops in excellent health. Minor stress detected in northeast quadrant.',
        timestamp: '1 hour ago'
    },
    {
        id: 4,
        icon: 'success',
        iconClass: 'fa-tint',
        title: 'Water Usage Optimization',
        content: 'AI-optimized irrigation schedule saved 15% water compared to traditional methods this week.',
        timestamp: '2 hours ago'
    }
];

// Mock Scheduled Actions
let schedules = [
    {
        id: 1,
        action: 'Start Irrigation',
        icon: 'fa-tint',
        time: '06:00',
        duration: 30,
        recurrence: 'daily',
        active: true,
        nextRun: 'Tomorrow at 6:00 AM'
    },
    {
        id: 2,
        action: 'Apply Fertilizer',
        icon: 'fa-flask',
        time: '18:00',
        duration: 45,
        recurrence: 'weekly',
        active: true,
        nextRun: 'Every Sunday at 6:00 PM'
    },
    {
        id: 3,
        action: 'Increase Monitoring',
        icon: 'fa-eye',
        time: '12:00',
        duration: 60,
        recurrence: 'daily',
        active: false,
        nextRun: 'Paused'
    }
];

// Mock Action History
const actionHistory = [
    {
        time: '2 hours ago',
        action: 'Irrigation Completed',
        description: 'Field 1 & 2 irrigated for 30 minutes. Water usage: 450L'
    },
    {
        time: '5 hours ago',
        action: 'Fertilizer Applied',
        description: 'Nitrogen-based fertilizer applied to Field 3. Amount: 25kg'
    },
    {
        time: '1 day ago',
        action: 'NDVI Scan Completed',
        description: 'Full field scan completed. Health index: 0.82 (Excellent)'
    },
    {
        time: '2 days ago',
        action: 'Irrigation Schedule Updated',
        description: 'AI recommendation: Reduced frequency due to optimal moisture levels'
    },
    {
        time: '3 days ago',
        action: 'Alert Resolved',
        description: 'Temperature alert in Field 2 resolved. Normal conditions restored'
    }
];

// Global State
let members = [...projectData.members];
let apiKeys = [...projectData.apiKeys];
let currentMemberEdit = null;
let currentActionConfirm = null;

// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeModals();
    initializeCharts();
    renderDeviceData();
    renderAnalytics();
    renderSchedules();
    renderHistory();
    renderApiKeys();
    renderMembers();
    startDataStream();
});

// Sidebar Toggle
function initializeSidebar() {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

// Modal Management
function initializeModals() {
    // Edit Project
    document.getElementById('editProjectBtn').addEventListener('click', openEditProjectModal);
    document.getElementById('editProjectForm').addEventListener('submit', handleEditProject);
    
    // Add Member
    document.getElementById('addMemberBtn').addEventListener('click', () => openModal('addMemberModal'));
    document.getElementById('addMemberForm').addEventListener('submit', handleAddMember);
    
    // Generate API Key
    document.getElementById('generateKeyBtn').addEventListener('click', handleGenerateApiKey);
    
    // Add Schedule
    document.getElementById('addScheduleBtn').addEventListener('click', () => openModal('addScheduleModal'));
    document.getElementById('addScheduleForm').addEventListener('submit', handleAddSchedule);
    
    // Save Member Role
    document.getElementById('saveMemberRole').addEventListener('click', handleSaveMemberRole);
    
    // Confirm Action
    document.getElementById('confirmActionBtn').addEventListener('click', executeConfirmedAction);
    
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            closeModal(modalId);
        });
    });
    
    // Cancel buttons
    document.querySelectorAll('.btn-secondary[data-modal]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            closeModal(modalId);
        });
    });
    
    // Overlay clicks
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.parentElement;
            closeModal(modal.id);
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openEditProjectModal() {
    document.getElementById('editProjectName').value = projectData.name;
    document.getElementById('editProjectDescription').value = projectData.description;
    document.getElementById('editProjectStatus').value = projectData.status;
    document.getElementById('editProjectCategory').value = projectData.category;
    openModal('editProjectModal');
}

function handleEditProject(e) {
    e.preventDefault();
    projectData.name = document.getElementById('editProjectName').value;
    projectData.description = document.getElementById('editProjectDescription').value;
    projectData.status = document.getElementById('editProjectStatus').value;
    projectData.category = document.getElementById('editProjectCategory').value;
    
    document.getElementById('projectTitle').textContent = projectData.name;
    document.getElementById('projectDescription').textContent = projectData.description;
    
    closeModal('editProjectModal');
    showNotification('Project updated successfully', 'success');
}

// Device Data Stream
function renderDeviceData() {
    const tbody = document.getElementById('deviceDataBody');
    tbody.innerHTML = deviceDataStream.map(data => `
        <tr>
            <td class="data-time">${data.time}</td>
            <td class="data-device">${data.device}</td>
            <td class="data-type">${data.type}</td>
            <td class="data-value">${data.value}</td>
            <td><span class="data-status ${data.status}">${capitalizeFirst(data.status)}</span></td>
        </tr>
    `).join('');
}

function startDataStream() {
    setInterval(() => {
        const devices = ['Soil Moisture-01', 'Soil Moisture-02', 'Temperature-03', 'Light Sensor-04', 'NDVI Camera-05'];
        const types = ['Humidity', 'Temperature', 'Light', 'Health Index'];
        const statuses = ['normal', 'normal', 'normal', 'warning'];
        
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        
        const randomDevice = devices[Math.floor(Math.random() * devices.length)];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        let value;
        if (randomType === 'Humidity') value = `${(35 + Math.random() * 25).toFixed(0)}%`;
        else if (randomType === 'Temperature') value = `${(20 + Math.random() * 10).toFixed(1)}°C`;
        else if (randomType === 'Light') value = `${(800 + Math.random() * 400).toFixed(0)} lux`;
        else value = `${(0.7 + Math.random() * 0.2).toFixed(2)}`;
        
        deviceDataStream.unshift({
            time: timeStr,
            device: randomDevice,
            type: randomType,
            value: value,
            status: randomStatus
        });
        
        if (deviceDataStream.length > 20) deviceDataStream.pop();
        renderDeviceData();
    }, 5000);
}

// Charts Initialization
function initializeCharts() {
    initSoilMoistureChart();
    initTemperatureGauge();
    initIrrigationChart();
    initCropHealthChart();
}

function initSoilMoistureChart() {
    const ctx = document.getElementById('soilMoistureChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            datasets: [{
                label: 'Field 1',
                data: [45, 43, 42, 40, 38, 41, 44],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Field 2',
                data: [52, 50, 48, 46, 45, 47, 50],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                y: { beginAtZero: false, max: 100 }
            }
        }
    });
}

function initTemperatureGauge() {
    const ctx = document.getElementById('temperatureGauge').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Current', 'Remaining'],
            datasets: [{
                data: [24.5, 15.5],
                backgroundColor: ['#667eea', '#e2e8f0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            circumference: 180,
            rotation: 270,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

function initIrrigationChart() {
    const ctx = document.getElementById('irrigationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Irrigation (minutes)',
                data: [30, 25, 30, 20, 30, 35, 30],
                backgroundColor: '#667eea',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function initCropHealthChart() {
    const ctx = document.getElementById('cropHealthChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'NDVI Index',
                data: [0.72, 0.75, 0.79, 0.82],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: false, min: 0.6, max: 1.0 }
            }
        }
    });
}

// Analytics
function renderAnalytics() {
    const container = document.getElementById('analyticsGrid');
    container.innerHTML = analyticsData.map(item => `
        <div class="analytics-card">
            <div class="analytics-header">
                <div class="analytics-icon ${item.icon}">
                    <i class="fas ${item.iconClass}"></i>
                </div>
                <div class="analytics-title">${item.title}</div>
            </div>
            <div class="analytics-content">${item.content}</div>
            <div class="analytics-timestamp">${item.timestamp}</div>
        </div>
    `).join('');
}

// Schedules
function renderSchedules() {
    const container = document.getElementById('scheduleContainer');
    container.innerHTML = schedules.map(schedule => `
        <div class="schedule-card ${schedule.active ? 'active' : ''}">
            <div class="schedule-info">
                <div class="schedule-action">
                    <i class="fas ${schedule.icon}"></i>
                    ${schedule.action}
                </div>
                <div class="schedule-details">
                    <span class="schedule-detail">
                        <i class="fas fa-clock"></i>
                        ${schedule.time} (${schedule.duration} mins)
                    </span>
                    <span class="schedule-detail">
                        <i class="fas fa-repeat"></i>
                        ${capitalizeFirst(schedule.recurrence)}
                    </span>
                    <span class="schedule-detail">
                        <i class="fas fa-calendar-alt"></i>
                        ${schedule.nextRun}
                    </span>
                </div>
            </div>
            <div class="schedule-actions">
                <div class="schedule-toggle ${schedule.active ? 'active' : ''}" onclick="toggleSchedule(${schedule.id})">
                    <div class="schedule-toggle-slider"></div>
                </div>
                <button class="device-action-btn" onclick="editSchedule(${schedule.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="device-action-btn delete" onclick="deleteSchedule(${schedule.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function toggleSchedule(id) {
    const schedule = schedules.find(s => s.id === id);
    schedule.active = !schedule.active;
    renderSchedules();
    showNotification(`Schedule ${schedule.active ? 'activated' : 'paused'}`, 'success');
}

function editSchedule(id) {
    showNotification('Edit schedule functionality coming soon!', 'info');
}

function deleteSchedule(id) {
    currentActionConfirm = () => {
        schedules = schedules.filter(s => s.id !== id);
        renderSchedules();
        showNotification('Schedule deleted successfully', 'success');
    };
    document.getElementById('confirmMessage').textContent = 'Are you sure you want to delete this scheduled action? This cannot be undone.';
    openModal('confirmActionModal');
}

function handleAddSchedule(e) {
    e.preventDefault();
    const newSchedule = {
        id: schedules.length + 1,
        action: document.getElementById('scheduleAction').selectedOptions[0].text,
        icon: getScheduleIcon(document.getElementById('scheduleAction').value),
        time: document.getElementById('scheduleTime').value,
        duration: parseInt(document.getElementById('scheduleDuration').value),
        recurrence: document.getElementById('scheduleRecurrence').value,
        active: true,
        nextRun: 'Tomorrow at ' + document.getElementById('scheduleTime').value
    };
    
    schedules.push(newSchedule);
    renderSchedules();
    closeModal('addScheduleModal');
    showNotification('Schedule created successfully', 'success');
    document.getElementById('addScheduleForm').reset();
}

function getScheduleIcon(action) {
    const icons = {
        irrigation: 'fa-tint',
        fertilization: 'fa-flask',
        monitoring: 'fa-eye',
        notification: 'fa-bell'
    };
    return icons[action] || 'fa-clock';
}

// History
function renderHistory() {
    const container = document.getElementById('historyTimeline');
    container.innerHTML = actionHistory.map(item => `
        <div class="history-item">
            <div class="history-time">${item.time}</div>
            <div class="history-action">${item.action}</div>
            <div class="history-description">${item.description}</div>
        </div>
    `).join('');
}

// API Keys
function renderApiKeys() {
    const container = document.getElementById('apiKeysList');
    container.innerHTML = apiKeys.map(key => `
        <div class="api-key-card">
            <div class="api-key-header">
                <div>
                    <div class="api-key-name">${key.name}</div>
                </div>
                <div class="api-key-actions">
                    <button class="device-action-btn" onclick="copyApiKey('${key.key}')">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="device-action-btn delete" onclick="deleteApiKey(${key.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="api-key-value-container">
                <div class="api-key-value">${key.key}</div>
            </div>
            <div class="api-key-meta">
                <span><i class="fas fa-calendar-plus"></i> Created: ${formatDate(key.createdAt)}</span>
                <span><i class="fas fa-clock"></i> Last used: ${key.lastUsed}</span>
                <span><i class="fas fa-chart-line"></i> Requests: ${key.requests}</span>
            </div>
        </div>
    `).join('');
}

function copyApiKey(key) {
    navigator.clipboard.writeText(key);
    showNotification('API key copied to clipboard', 'success');
}

function deleteApiKey(id) {
    currentActionConfirm = () => {
        apiKeys = apiKeys.filter(k => k.id !== id);
        renderApiKeys();
        showNotification('API key deleted successfully', 'success');
    };
    document.getElementById('confirmMessage').textContent = 'Are you sure you want to delete this API key? Applications using this key will stop working.';
    openModal('confirmActionModal');
}

function handleGenerateApiKey() {
    const newKey = {
        id: apiKeys.length + 1,
        name: 'New API Key',
        key: 'agri_new_' + Math.random().toString(36).substr(2, 32),
        createdAt: new Date().toISOString().split('T')[0],
        lastUsed: 'Never',
        requests: '0'
    };
    
    apiKeys.push(newKey);
    renderApiKeys();
    showNotification('New API key generated successfully', 'success');
}

// Members
function renderMembers() {
    const container = document.getElementById('membersList');
    container.innerHTML = members.map(member => `
        <div class="member-card">
            <div class="member-header">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=667eea&color=fff" 
                     alt="${member.name}" class="member-avatar-img">
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-email">${member.email}</div>
                </div>
            </div>
            <div class="member-meta">
                <span class="member-role ${member.role}">${capitalizeFirst(member.role)}</span>
                <span class="member-joined">Joined ${formatDate(member.joinedAt)}</span>
            </div>
            <div class="member-actions">
                <button class="member-action-btn" onclick="editMember(${member.id})">
                    <i class="fas fa-edit"></i> Edit Role
                </button>
                <button class="member-action-btn remove" onclick="removeMember(${member.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
}

function handleAddMember(e) {
    e.preventDefault();
    const newMember = {
        id: members.length + 1,
        name: document.getElementById('memberEmail').value.split('@')[0],
        email: document.getElementById('memberEmail').value,
        role: document.getElementById('memberRole').value,
        joinedAt: new Date().toISOString().split('T')[0]
    };
    
    members.push(newMember);
    renderMembers();
    closeModal('addMemberModal');
    showNotification('Team member added successfully', 'success');
    document.getElementById('addMemberForm').reset();
}

function editMember(id) {
    currentMemberEdit = members.find(m => m.id === id);
    document.getElementById('editMemberInfo').innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentMemberEdit.name)}&background=667eea&color=fff" 
             alt="${currentMemberEdit.name}" class="member-avatar-img">
        <div class="member-info">
            <div class="member-name">${currentMemberEdit.name}</div>
            <div class="member-email">${currentMemberEdit.email}</div>
        </div>
    `;
    document.getElementById('editMemberRole').value = currentMemberEdit.role;
    openModal('editMemberModal');
}

function handleSaveMemberRole() {
    if (currentMemberEdit) {
        currentMemberEdit.role = document.getElementById('editMemberRole').value;
        renderMembers();
        closeModal('editMemberModal');
        showNotification('Member role updated successfully', 'success');
        currentMemberEdit = null;
    }
}

function removeMember(id) {
    currentActionConfirm = () => {
        members = members.filter(m => m.id !== id);
        renderMembers();
        showNotification('Team member removed successfully', 'success');
    };
    document.getElementById('confirmMessage').textContent = 'Are you sure you want to remove this team member from the project?';
    openModal('confirmActionModal');
}

function executeConfirmedAction() {
    if (currentActionConfirm) {
        currentActionConfirm();
        currentActionConfirm = null;
    }
    closeModal('confirmActionModal');
}

// Export Data
document.getElementById('exportDataBtn').addEventListener('click', () => {
    showNotification('Preparing data export...', 'info');
    setTimeout(() => {
        showNotification('Data exported successfully', 'success');
    }, 2000);
});

// Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('Project detail page initialized for:', projectData.name);