(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=globalThis,ue=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),me=new WeakMap;let Pe=class{constructor(e,r,s){if(this._$cssResult$=!0,s!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(ue&&e===void 0){const s=r!==void 0&&r.length===1;s&&(e=me.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&me.set(r,e))}return e}toString(){return this.cssText}};const Me=t=>new Pe(typeof t=="string"?t:t+"",void 0,ge),A=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((s,a,o)=>s+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[o+1],t[0]);return new Pe(r,t,ge)},Fe=(t,e)=>{if(ue)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const s=document.createElement("style"),a=ee.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=r.cssText,t.appendChild(s)}},ye=ue?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const s of e.cssRules)r+=s.cssText;return Me(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:je,defineProperty:Le,getOwnPropertyDescriptor:He,getOwnPropertyNames:Ve,getOwnPropertySymbols:Be,getPrototypeOf:Ge}=Object,I=globalThis,xe=I.trustedTypes,Ke=xe?xe.emptyScript:"",ce=I.reactiveElementPolyfillSupport,G=(t,e)=>t,te={toAttribute(t,e){switch(e){case Boolean:t=t?Ke:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},ve=(t,e)=>!je(t,e),$e={attribute:!0,type:String,converter:te,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);let j=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=$e){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,r);a!==void 0&&Le(this.prototype,e,a)}}static getPropertyDescriptor(e,r,s){const{get:a,set:o}=He(this.prototype,e)??{get(){return this[r]},set(i){this[r]=i}};return{get:a,set(i){const c=a==null?void 0:a.call(this);o==null||o.call(this,i),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$e}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const e=Ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const r=this.properties,s=[...Ve(r),...Be(r)];for(const a of s)this.createProperty(a,r[a])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[s,a]of r)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[r,s]of this.elementProperties){const a=this._$Eu(r,s);a!==void 0&&this._$Eh.set(a,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const a of s)r.unshift(ye(a))}else e!==void 0&&r.push(ye(e));return r}static _$Eu(e,r){const s=r.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const s of r.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var s;return(s=r.hostConnected)==null?void 0:s.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var s;return(s=r.hostDisconnected)==null?void 0:s.call(r)})}attributeChangedCallback(e,r,s){this._$AK(e,s)}_$ET(e,r){var o;const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){const i=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:te).toAttribute(r,s.type);this._$Em=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(e,r){var o,i;const s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const c=s.getPropertyOptions(a),d=typeof c.converter=="function"?{fromAttribute:c.converter}:((o=c.converter)==null?void 0:o.fromAttribute)!==void 0?c.converter:te;this._$Em=a;const l=d.fromAttribute(r,c.type);this[a]=l??((i=this._$Ej)==null?void 0:i.get(a))??l,this._$Em=null}}requestUpdate(e,r,s,a=!1,o){var i;if(e!==void 0){const c=this.constructor;if(a===!1&&(o=this[e]),s??(s=c.getPropertyOptions(e)),!((s.hasChanged??ve)(o,r)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(c._$Eu(e,s))))return;this.C(e,r,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:s,reflect:a,wrapped:o},i){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??r??this[e]),o!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(r=void 0),this._$AL.set(e,r)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[o,i]of a){const{wrapped:c}=i,d=this[o];c!==!0||this._$AL.has(o)||d===void 0||this.C(o,void 0,i,d)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(s=this._$EO)==null||s.forEach(a=>{var o;return(o=a.hostUpdate)==null?void 0:o.call(a)}),this.update(r)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(s=>{var a;return(a=s.hostUpdated)==null?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[G("elementProperties")]=new Map,j[G("finalized")]=new Map,ce==null||ce({ReactiveElement:j}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=globalThis,we=t=>t,re=K.trustedTypes,ke=re?re.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ie="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Oe="?"+P,We=`<${Oe}>`,N=document,W=()=>N.createComment(""),q=t=>t===null||typeof t!="object"&&typeof t!="function",fe=Array.isArray,qe=t=>fe(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",le=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,Se=/>/g,O=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Ee=/"/g,ze=/^(?:script|style|textarea|title)$/i,Qe=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),n=Qe(1),U=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Ce=new WeakMap,D=N.createTreeWalker(N,129);function De(t,e){if(!fe(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ke!==void 0?ke.createHTML(e):e}const Ye=(t,e)=>{const r=t.length-1,s=[];let a,o=e===2?"<svg>":e===3?"<math>":"",i=B;for(let c=0;c<r;c++){const d=t[c];let l,u,h=-1,S=0;for(;S<d.length&&(i.lastIndex=S,u=i.exec(d),u!==null);)S=i.lastIndex,i===B?u[1]==="!--"?i=_e:u[1]!==void 0?i=Se:u[2]!==void 0?(ze.test(u[2])&&(a=RegExp("</"+u[2],"g")),i=O):u[3]!==void 0&&(i=O):i===O?u[0]===">"?(i=a??B,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,l=u[1],i=u[3]===void 0?O:u[3]==='"'?Ee:Ae):i===Ee||i===Ae?i=O:i===_e||i===Se?i=B:(i=O,a=void 0);const C=i===O&&t[c+1].startsWith("/>")?" ":"";o+=i===B?d+We:h>=0?(s.push(l),d.slice(0,h)+Ie+d.slice(h)+P+C):d+P+(h===-2?c:C)}return[De(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class Q{constructor({strings:e,_$litType$:r},s){let a;this.parts=[];let o=0,i=0;const c=e.length-1,d=this.parts,[l,u]=Ye(e,r);if(this.el=Q.createElement(l,s),D.currentNode=this.el.content,r===2||r===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=D.nextNode())!==null&&d.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(const h of a.getAttributeNames())if(h.endsWith(Ie)){const S=u[i++],C=a.getAttribute(h).split(P),X=/([.?@])?(.*)/.exec(S);d.push({type:1,index:o,name:X[2],strings:C,ctor:X[1]==="."?Je:X[1]==="?"?Xe:X[1]==="@"?et:oe}),a.removeAttribute(h)}else h.startsWith(P)&&(d.push({type:6,index:o}),a.removeAttribute(h));if(ze.test(a.tagName)){const h=a.textContent.split(P),S=h.length-1;if(S>0){a.textContent=re?re.emptyScript:"";for(let C=0;C<S;C++)a.append(h[C],W()),D.nextNode(),d.push({type:2,index:++o});a.append(h[S],W())}}}else if(a.nodeType===8)if(a.data===Oe)d.push({type:2,index:o});else{let h=-1;for(;(h=a.data.indexOf(P,h+1))!==-1;)d.push({type:7,index:o}),h+=P.length-1}o++}}static createElement(e,r){const s=N.createElement("template");return s.innerHTML=e,s}}function L(t,e,r=t,s){var i,c;if(e===U)return e;let a=s!==void 0?(i=r._$Co)==null?void 0:i[s]:r._$Cl;const o=q(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==o&&((c=a==null?void 0:a._$AO)==null||c.call(a,!1),o===void 0?a=void 0:(a=new o(t),a._$AT(t,r,s)),s!==void 0?(r._$Co??(r._$Co=[]))[s]=a:r._$Cl=a),a!==void 0&&(e=L(t,a._$AS(t,e.values),a,s)),e}class Ze{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:s}=this._$AD,a=((e==null?void 0:e.creationScope)??N).importNode(r,!0);D.currentNode=a;let o=D.nextNode(),i=0,c=0,d=s[0];for(;d!==void 0;){if(i===d.index){let l;d.type===2?l=new Z(o,o.nextSibling,this,e):d.type===1?l=new d.ctor(o,d.name,d.strings,this,e):d.type===6&&(l=new tt(o,this,e)),this._$AV.push(l),d=s[++c]}i!==(d==null?void 0:d.index)&&(o=D.nextNode(),i++)}return D.currentNode=N,a}p(e){let r=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}}class Z{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,s,a){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=L(this,e,r),q(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&q(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){var o;const{values:r,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Q.createElement(De(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===a)this._$AH.p(r);else{const i=new Ze(a,this),c=i.u(this.options);i.p(r),this.T(c),this._$AH=i}}_$AC(e){let r=Ce.get(e.strings);return r===void 0&&Ce.set(e.strings,r=new Q(e)),r}k(e){fe(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let s,a=0;for(const o of e)a===r.length?r.push(s=new Z(this.O(W()),this.O(W()),this,this.options)):s=r[a],s._$AI(o),a++;a<r.length&&(this._$AR(s&&s._$AB.nextSibling,a),r.length=a)}_$AR(e=this._$AA.nextSibling,r){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,r);e!==this._$AB;){const a=we(e).nextSibling;we(e).remove(),e=a}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,a,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=r,this._$AM=a,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(e,r=this,s,a){const o=this.strings;let i=!1;if(o===void 0)e=L(this,e,r,0),i=!q(e)||e!==this._$AH&&e!==U,i&&(this._$AH=e);else{const c=e;let d,l;for(e=o[0],d=0;d<o.length-1;d++)l=L(this,c[s+d],r,d),l===U&&(l=this._$AH[d]),i||(i=!q(l)||l!==this._$AH[d]),l===g?e=g:e!==g&&(e+=(l??"")+o[d+1]),this._$AH[d]=l}i&&!a&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Je extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class Xe extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class et extends oe{constructor(e,r,s,a,o){super(e,r,s,a,o),this.type=5}_$AI(e,r=this){if((e=L(this,e,r,0)??g)===U)return;const s=this._$AH,a=e===g&&s!==g||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==g&&(s===g||a);a&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class tt{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}}const de=K.litHtmlPolyfillSupport;de==null||de(Q,Z),(K.litHtmlVersions??(K.litHtmlVersions=[])).push("3.3.2");const rt=(t,e,r)=>{const s=(r==null?void 0:r.renderBefore)??e;let a=s._$litPart$;if(a===void 0){const o=(r==null?void 0:r.renderBefore)??null;s._$litPart$=a=new Z(e.insertBefore(W(),o),o,void 0,r??{})}return a._$AI(t),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=globalThis;let $=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=rt(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return U}};var Te;$._$litElement$=!0,$.finalized=!0,(Te=R.litElementHydrateSupport)==null||Te.call(R,{LitElement:$});const pe=R.litElementPolyfillSupport;pe==null||pe({LitElement:$});(R.litElementVersions??(R.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at={attribute:!0,type:String,converter:te,reflect:!1,hasChanged:ve},st=(t=at,e,r)=>{const{kind:s,metadata:a}=r;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(r.name,t),s==="accessor"){const{name:i}=r;return{set(c){const d=e.get.call(this);e.set.call(this,c),this.requestUpdate(i,d,t,!0,c)},init(c){return c!==void 0&&this.C(i,void 0,t,c),c}}}if(s==="setter"){const{name:i}=r;return function(c){const d=this[i];e.call(this,c),this.requestUpdate(i,d,t,!0,c)}}throw Error("Unsupported decorator location: "+s)};function y(t){return(e,r)=>typeof r=="object"?st(t,e,r):((s,a,o)=>{const i=a.hasOwnProperty(o);return a.constructor.createProperty(o,s),i?Object.getOwnPropertyDescriptor(a,o):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function p(t){return y({...t,state:!0,attribute:!1})}const ot="/api";async function w(t,e,r){const s={method:t,headers:{}};r instanceof FormData?s.body=r:r&&(s.headers={"Content-Type":"application/json"},s.body=JSON.stringify(r));const a=await fetch(`${ot}${e}`,s);if(!a.ok){const o=await a.json().catch(()=>({error:"Unknown error"}));throw new Error(o.error||`HTTP ${a.status}`)}return a.json()}const z={uploadPaper:t=>w("POST","/papers",t),listPapers:t=>{const e=new URLSearchParams;t!=null&&t.page&&e.set("page",String(t.page)),t!=null&&t.limit&&e.set("limit",String(t.limit)),t!=null&&t.search&&e.set("search",t.search),t!=null&&t.folder_id&&e.set("folder_id",String(t.folder_id));const r=e.toString();return w("GET",`/papers${r?`?${r}`:""}`)},getPaper:t=>w("GET",`/papers/${t}`),updatePaper:(t,e)=>w("PUT",`/papers/${t}`,e),deletePaper:t=>w("DELETE",`/papers/${t}`),listFolders:()=>w("GET","/folders"),createFolder:(t,e)=>w("POST","/folders",{name:t,parent_id:e}),deleteFolder:t=>w("DELETE",`/folders/${t}`),listTags:()=>w("GET","/tags"),createTag:(t,e)=>w("POST","/tags",{name:t,color:e||"#10b981"}),deleteTag:t=>w("DELETE",`/tags/${t}`),getStats:()=>w("GET","/stats")};var it=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,Re=(t,e,r,s)=>{for(var a=s>1?void 0:s?nt(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&it(e,r,a),a};let ae=class extends ${constructor(){super(...arguments),this.searchValue=""}onSearch(t){const e=t.target;this.searchValue=e.value,this.dispatchEvent(new CustomEvent("search",{detail:this.searchValue}))}render(){return n`
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
    `}};ae.styles=A`
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
  `;Re([p()],ae.prototype,"searchValue",2);ae=Re([E("paper-header")],ae);var ct=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,ie=(t,e,r,s)=>{for(var a=s>1?void 0:s?lt(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&ct(e,r,a),a};let H=class extends ${constructor(){super(...arguments),this.folders=[],this.tags=[],this.selectedFolderId=null}selectFolder(t){this.dispatchEvent(new CustomEvent("folder-select",{detail:t}))}createPaper(){this.dispatchEvent(new CustomEvent("create-paper"))}render(){return n`
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
    `}};H.styles=A`
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
  `;ie([y({type:Array})],H.prototype,"folders",2);ie([y({type:Array})],H.prototype,"tags",2);ie([y({type:Number})],H.prototype,"selectedFolderId",2);H=ie([E("paper-sidebar")],H);var dt=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,be=(t,e,r,s)=>{for(var a=s>1?void 0:s?pt(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&dt(e,r,a),a};let Y=class extends ${constructor(){super(...arguments),this.showConfirm=!1}async download(){const t=document.createElement("a");t.href=`/uploads/${this.paper.file_path.replace("uploads/","")}`,t.download=this.paper.file_name,t.click()}async delete(){if(!this.showConfirm){this.showConfirm=!0,setTimeout(()=>this.showConfirm=!1,3e3);return}try{await z.deletePaper(this.paper.id),this.dispatchEvent(new CustomEvent("delete"))}catch(t){console.error("Delete failed:",t)}}render(){const{title:t,authors:e,journal:r,year:s,abstract:a,file_name:o,tags:i}=this.paper;return n`
      <div class="card">
        <div class="header">
          <div class="title">${t||"Untitled"}</div>
          ${s?n`<span class="year">${s}</span>`:""}
        </div>
        
        ${e?n`<div class="authors">${e}</div>`:""}
        ${r?n`<div class="journal">${r}</div>`:""}
        
        ${a?n`<div class="abstract">${a}</div>`:""}
        
        <div class="footer">
          <div class="tags">
            ${i==null?void 0:i.slice(0,3).map(c=>n`
              <span class="tag" style="background: ${c.color}20; color: ${c.color};">
                ${c.name}
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
    `}};Y.styles=A`
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
  `;be([y({type:Object})],Y.prototype,"paper",2);be([p()],Y.prototype,"showConfirm",2);Y=be([E("paper-card")],Y);var ht=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,Ne=(t,e,r,s)=>{for(var a=s>1?void 0:s?ut(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&ht(e,r,a),a};let se=class extends ${constructor(){super(...arguments),this.papers=[]}render(){return n`
      <div class="grid">
        ${this.papers.map(t=>n`
          <paper-card .paper=${t} @delete=${()=>this.dispatchEvent(new CustomEvent("delete"))}></paper-card>
        `)}
      </div>
    `}};se.styles=A`
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
  `;Ne([y({type:Array})],se.prototype,"papers",2);se=Ne([E("paper-grid")],se);var gt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,k=(t,e,r,s)=>{for(var a=s>1?void 0:s?vt(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&gt(e,r,a),a};let m=class extends ${constructor(){super(...arguments),this.folders=[],this.file=null,this.paperTitle="",this.authors="",this.abstract="",this.journal="",this.year="",this.doi="",this.folderId="",this.loading=!1,this.error=""}close(){this.dispatchEvent(new CustomEvent("close"))}onFileChange(t){var r;const e=t.target;(r=e.files)!=null&&r[0]&&(this.file=e.files[0],this.paperTitle||(this.paperTitle=this.file.name.replace(/\.pdf$/i,"")))}async submit(t){if(t.preventDefault(),!this.file){this.error="Please select a PDF file";return}this.loading=!0,this.error="";try{const e=new FormData;e.append("file",this.file),e.append("title",this.paperTitle),e.append("authors",this.authors),e.append("abstract",this.abstract),e.append("journal",this.journal),this.year&&e.append("year",this.year),e.append("doi",this.doi),this.folderId&&e.append("folder_id",this.folderId),await z.uploadPaper(e),this.dispatchEvent(new CustomEvent("upload"))}catch(e){this.error=e.message}finally{this.loading=!1}}render(){return n`
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
    `}};m.styles=A`
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
  `;k([y({type:Array})],m.prototype,"folders",2);k([p()],m.prototype,"file",2);k([p()],m.prototype,"paperTitle",2);k([p()],m.prototype,"authors",2);k([p()],m.prototype,"abstract",2);k([p()],m.prototype,"journal",2);k([p()],m.prototype,"year",2);k([p()],m.prototype,"doi",2);k([p()],m.prototype,"folderId",2);k([p()],m.prototype,"loading",2);k([p()],m.prototype,"error",2);m=k([E("paper-uploader")],m);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft={CHILD:2},bt=t=>(...e)=>({_$litDirective$:t,values:e});class mt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this._$Ct=e,this._$AM=r,this._$Ci=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class he extends mt{constructor(e){if(super(e),this.it=g,e.type!==ft.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===g||e==null)return this._t=void 0,this.it=e;if(e===U)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}he.directiveName="unsafeHTML",he.resultType=1;const yt=bt(he);var xt=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,ne=(t,e,r,s)=>{for(var a=s>1?void 0:s?$t(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&xt(e,r,a),a};let V=class extends ${constructor(){super(...arguments),this.label="",this.value=0,this.icon="file"}getIcon(){const t={"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'};return t[this.icon]||t["file-text"]}render(){return n`
      <div class="card">
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${yt(this.getIcon())}
          </svg>
        </div>
        <div class="info">
          <div class="value">${this.value}</div>
          <div class="label">${this.label}</div>
        </div>
      </div>
    `}};V.styles=A`
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
  `;ne([y({type:String})],V.prototype,"label",2);ne([y({type:Number})],V.prototype,"value",2);ne([y({type:String})],V.prototype,"icon",2);V=ne([E("stat-card")],V);var wt=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,J=(t,e,r,s)=>{for(var a=s>1?void 0:s?kt(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&wt(e,r,a),a};let M=class extends ${constructor(){super(...arguments),this.completedStages=[],this.canAdvance=!0,this.canRollback=!0}get stages(){return[{key:"INTAKE",label:"Intake",description:"校验输入、建立上下文",agent:"Orchestrator"},{key:"LITERATURE",label:"Literature",description:"文献检索、证据沉淀",agent:"Agent A"},{key:"OUTLINE",label:"Outline",description:"确定结构、论证路径",agent:"Agent A"},{key:"DATA_REQUIREMENTS",label:"Data Req.",description:"算例需求、数据映射",agent:"Agent B"},{key:"DRAFTING",label:"Drafting",description:"章节草稿、无缺段检查",agent:"Agent C"},{key:"POLISHING",label:"Polishing",description:"PoF风格润色",agent:"Agent C"},{key:"REVIEW",label:"Review",description:"质量门禁、返工决策",agent:"Orchestrator"},{key:"FINALIZE",label:"Finalize",description:"固化产物、投稿封装",agent:"Orchestrator"}]}isCompleted(t){return this.completedStages.includes(t)}isCurrent(t){return t===this.currentStage}canPreviewStage(t){const e=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"],r=e.indexOf(this.currentStage);return e.indexOf(t)<=r+1}previewStage(){this.dispatchEvent(new CustomEvent("preview-stage"))}advanceStage(){this.dispatchEvent(new CustomEvent("advance-stage"))}rollbackStage(){this.dispatchEvent(new CustomEvent("rollback-stage"))}selectStage(t){this.canPreviewStage(t)&&this.dispatchEvent(new CustomEvent("select-stage",{detail:t}))}render(){const t=this.stages.find(e=>e.key===this.currentStage);return n`
      <section class="wrap">
        <div class="stages">
          ${this.stages.map(e=>{const r=this.isCurrent(e.key),s=this.isCompleted(e.key),a=this.canPreviewStage(e.key);return n`
              <article 
                class="stage ${r?"current":""} ${s?"completed":""} ${a&&!r?"previewable":""}"
                @click=${()=>this.selectStage(e.key)}
              >
                <div class="stage-name">
                  <span class="stage-label">${e.label}</span>
                  ${r?n`<span class="badge current">当前</span>`:s?n`<span class="badge">已完成</span>`:a?n`<span class="badge preview">可预览</span>`:""}
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
    `}};M.styles=A`
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
  `;J([y({type:String})],M.prototype,"currentStage",2);J([y({type:Array})],M.prototype,"completedStages",2);J([y({type:Boolean})],M.prototype,"canAdvance",2);J([y({type:Boolean})],M.prototype,"canRollback",2);M=J([E("stage-navigator")],M);var _t=Object.defineProperty,St=Object.getOwnPropertyDescriptor,x=(t,e,r,s)=>{for(var a=s>1?void 0:s?St(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&_t(e,r,a),a};const _="http://192.168.1.161:8080",Ue="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function At(){return{"X-Api-Key":Ue,"Content-Type":"application/json"}}function T(t,e={}){return fetch(t,{...e,headers:{...At(),...e.headers||{}}})}let f=class extends ${constructor(){super(...arguments),this.taskId=null,this.taskStatus=null,this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null},this.feedbackHistory=[],this.currentFeedback="",this.dragover=!1,this.debugMode=!1,this.debugLogs=[],this.apiConnected=!1,this.apiChecking=!0,this.errorMessage="",this.pollInterval=null}connectedCallback(){super.connectedCallback(),this.checkApiConnection(),setTimeout(()=>this.loadExistingTask(),100)}saveTaskId(t){t?localStorage.setItem("paper-dashboard-task-id",t):localStorage.removeItem("paper-dashboard-task-id")}loadTaskId(){return localStorage.getItem("paper-dashboard-task-id")}async loadExistingTask(){let t=0;for(;!this.apiConnected&&t<50;)await new Promise(r=>setTimeout(r,100)),t++;if(!this.apiConnected){this.debug("warn","loadExistingTask_apiNotConnected");return}this.debug("log","loadExistingTask_start");const e=this.loadTaskId();try{const r=await T(`${_}/api/tasks`);if(r.ok){const a=(await r.json()).tasks||[];this.debug("log","loadExistingTask_foundTasks",{count:a.length});let o=null;if(o=a.find(i=>i.stage_status==="waiting_confirm"&&i.papers_total>0),o||(o=a.find(i=>i.stage_status==="processing"&&i.papers_total>0)),!o&&e&&(o=a.find(i=>i.task_id===e&&i.papers_total>0)),o||(o=a.find(i=>i.papers_total>0)),!o&&e&&(o=a.find(i=>i.task_id===e)),!o&&a.length>0&&(o=a.length>0?a[0]:null),o){this.debug("log","loadExistingTask_loading",{taskId:o.task_id,papers:o.papers_total,status:o.stage_status});const i=await T(`${_}/api/tasks/${o.task_id}/status`);if(i.ok){const c=await i.json();this.taskId=o.task_id,this.taskStatus=c,this.saveTaskId(o.task_id),this.debug("log","loadExistingTask_success",c);return}}}}catch(r){this.debug("error","loadExistingTask_error",{error:String(r)})}this.debug("log","loadExistingTask_noValidTask"),this.saveTaskId(null),this.taskId=null,this.taskStatus=null}disconnectedCallback(){super.disconnectedCallback(),this.pollInterval&&clearInterval(this.pollInterval)}async checkApiConnection(){this.apiChecking=!0;try{(await fetch(`${_}/api/health`)).ok?(this.apiConnected=!0,this.debug("log","apiConnected")):(this.apiConnected=!1,this.debug("warn","apiDisconnected"))}catch{this.apiConnected=!1,this.debug("warn","apiDisconnected")}this.apiChecking=!1}async createTask(){if(console.log("[ConfigStage] createTask called, apiConnected:",this.apiConnected),this.debug("log","checkApiConnection_start"),this.debug("log","createTask_start",{apiConnected:this.apiConnected}),!this.apiConnected){this.errorMessage="后端服务未连接，请刷新页面重试";return}try{const t=await T(`${_}/api/tasks`,{method:"POST"});if(t.ok){const e=await t.json();this.taskId=e.task_id,this.saveTaskId(e.task_id),this.taskStatus=e.status,this.startPolling(),this.notifyReadyState()}}catch(t){throw this.errorMessage=`创建任务失败: ${t.message}`,t}}startPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=window.setInterval(()=>{this.checkStatus()},2e3)}async checkStatus(){var t;if(this.taskId)try{const e=await T(`${_}/api/tasks/${this.taskId}/status`);e.ok&&(this.taskStatus=await e.json(),((t=this.taskStatus)==null?void 0:t.stage_status)==="waiting_confirm"&&await this.loadTopics(),this.notifyReadyState())}catch(e){console.error("Status check failed:",e)}}async loadTopics(){if(this.taskId)try{const t=await T(`${_}/api/tasks/${this.taskId}/topics`);if(t.ok){const e=await t.json();this.topics=e.topics||[]}}catch(t){console.error("Failed to load topics:",t)}}debug(t,e,r){const s={timestamp:Date.now(),level:t,action:e,data:r};console[t]("[ConfigStage]",e,r),this.debugMode&&(this.debugLogs=[...this.debugLogs.slice(-99),s],this.requestUpdate()),this.dispatchEvent(new CustomEvent("debug-log",{detail:s,bubbles:!0,composed:!0}))}toggleDebug(){this.debugMode=!this.debugMode,this.debugLogs=[]}clearDebugLogs(){this.debugLogs=[]}notifyReadyState(){var e;const t=((e=this.taskStatus)==null?void 0:e.stage_status)==="waiting_confirm"&&this.selectedTopic.title.trim().length>0;this.dispatchEvent(new CustomEvent("config-ready-change",{detail:!!t}))}onReferenceFileInput(t){const e=t.target;!e.files||e.files.length===0||(this.uploadPapers(Array.from(e.files)),e.value="")}onDrop(t){var r;t.preventDefault(),this.dragover=!1;const e=(r=t.dataTransfer)==null?void 0:r.files;!e||e.length===0||this.uploadPapers(Array.from(e).filter(s=>s.name.endsWith(".pdf")))}onDragOver(t){t.preventDefault(),this.dragover=!0}onDragLeave(){this.dragover=!1}async uploadPapers(t){if(console.log("[ConfigStage] uploadPapers called with",t.length,"files"),t.length!==0){if(!this.taskId){console.log("[ConfigStage] No taskId, creating task first...");try{await this.createTask(),console.log("[ConfigStage] Task created, taskId:",this.taskId),this.taskId&&this.doUpload(t)}catch(e){console.error("[ConfigStage] createTask failed:",e)}return}this.doUpload(t)}}async doUpload(t){console.log("[ConfigStage] doUpload called with",t.length,"files, taskId:",this.taskId);for(const e of t)try{const r=new FormData;if(r.append("paper",e),!(await fetch(`${_}/api/tasks/${this.taskId}/papers`,{headers:{"X-Api-Key":Ue},method:"POST",body:r})).ok)throw new Error("Upload failed")}catch(r){this.errorMessage=`上传失败: ${r.message}`}await this.triggerOpenClawSession()}async triggerOpenClawSession(){if(this.taskId){this.errorMessage="";try{if(this.taskStatus&&(this.taskStatus={...this.taskStatus,stage_status:"processing",messages:[...this.taskStatus.messages,{timestamp:new Date().toISOString(),from:"system",content:"正在启动 OpenClaw Session 进行论文分析..."}]}),!(await T(`${_}/api/tasks/${this.taskId}/trigger`,{method:"POST"})).ok)throw new Error("Trigger failed");this.startPolling()}catch(t){this.errorMessage=`触发失败: ${t.message}`}}}selectTopic(t){this.selectedTopicId=t.id,this.selectedTopic={title:t.title,researchObjective:`针对 "${t.title}" 的核心问题，建立理论模型并进行数值验证。`,expectedContribution:"提出一种可行的研究方案，产出具有创新性的学术成果。",selectedCandidateId:t.id},this.notifyReadyState()}async submitFeedback(){!this.currentFeedback.trim()||!this.selectedTopicId||(this.feedbackHistory=[...this.feedbackHistory,{feedback:this.currentFeedback.trim(),timestamp:new Date}],this.taskId&&await T(`${_}/api/tasks/${this.taskId}/messages`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"feedback",data:{feedback:this.currentFeedback,topicId:this.selectedTopicId}})}),this.currentFeedback="",this.errorMessage="反馈已提交，OpenClaw 正在处理...")}regenerateTopics(){this.errorMessage="正在重新生成选题..."}updateTopicField(t,e){this.selectedTopic={...this.selectedTopic,[t]:e},this.notifyReadyState()}async confirmTopic(){if(!this.selectedTopic.title.trim()){this.errorMessage="请先选择一个选题或输入论文标题";return}this.taskId&&await T(`${_}/api/tasks/${this.taskId}/topics`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:this.selectedTopic})}),this.notifyReadyState(),this.dispatchEvent(new CustomEvent("topic-confirmed",{detail:{topic:this.selectedTopic,taskId:this.taskId}}))}get progressPercent(){var r;if(!((r=this.taskStatus)!=null&&r.progress))return 0;const{papers_processed:t,papers_total:e}=this.taskStatus.progress;return e>0?Math.round(t/e*100):0}get uploadedPapersCount(){var t,e;return((e=(t=this.taskStatus)==null?void 0:t.progress)==null?void 0:e.papers_total)||0}render(){var o,i,c,d;const t=!!this.taskId,e=this.topics.length>0,r=((o=this.taskStatus)==null?void 0:o.stage_status)==="processing",s=((i=this.taskStatus)==null?void 0:i.stage_status)==="waiting_confirm",a=((c=this.taskStatus)==null?void 0:c.stage_status)==="error";return n`
      <section class="layout">
        <!-- Panel 1: 参考论文上传区 -->
        <article class="panel">
          <h3>
            <span class="step">1</span>参考论文上传
            <span class="api-status ${this.apiChecking?"connecting":this.apiConnected?"connected":"disconnected"}">
              ${this.apiChecking?"检测中":this.apiConnected?"已连接":"未连接"}
            </span>
            ${this.taskId?n`<span class="task-id">${this.taskId.substring(0,8)}...</span>`:""}
          </h3>
          <p>拖拽或点击上传 PDF 论文，OpenClaw 将自动分析论文内容</p>
          
          <label class="dropzone ${this.dragover?"dragover":""}"
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
            ${t?this.uploadedPapersCount===0?n`
              <div class="empty">尚未上传参考论文</div>
            `:n`
              <div class="paper-item">
                <div>
                  <div class="paper-name">已上传 ${this.uploadedPapersCount} 篇论文</div>
                  <div class="paper-meta">等待 OpenClaw 分析...</div>
                </div>
                <div class="paper-status">
                  <span class="status ${r?"processing":"uploaded"}">
                    ${r?"分析中":"待处理"}
                  </span>
                </div>
              </div>
            `:n`
              <div class="empty">尚未创建任务</div>
            `}
          </div>

          <button @click=${()=>{var l,u;return(u=(l=this.shadowRoot)==null?void 0:l.querySelector("label.dropzone input"))==null?void 0:u.click()}}>
            + 继续添加论文
          </button>

          ${t&&this.taskStatus?n`
            <div class="message-log">
              <strong style="font-size: 10px; color: var(--color-text-tertiary);">处理日志</strong>
              ${this.taskStatus.messages.slice(-5).map(l=>n`
                <div class="message-item">
                  <span class="message-time">${new Date(l.timestamp).toLocaleTimeString()}</span>
                  <span class="message-from ${l.from}">${l.from==="system"?"系统":l.from==="agent"?"Agent":l.from}</span>
                  <div class="message-content">${l.content}</div>
                </div>
              `)}
            </div>
          `:""}
        </article>

        <!-- Panel 2: OpenClaw AI 分析 -->
        <article class="panel">
          <h3><span class="step">2</span>OpenClaw AI 分析与选题推荐</h3>
          
          ${r?n`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>OpenClaw 正在分析论文...</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
              <div style="font-size: var(--text-xs); margin-top: var(--space-2);">
                ${this.uploadedPapersCount} 篇论文已上传
              </div>
            </div>
          `:s&&e?n`
            <p>✅ 分析完成，请在右侧选择研究选题。</p>
            
            <div class="topics-section">
              <strong>推荐选题（支持多轮反馈）</strong>
              ${this.topics.map(l=>n`
                <div 
                  class="candidate ${l.id===this.selectedTopicId?"active":""}"
                  @click=${()=>this.selectTopic(l)}
                >
                  <div class="candidate-header">
                    <span class="candidate-title">${l.title}</span>
                    <span class="candidate-score">${l.score}%</span>
                  </div>
                  <div class="candidate-summary">${l.summary}</div>
                  <div class="candidate-detail">
                    <div><strong>理论依据：</strong>${l.rationale}</div>
                    <div><strong>可行性：</strong>${l.feasibility}</div>
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
                    ${this.feedbackHistory.map((l,u)=>n`
                      <div class="feedback-item">
                        <span class="round">第 ${u+1} 轮反馈：</span>
                        <span class="text">${l.feedback}</span>
                      </div>
                    `)}
                  </div>
                `:""}
                
                <div class="feedback-input">
                  <textarea 
                    placeholder="输入对选题的修改意见或要求，OpenClaw 将根据反馈重新生成..."
                    .value=${this.currentFeedback}
                    @input=${l=>this.currentFeedback=l.target.value}
                  ></textarea>
                  <button @click=${this.submitFeedback} ?disabled=${!this.currentFeedback.trim()}>
                    提交反馈并重新生成
                  </button>
                </div>
              </div>
            `:""}
          `:a?n`
            <div class="empty" style="border-color: #fee2e2; color: #991b1b;">
              处理出错：${((d=this.taskStatus)==null?void 0:d.error)||"未知错误"}
            </div>
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
                  @input=${l=>this.updateTopicField("title",l.target.value)}
                >
              </div>

              <div class="field">
                <label>研究目标</label>
                <textarea
                  placeholder="描述研究的核心目标..."
                  .value=${this.selectedTopic.researchObjective}
                  @input=${l=>this.updateTopicField("researchObjective",l.target.value)}
                ></textarea>
              </div>

              <div class="field">
                <label>预期贡献</label>
                <textarea
                  placeholder="说明研究的创新点和贡献..."
                  .value=${this.selectedTopic.expectedContribution}
                  @input=${l=>this.updateTopicField("expectedContribution",l.target.value)}
                ></textarea>
              </div>
            </div>

            <div class="confirm-section">
              <h4>✅ 确认选题进入下一阶段</h4>
              <p style="font-size: var(--text-xs); color: #065f46; margin-bottom: var(--space-3);">
                确认后将进入 Literature 阶段，OpenClaw 开始文献检索与证据沉淀。
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
    `}};f.styles=A`
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
    }

    .dropzone.dragover {
      border-color: var(--color-accent);
      background: #d1fae5;
      transform: scale(1.02);
    }

    .dropzone input { display: none; }

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

    .status.uploaded { background: #f4f4f5; color: #52525b; }
    .status.processing { background: #dbeafe; color: #1e40af; }
    .status.analyzing { background: #fef3c7; color: #92400e; }
    .status.done { background: #d1fae5; color: #065f46; }
    .status.waiting { background: #e0e7ff; color: #4338ca; }
    .status.error { background: #fee2e2; color: #991b1b; }

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

    .keyword-tag {
      background: #e0e7ff;
      color: #4338ca;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      margin-right: 4px;
      margin-bottom: 4px;
      display: inline-block;
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

    button:disabled { cursor: not-allowed; opacity: 0.5; }

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

    @keyframes spin { to { transform: rotate(360deg); } }

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

    .topics-section { display: grid; gap: var(--space-3); }

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

    .candidate-detail strong { color: var(--color-text-secondary); }

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

    .feedback-history { display: grid; gap: var(--space-2); margin-bottom: var(--space-3); }

    .feedback-item {
      background: #fff;
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-xs);
    }

    .feedback-item .round { font-weight: 600; color: #92400e; }
    .feedback-item .text { color: var(--color-text-primary); margin-top: 2px; }

    .feedback-input { display: grid; gap: var(--space-2); }

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

    .feedback-input textarea:focus { outline: none; border-color: #f59e0b; }

    .topic-detail { display: grid; gap: var(--space-3); }

    .field { display: grid; gap: var(--space-1); }

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

    .field textarea { min-height: 80px; resize: vertical; }

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

    .empty-waiting .icon { font-size: 32px; margin-bottom: var(--space-2); }

    .api-status {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }

    .api-status.connected { background: #d1fae5; color: #065f46; }
    .api-status.disconnected { background: #fee2e2; color: #991b1b; }
    .api-status.connecting { background: #fef3c7; color: #92400e; }

    .task-id {
      font-size: 10px;
      background: var(--color-bg);
      color: var(--color-text-tertiary);
      padding: 2px 8px;
      border-radius: 4px;
      font-family: monospace;
      margin-left: var(--space-2);
    }

    .message-log {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      font-size: 11px;
      max-height: 200px;
      overflow-y: auto;
      margin-top: var(--space-3);
    }

    .message-item {
      padding: var(--space-1) 0;
      border-bottom: 1px solid var(--color-border-light);
    }

    .message-item:last-child { border-bottom: none; }

    .message-time { color: var(--color-text-tertiary); margin-right: var(--space-2); }
    .message-from { font-weight: 600; color: var(--color-accent); }
    .message-from.user { color: #4338ca; }
    .message-content { color: var(--color-text-primary); margin-top: 2px; }

    @media (max-width: 1280px) {
      .layout { grid-template-columns: 1fr; }
      .panel { min-height: auto; }
    }
  `;x([p()],f.prototype,"taskId",2);x([p()],f.prototype,"taskStatus",2);x([p()],f.prototype,"topics",2);x([p()],f.prototype,"selectedTopicId",2);x([p()],f.prototype,"selectedTopic",2);x([p()],f.prototype,"feedbackHistory",2);x([p()],f.prototype,"currentFeedback",2);x([p()],f.prototype,"dragover",2);x([p()],f.prototype,"debugMode",2);x([p()],f.prototype,"debugLogs",2);x([p()],f.prototype,"apiConnected",2);x([p()],f.prototype,"apiChecking",2);x([p()],f.prototype,"errorMessage",2);f=x([E("config-stage")],f);var Et=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,b=(t,e,r,s)=>{for(var a=s>1?void 0:s?Ct(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=(s?i(e,r,a):i(a))||a);return s&&a&&Et(e,r,a),a};const F=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"];let v=class extends ${constructor(){super(...arguments),this.papers=[],this.folders=[],this.tags=[],this.stats={total_papers:0,total_folders:0,total_tags:0,papers_this_week:0},this.selectedFolderId=null,this.searchQuery="",this.loading=!0,this.showUploader=!1,this.workflowActive=!1,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}async connectedCallback(){super.connectedCallback(),await this.loadData(),this.checkExistingWorkflow()}async checkExistingWorkflow(){const t=localStorage.getItem("paper-dashboard-workflow-task-id");t&&console.log("[PaperApp] Found existing workflow task:",t)}async loadData(){this.loading=!0;try{const[t,e,r]=await Promise.all([z.listFolders(),z.listTags(),z.getStats()]);this.folders=t,this.tags=e,this.stats=r,await this.loadPapers()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadPapers(){try{const t=await z.listPapers({folder_id:this.selectedFolderId??void 0,search:this.searchQuery||void 0});this.papers=t.papers||[]}catch(t){console.error("Failed to load papers:",t)}}onSearch(t){this.searchQuery=t.detail,this.loadPapers()}onFolderSelect(t){this.selectedFolderId=t.detail,this.loadPapers()}async onUpload(){this.showUploader=!1,await this.loadData()}async onDeletePaper(){await this.loadPapers(),this.stats=await z.getStats()}onCreatePaper(){this.workflowActive=!0,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}onConfigReadyChange(t){this.configReady=t.detail}onTopicConfirmed(t){const{topic:e,taskId:r}=t.detail;console.log("[PaperApp] Topic confirmed:",e,"taskId:",r),this.advanceStage()}advanceStage(){if(!this.configReady&&this.currentStage==="INTAKE"){alert("请先完成 Intake 阶段的选题确认");return}const t=F.indexOf(this.currentStage);t<F.length-1&&(this.completedStages.includes(this.currentStage)||(this.completedStages=[...this.completedStages,this.currentStage]),this.currentStage=F[t+1],this.configReady=!1,this.previewMode=!1,this.previewStage=null)}rollbackStage(){const t=F.indexOf(this.currentStage);t>0&&(this.currentStage=F[t-1],this.completedStages=this.completedStages.filter(e=>F.indexOf(e)<t-1),this.configReady=!0,this.previewMode=!1,this.previewStage=null)}onPreviewStage(){this.previewMode=!0,this.previewStage=this.currentStage}closePreview(){this.previewMode=!1,this.previewStage=null}selectStage(t){const e=t.detail;e===this.currentStage?(this.previewMode=!1,this.previewStage=null):(this.previewMode=!0,this.previewStage=e)}canAdvance(){return this.currentStage==="INTAKE"?this.configReady:!0}canRollback(){return this.currentStage!=="INTAKE"}getStageDisplayName(t){return{INTAKE:"Intake - 校验输入",LITERATURE:"Literature - 文献检索",OUTLINE:"Outline - 确定结构",DATA_REQUIREMENTS:"Data Req. - 算例需求",DRAFTING:"Drafting - 章节草稿",POLISHING:"Polishing - PoF润色",REVIEW:"Review - 质量门禁",FINALIZE:"Finalize - 投稿封装"}[t]||t}renderStageContent(t){return t==="INTAKE"?n`
        <config-stage
          @config-ready-change=${this.onConfigReadyChange}
          @topic-confirmed=${this.onTopicConfirmed}
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
    `}};v.styles=A`
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
  `;b([p()],v.prototype,"papers",2);b([p()],v.prototype,"folders",2);b([p()],v.prototype,"tags",2);b([p()],v.prototype,"stats",2);b([p()],v.prototype,"selectedFolderId",2);b([p()],v.prototype,"searchQuery",2);b([p()],v.prototype,"loading",2);b([p()],v.prototype,"showUploader",2);b([p()],v.prototype,"workflowActive",2);b([p()],v.prototype,"currentStage",2);b([p()],v.prototype,"completedStages",2);b([p()],v.prototype,"configReady",2);b([p()],v.prototype,"previewMode",2);b([p()],v.prototype,"previewStage",2);v=b([E("paper-app")],v);
