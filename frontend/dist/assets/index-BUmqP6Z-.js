(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=globalThis,he=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ue=Symbol(),be=new WeakMap;let Ce=class{constructor(e,r,a){if(this._$cssResult$=!0,a!==ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(he&&e===void 0){const a=r!==void 0&&r.length===1;a&&(e=be.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&be.set(r,e))}return e}toString(){return this.cssText}};const Ne=t=>new Ce(typeof t=="string"?t:t+"",void 0,ue),k=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((a,s,i)=>a+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new Ce(r,t,ue)},Me=(t,e)=>{if(he)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const a=document.createElement("style"),s=X.litNonce;s!==void 0&&a.setAttribute("nonce",s),a.textContent=r.cssText,t.appendChild(a)}},me=he?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const a of e.cssRules)r+=a.cssText;return Ne(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ue,defineProperty:Fe,getOwnPropertyDescriptor:je,getOwnPropertyNames:He,getOwnPropertySymbols:Le,getPrototypeOf:Be}=Object,C=globalThis,ye=C.trustedTypes,Ve=ye?ye.emptyScript:"",ne=C.reactiveElementPolyfillSupport,V=(t,e)=>t,ee={toAttribute(t,e){switch(e){case Boolean:t=t?Ve:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},ve=(t,e)=>!Ue(t,e),$e={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),C.litPropertyMetadata??(C.litPropertyMetadata=new WeakMap);let U=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=$e){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const a=Symbol(),s=this.getPropertyDescriptor(e,a,r);s!==void 0&&Fe(this.prototype,e,s)}}static getPropertyDescriptor(e,r,a){const{get:s,set:i}=je(this.prototype,e)??{get(){return this[r]},set(o){this[r]=o}};return{get:s,set(o){const l=s==null?void 0:s.call(this);i==null||i.call(this,o),this.requestUpdate(e,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$e}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;const e=Be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){const r=this.properties,a=[...He(r),...Le(r)];for(const s of a)this.createProperty(s,r[s])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[a,s]of r)this.elementProperties.set(a,s)}this._$Eh=new Map;for(const[r,a]of this.elementProperties){const s=this._$Eu(r,a);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const s of a)r.unshift(me(s))}else e!==void 0&&r.push(me(e));return r}static _$Eu(e,r){const a=r.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const a of r.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Me(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var a;return(a=r.hostConnected)==null?void 0:a.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var a;return(a=r.hostDisconnected)==null?void 0:a.call(r)})}attributeChangedCallback(e,r,a){this._$AK(e,a)}_$ET(e,r){var i;const a=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,a);if(s!==void 0&&a.reflect===!0){const o=(((i=a.converter)==null?void 0:i.toAttribute)!==void 0?a.converter:ee).toAttribute(r,a.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,r){var i,o;const a=this.constructor,s=a._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=a.getPropertyOptions(s),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((i=l.converter)==null?void 0:i.fromAttribute)!==void 0?l.converter:ee;this._$Em=s;const p=c.fromAttribute(r,l.type);this[s]=p??((o=this._$Ej)==null?void 0:o.get(s))??p,this._$Em=null}}requestUpdate(e,r,a,s=!1,i){var o;if(e!==void 0){const l=this.constructor;if(s===!1&&(i=this[e]),a??(a=l.getPropertyOptions(e)),!((a.hasChanged??ve)(i,r)||a.useDefault&&a.reflect&&i===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(l._$Eu(e,a))))return;this.C(e,r,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:a,reflect:s,wrapped:i},o){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??r??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var a;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:l}=o,c=this[i];l!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(a=this._$EO)==null||a.forEach(s=>{var i;return(i=s.hostUpdate)==null?void 0:i.call(s)}),this.update(r)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(a=>{var s;return(s=a.hostUpdated)==null?void 0:s.call(a)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[V("elementProperties")]=new Map,U[V("finalized")]=new Map,ne==null||ne({ReactiveElement:U}),(C.reactiveElementVersions??(C.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis,xe=t=>t,te=G.trustedTypes,we=te?te.createPolicy("lit-html",{createHTML:t=>t}):void 0,Te="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+E,Ge=`<${Ie}>`,R=document,q=()=>R.createComment(""),K=t=>t===null||typeof t!="object"&&typeof t!="function",ge=Array.isArray,qe=t=>ge(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",le=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,Ae=/>/g,T=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,Pe=/"/g,Oe=/^(?:script|style|textarea|title)$/i,Ke=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),n=Ke(1),D=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Se=new WeakMap,O=R.createTreeWalker(R,129);function ze(t,e){if(!ge(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(e):e}const We=(t,e)=>{const r=t.length-1,a=[];let s,i=e===2?"<svg>":e===3?"<math>":"",o=L;for(let l=0;l<r;l++){const c=t[l];let p,g,h=-1,A=0;for(;A<c.length&&(o.lastIndex=A,g=o.exec(c),g!==null);)A=o.lastIndex,o===L?g[1]==="!--"?o=_e:g[1]!==void 0?o=Ae:g[2]!==void 0?(Oe.test(g[2])&&(s=RegExp("</"+g[2],"g")),o=T):g[3]!==void 0&&(o=T):o===T?g[0]===">"?(o=s??L,h=-1):g[1]===void 0?h=-2:(h=o.lastIndex-g[2].length,p=g[1],o=g[3]===void 0?T:g[3]==='"'?Pe:ke):o===Pe||o===ke?o=T:o===_e||o===Ae?o=L:(o=T,s=void 0);const S=o===T&&t[l+1].startsWith("/>")?" ":"";i+=o===L?c+Ge:h>=0?(a.push(p),c.slice(0,h)+Te+c.slice(h)+E+S):c+E+(h===-2?l:S)}return[ze(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class W{constructor({strings:e,_$litType$:r},a){let s;this.parts=[];let i=0,o=0;const l=e.length-1,c=this.parts,[p,g]=We(e,r);if(this.el=W.createElement(p,a),O.currentNode=this.el.content,r===2||r===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=O.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(Te)){const A=g[o++],S=s.getAttribute(h).split(E),J=/([.?@])?(.*)/.exec(A);c.push({type:1,index:i,name:J[2],strings:S,ctor:J[1]==="."?Ye:J[1]==="?"?Ze:J[1]==="@"?Je:se}),s.removeAttribute(h)}else h.startsWith(E)&&(c.push({type:6,index:i}),s.removeAttribute(h));if(Oe.test(s.tagName)){const h=s.textContent.split(E),A=h.length-1;if(A>0){s.textContent=te?te.emptyScript:"";for(let S=0;S<A;S++)s.append(h[S],q()),O.nextNode(),c.push({type:2,index:++i});s.append(h[A],q())}}}else if(s.nodeType===8)if(s.data===Ie)c.push({type:2,index:i});else{let h=-1;for(;(h=s.data.indexOf(E,h+1))!==-1;)c.push({type:7,index:i}),h+=E.length-1}i++}}static createElement(e,r){const a=R.createElement("template");return a.innerHTML=e,a}}function F(t,e,r=t,a){var o,l;if(e===D)return e;let s=a!==void 0?(o=r._$Co)==null?void 0:o[a]:r._$Cl;const i=K(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,a)),a!==void 0?(r._$Co??(r._$Co=[]))[a]=s:r._$Cl=s),s!==void 0&&(e=F(t,s._$AS(t,e.values),s,a)),e}class Qe{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:a}=this._$AD,s=((e==null?void 0:e.creationScope)??R).importNode(r,!0);O.currentNode=s;let i=O.nextNode(),o=0,l=0,c=a[0];for(;c!==void 0;){if(o===c.index){let p;c.type===2?p=new Y(i,i.nextSibling,this,e):c.type===1?p=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(p=new Xe(i,this,e)),this._$AV.push(p),c=a[++l]}o!==(c==null?void 0:c.index)&&(i=O.nextNode(),o++)}return O.currentNode=R,s}p(e){let r=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,r),r+=a.strings.length-2):a._$AI(e[r])),r++}}class Y{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,a,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=a,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=F(this,e,r),K(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){var i;const{values:r,_$litType$:a}=e,s=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=W.createElement(ze(a.h,a.h[0]),this.options)),a);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(r);else{const o=new Qe(s,this),l=o.u(this.options);o.p(r),this.T(l),this._$AH=o}}_$AC(e){let r=Se.get(e.strings);return r===void 0&&Se.set(e.strings,r=new W(e)),r}k(e){ge(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let a,s=0;for(const i of e)s===r.length?r.push(a=new Y(this.O(q()),this.O(q()),this,this.options)):a=r[s],a._$AI(i),s++;s<r.length&&(this._$AR(a&&a._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){var a;for((a=this._$AP)==null?void 0:a.call(this,!1,!0,r);e!==this._$AB;){const s=xe(e).nextSibling;xe(e).remove(),e=s}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class se{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,a,s,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=u}_$AI(e,r=this,a,s){const i=this.strings;let o=!1;if(i===void 0)e=F(this,e,r,0),o=!K(e)||e!==this._$AH&&e!==D,o&&(this._$AH=e);else{const l=e;let c,p;for(e=i[0],c=0;c<i.length-1;c++)p=F(this,l[a+c],r,c),p===D&&(p=this._$AH[c]),o||(o=!K(p)||p!==this._$AH[c]),p===u?e=u:e!==u&&(e+=(p??"")+i[c+1]),this._$AH[c]=p}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ye extends se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class Ze extends se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class Je extends se{constructor(e,r,a,s,i){super(e,r,a,s,i),this.type=5}_$AI(e,r=this){if((e=F(this,e,r,0)??u)===D)return;const a=this._$AH,s=e===u&&a!==u||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==u&&(a===u||s);s&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class Xe{constructor(e,r,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const ce=G.litHtmlPolyfillSupport;ce==null||ce(W,Y),(G.litHtmlVersions??(G.litHtmlVersions=[])).push("3.3.2");const et=(t,e,r)=>{const a=(r==null?void 0:r.renderBefore)??e;let s=a._$litPart$;if(s===void 0){const i=(r==null?void 0:r.renderBefore)??null;a._$litPart$=s=new Y(e.insertBefore(q(),i),i,void 0,r??{})}return s._$AI(t),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis;let x=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return D}};var Ee;x._$litElement$=!0,x.finalized=!0,(Ee=z.litElementHydrateSupport)==null||Ee.call(z,{LitElement:x});const de=z.litElementPolyfillSupport;de==null||de({LitElement:x});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:ve},rt=(t=tt,e,r)=>{const{kind:a,metadata:s}=r;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),a==="accessor"){const{name:o}=r;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,c,t,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,t,l),l}}}if(a==="setter"){const{name:o}=r;return function(l){const c=this[o];e.call(this,l),this.requestUpdate(o,c,t,!0,l)}}throw Error("Unsupported decorator location: "+a)};function y(t){return(e,r)=>typeof r=="object"?rt(t,e,r):((a,s,i)=>{const o=s.hasOwnProperty(i);return s.constructor.createProperty(i,a),o?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(t){return y({...t,state:!0,attribute:!1})}const at="/api";async function w(t,e,r){const a={method:t,headers:{}};r instanceof FormData?a.body=r:r&&(a.headers={"Content-Type":"application/json"},a.body=JSON.stringify(r));const s=await fetch(`${at}${e}`,a);if(!s.ok){const i=await s.json().catch(()=>({error:"Unknown error"}));throw new Error(i.error||`HTTP ${s.status}`)}return s.json()}const I={uploadPaper:t=>w("POST","/papers",t),listPapers:t=>{const e=new URLSearchParams;t!=null&&t.page&&e.set("page",String(t.page)),t!=null&&t.limit&&e.set("limit",String(t.limit)),t!=null&&t.search&&e.set("search",t.search),t!=null&&t.folder_id&&e.set("folder_id",String(t.folder_id));const r=e.toString();return w("GET",`/papers${r?`?${r}`:""}`)},getPaper:t=>w("GET",`/papers/${t}`),updatePaper:(t,e)=>w("PUT",`/papers/${t}`,e),deletePaper:t=>w("DELETE",`/papers/${t}`),listFolders:()=>w("GET","/folders"),createFolder:(t,e)=>w("POST","/folders",{name:t,parent_id:e}),deleteFolder:t=>w("DELETE",`/folders/${t}`),listTags:()=>w("GET","/tags"),createTag:(t,e)=>w("POST","/tags",{name:t,color:e||"#10b981"}),deleteTag:t=>w("DELETE",`/tags/${t}`),getStats:()=>w("GET","/stats")};var st=Object.defineProperty,it=Object.getOwnPropertyDescriptor,Re=(t,e,r,a)=>{for(var s=a>1?void 0:a?it(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&st(e,r,s),s};let re=class extends x{constructor(){super(...arguments),this.searchValue=""}onSearch(t){const e=t.target;this.searchValue=e.value,this.dispatchEvent(new CustomEvent("search",{detail:this.searchValue}))}render(){return n`
      <div class="header">
        <div class="logo">
          <div class="logo-icon">P</div>
          <span>Paper Dashboard</span>
        </div>
        
        <div class="actions">
          <input
            type="search"
            placeholder="Search papers..."
            .value=${this.searchValue}
            @input=${this.onSearch}
            style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-lg); font-size: 14px; width: 240px;"
          />
          
          <button class="primary" @click=${()=>this.dispatchEvent(new CustomEvent("upload"))}>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
            Upload
          </button>
        </div>
      </div>
    `}};re.styles=k`
    :host {
      display: block;
    }
    
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--space-6);
      height: 64px;
      max-width: 1600px;
      margin: 0 auto;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-text-primary);
      letter-spacing: -0.02em;
    }
    
    .logo-icon {
      width: 32px;
      height: 32px;
      background: var(--color-accent);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: var(--text-sm);
    }
    
    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    button {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    button:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }
    
    button:active {
      transform: scale(0.98);
    }
    
    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }
    
    button.primary:hover {
      background: var(--color-accent-hover);
    }
    
    .icon {
      width: 16px;
      height: 16px;
    }
  `;Re([d()],re.prototype,"searchValue",2);re=Re([P("paper-header")],re);var ot=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,ie=(t,e,r,a)=>{for(var s=a>1?void 0:a?nt(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&ot(e,r,s),s};let j=class extends x{constructor(){super(...arguments),this.folders=[],this.tags=[],this.selectedFolderId=null}selectFolder(t){this.dispatchEvent(new CustomEvent("folder-select",{detail:t}))}createPaper(){this.dispatchEvent(new CustomEvent("create-paper"))}render(){return n`
      <div class="sidebar">
        <button class="create-paper" @click=${this.createPaper}>创建新论文</button>

        <div class="section">
          <h3>Folders</h3>
          <div class="nav-item ${this.selectedFolderId===null?"active":""}"
               @click=${()=>this.selectFolder(null)}>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            All Papers
          </div>
          ${this.folders.map(t=>n`
            <div class="nav-item ${this.selectedFolderId===t.id?"active":""}"
                 @click=${()=>this.selectFolder(t.id)}>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              ${t.name}
            </div>
          `)}
        </div>
        
        <div class="section">
          <h3>Tags</h3>
          <div class="tags-container">
            ${this.tags.map(t=>n`
              <span class="tag" style="background: ${t.color}20;">
                <span class="tag-dot" style="background: ${t.color};"></span>
                ${t.name}
              </span>
            `)}
          </div>
        </div>
      </div>
    `}};j.styles=k`
    :host {
      display: block;
      height: 100%;
    }
    
    .sidebar {
      padding: var(--space-4);
    }

    .create-paper {
      width: 100%;
      margin-bottom: var(--space-6);
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--color-accent);
      border-radius: var(--radius-lg);
      background: var(--color-accent);
      color: #fff;
      font-size: var(--text-sm);
      font-weight: 600;
      cursor: pointer;
      transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
    }

    .create-paper:hover {
      background: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
    }

    .create-paper:active {
      transform: scale(0.98);
    }
    
    h3 {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-3);
      padding: 0 var(--space-2);
    }
    
    .section {
      margin-bottom: var(--space-6);
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .nav-item:hover {
      background: var(--color-bg);
      color: var(--color-text-primary);
    }
    
    .nav-item.active {
      background: var(--color-accent-light);
      color: var(--color-accent);
      font-weight: 500;
    }
    
    .nav-item .icon {
      width: 18px;
      height: 18px;
      opacity: 0.7;
    }
    
    .nav-item.active .icon {
      opacity: 1;
    }
    
    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-xl);
      font-size: var(--text-xs);
      font-weight: 500;
      margin: 0 var(--space-1) var(--space-1) 0;
    }
    
    .tag-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      padding: var(--space-2);
    }
  `;ie([y({type:Array})],j.prototype,"folders",2);ie([y({type:Array})],j.prototype,"tags",2);ie([y({type:Number})],j.prototype,"selectedFolderId",2);j=ie([P("paper-sidebar")],j);var lt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,fe=(t,e,r,a)=>{for(var s=a>1?void 0:a?ct(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&lt(e,r,s),s};let Q=class extends x{constructor(){super(...arguments),this.showConfirm=!1}async download(){const t=document.createElement("a");t.href=`/uploads/${this.paper.file_path.replace("uploads/","")}`,t.download=this.paper.file_name,t.click()}async delete(){if(!this.showConfirm){this.showConfirm=!0,setTimeout(()=>this.showConfirm=!1,3e3);return}try{await I.deletePaper(this.paper.id),this.dispatchEvent(new CustomEvent("delete"))}catch(t){console.error("Delete failed:",t)}}render(){const{title:t,authors:e,journal:r,year:a,abstract:s,file_name:i,tags:o}=this.paper;return n`
      <div class="card">
        <div class="header">
          <div class="title">${t||"Untitled"}</div>
          ${a?n`<span class="year">${a}</span>`:""}
        </div>
        
        ${e?n`<div class="authors">${e}</div>`:""}
        ${r?n`<div class="journal">${r}</div>`:""}
        
        ${s?n`<div class="abstract">${s}</div>`:""}
        
        <div class="footer">
          <div class="tags">
            ${o==null?void 0:o.slice(0,3).map(l=>n`
              <span class="tag" style="background: ${l.color}20; color: ${l.color};">
                ${l.name}
              </span>
            `)}
          </div>
          
          <div class="actions">
            <button class="action-btn" @click=${this.download} title="Download">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </button>
            <button class="action-btn delete" @click=${this.delete} title="Delete">
              ${this.showConfirm?n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>`:n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>`}
            </button>
          </div>
        </div>
      </div>
    `}};Q.styles=k`
    :host {
      display: block;
    }
    
    .card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      transition: all var(--transition-base);
      cursor: pointer;
      position: relative;
    }
    
    .card:hover {
      border-color: var(--color-accent);
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }
    
    .card:active {
      transform: scale(0.98);
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-3);
    }
    
    .title {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-text-primary);
      line-height: 1.4;
      flex: 1;
      margin-right: var(--space-3);
    }
    
    .year {
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--color-text-tertiary);
      background: var(--color-bg);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
    }
    
    .authors {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .journal {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      font-style: italic;
      margin-bottom: var(--space-3);
    }
    
    .abstract {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: var(--space-4);
    }
    
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }
    
    .tag {
      font-size: 10px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: var(--radius-xl);
      background: var(--color-accent-light);
      color: var(--color-accent);
    }
    
    .actions {
      display: flex;
      gap: var(--space-2);
      opacity: 0;
      transition: opacity var(--transition-fast);
    }
    
    .card:hover .actions {
      opacity: 1;
    }
    
    .action-btn {
      padding: var(--space-1);
      border: none;
      background: none;
      color: var(--color-text-tertiary);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);
    }
    
    .action-btn:hover {
      background: var(--color-bg);
      color: var(--color-text-primary);
    }
    
    .action-btn.delete:hover {
      color: #ef4444;
    }
    
    .action-btn svg {
      width: 16px;
      height: 16px;
    }
  `;fe([y({type:Object})],Q.prototype,"paper",2);fe([d()],Q.prototype,"showConfirm",2);Q=fe([P("paper-card")],Q);var dt=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,De=(t,e,r,a)=>{for(var s=a>1?void 0:a?pt(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&dt(e,r,s),s};let ae=class extends x{constructor(){super(...arguments),this.papers=[]}render(){return n`
      <div class="grid">
        ${this.papers.map(t=>n`
          <paper-card .paper=${t} @delete=${()=>this.dispatchEvent(new CustomEvent("delete"))}></paper-card>
        `)}
      </div>
    `}};ae.styles=k`
    :host {
      display: block;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-6);
    }
    
    /* Anti-3-column-bias: asymmetric sizing */
    .grid > :nth-child(3n+1) {
      grid-column: span 1;
    }
  `;De([y({type:Array})],ae.prototype,"papers",2);ae=De([P("paper-grid")],ae);var ht=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,_=(t,e,r,a)=>{for(var s=a>1?void 0:a?ut(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&ht(e,r,s),s};let m=class extends x{constructor(){super(...arguments),this.folders=[],this.file=null,this.paperTitle="",this.authors="",this.abstract="",this.journal="",this.year="",this.doi="",this.folderId="",this.loading=!1,this.error=""}close(){this.dispatchEvent(new CustomEvent("close"))}onFileChange(t){var r;const e=t.target;(r=e.files)!=null&&r[0]&&(this.file=e.files[0],this.paperTitle||(this.paperTitle=this.file.name.replace(/\.pdf$/i,"")))}async submit(t){if(t.preventDefault(),!this.file){this.error="Please select a PDF file";return}this.loading=!0,this.error="";try{const e=new FormData;e.append("file",this.file),e.append("title",this.paperTitle),e.append("authors",this.authors),e.append("abstract",this.abstract),e.append("journal",this.journal),this.year&&e.append("year",this.year),e.append("doi",this.doi),this.folderId&&e.append("folder_id",this.folderId),await I.uploadPaper(e),this.dispatchEvent(new CustomEvent("upload"))}catch(e){this.error=e.message}finally{this.loading=!1}}render(){return n`
      <div class="modal">
        <div class="header">
          <h2>Upload Paper</h2>
          <button class="close-btn" @click=${this.close}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <form class="form" @submit=${this.submit}>
          <div class="field">
            <label>PDF File *</label>
            <div class="file-input">
              <input type="file" accept=".pdf" @change=${this.onFileChange}>
              ${this.file?n`<p>Selected: ${this.file.name}</p>`:n`<p>Click or drag PDF here</p>`}
            </div>
          </div>
          
          <div class="field">
            <label>Title</label>
            <input type="text" .value=${this.paperTitle} @input=${t=>this.paperTitle=t.target.value}>
          </div>
          
          <div class="field">
            <label>Authors</label>
            <input type="text" .value=${this.authors} @input=${t=>this.authors=t.target.value}>
          </div>
          
          <div class="field" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
            <div class="field">
              <label>Year</label>
              <input type="number" .value=${this.year} @input=${t=>this.year=t.target.value}>
            </div>
            <div class="field">
              <label>Folder</label>
              <select .value=${this.folderId} @change=${t=>this.folderId=t.target.value}>
                <option value="">None</option>
                ${this.folders.map(t=>n`<option value=${t.id}>${t.name}</option>`)}
              </select>
            </div>
          </div>
          
          <div class="field">
            <label>Journal / Venue</label>
            <input type="text" .value=${this.journal} @input=${t=>this.journal=t.target.value}>
          </div>
          
          <div class="field">
            <label>DOI</label>
            <input type="text" .value=${this.doi} @input=${t=>this.doi=t.target.value}>
          </div>
          
          <div class="field">
            <label>Abstract</label>
            <textarea .value=${this.abstract} @input=${t=>this.abstract=t.target.value}></textarea>
          </div>
          
          ${this.error?n`<div class="error">${this.error}</div>`:""}
          
          <div class="actions">
            <button type="button" class="cancel" @click=${this.close}>Cancel</button>
            <button type="submit" ?disabled=${this.loading}>
              ${this.loading?"Uploading...":"Upload"}
            </button>
          </div>
        </form>
      </div>
    `}};m.styles=k`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    
    .modal {
      background: var(--color-surface);
      border-radius: var(--radius-xl);
      width: 90%;
      max-width: 480px;
      padding: var(--space-8);
      box-shadow: var(--shadow-lg);
      animation: slideUp 0.3s var(--ease-spring);
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
    }
    
    h2 {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-text-primary);
    }
    
    .close-btn {
      padding: var(--space-2);
      border: none;
      background: none;
      color: var(--color-text-tertiary);
      cursor: pointer;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }
    
    .close-btn:hover {
      background: var(--color-bg);
      color: var(--color-text-primary);
    }
    
    .form {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    label {
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-text-secondary);
    }
    
    input, select, textarea {
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      font-family: var(--font-sans);
      transition: border-color var(--transition-fast);
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--color-accent);
    }
    
    textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    .file-input {
      padding: var(--space-6);
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-lg);
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .file-input:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }
    
    .file-input input {
      display: none;
    }
    
    .actions {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-4);
    }
    
    button[type="submit"] {
      flex: 1;
      padding: var(--space-3);
      background: var(--color-accent);
      border: none;
      border-radius: var(--radius-md);
      color: white;
      font-size: var(--text-sm);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    button[type="submit"]:hover {
      background: var(--color-accent-hover);
    }
    
    button[type="submit"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    button.cancel {
      padding: var(--space-3) var(--space-6);
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    button.cancel:hover {
      border-color: var(--color-text-tertiary);
    }
    
    .error {
      color: #ef4444;
      font-size: var(--text-sm);
      padding: var(--space-2);
      background: #fef2f2;
      border-radius: var(--radius-sm);
    }
  `;_([y({type:Array})],m.prototype,"folders",2);_([d()],m.prototype,"file",2);_([d()],m.prototype,"paperTitle",2);_([d()],m.prototype,"authors",2);_([d()],m.prototype,"abstract",2);_([d()],m.prototype,"journal",2);_([d()],m.prototype,"year",2);_([d()],m.prototype,"doi",2);_([d()],m.prototype,"folderId",2);_([d()],m.prototype,"loading",2);_([d()],m.prototype,"error",2);m=_([P("paper-uploader")],m);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt={CHILD:2},gt=t=>(...e)=>({_$litDirective$:t,values:e});class ft{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,a){this._$Ct=e,this._$AM=r,this._$Ci=a}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class pe extends ft{constructor(e){if(super(e),this.it=u,e.type!==vt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this._t=void 0,this.it=e;if(e===D)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}pe.directiveName="unsafeHTML",pe.resultType=1;const bt=gt(pe);var mt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,oe=(t,e,r,a)=>{for(var s=a>1?void 0:a?yt(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&mt(e,r,s),s};let H=class extends x{constructor(){super(...arguments),this.label="",this.value=0,this.icon="file"}getIcon(){const t={"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'};return t[this.icon]||t["file-text"]}render(){return n`
      <div class="card">
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${bt(this.getIcon())}
          </svg>
        </div>
        <div class="info">
          <div class="value">${this.value}</div>
          <div class="label">${this.label}</div>
        </div>
      </div>
    `}};H.styles=k`
    :host {
      display: block;
    }
    
    .card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      display: flex;
      align-items: center;
      gap: var(--space-4);
      transition: all var(--transition-base);
    }
    
    .card:hover {
      border-color: var(--color-accent);
      box-shadow: var(--shadow-md);
    }
    
    .icon-wrap {
      width: 48px;
      height: 48px;
      background: var(--color-accent-light);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-accent);
    }
    
    .icon-wrap svg {
      width: 24px;
      height: 24px;
    }
    
    .info {
      flex: 1;
    }
    
    .value {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--color-text-primary);
      font-family: var(--font-mono);
      letter-spacing: -0.02em;
    }
    
    .label {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 500;
    }
  `;oe([y({type:String})],H.prototype,"label",2);oe([y({type:Number})],H.prototype,"value",2);oe([y({type:String})],H.prototype,"icon",2);H=oe([P("stat-card")],H);var $t=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,Z=(t,e,r,a)=>{for(var s=a>1?void 0:a?xt(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&$t(e,r,s),s};let N=class extends x{constructor(){super(...arguments),this.completedStages=[],this.canAdvance=!0,this.canRollback=!0}get stages(){return[{key:"INTAKE",label:"Intake",description:"校验输入、建立上下文",agent:"Orchestrator"},{key:"LITERATURE",label:"Literature",description:"文献检索、证据沉淀",agent:"Agent A"},{key:"OUTLINE",label:"Outline",description:"确定结构、论证路径",agent:"Agent A"},{key:"DATA_REQUIREMENTS",label:"Data Req.",description:"算例需求、数据映射",agent:"Agent B"},{key:"DRAFTING",label:"Drafting",description:"章节草稿、无缺段检查",agent:"Agent C"},{key:"POLISHING",label:"Polishing",description:"PoF风格润色",agent:"Agent C"},{key:"REVIEW",label:"Review",description:"质量门禁、返工决策",agent:"Orchestrator"},{key:"FINALIZE",label:"Finalize",description:"固化产物、投稿封装",agent:"Orchestrator"}]}isCompleted(t){return this.completedStages.includes(t)}isCurrent(t){return t===this.currentStage}canPreviewStage(t){const e=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"],r=e.indexOf(this.currentStage);return e.indexOf(t)<=r+1}previewStage(){this.dispatchEvent(new CustomEvent("preview-stage"))}advanceStage(){this.dispatchEvent(new CustomEvent("advance-stage"))}rollbackStage(){this.dispatchEvent(new CustomEvent("rollback-stage"))}selectStage(t){this.canPreviewStage(t)&&this.dispatchEvent(new CustomEvent("select-stage",{detail:t}))}render(){const t=this.stages.find(e=>e.key===this.currentStage);return n`
      <section class="wrap">
        <div class="stages">
          ${this.stages.map(e=>{const r=this.isCurrent(e.key),a=this.isCompleted(e.key),s=this.canPreviewStage(e.key);return n`
              <article 
                class="stage ${r?"current":""} ${a?"completed":""} ${s&&!r?"previewable":""}"
                @click=${()=>this.selectStage(e.key)}
              >
                <div class="stage-name">
                  <span class="stage-label">${e.label}</span>
                  ${r?n`<span class="badge current">当前</span>`:a?n`<span class="badge">已完成</span>`:s?n`<span class="badge preview">可预览</span>`:""}
                </div>
                <div class="stage-meta">${e.description}</div>
                ${e.agent?n`<span class="agent-tag">${e.agent}</span>`:""}
              </article>
            `})}
        </div>

        <div class="actions">
          <div class="current-stage-info">
            <span>当前阶段：</span>
            <strong>${(t==null?void 0:t.label)||this.currentStage}</strong>
            ${t!=null&&t.agent?n`<span class="agent-tag">${t.agent}</span>`:""}
          </div>
          
          <div class="action-group">
            <button 
              ?disabled=${!this.canRollback} 
              @click=${this.rollbackStage}
              title="返回上一阶段"
            >
              ← 回滚
            </button>
            
            <button 
              class="secondary"
              @click=${this.previewStage}
              title="预览当前阶段内容（不推进）"
            >
              👁 预览
            </button>
            
            <button 
              class="primary"
              ?disabled=${!this.canAdvance} 
              @click=${this.advanceStage}
              title="正式推进到下一阶段"
            >
              推进 →
            </button>
          </div>
        </div>
      </section>
    `}};N.styles=k`
    :host {
      display: block;
    }

    .wrap {
      display: grid;
      gap: var(--space-4);
      padding: var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      background: var(--color-surface);
      box-shadow: var(--shadow-sm);
    }

    .stages {
      display: grid;
      gap: var(--space-2);
      grid-template-columns: repeat(8, minmax(0, 1fr));
      overflow-x: auto;
    }

    .stage {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
      transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
      cursor: pointer;
      min-width: 100px;
    }

    .stage:hover {
      transform: translateY(-2px);
      border-color: var(--color-accent);
    }

    .stage.current {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
      transform: translateY(-2px);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .stage.completed {
      border-color: #34d399;
      background: #ecfdf5;
    }

    .stage.previewable:hover {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .stage-name {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .stage-label {
      font-size: var(--text-xs);
    }

    .stage-meta {
      font-size: 10px;
      color: var(--color-text-tertiary);
      margin-top: 2px;
    }

    .badge {
      font-size: 9px;
      border-radius: 999px;
      padding: 2px 6px;
      background: #d1fae5;
      color: #047857;
      font-weight: 700;
      display: inline-block;
      margin-top: 4px;
    }

    .badge.current {
      background: var(--color-accent);
      color: #fff;
    }

    .badge.preview {
      background: #fef3c7;
      color: #92400e;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .action-group {
      display: flex;
      gap: var(--space-3);
    }

    .current-stage-info {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .agent-tag {
      font-size: 10px;
      background: #e0e7ff;
      color: #4338ca;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
    }

    button {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      font-weight: 600;
      padding: var(--space-2) var(--space-4);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: #fff;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
      color: #fff;
    }

    button.secondary {
      background: #fef3c7;
      border-color: #fde68a;
      color: #92400e;
    }

    button.secondary:hover:not(:disabled) {
      background: #fde68a;
      border-color: #f59e0b;
      color: #78350f;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    .divider {
      width: 1px;
      height: 24px;
      background: var(--color-border);
    }

    @media (max-width: 1400px) {
      .stages {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (max-width: 900px) {
      .stages {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 600px) {
      .stages {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
        align-items: stretch;
      }

      .action-group {
        justify-content: center;
      }
    }
  `;Z([y({type:String})],N.prototype,"currentStage",2);Z([y({type:Array})],N.prototype,"completedStages",2);Z([y({type:Boolean})],N.prototype,"canAdvance",2);Z([y({type:Boolean})],N.prototype,"canRollback",2);N=Z([P("stage-navigator")],N);var wt=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,$=(t,e,r,a)=>{for(var s=a>1?void 0:a?_t(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&wt(e,r,s),s};const B="http://192.168.1.161:8080";let f=class extends x{constructor(){super(...arguments),this.uploadedPapers=[],this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null},this.processing=!1,this.processingCurrent=0,this.analysisComplete=!1,this.feedbackHistory=[],this.currentFeedback="",this.dragover=!1,this.apiConnected=!1,this.apiChecking=!0,this.errorMessage="",this.pollInterval=null}connectedCallback(){super.connectedCallback(),this.checkApiConnection()}disconnectedCallback(){super.disconnectedCallback(),this.pollInterval&&clearInterval(this.pollInterval)}async checkApiConnection(){this.apiChecking=!0;try{(await fetch(`${B}/api/health`)).ok?this.apiConnected=!0:this.apiConnected=!1}catch{this.apiConnected=!1}this.apiChecking=!1}notifyReadyState(){const t=!this.processing&&this.analysisComplete&&this.selectedTopic.title.trim().length>0;this.dispatchEvent(new CustomEvent("config-ready-change",{detail:!!t}))}onReferenceFileInput(t){const e=t.target;!e.files||e.files.length===0||(this.uploadPapersToBackend(Array.from(e.files)),e.value="")}onDrop(t){var r;t.preventDefault(),this.dragover=!1;const e=(r=t.dataTransfer)==null?void 0:r.files;!e||e.length===0||this.uploadPapersToBackend(Array.from(e).filter(a=>a.name.endsWith(".pdf")))}onDragOver(t){t.preventDefault(),this.dragover=!0}onDragLeave(){this.dragover=!1}async uploadPapersToBackend(t){if(t.length===0)return;if(!this.apiConnected){this.errorMessage="后端服务未连接，无法上传论文";return}const e=this.uploadedPapers.length+1,r=t.map((a,s)=>({id:e+s,name:a.name,pages:0,status:"uploaded"}));this.uploadedPapers=[...this.uploadedPapers,...r],this.errorMessage="";for(let a=0;a<t.length;a++){const s=t[a],i=e+a;this.uploadedPapers=this.uploadedPapers.map(o=>o.id===i?{...o,status:"processing"}:o);try{const o=new FormData;o.append("paper",s);const l=await fetch(`${B}/api/papers/analyze`,{method:"POST",body:o});if(l.ok){const c=await l.json();this.uploadedPapers=this.uploadedPapers.map(p=>p.id===i?{...p,status:"analyzing",paperId:c.paperId}:p)}else this.uploadedPapers=this.uploadedPapers.map(c=>c.id===i?{...c,status:"error"}:c)}catch(o){console.error("Upload error:",o),this.uploadedPapers=this.uploadedPapers.map(l=>l.id===i?{...l,status:"error"}:l),this.errorMessage=`上传失败: ${o.message}`}}this.startPolling()}startPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=window.setInterval(()=>{this.checkAnalysisResults()},3e3)}async checkAnalysisResults(){const t=this.uploadedPapers.filter(r=>r.status==="analyzing"||r.status==="processing");if(t.length===0){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null);return}for(const r of t)if(r.paperId)try{const a=await fetch(`${B}/api/papers/${r.paperId}/status`);if(a.ok){const s=await a.json();if(s.pages&&(this.uploadedPapers=this.uploadedPapers.map(i=>i.paperId===r.paperId?{...i,pages:s.pages}:i)),s.status==="completed"||s.status==="done"){const i=await fetch(`${B}/api/papers/${r.paperId}/result`);if(i.ok){const o=await i.json();o.result&&(this.uploadedPapers=this.uploadedPapers.map(l=>l.paperId===r.paperId?{...l,status:"done",metadata:o.result.metadata}:l),o.result.topicCandidates&&o.result.topicCandidates.length>0&&this.mergeTopics(o.result.topicCandidates))}}}}catch(a){console.error("Polling error:",a)}this.uploadedPapers.every(r=>r.status==="done")&&this.uploadedPapers.length>0&&(this.analysisComplete=!0,this.processing=!1,this.notifyReadyState(),this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null))}mergeTopics(t){const e=new Set(this.topics.map(a=>a.id)),r=t.filter(a=>!e.has(a.id));if(r.length>0){const a=r.map((s,i)=>({...s,id:this.topics.length+i+1}));this.topics=[...this.topics,...a]}}selectTopic(t){this.selectedTopicId=t.id,this.selectedTopic={title:t.title,researchObjective:`针对 ${t.title} 的核心问题，建立理论模型并进行数值验证。`,expectedContribution:"提出一种可行的研究方案，产出具有创新性的学术成果。",selectedCandidateId:t.id},this.notifyReadyState()}async submitFeedback(){if(!this.currentFeedback.trim()||!this.selectedTopicId)return;const t=this.uploadedPapers.find(e=>e.paperId);if(!t){this.errorMessage="没有已上传的论文";return}this.feedbackHistory=[...this.feedbackHistory,{topicId:this.selectedTopicId,feedback:this.currentFeedback.trim(),timestamp:new Date}];try{(await fetch(`${B}/api/papers/${t.paperId}/feedback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({feedback:this.currentFeedback,currentTopics:this.topics})})).ok&&(this.currentFeedback="",this.errorMessage="反馈已提交，AI 将根据反馈重新生成选题",setTimeout(()=>{this.errorMessage=""},3e3))}catch(e){console.error("Feedback error:",e),this.errorMessage=`反馈提交失败: ${e.message}`}}regenerateTopics(){this.errorMessage="选题重新生成中...",setTimeout(()=>{this.errorMessage=""},2e3)}updateTopicField(t,e){this.selectedTopic={...this.selectedTopic,[t]:e},this.notifyReadyState()}confirmTopic(){if(!this.selectedTopic.title.trim()){this.errorMessage="请先选择一个选题或输入论文标题";return}this.notifyReadyState(),this.dispatchEvent(new CustomEvent("topic-confirmed",{detail:{topic:this.selectedTopic,papers:this.uploadedPapers}}))}statusLabel(t){return{uploaded:"待上传",processing:"上传中",analyzing:"AI分析中",done:"已完成",error:"失败"}[t]||t}get progressPercent(){const t=this.uploadedPapers.filter(e=>e.status==="done").length;return this.uploadedPapers.length>0?Math.round(t/this.uploadedPapers.length*100):0}render(){const t=this.uploadedPapers.length>0,e=this.topics.length>0,r=t&&this.uploadedPapers.every(a=>a.status==="done");return n`
      <section class="layout">
        <!-- Panel 1: 参考论文上传区 -->
        <article class="panel">
          <h3>
            <span class="step">1</span>参考论文上传
            <span class="api-status ${this.apiChecking?"connecting":this.apiConnected?"connected":"disconnected"}">
              ${this.apiChecking?"检测中":this.apiConnected?"已连接":"未连接"}
            </span>
          </h3>
          <p>拖拽或点击上传 PDF 论文，AI 将通过 OpenClaw 分析论文内容</p>
          
          <label
            class="dropzone ${this.dragover?"dragover":""}"
            @drop=${this.onDrop}
            @dragover=${this.onDragOver}
            @dragleave=${this.onDragLeave}
          >
            <input type="file" multiple accept=".pdf" @change=${this.onReferenceFileInput}>
            <p>📄 拖拽 PDF 到这里</p>
            <p class="subtle">支持多文件上传，可持续追加</p>
          </label>

          ${this.errorMessage?n`
            <div style="background: #fee2e2; color: #991b1b; padding: var(--space-2); border-radius: var(--radius-md); font-size: var(--text-xs);">
              ${this.errorMessage}
            </div>
          `:""}

          <div class="paper-list">
            ${this.uploadedPapers.length===0?n`<div class="empty">尚未上传参考论文</div>`:this.uploadedPapers.map(a=>n`
                  <div class="paper-item">
                    <div>
                      <div class="paper-name">${a.name}</div>
                      <div class="paper-meta">${a.pages>0?`${a.pages} 页`:"处理中..."}</div>
                      ${a.metadata?n`
                        <div class="metadata-preview">
                          <div class="meta-title">${a.metadata.title}</div>
                          <div class="meta-authors">${a.metadata.authors}</div>
                          <div class="meta-keywords">
                            ${a.metadata.keywords.map(s=>n`<span class="keyword-tag">${s}</span>`)}
                          </div>
                        </div>
                      `:""}
                    </div>
                    <div class="paper-status">
                      <span class="status ${a.status}">${this.statusLabel(a.status)}</span>
                    </div>
                  </div>
                `)}
          </div>

          <button 
            ?disabled=${!this.apiConnected} 
            @click=${()=>{var a,s;return(s=(a=this.shadowRoot)==null?void 0:a.querySelector("label.dropzone input"))==null?void 0:s.click()}}
          >
            + 继续添加论文
          </button>
        </article>

        <!-- Panel 2: 自动处理与选题推荐 -->
        <article class="panel">
          <h3><span class="step">2</span>OpenClaw AI 分析与选题推荐</h3>
          
          ${this.processing?n`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>正在处理论文，请稍候...</div>
              <div>${this.processingCurrent} / ${this.uploadedPapers.length}</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
            </div>
          `:t&&!r?n`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>AI 正在分析论文...</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
              <div style="font-size: var(--text-xs); margin-top: var(--space-2);">
                ${this.uploadedPapers.filter(a=>a.status==="done").length} / ${this.uploadedPapers.length} 篇已完成
              </div>
            </div>
            
            ${e?n`
              <p>已发现 ${this.topics.length} 个候选选题</p>
              <div class="topics-section">
                ${this.topics.map(a=>n`
                  <div 
                    class="candidate ${a.id===this.selectedTopicId?"active":""}"
                    @click=${()=>this.selectTopic(a)}
                  >
                    <div class="candidate-header">
                      <span class="candidate-title">${a.title}</span>
                      <span class="candidate-score">${a.score}%</span>
                    </div>
                    <div class="candidate-summary">${a.summary}</div>
                  </div>
                `)}
              </div>
            `:""}
          `:e?n`
            <p>✅ 分析完成，请从候选选题中选择。</p>
            
            <div class="topics-section">
              <strong>推荐选题（支持多轮反馈）</strong>
              ${this.topics.map(a=>n`
                <div 
                  class="candidate ${a.id===this.selectedTopicId?"active":""}"
                  @click=${()=>this.selectTopic(a)}
                >
                  <div class="candidate-header">
                    <span class="candidate-title">${a.title}</span>
                    <span class="candidate-score">${a.score}%</span>
                  </div>
                  <div class="candidate-summary">${a.summary}</div>
                  <div class="candidate-detail">
                    <div><strong>理论依据：</strong>${a.rationale}</div>
                    <div><strong>可行性：</strong>${a.feasibility}</div>
                  </div>
                </div>
              `)}
              
              <div class="topic-actions">
                <button class="primary" ?disabled=${!this.selectedTopicId} @click=${()=>{}}>
                  ✓ 确认选题
                </button>
                <button class="secondary" @click=${this.regenerateTopics}>
                  🔄 重新生成
                </button>
              </div>
            </div>
            
            ${this.selectedTopicId?n`
              <div class="feedback-section">
                <h4>💬 选题反馈（支持多轮）</h4>
                
                ${this.feedbackHistory.length>0?n`
                  <div class="feedback-history">
                    ${this.feedbackHistory.map((a,s)=>n`
                      <div class="feedback-item">
                        <span class="round">第 ${s+1} 轮反馈：</span>
                        <span class="text">${a.feedback}</span>
                      </div>
                    `)}
                  </div>
                `:""}
                
                <div class="feedback-input">
                  <textarea 
                    placeholder="输入对选题的修改意见或要求，OpenClaw AI 将根据反馈重新生成..."
                    .value=${this.currentFeedback}
                    @input=${a=>this.currentFeedback=a.target.value}
                  ></textarea>
                  <button @click=${this.submitFeedback} ?disabled=${!this.currentFeedback.trim()}>
                    提交反馈并重新生成
                  </button>
                </div>
              </div>
            `:""}
          `:n`
            <div class="empty-waiting">
              <div class="icon">📚</div>
              <p>${this.apiConnected?"请上传参考论文":"等待后端服务连接..."}</p>
              <p class="subtle">OpenClaw AI 将自动分析论文并推荐研究选题</p>
            </div>
          `}
        </article>

        <!-- Panel 3: 选题详情 -->
        <article class="panel">
          <h3><span class="step">3</span>选题详情与确认</h3>
          
          ${this.selectedTopicId===null?n`
            <div class="empty">
              请先在中间区域选择一个候选选题
            </div>
          `:n`
            <div class="topic-detail">
              <div class="field">
                <label>论文标题</label>
                <input
                  type="text"
                  placeholder="输入或修改论文标题"
                  .value=${this.selectedTopic.title}
                  @input=${a=>this.updateTopicField("title",a.target.value)}
                >
              </div>

              <div class="field">
                <label>研究目标</label>
                <textarea
                  placeholder="描述研究的核心目标..."
                  .value=${this.selectedTopic.researchObjective}
                  @input=${a=>this.updateTopicField("researchObjective",a.target.value)}
                ></textarea>
              </div>

              <div class="field">
                <label>预期贡献</label>
                <textarea
                  placeholder="说明研究的创新点和贡献..."
                  .value=${this.selectedTopic.expectedContribution}
                  @input=${a=>this.updateTopicField("expectedContribution",a.target.value)}
                ></textarea>
              </div>
            </div>

            <div class="confirm-section">
              <h4>✅ 确认选题进入下一阶段</h4>
              <p style="font-size: var(--text-xs); color: #065f46; margin-bottom: var(--space-3);">
                确认后将进入 Literature 阶段，开始文献检索与证据沉淀。
              </p>
              <button 
                class="primary" 
                style="width: 100%;"
                ?disabled=${!this.selectedTopic.title.trim()}
                @click=${this.confirmTopic}
              >
                确认选题，进入 Literature 阶段 →
              </button>
            </div>
          `}
        </article>
      </section>
    `}};f.styles=k`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
      display: grid;
      gap: var(--space-4);
      min-height: 520px;
      max-height: 80vh;
      overflow-y: auto;
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .panel h3 .step {
      background: var(--color-accent);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-xs);
    }

    .panel p {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .dropzone {
      border: 1.5px dashed var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-bg);
      padding: var(--space-6) var(--space-4);
      text-align: center;
      transition: all var(--transition-base);
      cursor: pointer;
    }

    .dropzone:hover {
      border-color: var(--color-accent);
      background: #f0fdf4;
      transform: translateY(-1px);
    }

    .dropzone.dragover {
      border-color: var(--color-accent);
      background: #d1fae5;
      transform: scale(1.02);
    }

    .dropzone input {
      display: none;
    }

    .subtle {
      color: var(--color-text-tertiary);
      font-size: var(--text-xs);
    }

    .paper-list {
      display: grid;
      gap: var(--space-2);
      max-height: 280px;
      overflow-y: auto;
      border-top: 1px solid var(--color-border-light);
      padding-top: var(--space-3);
    }

    .paper-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-2);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .paper-name {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .paper-meta {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-top: 2px;
    }

    .paper-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .status {
      font-size: 10px;
      border-radius: 999px;
      font-weight: 700;
      padding: 3px 8px;
      text-align: center;
    }

    .status.uploaded {
      background: #f4f4f5;
      color: #52525b;
    }

    .status.processing {
      background: #dbeafe;
      color: #1e40af;
    }

    .status.analyzing {
      background: #fef3c7;
      color: #92400e;
    }

    .status.done {
      background: #d1fae5;
      color: #065f46;
    }

    .status.error {
      background: #fee2e2;
      color: #991b1b;
    }

    .metadata-preview {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      font-size: var(--text-xs);
      margin-top: var(--space-2);
    }

    .metadata-preview .meta-title {
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    .metadata-preview .meta-authors {
      color: var(--color-text-secondary);
    }

    .metadata-preview .meta-keywords {
      margin-top: 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .keyword-tag {
      background: #e0e7ff;
      color: #4338ca;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
    }

    button {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      font-weight: 600;
      padding: var(--space-2) var(--space-3);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: #fff;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
      color: #fff;
    }

    button.secondary {
      background: #fef3c7;
      border-color: #fde68a;
      color: #92400e;
    }

    button.secondary:hover:not(:disabled) {
      background: #fde68a;
      border-color: #f59e0b;
      color: #78350f;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .processing {
      border-radius: var(--radius-md);
      border: 1px solid #fde68a;
      background: #fffbeb;
      color: #92400e;
      padding: var(--space-4);
      font-size: var(--text-sm);
      display: grid;
      gap: var(--space-2);
      text-align: center;
    }

    .processing-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #fde68a;
      border-top-color: #f59e0b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .progress-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: #fef3c7;
      overflow: hidden;
      margin-top: var(--space-2);
    }

    .progress-fill {
      height: 100%;
      background: #f59e0b;
      transition: width var(--transition-base);
    }

    .topics-section {
      display: grid;
      gap: var(--space-3);
    }

    .candidate {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: #fff;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .candidate:hover {
      border-color: var(--color-accent);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    .candidate.active {
      border-color: var(--color-accent);
      background: #f0fdf4;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .candidate-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
    }

    .candidate-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      flex: 1;
    }

    .candidate-score {
      font-size: 11px;
      background: #d1fae5;
      color: #047857;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 700;
      white-space: nowrap;
    }

    .candidate-summary {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin-bottom: var(--space-2);
    }

    .candidate-detail {
      font-size: 10px;
      color: var(--color-text-tertiary);
      background: var(--color-bg);
      padding: var(--space-2);
      border-radius: var(--radius-sm);
      margin-top: var(--space-2);
    }

    .candidate-detail strong {
      color: var(--color-text-secondary);
    }

    .topic-actions {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
      margin-top: var(--space-3);
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
    }

    .feedback-section {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      margin-top: var(--space-3);
    }

    .feedback-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: #92400e;
      margin-bottom: var(--space-2);
    }

    .feedback-history {
      display: grid;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }

    .feedback-item {
      background: #fff;
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-xs);
    }

    .feedback-item .round {
      font-weight: 600;
      color: #92400e;
    }

    .feedback-item .text {
      color: var(--color-text-primary);
      margin-top: 2px;
    }

    .feedback-input {
      display: grid;
      gap: var(--space-2);
    }

    .feedback-input textarea {
      width: 100%;
      border: 1px solid #fde68a;
      border-radius: var(--radius-md);
      padding: var(--space-2);
      font-size: var(--text-sm);
      font-family: var(--font-sans);
      resize: vertical;
      min-height: 60px;
    }

    .feedback-input textarea:focus {
      outline: none;
      border-color: #f59e0b;
    }

    .topic-detail {
      display: grid;
      gap: var(--space-3);
    }

    .field {
      display: grid;
      gap: var(--space-1);
    }

    .field label {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .field input,
    .field textarea {
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: #fff;
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-3);
    }

    .field input:focus,
    .field textarea:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .field textarea {
      min-height: 80px;
      resize: vertical;
    }

    .confirm-section {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      margin-top: var(--space-3);
    }

    .confirm-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: #065f46;
      margin-bottom: var(--space-2);
    }

    .empty {
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
    }

    .empty-waiting {
      background: var(--color-bg);
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-6);
      text-align: center;
    }

    .empty-waiting .icon {
      font-size: 32px;
      margin-bottom: var(--space-2);
    }

    .api-status {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }

    .api-status.connected {
      background: #d1fae5;
      color: #065f46;
    }

    .api-status.disconnected {
      background: #fee2e2;
      color: #991b1b;
    }

    .api-status.connecting {
      background: #fef3c7;
      color: #92400e;
    }

    @media (max-width: 1280px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .panel {
        min-height: auto;
      }
    }
  `;$([d()],f.prototype,"uploadedPapers",2);$([d()],f.prototype,"topics",2);$([d()],f.prototype,"selectedTopicId",2);$([d()],f.prototype,"selectedTopic",2);$([d()],f.prototype,"processing",2);$([d()],f.prototype,"processingCurrent",2);$([d()],f.prototype,"analysisComplete",2);$([d()],f.prototype,"feedbackHistory",2);$([d()],f.prototype,"currentFeedback",2);$([d()],f.prototype,"dragover",2);$([d()],f.prototype,"apiConnected",2);$([d()],f.prototype,"apiChecking",2);$([d()],f.prototype,"errorMessage",2);f=$([P("config-stage")],f);var At=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,b=(t,e,r,a)=>{for(var s=a>1?void 0:a?kt(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(a?o(e,r,s):o(s))||s);return a&&s&&At(e,r,s),s};const M=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"];let v=class extends x{constructor(){super(...arguments),this.papers=[],this.folders=[],this.tags=[],this.stats={total_papers:0,total_folders:0,total_tags:0,papers_this_week:0},this.selectedFolderId=null,this.searchQuery="",this.loading=!0,this.showUploader=!1,this.workflowActive=!1,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}async connectedCallback(){super.connectedCallback(),await this.loadData()}async loadData(){this.loading=!0;try{const[t,e,r]=await Promise.all([I.listFolders(),I.listTags(),I.getStats()]);this.folders=t,this.tags=e,this.stats=r,await this.loadPapers()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadPapers(){try{const t=await I.listPapers({folder_id:this.selectedFolderId??void 0,search:this.searchQuery||void 0});this.papers=t.papers||[]}catch(t){console.error("Failed to load papers:",t)}}onSearch(t){this.searchQuery=t.detail,this.loadPapers()}onFolderSelect(t){this.selectedFolderId=t.detail,this.loadPapers()}async onUpload(){this.showUploader=!1,await this.loadData()}async onDeletePaper(){await this.loadPapers(),this.stats=await I.getStats()}onCreatePaper(){this.workflowActive=!0,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}onConfigReadyChange(t){this.configReady=t.detail}advanceStage(){if(!this.configReady&&this.currentStage==="INTAKE"){alert("请先完成 Intake 阶段的选题确认");return}const t=M.indexOf(this.currentStage);t<M.length-1&&(this.completedStages.includes(this.currentStage)||(this.completedStages=[...this.completedStages,this.currentStage]),this.currentStage=M[t+1],this.configReady=!1,this.previewMode=!1,this.previewStage=null)}rollbackStage(){const t=M.indexOf(this.currentStage);t>0&&(this.currentStage=M[t-1],this.completedStages=this.completedStages.filter(e=>M.indexOf(e)<t-1),this.configReady=!0,this.previewMode=!1,this.previewStage=null)}onPreviewStage(){this.previewMode=!0,this.previewStage=this.currentStage}closePreview(){this.previewMode=!1,this.previewStage=null}selectStage(t){const e=t.detail;e===this.currentStage?(this.previewMode=!1,this.previewStage=null):(this.previewMode=!0,this.previewStage=e)}canAdvance(){return this.currentStage==="INTAKE"?this.configReady:!0}canRollback(){return this.currentStage!=="INTAKE"}getStageDisplayName(t){return{INTAKE:"Intake - 校验输入",LITERATURE:"Literature - 文献检索",OUTLINE:"Outline - 确定结构",DATA_REQUIREMENTS:"Data Req. - 算例需求",DRAFTING:"Drafting - 章节草稿",POLISHING:"Polishing - PoF润色",REVIEW:"Review - 质量门禁",FINALIZE:"Finalize - 投稿封装"}[t]||t}renderStageContent(t){return t==="INTAKE"?n`
        <config-stage
          @config-ready-change=${this.onConfigReadyChange}
        ></config-stage>
      `:n`
      <div class="empty-state">
        <h2>${this.getStageDisplayName(t)}</h2>
        <p>该阶段开发中...</p>
        <p style="margin-top: var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary);">
          由 ${this.getStageAgent(t)} 负责
        </p>
      </div>
    `}getStageAgent(t){return{INTAKE:"Orchestrator",LITERATURE:"Agent A (学术架构师)",OUTLINE:"Agent A (学术架构师)",DATA_REQUIREMENTS:"Agent B (物理-数据映射师)",DRAFTING:"Agent C (PoF执笔人)",POLISHING:"Agent C (PoF润色人)",REVIEW:"Orchestrator",FINALIZE:"Orchestrator"}[t]||"TBD"}render(){return n`
      <div class="layout">
        <header>
          <paper-header
            @search=${this.onSearch}
            @upload=${()=>this.showUploader=!0}
          ></paper-header>
        </header>
        
        ${this.workflowActive?n`
          <div class="stage-bar">
            <stage-navigator
              .currentStage=${this.currentStage}
              .completedStages=${this.completedStages}
              .canAdvance=${this.canAdvance()}
              .canRollback=${this.canRollback()}
              @advance-stage=${this.advanceStage}
              @rollback-stage=${this.rollbackStage}
              @preview-stage=${this.onPreviewStage}
              @select-stage=${this.selectStage}
            ></stage-navigator>
          </div>
          
          <aside>
            <paper-sidebar
              .folders=${this.folders}
              .tags=${this.tags}
              .selectedFolderId=${this.selectedFolderId}
              @folder-select=${this.onFolderSelect}
              @create-paper=${this.onCreatePaper}
            ></paper-sidebar>
          </aside>
          
          <main class="workflow-active">
            ${this.previewMode&&this.previewStage?n`
              <div class="preview-banner">
                <span>👁 预览模式 - 正在查看：<strong>${this.getStageDisplayName(this.previewStage)}</strong></span>
                <button @click=${this.closePreview}>退出预览</button>
              </div>
              ${this.renderStageContent(this.previewStage)}
            `:n`
              ${this.renderStageContent(this.currentStage)}
            `}
          </main>
        `:n`
          <div class="stage-bar" style="background: var(--color-surface);">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: var(--text-sm); color: var(--color-text-tertiary);">
                当前没有进行中的论文写作任务
              </span>
              <button 
                @click=${this.onCreatePaper}
                style="padding: var(--space-2) var(--space-4); background: var(--color-accent); border: none; border-radius: var(--radius-md); color: white; font-size: var(--text-sm); font-weight: 600; cursor: pointer;"
              >
                创建新论文
              </button>
            </div>
          </div>
          
          <aside>
            <paper-sidebar
              .folders=${this.folders}
              .tags=${this.tags}
              .selectedFolderId=${this.selectedFolderId}
              @folder-select=${this.onFolderSelect}
              @create-paper=${this.onCreatePaper}
            ></paper-sidebar>
          </aside>
          
          <main>
            ${this.loading?n`<div class="empty-state"><p>Loading...</p></div>`:this.papers.length===0?n`
                    <div class="empty-state">
                      <h2>No papers yet</h2>
                      <p>Upload your first paper to get started</p>
                    </div>
                  `:n`<paper-grid .papers=${this.papers} @delete=${this.onDeletePaper}></paper-grid>`}
          </main>
        `}
      </div>
      
      ${this.showUploader?n`
        <paper-uploader
          .folders=${this.folders}
          @close=${()=>this.showUploader=!1}
          @upload=${this.onUpload}
        ></paper-uploader>
      `:""}
    `}};v.styles=k`
    :host {
      display: block;
      min-height: 100dvh;
      background: var(--color-bg);
    }
    
    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      grid-template-rows: 64px auto 1fr;
      min-height: 100dvh;
    }
    
    @media (max-width: 768px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
    
    header {
      grid-column: 1 / -1;
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(250, 250, 250, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
    }
    
    .stage-bar {
      grid-column: 1 / -1;
      padding: var(--space-4) var(--space-6);
      background: var(--color-bg);
      border-bottom: 1px solid var(--color-border-light);
    }
    
    aside {
      grid-row: 3;
      border-right: 1px solid var(--color-border);
      overflow-y: auto;
      background: var(--color-surface);
    }
    
    main {
      padding: var(--space-6);
      overflow-y: auto;
    }
    
    .empty-state {
      text-align: center;
      padding: var(--space-12);
      color: var(--color-text-tertiary);
    }
    
    .empty-state h2 {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }
    
    .workflow-active {
      padding: var(--space-6);
    }

    .preview-banner {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: var(--radius-lg);
      padding: var(--space-3) var(--space-4);
      margin-bottom: var(--space-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--text-sm);
      color: #92400e;
    }

    .preview-banner strong {
      color: #78350f;
    }

    .preview-banner button {
      background: #f59e0b;
      border: none;
      color: white;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      font-weight: 600;
      cursor: pointer;
    }

    .preview-banner button:hover {
      background: #d97706;
    }
  `;b([d()],v.prototype,"papers",2);b([d()],v.prototype,"folders",2);b([d()],v.prototype,"tags",2);b([d()],v.prototype,"stats",2);b([d()],v.prototype,"selectedFolderId",2);b([d()],v.prototype,"searchQuery",2);b([d()],v.prototype,"loading",2);b([d()],v.prototype,"showUploader",2);b([d()],v.prototype,"workflowActive",2);b([d()],v.prototype,"currentStage",2);b([d()],v.prototype,"completedStages",2);b([d()],v.prototype,"configReady",2);b([d()],v.prototype,"previewMode",2);b([d()],v.prototype,"previewStage",2);v=b([P("paper-app")],v);
