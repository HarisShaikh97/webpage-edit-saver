chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message === "captureSnapshot") {
		console.log("clicked!")
	}
})
