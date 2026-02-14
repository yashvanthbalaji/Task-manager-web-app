# 🚀 Student Task Manager 

A sleek, functional, and highly interactive task management application designed for students to track study goals with real-time countdowns. Built as part of the **Modern Web Development (MWD) Lab**.

---

## ✨ Key Features

*  **Smart Task Entry**
  Seamlessly add study goals using a clean, centered input interface.

*  **1-Hour Countdown (Pomodoro-Style)**
  Every task automatically starts with a 60-minute timer to encourage focused study sessions.

*  **Interactive Glow Effects**
  Advanced CSS glow animations and bounce effects trigger on task interaction for a premium UI feel.

*  **Completion Workflow**
  Mark tasks as completed with a single click and move them into a dedicated history section.

*  **Fully Responsive Design**
  Optimized for both mobile and desktop using CSS Flexbox layouts.

---
##  Program
index.html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Task Manager</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>

<body>

    <div class="container">
        <header>
            <h1>Student Task Manager</h1>
        </header>

        <div class="input-group">
            <input type="text" id="taskInput" placeholder="Enter a new task...">
            <button id="addTaskBtn">Add Task</button>
        </div>

        <ul id="taskList">
            <!-- Active Tasks will be added here dynamically -->
        </ul>

        <h2 id="completedTitle"
            style="display:none; margin-top: 2rem; color: #555; text-transform: uppercase; font-size: 1rem; letter-spacing: 1px;">
            Completed History</h2>
        <ul id="completedList" class="completed-list">
            <!-- Completed Tasks will be added here -->
        </ul>
        <button id="clearHistoryBtn" style="display:none; margin: 20px auto 0; background-color: #ff4d4d;">Clear
            History</button>
    </div>

    <script src="script.js"></script>
</body>

</html>
```
style.css
```
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Container Card */
.container {
    background-color: #ffffff;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 700px;
    /* Wider for desktop */
    text-align: center;
    transition: max-width 0.3s ease;
}

/* Header */
header h1 {
    color: #4169E1;
    /* Royal Blue */
    margin-bottom: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Input Group */
.input-group {
    display: flex;
    gap: 15px;
    margin-bottom: 2.5rem;
}

input[type="text"] {
    flex: 1;
    padding: 12px 15px;
    border: 2px solid #eee;
    border-radius: 8px;
    outline: none;
    font-size: 1rem;
    transition: all 0.3s;
}

input[type="text"]:focus {
    border-color: #4169E1;
    box-shadow: 0 0 8px rgba(65, 105, 225, 0.2);
}

button#addTaskBtn {
    padding: 12px 25px;
    background-color: #4169E1;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s;
}

button#addTaskBtn:hover {
    background-color: #3151b5;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(65, 105, 225, 0.3);
}

/* Task List */
ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #ffffff;
    padding: 15px 20px;
    margin-bottom: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
    animation: fadeIn 0.4s ease-in-out;
    transition: all 0.3s ease-in-out;
    /* Smooth transition */
}

/* Hover & Active Glow */
li:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.task-content {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 15px;
    text-align: left;
}

.task-text {
    cursor: pointer;
    font-size: 1.05rem;
    color: #333;
    transition: transform 0.2s;
}

.task-text.animate-pop {
    animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Active Glow on Click (using :active on the text wrapper for effect) */
.task-content:active {
    transform: scale(0.98);
    /* Slight scale down for tactile feedback */
}

/* Time Left Display */
.time-left {
    font-size: 0.85rem;
    color: #ff8c00;
    font-weight: 600;
    background: #fff3e0;
    padding: 4px 8px;
    border-radius: 4px;
}

/* Done Button (Replaces Delete/Tick) */
.done-btn {
    background-color: #28a745;
    /* Green */
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
    box-shadow: 0 2px 5px rgba(40, 167, 69, 0.2);
}

.done-btn:hover {
    background-color: #218838;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

/* Completed History */
.completed-list li {
    background-color: #f8f9fa;
    opacity: 0.7;
    border-color: transparent;
    box-shadow: none;
}

.completed-list .task-text {
    text-decoration: line-through;
    color: #888;
}

.completed-time {
    font-size: 0.8rem;
    color: #aaa;
    font-style: italic;
    margin-left: auto;
    /* Push to right */
    padding-left: 10px;
}

/* Clear History Button */
#clearHistoryBtn {
    padding: 10px 20px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
}

#clearHistoryBtn:hover {
    background-color: #e60000;
}


/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pop {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

```

script.js
```
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


```

---

##  App Preview

### Main Dashboard

The primary interface displaying active tasks with live countdown timers and glowing interactions.
<img width="1627" height="861" alt="image" src="https://github.com/user-attachments/assets/9339f763-c113-478c-ad87-465c63b1f20d" />


### Task History

A separate section that stores and displays completed study tasks for progress tracking.
<img width="913" height="716" alt="image" src="https://github.com/user-attachments/assets/a7f01358-4fe0-4204-a7aa-7292372b19e0" />


---

## 🛠️ Tech Stack

* **HTML5** – Semantic and accessible page structure
* **CSS3 (Flexbox)** – Responsive layouts, gradients, and glow animations
* **React / JavaScript** – State management, timers, and task filtering logic

---

## ⚙️ How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/yashvanthbalaji/Commercial_Website1.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd Commercial_Website1
   ```

3. **Launch the app**
   Open `index.html` in your preferred web browser.

---

## 👨‍💻 Author

**Balaji**
Course: *19AI545 – Modern Web Development*

* GitHub: [@yashvanthbalaji](https://github.com/yashvanthbalaji)

---

Stay productive and keep coding ⚡
