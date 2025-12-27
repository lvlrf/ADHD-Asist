
// static/js/main.js

let focusInterval;
let timeLeft = 25 * 60;
let isRunning = false;
const focusOverlay = document.getElementById('focus-overlay');
const timerEl = document.getElementById('focus-timer');
const taskTitleEl = document.getElementById('focus-task-title');
const timerBtn = document.getElementById('timer-btn');

async function openFocusMode() {
    focusOverlay.style.display = 'flex';
    
    // Fetch Next Action
    try {
        const res = await fetch('/api/tasks?status=Next Action&limit=1');
        const data = await res.json();
        if(data.tasks && data.tasks.length > 0) {
            taskTitleEl.innerText = data.tasks[0].title;
            taskTitleEl.dataset.id = data.tasks[0].id;
        } else {
            taskTitleEl.innerText = "هیچ کاری در 'Next Action' نیست!";
        }
    } catch(e) {
        taskTitleEl.innerText = "خطا در دریافت تسک";
    }
}

function closeFocusMode() {
    focusOverlay.style.display = 'none';
    clearInterval(focusInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
}

function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timerEl.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function toggleTimer() {
    if(isRunning) {
        clearInterval(focusInterval);
        timerBtn.innerHTML = '<i data-lucide="play"></i> ادامه';
    } else {
        focusInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if(timeLeft <= 0) {
                clearInterval(focusInterval);
                confetti();
                alert("زمان تمرکز تمام شد!");
            }
        }, 1000);
        timerBtn.innerHTML = '<i data-lucide="pause"></i> توقف';
    }
    isRunning = !isRunning;
    lucide.createIcons();
}

async function completeFocusTask() {
    confetti();
    const id = taskTitleEl.dataset.id;
    if(id) {
        await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status: 'Done'})
        });
    }
    setTimeout(closeFocusMode, 2000);
}
