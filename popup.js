document.addEventListener("DOMContentLoaded", () => {
	const saveBtn = document.getElementsByClassName("save-btn")[0]
	const resetBtn = document.getElementsByClassName("reset-btn")[0]
	const resetAllBtn = document.getElementsByClassName("reset-all-btn")[0]
	if (saveBtn) {
		saveBtn.addEventListener("click", () => {
			chrome.runtime.sendMessage({ type: "capture" })
		})
	} else {
		console.error("Save button not found!")
	}
	if (resetBtn) {
		resetBtn.addEventListener("click", () => {
			chrome.runtime.sendMessage({ type: "reset" })
		})
	} else {
		console.error("Save button not found!")
	}
	if (resetAllBtn) {
		resetAllBtn.addEventListener("click", () => {
			chrome.runtime.sendMessage({ type: "reset-all" })
		})
	} else {
		console.error("Save button not found!")
	}
})
