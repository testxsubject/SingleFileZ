/*
 * Copyright 2010-2020 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

/* global browser, window, addEventListener, removeEventListener, document, location, setTimeout, top, XMLHttpRequest, prompt, DOMParser */

this.extension.core.content.bootstrap = this.extension.core.content.bootstrap || (() => {

	const singlefile = this.singlefile;
	const extension = this.extension;

	let unloadListenerAdded, options, autoSaveEnabled, autoSaveTimeout, autoSavingPage, pageAutoSaved, previousLocationHref;
	extension.core.content.updatedResources = {};
	extension.core.content.visitDate = new Date();
	browser.runtime.sendMessage({ method: "autosave.init" }).then(message => {
		options = message.options;
		autoSaveEnabled = message.autoSaveEnabled;
		if (document.readyState == "loading") {
			return new Promise(resolve => document.addEventListener("DOMContentLoaded", () => resolve()));
		}
	}).then(() => {
		refresh();
	});
	browser.runtime.onMessage.addListener(message => {
		if ((autoSaveEnabled && message.method == "content.autosave") ||
			message.method == "content.maybeInit" ||
			message.method == "content.init" ||
			message.method == "devtools.resourceCommitted" ||
			message.method == "common.promptValueRequest") {
			return onMessage(message);
		}
	});
	init();
	if (window == top && location && location.href && location.href.startsWith("file:///")) {
		if (document.readyState == "loading") {
			document.addEventListener("DOMContentLoaded", extractFile, false);
		} else {
			extractFile();
		}
	}
	return {};

	async function extractFile() {
		if (document.documentElement.dataset.sfz !== undefined) {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", location.href);
			xhr.send();
			xhr.responseType = "arraybuffer";
			xhr.onload = () => executeBootstrap(xhr.response);
			xhr.onerror = () => {
				let pendingResponseArray = [];
				browser.runtime.onMessage.addListener(message => {
					if (message.method == "singlefile.multipartResponse") {
						fetchResponse(message);
					}
				});
				const errorMessageElement = document.getElementById("sfz-error-message");
				if (errorMessageElement) {
					errorMessageElement.remove();
				}
				browser.runtime.sendMessage({ method: "singlefile.multipartFetch", url: location.href });

				function fetchResponse(message) {
					if (message.error) {
						browser.runtime.onMessage.removeListener(fetchResponse);
					} else {
						if (!pendingResponseArray.length) {
							document.body.appendChild(document.createTextNode("Please wait..."));
						}
						if (message.truncated) {
							pendingResponseArray = pendingResponseArray.concat(message.array);
						} else {
							pendingResponseArray = message.array;
						}
						if (!message.truncated || message.finished) {
							browser.runtime.onMessage.removeListener(fetchResponse);
							executeBootstrap(pendingResponseArray);
						}
					}
				}
			};
		} else {
			if ((document.body && document.body.childNodes.length == 1 && document.body.childNodes[0].tagName == "PRE" && /<html[^>]* data-sfz[^>]*>/i.test(document.body.childNodes[0].textContent))) {
				const doc = (new DOMParser()).parseFromString(document.body.childNodes[0].textContent, "text/html");
				document.replaceChild(doc.documentElement, document.documentElement);
				document.querySelectorAll("script").forEach(element => {
					const scriptElement = document.createElement("script");
					scriptElement.textContent = element.textContent;
					element.parentElement.replaceChild(scriptElement, element);
				});
				await extractFile();
			}
		}
	}

	function executeBootstrap(data) {
		const scriptElement = document.createElement("script");
		scriptElement.textContent = "this.bootstrap([" + (new Uint8Array(data)).toString() + "])";
		document.body.appendChild(scriptElement);
	}

	async function onMessage(message) {
		if (autoSaveEnabled && message.method == "content.autosave") {
			initAutoSavePage(message);
			return {};
		}
		if (message.method == "content.maybeInit") {
			init();
			return {};
		}
		if (message.method == "content.init") {
			options = message.options;
			autoSaveEnabled = message.autoSaveEnabled;
			refresh();
			return {};
		}
		if (message.method == "devtools.resourceCommitted") {
			extension.core.content.updatedResources[message.url] = { content: message.content, type: message.type, encoding: message.encoding };
			return {};
		}
		if (message.method == "common.promptValueRequest") {
			browser.runtime.sendMessage({ method: "tabs.promptValueResponse", value: prompt("SingleFileZ: " + message.promptMessage) });
			return {};
		}
	}

	function init() {
		if (previousLocationHref != location.href && !extension.core.processing) {
			pageAutoSaved = false;
			previousLocationHref = location.href;
			browser.runtime.sendMessage({ method: "tabs.init" });
			browser.runtime.sendMessage({ method: "ui.processInit" });
		}
	}

	async function initAutoSavePage(message) {
		options = message.options;
		if (document.readyState != "complete") {
			await new Promise(resolve => window.addEventListener("load", resolve));
		}
		await autoSavePage();
		if (options.autoSaveRepeat) {
			setTimeout(() => {
				if (autoSaveEnabled && !autoSavingPage) {
					pageAutoSaved = false;
					options.autoSaveDelay = 0;
					onMessage(message);
				}
			}, options.autoSaveRepeatDelay * 1000);
		}
	}

	async function autoSavePage() {
		const helper = singlefile.helper;
		if ((!autoSavingPage || autoSaveTimeout) && !pageAutoSaved) {
			autoSavingPage = true;
			if (options.autoSaveDelay && !autoSaveTimeout) {
				await new Promise(resolve => autoSaveTimeout = setTimeout(resolve, options.autoSaveDelay * 1000));
				await autoSavePage();
			} else {
				const waitForUserScript = this._singleFileZ_waitForUserScript;
				let frames = [];
				let framesSessionId;
				autoSaveTimeout = null;
				if (!options.removeFrames && window.frames && window.frames.length) {
					frames = await singlefile.processors.frameTree.getAsync(options);
				}
				framesSessionId = frames && frames.sessionId;
				if (options.userScriptEnabled && waitForUserScript) {
					await waitForUserScript(helper.ON_BEFORE_CAPTURE_EVENT_NAME);
				}
				const docData = helper.preProcessDoc(document, window, options);
				savePage(docData, frames);
				if (framesSessionId) {
					singlefile.processors.frameTree.cleanup(framesSessionId);
				}
				helper.postProcessDoc(document, docData.markedElements);
				if (options.userScriptEnabled && waitForUserScript) {
					await waitForUserScript(helper.ON_AFTER_CAPTURE_EVENT_NAME);
				}
				pageAutoSaved = true;
				autoSavingPage = false;
			}
		}
	}

	function refresh() {
		if (autoSaveEnabled && options && (options.autoSaveUnload || options.autoSaveLoadOrUnload)) {
			if (!unloadListenerAdded) {
				addEventListener("unload", onUnload);
				unloadListenerAdded = true;
			}
		} else {
			removeEventListener("unload", onUnload);
			unloadListenerAdded = false;
		}
	}

	function onUnload() {
		const helper = singlefile.helper;
		if (!pageAutoSaved || options.autoSaveUnload) {
			const waitForUserScript = this._singleFileZ_waitForUserScript;
			let frames = [];
			if (!options.removeFrames && window.frames && window.frames.length) {
				frames = singlefile.processors.frameTree.getSync(options);
			}
			if (options.userScriptEnabled && waitForUserScript) {
				waitForUserScript(helper.ON_BEFORE_CAPTURE_EVENT_NAME);
			}
			const docData = helper.preProcessDoc(document, window, options);
			savePage(docData, frames);
		}
	}

	function savePage(docData, frames) {
		const helper = singlefile.helper;
		const updatedResources = extension.core.content.updatedResources;
		const visitDate = extension.core.content.visitDate.getTime();
		Object.keys(updatedResources).forEach(url => updatedResources[url].retrieved = false);
		browser.runtime.sendMessage({
			method: "autosave.save",
			taskId: options.taskId,
			content: helper.serialize(document),
			canvases: docData.canvases,
			fonts: docData.fonts,
			stylesheets: docData.stylesheets,
			images: docData.images,
			posters: docData.posters,
			usedFonts: docData.usedFonts,
			shadowRoots: docData.shadowRoots,
			imports: docData.imports,
			referrer: docData.referrer,
			frames: frames,
			url: location.href,
			updatedResources,
			visitDate
		});
	}

})();