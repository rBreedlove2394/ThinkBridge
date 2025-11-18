// Simple 5-minute countdown timer for steps.html
(function () {
  const display = document.getElementById('cook-timer');
  if (!display) return;

  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  const resetBtn = document.getElementById('timer-reset');

  let totalSeconds = 5 * 60 - 1; // 4:59 for Figma match
  let remaining = totalSeconds;
  let timerId = null;

  function render() {
    const m = Math.floor(remaining / 60).toString().padStart(1, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    display.textContent = `${m}:${s}`;
  }

  function tick() {
    if (remaining > 0) {
      remaining -= 1;
      render();
    } else {
      clearInterval(timerId);
      timerId = null;
    }
  }

  startBtn && startBtn.addEventListener('click', function () {
    if (timerId) return;
    timerId = setInterval(tick, 1000);
  });

  pauseBtn && pauseBtn.addEventListener('click', function () {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
  });

  resetBtn && resetBtn.addEventListener('click', function () {
    remaining = totalSeconds;
    render();
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  });

  // initial render
  render();
})();
