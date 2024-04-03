chrome?.runtime?.onMessage?.addListener(
	async (message, sender, sendResponse) => {
		if (message?.type === "capture") {
			await chrome?.tabs?.query({ active: true }, async (tabs) => {
				if (tabs && tabs?.length > 0) {
					const tabId = tabs[0]?.id
					await chrome?.tabs?.sendMessage(tabId, {
						type: "capture-snapshot"
					})
				} else {
					console.log("No active tab found!")
				}
			})
		}
		if (message?.type === "captured-snapshot") {
			const url = message?.url
			const bodyContent = message?.data
			await chrome?.storage?.local?.set({ [url]: bodyContent })
		}
		if (message?.type === "reset") {
			await chrome?.tabs?.query({ active: true }, async (tabs) => {
				if (tabs && tabs?.length > 0) {
					const url = tabs[0]?.url
					const tabId = tabs[0].id
					await chrome?.storage?.local?.remove(url, async () => {
						console.log("Snapshot removed for:", url)
						await chrome?.tabs?.reload(tabId)
					})
				} else {
					console.log("No active tab found!")
				}
			})
		}
		if (message?.type === "reset-all") {
			await chrome?.storage?.local?.clear(async () => {
				console.log("All snapshots removed")
				await chrome?.tabs?.query({ active: true }, async (tabs) => {
					if (tabs && tabs?.length > 0) {
						const tabId = tabs[0].id
						await chrome?.tabs?.reload(tabId)
					} else {
						console.log("No active tab found!")
					}
				})
			})
		}
		console.log(message)
	}
)
