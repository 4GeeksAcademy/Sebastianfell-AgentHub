// ============================================
// Theme Management (Dark/Light Mode)
// ============================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function applyTheme(theme) {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        html.classList.add('dark');
        icon.textContent = '☀️';
    } else {
        html.classList.remove('dark');
        icon.textContent = '🌙';
    }
}

// ============================================
// Navigation
// ============================================

function navigateTo(sectionId, event) {
    event?.preventDefault();
    
    // Hide all sections
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active', 'bg-blue-50', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-300', 'font-medium');
        link.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
    });
    
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
        activeLink.classList.add('active', 'bg-blue-50', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-300', 'font-medium');
    }
    
    // Update title
    const titleMap = {
        'dashboard': '📊 Dashboard',
        'usuarios': '👥 Usuarios',
        'agentes': '🤖 Agentes',
        'skills': '⚙️ Skills',
        'contrataciones': '📋 Contrataciones',
        'errores': '⚠️ Log de Errores'
    };
    document.getElementById('section-title').textContent = titleMap[sectionId] || 'Dashboard';
}

// ============================================
// Dropdown Management
// ============================================

function toggleDropdown(event) {
    event.stopPropagation();
    const button = event.currentTarget;
    const menu = button.nextElementSibling;
    
    // Close all other dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m !== menu) m.classList.add('hidden');
    });
    
    // Toggle current dropdown
    menu.classList.toggle('hidden');
}

// Close dropdowns on click outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.relative')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.add('hidden');
        });
    }
});

// ============================================
// Expandable Content (Skills)
// ============================================

function toggleExpandable(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const content = button.nextElementSibling;
    const icon = button.querySelector('.toggle-icon');
    
    // Toggle visibility
    const isHidden = content.classList.contains('hidden');
    
    if (isHidden) {
        content.classList.remove('hidden');
        icon.textContent = '▼';
        // Trigger animation
        setTimeout(() => {
            content.style.maxHeight = content.scrollHeight + 'px';
        }, 0);
    } else {
        content.style.maxHeight = '0';
        setTimeout(() => {
            content.classList.add('hidden');
            icon.textContent = '▶';
        }, 300);
    }
}

// ============================================
// User Detail Modal
// ============================================

function openUserDetailModal(userData) {
    const modal = document.getElementById('userDetailModal');
    const content = document.getElementById('userDetailContent');
    
    content.innerHTML = `
        <div class="space-y-3">
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Nombre</label>
                <p class="text-gray-900 dark:text-white font-medium">${userData.name}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Email</label>
                <p class="text-gray-900 dark:text-white font-medium">${userData.email}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Plan</label>
                <p class="text-gray-900 dark:text-white font-medium">${userData.plan}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Estado</label>
                <p class="text-gray-900 dark:text-white font-medium">${userData.estado}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Fecha de Registro</label>
                <p class="text-gray-900 dark:text-white font-medium">${userData.fecha_registro}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Empresa</label>
                <p class="text-gray-900 dark:text-white font-medium">${userData.empresa}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">País</label>
                <p class="text-gray-900 dark:text-white font-medium">${userData.pais}</p>
            </div>
        </div>
        <div class="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button class="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium" onclick="closeUserDetailModal()">Cerrar</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeUserDetailModal(event) {
    if (event && !event.target.id.includes('userDetailModal')) return;
    document.getElementById('userDetailModal').classList.add('hidden');
}

// ============================================
// Agent Config Modal
// ============================================

function openAgentConfigModal(agentName, systemPrompt) {
    const modal = document.getElementById('agentConfigModal');
    const content = document.getElementById('agentConfigContent');
    
    content.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block font-medium mb-2">Nombre del Agente</label>
                <p class="text-gray-900 dark:text-white font-medium text-lg">${agentName}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block font-medium mb-2">Prompt del Sistema</label>
                <textarea class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" rows="6" placeholder="Edita el prompt del sistema...">${systemPrompt}</textarea>
            </div>
        </div>
        <div class="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button class="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium" onclick="closeAgentConfigModal()">Cancelar</button>
            <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium" onclick="saveAgentConfig()">Guardar</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeAgentConfigModal(event) {
    if (event && !event.target.id.includes('agentConfigModal')) return;
    document.getElementById('agentConfigModal').classList.add('hidden');
}

function saveAgentConfig() {
    alert('Configuración del agente guardada correctamente.');
    closeAgentConfigModal();
}

// ============================================
// Skill Detail Modal
// ============================================

function openSkillDetailModal(skillName, description, agentCount) {
    const modal = document.getElementById('skillDetailModal');
    const content = document.getElementById('skillDetailContent');
    
    content.innerHTML = `
        <div class="space-y-3">
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Nombre de la Skill</label>
                <p class="text-gray-900 dark:text-white font-medium text-lg">${skillName}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Descripción</label>
                <p class="text-gray-900 dark:text-white">${description}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Agentes Habilitados</label>
                <p class="text-gray-900 dark:text-white font-medium text-lg">${agentCount} agentes</p>
            </div>
        </div>
        <div class="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button class="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium" onclick="closeSkillDetailModal()">Cerrar</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeSkillDetailModal(event) {
    if (event && !event.target.id.includes('skillDetailModal')) return;
    document.getElementById('skillDetailModal').classList.add('hidden');
}

// ============================================
// Contract Detail Modal
// ============================================

function openContractDetailModal(contractData) {
    const modal = document.getElementById('contractDetailModal');
    const content = document.getElementById('contractDetailContent');
    
    let skillsList = contractData.skills
        .map(skill => `<div class="flex justify-between text-gray-700 dark:text-gray-300"><span>${skill.name}</span><span>$${skill.price}</span></div>`)
        .join('');
    
    content.innerHTML = `
        <div class="space-y-3">
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Cliente</label>
                <p class="text-gray-900 dark:text-white font-medium">${contractData.client}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Agente Alquilado</label>
                <p class="text-gray-900 dark:text-white font-medium">${contractData.agent}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Período</label>
                <p class="text-gray-900 dark:text-white font-medium">${contractData.start} - ${contractData.end}</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <label class="text-sm text-gray-600 dark:text-gray-400 block font-medium mb-2">Desglose de Skills</label>
                <div class="space-y-1">
                    ${skillsList}
                </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-600 pt-3">
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400 font-medium">Total</span>
                    <span class="text-gray-900 dark:text-white font-bold text-lg">$${contractData.total}</span>
                </div>
            </div>
        </div>
        <div class="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button class="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium" onclick="closeContractDetailModal()">Cerrar</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeContractDetailModal(event) {
    if (event && !event.target.id.includes('contractDetailModal')) return;
    document.getElementById('contractDetailModal').classList.add('hidden');
}

// ============================================
// Error Detail Modal
// ============================================

function openErrorDetailModal(errorData) {
    const modal = document.getElementById('errorDetailModal');
    const content = document.getElementById('errorDetailContent');
    
    let badgeClass = 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200';
    if (errorData.type === 'ADVERTENCIA') {
        badgeClass = 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200';
    } else if (errorData.type === 'INFO') {
        badgeClass = 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200';
    }
    
    content.innerHTML = `
        <div class="space-y-3">
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Timestamp</label>
                <p class="text-gray-900 dark:text-white font-mono text-sm">${errorData.timestamp}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Agente</label>
                <p class="text-gray-900 dark:text-white font-medium">${errorData.agent}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Tipo</label>
                <span class="px-3 py-1 rounded-full text-xs font-medium ${badgeClass}">${errorData.type}</span>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Código de Error</label>
                <p class="text-gray-900 dark:text-white font-mono text-sm">${errorData.code}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-400 block">Descripción</label>
                <p class="text-gray-900 dark:text-white">${errorData.description}</p>
            </div>
        </div>
        <div class="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button class="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium" onclick="closeErrorDetailModal()">Cerrar</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeErrorDetailModal(event) {
    if (event && !event.target.id.includes('errorDetailModal')) return;
    document.getElementById('errorDetailModal').classList.add('hidden');
}

// ============================================
// Confirmation Dialogs
// ============================================

function confirmDelete(type, name) {
    if (confirm(`¿Estás seguro de que deseas eliminar este ${type}: ${name}?`)) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} "${name}" eliminado correctamente.`);
        closeAllDropdowns();
    }
}

function confirmResolveError(agentName, timestamp) {
    if (confirm(`¿Marcar el error de ${agentName} (${timestamp}) como resuelto?`)) {
        alert('Error marcado como resuelto.');
        closeAllDropdowns();
    }
}

// ============================================
// Helper Functions
// ============================================

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.add('hidden');
    });
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Close dropdowns when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeAllDropdowns);
    });
});

// Add smooth transitions for expandable content
const style = document.createElement('style');
style.innerHTML = `
    .expandable-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }
`;
document.head.appendChild(style);
