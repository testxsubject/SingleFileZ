!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="single-filez-load-image",t="single-filez-image-loaded",s=globalThis.browser,o=(e,t,s)=>globalThis.addEventListener(e,t,s),n=e=>globalThis.dispatchEvent(e),i=globalThis.CustomEvent,a=globalThis.document,r=globalThis.Document;let l;if(l=window._singleFileZ_fontFaces?window._singleFileZ_fontFaces:window._singleFileZ_fontFaces=new Map,a instanceof r&&s&&s.runtime&&s.runtime.getURL){o("single-filez-new-font-face",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,l.set(JSON.stringify(s),t)})),o("single-filez-delete-font",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,l.delete(JSON.stringify(s))})),o("single-filez-clear-fonts",(()=>l=new Map));let e=a.createElement("script");e.src="data:,("+function(){"undefined"==typeof globalThis&&(window.globalThis=window);const e=globalThis.document,t=globalThis.console,s=e=>globalThis.dispatchEvent(e),o=globalThis.CustomEvent,n=globalThis.FileReader,i=globalThis.Blob,a=t&&t.warn&&((...e)=>t.warn(...e))||(()=>{}),r="single-filez-new-font-face",l="single-filez-delete-font",d="single-filez-clear-fonts",c={family:"font-family",style:"font-style",weight:"font-weight",stretch:"font-stretch",unicodeRange:"unicode-range",variant:"font-variant",featureSettings:"font-feature-settings"};if(globalThis.FontFace){const t=globalThis.FontFace;let n;globalThis.FontFace=function(){return n||(a("SingleFileZ is hooking the FontFace constructor, document.fonts.delete and document.fonts.clear to handle dynamically loaded fonts."),n=!0),m(...arguments).then((e=>s(new o(r,{detail:e})))),new t(...arguments)},globalThis.FontFace.toString=function(){return"function FontFace() { [native code] }"};const i=e.fonts.delete;e.fonts.delete=function(t){return m(t.family).then((e=>s(new o(l,{detail:e})))),i.call(e.fonts,t)},e.fonts.delete.toString=function(){return"function delete() { [native code] }"};const c=e.fonts.clear;e.fonts.clear=function(){return s(new o(d)),c.call(e.fonts)},e.fonts.clear.toString=function(){return"function clear() { [native code] }"}}async function m(e,t,s){const o={};return o["font-family"]=e,o.src=t,s&&Object.keys(s).forEach((e=>{c[e]&&(o[c[e]]=s[e])})),new Promise((e=>{if(o.src instanceof ArrayBuffer){const t=new n;t.readAsDataURL(new i([o.src])),t.addEventListener("load",(()=>{o.src="url("+t.result+")",e(o)}))}else e(o)}))}}.toString()+")()",(a.documentElement||a).appendChild(e),e.remove(),e=a.createElement("script"),e.src=s.runtime.getURL("/dist/web/hooks/hooks-frames-web.js"),e.async=!1,(a.documentElement||a).appendChild(e),e.remove()}const d=new RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)","ig");const c="data-single-filez-removed-content",m="data-single-filez-hidden-content",u="data-single-filez-kept-content",f="data-single-filez-hidden-frame",g="data-single-filez-preserved-space-element",h="data-single-filez-shadow-root-element",p="data-single-filez-image",w="data-single-filez-poster",b="data-single-filez-canvas",E="data-single-filez-import",y="data-single-filez-input-value",T="data-single-filez-lazy-loaded-src",A="data-single-filez-stylesheet",I="data-single-filez-disabled-noscript",v="data-single-filez-async-script",S="*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",R=["NOSCRIPT","DISABLED-NOSCRIPT","META","LINK","STYLE","TITLE","TEMPLATE","SOURCE","OBJECT","SCRIPT","HEAD"],F=/^'(.*?)'$/,C=/^"(.*?)"$/,z={regular:"400",normal:"400",bold:"700",bolder:"700",lighter:"100"},M="single-file-ui-element";function N(e,t,s,o,n={usedFonts:new Map,canvases:[],images:[],posters:[],shadowRoots:[],imports:[],markedElements:[]},i){return Array.from(s.childNodes).filter((t=>t instanceof e.HTMLElement||t instanceof e.SVGElement)).forEach((s=>{let a,r,l;if((o.removeHiddenElements||o.removeUnusedFonts||o.compressHTML)&&(l=e.getComputedStyle(s),s instanceof e.HTMLElement&&o.removeHiddenElements&&(r=(i||s.closest("html > head"))&&R.includes(s.tagName)||s.closest("details"),r||(a=i||function(e,t){let s=!1;if(t){const o=t.getPropertyValue("display"),n=t.getPropertyValue("opacity"),i=t.getPropertyValue("visibility");if(s="none"==o,!s&&("0"==n||"hidden"==i)&&e.getBoundingClientRect){const t=e.getBoundingClientRect();s=!t.width&&!t.height}}return Boolean(s)}(s,l),a&&(s.setAttribute(m,""),n.markedElements.push(s)))),!a)){if(o.compressHTML&&l){const e=l.getPropertyValue("white-space");e&&e.startsWith("pre")&&(s.setAttribute(g,""),n.markedElements.push(s))}o.removeUnusedFonts&&(k(l,o,n.usedFonts),k(e.getComputedStyle(s,":first-letter"),o,n.usedFonts),k(e.getComputedStyle(s,":before"),o,n.usedFonts),k(e.getComputedStyle(s,":after"),o,n.usedFonts))}!function(e,t,s,o,n){if("CANVAS"==t.tagName)try{o.canvases.push({dataURI:t.toDataURL("image/png","")}),t.setAttribute(b,o.canvases.length-1),o.markedElements.push(t)}catch(e){}if("IMG"==t.tagName){const e={currentSrc:n?"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==":s.loadDeferredImages&&t.getAttribute(T)||t.currentSrc};o.images.push(e),t.setAttribute(p,o.images.length-1),o.markedElements.push(t),t.removeAttribute(T)}if("VIDEO"==t.tagName&&!t.poster){const s=e.createElement("canvas"),n=s.getContext("2d");s.width=t.clientWidth,s.height=t.clientHeight;try{n.drawImage(t,0,0,s.width,s.height),o.posters.push(s.toDataURL("image/png","")),t.setAttribute(w,o.posters.length-1),o.markedElements.push(t)}catch(e){}}"IFRAME"==t.tagName&&n&&s.removeHiddenElements&&(t.setAttribute(f,""),o.markedElements.push(t));"LINK"==t.tagName&&t.import&&t.import.documentElement&&(o.imports.push({content:D(t.import)}),t.setAttribute(E,o.imports.length-1),o.markedElements.push(t));"INPUT"==t.tagName&&("password"!=t.type&&(t.setAttribute(y,t.value),o.markedElements.push(t)),"radio"!=t.type&&"checkbox"!=t.type||(t.setAttribute(y,t.checked),o.markedElements.push(t)));"TEXTAREA"==t.tagName&&(t.setAttribute(y,t.value),o.markedElements.push(t));"SELECT"==t.tagName&&t.querySelectorAll("option").forEach((e=>{e.selected&&(e.setAttribute(y,""),o.markedElements.push(e))}));"SCRIPT"==t.tagName&&(t.async&&""!=t.getAttribute("async")&&"async"!=t.getAttribute("async")&&(t.setAttribute(v,""),o.markedElements.push(t)),t.textContent=t.textContent.replace(/<\/script>/gi,"<\\/script>"))}(t,s,o,n,a);const d=!(s instanceof e.SVGElement)&&q(s);if(d&&!s.classList.contains(M)){const i={};s.setAttribute(h,n.shadowRoots.length),n.markedElements.push(s),n.shadowRoots.push(i),N(e,t,d,o,n,a),i.content=d.innerHTML,i.delegatesFocus=d.delegatesFocus,i.mode=d.mode,d.adoptedStyleSheets&&d.adoptedStyleSheets.length&&(i.adoptedStyleSheets=Array.from(d.adoptedStyleSheets).map((e=>Array.from(e.cssRules).map((e=>e.cssText)).join("\n"))))}N(e,t,s,o,n,a),!o.autoSaveExternalSave&&o.removeHiddenElements&&i&&(r||""==s.getAttribute(u)?s.parentElement&&(s.parentElement.setAttribute(u,""),n.markedElements.push(s.parentElement)):a&&(s.setAttribute(c,""),n.markedElements.push(s)))})),n}function k(e,t,s){if(e){const o=e.getPropertyValue("font-style")||"normal";e.getPropertyValue("font-family").split(",").forEach((n=>{if(n=L(n),!t.loadedFonts||t.loadedFonts.find((e=>L(e.family)==n&&e.style==o))){const t=(i=e.getPropertyValue("font-weight"),z[i.toLowerCase().trim()]||i),a=e.getPropertyValue("font-variant")||"normal",r=[n,t,o,a];s.set(JSON.stringify(r),[n,t,o,a])}var i}))}}function q(e){const t=globalThis.chrome;if(e.openOrClosedShadowRoot)return e.openOrClosedShadowRoot;if(!(t&&t.dom&&t.dom.openOrClosedShadowRoot))return e.shadowRoot;try{return t.dom.openOrClosedShadowRoot(e)}catch(t){return e.shadowRoot}}function L(e=""){return function(e){e=e.match(F)?e.replace(F,"$1"):e.replace(C,"$1");return e.trim()}((t=e.trim(),t.replace(d,((e,t,s)=>{const o="0x"+t-65536;return o!=o||s?t:o<0?String.fromCharCode(o+65536):String.fromCharCode(o>>10|55296,1023&o|56320)})))).toLowerCase();var t}function _(e){if(e){const t=[];return e.querySelectorAll("style").forEach(((s,o)=>{try{const n=e.createElement("style");n.textContent=s.textContent,e.body.appendChild(n);const i=n.sheet;n.remove(),i&&i.cssRules.length==s.sheet.cssRules.length||(s.setAttribute(A,o),t[o]=Array.from(s.sheet.cssRules).map((e=>e.cssText)).join("\n"))}catch(e){}})),t}}function D(e){const t=e.doctype;let s="";return t&&(s="<!DOCTYPE "+t.nodeName,t.publicId?(s+=' PUBLIC "'+t.publicId+'"',t.systemId&&(s+=' "'+t.systemId+'"')):t.systemId&&(s+=' SYSTEM "'+t.systemId+'"'),t.internalSubset&&(s+=" ["+t.internalSubset+"]"),s+="> "),s+e.documentElement.outerHTML}const O=T,P=M,x="attributes",U=globalThis.browser,B=globalThis.document,V=globalThis.MutationObserver,H=(e,t,s)=>globalThis.addEventListener(e,t,s),W=(e,t,s)=>globalThis.removeEventListener(e,t,s),j=new Map;let J;async function Z(s){if(B.documentElement){j.clear();const o=Math.max(B.documentElement.scrollHeight-1.5*B.documentElement.clientHeight,0),a=Math.max(B.documentElement.scrollWidth-1.5*B.documentElement.clientWidth,0);if(globalThis.scrollY<=o&&globalThis.scrollX<=a)return function(s){return J=0,new Promise((async o=>{let a;const r=new Set,l=new V((async e=>{if((e=e.filter((e=>e.type==x))).length){e.filter((e=>{if("src"==e.attributeName&&(e.target.setAttribute(O,e.target.src),e.target.addEventListener("load",c)),"src"==e.attributeName||"srcset"==e.attributeName||"SOURCE"==e.target.tagName)return!e.target.classList||!e.target.classList.contains(P)})).length&&(a=!0,await G(l,s,f),r.size||await K(l,s,f))}}));async function d(e){await $("idleTimeout",(async()=>{a?(Q("idleTimeout"),await d(Math.max(500,e/2))):(Q("loadTimeout"),Q("maxTimeout"),Y(l,s,f))}),e)}function c(e){const t=e.target;t.removeAttribute(O),t.removeEventListener("load",c)}async function m(e){a=!0,await G(l,s,f),await K(l,s,f),e.detail&&r.add(e.detail)}async function u(e){await G(l,s,f),await K(l,s,f),r.delete(e.detail),r.size||await K(l,s,f)}function f(s){l.disconnect(),W(e,m),W(t,u),o(s)}await d(2*s.loadDeferredImagesMaxIdleTime),await G(l,s,f),l.observe(B,{subtree:!0,childList:!0,attributes:!0}),H(e,m),H(t,u),function(e){e.loadDeferredImagesBlockCookies&&n(new i("single-filez-block-cookies-start")),e.loadDeferredImagesBlockStorage&&n(new i("single-filez-block-storage-start")),e.loadDeferredImagesKeepZoomLevel?n(new i("single-filez-load-deferred-images-keep-zoom-level-start")):n(new i("single-filez-load-deferred-images-start"))}(s)}))}(s)}}async function K(e,t,s){await $("loadTimeout",(()=>Y(e,t,s)),t.loadDeferredImagesMaxIdleTime)}async function G(e,t,s){await $("maxTimeout",(async()=>{await Q("loadTimeout"),await Y(e,t,s)}),10*t.loadDeferredImagesMaxIdleTime)}async function Y(e,t,s){await Q("idleTimeout"),function(e){e.loadDeferredImagesBlockCookies&&n(new i("single-filez-block-cookies-end")),e.loadDeferredImagesBlockStorage&&n(new i("single-filez-block-storage-end")),e.loadDeferredImagesKeepZoomLevel?n(new i("single-filez-load-deferred-images-keep-zoom-level-end")):n(new i("single-filez-load-deferred-images-end"))}(t),await $("endTimeout",(async()=>{await Q("maxTimeout"),s()}),t.loadDeferredImagesMaxIdleTime/2),e.disconnect()}async function $(e,t,s){if(U&&U.runtime&&U.runtime.sendMessage){if(!j.get(e)||!j.get(e).pending){const o={callback:t,pending:!0};j.set(e,o);try{await U.runtime.sendMessage({method:"singlefile.lazyTimeout.setTimeout",type:e,delay:s})}catch(o){X(e,t,s)}o.pending=!1}}else X(e,t,s)}function X(e,t,s){const o=j.get(e);o&&globalThis.clearTimeout(o),j.set(e,t),globalThis.setTimeout(t,s)}async function Q(e){if(U&&U.runtime&&U.runtime.sendMessage)try{await U.runtime.sendMessage({method:"singlefile.lazyTimeout.clearTimeout",type:e})}catch(t){ee(e)}else ee(e)}function ee(e){const t=j.get(e);j.delete(e),t&&globalThis.clearTimeout(t)}U&&U.runtime&&U.runtime.onMessage&&U.runtime.onMessage.addListener&&U.runtime.onMessage.addListener((e=>{if("singlefile.lazyTimeout.onTimeout"==e.method){const t=j.get(e.type);if(t){j.delete(e.type);try{t.callback()}catch(t){ee(e.type)}}}}));const te={ON_BEFORE_CAPTURE_EVENT_NAME:"single-filez-on-before-capture",ON_AFTER_CAPTURE_EVENT_NAME:"single-filez-on-after-capture",WIN_ID_ATTRIBUTE_NAME:"data-single-filez-win-id",preProcessDoc:function(e,t,s){let o;return e.querySelectorAll("noscript:not([data-single-filez-disabled-noscript])").forEach((e=>{e.setAttribute(I,e.textContent),e.textContent=""})),function(e){e.querySelectorAll("meta[http-equiv=refresh]").forEach((e=>{e.removeAttribute("http-equiv"),e.setAttribute("disabled-http-equiv","refresh")}))}(e),e.head&&e.head.querySelectorAll(S).forEach((e=>e.hidden=!0)),e.querySelectorAll("svg foreignObject").forEach((e=>{const t=e.querySelectorAll("html > head > "+S+", html > body > "+S);t.length&&(Array.from(e.childNodes).forEach((e=>e.remove())),t.forEach((t=>e.appendChild(t))))})),o=t&&e.documentElement?N(t,e,e.documentElement,s):{canvases:[],images:[],posters:[],usedFonts:[],shadowRoots:[],imports:[],markedElements:[]},{canvases:o.canvases,fonts:Array.from(l.values()),stylesheets:_(e),images:o.images,posters:o.posters,usedFonts:Array.from(o.usedFonts.values()),shadowRoots:o.shadowRoots,imports:o.imports,referrer:e.referrer,markedElements:o.markedElements}},serialize:D,postProcessDoc:function(e,t){if(e.querySelectorAll("[data-single-filez-disabled-noscript]").forEach((t=>{t.textContent=t.getAttribute(I),t.removeAttribute(I),e.body.firstChild?e.body.insertBefore(t,e.body.firstChild):e.body.appendChild(t)})),e.querySelectorAll("meta[disabled-http-equiv]").forEach((e=>{e.setAttribute("http-equiv",e.getAttribute("disabled-http-equiv")),e.removeAttribute("disabled-http-equiv")})),e.head&&e.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach((e=>e.removeAttribute("hidden"))),!t){const s=[c,f,m,g,p,w,b,y,h,E,A,v];t=e.querySelectorAll(s.map((e=>"["+e+"]")).join(","))}t.forEach((e=>{e.removeAttribute(c),e.removeAttribute(m),e.removeAttribute(u),e.removeAttribute(f),e.removeAttribute(g),e.removeAttribute(p),e.removeAttribute(w),e.removeAttribute(b),e.removeAttribute(y),e.removeAttribute(h),e.removeAttribute(E),e.removeAttribute(A),e.removeAttribute(v)}))},getShadowRoot:q},se="__sfz_frameTree__::",oe='iframe, frame, object[type="text/html"][data]',ne="singlefile.frameTree.initRequest",ie="singlefile.frameTree.ackInitRequest",ae="singlefile.frameTree.cleanupRequest",re="singlefile.frameTree.initResponse",le=".",de=globalThis.window==globalThis.top,ce=globalThis.browser,me=globalThis.top,ue=globalThis.MessageChannel,fe=globalThis.document,ge=new Map;let he;var pe,we,be;function Ee(e){e.frames.forEach((t=>Te("responseTimeouts",e.sessionId,t.windowId)));const t=ge.get(e.sessionId);if(t){e.requestedFrameId&&(t.requestedFrameId=e.requestedFrameId),e.frames.forEach((e=>{let s=t.frames.find((t=>e.windowId==t.windowId));s||(s={windowId:e.windowId},t.frames.push(s)),s.processed||(s.content=e.content,s.baseURI=e.baseURI,s.title=e.title,s.url=e.url,s.canvases=e.canvases,s.fonts=e.fonts,s.stylesheets=e.stylesheets,s.images=e.images,s.posters=e.posters,s.usedFonts=e.usedFonts,s.shadowRoots=e.shadowRoots,s.imports=e.imports,s.processed=e.processed)}));t.frames.filter((e=>!e.processed)).length||(t.frames=t.frames.sort(((e,t)=>t.windowId.split(le).length-e.windowId.split(le).length)),t.resolve&&(t.requestedFrameId&&t.frames.forEach((e=>{e.windowId==t.requestedFrameId&&(e.requestedFrame=!0)})),t.resolve(t.frames)))}}function ye(e,t,s,o){const n=Fe(e);!function(e,t,s,o,n){const i=[];let a;ge.get(n)?a=ge.get(n).requestTimeouts:(a={},ge.set(n,{requestTimeouts:a}));t.forEach(((e,t)=>{const s=o+le+t;e.setAttribute(te.WIN_ID_ATTRIBUTE_NAME,s),i.push({windowId:s})})),ve({frames:i,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),t.forEach(((e,t)=>{const i=o+le+t;try{Se(e.contentWindow,{method:ne,windowId:i,sessionId:n,options:s})}catch(e){}a[i]=globalThis.setTimeout((()=>ve({frames:[{windowId:i,processed:!0}],sessionId:n})),750)})),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o),n.length&&function(e,t,s,o,n){const i=[];t.forEach(((e,t)=>{const a=o+le+t;let r;try{r=e.contentDocument}catch(e){}if(r)try{const t=e.contentWindow;t.stop(),Te("requestTimeouts",n,a),ye(r,s,a,n),i.push(Re(r,t,a,s))}catch(e){i.push({windowId:a,processed:!0})}})),ve({frames:i,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o)}function Te(e,t,s){const o=ge.get(t);if(o&&o[e]){const t=o[e][s];t&&(globalThis.clearTimeout(t),delete o[e][s])}}function Ae(e,t){const s=ge.get(e);s&&s.responseTimeouts&&(s.responseTimeouts[t]=globalThis.setTimeout((()=>ve({frames:[{windowId:t,processed:!0}],sessionId:e})),1e4))}function Ie(e,t,s){e.forEach(((e,o)=>{const n=t+le+o;e.removeAttribute(te.WIN_ID_ATTRIBUTE_NAME);try{Se(e.contentWindow,{method:ae,windowId:n,sessionId:s})}catch(e){}})),e.forEach(((e,o)=>{const n=t+le+o;let i;try{i=e.contentDocument}catch(e){}if(i)try{Ie(Fe(i),n,s)}catch(e){}}))}function ve(e){e.method=re;try{me.singlefile.processors.frameTree.initResponse(e)}catch(t){Se(me,e,!0)}}function Se(e,t,s){if(e==me&&ce&&ce.runtime&&ce.runtime.sendMessage)ce.runtime.sendMessage(t);else if(s){const s=new ue;e.postMessage(se+JSON.stringify({method:t.method,sessionId:t.sessionId}),"*",[s.port2]),s.port1.postMessage(t)}else e.postMessage(se+JSON.stringify(t),"*")}function Re(e,t,s,o){const n=te.preProcessDoc(e,t,o),i=te.serialize(e);te.postProcessDoc(e,n.markedElements);return{windowId:s,content:i,baseURI:e.baseURI.split("#")[0],url:e.location.href,title:e.title,canvases:n.canvases,fonts:n.fonts,stylesheets:n.stylesheets,images:n.images,posters:n.posters,usedFonts:n.usedFonts,shadowRoots:n.shadowRoots,imports:n.imports,processed:!0}}function Fe(e){let t=Array.from(e.querySelectorAll(oe));return e.querySelectorAll("*").forEach((e=>{const s=te.getShadowRoot(e);s&&(t=t.concat(...s.querySelectorAll(oe)))})),t}de&&(he="0",ce&&ce.runtime&&ce.runtime.onMessage&&ce.runtime.onMessage.addListener&&ce.runtime.onMessage.addListener((e=>e.method==re?(Ee(e),Promise.resolve({})):e.method==ie?(Te("requestTimeouts",e.sessionId,e.windowId),Ae(e.sessionId,e.windowId),Promise.resolve({})):void 0))),pe="message",we=async e=>{if("string"==typeof e.data&&e.data.startsWith(se)){e.preventDefault(),e.stopPropagation();const t=JSON.parse(e.data.substring(se.length));t.method==ne?(e.source&&Se(e.source,{method:ie,windowId:t.windowId,sessionId:t.sessionId}),de||(globalThis.stop(),t.options.loadDeferredImages&&Z(t.options),await async function(e){const t=e.sessionId,s=globalThis._singleFileZ_waitForUserScript;de||(he=globalThis.frameId=e.windowId),ye(fe,e.options,he,t),de||(e.options.userScriptEnabled&&s&&await s(te.ON_BEFORE_CAPTURE_EVENT_NAME),ve({frames:[Re(fe,globalThis,he,e.options)],sessionId:t,requestedFrameId:fe.documentElement.dataset.requestedFrameId&&he}),e.options.userScriptEnabled&&s&&await s(te.ON_AFTER_CAPTURE_EVENT_NAME),delete fe.documentElement.dataset.requestedFrameId)}(t))):t.method==ie?(Te("requestTimeouts",t.sessionId,t.windowId),Ae(t.sessionId,t.windowId)):t.method==ae?function(e){const t=e.sessionId;Ie(Fe(fe),e.windowId,t)}(t):t.method==re&&ge.get(t.sessionId)&&(e.ports[0].onmessage=e=>Ee(e.data))}},be=!0,globalThis.addEventListener(pe,we,be)}));
