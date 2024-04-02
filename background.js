chrome?.runtime?.onMessage?.addListener((message, sender, sendResponse) => {
	if (message?.type === "capture") {
		chrome?.tabs?.query({ active: true }, (tabs) => {
			if (tabs && tabs.length > 0) {
				const url = tabs[0]?.url
				const tabId = tabs[0].id
				console.log(url, tabId)
				try {
					chrome?.scripting?.executeScript({
						target: { tabId: tabId },
						files: ["./content.js"]
					})
				} catch (error) {
					console.error("Error capturing snapshot:", error)
				}
			} else {
				console.log("No active tab found!")
			}
		})
	}
	if (message?.type === "captured-snapshot") {
		const deserializedHTML = JSON.parse(message?.data)
		console.log(deserializedHTML)
	}
	console.log(message)
})
