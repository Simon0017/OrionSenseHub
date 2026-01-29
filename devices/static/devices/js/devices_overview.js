// Mock Devices Data organized by projects
const mockDevices = [
    // Smart Home System devices
    {
        id: 'DEV-001',
        name: 'Living Room Temperature Sensor',
        description: 'DHT22 sensor monitoring living room climate conditions',
        type: 'temperature',
        status: 'online',
        projectId: 1,
        projectName: 'Smart Home System',
        sensors: ['DHT22', 'Temperature', 'Humidity'],
        createdAt: '2025-12-16',
        updatedAt: '2026-01-29',
        lastSeen: '2 mins ago'
    },
    {
        id: 'DEV-002',
        name: 'Kitchen Humidity Monitor',
        description: 'Advanced humidity tracking for kitchen environment optimization',
        type: 'humidity',
        status: 'online',
        projectId: 1,
        projectName: 'Smart Home System',
        sensors: ['BME280', 'Humidity', 'Pressure'],
        createdAt: '2025-12-16',
        updatedAt: '2026-01-29',
        lastSeen: '1 min ago'
    },
    {
        id: 'DEV-003',
        name: 'Bedroom Light Sensor',
        description: 'Automated lighting control based on ambient light levels',
        type: 'light',
        status: 'online',
        projectId: 1,
        projectName: 'Smart Home System',
        sensors: ['BH1750', 'Light Intensity'],
        createdAt: '2025-12-17',
        updatedAt: '2026-01-28',
        lastSeen: '5 mins ago'
    },
    {
        id: 'DEV-004',
        name: 'Front Door Camera',
        description: 'Security camera with motion detection and night vision',
        type: 'camera',
        status: 'offline',
        projectId: 1,
        projectName: 'Smart Home System',
        sensors: ['HD Camera', 'Motion Detector', 'IR Sensor'],
        createdAt: '2025-12-18',
        updatedAt: '2026-01-27',
        lastSeen: '3 hours ago'
    },
    {
        id: 'DEV-005',
        name: 'Garage Motion Sensor',
        description: 'PIR motion sensor for security and automation triggers',
        type: 'motion',
        status: 'online',
        projectId: 1,
        projectName: 'Smart Home System',
        sensors: ['PIR Sensor', 'Motion Detection'],
        createdAt: '2025-12-20',
        updatedAt: '2026-01-29',
        lastSeen: '30 secs ago'
    },

    // Industrial Monitoring devices
    {
        id: 'DEV-006',
        name: 'Boiler Temperature Monitor',
        description: 'High-precision temperature monitoring for industrial boiler',
        type: 'temperature',
        status: 'online',
        projectId: 2,
        projectName: 'Industrial Monitoring',
        sensors: ['K-Type Thermocouple', 'MAX6675'],
        createdAt: '2025-11-21',
        updatedAt: '2026-01-29',
        lastSeen: '1 min ago'
    },
    {
        id: 'DEV-007',
        name: 'Hydraulic Pressure Gauge',
        description: 'Real-time pressure monitoring for hydraulic systems',
        type: 'pressure',
        status: 'online',
        projectId: 2,
        projectName: 'Industrial Monitoring',
        sensors: ['BMP388', 'Pressure Transducer'],
        createdAt: '2025-11-21',
        updatedAt: '2026-01-29',
        lastSeen: '45 secs ago'
    },
    {
        id: 'DEV-008',
        name: 'Production Line Camera',
        description: 'Quality control camera for automated defect detection',
        type: 'camera',
        status: 'online',
        projectId: 2,
        projectName: 'Industrial Monitoring',
        sensors: ['4K Camera', 'AI Vision', 'Motion Tracker'],
        createdAt: '2025-11-22',
        updatedAt: '2026-01-29',
        lastSeen: '10 secs ago'
    },
    {
        id: 'DEV-009',
        name: 'Vibration Monitor',
        description: 'Predictive maintenance sensor for machinery vibration analysis',
        type: 'other',
        status: 'online',
        projectId: 2,
        projectName: 'Industrial Monitoring',
        sensors: ['ADXL345', 'Accelerometer', 'Vibration Sensor'],
        createdAt: '2025-11-25',
        updatedAt: '2026-01-29',
        lastSeen: '2 mins ago'
    },

    // Environmental Sensors devices
    {
        id: 'DEV-010',
        name: 'Air Quality Monitor Station A',
        description: 'Multi-sensor air quality monitoring for urban environment',
        type: 'other',
        status: 'online',
        projectId: 3,
        projectName: 'Environmental Sensors',
        sensors: ['MQ-135', 'CO2 Sensor', 'PM2.5 Sensor'],
        createdAt: '2026-01-06',
        updatedAt: '2026-01-28',
        lastSeen: '8 mins ago'
    },
    {
        id: 'DEV-011',
        name: 'Noise Level Monitor',
        description: 'Decibel meter for environmental noise pollution tracking',
        type: 'other',
        status: 'idle',
        projectId: 3,
        projectName: 'Environmental Sensors',
        sensors: ['Sound Sensor', 'Microphone Array'],
        createdAt: '2026-01-06',
        updatedAt: '2026-01-26',
        lastSeen: '2 hours ago'
    },
    {
        id: 'DEV-012',
        name: 'Weather Station Central',
        description: 'Comprehensive weather monitoring with multiple sensors',
        type: 'other',
        status: 'online',
        projectId: 3,
        projectName: 'Environmental Sensors',
        sensors: ['DHT22', 'BMP280', 'Rain Gauge', 'Wind Speed'],
        createdAt: '2026-01-07',
        updatedAt: '2026-01-28',
        lastSeen: '1 min ago'
    },

    // Agriculture IoT devices
    {
        id: 'DEV-013',
        name: 'Soil Moisture Sensor - Field 1',
        description: 'Capacitive soil moisture sensor for irrigation optimization',
        type: 'humidity',
        status: 'online',
        projectId: 4,
        projectName: 'Agriculture IoT',
        sensors: ['Capacitive Sensor', 'Soil Moisture'],
        createdAt: '2025-10-11',
        updatedAt: '2026-01-29',
        lastSeen: '3 mins ago'
    },
    {
        id: 'DEV-014',
        name: 'Soil Moisture Sensor - Field 2',
        description: 'Monitoring soil conditions for optimal crop growth',
        type: 'humidity',
        status: 'online',
        projectId: 4,
        projectName: 'Agriculture IoT',
        sensors: ['Capacitive Sensor', 'Soil Moisture'],
        createdAt: '2025-10-11',
        updatedAt: '2026-01-29',
        lastSeen: '2 mins ago'
    },
    {
        id: 'DEV-015',
        name: 'Greenhouse Temperature Control',
        description: 'Climate control system for greenhouse management',
        type: 'temperature',
        status: 'online',
        projectId: 4,
        projectName: 'Agriculture IoT',
        sensors: ['DS18B20', 'DHT22', 'Temperature'],
        createdAt: '2025-10-12',
        updatedAt: '2026-01-29',
        lastSeen: '1 min ago'
    },
    {
        id: 'DEV-016',
        name: 'Crop Health Camera',
        description: 'NDVI camera for monitoring plant health and stress detection',
        type: 'camera',
        status: 'online',
        projectId: 4,
        projectName: 'Agriculture IoT',
        sensors: ['Multispectral Camera', 'NDVI Sensor'],
        createdAt: '2025-10-15',
        updatedAt: '2026-01-29',
        lastSeen: '4 mins ago'
    },
    {
        id: 'DEV-017',
        name: 'Irrigation Light Sensor',
        description: 'Light intensity monitoring for automated irrigation timing',
        type: 'light',
        status: 'online',
        projectId: 4,
        projectName: 'Agriculture IoT',
        sensors: ['BH1750', 'UV Sensor', 'Light Intensity'],
        createdAt: '2025-10-16',
        updatedAt: '2026-01-28',
        lastSeen: '6 mins ago'
    },

    // Healthcare Monitoring devices
    {
        id: 'DEV-018',
        name: 'Patient Room Climate Monitor',
        description: 'Temperature and humidity monitoring for patient comfort',
        type: 'temperature',
        status: 'online',
        projectId: 5,
        projectName: 'Healthcare Monitoring',
        sensors: ['Medical-Grade DHT22', 'Temperature', 'Humidity'],
        createdAt: '2025-12-02',
        updatedAt: '2026-01-29',
        lastSeen: '30 secs ago'
    },
    {
        id: 'DEV-019',
        name: 'Vital Signs Monitor',
        description: 'Non-invasive patient vital signs tracking system',
        type: 'other',
        status: 'online',
        projectId: 5,
        projectName: 'Healthcare Monitoring',
        sensors: ['Heart Rate', 'SpO2', 'Temperature', 'Blood Pressure'],
        createdAt: '2025-12-03',
        updatedAt: '2026-01-29',
        lastSeen: '15 secs ago'
    },
    {
        id: 'DEV-020',
        name: 'Patient Motion Detector',
        description: 'Fall detection and movement monitoring for patient safety',
        type: 'motion',
        status: 'online',
        projectId: 5,
        projectName: 'Healthcare Monitoring',
        sensors: ['PIR Sensor', 'Accelerometer', 'Fall Detection'],
        createdAt: '2025-12-05',
        updatedAt: '2026-01-29',
        lastSeen: '1 min ago'
    },

    // Warehouse Logistics devices (archived project)
    {
        id: 'DEV-021',
        name: 'Inventory Camera Station 1',
        description: 'Automated inventory tracking with computer vision',
        type: 'camera',
        status: 'offline',
        projectId: 6,
        projectName: 'Warehouse Logistics',
        sensors: ['HD Camera', 'Barcode Scanner', 'QR Reader'],
        createdAt: '2025-08-16',
        updatedAt: '2025-12-15',
        lastSeen: '45 days ago'
    },
    {
        id: 'DEV-022',
        name: 'Temperature Logger - Cold Storage',
        description: 'Critical temperature monitoring for refrigerated storage',
        type: 'temperature',
        status: 'offline',
        projectId: 6,
        projectName: 'Warehouse Logistics',
        sensors: ['DS18B20', 'Temperature Logger'],
        createdAt: '2025-08-17',
        updatedAt: '2025-12-15',
        lastSeen: '45 days ago'
    }
];

// Projects data for dropdown
const projects = [
    { id: 1, name: 'Smart Home System' },
    { id: 2, name: 'Industrial Monitoring' },
    { id: 3, name: 'Environmental Sensors' },
    { id: 4, name: 'Agriculture IoT' },
    { id: 5, name: 'Healthcare Monitoring' },
    { id: 6, name: 'Warehouse Logistics' }
];

// Global state
let devices = [...mockDevices];
let currentFilter = 'all';
let currentView = 'grouped';
let deviceToDelete = null;

// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const devicesList = document.getElementById('devicesList');
const addDeviceBtn = document.getElementById('addDeviceBtn');
const addDeviceModal = document.getElementById('addDeviceModal');
const deleteDeviceModal = document.getElementById('deleteDeviceModal');
const searchInput = document.getElementById('searchDevices');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeFilters();
    initializeViewToggle();
    initializeSearch();
    initializeModals();
    populateProjectDropdown();
    updateStats();
    renderDevices();
});

// Sidebar Toggle
function initializeSidebar() {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

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
            renderDevices();
        });
    });
}

// View Toggle
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            renderDevices();
        });
    });
}

// Search
function initializeSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderDevices(searchTerm);
    });
}

// Modal Management
function initializeModals() {
    addDeviceBtn.addEventListener('click', openAddModal);
    document.getElementById('closeAddModal').addEventListener('click', closeAddModal);
    document.getElementById('cancelAdd').addEventListener('click', closeAddModal);
    document.getElementById('modalOverlay').addEventListener('click', closeAddModal);
    
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
    document.getElementById('deleteModalOverlay').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDelete').addEventListener('click', confirmDeleteDevice);
    
    document.getElementById('addDeviceForm').addEventListener('submit', handleAddDevice);
}

function openAddModal() {
    addDeviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddModal() {
    addDeviceModal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('addDeviceForm').reset();
}

function openDeleteModal(device) {
    deviceToDelete = device;
    const deleteInfo = document.getElementById('deleteDeviceInfo');
    deleteInfo.innerHTML = `
        <div class="delete-project-name">${device.name}</div>
        <div class="delete-project-meta">
            ${device.projectName} • Created ${formatDate(device.createdAt)}
        </div>
    `;
    deleteDeviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
    deleteDeviceModal.classList.remove('active');
    document.body.style.overflow = '';
    deviceToDelete = null;
}

function confirmDeleteDevice() {
    if (deviceToDelete) {
        devices = devices.filter(d => d.id !== deviceToDelete.id);
        closeDeleteModal();
        updateStats();
        renderDevices();
        showNotification('Device deleted successfully', 'success');
    }
}

// Populate Project Dropdown
function populateProjectDropdown() {
    const select = document.getElementById('deviceProject');
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        select.appendChild(option);
    });
}

// Add Device
function handleAddDevice(e) {
    e.preventDefault();
    
    const projectId = parseInt(document.getElementById('deviceProject').value);
    const project = projects.find(p => p.id === projectId);
    const sensorsInput = document.getElementById('deviceSensors').value;
    const sensors = sensorsInput ? sensorsInput.split(',').map(s => s.trim()).filter(s => s) : ['Default Sensor'];
    
    const newDevice = {
        id: `DEV-${String(devices.length + 1).padStart(3, '0')}`,
        name: document.getElementById('deviceName').value,
        description: document.getElementById('deviceDescription').value || 'No description provided',
        type: document.getElementById('deviceType').value,
        status: 'online',
        projectId: projectId,
        projectName: project.name,
        sensors: sensors,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        lastSeen: 'Just now'
    };
    
    devices.unshift(newDevice);
    closeAddModal();
    updateStats();
    renderDevices();
    showNotification('Device added successfully', 'success');
}

// Update Stats
function updateStats() {
    const onlineDevices = devices.filter(d => d.status === 'online').length;
    const offlineDevices = devices.filter(d => d.status === 'offline').length;
    const uniqueProjects = [...new Set(devices.map(d => d.projectId))].length;
    
    document.getElementById('onlineCount').textContent = onlineDevices;
    document.getElementById('offlineCount').textContent = offlineDevices;
    document.getElementById('totalCount').textContent = devices.length;
    document.getElementById('projectsCount').textContent = uniqueProjects;
}

// Render Devices
function renderDevices(searchTerm = '') {
    let filteredDevices = devices;
    
    // Apply filter
    if (currentFilter !== 'all') {
        filteredDevices = filteredDevices.filter(d => d.status === currentFilter);
    }
    
    // Apply search
    if (searchTerm) {
        filteredDevices = filteredDevices.filter(d => 
            d.name.toLowerCase().includes(searchTerm) ||
            d.description.toLowerCase().includes(searchTerm) ||
            d.projectName.toLowerCase().includes(searchTerm) ||
            d.id.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filteredDevices.length === 0) {
        devicesList.innerHTML = `
            <div class="devices-empty">
                <div class="devices-empty-icon"><i class="fas fa-microchip"></i></div>
                <h2 class="devices-empty-title">No devices found</h2>
                <p class="devices-empty-description">
                    ${searchTerm ? 'Try adjusting your search or filters' : 'Get started by adding your first device'}
                </p>
                ${!searchTerm ? '<button class="btn-primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Device</button>' : ''}
            </div>
        `;
    } else {
        if (currentView === 'grouped') {
            renderGroupedView(filteredDevices);
        } else {
            renderListView(filteredDevices);
        }
    }
}

function renderGroupedView(filteredDevices) {
    // Group devices by project
    const grouped = {};
    filteredDevices.forEach(device => {
        if (!grouped[device.projectId]) {
            grouped[device.projectId] = {
                projectName: device.projectName,
                devices: []
            };
        }
        grouped[device.projectId].devices.push(device);
    });
    
    let html = '';
    Object.keys(grouped).forEach(projectId => {
        const group = grouped[projectId];
        html += `
            <div class="project-group">
                <div class="project-group-header">
                    <div class="project-group-title">
                        <div class="project-group-icon">
                            <i class="fas fa-folder"></i>
                        </div>
                        <div class="project-group-info">
                            <h2>${group.projectName}</h2>
                            <div class="project-group-meta">${group.devices.length} device${group.devices.length !== 1 ? 's' : ''}</div>
                        </div>
                    </div>
                    <div class="project-group-badge">
                        ${group.devices.filter(d => d.status === 'online').length} online
                    </div>
                </div>
                <div class="devices-grid">
                    ${group.devices.map(device => createDeviceCard(device)).join('')}
                </div>
            </div>
        `;
    });
    
    devicesList.innerHTML = html;
    devicesList.classList.remove('list-view', 'ungrouped');
    attachDeviceEventListeners();
}

function renderListView(filteredDevices) {
    const html = `
        <div class="devices-grid">
            ${filteredDevices.map(device => createDeviceCard(device, true)).join('')}
        </div>
    `;
    
    devicesList.innerHTML = html;
    devicesList.classList.add('list-view', 'ungrouped');
    attachDeviceEventListeners();
}

function createDeviceCard(device, showProject = false) {
    const typeIcon = getDeviceTypeIcon(device.type);
    
    return `
        <div class="device-card ${showProject ? 'ungrouped' : ''}" data-device-id="${device.id}">
            ${showProject ? `
                <a href="#" class="device-project-link">
                    <i class="fas fa-folder"></i> ${device.projectName}
                </a>
            ` : ''}
            <div class="device-card-header">
                <div class="device-info">
                    <div class="device-title">
                        <i class="fas ${typeIcon} device-type-icon ${device.type}"></i>
                        ${device.name}
                    </div>
                    <div class="device-description" title="${device.description}">
                        ${device.description}
                    </div>
                </div>
                <div class="device-status-indicator ${device.status}" title="${capitalizeFirst(device.status)}"></div>
            </div>
            
            <div class="device-sensors">
                ${device.sensors.map(sensor => `
                    <span class="sensor-tag">
                        <i class="fas fa-satellite-dish"></i>
                        ${sensor}
                    </span>
                `).join('')}
            </div>
            
            <div class="device-meta">
                <div class="device-meta-item">
                    <i class="fas fa-fingerprint device-meta-icon"></i>
                    <span class="device-meta-label">Device ID:</span>
                    <span class="device-meta-value">${device.id}</span>
                </div>
                <div class="device-meta-item">
                    <i class="fas fa-signal device-meta-icon"></i>
                    <span class="device-meta-label">Last Seen:</span>
                    <span class="device-meta-value">${device.lastSeen}</span>
                </div>
            </div>
            
            <div class="device-footer">
                <div class="device-timestamps">
                    <div class="device-timestamp">
                        <i class="fas fa-calendar-plus"></i>
                        Created: ${formatDate(device.createdAt)}
                    </div>
                    <div class="device-timestamp">
                        <i class="fas fa-calendar-check"></i>
                        Updated: ${formatDate(device.updatedAt)}
                    </div>
                </div>
                <div class="device-actions">
                    <button class="device-action-btn view view-device-btn" title="View Device">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="device-action-btn edit-device-btn" title="Edit Device">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="device-action-btn delete delete-device-btn" title="Delete Device">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function attachDeviceEventListeners() {
    // Delete buttons
    document.querySelectorAll('.delete-device-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const deviceId = btn.closest('.device-card').dataset.deviceId;
            const device = devices.find(d => d.id === deviceId);
            if (device) openDeleteModal(device);
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-device-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification('Edit functionality coming soon!', 'info');
        });
    });
    
    // View device buttons
    document.querySelectorAll('.view-device-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const deviceId = btn.closest('.device-card').dataset.deviceId;
            showNotification(`Opening device ${deviceId}...`, 'info');
        });
    });
}

// Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDeviceTypeIcon(type) {
    const icons = {
        temperature: 'fa-thermometer-half',
        humidity: 'fa-tint',
        light: 'fa-lightbulb',
        camera: 'fa-video',
        motion: 'fa-walking',
        pressure: 'fa-gauge-high',
        other: 'fa-microchip'
    };
    return icons[type] || 'fa-microchip';
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

console.log('Devices dashboard initialized with', devices.length, 'devices across', projects.length, 'projects');