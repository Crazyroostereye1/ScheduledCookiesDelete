function deleteAllCookies() {
  chrome.cookies.getAll({}, (cookies) => {
    cookies.forEach((cookie) => {
      let url = `http${cookie.secure ? "s" : ""}://${cookie.domain}${cookie.path}`;
      chrome.cookies.remove({ url: url, name: cookie.name });
    });
  });
}

function scheduleDeletion(days) {
    let nextRun = Date.now() + (days * 24 * 60 * 60 * 1000);
    chrome.alarms.create("deleteCookies", { when: nextRun });
    console.log(`Next cookie deletion scheduled in ${days} days.`);
    console.log(new Date(nextRun));
}

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "deleteCookies") {
        deleteAllCookies();
        chrome.storage.local.get("deleteInterval", (data) => {
            if (data.deleteInterval) {
                scheduleDeletion(data.deleteInterval);
            }
        });
    }
});

chrome.storage.local.get("deleteInterval", (data) => {
    if (data.deleteInterval) {
        scheduleDeletion(data.deleteInterval);
    }
});

