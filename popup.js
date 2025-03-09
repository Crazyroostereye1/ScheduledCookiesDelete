document.addEventListener("DOMContentLoaded", () => {
    const daysInput = document.getElementById("daysInput");
    const saveBtn = document.getElementById("saveBtn");

    chrome.storage.local.get("deleteInterval", (data) => {
        if (data.deleteInterval) daysInput.value = data.deleteInterval;
    });

    saveBtn.addEventListener("click", () => {
        const days = parseInt(daysInput.value.trim(), 10);
        if (!isNaN(days) && days > 0) {
            chrome.storage.local.set({ deleteInterval: days }, () => {
                chrome.runtime.sendMessage({ action: "reschedule" });
            });
        }
    });
});

