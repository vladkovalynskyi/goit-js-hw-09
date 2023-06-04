const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const timer = {
    intervalId: null,
    isActive: false,
    
    start() {
        if (this.isActive) {
            return;
        }

        this.isActive = true;
        this.intervalId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
        this.toggleButtons();
    },

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        
        this.toggleButtons();
    },

    toggleButtons() {
        btnStart.disabled = this.isActive;
        btnStop.disabled = !this.isActive
    },
};

btnStart.addEventListener('click', () => timer.start());
btnStop.addEventListener('click', () => timer.stop());
