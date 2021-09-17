!function(){"use strict";const t=8388608;const e="single-filez-response-fetch",n=window.fetch;async function o(t){const e=await browser.runtime.sendMessage(t);if(!e||e.error)throw new Error(e&&e.error&&e.error.toString());return e}function r(t){return new Promise(((n,o)=>{var r,i,a,s;r=new CustomEvent("single-filez-request-fetch",{detail:t}),window.dispatchEvent(r),i=e,a=function r(i){var a,s,l;i.detail?i.detail.url==t&&(a=e,s=r,l=!1,window.removeEventListener(a,s,l),i.detail.response?n({status:i.detail.status,headers:new Map(i.detail.headers),arrayBuffer:async()=>i.detail.response}):o(i.detail.error)):o()},s=!1,window.addEventListener(i,a,s)}))}browser.runtime.onMessage.addListener((t=>{if("singlefile.fetchFrame"==t.method&&window.frameId&&window.frameId==t.frameId)return async function(t){try{let e=await n(t.url,{cache:"force-cache"});return 401!=e.status&&403!=e.status&&404!=e.status||(e=await Promise.race([r(t.url),new Promise(((t,e)=>setTimeout((()=>e()),5e3)))])),{status:e.status,headers:[...e.headers],array:Array.from(new Uint8Array(await e.arrayBuffer()))}}catch(t){return{error:t&&t.toString()}}}(t)}));const i=globalThis.singlefile,a=i.helper.SELECTED_CONTENT_ATTRIBUTE_NAME,s="singlefile-mask",l="singlefile-mask-content",c="singlefile-progress-bar",d="singlefile-progress-bar-content",u="single-file-selection-zone",p="singlefile-logs-window",f="singlefile-logs",m="singlefile-logs-line",g="singlefile-logs-line-text",h="singlefile-logs-line-icon",y=i.helper.SINGLE_FILE_UI_ELEMENT_CLASS,A=browser.i18n.getMessage("logPanelDeferredImages"),w=browser.i18n.getMessage("logPanelFrameContents"),E=browser.i18n.getMessage("logPanelStep"),b=browser.i18n.getMessage("logPanelWidth"),v=new Set(Array.from(getComputedStyle(document.body)));let S,C;function x(t,e){return prompt(t,e)}function I(t){if(!document.querySelector(s)&&(t.logsEnabled&&document.body.appendChild(C),t.shadowEnabled)){const e=function(){try{let t=document.querySelector(s);if(!t){t=F(s,document.body);const e=t.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent="\n\t\t\t\t@keyframes single-file-progress { \n\t\t\t\t\t0% { \n\t\t\t\t\t\tleft: -50px;\n\t\t\t\t\t} \n\t\t\t\t\t100% { \n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t.singlefile-progress-bar {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\twidth: 0;\n\t\t\t\t\theight: 8px;\n\t\t\t\t\tz-index: 2147483646;\n\t\t\t\t\topacity: .5;\n\t\t\t\t\toverflow: hidden;\t\t\t\t\t\n\t\t\t\t\ttransition: width 200ms ease-in-out;\n\t\t\t\t}\n\t\t\t\t.singlefile-progress-bar-content {\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\tanimation: single-file-progress 3s linear infinite reverse;\n\t\t\t\t\tbackground: \n\t\t\t\t\t\twhite \n\t\t\t\t\t\tlinear-gradient(-45deg, rgba(0, 0, 0, 0.075) 25%, \n\t\t\t\t\t\t\ttransparent 25%, \n\t\t\t\t\t\t\ttransparent 50%, \n\t\t\t\t\t\t\trgba(0, 0, 0, 0.075) 50%, \n\t\t\t\t\t\t\trgba(0, 0, 0, 0.075) 75%, \n\t\t\t\t\t\t\ttransparent 75%, transparent)\n\t\t\t\t\t\trepeat scroll 0% 0% / 50px 50px padding-box border-box;\n\t\t\t\t\twidth: calc(100% + 50px);\n\t\t\t\t\theight: 100%;\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t.singlefile-mask-content {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\tz-index: 2147483646;\n\t\t\t\t\topacity: 0;\n\t\t\t\t\tbackground-color: black;\n\t\t\t\t\ttransition: opacity 250ms;\n\t\t\t\t}\n\t\t\t",e.appendChild(n);let o=document.createElement("div");o.classList.add(l),e.appendChild(o),t.offsetWidth,o.style.setProperty("opacity",.3),t.offsetWidth}return t}catch(t){}}();t.progressBarEnabled&&function(t){try{if(!t.shadowRoot.querySelector("."+c)){let e=document.createElement("div");e.classList.add(c),t.shadowRoot.appendChild(e);const n=document.createElement("div");n.classList.add(d),e.appendChild(n)}}catch(t){}}(e)}}function k(){const t=document.querySelector(s);t&&t.remove(),C.remove(),M()}function R(t,e,n){n.shadowEnabled&&n.progressBarEnabled&&function(t,e){try{const n=document.querySelector(s);if(n){const o=n.shadowRoot.querySelector("."+c);if(o&&e){const n=Math.floor(t/e*100)+"%";o.style.getPropertyValue("width")!=n&&(o.style.setProperty("width",n),o.offsetWidth)}}}catch(t){}}(t,e)}function L(){let t;const e=[],n=getSelection();for(let o=0;o<n.rangeCount;o++){let r=n.getRangeAt(o);if(r&&r.commonAncestorContainer){const n=document.createTreeWalker(r.commonAncestorContainer);let o=!1,i=!1;for(;!i;)(o||n.currentNode==r.startContainer||n.currentNode==r.endContainer)&&(o=!0,r.startContainer==r.endContainer&&r.startOffset==r.endOffset||(t=!0,"A"==n.currentNode.tagName&&n.currentNode.href&&e.push(n.currentNode.href))),n.currentNode==r.endContainer?i=!0:n.nextNode();t&&n.currentNode==r.endContainer&&n.currentNode.querySelectorAll&&n.currentNode.querySelectorAll("*").forEach((t=>{"A"==t.tagName&&t.href&&e.push(n.currentNode.href)}))}}return Array.from(new Set(e))}async function N(t){let e=P();return e||t?e:(e=await new Promise((t=>{let e=[];function n(t){e=[],s(),t.preventDefault()}function o(t){const e=function(t){let e,n=t.target,o=n.getBoundingClientRect();for(e=q("floor",n,t.clientX-o.left,U(n,"left")),e==n&&(e=q("ceil",n,o.left+o.width-t.clientX,U(n,"right"))),e==n&&(e=q("floor",n,t.clientY-o.top,U(n,"top"))),e==n&&(e=q("ceil",n,o.top+o.height-t.clientY,U(n,"bottom"))),n=e;n&&n.clientWidth<=8&&n.clientHeight<=8;)n=n.parentElement;return n}(t);var n;e&&(S=e,n=e,requestAnimationFrame((()=>{const t=B(),e=n.getBoundingClientRect(),o=document.scrollingElement||document.documentElement;t.style.setProperty("top",o.scrollTop+e.top-10+"px"),t.style.setProperty("left",o.scrollLeft+e.left-10+"px"),t.style.setProperty("width",e.width+20+"px"),t.style.setProperty("height",e.height+20+"px")})))}function r(t){t.preventDefault(),t.stopPropagation(),0==t.button?s(S,t.ctrlKey):a()}function i(t){"Escape"==t.key&&a()}function a(){e.length&&getSelection().removeAllRanges(),e=[],c()}function s(t,e){if(t){e||d();const n=document.createRange();n.selectNodeContents(t),l(),getSelection().addRange(n),u(),e||c()}else c()}function l(){const t=getSelection();for(let e=t.rangeCount-1;e>=0;e--){const n=t.getRangeAt(e);n.startOffset==n.endOffset&&(t.removeRange(n),e--)}}function c(){B().remove(),removeEventListener("mousemove",o,!0),removeEventListener("click",r,!0),removeEventListener("keyup",i,!0),S=null,t(Boolean(e.length)),setTimeout((()=>document.removeEventListener("contextmenu",n,!0)),0)}function d(){getSelection().removeAllRanges(),e.forEach((t=>getSelection().addRange(t)))}function u(){e=[];for(let t=0;t<getSelection().rangeCount;t++){const n=getSelection().getRangeAt(t);e.push(n)}}addEventListener("mousemove",o,!0),addEventListener("click",r,!0),addEventListener("keyup",i,!0),document.addEventListener("contextmenu",n,!0),getSelection().removeAllRanges()})),e?P():void 0)}function P(){const t=getSelection();let e;for(let n=0;n<t.rangeCount;n++){let o=t.getRangeAt(n);if(o&&o.commonAncestorContainer){const t=document.createTreeWalker(o.commonAncestorContainer);let n=!1,r=!1;for(;!r;)(n||t.currentNode==o.startContainer||t.currentNode==o.endContainer)&&(n=!0,o.startContainer==o.endContainer&&o.startOffset==o.endOffset||(e=!0,T(t.currentNode))),e&&t.currentNode==o.startContainer&&D(t.currentNode),t.currentNode==o.endContainer?r=!0:t.nextNode();e&&t.currentNode==o.endContainer&&t.currentNode.querySelectorAll&&t.currentNode.querySelectorAll("*").forEach((t=>T(t)))}}return e}function T(t){(t.nodeType==Node.ELEMENT_NODE?t:t.parentElement).setAttribute(a,"")}function D(t){t.parentElement&&(T(t),D(t.parentElement))}function B(){let t=document.querySelector(u);return t||(t=F(u,document.body),t.style.setProperty("box-sizing","border-box","important"),t.style.setProperty("background-color","#3ea9d7","important"),t.style.setProperty("border","10px solid #0b4892","important"),t.style.setProperty("border-radius","2px","important"),t.style.setProperty("opacity",".25","important"),t.style.setProperty("pointer-events","none","important"),t.style.setProperty("position","absolute","important"),t.style.setProperty("transition","all 100ms","important"),t.style.setProperty("cursor","pointer","important"),t.style.setProperty("z-index","2147483647","important"),t.style.removeProperty("border-inline-end"),t.style.removeProperty("border-inline-start"),t.style.removeProperty("inline-size"),t.style.removeProperty("block-size"),t.style.removeProperty("inset-block-start"),t.style.removeProperty("inset-inline-end"),t.style.removeProperty("inset-block-end"),t.style.removeProperty("inset-inline-start")),t}function M(){try{if(C=document.querySelector(p),!C){C=F(p);const t=C.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=`\n\t\t\t\t@keyframes single-file-pulse { \n\t\t\t\t\t0% { \n\t\t\t\t\t\topacity: .25;\n\t\t\t\t\t} \n\t\t\t\t\t100% { \n\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t} \n\t\t\t\t}\n\t\t\t\t.singlefile-logs {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tbottom: 24px;\n\t\t\t\t\tleft: 8px;\n\t\t\t\t\tz-index: 2147483647;\n\t\t\t\t\topacity: 0.9;\n\t\t\t\t\tpadding: 4px;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t\tmin-width: ${b}px;\n\t\t\t\t\tmin-height: 16px;\n\t\t\t\t\ttransition: height 100ms;\n\t\t\t\t}\n\t\t\t\t.singlefile-logs-line {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tjustify-content: space-between;\n\t\t\t\t\tpadding: 2px;\n\t\t\t\t\tfont-family: arial, sans-serif;\n\t\t\t\t\tcolor: black;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t}\n\t\t\t\t.singlefile-logs-line-text {\n\t\t\t\t\tfont-size: 13px;\n\t\t\t\t\topacity: 1;\n\t\t\t\t\ttransition: opacity 200ms;\n\t\t\t\t}\n\t\t\t\t.singlefile-logs-line-icon {\n\t\t\t\t\tfont-size: 11px;\n\t\t\t\t\tmin-width: 15px;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\tposition: relative;\n\t\t\t\t\ttop: 1px;\n\t\t\t\t}\n\t\t\t`,t.appendChild(e);const n=document.createElement("div");n.classList.add(f),t.appendChild(n)}}catch(t){}}function O(t,e,n,o){try{if(o.logsEnabled){const o=C.shadowRoot.querySelector(".singlefile-logs");let r=o.querySelector("[data-id='"+t+"']");if(!r){r=document.createElement("div"),r.classList.add(m),o.appendChild(r),r.setAttribute("data-id",t);const n=document.createElement("div");n.classList.add(g),r.appendChild(n),n.textContent=e;const i=document.createElement("div");i.classList.add(h),r.appendChild(i)}!function(t,e,n){const o=t.childNodes[0],r=t.childNodes[1];o.textContent=e,r.style.setProperty("color","✓"==n?"#055000":"black"),"✓"==n?(o.style.setProperty("opacity",".5"),r.style.setProperty("opacity",".5"),r.style.setProperty("animation","none")):r.style.setProperty("animation","1s ease-in-out 0s infinite alternate none running single-file-pulse");r.textContent=n}(r,e,n)}}catch(t){}}function U(t,e){let n,o=t,r=[];do{const t=o.getBoundingClientRect();if(o.parentElement){const i=o.parentElement.getBoundingClientRect();n=Math.abs(i[e]-t[e])<=8,n&&(o.parentElement.clientWidth>8&&o.parentElement.clientHeight>8&&(o.parentElement.clientWidth-o.clientWidth>8||o.parentElement.clientHeight-o.clientHeight>8)&&r.push(o.parentElement),o=o.parentElement)}else n=!1}while(n&&o);return r}function q(t,e,n,o){return Math[t](n/8)<=o.length&&(e=o[o.length-Math[t](n/8)-1]),e}function F(t,e){const n=document.createElement(t);return n.className=y,e&&e.appendChild(n),v.forEach((t=>n.style.setProperty(t,"initial","important"))),n}M();const H=globalThis.singlefile,G=H.helper.SINGLE_FILE_UI_ELEMENT_CLASS,W="singlefile-error-bar",z=new Set(Array.from(getComputedStyle(document.body)));let _;function X(t){try{if(console.error("SingleFile",t),_=document.querySelector(W),!_){_=function(t,e){const n=document.createElement(t);n.className=G,e&&e.appendChild(n);return z.forEach((t=>n.style.setProperty(t,"initial","important"))),n}(W);const e=_.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent="\n\t\t\t\t.container {\n\t\t\t\t\tbackground-color: #ff6c00;\n\t\t\t\t\tcolor: white;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0px;\n\t\t\t\t\tleft: 0px;\n\t\t\t\t\tright: 0px;\n\t\t\t\t\theight: auto;\n\t\t\t\t\twidth: auto;\n\t\t\t\t\tmin-height: 24px;\n\t\t\t\t\tmin-width: 24px;\t\t\t\t\t\n\t\t\t\t\tz-index: 2147483647;\n\t\t\t\t\tmargin: 0;\n\t\t\t\t\tpadding: 2px;\n\t\t\t\t\tfont-family: Arial;\n\t\t\t\t}\n\t\t\t\t.text {\n\t\t\t\t\tflex: 1;\n\t\t\t\t\tpadding-top: 4px;\n\t\t\t\t\tpadding-bottom: 4px;\n\t\t\t\t\tpadding-left: 8px;\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t.close-button {\n\t\t\t\t\topacity: .7;\n\t\t\t\t\tpadding-top: 4px;\n\t\t\t\t\tpadding-left: 8px;\n\t\t\t\t\tpadding-right: 8px;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\ttransition: opacity 250ms;\n\t\t\t\t\theight: 16px;\n\t\t\t\t}\n\t\t\t\t.close-button:hover {\n\t\t\t\t\topacity: 1;\n\t\t\t\t}\n\t\t\t",e.appendChild(n);const o=document.createElement("div");o.className="container";const r=document.createElement("span");r.classList.add("text"),r.textContent="SingleFileZ error: "+t,o.appendChild(r);const i=document.createElement("img");i.classList.add("close-button"),o.appendChild(i),e.appendChild(o),i.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhmlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mSlUqHewg4hChOogFURFHqWIRLJS2QqsOJpf+CE0akhQXR8G14ODPYtXBxVlXB1dBEPwBcXNzUnSREr9LCi1ivOO4h/e+9+XuO0Col5lqdowDqmYZqXhMzOZWxMAruhGiOYohiZl6Ir2Qgef4uoeP73dRnuVd9+foVfImA3wi8SzTDYt4nXh609I57xOHWUlSiM+Jxwy6IPEj12WX3zgXHRZ4ZtjIpOaIw8RisY3lNmYlQyWeIo4oqkb5QtZlhfMWZ7VcZc178hcG89pymuu0BhHHIhJIQoSMKjZQhoUo7RopJlJ0HvPwDzj+JLlkcm2AkWMeFaiQHD/4H/zurVmYnHCTgjGg88W2P4aBwC7QqNn297FtN04A/zNwpbX8lTow80l6raVFjoDQNnBx3dLkPeByB+h/0iVDciQ/LaFQAN7P6JtyQN8t0LPq9q15jtMHIEO9WroBDg6BkSJlr3m8u6u9b//WNPv3A6mTcr3f/E/sAAAABmJLR0QAigCKAIrj2uckAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5QkPDysvCdPVuwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAELSURBVHja7ZpLFsIwDAPj3v/OsGHDe1BIa8tKO7Mnlkw+dpoxAAAAAGCfx4ur6Yx/B337UUS4mp/VuWUEcjSfOgO+BXCZCWe0hSqQo/npBLglIUNLdAV2MH84Ad1JyIwdLkK6YoabIHWscBWmihHuAqvHtv+XqmdXOK9TxdKy3axUm2vZkXXGgPJksTuz1bVFeeU2Y6ijsLIpXbtKa1kDs2ews69o7+A+ihJ2lvI+/lcS1G21zUVG18XKNm4OS4BNkGOQQohSmGaIdpgLESvzyiRwKepsXjE2H0ZWMF8Zi4+jK5mviM0DiRXNZ2rhkdTK5jO0xermz2o8dCnq+FS2XNNVH0sDAAAA3JYnre9cH8BZmhEAAAAASUVORK5CYII=",i.onclick=t=>{0===t.button&&_.remove()},document.body.appendChild(_)}}catch(t){}}const Z=globalThis.singlefile,Q=globalThis.singlefileBootstrap;let V,j,J=[];Z.init({fetch:async function(t,e={}){try{let e=await n(t,{cache:"force-cache"});return 401!=e.status&&403!=e.status&&404!=e.status||(e=await r(t)),e}catch(n){const r=await o({method:"singlefile.fetch",url:t,referrer:e.referrer});return{status:r.status,headers:{get:t=>r.headers&&r.headers[t]},arrayBuffer:async()=>new Uint8Array(r.array).buffer}}},frameFetch:async function(t,e){const n=await o({method:"singlefile.fetchFrame",url:t,frameId:e.frameId,referrer:e.referrer});return{status:n.status,headers:new Map(n.headers),arrayBuffer:async()=>new Uint8Array(n.array).buffer}}}),browser.runtime.onMessage.addListener((e=>{if("content.save"==e.method||"content.cancelSave"==e.method||"content.download"==e.method||"content.getSelectedLinks"==e.method||"content.error"==e.method)return async function(e){if("content.save"==e.method)return await async function(e){const n=e.options;let o;(n.selected||n.optionallySelected)&&(o=await N(n.optionallySelected));if(!(j||Q&&Q.pageInfo.processing)){if(n.updatedResources=Q?Q.pageInfo.updatedResources:{},n.visitDate=Q?Q.pageInfo.visitDate:new Date,Object.keys(n.updatedResources).forEach((t=>n.updatedResources[t].retrieved=!1)),n.optionallySelected&&o&&(n.selected=!0),!n.selected||o){Q&&(Q.pageInfo.processing=!0),j=!0;try{const e=await async function(t){const e=Z.processors.frameTree;let n;Z.helper.initDoc(document),I(t),V=new Z.SingleFile(t);const o=[];if(t.insertCanonicalLink=!0,!t.saveRawPage){if(!t.removeFrames&&e&&globalThis.frames&&globalThis.frames.length){let n;n=t.loadDeferredImages?new Promise((n=>setTimeout((()=>n(e.getAsync(t))),t.loadDeferredImagesMaxIdleTime-e.TIMEOUT_INIT_REQUEST_MESSAGE))):e.getAsync(t),function(t){O("load-frames",w,"…",t)}(t),n.then((()=>{V.cancelled||function(t){O("load-frames",w,"✓",t)}(t)})),o.push(n)}if(t.loadDeferredImages){const e=Z.processors.lazy.process(t);!function(t){O("load-deferred-images",A,"…",t)}(t),e.then((()=>{V.cancelled||function(t){O("load-deferred-images",A,"✓",t)}(t)})),o.push(e)}}let r=0,i=0;t.onprogress=e=>{V.cancelled||(e.type==e.RESOURCES_INITIALIZED&&(i=e.detail.max,t.loadDeferredImages&&Z.processors.lazy.resetZoomLevel(t)),e.type==e.RESOURCES_INITIALIZED||e.type==e.RESOURCE_LOADED?(e.type==e.RESOURCE_LOADED&&r++,browser.runtime.sendMessage({method:"ui.processProgress",index:r,maxIndex:i}),R(r,i,t)):e.detail.frame||e.type==e.PAGE_LOADING||e.type==e.PAGE_LOADED||(e.type==e.STAGE_STARTED?e.detail.step<3&&function(t,e){O("step-"+t,`${E} ${t+1} / 3`,"…",e)}(e.detail.step,t):e.type==e.STAGE_ENDED?e.detail.step<3&&function(t,e){O("step-"+t,`${E} ${t+1} / 3`,"✓",e)}(e.detail.step,t):(e.type==e.STAGE_TASK_STARTED||e.type==e.STAGE_TASK_ENDED)&&(e.detail.step,e.detail.task)))},[t.frames]=await new Promise((t=>{const e=Promise.all(o),n=V.cancel.bind(V);V.cancel=function(){n(),t([[]])},e.then((()=>t(e)))})),n=t.frames&&t.frames.sessionId;const s=t.frames&&t.frames.find((t=>t.requestedFrame));t.win=globalThis,s?(t.content=s.content,t.url=s.baseURI,t.canvases=s.canvases,t.fonts=s.fonts,t.stylesheets=s.stylesheets,t.images=s.images,t.posters=s.posters,t.usedFonts=s.usedFonts,t.shadowRoots=s.shadowRoots,t.imports=s.imports):t.doc=document;V.cancelled||await V.run();n&&e.cleanup(n);let l;V.cancelled||(t.confirmInfobarContent&&(t.infobarContent=x("Infobar content",t.infobarContent)||""),l=await V.getPageData(),(t.selected||t.optionallySelected)&&document.querySelectorAll("["+a+"]").forEach((t=>t.removeAttribute(a))),k(),t.displayStats&&(console.log("SingleFileZ stats"),console.table(l.stats)));return l}(n);e&&((!n.backgroundSave||n.saveToGDrive||n.saveToGitHub)&&n.confirmFilename&&(e.filename=x("Save as",e.filename)||e.filename),await async function(e,n){n.includeInfobar&&await infobar.includeScript(e),n.includeBOM&&(e.content="\ufeff"+e.content);const o=Array.from(protobuf.roots.default.Page.encode(e).finish());for(let r=0;r*t<o.length;r++){const i={method:"downloads.download",taskId:n.taskId,insertTextBody:n.insertTextBody,confirmFilename:n.confirmFilename,filenameConflictAction:n.filenameConflictAction,filename:e.filename,saveToGDrive:n.saveToGDrive,saveToGitHub:n.saveToGitHub,githubToken:n.githubToken,githubUser:n.githubUser,githubRepository:n.githubRepository,githubBranch:n.githubBranch,forceWebAuthFlow:n.forceWebAuthFlow,extractAuthCode:n.extractAuthCode,filenameReplacementCharacter:n.filenameReplacementCharacter,includeInfobar:n.includeInfobar,backgroundSave:n.backgroundSave,bookmarkId:n.bookmarkId,replaceBookmarkURL:n.replaceBookmarkURL,createRootDirectory:n.createRootDirectory,selfExtractingArchive:n.selfExtractingArchive,insertCanonicalLink:n.insertCanonicalLink,insertMetaNoIndex:n.insertMetaNoIndex,password:n.password};i.truncated=o.length>t,i.truncated?(i.finished=(r+1)*t>o.length,i.content=o.slice(r*t,(r+1)*t)):i.content=o,await browser.runtime.sendMessage(i)}n.backgroundSave&&await browser.runtime.sendMessage({method:"downloads.end",taskId:n.taskId})}(e,n))}catch(t){V.cancelled||(console.error(t),browser.runtime.sendMessage({method:"ui.processError",error:t}))}}else browser.runtime.sendMessage({method:"ui.processCancelled"});j=!1,Q&&(Q.pageInfo.processing=!1)}}(e),{};if("content.cancelSave"==e.method)return V&&(V.cancel(),k(),browser.runtime.sendMessage({method:"ui.processCancelled"})),e.options.loadDeferredImages&&Z.processors.lazy.resetZoomLevel(e.options),{};if("content.getSelectedLinks"==e.method)return{urls:L()};if("content.download"==e.method){if(e.content=new Uint8Array(e.content),e.truncated?J.push(e.content):J=[e.content],!e.truncated||e.finished){const t=document.createElement("a");t.download=e.filename,t.href=URL.createObjectURL(new Blob(J),"text/html"),J=[],t.dispatchEvent(new MouseEvent("click")),URL.revokeObjectURL(t.href)}return await browser.runtime.sendMessage({method:"downloads.end",taskId:e.taskId}),{}}"content.error"==e.method&&X(e.error)}(e)}))}();
