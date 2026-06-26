/* =====================
   TODO APP - JAVASCRIPT
   ===================== */

// =====================================
// STATE MANAGEMENT
// =====================================

const TodoApp = (() => {
    // Private state
    const STORAGE_KEY = 'todos';
    const THEME_KEY = 'theme';
    let todos = [];
    let currentFilter = 'all';
    let currentSort = 'date-desc';

    // DOM Elements
    const elements = {
        form: document.getElementById('todoForm'),
        input: document.getElementById('todoInput'),
        list: document.getElementById('todoList'),
        emptyState: document.getElementById('emptyState'),
        errorMessage: document.getElementById('errorMessage'),
        totalCount: document.getElementById('totalCount'),
        completedCount: document.getElementById('completedCount'),
        pendingCount: document.getElementById('pendingCount'),
        filterButtons: document.querySelectorAll('.filter-btn'),
        sortSelect: document.getElementById('sortSelect'),
        clearCompleted: document.getElementById('clearCompleted'),
        clearAll: document.getElementById('clearAll'),
        exportTodos: document.getElementById('exportTodos'),
        actionsSection: document.getElementById('actionsSection'),
        themeToggle: document.getElementById('themeToggle'),
        modal: document.getElementById('confirmModal'),
        confirmBtn: document.getElementById('confirmBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        toast: document.getElementById('toast'),
    };

    // =====================================
    // INITIALIZATION
    // =====================================

    const init = () => {
        loadTodos();
        loadTheme();
        attachEventListeners();
        render();
        console.log('Todo App initialized');
    };

    // =====================================
    // STORAGE FUNCTIONS
    // =====================================

    const loadTodos = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            todos = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            todos = [];
            showToast('Error loading tasks', 'error');
        }
    };

    const saveTodos = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving todos:', error);
            showToast('Error saving tasks', 'error');
        }
    };

    const loadTheme = () => {
        const theme = localStorage.getItem(THEME_KEY) || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    };

    const saveTheme = (theme) => {
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    };

    const updateThemeIcon = (theme) => {
        elements.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    // =====================================
    // TODO OPERATIONS
    // =====================================

    const addTodo = (text) => {
        const trimmedText = text.trim();

        if (!trimmedText) {
            showError('Please enter a task');
            return false;
        }

        if (trimmedText.length > 500) {
            showError('Task is too long (max 500 characters)');
            return false;
        }

        const todo = {
            id: Date.now(),
            text: trimmedText,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null,
        };

        todos.unshift(todo);
        saveTodos();
        clearError();
        showToast('Task added successfully');
        elements.input.value = '';
        render();
        return true;
    };

    const deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        showToast('Task deleted');
        render();
    };

    const toggleTodo = (id) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.completedAt = todo.completed ? new Date().toISOString() : null;
            saveTodos();
            showToast(todo.completed ? 'Task completed' : 'Task marked as pending');
            render();
        }
    };

    const editTodo = (id, newText) => {
        const todo = todos.find(t => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            saveTodos();
            showToast('Task updated');
            render();
        }
    };

    const clearCompletedTodos = () => {
        const initialCount = todos.length;
        todos = todos.filter(todo => !todo.completed);
        const clearedCount = initialCount - todos.length;

        if (clearedCount > 0) {
            saveTodos();
            showToast(`Cleared ${clearedCount} completed task(s)`);
            render();
        } else {
            showToast('No completed tasks to clear');
        }
    };

    const clearAllTodos = () => {
        todos = [];
        saveTodos();
        showToast('All tasks cleared');
        render();
    };

    // =====================================
    // FILTERING & SORTING
    // =====================================

    const getFilteredTodos = () => {
        let filtered = todos;

        if (currentFilter === 'active') {
            filtered = todos.filter(todo => !todo.completed);
        } else if (currentFilter === 'completed') {
            filtered = todos.filter(todo => todo.completed);
        }

        return sortTodos(filtered);
    };

    const sortTodos = (todosToSort) => {
        const sorted = [...todosToSort];

        switch (currentSort) {
            case 'date-asc':
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.text.localeCompare(b.text));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.text.localeCompare(a.text));
                break;
            case 'date-desc':
            default:
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return sorted;
    };

    // =====================================
    // STATISTICS
    // =====================================

    const updateStats = () => {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const pending = total - completed;

        elements.totalCount.textContent = total;
        elements.completedCount.textContent = completed;
        elements.pendingCount.textContent = pending;

        // Show/hide actions section
        if (total > 0) {
            elements.actionsSection.style.display = 'flex';
        } else {
            elements.actionsSection.style.display = 'none';
        }
    };

    // =====================================
    // RENDERING
    // =====================================

    const render = () => {
        updateStats();
        renderTodoList();
    };

    const renderTodoList = () => {
        const filteredTodos = getFilteredTodos();

        if (filteredTodos.length === 0) {
            elements.list.style.display = 'none';
            elements.emptyState.style.display = 'block';
            return;
        }

        elements.list.style.display = 'block';
        elements.emptyState.style.display = 'none';
        elements.list.innerHTML = filteredTodos
            .map(todo => createTodoElement(todo))
            .join('');

        // Re-attach event listeners to new elements
        attachTodoEventListeners();
    };

    const createTodoElement = (todo) => {
        const date = new Date(todo.createdAt);
        const dateString = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" role="listitem" data-id="${todo.id}">
                <div class="checkbox-container">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        aria-label="Toggle completion for: ${escapeHtml(todo.text)}"
                    >
                </div>
                <div class="todo-content">
                    <div class="todo-text" contenteditable="true" role="textbox" aria-label="Edit task: ${escapeHtml(todo.text)}">${escapeHtml(todo.text)}</div>
                    <div class="todo-meta">Created: ${dateString}</div>
                </div>
                <div class="todo-actions">
                    <button class="btn-icon-only delete" aria-label="Delete: ${escapeHtml(todo.text)}" title="Delete task">🗑️</button>
                </div>
            </li>
        `;
    };

    // =====================================
    // EVENT LISTENERS
    // =====================================

    const attachEventListeners = () => {
        // Form submission
        elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            addTodo(elements.input.value);
        });

        // Filter buttons
        elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.filterButtons.forEach(b => b.classList.remove('filter-btn-active'));
                btn.classList.add('filter-btn-active');
                currentFilter = btn.dataset.filter;
                render();
            });
        });

        // Sort select
        elements.sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            render();
        });

        // Clear completed
        elements.clearCompleted.addEventListener('click', () => {
            if (todos.some(t => t.completed)) {
                showModal(
                    'Clear Completed',
                    'Are you sure you want to delete all completed tasks?',
                    () => clearCompletedTodos()
                );
            }
        });

        // Clear all
        elements.clearAll.addEventListener('click', () => {
            if (todos.length > 0) {
                showModal(
                    'Clear All Tasks',
                    'Are you sure you want to delete all tasks? This cannot be undone.',
                    () => clearAllTodos()
                );
            }
        });

        // Export
        elements.exportTodos.addEventListener('click', () => exportTodos());

        // Theme toggle
        elements.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            saveTheme(newTheme);
        });

        // Modal buttons
        elements.cancelBtn.addEventListener('click', () => hideModal());
        elements.modal.addEventListener('click', (e) => {
            if (e.target === elements.modal) hideModal();
        });
    };

    const attachTodoEventListeners = () => {
        document.querySelectorAll('.todo-item').forEach(item => {
            const id = parseInt(item.dataset.id);
            const checkbox = item.querySelector('.todo-checkbox');
            const deleteBtn = item.querySelector('.delete');
            const textElement = item.querySelector('.todo-text');

            // Toggle todo
            checkbox.addEventListener('change', () => toggleTodo(id));

            // Delete todo
            deleteBtn.addEventListener('click', () => {
                const todo = todos.find(t => t.id === id);
                showModal(
                    'Delete Task',
                    `Are you sure you want to delete "${todo.text}"?`,
                    () => deleteTodo(id)
                );
            });

            // Edit todo
            textElement.addEventListener('blur', () => {
                const newText = textElement.textContent;
                if (newText.trim()) {
                    editTodo(id, newText);
                } else {
                    render(); // Revert if empty
                }
            });

            textElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    textElement.blur();
                }
            });
        });
    };

    // =====================================
    // UI HELPERS
    // =====================================

    const showError = (message) => {
        elements.errorMessage.textContent = message;
        elements.errorMessage.classList.add('show');
    };

    const clearError = () => {
        elements.errorMessage.classList.remove('show');
    };

    const showToast = (message, type = 'success') => {
        elements.toast.textContent = message;
        elements.toast.className = `toast show ${type}`;

        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    };

    const showModal = (title, message, onConfirm) => {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;

        elements.confirmBtn.onclick = () => {
            onConfirm();
            hideModal();
        };

        elements.modal.classList.add('show');
        elements.modal.setAttribute('aria-hidden', 'false');
    };

    const hideModal = () => {
        elements.modal.classList.remove('show');
        elements.modal.setAttribute('aria-hidden', 'true');
    };

    const escapeHtml = (text) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    };

    // =====================================
    // EXPORT FUNCTIONALITY
    // =====================================

    const exportTodos = () => {
        const exportData = {
            exportDate: new Date().toISOString(),
            totalTasks: todos.length,
            completedTasks: todos.filter(t => t.completed).length,
            tasks: todos,
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast(`Exported ${todos.length} task(s)`);
    };

    // =====================================
    // PUBLIC API
    // =====================================

    return {
        init,
        addTodo,
        deleteTodo,
        toggleTodo,
        editTodo,
        clearCompletedTodos,
        clearAllTodos,
        exportTodos,
        getTodos: () => todos,
        getStats: () => ({
            total: todos.length,
            completed: todos.filter(t => t.completed).length,
            pending: todos.filter(t => !t.completed).length,
        }),
    };
})();

// =====================================
// APPLICATION INITIALIZATION
// =====================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TodoApp.init());
} else {
    TodoApp.init();
}

// =====================================
// SERVICE WORKER (Optional)
// =====================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed (expected if sw.js doesn't exist)
        });
    });
}