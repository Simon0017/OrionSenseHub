// Device Detail Page JavaScript

// Mock Device Data
const deviceData = {
    id: 'DEV-013',
    name: 'Soil Moisture Sensor-01',
    description: 'Capacitive soil moisture sensor monitoring Field 1 for irrigation optimization',
    type: 'humidity',
    status: 'online',
    projectId: 4,
    projectName: 'Agriculture IoT',
    location: 'Field 1',
    sampleRate: 60,
    createdAt: '2025-10-11',
    lastSeen: '2 mins ago',
    sensors: [
        { name: 'Capacitive Sensor', type: 'Moisture' },
        { name: 'Temperature Probe', type: 'Temperature' },
        { name: 'Soil EC Sensor', type: 'Conductivity' }
    ],
    configuration: {
        sampleRate: '60 seconds',
        calibration: 'Auto-calibrated',
        threshold: '40-60%',
        alertEmail: 'alerts@farm.com',
        dataRetention: '90 days'
    },
    alerts: {
        lowMoisture: { enabled: true, threshold: '30%' },
        highMoisture: { enabled: true, threshold: '70%' },
        sensorFailure: { enabled: true, action: 'Email + SMS' }
    }
};

// Live Data Stream
let liveDataStream = [];
let streamPaused = false;
let streamInterval;

// Global state
let currentConfigEdit = null;
let currentActionConfirm = null;

// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeModals();
    initializeCharts();
    renderProjectInfo();
    renderSensors();
    renderQuickStats();
    renderHealthMetrics();
    renderConfiguration();
    renderAlerts();
    renderAIInsights();
    renderSchedules();
    renderHistory();
    startLiveStream();
});

// Sidebar
function initializeSidebar() {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

// Modal Management
function initializeModals() {
    document.getElementById('editDeviceBtn').addEventListener('click', openEditDeviceModal);
    document.getElementById('editDeviceForm').addEventListener('submit', handleEditDevice);
    
    document.getElementById('addDeviceScheduleBtn').addEventListener('click', () => openModal('addDeviceScheduleModal'));
    document.getElementById('addDeviceScheduleForm').addEventListener('submit', handleAddSchedule);
    
    document.getElementById('saveConfigBtn').addEventListener('click', handleSaveConfig);
    
    document.getElementById('pauseStreamBtn').addEventListener('click', toggleStream);
    document.getElementById('resetDeviceBtn').addEventListener('click', () => confirmAction('reset'));
    document.getElementById('deleteDeviceBtn').addEventListener('click', () => confirmAction('delete'));
    document.getElementById('confirmActionBtn').addEventListener('click', executeConfirmedAction);
    document.getElementById('exportDeviceDataBtn').addEventListener('click', exportDeviceData);
    
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            closeModal(modalId);
        });
    });
    
    document.querySelectorAll('.btn-secondary[data-modal]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            closeModal(modalId);
        });
    });
    
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

function openEditDeviceModal() {
    document.getElementById('editDeviceName').value = deviceData.name;
    document.getElementById('editDeviceDescription').value = deviceData.description;
    document.getElementById('editDeviceLocation').value = deviceData.location;
    document.getElementById('editDeviceSampleRate').value = deviceData.sampleRate;
    openModal('editDeviceModal');
}

function handleEditDevice(e) {
    e.preventDefault();
    deviceData.name = document.getElementById('editDeviceName').value;
    deviceData.description = document.getElementById('editDeviceDescription').value;
    deviceData.location = document.getElementById('editDeviceLocation').value;
    deviceData.sampleRate = document.getElementById('editDeviceSampleRate').value;
    
    document.getElementById('deviceName').textContent = deviceData.name;
    document.getElementById('deviceDescription').textContent = deviceData.description;
    
    closeModal('editDeviceModal');
    showNotification('Device updated successfully', 'success');
}

// Live Data Stream
function startLiveStream() {
    // Initialize with some data
    const now = new Date();
    for (let i = 0; i < 5; i++) {
        const time = new Date(now.getTime() - i * 60000);
        liveDataStream.push(generateStreamData(time));
    }
    renderLiveStream();
    
    // Start interval
    streamInterval = setInterval(() => {
        if (!streamPaused) {
            liveDataStream.unshift(generateStreamData(new Date()));
            if (liveDataStream.length > 20) liveDataStream.pop();
            renderLiveStream();
        }
    }, 5000);
}

function generateStreamData(time) {
    const moisture = 40 + Math.random() * 20;
    const temp = 20 + Math.random() * 8;
    const status = moisture < 35 ? 'critical' : moisture < 45 ? 'warning' : 'optimal';
    
    return {
        time: time.toTimeString().split(' ')[0],
        moisture: moisture.toFixed(1),
        temperature: temp.toFixed(1),
        status: status
    };
}

function renderLiveStream() {
    const container = document.getElementById('liveStreamContainer');
    container.innerHTML = liveDataStream.map(data => `
        <div class="stream-item-live">
            <div class="stream-timestamp">${data.time}</div>
            <div class="stream-data">
                <div class="stream-label">Soil Moisture</div>
                <div class="stream-reading">${data.moisture}%</div>
                <div class="stream-label">Temperature: ${data.temperature}°C</div>
            </div>
            <div class="stream-status ${data.status}">${capitalizeFirst(data.status)}</div>
        </div>
    `).join('');
}

function toggleStream() {
    streamPaused = !streamPaused;
    const btn = document.getElementById('pauseStreamBtn');
    btn.innerHTML = streamPaused 
        ? '<i class="fas fa-play"></i> Resume' 
        : '<i class="fas fa-pause"></i> Pause';
}

// Charts
function initializeCharts() {
    initMoistureChart();
    initCurrentGauge();
    initDistributionChart();
    initTrendChart();
}

function initMoistureChart() {
    const ctx = document.getElementById('moistureChart').getContext('2d');
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    const data = Array.from({length: 24}, () => 40 + Math.random() * 15);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'Moisture %',
                data: data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
                y: { beginAtZero: false, min: 0, max: 100 }
            }
        }
    });
}

function initCurrentGauge() {
    const ctx = document.getElementById('currentGauge').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [45, 55],
                backgroundColor: ['#10b981', '#e2e8f0'],
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

function initDistributionChart() {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            datasets: [{
                label: 'Readings',
                data: [5, 15, 45, 25, 10],
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

function initTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6h ago', '5h', '4h', '3h', '2h', '1h', 'Now'],
            datasets: [{
                label: 'Trend',
                data: [42, 44, 43, 45, 46, 45, 45],
                borderColor: '#a78bfa',
                backgroundColor: 'rgba(167, 139, 250, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// AI Insights
function renderAIInsights() {
    const insights = [
        {
            type: 'prediction',
            icon: 'fa-chart-line',
            title: 'Moisture Prediction',
            content: 'Based on current trends, soil moisture will drop to 38% within 6 hours. Recommend scheduling irrigation.',
            confidence: 92
        },
        {
            type: 'recommendation',
            icon: 'fa-lightbulb',
            title: 'Irrigation Optimization',
            content: 'Optimal irrigation time is 6:00 AM tomorrow for 25 minutes. This will save 15% water compared to evening irrigation.',
            confidence: 88
        },
        {
            type: 'anomaly',
            icon: 'fa-exclamation-triangle',
            title: 'Anomaly Detected',
            content: 'Unusual moisture fluctuation detected at 14:30. Possible sensor drift or external factor. Recommend calibration check.',
            confidence: 75
        }
    ];
    
    const container = document.getElementById('aiInsightsGrid');
    container.innerHTML = insights.map(insight => `
        <div class="ai-insight-card">
            <div class="ai-insight-header">
                <div class="ai-insight-icon ${insight.type}">
                    <i class="fas ${insight.icon}"></i>
                </div>
                <div class="ai-insight-title">${insight.title}</div>
            </div>
            <div class="ai-insight-content">${insight.content}</div>
            <div class="ai-insight-confidence">
                <span>Confidence:</span>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${insight.confidence}%"></div>
                </div>
                <span>${insight.confidence}%</span>
            </div>
        </div>
    `).join('');
}

// Schedules
function renderSchedules() {
    const schedules = [
        {
            id: 1,
            action: 'Calibrate Sensor',
            time: '06:00',
            recurrence: 'weekly',
            active: true,
            nextRun: 'Tomorrow at 6:00 AM'
        },
        {
            id: 2,
            action: 'Take Reading',
            time: '12:00',
            recurrence: 'daily',
            active: true,
            nextRun: 'Today at 12:00 PM'
        }
    ];
    
    const container = document.getElementById('deviceSchedulesContainer');
    container.innerHTML = schedules.map(schedule => `
        <div class="device-schedule-card ${schedule.active ? 'active' : ''}">
            <div class="schedule-info">
                <div class="schedule-action">
                    <i class="fas fa-calendar-check"></i>
                    ${schedule.action}
                </div>
                <div class="schedule-details">
                    <span><i class="fas fa-clock"></i> ${schedule.time}</span>
                    <span><i class="fas fa-repeat"></i> ${capitalizeFirst(schedule.recurrence)}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${schedule.nextRun}</span>
                </div>
            </div>
            <div class="schedule-actions">
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

function handleAddSchedule(e) {
    e.preventDefault();
    showNotification('Schedule created successfully', 'success');
    closeModal('addDeviceScheduleModal');
    document.getElementById('addDeviceScheduleForm').reset();
}

function editSchedule(id) {
    showNotification('Edit schedule functionality coming soon!', 'info');
}

function deleteSchedule(id) {
    showNotification('Schedule deleted successfully', 'success');
}

// History
function renderHistory() {
    const history = [
        { time: '1 hour ago', action: 'Reading Taken', description: 'Moisture: 45.2%, Temperature: 24.1°C' },
        { time: '3 hours ago', action: 'Alert Sent', description: 'Moisture level approaching lower threshold (42%)' },
        { time: '6 hours ago', action: 'Calibration Completed', description: 'Auto-calibration successful. Sensor accuracy: 99.2%' },
        { time: '1 day ago', action: 'Configuration Updated', description: 'Sample rate changed from 120s to 60s' },
        { time: '2 days ago', action: 'Sensor Replaced', description: 'Temperature probe replaced due to drift' }
    ];
    
    const container = document.getElementById('deviceHistoryTimeline');
    container.innerHTML = history.map(item => `
        <div class="device-history-item">
            <div class="device-history-time">${item.time}</div>
            <div class="device-history-action">${item.action}</div>
            <div class="device-history-description">${item.description}</div>
        </div>
    `).join('');
}

// Project Info
function renderProjectInfo() {
    const container = document.getElementById('projectLinkCard');
    container.innerHTML = `
        <div class="project-card-icon">
            <i class="fas fa-seedling"></i>
        </div>
        <div class="project-card-name">${deviceData.projectName}</div>
        <div class="project-card-meta">52 devices • Active</div>
    `;
    container.addEventListener('click', () => {
        window.location.href = 'project-detail.html';
    });
}

// Sensors
function renderSensors() {
    const container = document.getElementById('sensorsList');
    container.innerHTML = deviceData.sensors.map(sensor => `
        <div class="sensor-item">
            <div class="sensor-icon">
                <i class="fas fa-satellite-dish"></i>
            </div>
            <div class="sensor-info">
                <div class="sensor-name">${sensor.name}</div>
                <div class="sensor-type">${sensor.type}</div>
            </div>
        </div>
    `).join('');
}

// Quick Stats
function renderQuickStats() {
    const stats = [
        { label: 'Readings Today', value: '1,440', change: '+2.5%', positive: true },
        { label: 'Avg Moisture', value: '45.2%', change: '+1.2%', positive: true },
        { label: 'Uptime', value: '99.8%', change: '+0.1%', positive: true },
        { label: 'Data Points', value: '128K', change: '+12%', positive: true }
    ];
    
    const container = document.getElementById('quickStats');
    container.innerHTML = stats.map(stat => `
        <div class="quick-stat-item">
            <div class="quick-stat-label">${stat.label}</div>
            <div class="quick-stat-value">${stat.value}</div>
            <div class="quick-stat-change ${stat.positive ? 'positive' : 'negative'}">
                <i class="fas fa-arrow-${stat.positive ? 'up' : 'down'}"></i> ${stat.change}
            </div>
        </div>
    `).join('');
}

// Health Metrics
function renderHealthMetrics() {
    const metrics = [
        { label: 'Battery Level', value: '87%', percent: 87, status: 'excellent' },
        { label: 'Signal Strength', value: 'Strong', percent: 92, status: 'excellent' },
        { label: 'Sensor Accuracy', value: '99.2%', percent: 99, status: 'excellent' },
        { label: 'Data Quality', value: 'Good', percent: 85, status: 'good' }
    ];
    
    const container = document.getElementById('healthMetrics');
    container.innerHTML = metrics.map(metric => `
        <div class="health-metric">
            <div class="health-metric-header">
                <span class="health-metric-label">${metric.label}</span>
                <span class="health-metric-value">${metric.value}</span>
            </div>
            <div class="health-progress-bar">
                <div class="health-progress-fill ${metric.status}" style="width: ${metric.percent}%"></div>
            </div>
        </div>
    `).join('');
}

// Configuration
function renderConfiguration() {
    const container = document.getElementById('deviceConfigList');
    container.innerHTML = Object.entries(deviceData.configuration).map(([key, value]) => `
        <div class="settings-item">
            <div class="settings-item-info">
                <div class="settings-item-label">${formatLabel(key)}</div>
                <div class="settings-item-value">${value}</div>
            </div>
            <button class="settings-item-action" onclick="editConfig('${key}', '${value}')">
                Edit
            </button>
        </div>
    `).join('');
}

function renderAlerts() {
    const container = document.getElementById('deviceAlertsConfig');
    container.innerHTML = Object.entries(deviceData.alerts).map(([key, config]) => `
        <div class="settings-item">
            <div class="settings-item-info">
                <div class="settings-item-label">${formatLabel(key)}</div>
                <div class="settings-item-value">
                    ${config.threshold || config.action} • ${config.enabled ? 'Enabled' : 'Disabled'}
                </div>
            </div>
            <button class="settings-item-action" onclick="editAlert('${key}')">
                Edit
            </button>
        </div>
    `).join('');
}

function editConfig(key, value) {
    currentConfigEdit = { key, value };
    document.getElementById('configLabel').textContent = formatLabel(key);
    document.getElementById('configValue').value = value;
    openModal('editConfigModal');
}

function handleSaveConfig() {
    if (currentConfigEdit) {
        deviceData.configuration[currentConfigEdit.key] = document.getElementById('configValue').value;
        renderConfiguration();
        closeModal('editConfigModal');
        showNotification('Configuration updated successfully', 'success');
        currentConfigEdit = null;
    }
}

function editAlert(key) {
    showNotification('Alert configuration coming soon!', 'info');
}

function confirmAction(action) {
    currentActionConfirm = action;
    const messages = {
        reset: 'Are you sure you want to reset this device? This will restore factory settings and clear all configuration.',
        delete: 'Are you sure you want to delete this device? This action cannot be undone and all historical data will be lost.'
    };
    document.getElementById('confirmMessage').textContent = messages[action];
    openModal('confirmActionModal');
}

function executeConfirmedAction() {
    if (currentActionConfirm === 'reset') {
        showNotification('Device reset initiated...', 'success');
        setTimeout(() => {
            showNotification('Device reset complete', 'success');
        }, 2000);
    } else if (currentActionConfirm === 'delete') {
        showNotification('Deleting device...', 'success');
        setTimeout(() => {
            window.location.href = 'devices.html';
        }, 1500);
    }
    closeModal('confirmActionModal');
    currentActionConfirm = null;
}

function exportDeviceData() {
    showNotification('Preparing data export...', 'info');
    setTimeout(() => {
        showNotification('Data exported successfully', 'success');
    }, 2000);
}

// Helper Functions
function formatLabel(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
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

console.log('Device detail page initialized for:', deviceData.name);