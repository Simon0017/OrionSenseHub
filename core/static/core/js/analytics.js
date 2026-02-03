// Analytics Page JavaScript

// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeCharts();
    renderAIUpdates();
    renderRecommendations();
    renderHealthItems();
    renderTopProjects();
    renderGeographicData();
    renderContributors();
    renderCostItems();
    initializeExport();
});

// Sidebar
function initializeSidebar() {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

// Initialize All Charts
function initializeCharts() {
    initAITokensChart();
    initTokenDistributionChart();
    initUptimeChart();
    initResponseTimeChart();
    initErrorRateChart();
    initProjectsStatusChart();
    initDataUsageChart();
    initProjectActivityChart();
    initVisitsOverTimeChart();
    initTopPagesChart();
    initSessionDurationChart();
    initContributorsActivityChart();
    initContributionsByProjectChart();
    initContributionTypesChart();
    initDeviceTypesChart();
    initAPIRequestsChart();
    initDataGrowthChart();
}

// AI Tokens Usage Chart
function initAITokensChart() {
    const ctx = document.getElementById('aiTokensChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Input Tokens',
                    data: [180000, 220000, 250000, 280000, 320000, 350000, 380000],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Output Tokens',
                    data: [120000, 150000, 170000, 190000, 210000, 230000, 250000],
                    borderColor: '#a78bfa',
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Token Distribution Chart
function initTokenDistributionChart() {
    const ctx = document.getElementById('tokenDistributionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Text Analysis', 'Image Processing', 'Predictions', 'Recommendations', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#667eea',
                    '#a78bfa',
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// System Uptime Chart
function initUptimeChart() {
    const ctx = document.getElementById('uptimeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Uptime %',
                data: [99.2, 99.5, 98.8, 99.9, 99.7, 99.3, 98.7],
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
                y: { min: 95, max: 100 }
            }
        }
    });
}

// Response Time Chart
function initResponseTimeChart() {
    const ctx = document.getElementById('responseTimeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Response Time (ms)',
                data: [45, 38, 52, 42, 48, 35, 40],
                backgroundColor: '#3b82f6',
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

// Error Rate Chart
function initErrorRateChart() {
    const ctx = document.getElementById('errorRateChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Error Rate %',
                data: [0.8, 1.2, 0.5, 0.3, 0.9, 1.1, 1.3],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, max: 2 }
            }
        }
    });
}

// Projects Status Chart
function initProjectsStatusChart() {
    const ctx = document.getElementById('projectsStatusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Idle', 'Archived'],
            datasets: [{
                data: [24, 8, 3],
                backgroundColor: ['#10b981', '#f59e0b', '#64748b']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Data Usage Chart
function initDataUsageChart() {
    const ctx = document.getElementById('dataUsageChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Smart Home', 'Industrial', 'Agriculture', 'Healthcare', 'Environmental'],
            datasets: [{
                label: 'Data Usage (GB)',
                data: [125, 285, 198, 156, 92],
                backgroundColor: [
                    '#667eea',
                    '#f093fb',
                    '#4facfe',
                    '#43e97b',
                    '#fa709a'
                ],
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

// Project Activity Timeline
function initProjectActivityChart() {
    const ctx = document.getElementById('projectActivityChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'New Projects',
                    data: [3, 5, 4, 6, 8, 5, 7],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Completed',
                    data: [2, 3, 5, 4, 3, 6, 5],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: true, position: 'top' }
            }
        }
    });
}

// Visits Over Time Chart
function initVisitsOverTimeChart() {
    const ctx = document.getElementById('visitsOverTimeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Visits',
                data: [6200, 7500, 8100, 7800, 8900, 6500, 5800],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
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
                y: { beginAtZero: true }
            }
        }
    });
}

// Top Pages Chart
function initTopPagesChart() {
    const ctx = document.getElementById('topPagesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dashboard', 'Projects', 'Devices', 'Analytics', 'Settings'],
            datasets: [{
                label: 'Page Views',
                data: [15200, 12800, 10500, 8900, 6200],
                backgroundColor: '#a78bfa',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { beginAtZero: true }
            }
        }
    });
}

// Session Duration Chart
function initSessionDurationChart() {
    const ctx = document.getElementById('sessionDurationChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Avg Duration (min)',
                data: [12, 15, 18, 16, 20, 14, 11],
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
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Contributors Activity Chart
function initContributorsActivityChart() {
    const ctx = document.getElementById('contributorsActivityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Contributions',
                data: [45, 52, 68, 55, 72, 38, 32],
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

// Contributions by Project Chart
function initContributionsByProjectChart() {
    const ctx = document.getElementById('contributionsByProjectChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Smart Home', 'Industrial', 'Agriculture', 'Healthcare', 'Other'],
            datasets: [{
                data: [28, 22, 25, 15, 10],
                backgroundColor: [
                    '#667eea',
                    '#f093fb',
                    '#4facfe',
                    '#43e97b',
                    '#fa709a'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Contribution Types Chart
function initContributionTypesChart() {
    const ctx = document.getElementById('contributionTypesChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Code', 'Documentation', 'Design', 'Testing', 'Review'],
            datasets: [{
                data: [40, 20, 15, 15, 10],
                backgroundColor: [
                    '#667eea',
                    '#a78bfa',
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Device Types Chart
function initDeviceTypesChart() {
    const ctx = document.getElementById('deviceTypesChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Temperature', 'Humidity', 'Light', 'Camera', 'Motion', 'Other'],
            datasets: [{
                data: [35, 28, 18, 10, 6, 3],
                backgroundColor: [
                    '#ef4444',
                    '#3b82f6',
                    '#f59e0b',
                    '#a78bfa',
                    '#10b981',
                    '#64748b'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// API Requests Chart
function initAPIRequestsChart() {
    const ctx = document.getElementById('apiRequestsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            datasets: [{
                label: 'API Requests',
                data: [1200, 800, 3500, 5200, 6800, 4500, 2800],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
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

// Data Growth Chart
function initDataGrowthChart() {
    const ctx = document.getElementById('dataGrowthChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Storage (GB)',
                data: [450, 520, 680, 750, 890, 1020, 1150],
                backgroundColor: '#10b981',
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

// AI Updates
function renderAIUpdates() {
    const updates = [
        {
            title: 'Anomaly Detection Enhanced',
            content: 'Machine learning model accuracy improved to 94.2% for detecting device anomalies.',
            time: '2 hours ago',
            type: 'Model Update'
        },
        {
            title: 'Predictive Maintenance Alert',
            content: '3 devices predicted to require maintenance within 48 hours based on performance trends.',
            time: '5 hours ago',
            type: 'Prediction'
        },
        {
            title: 'Energy Optimization',
            content: 'AI identified opportunity to reduce energy consumption by 12% in Industrial project.',
            time: '1 day ago',
            type: 'Optimization'
        }
    ];
    
    const container = document.getElementById('aiUpdatesList');
    container.innerHTML = updates.map(update => `
        <div class="ai-update-item">
            <div class="ai-update-header">
                <div class="ai-update-title">${update.title}</div>
                <div class="ai-update-time">${update.time}</div>
            </div>
            <div class="ai-update-content">${update.content}</div>
            <span class="ai-update-type">${update.type}</span>
        </div>
    `).join('');
}

// AI Recommendations
function renderRecommendations() {
    const recommendations = [
        {
            icon: 'fa-bolt',
            title: 'Optimize Data Collection',
            text: 'Reduce sampling frequency for stable sensors to save 20% on data storage costs.',
            priority: 'high'
        },
        {
            icon: 'fa-chart-line',
            title: 'Scale Resources',
            text: 'Consider upgrading to Premium tier to handle projected 30% growth in device count.',
            priority: 'medium'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Security Update',
            text: 'Enable two-factor authentication for all team members to enhance security.',
            priority: 'high'
        },
        {
            icon: 'fa-cog',
            title: 'Workflow Automation',
            text: 'Automate daily reports generation to save 5 hours per week of manual work.',
            priority: 'low'
        }
    ];
    
    const container = document.getElementById('recommendationsList');
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <div class="recommendation-icon">
                <i class="fas ${rec.icon}"></i>
            </div>
            <div class="recommendation-content">
                <div class="recommendation-title">${rec.title}</div>
                <div class="recommendation-text">${rec.text}</div>
                <span class="recommendation-priority ${rec.priority}">${capitalizeFirst(rec.priority)} Priority</span>
            </div>
        </div>
    `).join('');
}

// Health Items
function renderHealthItems() {
    const items = [
        { label: 'Database', icon: 'fa-database', status: 'excellent', statusText: 'Excellent' },
        { label: 'API Gateway', icon: 'fa-exchange-alt', status: 'excellent', statusText: 'Excellent' },
        { label: 'Message Queue', icon: 'fa-stream', status: 'good', statusText: 'Good' },
        { label: 'Cache Server', icon: 'fa-hdd', status: 'good', statusText: 'Good' },
        { label: 'Load Balancer', icon: 'fa-balance-scale', status: 'excellent', statusText: 'Excellent' },
        { label: 'File Storage', icon: 'fa-folder', status: 'warning', statusText: 'Warning' }
    ];
    
    const container = document.getElementById('healthItems');
    container.innerHTML = items.map(item => `
        <div class="health-item">
            <div class="health-item-info">
                <div class="health-item-icon ${item.status}">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="health-item-label">${item.label}</div>
            </div>
            <div class="health-item-status ${item.status}">${item.statusText}</div>
        </div>
    `).join('');
}

// Top Projects Table
function renderTopProjects() {
    const projects = [
        { rank: 1, name: 'Agriculture IoT', devices: 52, dataPoints: '1.2M', performance: 95 },
        { rank: 2, name: 'Industrial Monitoring', devices: 48, dataPoints: '980K', performance: 92 },
        { rank: 3, name: 'Smart Home System', devices: 32, dataPoints: '760K', performance: 88 },
        { rank: 4, name: 'Healthcare Monitoring', devices: 28, dataPoints: '640K', performance: 85 },
        { rank: 5, name: 'Environmental Sensors', devices: 24, dataPoints: '520K', performance: 82 }
    ];
    
    const container = document.getElementById('topProjectsTable');
    container.innerHTML = `
        <table class="projects-table">
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Devices</th>
                    <th>Data Points</th>
                    <th>Performance</th>
                </tr>
            </thead>
            <tbody>
                ${projects.map(project => `
                    <tr>
                        <td>
                            <div class="project-name-cell">
                                <div class="project-rank">${project.rank}</div>
                                <div class="project-name">${project.name}</div>
                            </div>
                        </td>
                        <td>${project.devices}</td>
                        <td>${project.dataPoints}</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${project.performance}%"></div>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Geographic Data
function renderGeographicData() {
    const geoData = [
        { flag: '🇺🇸', country: 'United States', percentage: '35%' },
        { flag: '🇬🇧', country: 'United Kingdom', percentage: '22%' },
        { flag: '🇩🇪', country: 'Germany', percentage: '15%' },
        { flag: '🇯🇵', country: 'Japan', percentage: '12%' },
        { flag: '🇨🇦', country: 'Canada', percentage: '8%' },
        { flag: '🌍', country: 'Others', percentage: '8%' }
    ];
    
    const container = document.getElementById('geoList');
    container.innerHTML = geoData.map(geo => `
        <div class="geo-item">
            <div class="geo-item-info">
                <div class="geo-flag">${geo.flag}</div>
                <div class="geo-country">${geo.country}</div>
            </div>
            <div class="geo-percentage">${geo.percentage}</div>
        </div>
    `).join('');
}

// Contributors
function renderContributors() {
    const contributors = [
        { name: 'Robert Farm', role: 'Project Owner', avatar: 'Robert+Farm', contributions: 142 },
        { name: 'Maria Garcia', role: 'Developer', avatar: 'Maria+Garcia', contributions: 128 },
        { name: 'James Wilson', role: 'Engineer', avatar: 'James+Wilson', contributions: 98 },
        { name: 'Sarah Williams', role: 'Data Scientist', avatar: 'Sarah+Williams', contributions: 86 },
        { name: 'John Doe', role: 'Administrator', avatar: 'John+Doe', contributions: 75 }
    ];
    
    const container = document.getElementById('contributorsList');
    container.innerHTML = contributors.map(contributor => `
        <div class="contributor-item">
            <div class="contributor-info">
                <img src="https://ui-avatars.com/api/?name=${contributor.avatar}&background=667eea&color=fff" 
                     alt="${contributor.name}" class="contributor-avatar">
                <div class="contributor-details">
                    <div class="contributor-name">${contributor.name}</div>
                    <div class="contributor-role">${contributor.role}</div>
                </div>
            </div>
            <div class="contributor-stats">
                <div class="contributor-count">${contributor.contributions}</div>
                <div class="contributor-label">contributions</div>
            </div>
        </div>
    `).join('');
}

// Cost Items
function renderCostItems() {
    const costs = [
        { label: 'AI Processing', amount: '$1,245' },
        { label: 'Data Storage', amount: '$890' },
        { label: 'API Requests', amount: '$456' },
        { label: 'Infrastructure', amount: '$2,340' },
        { label: 'Total Monthly', amount: '$4,931' }
    ];
    
    const container = document.getElementById('costItems');
    container.innerHTML = costs.map((cost, index) => `
        <div class="cost-item" style="${index === costs.length - 1 ? 'border-top: 2px solid var(--border-color); padding-top: 1.25rem; margin-top: 0.5rem;' : ''}">
            <div class="cost-item-label">${cost.label}</div>
            <div class="cost-item-amount">${cost.amount}</div>
        </div>
    `).join('');
}

// Export Analytics
function initializeExport() {
    document.getElementById('exportAnalyticsBtn').addEventListener('click', () => {
        showNotification('Preparing analytics report...', 'info');
        setTimeout(() => {
            showNotification('Analytics report exported successfully', 'success');
        }, 2000);
    });
}

// Helper Functions
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

console.log('Analytics dashboard initialized');