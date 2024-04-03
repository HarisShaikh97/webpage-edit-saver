;(async () => {
	const url = window?.location?.href
	await chrome?.runtime?.onMessage?.addListener(
		async (message, sender, sendResponse) => {
			if (message?.type === "capture-snapshot") {
				try {
					const bodyContent = document?.body?.outerHTML
					await chrome?.runtime?.sendMessage({
						type: "captured-snapshot",
						data: bodyContent,
						url: url
					})
				} catch (error) {
					console.error("Error capturing snapshot:", error)
				}
			}
		}
	)
	if (
		document?.readyState === "complete" ||
		document?.readyState === "interactive"
	) {
		await chrome?.storage?.local?.get(url, (data) => {
			const savedHTML = data[url]
			if (savedHTML) {
				document.body.innerHTML = savedHTML
			}
		})
	} else {
		document?.addEventListener("DOMContentLoaded", async () => {
			await chrome?.storage?.local?.get(url, (data) => {
				const savedHTML = data[url]
				if (savedHTML) {
					document.body.innerHTML = savedHTML
				}
			})
		})
	}
})()
