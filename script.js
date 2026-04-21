let systemState = "healthy";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".chat-input input");
  const button = document.querySelector(".chat-input button");
  const chatBox = document.querySelector(".chat-box");
  const logBox = document.querySelector(".log-box");
  const statusEl = document.querySelector(".status");

  const revenueEl = document.querySelectorAll(".card p")[0];
  const growthEl = document.querySelectorAll(".card p")[1];
  const opsEl = document.querySelectorAll(".card p")[2];
  const alertsEl = document.querySelectorAll(".card p")[3];

  function updateStatus() {
    if (systemState === "critical") {
      statusEl.textContent = "● SYSTEM CRITICAL";
      statusEl.style.color = "#ff4d4d";
    } else {
      statusEl.textContent = "● SYSTEM ACTIVE";
      statusEl.style.color = "#00ffe7";
    }
  }

  function addMessage(text, type = "ai") {
    const row = document.createElement("div");
    row.className = `message ${type}`;
    chatBox.appendChild(row);

    if (type === "ai") {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          row.textContent += text[i];
          i++;
          chatBox.scrollTop = chatBox.scrollHeight;
        } else {
          clearInterval(timer);
        }
      }, 18);
    } else {
      row.textContent = text;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  function log(msg) {
    const div = document.createElement("div");
    div.className = "log-entry";
    div.textContent = "[SYS] " + msg;
    logBox.appendChild(div);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function handleCommand() {
    const value = input.value.trim();
    if (!value) return;

    addMessage("YOU: " + value, "user");
    addMessage("AI: Analyzing input...", "ai");
    log("Command received");

    input.value = "";

    const lower = value.toLowerCase();

    setTimeout(() => {
      addMessage("AI: Executing command...", "ai");
    }, 500);

    setTimeout(() => {
      let reply = "AI: Command received. Monitoring response.";

      if (lower.includes("revenue")) {
        revenueEl.textContent = "₹26.2L";
        log("Executing revenue pipeline...");
        setTimeout(() => log("Revenue model recalculated"), 400);
        setTimeout(() => log("Dashboard sync complete"), 800);
        reply = "AI: Revenue updated. Latest figure reflects current inflow.";
      } else if (lower.includes("growth")) {
        growthEl.textContent = "+22%";
        log("Growth model recalculated");
        reply = "AI: Growth metrics recalculated based on recent activity.";
      } else if (lower.includes("ops")) {
        opsEl.textContent = "15";
        log("Operations load updated");
        reply = "AI: Active operations increased.";
      } else if (lower.includes("alerts")) {
        alertsEl.textContent = "1";
        log("Alert system recalibrated");
        reply = "AI: Alerts reduced. Most issues resolved.";
      } else if (lower.includes("stress")) {
        systemState = "critical";
        log("System entering high-load state");
        log("Multiple anomalies detected");
        reply = "AI: Warning. System stability compromised.";
      } else if (lower.includes("recover") || lower.includes("restore")) {
        systemState = "healthy";
        log("Recovery protocol initiated");
        log("Systems stabilized");
        reply = "AI: System restored to normal operation.";
      } else if (lower.includes("shutdown")) {
        systemState = "critical";
        log("Emergency shutdown initiated");
        reply = "AI: Shutdown sequence triggered.";
      } else if (lower.includes("reset")) {
        revenueEl.textContent = "₹24.5L";
        growthEl.textContent = "+18%";
        opsEl.textContent = "12";
        alertsEl.textContent = "3";
        systemState = "healthy";
        log("System reset executed");
        reply = "AI: System values reset to baseline.";
      }

      updateStatus();
      addMessage(reply, "ai");
    }, 1200);
  }

  updateStatus();

  if (button) {
    button.addEventListener("click", handleCommand);
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleCommand();
      }
    });
  }

  setInterval(() => {
    if (systemState === "healthy") {
      if (Math.random() < 0.3) {
        log("Background sync completed");
      }
    }

    if (systemState === "critical") {
      log("System instability increasing...");
      if (Math.random() < 0.5) {
        alertsEl.textContent = String(parseInt(alertsEl.textContent, 10) + 1);
      }
    }
  }, 4000);

  setInterval(() => {
    if (systemState === "healthy") {
      let current = parseFloat(revenueEl.textContent.replace(/[^\d.]/g, ""));
      current += Math.random() * 0.5;
      revenueEl.textContent = "₹" + current.toFixed(1) + "L";
    }
  }, 5000);
});