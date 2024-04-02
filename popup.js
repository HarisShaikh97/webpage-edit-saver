document.addEventListener("DOMContentLoaded", () => {
	const saveBtn = document.getElementsByClassName("save-btn")[0]

	saveBtn.addEventListener("click", () => {
		chrome.runtime.sendMessage("captureSnapshot")
	})
})
