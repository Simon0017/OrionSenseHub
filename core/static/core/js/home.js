// Sidebar Toggle Functionality
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const mainContent = document.getElementById('mainContent');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Navigation Active State
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Real-time Data Stream Simulation
const dataStream = document.getElementById('dataStream');
let streamData = [
    { time: '14:32:15', device: 'Temp-Sensor-01', value: 'Temperature: 23.8°C' },
    { time: '14:32:14', device: 'Humidity-02', value: 'Humidity: 64.2%' },
    { time: '14:32:13', device: 'Light-Sensor-03', value: 'Light: 842 lux' }
];

function updateDataStream() {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    
    const devices = [
        { name: 'Temp-Sensor-01', value: () => `Temperature: ${(20 + Math.random() * 10).toFixed(1)}°C` },
        { name: 'Humidity-02', value: () => `Humidity: ${(55 + Math.random() * 20).toFixed(1)}%` },
        { name: 'Light-Sensor-03', value: () => `Light: ${(700 + Math.random() * 300).toFixed(0)} lux` },
        { name: 'Pressure-04', value: () => `Pressure: ${(980 + Math.random() * 40).toFixed(1)} hPa` },
        { name: 'CO2-Sensor-05', value: () => `CO2: ${(400 + Math.random() * 200).toFixed(0)} ppm` }
    ];
    
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    
    const newItem = {
        time: timeStr,
        device: randomDevice.name,
        value: randomDevice.value()
    };
    
    streamData.unshift(newItem);
    if (streamData.length > 10) {
        streamData.pop();
    }
    
    renderDataStream();
}

function renderDataStream() {
    dataStream.innerHTML = streamData.map(item => `
        <div class="stream-item">
            <span class="stream-time">${item.time}</span>
            <span class="stream-device">${item.device}</span>
            <span class="stream-value">${item.value}</span>
        </div>
    `).join('');
}

// Update stream every 3 seconds
setInterval(updateDataStream, 3000);

// Temperature Chart
const tempCtx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(tempCtx, {
    type: 'line',
    data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
        datasets: [{
            label: 'Temperature (°C)',
            data: [18, 17.5, 19, 22, 24, 23, 21],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#667eea',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 7
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        family: 'Inter'
                    },
                    color: '#1e293b'
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: '#e2e8f0',
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            }
        }
    }
});

// Humidity Chart
const humidityCtx = document.getElementById('humidityChart').getContext('2d');
const humidityChart = new Chart(humidityCtx, {
    type: 'line',
    data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
        datasets: [{
            label: 'Humidity (%)',
            data: [62, 65, 63, 58, 55, 60, 64],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 7
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        family: 'Inter'
                    },
                    color: '#1e293b'
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: '#e2e8f0',
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            }
        }
    }
});

// Light Intensity Chart
const lightCtx = document.getElementById('lightChart').getContext('2d');
const lightChart = new Chart(lightCtx, {
    type: 'bar',
    data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
        datasets: [{
            label: 'Light Intensity (lux)',
            data: [50, 20, 400, 900, 1100, 650, 80],
            backgroundColor: [
                'rgba(167, 139, 250, 0.8)',
                'rgba(167, 139, 250, 0.8)',
                'rgba(167, 139, 250, 0.8)',
                'rgba(102, 126, 234, 0.8)',
                'rgba(102, 126, 234, 0.8)',
                'rgba(167, 139, 250, 0.8)',
                'rgba(167, 139, 250, 0.8)'
            ],
            borderColor: [
                '#a78bfa',
                '#a78bfa',
                '#a78bfa',
                '#667eea',
                '#667eea',
                '#a78bfa',
                '#a78bfa'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        family: 'Inter'
                    },
                    color: '#1e293b'
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e2e8f0',
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            }
        }
    }
});

// Device Distribution Pie Chart
const deviceCtx = document.getElementById('deviceChart').getContext('2d');
const deviceChart = new Chart(deviceCtx, {
    type: 'doughnut',
    data: {
        labels: ['Temperature Sensors', 'Humidity Sensors', 'Light Sensors', 'Cameras', 'Other'],
        datasets: [{
            data: [35, 28, 22, 10, 5],
            backgroundColor: [
                '#ef4444',
                '#3b82f6',
                '#f59e0b',
                '#a78bfa',
                '#10b981'
            ],
            borderColor: '#fff',
            borderWidth: 3,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: {
                        size: 11,
                        family: 'Inter'
                    },
                    color: '#1e293b',
                    padding: 15,
                    usePointStyle: true
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.parsed + '%';
                        return label;
                    }
                }
            }
        }
    }
});

// Dynamic Stats Update
function updateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const currentValue = parseFloat(stat.textContent);
        const change = (Math.random() - 0.5) * 2;
        const newValue = currentValue + change;
        
        // Update with animation
        animateValue(stat, currentValue, newValue, 1000);
    });
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const isFloat = start.toString().includes('.');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        
        if (isFloat) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Update stats every 10 seconds
setInterval(updateStats, 10000);

// Copy API Key Functionality
document.querySelectorAll('.api-key-actions .icon-btn-sm').forEach((btn, index) => {
    if (index % 3 === 0) { // Copy button
        btn.addEventListener('click', function() {
            const apiKeyValue = this.closest('.api-key-item').querySelector('.api-key-value').textContent;
            
            // Create temporary textarea for copying
            const tempInput = document.createElement('textarea');
            tempInput.value = apiKeyValue;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Visual feedback
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = '#10b981';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.innerHTML = originalIcon;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    }
});

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.grid-card, .stat-card').forEach(card => {
    observer.observe(card);
});

// Real-time chart updates
function updateCharts() {
    // Update Temperature Chart
    const tempData = temperatureChart.data.datasets[0].data;
    tempData.shift();
    tempData.push(20 + Math.random() * 10);
    temperatureChart.update('none');
    
    // Update Humidity Chart
    const humidityData = humidityChart.data.datasets[0].data;
    humidityData.shift();
    humidityData.push(55 + Math.random() * 20);
    humidityChart.update('none');
    
    // Update Light Chart
    const lightData = lightChart.data.datasets[0].data;
    lightData.shift();
    lightData.push(Math.random() * 1200);
    lightChart.update('none');
}

// Update charts every 5 seconds
setInterval(updateCharts, 5000);

// Device Status Update
function updateDeviceStatus() {
    const devices = document.querySelectorAll('.device-value');
    devices.forEach(device => {
        const currentText = device.textContent;
        
        if (currentText.includes('°C')) {
            const newTemp = (20 + Math.random() * 10).toFixed(1);
            device.textContent = `${newTemp}°C`;
        } else if (currentText.includes('%')) {
            const newHumidity = (55 + Math.random() * 20).toFixed(0);
            device.textContent = `${newHumidity}%`;
        } else if (currentText.includes('lux')) {
            const newLight = (700 + Math.random() * 300).toFixed(0);
            device.textContent = `${newLight} lux`;
        }
    });
}

// Update device values every 4 seconds
setInterval(updateDeviceStatus, 4000);

// Responsive sidebar for mobile
if (window.innerWidth <= 768) {
    sidebar.classList.add('collapsed');
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId !== '#dashboard') {
            // For demo purposes, just scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize tooltips on icons
const iconButtons = document.querySelectorAll('.icon-btn, .icon-btn-sm');
iconButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project search simulation
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length > 0) {
        document.querySelectorAll('.project-item').forEach(item => {
            const projectName = item.querySelector('h4').textContent.toLowerCase();
            if (projectName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        document.querySelectorAll('.project-item').forEach(item => {
            item.style.display = 'flex';
        });
    }
});

console.log('IoT Dashboard initialized successfully!');