document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');
    const completedTitle = document.getElementById('completedTitle');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks initially
    renderTasks();

    // Start Timer Interval
    setInterval(updateTimers, 1000);

    // Add Task Event
    addTaskBtn.addEventListener('click', addTask);
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Allow adding task with Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task name.");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: Date.now(),
            completedAt: null
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = ""; // Clear input
    }

    function renderTasks() {
        taskList.innerHTML = "";
        completedList.innerHTML = "";
        let hasCompleted = false;

        // Sort: Active first (by created), Completed (by completedAt desc)?
        // For now, preservation of order in array is simple enough, but we split them.

        tasks.forEach(task => {
            const li = document.createElement('li');

            // Content Wrapper
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('task-content');

            // Task Text
            const span = document.createElement('span');
            span.classList.add('task-text');
            span.textContent = task.text;

            // Interaction: Pop Animation on Click
            span.onclick = () => {
                span.classList.remove('animate-pop');
                void span.offsetWidth; // trigger reflow
                span.classList.add('animate-pop');
            };

            // Glow effect wrapper handled by CSS :hover on li and :active

            if (!task.completed) {
                // Active Task

                // Time Display
                const timeSpan = document.createElement('span');
                timeSpan.classList.add('time-left');
                timeSpan.textContent = getTimeLeft(task.createdAt);
                timeSpan.dataset.createdAt = task.createdAt;

                contentDiv.appendChild(span);
                contentDiv.appendChild(timeSpan);

                // Done Button
                const doneBtn = document.createElement('button');
                doneBtn.textContent = "Done";
                doneBtn.classList.add('done-btn');
                doneBtn.onclick = () => markAsDone(task.id);

                li.appendChild(contentDiv);
                li.appendChild(doneBtn);
                taskList.appendChild(li);

            } else {
                // Completed Task
                hasCompleted = true;

                // Completed Time
                const completedTimeSpan = document.createElement('span');
                completedTimeSpan.classList.add('completed-time');
                if (task.completedAt) {
                    const date = new Date(task.completedAt);
                    completedTimeSpan.textContent = `Done at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                }

                contentDiv.appendChild(span); // Text only
                // No checkbox, no time left

                li.appendChild(contentDiv);
                li.appendChild(completedTimeSpan);
                completedList.appendChild(li);
            }
        });

        // Show/Hide Completed Sections
        const displayStyle = hasCompleted ? 'block' : 'none';
        completedTitle.style.display = displayStyle;
        clearHistoryBtn.style.display = displayStyle;
    }

    function markAsDone(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            task.completedAt = Date.now();
            saveTasks();
            renderTasks();
        }
    }

    function clearHistory() {
        if (confirm("Are you sure you want to clear your completed history?")) {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTimeLeft(createdAt) {
        const now = Date.now();
        const elapsed = now - createdAt;
        const oneHour = 60 * 60 * 1000;
        const remaining = oneHour - elapsed;

        if (remaining <= 0) {
            return "Overdue";
        }

        const minutes = Math.floor(remaining / 60000);
        const hours = Math.floor(minutes / 60);

        if (hours >= 1) {
            return "1 hr left";
        }
        return `${minutes}m left`;
    }

    function updateTimers() {
        const timeSpans = document.querySelectorAll('.time-left');
        timeSpans.forEach(span => {
            const createdAt = parseInt(span.dataset.createdAt);
            if (createdAt) {
                span.textContent = getTimeLeft(createdAt);
            }
        });
    }
});
