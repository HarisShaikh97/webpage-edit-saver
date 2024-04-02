;(() => {
	const capturedHTML = document.documentElement.outerHTML
	const serializedHTML = JSON.stringify(capturedHTML)
	console.log(serializedHTML)
	chrome.runtime.sendMessage({
		type: "captured-snapshot",
		data: serializedHTML
	})
})()
