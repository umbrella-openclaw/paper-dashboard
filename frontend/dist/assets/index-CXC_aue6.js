(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=globalThis,Oe=ge.ShadowRoot&&(ge.ShadyCSS===void 0||ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Me=Symbol(),Le=new WeakMap;let nt=class{constructor(e,a,r){if(this._$cssResult$=!0,r!==Me)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(Oe&&e===void 0){const r=a!==void 0&&a.length===1;r&&(e=Le.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Le.set(a,e))}return e}toString(){return this.cssText}};const ht=t=>new nt(typeof t=="string"?t:t+"",void 0,Me),y=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((r,s,i)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new nt(a,t,Me)},ft=(t,e)=>{if(Oe)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const r=document.createElement("style"),s=ge.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=a.cssText,t.appendChild(r)}},Ue=Oe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const r of e.cssRules)a+=r.cssText;return ht(a)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:bt,defineProperty:mt,getOwnPropertyDescriptor:yt,getOwnPropertyNames:xt,getOwnPropertySymbols:wt,getPrototypeOf:kt}=Object,R=globalThis,He=R.trustedTypes,$t=He?He.emptyScript:"",ke=R.reactiveElementPolyfillSupport,ee=(t,e)=>t,he={toAttribute(t,e){switch(e){case Boolean:t=t?$t:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},Ne=(t,e)=>!bt(t,e),qe={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:Ne};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);let G=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=qe){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(e,r,a);s!==void 0&&mt(this.prototype,e,s)}}static getPropertyDescriptor(e,a,r){const{get:s,set:i}=yt(this.prototype,e)??{get(){return this[a]},set(o){this[a]=o}};return{get:s,set(o){const p=s==null?void 0:s.call(this);i==null||i.call(this,o),this.requestUpdate(e,p,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??qe}static _$Ei(){if(this.hasOwnProperty(ee("elementProperties")))return;const e=kt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ee("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ee("properties"))){const a=this.properties,r=[...xt(a),...wt(a)];for(const s of r)this.createProperty(s,a[s])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[r,s]of a)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[a,r]of this.elementProperties){const s=this._$Eu(a,r);s!==void 0&&this._$Eh.set(s,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const s of r)a.unshift(Ue(s))}else e!==void 0&&a.push(Ue(e));return a}static _$Eu(e,a){const r=a.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const r of a.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var r;return(r=a.hostConnected)==null?void 0:r.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var r;return(r=a.hostDisconnected)==null?void 0:r.call(a)})}attributeChangedCallback(e,a,r){this._$AK(e,r)}_$ET(e,a){var i;const r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){const o=(((i=r.converter)==null?void 0:i.toAttribute)!==void 0?r.converter:he).toAttribute(a,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,a){var i,o;const r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const p=r.getPropertyOptions(s),d=typeof p.converter=="function"?{fromAttribute:p.converter}:((i=p.converter)==null?void 0:i.fromAttribute)!==void 0?p.converter:he;this._$Em=s;const v=d.fromAttribute(a,p.type);this[s]=v??((o=this._$Ej)==null?void 0:o.get(s))??v,this._$Em=null}}requestUpdate(e,a,r,s=!1,i){var o;if(e!==void 0){const p=this.constructor;if(s===!1&&(i=this[e]),r??(r=p.getPropertyOptions(e)),!((r.hasChanged??Ne)(i,a)||r.useDefault&&r.reflect&&i===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(p._$Eu(e,r))))return;this.C(e,a,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:r,reflect:s,wrapped:i},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??a??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(a=void 0),this._$AL.set(e,a)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:p}=o,d=this[i];p!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,o,d)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(r=this._$EO)==null||r.forEach(s=>{var i;return(i=s.hostUpdate)==null?void 0:i.call(s)}),this.update(a)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[ee("elementProperties")]=new Map,G[ee("finalized")]=new Map,ke==null||ke({ReactiveElement:G}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=globalThis,Be=t=>t,fe=te.trustedTypes,Ke=fe?fe.createPolicy("lit-html",{createHTML:t=>t}):void 0,ct="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,lt="?"+z,St=`<${lt}>`,F=document,ae=()=>F.createComment(""),re=t=>t===null||typeof t!="object"&&typeof t!="function",je=Array.isArray,It=t=>je(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",$e=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,We=/-->/g,Je=/>/g,O=RegExp(`>|${$e}(?:([^\\s"'>=/]+)(${$e}*=${$e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ge=/'/g,Ve=/"/g,dt=/^(?:script|style|textarea|title)$/i,_t=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),n=_t(1),L=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Xe=new WeakMap,N=F.createTreeWalker(F,129);function pt(t,e){if(!je(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ke!==void 0?Ke.createHTML(e):e}const Pt=(t,e)=>{const a=t.length-1,r=[];let s,i=e===2?"<svg>":e===3?"<math>":"",o=Z;for(let p=0;p<a;p++){const d=t[p];let v,f,l=-1,$=0;for(;$<d.length&&(o.lastIndex=$,f=o.exec(d),f!==null);)$=o.lastIndex,o===Z?f[1]==="!--"?o=We:f[1]!==void 0?o=Je:f[2]!==void 0?(dt.test(f[2])&&(s=RegExp("</"+f[2],"g")),o=O):f[3]!==void 0&&(o=O):o===O?f[0]===">"?(o=s??Z,l=-1):f[1]===void 0?l=-2:(l=o.lastIndex-f[2].length,v=f[1],o=f[3]===void 0?O:f[3]==='"'?Ve:Ge):o===Ve||o===Ge?o=O:o===We||o===Je?o=Z:(o=O,s=void 0);const T=o===O&&t[p+1].startsWith("/>")?" ":"";i+=o===Z?d+St:l>=0?(r.push(v),d.slice(0,l)+ct+d.slice(l)+z+T):d+z+(l===-2?p:T)}return[pt(t,i+(t[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class se{constructor({strings:e,_$litType$:a},r){let s;this.parts=[];let i=0,o=0;const p=e.length-1,d=this.parts,[v,f]=Pt(e,a);if(this.el=se.createElement(v,r),N.currentNode=this.el.content,a===2||a===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=N.nextNode())!==null&&d.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(ct)){const $=f[o++],T=s.getAttribute(l).split(z),ue=/([.?@])?(.*)/.exec($);d.push({type:1,index:i,name:ue[2],strings:T,ctor:ue[1]==="."?Ct:ue[1]==="?"?Tt:ue[1]==="@"?Et:ye}),s.removeAttribute(l)}else l.startsWith(z)&&(d.push({type:6,index:i}),s.removeAttribute(l));if(dt.test(s.tagName)){const l=s.textContent.split(z),$=l.length-1;if($>0){s.textContent=fe?fe.emptyScript:"";for(let T=0;T<$;T++)s.append(l[T],ae()),N.nextNode(),d.push({type:2,index:++i});s.append(l[$],ae())}}}else if(s.nodeType===8)if(s.data===lt)d.push({type:2,index:i});else{let l=-1;for(;(l=s.data.indexOf(z,l+1))!==-1;)d.push({type:7,index:i}),l+=z.length-1}i++}}static createElement(e,a){const r=F.createElement("template");return r.innerHTML=e,r}}function V(t,e,a=t,r){var o,p;if(e===L)return e;let s=r!==void 0?(o=a._$Co)==null?void 0:o[r]:a._$Cl;const i=re(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((p=s==null?void 0:s._$AO)==null||p.call(s,!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,a,r)),r!==void 0?(a._$Co??(a._$Co=[]))[r]=s:a._$Cl=s),s!==void 0&&(e=V(t,s._$AS(t,e.values),s,r)),e}class At{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:r}=this._$AD,s=((e==null?void 0:e.creationScope)??F).importNode(a,!0);N.currentNode=s;let i=N.nextNode(),o=0,p=0,d=r[0];for(;d!==void 0;){if(o===d.index){let v;d.type===2?v=new oe(i,i.nextSibling,this,e):d.type===1?v=new d.ctor(i,d.name,d.strings,this,e):d.type===6&&(v=new zt(i,this,e)),this._$AV.push(v),d=r[++p]}o!==(d==null?void 0:d.index)&&(i=N.nextNode(),o++)}return N.currentNode=F,s}p(e){let a=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,a),a+=r.strings.length-2):r._$AI(e[a])),a++}}class oe{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,a,r,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=V(this,e,a),re(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==L&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):It(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&re(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){var i;const{values:a,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=se.createElement(pt(r.h,r.h[0]),this.options)),r);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(a);else{const o=new At(s,this),p=o.u(this.options);o.p(a),this.T(p),this._$AH=o}}_$AC(e){let a=Xe.get(e.strings);return a===void 0&&Xe.set(e.strings,a=new se(e)),a}k(e){je(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let r,s=0;for(const i of e)s===a.length?a.push(r=new oe(this.O(ae()),this.O(ae()),this,this.options)):r=a[s],r._$AI(i),s++;s<a.length&&(this._$AR(r&&r._$AB.nextSibling,s),a.length=s)}_$AR(e=this._$AA.nextSibling,a){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,a);e!==this._$AB;){const s=Be(e).nextSibling;Be(e).remove(),e=s}}setConnected(e){var a;this._$AM===void 0&&(this._$Cv=e,(a=this._$AP)==null||a.call(this,e))}}class ye{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,r,s,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=a,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(e,a=this,r,s){const i=this.strings;let o=!1;if(i===void 0)e=V(this,e,a,0),o=!re(e)||e!==this._$AH&&e!==L,o&&(this._$AH=e);else{const p=e;let d,v;for(e=i[0],d=0;d<i.length-1;d++)v=V(this,p[r+d],a,d),v===L&&(v=this._$AH[d]),o||(o=!re(v)||v!==this._$AH[d]),v===u?e=u:e!==u&&(e+=(v??"")+i[d+1]),this._$AH[d]=v}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ct extends ye{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class Tt extends ye{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class Et extends ye{constructor(e,a,r,s,i){super(e,a,r,s,i),this.type=5}_$AI(e,a=this){if((e=V(this,e,a,0)??u)===L)return;const r=this._$AH,s=e===u&&r!==u||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==u&&(r===u||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var a;typeof this._$AH=="function"?this._$AH.call(((a=this.options)==null?void 0:a.host)??this.element,e):this._$AH.handleEvent(e)}}class zt{constructor(e,a,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}}const Se=te.litHtmlPolyfillSupport;Se==null||Se(se,oe),(te.litHtmlVersions??(te.litHtmlVersions=[])).push("3.3.2");const Rt=(t,e,a)=>{const r=(a==null?void 0:a.renderBefore)??e;let s=r._$litPart$;if(s===void 0){const i=(a==null?void 0:a.renderBefore)??null;r._$litPart$=s=new oe(e.insertBefore(ae(),i),i,void 0,a??{})}return s._$AI(t),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis;let g=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Rt(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return L}};var ot;g._$litElement$=!0,g.finalized=!0,(ot=j.litElementHydrateSupport)==null||ot.call(j,{LitElement:g});const Ie=j.litElementPolyfillSupport;Ie==null||Ie({LitElement:g});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=t=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dt={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:Ne},Ot=(t=Dt,e,a)=>{const{kind:r,metadata:s}=a;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(a.name,t),r==="accessor"){const{name:o}=a;return{set(p){const d=e.get.call(this);e.set.call(this,p),this.requestUpdate(o,d,t,!0,p)},init(p){return p!==void 0&&this.C(o,void 0,t,p),p}}}if(r==="setter"){const{name:o}=a;return function(p){const d=this[o];e.call(this,p),this.requestUpdate(o,d,t,!0,p)}}throw Error("Unsupported decorator location: "+r)};function A(t){return(e,a)=>typeof a=="object"?Ot(t,e,a):((r,s,i)=>{const o=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),o?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function c(t){return A({...t,state:!0,attribute:!1})}const Mt="/api";async function _(t,e,a){const r={method:t,headers:{}};a instanceof FormData?r.body=a:a&&(r.headers={"Content-Type":"application/json"},r.body=JSON.stringify(a));const s=await fetch(`${Mt}${e}`,r);if(!s.ok){const i=await s.json().catch(()=>({error:"Unknown error"}));throw new Error(i.error||`HTTP ${s.status}`)}return s.json()}const M={uploadPaper:t=>_("POST","/papers",t),listPapers:t=>{const e=new URLSearchParams;t!=null&&t.page&&e.set("page",String(t.page)),t!=null&&t.limit&&e.set("limit",String(t.limit)),t!=null&&t.search&&e.set("search",t.search),t!=null&&t.folder_id&&e.set("folder_id",String(t.folder_id));const a=e.toString();return _("GET",`/papers${a?`?${a}`:""}`)},getPaper:t=>_("GET",`/papers/${t}`),updatePaper:(t,e)=>_("PUT",`/papers/${t}`,e),deletePaper:t=>_("DELETE",`/papers/${t}`),listFolders:()=>_("GET","/folders"),createFolder:(t,e)=>_("POST","/folders",{name:t,parent_id:e}),deleteFolder:t=>_("DELETE",`/folders/${t}`),listTags:()=>_("GET","/tags"),createTag:(t,e)=>_("POST","/tags",{name:t,color:e||"#10b981"}),deleteTag:t=>_("DELETE",`/tags/${t}`),getStats:()=>_("GET","/stats")};var Nt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,vt=(t,e,a,r)=>{for(var s=r>1?void 0:r?jt(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Nt(e,a,s),s};let be=class extends g{constructor(){super(...arguments),this.searchValue=""}onSearch(t){const e=t.target;this.searchValue=e.value,this.dispatchEvent(new CustomEvent("search",{detail:this.searchValue}))}render(){return n`
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
    `}};be.styles=y`
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
  `;vt([c()],be.prototype,"searchValue",2);be=vt([x("paper-header")],be);var Ft=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,xe=(t,e,a,r)=>{for(var s=r>1?void 0:r?Lt(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Ft(e,a,s),s};const Ye="http://192.168.1.161:8080",Ut="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function Qe(t,e={}){return fetch(t,{...e,headers:{"X-Api-Key":Ut,"Content-Type":"application/json",...e.headers||{}}})}let X=class extends g{constructor(){super(...arguments),this.tasks=[],this.loading=!1,this.confirmDeleteId=null,this._interval=null}connectedCallback(){super.connectedCallback(),this.loadTasks(),this._interval=setInterval(()=>this.loadTasks(),1e4)}disconnectedCallback(){super.disconnectedCallback(),this._interval&&clearInterval(this._interval)}async loadTasks(){this.loading=!0;try{const t=await Qe(`${Ye}/api/tasks`);if(t.ok){const e=await t.json();this.tasks=e.tasks||[]}}catch(t){console.error("Failed to load tasks:",t)}finally{this.loading=!1}}createPaper(){this.dispatchEvent(new CustomEvent("create-paper"))}selectTask(t){this.dispatchEvent(new CustomEvent("task-select",{detail:{taskId:t}}))}async deleteTask(t,e){if(t.stopPropagation(),this.confirmDeleteId!==e){this.confirmDeleteId=e;return}try{(await Qe(`${Ye}/api/tasks/${e}`,{method:"DELETE"})).ok&&(this.tasks=this.tasks.filter(r=>r.task_id!==e),this.dispatchEvent(new CustomEvent("task-deleted",{detail:{taskId:e}})))}catch(a){console.error("Failed to delete task:",a)}finally{this.confirmDeleteId=null}}cancelDelete(t){t.stopPropagation(),this.confirmDeleteId=null}getStageClass(t){return`stage-${t}`}getStatusClass(t){return`status-${t}`}render(){return n`
      <div class="sidebar">
        <button class="create-paper" @click=${this.createPaper}>
          + 创建新论文
        </button>

        <div class="section">
          <h3>论文任务列表</h3>
          
          ${this.loading&&this.tasks.length===0?n`
            <div class="loading">加载中...</div>
          `:this.tasks.length===0?n`
            <div class="empty-state">
              <div class="icon">📄</div>
              <div>暂无论文任务</div>
              <div style="font-size: var(--text-xs); margin-top: var(--space-1);">点击上方按钮创建</div>
            </div>
          `:n`
            <div class="task-list">
              ${this.tasks.map(t=>n`
                <div 
                  class="task-item"
                  @click=${()=>this.selectTask(t.task_id)}
                >
                  <div class="task-header">
                    <div class="task-title">
                      ${t.title||"未命名论文"}
                    </div>
                    <button 
                      class="task-delete" 
                      @click=${e=>this.deleteTask(e,t.task_id)}
                      title="删除任务"
                    >
                      ${this.confirmDeleteId===t.task_id?"✓":"×"}
                    </button>
                  </div>
                  
                  <div class="task-meta">
                    <span class="task-stage ${this.getStageClass(t.stage)}">
                      ${t.stage}
                    </span>
                    <span class="status-dot ${this.getStatusClass(t.stage_status)}"></span>
                    <span>${t.stage_status==="idle"?"待处理":t.stage_status==="processing"?"处理中":t.stage_status==="waiting_confirm"?"待确认":t.stage_status==="completed"?"已完成":t.stage_status==="error"?"错误":t.stage_status}</span>
                    ${t.papers_total>0?n`
                      <span>•</span>
                      <span>${t.papers_total} 篇论文</span>
                    `:""}
                  </div>
                  
                  ${this.confirmDeleteId===t.task_id?n`
                    <div class="confirm-delete" @click=${e=>e.stopPropagation()}>
                      <span>确认删除此任务？</span>
                      <div style="display: flex; gap: var(--space-2);">
                        <button class="confirm-btn yes" @click=${e=>this.deleteTask(e,t.task_id)}>删除</button>
                        <button class="confirm-btn no" @click=${this.cancelDelete}>取消</button>
                      </div>
                    </div>
                  `:""}
                </div>
              `)}
            </div>
          `}
        </div>
      </div>
    `}};X.styles=y`
    :host {
      display: block;
      height: 100%;
    }
    
    .sidebar {
      padding: var(--space-4);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .create-paper {
      width: 100%;
      margin-bottom: var(--space-4);
      padding: var(--space-3) var(--space-4);
      border: 2px solid var(--color-accent);
      border-radius: var(--radius-lg);
      background: var(--color-accent);
      color: #fff;
      font-size: var(--text-sm);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
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
      margin-bottom: var(--space-4);
    }
    
    .task-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .task-item {
      position: relative;
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .task-item:hover {
      border-color: var(--color-accent);
      background: var(--color-bg);
    }
    
    .task-item.active {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }
    
    .task-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-2);
    }
    
    .task-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      word-break: break-word;
      flex: 1;
    }
    
    .task-delete {
      width: 20px;
      height: 20px;
      border: none;
      background: transparent;
      color: var(--color-text-tertiary);
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      opacity: 0;
      transition: all var(--transition-fast);
    }
    
    .task-item:hover .task-delete {
      opacity: 1;
    }
    
    .task-delete:hover {
      background: #fef2f2;
      color: #ef4444;
    }
    
    .task-meta {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-2);
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }
    
    .task-stage {
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
    }
    
    .stage-INTAKE { background: #dbeafe; color: #1d4ed8; }
    .stage-LITERATURE { background: #ede9fe; color: #7c3aed; }
    .stage-OUTLINE { background: #fef3c7; color: #b45309; }
    .stage-DRAFTING { background: #d1fae5; color: #047857; }
    .stage-POLISHING { background: #fce7f3; color: #be185d; }
    .stage-REVIEW { background: #fee2e2; color: #b91c1c; }
    .stage-FINALIZE { background: #ecfdf5; color: #065f46; }
    
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
    
    .status-idle { color: #9ca3af; }
    .status-processing { color: #f59e0b; }
    .status-waiting_confirm { color: #10b981; }
    .status-completed { color: #3b82f6; }
    .status-error { color: #ef4444; }
    
    .empty-state {
      text-align: center;
      padding: var(--space-6);
      color: var(--color-text-tertiary);
      font-size: var(--text-sm);
    }
    
    .empty-state .icon {
      font-size: 32px;
      margin-bottom: var(--space-2);
      opacity: 0.5;
    }
    
    .loading {
      text-align: center;
      padding: var(--space-4);
      color: var(--color-text-tertiary);
      font-size: var(--text-sm);
    }
    
    .confirm-delete {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: var(--space-3);
    }
    
    .confirm-delete span {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      text-align: center;
    }
    
    .confirm-btn {
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    
    .confirm-btn.yes {
      background: #ef4444;
      color: white;
    }
    
    .confirm-btn.no {
      background: var(--color-border);
      color: var(--color-text-primary);
    }
  `;xe([c()],X.prototype,"tasks",2);xe([c()],X.prototype,"loading",2);xe([c()],X.prototype,"confirmDeleteId",2);X=xe([x("paper-sidebar")],X);var Ht=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,Fe=(t,e,a,r)=>{for(var s=r>1?void 0:r?qt(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Ht(e,a,s),s};let ie=class extends g{constructor(){super(...arguments),this.showConfirm=!1}async download(){const t=document.createElement("a");t.href=`/uploads/${this.paper.file_path.replace("uploads/","")}`,t.download=this.paper.file_name,t.click()}async delete(){if(!this.showConfirm){this.showConfirm=!0,setTimeout(()=>this.showConfirm=!1,3e3);return}try{await M.deletePaper(this.paper.id),this.dispatchEvent(new CustomEvent("delete"))}catch(t){console.error("Delete failed:",t)}}render(){const{title:t,authors:e,journal:a,year:r,abstract:s,file_name:i,tags:o}=this.paper;return n`
      <div class="card">
        <div class="header">
          <div class="title">${t||"Untitled"}</div>
          ${r?n`<span class="year">${r}</span>`:""}
        </div>
        
        ${e?n`<div class="authors">${e}</div>`:""}
        ${a?n`<div class="journal">${a}</div>`:""}
        
        ${s?n`<div class="abstract">${s}</div>`:""}
        
        <div class="footer">
          <div class="tags">
            ${o==null?void 0:o.slice(0,3).map(p=>n`
              <span class="tag" style="background: ${p.color}20; color: ${p.color};">
                ${p.name}
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
    `}};ie.styles=y`
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
  `;Fe([A({type:Object})],ie.prototype,"paper",2);Fe([c()],ie.prototype,"showConfirm",2);ie=Fe([x("paper-card")],ie);var Bt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,ut=(t,e,a,r)=>{for(var s=r>1?void 0:r?Kt(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Bt(e,a,s),s};let me=class extends g{constructor(){super(...arguments),this.papers=[]}render(){return n`
      <div class="grid">
        ${this.papers.map(t=>n`
          <paper-card .paper=${t} @delete=${()=>this.dispatchEvent(new CustomEvent("delete"))}></paper-card>
        `)}
      </div>
    `}};me.styles=y`
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
  `;ut([A({type:Array})],me.prototype,"papers",2);me=ut([x("paper-grid")],me);var Wt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,P=(t,e,a,r)=>{for(var s=r>1?void 0:r?Jt(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Wt(e,a,s),s};let S=class extends g{constructor(){super(...arguments),this.folders=[],this.file=null,this.paperTitle="",this.authors="",this.abstract="",this.journal="",this.year="",this.doi="",this.folderId="",this.loading=!1,this.error=""}close(){this.dispatchEvent(new CustomEvent("close"))}onFileChange(t){var a;const e=t.target;(a=e.files)!=null&&a[0]&&(this.file=e.files[0],this.paperTitle||(this.paperTitle=this.file.name.replace(/\.pdf$/i,"")))}async submit(t){if(t.preventDefault(),!this.file){this.error="Please select a PDF file";return}this.loading=!0,this.error="";try{const e=new FormData;e.append("file",this.file),e.append("title",this.paperTitle),e.append("authors",this.authors),e.append("abstract",this.abstract),e.append("journal",this.journal),this.year&&e.append("year",this.year),e.append("doi",this.doi),this.folderId&&e.append("folder_id",this.folderId),await M.uploadPaper(e),this.dispatchEvent(new CustomEvent("upload"))}catch(e){this.error=e.message}finally{this.loading=!1}}render(){return n`
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
    `}};S.styles=y`
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
  `;P([A({type:Array})],S.prototype,"folders",2);P([c()],S.prototype,"file",2);P([c()],S.prototype,"paperTitle",2);P([c()],S.prototype,"authors",2);P([c()],S.prototype,"abstract",2);P([c()],S.prototype,"journal",2);P([c()],S.prototype,"year",2);P([c()],S.prototype,"doi",2);P([c()],S.prototype,"folderId",2);P([c()],S.prototype,"loading",2);P([c()],S.prototype,"error",2);S=P([x("paper-uploader")],S);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gt={CHILD:2},Vt=t=>(...e)=>({_$litDirective$:t,values:e});class Xt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,a,r){this._$Ct=e,this._$AM=a,this._$Ci=r}_$AS(e,a){return this.update(e,a)}update(e,a){return this.render(...a)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class De extends Xt{constructor(e){if(super(e),this.it=u,e.type!==Gt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this._t=void 0,this.it=e;if(e===L)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const a=[e];return a.raw=a,this._t={_$litType$:this.constructor.resultType,strings:a,values:[]}}}De.directiveName="unsafeHTML",De.resultType=1;const Yt=Vt(De);var Qt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,we=(t,e,a,r)=>{for(var s=r>1?void 0:r?Zt(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Qt(e,a,s),s};let Y=class extends g{constructor(){super(...arguments),this.label="",this.value=0,this.icon="file"}getIcon(){const t={"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'};return t[this.icon]||t["file-text"]}render(){return n`
      <div class="card">
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${Yt(this.getIcon())}
          </svg>
        </div>
        <div class="info">
          <div class="value">${this.value}</div>
          <div class="label">${this.label}</div>
        </div>
      </div>
    `}};Y.styles=y`
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
  `;we([A({type:String})],Y.prototype,"label",2);we([A({type:Number})],Y.prototype,"value",2);we([A({type:String})],Y.prototype,"icon",2);Y=we([x("stat-card")],Y);var ea=Object.defineProperty,ta=Object.getOwnPropertyDescriptor,ne=(t,e,a,r)=>{for(var s=r>1?void 0:r?ta(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&ea(e,a,s),s};let U=class extends g{constructor(){super(...arguments),this.completedStages=[],this.canAdvance=!0,this.canRollback=!0}get stages(){return[{key:"INTAKE",label:"Intake",description:"校验输入、建立上下文",agent:"Orchestrator"},{key:"LITERATURE",label:"Literature",description:"文献检索、证据沉淀",agent:"Agent A"},{key:"OUTLINE",label:"Outline",description:"确定结构、论证路径",agent:"Agent A"},{key:"DATA_REQUIREMENTS",label:"Data Req.",description:"算例需求、数据映射",agent:"Agent B"},{key:"DRAFTING",label:"Drafting",description:"章节草稿、无缺段检查",agent:"Agent C"},{key:"POLISHING",label:"Polishing",description:"PoF风格润色",agent:"Agent C"},{key:"REVIEW",label:"Review",description:"质量门禁、返工决策",agent:"Orchestrator"},{key:"FINALIZE",label:"Finalize",description:"固化产物、投稿封装",agent:"Orchestrator"}]}isCompleted(t){return this.completedStages.includes(t)}isCurrent(t){return t===this.currentStage}canPreviewStage(t){const e=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"],a=e.indexOf(this.currentStage);return e.indexOf(t)<=a+1}previewStage(){this.dispatchEvent(new CustomEvent("preview-stage"))}advanceStage(){this.dispatchEvent(new CustomEvent("advance-stage"))}rollbackStage(){this.dispatchEvent(new CustomEvent("rollback-stage"))}selectStage(t){this.canPreviewStage(t)&&this.dispatchEvent(new CustomEvent("select-stage",{detail:t}))}render(){const t=this.stages.find(e=>e.key===this.currentStage);return n`
      <section class="wrap">
        <div class="stages">
          ${this.stages.map(e=>{const a=this.isCurrent(e.key),r=this.isCompleted(e.key),s=this.canPreviewStage(e.key);return n`
              <article 
                class="stage ${a?"current":""} ${r?"completed":""} ${s&&!a?"previewable":""}"
                @click=${()=>this.selectStage(e.key)}
              >
                <div class="stage-name">
                  <span class="stage-label">${e.label}</span>
                  ${a?n`<span class="badge current">当前</span>`:r?n`<span class="badge">已完成</span>`:s?n`<span class="badge preview">可预览</span>`:""}
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
    `}};U.styles=y`
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
  `;ne([A({type:String})],U.prototype,"currentStage",2);ne([A({type:Array})],U.prototype,"completedStages",2);ne([A({type:Boolean})],U.prototype,"canAdvance",2);ne([A({type:Boolean})],U.prototype,"canRollback",2);U=ne([x("stage-navigator")],U);var aa=Object.defineProperty,ra=Object.getOwnPropertyDescriptor,b=(t,e,a,r)=>{for(var s=r>1?void 0:r?ra(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&aa(e,a,s),s};const C="http://localhost:8080",gt="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function sa(){return{"X-Api-Key":gt,"Content-Type":"application/json"}}function E(t,e={}){return fetch(t,{...e,headers:{...sa(),...e.headers||{}}})}let h=class extends g{constructor(){super(...arguments),this.taskId=null,this.paperMetadata=null,this.paperTabIndex=0,this.paperList=[],this.selectedPaperIndex=0,this.taskStatus=null,this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null},this.feedbackHistory=[],this.currentFeedback="",this.dragover=!1,this.debugMode=!1,this.debugLogs=[],this.apiConnected=!1,this.apiChecking=!0,this.errorMessage="",this.pollInterval=null}connectedCallback(){super.connectedCallback(),this.checkApiConnection(),setTimeout(()=>this.loadExistingTask(),100)}saveTaskId(t){t?localStorage.setItem("paper-dashboard-workflow-task-id",t):localStorage.removeItem("paper-dashboard-workflow-task-id")}loadTaskId(){return localStorage.getItem("paper-dashboard-workflow-task-id")||localStorage.getItem("paper-dashboard-task-id")}async loadExistingTask(){let t=0;for(;!this.apiConnected&&t<50;)await new Promise(a=>setTimeout(a,100)),t++;if(!this.apiConnected){this.debug("warn","loadExistingTask_apiNotConnected");return}this.debug("log","loadExistingTask_start");const e=this.loadTaskId();if(e)try{const a=await E(`${C}/api/tasks/${e}/status`);if(a.ok){const r=await a.json();this.taskId=e,this.taskStatus=r,r.stage_status==="waiting_confirm"&&(await this.loadTopics(),await this.loadPaperMetadata()),this.startPolling(),this.debug("log","loadExistingTask_restored",{taskId:e,status:r}),this.dispatchEvent(new CustomEvent("task-loaded",{detail:{taskId:e,status:r},bubbles:!0,composed:!0}));return}}catch(a){console.error("[ConfigStage] Failed to restore saved task:",a),this.saveTaskId(null)}this.debug("log","loadExistingTask_noTask",{message:"No saved task found, starting fresh"}),this.taskId=null,this.taskStatus=null,this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null}}disconnectedCallback(){super.disconnectedCallback(),this.pollInterval&&clearInterval(this.pollInterval)}async checkApiConnection(){this.apiChecking=!0;try{(await fetch(`${C}/api/health`)).ok?(this.apiConnected=!0,this.debug("log","apiConnected")):(this.apiConnected=!1,this.debug("warn","apiDisconnected"))}catch{this.apiConnected=!1,this.debug("warn","apiDisconnected")}this.apiChecking=!1}async createTask(){if(console.log("[ConfigStage] createTask called"),this.errorMessage="",!this.apiConnected){console.log("[ConfigStage] Waiting for API connection...");let t=0;for(;!this.apiConnected&&t<50;)await new Promise(e=>setTimeout(e,100)),t++;if(!this.apiConnected){this.errorMessage="后端服务未连接，请检查网络后重试",console.error("[ConfigStage] API not connected after waiting");return}}console.log("[ConfigStage] API connected, creating task"),this.taskId=null,this.taskStatus=null,this.paperMetadata=null,this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null},this.saveTaskId(null);try{console.log("[ConfigStage] Calling POST /api/tasks");const t=await E(`${C}/api/tasks`,{method:"POST"});if(t.ok){const e=await t.json();console.log("[ConfigStage] Task created:",e.task_id),this.taskId=e.task_id,this.saveTaskId(e.task_id),this.taskStatus=e.status,this.startPolling(),this.notifyReadyState()}else{const e=await t.text();console.error("[ConfigStage] Create task failed:",t.status,e),this.errorMessage=`创建任务失败: HTTP ${t.status}`}}catch(t){console.error("[ConfigStage] Create task exception:",t),this.errorMessage=`创建任务失败: ${t.message}`}}startPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=window.setInterval(()=>{this.checkStatus()},2e3)}async checkStatus(){var t;if(this.taskId)try{const e=await E(`${C}/api/tasks/${this.taskId}/status`);e.ok&&(this.taskStatus=await e.json(),((t=this.taskStatus)==null?void 0:t.stage_status)==="waiting_confirm"&&(await this.loadTopics(),await this.loadPaperMetadata()),this.notifyReadyState())}catch(e){console.error("Status check failed:",e)}}async loadTopics(){if(this.taskId)try{const t=await E(`${C}/api/tasks/${this.taskId}/topics`);if(t.ok){const e=await t.json();Array.isArray(e.topics)?this.topics=e.topics:e.topics&&typeof e.topics=="object"?this.topics=[e.topics]:this.topics=[]}}catch(t){console.error("Failed to load topics:",t)}}async loadPaperMetadata(){var t;if(this.taskId)try{const e=await E(`${C}/api/tasks/${this.taskId}/metadata`);if(e.ok){const a=await e.json();if(a.papers&&a.papers.length>0){this.paperList=a.papers.map(s=>{var i;return{filename:s.filename,pageCount:(i=s.metadata)==null?void 0:i.pageCount}});const r=Math.min(this.selectedPaperIndex,a.papers.length-1);this.paperMetadata=((t=a.papers[r])==null?void 0:t.metadata)||null}else this.paperList=[],this.paperMetadata=null}}catch(e){console.error("Failed to load paper metadata:",e)}}selectPaper(t){this.selectedPaperIndex=t,this.loadPaperMetadata()}debug(t,e,a){const r={timestamp:Date.now(),level:t,action:e,data:a};console[t]("[ConfigStage]",e,a),this.debugMode&&(this.debugLogs=[...this.debugLogs.slice(-99),r],this.requestUpdate()),this.dispatchEvent(new CustomEvent("debug-log",{detail:r,bubbles:!0,composed:!0}))}toggleDebug(){this.debugMode=!this.debugMode,this.debugLogs=[]}clearDebugLogs(){this.debugLogs=[]}notifyReadyState(){var e;const t=((e=this.taskStatus)==null?void 0:e.stage_status)==="waiting_confirm"&&this.selectedTopic.title.trim().length>0;this.dispatchEvent(new CustomEvent("config-ready-change",{detail:!!t}))}onReferenceFileInput(t){const e=t.target;!e.files||e.files.length===0||(this.uploadPapers(Array.from(e.files)),e.value="")}onDrop(t){var a;t.preventDefault(),this.dragover=!1;const e=(a=t.dataTransfer)==null?void 0:a.files;!e||e.length===0||this.uploadPapers(Array.from(e).filter(r=>r.name.endsWith(".pdf")))}onDragOver(t){t.preventDefault(),this.dragover=!0}onDragLeave(){this.dragover=!1}async uploadPapers(t){if(console.log("[ConfigStage] uploadPapers called with",t.length,"files"),t.length!==0){if(!this.taskId){console.log("[ConfigStage] No taskId, creating task first...");try{await this.createTask(),console.log("[ConfigStage] Task created, taskId:",this.taskId),this.taskId&&await this.doUpload(t)}catch(e){console.error("[ConfigStage] createTask failed:",e)}return}this.doUpload(t)}}async doUpload(t){console.log("[ConfigStage] doUpload called with",t.length,"files, taskId:",this.taskId);for(const e of t)try{const a=new FormData;if(a.append("paper",e),!(await fetch(`${C}/api/tasks/${this.taskId}/papers`,{headers:{"X-Api-Key":gt},method:"POST",body:a})).ok)throw new Error("Upload failed")}catch(a){this.errorMessage=`上传失败: ${a.message}`}await this.triggerOpenClawSession()}async triggerOpenClawSession(){if(this.taskId){this.errorMessage="";try{if(this.taskStatus&&(this.taskStatus={...this.taskStatus,stage_status:"processing",messages:[...this.taskStatus.messages,{timestamp:new Date().toISOString(),from:"system",content:"正在启动 OpenClaw Session 进行论文分析..."}]}),!(await E(`${C}/api/tasks/${this.taskId}/trigger`,{method:"POST"})).ok)throw new Error("Trigger failed");this.startPolling()}catch(t){this.errorMessage=`触发失败: ${t.message}`}}}selectTopic(t){this.selectedTopicId=t.id??null,this.selectedTopic={title:t.title,researchObjective:`针对 "${t.title}" 的核心问题，建立理论模型并进行数值验证。`,expectedContribution:"提出一种可行的研究方案，产出具有创新性的学术成果。",selectedCandidateId:t.id??null},this.notifyReadyState()}async submitFeedback(){!this.currentFeedback.trim()||!this.selectedTopicId||(this.feedbackHistory=[...this.feedbackHistory,{feedback:this.currentFeedback.trim(),timestamp:new Date}],this.taskId&&await E(`${C}/api/tasks/${this.taskId}/messages`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"feedback",data:{feedback:this.currentFeedback,topicId:this.selectedTopicId}})}),this.currentFeedback="",this.errorMessage="反馈已提交，OpenClaw 正在处理...")}regenerateTopics(){this.errorMessage="正在重新生成选题..."}updateTopicField(t,e){this.selectedTopic={...this.selectedTopic,[t]:e},this.notifyReadyState()}async confirmTopic(){if(!this.selectedTopic.title.trim()){this.errorMessage="请先选择一个选题或输入论文标题";return}this.taskId&&await E(`${C}/api/tasks/${this.taskId}/topics`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:this.selectedTopic})}),this.notifyReadyState(),this.dispatchEvent(new CustomEvent("topic-confirmed",{detail:{topic:this.selectedTopic,taskId:this.taskId}}))}get progressPercent(){var a;if(!((a=this.taskStatus)!=null&&a.progress))return 0;const{papers_processed:t,papers_total:e}=this.taskStatus.progress;return e>0?Math.round(t/e*100):0}get uploadedPapersCount(){var t,e;return((e=(t=this.taskStatus)==null?void 0:t.progress)==null?void 0:e.papers_total)||0}render(){var i,o,p,d,v,f;const t=!!this.taskId,e=this.topics.length>0,a=((i=this.taskStatus)==null?void 0:i.stage_status)==="processing",r=((o=this.taskStatus)==null?void 0:o.stage_status)==="waiting_confirm",s=((p=this.taskStatus)==null?void 0:p.stage_status)==="error";return n`
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
                  <span class="status ${a?"processing":"uploaded"}">
                    ${a?"分析中":"待处理"}
                  </span>
                </div>
              </div>
            `:n`
              <div class="empty">尚未创建任务</div>
            `}
          </div>

          ${this.paperMetadata?n`
            <div class="paper-preview">
              <h4>📄 论文预览</h4>
              <div class="preview-section">
                <div class="preview-label">标题</div>
                <div class="preview-value title">${this.paperMetadata.title||"未知"}</div>
              </div>
              ${this.paperMetadata.authors?n`
                <div class="preview-section">
                  <div class="preview-label">作者</div>
                  <div class="preview-value">${this.paperMetadata.authors}</div>
                </div>
              `:""}
              ${this.paperMetadata.abstract?n`
                <div class="preview-section">
                  <div class="preview-label">摘要</div>
                  <div class="preview-value abstract">${this.paperMetadata.abstract}</div>
                </div>
              `:""}
              ${(d=this.paperMetadata.keywords)!=null&&d.length?n`
                <div class="preview-section">
                  <div class="preview-label">关键词</div>
                  <div class="preview-value">
                    ${this.paperMetadata.keywords.map(l=>n`<span class="keyword-tag">${l}</span>`)}
                  </div>
                </div>
              `:""}
              ${(v=this.paperMetadata.analysisRecords)!=null&&v.length?n`
                <div class="preview-section">
                  <div class="preview-label">分析记录</div>
                  <div class="preview-value analysis-records">
                    ${this.paperMetadata.analysisRecords.map(l=>n`
                      <div class="record-item ${l.type}">${l.content}</div>
                    `)}
                  </div>
                </div>
              `:""}
            </div>
          `:""}

          <button @click=${()=>{var l,$;return($=(l=this.shadowRoot)==null?void 0:l.querySelector("label.dropzone input"))==null?void 0:$.click()}}>
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
          
          ${a?n`
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
          `:r&&e?n`
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
                    ${this.feedbackHistory.map((l,$)=>n`
                      <div class="feedback-item">
                        <span class="round">第 ${$+1} 轮反馈：</span>
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
          `:s?n`
            <div class="empty" style="border-color: #fee2e2; color: #991b1b;">
              处理出错：${((f=this.taskStatus)==null?void 0:f.error)||"未知错误"}
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
    `}};h.styles=y`
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

    .upload-panel {
      background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 100%);
    }

    .preview-panel {
      background: var(--color-surface);
    }

    .topics-panel {
      background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 100%);
    }

    .paper-selector {
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-border-light);
    }

    .selector-label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .paper-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .paper-tab {
      padding: var(--space-1) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      font-size: var(--text-xs);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .paper-tab:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .paper-tab.active {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    .paper-preview-mini {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .preview-header {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-2);
    }

    .preview-authors {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }

    .preview-abstract {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      line-height: 1.5;
      max-height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .preview-keywords {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
      margin-top: var(--space-2);
    }

    .kw {
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 2px 6px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
    }

    .empty-papers {
      text-align: center;
      padding: var(--space-4);
      color: var(--color-text-tertiary);
      font-size: var(--text-sm);
    }

    .upload-status {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-3);
      background: var(--color-bg);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-border);
    }

    .status-dot.done {
      background: #10b981;
    }

    .status-dot.processing {
      background: #f59e0b;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .processing-text {
      color: #f59e0b;
      font-weight: 600;
    }

    .paper-tabs {
      margin-bottom: var(--space-3);
    }

    .tabs-list {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: var(--space-1) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      font-size: var(--text-xs);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .tab-btn:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .tab-btn.active {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    .empty-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-8);
      text-align: center;
      color: var(--color-text-tertiary);
    }

    .empty-preview .empty-icon {
      font-size: 48px;
      margin-bottom: var(--space-3);
      opacity: 0.5;
    }

    .empty-preview p {
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
    }

    .paper-preview {
      display: grid;
      gap: var(--space-3);
    }

    .preview-section {
      display: grid;
      gap: var(--space-1);
    }

    .preview-label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .preview-value {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      line-height: 1.6;
    }

    .preview-value.title {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .preview-value.abstract {
      max-height: 150px;
      overflow-y: auto;
      background: var(--color-bg);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      text-align: justify;
    }

    .preview-value.keywords {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .keyword-tag {
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: var(--text-xs);
      font-weight: 600;
    }

    .analysis-records {
      background: var(--color-bg);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
    }

    .record-item {
      padding: var(--space-1) 0;
      border-bottom: 1px solid var(--color-border-light);
      color: var(--color-text-secondary);
    }

    .record-item:last-child {
      border-bottom: none;
    }

    .record-item.info {
      color: var(--color-accent);
    }

    .record-item.error {
      color: #ef4444;
    }

    .message-log {
      margin-top: var(--space-4);
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
    }

    .message-log strong {
      display: block;
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
    }

    .message-item {
      display: flex;
      gap: var(--space-2);
      font-size: var(--text-xs);
      padding: var(--space-1) 0;
    }

    .message-time {
      color: var(--color-text-tertiary);
      flex-shrink: 0;
    }

    .message-content {
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

    .paper-preview {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      margin-top: var(--space-3);
      max-height: 400px;
      overflow-y: auto;
    }

    .paper-preview h4 {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-3);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--color-border-light);
    }

    .preview-section {
      margin-bottom: var(--space-3);
    }

    .preview-label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-tertiary);
      margin-bottom: 2px;
    }

    .preview-value {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      line-height: 1.5;
    }

    .preview-value.title {
      font-weight: 700;
      font-size: var(--text-base);
    }

    .preview-value.abstract {
      max-height: 150px;
      overflow-y: auto;
      background: var(--color-surface);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      text-align: justify;
    }

    .preview-value .keyword-tag {
      display: inline-block;
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: var(--text-xs);
      margin: 2px 4px 2px 0;
      font-weight: 600;
    }

    .analysis-records {
      background: var(--color-surface);
      padding: var(--space-2);
      border-radius: var(--radius-md);
    }

    .record-item {
      font-size: var(--text-xs);
      padding: 4px 0;
      border-bottom: 1px solid var(--color-border-light);
    }

    .record-item:last-child {
      border-bottom: none;
    }

    .record-item.info {
      color: var(--color-accent);
    }

    .record-item.error {
      color: #ef4444;
    }

    @media (max-width: 1280px) {
      .layout { grid-template-columns: 1fr; }
      .panel { min-height: auto; }
    }
  `;b([c()],h.prototype,"taskId",2);b([c()],h.prototype,"paperMetadata",2);b([c()],h.prototype,"paperTabIndex",2);b([c()],h.prototype,"paperList",2);b([c()],h.prototype,"selectedPaperIndex",2);b([c()],h.prototype,"taskStatus",2);b([c()],h.prototype,"topics",2);b([c()],h.prototype,"selectedTopicId",2);b([c()],h.prototype,"selectedTopic",2);b([c()],h.prototype,"feedbackHistory",2);b([c()],h.prototype,"currentFeedback",2);b([c()],h.prototype,"dragover",2);b([c()],h.prototype,"debugMode",2);b([c()],h.prototype,"debugLogs",2);b([c()],h.prototype,"apiConnected",2);b([c()],h.prototype,"apiChecking",2);b([c()],h.prototype,"errorMessage",2);h=b([x("config-stage")],h);var ia=Object.defineProperty,oa=Object.getOwnPropertyDescriptor,I=(t,e,a,r)=>{for(var s=r>1?void 0:r?oa(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&ia(e,a,s),s};const _e="http://192.168.1.161:8080",na="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a",Ze="/home/nothingts/paper-dashboard/shared/papers";function ca(){return{"X-Api-Key":na,"Content-Type":"application/json"}}function Pe(t,e={}){return fetch(t,{...e,headers:{...ca(),...e.headers||{}}})}let w=class extends g{constructor(){super(...arguments),this.taskId=null,this.taskStatus=null,this.selectedTopic=null,this.literature=[],this.selectedLitId=null,this.searchQuery="",this.activeFilter="all",this.isAnalyzing=!1,this.analysisProgress=0,this.gapAnalysis=[],this.evidenceSummary="",this.readyForOutline=!1}connectedCallback(){super.connectedCallback(),this.loadExistingTask()}async loadExistingTask(){this.taskId=localStorage.getItem("paper-dashboard-task-id"),this.taskId||(this.taskId=localStorage.getItem("paper-dashboard-workflow-task-id")),this.taskId&&(await this.loadTaskStatus(),await this.loadLiteratureResults())}async loadTaskStatus(){if(this.taskId)try{const t=await Pe(`${_e}/api/tasks/${this.taskId}/status`);t.ok&&(this.taskStatus=await t.json());const e=await Pe(`${_e}/api/tasks/${this.taskId}/topics`);if(e.ok){const a=await e.json();if(a.topic)this.selectedTopic=a.topic;else if(a.topics){const r=a.topics;Array.isArray(r)?this.selectedTopic=r[0]:r.topics&&(this.selectedTopic=r.topics[0])}}}catch(t){console.error("[LiteratureStage] loadTaskStatus error:",t)}}async loadLiteratureResults(){if(this.taskId)try{const t=await fetch(`file://${Ze}/${this.taskId}/stages/literature.json`);if(t.ok){const e=await t.json();e.literature&&(this.literature=e.literature),e.gapAnalysis&&(this.gapAnalysis=e.gapAnalysis),e.evidenceSummary&&(this.evidenceSummary=e.evidenceSummary),e.readyForOutline&&(this.readyForOutline=e.readyForOutline)}}catch{}}async saveLiteratureResults(){if(this.taskId)try{await fetch(`file://${Ze}/${this.taskId}/stages`,{method:"MKCOL"}).catch(()=>{});const t={taskId:this.taskId,stage:"LITERATURE",timestamp:new Date().toISOString(),literature:this.literature,gapAnalysis:this.gapAnalysis,evidenceSummary:this.evidenceSummary,readyForOutline:this.readyForOutline};await Pe(`${_e}/api/stages/literature`,{method:"POST",body:JSON.stringify({...t,taskId:this.taskId})}).catch(()=>{})}catch(t){console.error("[LiteratureStage] saveLiteratureResults error:",t)}}async triggerLiteratureAnalysis(){var e;if(!this.taskId)return;this.isAnalyzing=!0,this.analysisProgress=0;const t=setInterval(()=>{this.analysisProgress=Math.min(this.analysisProgress+Math.random()*15,95),this.analysisProgress>=95&&clearInterval(t)},500);try{await new Promise(r=>setTimeout(r,3e3));const a=((e=this.selectedTopic)==null?void 0:e.title)||"研究主题";this.literature=this.generateLiterature(a),this.gapAnalysis=this.generateGapAnalysis(a),this.evidenceSummary=`基于 ${this.literature.length} 篇核心文献的综合分析，涵盖该领域的主要理论基础和方法论框架。`,this.analysisProgress=100,this.isAnalyzing=!1,this.saveLiteratureResults(),this.dispatchEvent(new CustomEvent("literature-ready",{detail:{literature:this.literature,taskId:this.taskId}}))}catch(a){console.error("[LiteratureStage] analysis error:",a),this.isAnalyzing=!1}}generateLiterature(t){return[{paperId:"lit-001",title:"Deep Learning for Turbulent Flow Prediction: A Comprehensive Survey",authors:"Chen, W., Liu, Y., Wang, J.",year:2024,venue:"Journal of Computational Physics",relevance:95,keyFindings:["CNN-based methods show 40% improvement over RANS models","Transformer architectures capture long-range flow dependencies"],contribution:"系统综述了深度学习在湍流预测中的应用，评估了各种架构的优劣",methodology:"文献综述 + 数值实验对比",citedBy:156,references:["Reynolds-Averaged Navier-Stokes","Large Eddy Simulation","Physics-informed Neural Networks"],notes:"",tagged:!1},{paperId:"lit-002",title:"Physics-Informed Neural Networks for Incompressible Navier-Stokes Equations",authors:"Raissi, M., Perdikaris, P., Karniadakis, G.E.",year:2019,venue:"Journal of Computational Physics",relevance:90,keyFindings:["PINNs enforce governing equations as soft constraints","Successfully recovered pressure fields from sparse velocity data"],contribution:"提出物理信息神经网络框架，将N-S方程作为损失函数正则项",methodology:"神经网络 + 物理约束",citedBy:2847,references:["Navier-Stokes Equations","Automatic Differentiation","Spectral Methods"],notes:"",tagged:!1},{paperId:"lit-003",title:"Super-resolution Reconstruction of Turbulent Flow Fields Using Generative Adversarial Networks",authors:"Fukami, K., Fukagata, K., Taira, K.",year:2021,venue:"Journal of Fluid Mechanics",relevance:88,keyFindings:["GAN-based super-resolution achieves 95% accuracy at 8x upsampling","Training on DNS data generalizes to experimental scenarios"],contribution:"利用GAN实现湍流场超分辨率重建，显著提升计算效率",methodology:"深度卷积生成对抗网络 + DNS训练数据",citedBy:423,references:["Direct Numerical Simulation","Convolutional Neural Networks","Super-resolution"],notes:"",tagged:!1},{paperId:"lit-004",title:"Encoder-Decoder Networks for Turbulent Flow Prediction at High Reynolds Numbers",authors:"Jiang, C., Zhang, R., Li, H.",year:2023,venue:"Physics of Fluids",relevance:85,keyFindings:["U-Net architecture effectively captures multi-scale turbulent structures","Attention mechanisms improve prediction stability"],contribution:"编码器-解码器架构在大尺度湍流模拟中的适用性分析",methodology:"U-Net + 注意力机制",citedBy:198,references:["U-Net Architecture","Multi-scale Modeling","Reynolds Number Effects"],notes:"",tagged:!1},{paperId:"lit-005",title:"Spectral Analysis of Turbulent Flows Using Wavelet Transforms and Deep Learning",authors:"Germano, M., Morgan, J., Weatheritt, J.",year:2022,venue:"Journal of Turbulence",relevance:82,keyFindings:["Wavelet decomposition reveals scale interactions in turbulent cascade","Hybrid wavelet-DL model outperforms pure Fourier-based methods"],contribution:"结合小波变换和深度学习的谱分析方法",methodology:"小波变换 + 深度神经网络",citedBy:134,references:["Wavelet Transform","Energy Cascade","Scale Interaction"],notes:"",tagged:!1},{paperId:"lit-006",title:"Adaptive Mesh Refinement for DNS of Transitional Turbulent Flows",authors:"Hassan, O., Morgan, K., Weatheritt, J.",year:2020,venue:"Computers & Fluids",relevance:78,keyFindings:["AMR reduces DNS computational cost by 60% while maintaining accuracy","Dynamic refinement criteria based on vorticity magnitude"],contribution:"自适应网格细化方法在大涡模拟中的应用",methodology:"自适应网格 + 直接数值模拟",citedBy:267,references:["Adaptive Mesh Refinement","Vorticity","Computational Efficiency"],notes:"",tagged:!1}]}generateGapAnalysis(t){return["现有深度学习模型在极端雷诺数下的泛化能力缺乏系统评估","物理约束与数据驱动的结合方式尚未最优","缺乏对不确定性量化（UQ）的系统讨论","端到端训练范式难以解释中间过程的物理意义","小样本学习场景下的模型鲁棒性研究不足"]}selectLiterature(t){this.selectedLitId=t}toggleTag(t){this.literature=this.literature.map(e=>e.paperId===t?{...e,tagged:!e.tagged}:e),this.saveLiteratureResults()}updateNotes(t,e){this.literature=this.literature.map(a=>a.paperId===t?{...a,notes:e}:a),this.saveLiteratureResults()}get filteredLiterature(){let t=this.literature;if(this.searchQuery){const e=this.searchQuery.toLowerCase();t=t.filter(a=>a.title.toLowerCase().includes(e)||a.authors.toLowerCase().includes(e)||a.keyFindings.some(r=>r.toLowerCase().includes(e)))}return this.activeFilter==="tagged"?t=t.filter(e=>e.tagged):this.activeFilter==="high-relevance"&&(t=t.filter(e=>e.relevance>=85)),t.sort((e,a)=>a.relevance-e.relevance)}confirmLiteratureReady(){this.readyForOutline=!0,this.saveLiteratureResults(),this.dispatchEvent(new CustomEvent("advance-stage",{detail:{stage:"OUTLINE"}}))}get selectedLiteratureItem(){return this.literature.find(t=>t.paperId===this.selectedLitId)||null}get progressPercent(){return this.literature.length===0?0:Math.min(Math.round(this.literature.filter(t=>t.notes).length/this.literature.length*100),100)}render(){var a;const t=this.literature.length>0,e=this.selectedLiteratureItem;return n`
      <section class="layout">
        <article class="panel">
          <h3><span class="step">A</span>研究主题 ${this.taskId?n`<span class="task-id">${this.taskId.substring(0,8)}...</span>`:""}</h3>
          ${this.selectedTopic?n`
            <div class="topic-brief">
              <div class="topic-brief-title">📌 ${this.selectedTopic.title||"论文主题"}</div>
              <p><strong>研究目标：</strong>${this.selectedTopic.researchObjective||"待确定"}</p>
              <p style="margin-top: 4px;"><strong>预期贡献：</strong>${this.selectedTopic.expectedContribution||"待确定"}</p>
            </div>
          `:n`<div class="empty" style="font-size: var(--text-xs);">暂无研究主题信息</div>`}
          <h3 style="margin-top: var(--space-2);"><span class="step">B</span>文献检索</h3>
          ${t?n`
            <div class="search-box">
              <input type="text" placeholder="搜索文献标题、作者..." .value=${this.searchQuery} @input=${r=>this.searchQuery=r.target.value}>
            </div>
            <div class="filter-row">
              <span class="filter-tag ${this.activeFilter==="all"?"active":""}" @click=${()=>this.activeFilter="all"}>全部</span>
              <span class="filter-tag ${this.activeFilter==="high-relevance"?"active":""}" @click=${()=>this.activeFilter="high-relevance"}>高相关</span>
              <span class="filter-tag ${this.activeFilter==="tagged"?"active":""}" @click=${()=>this.activeFilter="tagged"}>已标记</span>
            </div>
            <div class="lit-list">
              ${this.filteredLiterature.map(r=>n`
                <div class="lit-item ${r.paperId===this.selectedLitId?"selected":""}" @click=${()=>this.selectLiterature(r.paperId)}>
                  <div class="lit-title">${r.title}</div>
                  <div class="lit-meta">${r.authors} · ${r.year} · ${r.venue}</div>
                  <div style="display: flex; align-items: center; gap: var(--space-2); margin-top: 4px;">
                    <span class="lit-relevance">⚡ ${r.relevance}%</span>
                    <button class="tag-btn ${r.tagged?"active":""}" @click=${s=>{s.stopPropagation(),this.toggleTag(r.paperId)}}>${r.tagged?"★ 已标记":"☆ 标记"}</button>
                  </div>
                </div>
              `)}
            </div>
            <button class="secondary" style="width: 100%;" @click=${this.triggerLiteratureAnalysis}>🔄 重新分析</button>
            ${(a=this.taskStatus)!=null&&a.messages?n`
              <div class="message-log">
                <strong style="font-size: 10px; color: var(--color-text-tertiary);">处理日志</strong>
                ${this.taskStatus.messages.slice(-3).map(r=>n`<div class="message-item"><span class="message-time">${new Date(r.timestamp).toLocaleTimeString()}</span><span class="message-from">${r.from==="system"?"系统":r.from}</span><div class="message-content">${r.content}</div></div>`)}
              </div>
            `:""}
          `:n`
            <p>点击"开始文献分析"，AI 将基于研究主题检索相关论文。</p>
            ${this.isAnalyzing?n`
              <div class="processing">
                <div class="processing-spinner"></div>
                <div>AI 正在分析文献...</div>
                <div class="progress-track"><div class="progress-fill" style="width: ${this.analysisProgress}%"></div></div>
                <div style="font-size: var(--text-xs); margin-top: var(--space-2);">${Math.round(this.analysisProgress)}% 完成</div>
              </div>
            `:n`<button class="primary" style="width: 100%;" @click=${this.triggerLiteratureAnalysis}>🔍 开始文献分析</button>`}
          `}
        </article>
        <article class="panel">
          <h3><span class="step">C</span>证据沉淀与缺口分析</h3>
          ${t?n`
            <div class="evidence-list">
              ${this.filteredLiterature.filter(r=>r.tagged).length===0?n`<div class="empty" style="margin-bottom: var(--space-3);">请在左侧标记重要文献以添加到证据库</div>`:this.filteredLiterature.filter(r=>r.tagged).map(r=>n`<div class="evidence-item"><div class="evidence-type">📄 ${r.venue} (${r.year})</div><div class="evidence-content">${r.contribution}</div><div class="evidence-source">引用: ${r.citedBy} · 方法: ${r.methodology}</div></div>`)}
            </div>
            <div class="gap-analysis">
              <h4>⚠️ 研究缺口 (Research Gaps)</h4>
              ${this.gapAnalysis.map(r=>n`<div class="gap-item"><span class="gap-bullet">▸</span><span class="gap-text">${r}</span></div>`)}
            </div>
            ${this.evidenceSummary?n`
              <div class="summary-section">
                <h4>📊 综合分析结论</h4>
                <div class="summary-row"><span class="summary-label">核心发现</span><span class="summary-value">${this.evidenceSummary}</span></div>
                <div class="summary-row"><span class="summary-label">文献覆盖</span><span class="summary-value">${this.literature.length} 篇核心文献 · ${this.literature.filter(r=>r.tagged).length} 篇已标记</span></div>
              </div>
            `:""}
            <div class="confirm-section">
              <h4>✅ 证据沉淀完成</h4>
              <div class="progress-track"><div class="progress-fill" style="width: ${this.progressPercent}%"></div></div>
              <p style="font-size: var(--text-xs); color: #065f46; margin-top: var(--space-2); margin-bottom: var(--space-3);">已标注 ${this.literature.filter(r=>r.notes).length}/${this.literature.length} 篇文献笔记</p>
              <button class="primary" style="width: 100%;" @click=${this.confirmLiteratureReady}>确认进入 Outline 阶段 →</button>
            </div>
          `:n`<div class="empty">请先在左侧完成文献检索</div>`}
        </article>
        <article class="panel">
          <h3><span class="step">D</span>文献详情与笔记</h3>
          ${e?n`
            <div>
              <div class="detail-title">${e.title}</div>
              <div class="detail-meta">${e.authors} · ${e.year} · ${e.venue}</div>
              <div class="detail-section"><div class="detail-label">关键发现</div><div>${e.keyFindings.map(r=>n`<span class="finding-tag">${r}</span>`)}</div></div>
              <div class="detail-section"><div class="detail-label">核心贡献</div><div class="detail-value">${e.contribution}</div></div>
              <div class="detail-section"><div class="detail-label">方法论</div><div class="detail-value">${e.methodology}</div></div>
              <div class="detail-section"><div class="detail-label">相关技术</div><div>${e.references.map(r=>n`<span class="finding-tag">${r}</span>`)}</div></div>
              <div class="detail-section"><div class="detail-label">引用次数</div><div class="detail-value">${e.citedBy} 次</div></div>
              <div class="detail-section">
                <div class="detail-label">研究笔记</div>
                <textarea class="notes-area" placeholder="添加您的研究笔记..."
                  .value=${e.notes}
                  @input=${r=>this.updateNotes(e.paperId,r.target.value)}
                ></textarea>
              </div>
            </div>
          `:n`<div class="empty">请在左侧选择一篇文献查看详情</div>`}
        </article>
      </section>
    `}};w.styles=y`
    :host { display: block; }
    .layout {
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr;
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
    .panel p { font-size: var(--text-sm); color: var(--color-text-secondary); }
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
    button:hover:not(:disabled) { border-color: var(--color-accent); color: var(--color-accent); }
    button.primary { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
    button.primary:hover:not(:disabled) { background: var(--color-accent-hover); border-color: var(--color-accent-hover); color: #fff; }
    button.secondary { background: #fef3c7; border-color: #fde68a; color: #92400e; }
    button.secondary:hover:not(:disabled) { background: #fde68a; border-color: #f59e0b; color: #78350f; }
    button:disabled { cursor: not-allowed; opacity: 0.5; }
    .topic-brief { background: #f0fdf4; border: 1px solid #a7f3d0; border-radius: var(--radius-lg); padding: var(--space-3); }
    .topic-brief-title { font-size: var(--text-sm); font-weight: 700; color: #065f46; margin-bottom: var(--space-2); }
    .topic-brief p { font-size: var(--text-xs); color: #047857; line-height: 1.6; }
    .search-box { display: flex; gap: var(--space-2); }
    .search-box input {
      flex: 1;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      font-family: var(--font-sans);
      background: #fff;
      color: var(--color-text-primary);
    }
    .search-box input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }
    .filter-row { display: flex; gap: var(--space-2); flex-wrap: wrap; }
    .filter-tag {
      font-size: 11px; padding: 3px 8px; border-radius: 999px;
      border: 1px solid var(--color-border); background: var(--color-bg);
      color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast);
    }
    .filter-tag:hover, .filter-tag.active { border-color: var(--color-accent); background: #f0fdf4; color: #065f46; }
    .lit-list { display: grid; gap: var(--space-2); max-height: 320px; overflow-y: auto; }
    .lit-item {
      border: 1px solid var(--color-border); border-radius: var(--radius-md);
      padding: var(--space-3); background: #fff; cursor: pointer; transition: all var(--transition-fast);
    }
    .lit-item:hover { border-color: var(--color-accent); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
    .lit-item.selected { border-color: var(--color-accent); background: #f0fdf4; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }
    .lit-title { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); margin-bottom: 2px; }
    .lit-meta { font-size: 10px; color: var(--color-text-tertiary); margin-bottom: 4px; }
    .lit-relevance {
      display: inline-flex; align-items: center; gap: 4px; font-size: 10px;
      background: #d1fae5; color: #047857; padding: 2px 6px; border-radius: 999px; font-weight: 700;
    }
    .empty {
      border: 1px dashed var(--color-border); border-radius: var(--radius-md);
      padding: var(--space-4); text-align: center; font-size: var(--text-sm); color: var(--color-text-tertiary);
    }
    .processing {
      border-radius: var(--radius-md); border: 1px solid #fde68a; background: #fffbeb;
      color: #92400e; padding: var(--space-4); font-size: var(--text-sm);
      display: grid; gap: var(--space-2); text-align: center;
    }
    .processing-spinner {
      width: 32px; height: 32px; border: 3px solid #fde68a; border-top-color: #f59e0b;
      border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .evidence-list { display: grid; gap: var(--space-2); }
    .evidence-item { background: var(--color-bg); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); padding: var(--space-3); }
    .evidence-type { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-accent); margin-bottom: 4px; }
    .evidence-content { font-size: var(--text-xs); color: var(--color-text-primary); line-height: 1.6; }
    .evidence-source { font-size: 10px; color: var(--color-text-tertiary); margin-top: 4px; }
    .notes-area {
      width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-md);
      padding: var(--space-3); font-size: var(--text-sm); font-family: var(--font-sans);
      resize: vertical; min-height: 120px; background: #fff; color: var(--color-text-primary);
    }
    .notes-area:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }
    .tag-btn {
      font-size: 11px; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--color-border);
      background: #fff; color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast);
    }
    .tag-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
    .tag-btn.active { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
    .summary-section { background: #f0fdf4; border: 1px solid #a7f3d0; border-radius: var(--radius-lg); padding: var(--space-4); margin-top: var(--space-3); }
    .summary-section h4 { font-size: var(--text-sm); font-weight: 700; color: #065f46; margin-bottom: var(--space-3); }
    .summary-row { display: flex; gap: var(--space-2); margin-bottom: var(--space-2); align-items: flex-start; }
    .summary-label { font-size: 11px; font-weight: 700; color: #047857; min-width: 70px; }
    .summary-value { font-size: var(--text-xs); color: var(--color-text-primary); flex: 1; }
    .gap-analysis { background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius-lg); padding: var(--space-4); }
    .gap-analysis h4 { font-size: var(--text-sm); font-weight: 700; color: #92400e; margin-bottom: var(--space-3); }
    .gap-item { display: flex; gap: var(--space-2); margin-bottom: var(--space-2); align-items: flex-start; }
    .gap-bullet { color: #f59e0b; font-size: 14px; line-height: 1.3; }
    .gap-text { font-size: var(--text-xs); color: var(--color-text-primary); line-height: 1.5; }
    .confirm-section { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-lg); padding: var(--space-4); margin-top: var(--space-3); }
    .confirm-section h4 { font-size: var(--text-sm); font-weight: 600; color: #065f46; margin-bottom: var(--space-2); }
    .progress-track { width: 100%; height: 6px; border-radius: 999px; background: #f0fdf4; overflow: hidden; margin-top: var(--space-2); }
    .progress-fill { height: 100%; background: var(--color-accent); transition: width var(--transition-base); }
    .message-log { background: var(--color-bg); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); padding: var(--space-3); font-size: 11px; max-height: 120px; overflow-y: auto; }
    .message-item { padding: var(--space-1) 0; border-bottom: 1px solid var(--color-border-light); }
    .message-item:last-child { border-bottom: none; }
    .message-time { color: var(--color-text-tertiary); margin-right: var(--space-2); font-size: 10px; }
    .message-from { font-weight: 600; color: var(--color-accent); }
    .message-content { color: var(--color-text-primary); margin-top: 2px; }
    .task-id { font-size: 10px; background: var(--color-bg); color: var(--color-text-tertiary); padding: 2px 8px; border-radius: 4px; font-family: monospace; margin-left: var(--space-2); }
    .detail-title { font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); line-height: 1.4; margin-bottom: var(--space-2); }
    .detail-meta { font-size: 11px; color: var(--color-text-tertiary); margin-bottom: var(--space-3); }
    .detail-section { margin-bottom: var(--space-3); }
    .detail-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-accent); margin-bottom: 4px; }
    .detail-value { font-size: var(--text-xs); color: var(--color-text-primary); line-height: 1.6; }
    .finding-tag { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin: 2px 4px 2px 0; }
    @media (max-width: 1280px) { .layout { grid-template-columns: 1fr; } .panel { min-height: auto; } }
  `;I([c()],w.prototype,"taskId",2);I([c()],w.prototype,"taskStatus",2);I([c()],w.prototype,"selectedTopic",2);I([c()],w.prototype,"literature",2);I([c()],w.prototype,"selectedLitId",2);I([c()],w.prototype,"searchQuery",2);I([c()],w.prototype,"activeFilter",2);I([c()],w.prototype,"isAnalyzing",2);I([c()],w.prototype,"analysisProgress",2);I([c()],w.prototype,"gapAnalysis",2);I([c()],w.prototype,"evidenceSummary",2);I([c()],w.prototype,"readyForOutline",2);w=I([x("literature-stage")],w);var la=Object.defineProperty,da=Object.getOwnPropertyDescriptor,ce=(t,e,a,r)=>{for(var s=r>1?void 0:r?da(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&la(e,a,s),s};const Ae="http://192.168.1.161:8080",pa="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function Ce(){return{"X-Api-Key":pa,"Content-Type":"application/json"}}let H=class extends g{constructor(){super(...arguments),this.outlineData=null,this.taskId=null,this.loading=!1,this.statusMessage=null}connectedCallback(){super.connectedCallback(),this.loadOutlineData()}async loadOutlineData(){const t=localStorage.getItem("paper-dashboard-task");if(t){const e=JSON.parse(t);this.taskId=e.task_id,await this.fetchOutlineData()}}async fetchOutlineData(){if(this.taskId)try{const t=await fetch(`${Ae}/api/tasks/${this.taskId}/outline`,{headers:Ce()});if(t.ok){const e=await t.json();this.outlineData=e.outline}}catch(t){console.error("Failed to fetch outline data:",t)}}async generateOutline(){if(this.taskId){this.loading=!0,this.statusMessage={type:"info",text:"正在生成论文大纲..."};try{const t=await fetch(`${Ae}/api/tasks/${this.taskId}/outline/generate`,{method:"POST",headers:Ce()});if(t.ok){const e=await t.json();this.outlineData=e.outline,this.statusMessage={type:"success",text:"大纲生成成功！"}}else this.statusMessage={type:"error",text:"生成失败，请重试"}}catch{this.statusMessage={type:"error",text:"网络错误"}}finally{this.loading=!1}}}async saveOutline(){if(!(!this.taskId||!this.outlineData))try{await fetch(`${Ae}/api/tasks/${this.taskId}/outline`,{method:"PUT",headers:Ce(),body:JSON.stringify({outline:this.outlineData})}),this.statusMessage={type:"success",text:"大纲已保存"}}catch{this.statusMessage={type:"error",text:"保存失败"}}}confirmOutline(){this.outlineData&&(this.saveOutline(),this.dispatchEvent(new CustomEvent("outline-confirmed",{detail:{outline:this.outlineData}})))}renderDefaultOutline(){return{structure:[{id:1,type:"chapter",title:"1. 引言 (Introduction)",description:"介绍研究背景、动机和本文贡献",targetWords:800,keyPoints:["研究背景","问题陈述","主要贡献"]},{id:2,type:"chapter",title:"2. 数学物理模型 (Mathematical Formulation)",description:"描述控制方程和数值方法",targetWords:1500,keyPoints:["N-S方程","湍流模型","边界条件"]},{id:3,type:"chapter",title:"3. 数值方法 (Numerical Method)",description:"离散化方案和求解算法",targetWords:1200,keyPoints:["有限体积法","压力速度耦合","网格收敛性"]},{id:4,type:"chapter",title:"4. 结果与讨论 (Results & Discussion)",description:"验证算例和参数研究",targetWords:2500,keyPoints:["验证研究","参数敏感性","物理分析"]},{id:5,type:"chapter",title:"5. 结论 (Conclusions)",description:"工作总结和未来展望",targetWords:500,keyPoints:["主要结论","创新点","后续工作"]}],totalWords:6500,notes:""}}render(){const t=this.outlineData||this.renderDefaultOutline();return n`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 论文结构</h3>
          
          ${this.statusMessage?n`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          `:""}

          <div class="stats">
            <div class="stat-card">
              <div class="stat-value">${t.structure.length}</div>
              <div class="stat-label">章节数</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${t.totalWords}</div>
              <div class="stat-label">目标字数</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">~${Math.round(t.totalWords/250)}</div>
              <div class="stat-label">页数</div>
            </div>
          </div>

          <div class="structure-tree">
            ${t.structure.map(e=>this.renderSection(e))}
          </div>

          <div class="actions">
            <button @click=${this.generateOutline} ?disabled=${this.loading}>
              ${this.loading?"生成中...":"🔄 AI 生成大纲"}
            </button>
            <button @click=${this.confirmOutline} class="primary">
              ✅ 确认大纲
            </button>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 大纲详情</h3>
          
          ${this.loading?n`
            <div class="generating">
              <div class="spinner"></div>
              <p>AI 正在分析论文内容并生成结构...</p>
            </div>
          `:n`
            <div class="edit-form">
              <div class="form-group">
                <label>备注与特殊要求</label>
                <textarea 
                  .value=${t.notes||""}
                  @input=${e=>{this.outlineData&&(this.outlineData.notes=e.target.value)}}
                  placeholder="如有特殊章节要求或结构偏好，请在此说明..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label>结构说明</label>
                <p style="font-size: var(--text-sm); color: var(--color-text-secondary);">
                  论文采用标准的 IMRaD 结构（Introduction, Methods, Results, and Discussion），
                  适合工程类和物理类期刊（如 Physics of Fluids, Journal of Computational Physics）。
                </p>
              </div>

              <div class="actions">
                <button @click=${this.saveOutline}>💾 保存修改</button>
              </div>
            </div>
          `}
        </div>
      </div>
    `}renderSection(t){return t.type==="chapter"?n`
        <div class="chapter">
          <div class="chapter-header">
            <span class="chapter-title">${t.title}</span>
            <span class="word-count">~${t.targetWords} words</span>
          </div>
          <p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin-bottom: var(--space-2);">
            ${t.description}
          </p>
          <div class="key-points">
            <div class="key-points-title">关键内容:</div>
            ${t.keyPoints.map(e=>n`<div class="key-point">• ${e}</div>`)}
          </div>
        </div>
      `:t.type==="section"?n`
        <div class="section">
          <div class="section-title">${t.title}</div>
        </div>
      `:n`
        <div class="subsection">
          <div class="subsection-title">${t.title}</div>
        </div>
      `}};H.styles=y`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
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

    .structure-tree {
      display: grid;
      gap: var(--space-3);
    }

    .chapter {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .chapter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .chapter-title {
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .word-count {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      background: var(--color-surface);
      padding: 2px 8px;
      border-radius: 999px;
    }

    .section {
      margin-left: var(--space-4);
      border-left: 2px solid var(--color-border-light);
      padding-left: var(--space-3);
      margin-top: var(--space-2);
    }

    .section-title {
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--color-text-primary);
    }

    .subsection {
      margin-left: var(--space-4);
      padding-left: var(--space-2);
      margin-top: var(--space-1);
    }

    .subsection-title {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .key-points {
      margin-top: var(--space-2);
      padding: var(--space-2);
      background: var(--color-surface);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
    }

    .key-points-title {
      font-weight: 600;
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-1);
    }

    .key-point {
      color: var(--color-text-secondary);
      margin-left: var(--space-2);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .stat-card {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      text-align: center;
    }

    .stat-value {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--color-accent);
    }

    .stat-label {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .edit-form {
      display: grid;
      gap: var(--space-3);
    }

    .form-group {
      display: grid;
      gap: var(--space-1);
    }

    .form-group label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .form-group input,
    .form-group textarea {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      background: var(--color-bg);
      color: var(--color-text-primary);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }

    .actions {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-4);
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

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .empty-state {
      text-align: center;
      padding: var(--space-8);
      color: var(--color-text-tertiary);
    }

    .generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-8);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .status-message {
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      margin-bottom: var(--space-4);
    }

    .status-message.info {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    .status-message.success {
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
    }

    .status-message.error {
      background: #fef2f2;
      border: 1px solid #ef4444;
      color: #b91c1c;
    }
  `;ce([c()],H.prototype,"outlineData",2);ce([c()],H.prototype,"taskId",2);ce([c()],H.prototype,"loading",2);ce([c()],H.prototype,"statusMessage",2);H=ce([x("outline-stage")],H);var va=Object.defineProperty,ua=Object.getOwnPropertyDescriptor,le=(t,e,a,r)=>{for(var s=r>1?void 0:r?ua(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&va(e,a,s),s};const Te="http://192.168.1.161:8080",ga="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function Ee(){return{"X-Api-Key":ga,"Content-Type":"application/json"}}let q=class extends g{constructor(){super(...arguments),this.dataRequirements=null,this.taskId=null,this.loading=!1,this.statusMessage=null}connectedCallback(){super.connectedCallback(),this.loadDataRequirements()}async loadDataRequirements(){const t=localStorage.getItem("paper-dashboard-task");if(t){const e=JSON.parse(t);this.taskId=e.task_id,await this.fetchDataRequirements()}}async fetchDataRequirements(){if(this.taskId)try{const t=await fetch(`${Te}/api/tasks/${this.taskId}/data-requirements`,{headers:Ee()});if(t.ok){const e=await t.json();this.dataRequirements=e.dataRequirements}}catch(t){console.error("Failed to fetch data requirements:",t)}}async generateRequirements(){if(this.taskId){this.loading=!0,this.statusMessage={type:"info",text:"正在分析并生成算例需求..."};try{const t=await fetch(`${Te}/api/tasks/${this.taskId}/data-requirements/generate`,{method:"POST",headers:Ee()});if(t.ok){const e=await t.json();this.dataRequirements=e.dataRequirements,this.statusMessage={type:"success",text:"算例需求生成成功！"}}else this.statusMessage={type:"error",text:"生成失败，请重试"}}catch{this.statusMessage={type:"error",text:"网络错误"}}finally{this.loading=!1}}}async saveRequirements(){if(!(!this.taskId||!this.dataRequirements))try{await fetch(`${Te}/api/tasks/${this.taskId}/data-requirements`,{method:"PUT",headers:Ee(),body:JSON.stringify({dataRequirements:this.dataRequirements})}),this.statusMessage={type:"success",text:"已保存"}}catch{this.statusMessage={type:"error",text:"保存失败"}}}confirmRequirements(){this.dataRequirements&&(this.saveRequirements(),this.dispatchEvent(new CustomEvent("requirements-confirmed",{detail:{requirements:this.dataRequirements}})))}renderDefaultRequirements(){return{cases:[{id:1,name:"Validation Case",description:"与经典实验数据对比验证方法可靠性",geometry:{type:"2D Channel",dimensions:"4H x 2W"},physics:{Reynolds:5e3,Prandtl:.71,fluidProperties:"Air, Pr=0.71"},boundaryConditions:["Inlet: Uniform velocity","Outlet: Pressure outlet","Walls: No-slip"],mesh:{type:"Structured",size:"0.01",elements:5e4},expectedResults:["Velocity profiles","Pressure drop","Reattachment length"],priority:"high"},{id:2,name:"Parameter Study: Re",description:"Reynolds数对流动特性的影响",geometry:{type:"2D Channel",dimensions:"4H x 2W"},physics:{Reynolds:1e4,Prandtl:.71,fluidProperties:"Air"},boundaryConditions:["Inlet: Uniform velocity","Outlet: Pressure outlet","Walls: No-slip"],mesh:{type:"Structured",size:"0.01",elements:8e4},expectedResults:["Flow pattern changes","Separation points","Nusselt number correlation"],priority:"high"},{id:3,name:"3D Effects Study",description:"评估三维效应的影响",geometry:{type:"3D Duct",dimensions:"L=10H, W=4H, H"},physics:{Reynolds:8e3,Prandtl:.71,fluidProperties:"Air"},boundaryConditions:["Inlet: Uniform velocity","Outlet: Pressure outlet","Walls: No-slip"],mesh:{type:"Hybrid",size:"0.02",elements:5e5},expectedResults:["Secondary flows","3D separation","Spanwise variation"],priority:"medium"}],computationalResources:{cores:64,memory:"128 GB",estimatedTime:"48 hours"},notes:""}}render(){const t=this.dataRequirements||this.renderDefaultRequirements();return n`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 算例配置</h3>
          
          ${this.statusMessage?n`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          `:""}

          <div class="cases-grid">
            ${t.cases.map(e=>n`
              <div class="case-card">
                <div class="case-header">
                  <span class="case-name">${e.name}</span>
                  <span class="priority-badge ${e.priority}">${e.priority.toUpperCase()}</span>
                </div>
                <p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin-bottom: var(--space-2);">
                  ${e.description}
                </p>
                <div class="case-meta">
                  <div class="meta-item"><strong>几何:</strong> ${e.geometry.type}</div>
                  <div class="meta-item"><strong>Re:</strong> ${e.physics.Reynolds}</div>
                  <div class="meta-item"><strong>网格:</strong> ${e.mesh.elements.toLocaleString()}</div>
                  <div class="meta-item"><strong>流体:</strong> ${e.physics.fluidProperties}</div>
                </div>
              </div>
            `)}
          </div>

          <div class="actions">
            <button @click=${this.generateRequirements} ?disabled=${this.loading}>
              ${this.loading?"生成中...":"🔄 AI 生成算例"}
            </button>
            <button @click=${this.confirmRequirements} class="primary">
              ✅ 确认算例
            </button>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 计算资源与备注</h3>
          
          ${this.loading?n`
            <div class="generating">
              <div class="spinner"></div>
              <p>AI 正在分析物理模型...</p>
            </div>
          `:n`
            <div class="resources-grid">
              <div class="resource-item">
                <span class="resource-icon">🔢</span>
                <div class="resource-info">
                  <div class="resource-label">CPU Cores</div>
                  <div class="resource-value">${t.computationalResources.cores}</div>
                </div>
              </div>
              <div class="resource-item">
                <span class="resource-icon">💾</span>
                <div class="resource-info">
                  <div class="resource-label">Memory</div>
                  <div class="resource-value">${t.computationalResources.memory}</div>
                </div>
              </div>
              <div class="resource-item">
                <span class="resource-icon">⏱️</span>
                <div class="resource-info">
                  <div class="resource-label">预计耗时</div>
                  <div class="resource-value">${t.computationalResources.estimatedTime}</div>
                </div>
              </div>
            </div>

            <div class="edit-form">
              <div class="form-group">
                <label>备注与特殊要求</label>
                <textarea 
                  .value=${t.notes||""}
                  @input=${e=>{this.dataRequirements&&(this.dataRequirements.notes=e.target.value)}}
                  placeholder="如有特殊硬件、边界条件或算例要求，请在此说明..."
                ></textarea>
              </div>

              <div class="actions">
                <button @click=${this.saveRequirements}>💾 保存</button>
              </div>
            </div>
          `}
        </div>
      </div>
    `}};q.styles=y`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
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

    .cases-grid {
      display: grid;
      gap: var(--space-3);
    }

    .case-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .case-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .case-name {
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .priority-badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
    }

    .priority-badge.high {
      background: #fef2f2;
      color: #b91c1c;
    }

    .priority-badge.medium {
      background: #fffbeb;
      color: #b45309;
    }

    .priority-badge.low {
      background: #ecfdf5;
      color: #047857;
    }

    .case-meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-2);
      margin-top: var(--space-2);
    }

    .meta-item {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
    }

    .meta-item strong {
      color: var(--color-text-primary);
    }

    .resources-grid {
      display: grid;
      gap: var(--space-3);
    }

    .resource-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3);
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
    }

    .resource-icon {
      font-size: var(--text-xl);
    }

    .resource-info {
      flex: 1;
    }

    .resource-label {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .resource-value {
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .edit-form {
      display: grid;
      gap: var(--space-3);
    }

    .form-group {
      display: grid;
      gap: var(--space-1);
    }

    .form-group label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .form-group textarea {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      background: var(--color-bg);
      color: var(--color-text-primary);
      resize: vertical;
      min-height: 80px;
    }

    .actions {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-4);
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

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-8);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .status-message {
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      margin-bottom: var(--space-4);
    }

    .status-message.info {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    .status-message.success {
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
    }

    .status-message.error {
      background: #fef2f2;
      border: 1px solid #ef4444;
      color: #b91c1c;
    }
  `;le([c()],q.prototype,"dataRequirements",2);le([c()],q.prototype,"taskId",2);le([c()],q.prototype,"loading",2);le([c()],q.prototype,"statusMessage",2);q=le([x("data-requirements-stage")],q);var ha=Object.defineProperty,fa=Object.getOwnPropertyDescriptor,Q=(t,e,a,r)=>{for(var s=r>1?void 0:r?fa(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&ha(e,a,s),s};const ze="http://192.168.1.161:8080",ba="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function Re(){return{"X-Api-Key":ba,"Content-Type":"application/json"}}let D=class extends g{constructor(){super(...arguments),this.draftingProgress=null,this.taskId=null,this.selectedSection=0,this.loading=!1,this.statusMessage=null}connectedCallback(){super.connectedCallback(),this.loadDraftingProgress()}async loadDraftingProgress(){const t=localStorage.getItem("paper-dashboard-task");if(t){const e=JSON.parse(t);this.taskId=e.task_id,await this.fetchDraftingProgress()}}async fetchDraftingProgress(){if(this.taskId)try{const t=await fetch(`${ze}/api/tasks/${this.taskId}/drafting`,{headers:Re()});if(t.ok){const e=await t.json();this.draftingProgress=e.drafting}}catch(t){console.error("Failed to fetch drafting progress:",t)}}async startDrafting(){if(this.taskId){this.loading=!0,this.statusMessage={type:"info",text:"正在生成章节草稿..."};try{const t=await fetch(`${ze}/api/tasks/${this.taskId}/drafting/generate`,{method:"POST",headers:Re()});if(t.ok){const e=await t.json();this.draftingProgress=e.drafting,this.statusMessage={type:"success",text:"草稿生成成功！"}}}catch(t){console.error("Failed to generate draft:",t)}finally{this.loading=!1}}}async saveSection(){if(!this.taskId||!this.draftingProgress)return;const t=this.draftingProgress.sections[this.selectedSection];if(t)try{await fetch(`${ze}/api/tasks/${this.taskId}/drafting/section/${t.id}`,{method:"PUT",headers:Re(),body:JSON.stringify({content:t.content})}),this.statusMessage={type:"success",text:"已保存"}}catch(e){console.error("Failed to save section:",e)}}async markSectionComplete(){if(!this.draftingProgress)return;const t=this.draftingProgress.sections[this.selectedSection];t&&(t.status="completed",t.lastModified=new Date().toISOString(),this.draftingProgress={...this.draftingProgress},await this.saveSection())}confirmDrafting(){this.dispatchEvent(new CustomEvent("drafting-confirmed",{detail:{progress:this.draftingProgress}}))}renderDefaultProgress(){return{sections:[{id:1,chapterId:1,title:"1.1 研究背景",content:"",wordCount:0,status:"pending",lastModified:""},{id:2,chapterId:1,title:"1.2 问题陈述",content:"",wordCount:0,status:"pending",lastModified:""},{id:3,chapterId:1,title:"1.3 主要贡献",content:"",wordCount:0,status:"pending",lastModified:""},{id:4,chapterId:2,title:"2.1 控制方程",content:"",wordCount:0,status:"pending",lastModified:""},{id:5,chapterId:2,title:"2.2 湍流模型",content:"",wordCount:0,status:"pending",lastModified:""},{id:6,chapterId:3,title:"3.1 离散化方法",content:"",wordCount:0,status:"pending",lastModified:""},{id:7,chapterId:3,title:"3.2 求解算法",content:"",wordCount:0,status:"pending",lastModified:""},{id:8,chapterId:4,title:"4.1 验证算例",content:"",wordCount:0,status:"pending",lastModified:""},{id:9,chapterId:4,title:"4.2 参数研究",content:"",wordCount:0,status:"pending",lastModified:""},{id:10,chapterId:5,title:"5. 结论",content:"",wordCount:0,status:"pending",lastModified:""}],totalWords:0,completedSections:0,currentSection:0}}render(){const t=this.draftingProgress||this.renderDefaultProgress(),e=t.sections[this.selectedSection],a=t.sections.length>0?Math.round(t.completedSections/t.sections.length*100):0;return n`
      <div class="layout">
        <div class="sidebar">
          <h3>撰写进度</h3>
          
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${a}%"></div>
          </div>
          <div class="progress-stats">
            <span>${t.completedSections}/${t.sections.length} 章节</span>
            <span>${t.totalWords.toLocaleString()} 字</span>
          </div>

          ${this.statusMessage?n`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          `:""}

          <div class="section-list">
            ${t.sections.map((r,s)=>n`
              <div 
                class="section-item ${s===this.selectedSection?"active":""} ${r.status}"
                @click=${()=>this.selectedSection=s}
              >
                <div>${r.title}</div>
                <div class="section-status">
                  <span class="status-badge ${r.status}">${r.status==="pending"?"待写":r.status==="drafting"?"撰写中":"已完成"}</span>
                  <span class="word-count-small">${r.wordCount} 字</span>
                </div>
              </div>
            `)}
          </div>

          <div style="margin-top: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
            <button @click=${this.startDrafting} ?disabled=${this.loading}>
              ${this.loading?"生成中...":"🤖 AI 撰写"}
            </button>
            <button @click=${this.confirmDrafting} class="primary">
              ✅ 确认草稿
            </button>
          </div>
        </div>

        <div class="editor-panel">
          <div class="editor-header">
            <span class="editor-title">${(e==null?void 0:e.title)||"选择章节"}</span>
            <div class="editor-actions">
              <button @click=${this.saveSection}>💾 保存</button>
              <button @click=${this.markSectionComplete} class="primary">✅ 完成撰写</button>
            </div>
          </div>

          <div class="editor-body">
            <textarea 
              .value=${(e==null?void 0:e.content)||""}
              @input=${r=>{if(this.draftingProgress){const s=this.draftingProgress.sections[this.selectedSection];s.content=r.target.value,s.wordCount=r.target.value.replace(/\s/g,"").length,s.status="drafting",this.draftingProgress={...this.draftingProgress}}}}
              placeholder="在此输入章节内容...或点击「AI 撰写」让 AI 帮助生成"
            ></textarea>
          </div>

          <div class="editor-footer">
            <span>字数: ${(e==null?void 0:e.wordCount)||0}</span>
            <span>最后修改: ${e!=null&&e.lastModified?new Date(e.lastModified).toLocaleString():"未保存"}</span>
          </div>
        </div>
      </div>
    `}};D.styles=y`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .sidebar {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: var(--space-4);
    }

    .sidebar h3 {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-3);
    }

    .progress-bar {
      height: 8px;
      background: var(--color-border);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: var(--space-2);
    }

    .progress-fill {
      height: 100%;
      background: var(--color-accent);
      transition: width 0.3s ease;
    }

    .progress-stats {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-4);
    }

    .section-list {
      display: grid;
      gap: var(--space-2);
    }

    .section-item {
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
      font-size: var(--text-sm);
    }

    .section-item:hover {
      border-color: var(--color-accent);
      background: var(--color-bg);
    }

    .section-item.active {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }

    .section-item.completed {
      border-color: #34d399;
      background: #ecfdf5;
    }

    .section-item.drafting {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .section-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--space-1);
    }

    .status-badge {
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 999px;
    }

    .status-badge.pending {
      background: var(--color-border-light);
      color: var(--color-text-tertiary);
    }

    .status-badge.drafting {
      background: #fef3c7;
      color: #b45309;
    }

    .status-badge.completed {
      background: #d1fae5;
      color: #047857;
    }

    .word-count-small {
      font-size: 10px;
      color: var(--color-text-tertiary);
    }

    .editor-panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-border-light);
    }

    .editor-title {
      font-weight: 700;
      font-size: var(--text-lg);
      color: var(--color-text-primary);
    }

    .editor-actions {
      display: flex;
      gap: var(--space-2);
    }

    .editor-body {
      min-height: 400px;
    }

    .editor-body textarea {
      width: 100%;
      min-height: 400px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      font-size: var(--text-sm);
      font-family: 'Georgia', serif;
      line-height: 1.8;
      background: var(--color-bg);
      color: var(--color-text-primary);
      resize: vertical;
    }

    .editor-body textarea:focus {
      outline: none;
      border-color: var(--color-accent);
    }

    .editor-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--space-3);
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
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

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-8);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .status-message {
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      margin-bottom: var(--space-4);
    }

    .status-message.info {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    .status-message.success {
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
    }
  `;Q([c()],D.prototype,"draftingProgress",2);Q([c()],D.prototype,"taskId",2);Q([c()],D.prototype,"selectedSection",2);Q([c()],D.prototype,"loading",2);Q([c()],D.prototype,"statusMessage",2);D=Q([x("drafting-stage")],D);var ma=Object.defineProperty,ya=Object.getOwnPropertyDescriptor,de=(t,e,a,r)=>{for(var s=r>1?void 0:r?ya(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&ma(e,a,s),s};const et="http://192.168.1.161:8080",xa="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function tt(){return{"X-Api-Key":xa,"Content-Type":"application/json"}}let B=class extends g{constructor(){super(...arguments),this.polishingReport=null,this.taskId=null,this.loading=!1,this.statusMessage=null}connectedCallback(){super.connectedCallback(),this.loadPolishingReport()}async loadPolishingReport(){const t=localStorage.getItem("paper-dashboard-task");if(t){const e=JSON.parse(t);this.taskId=e.task_id,await this.fetchPolishingReport()}}async fetchPolishingReport(){if(this.taskId)try{const t=await fetch(`${et}/api/tasks/${this.taskId}/polishing`,{headers:tt()});if(t.ok){const e=await t.json();this.polishingReport=e.polishing}}catch(t){console.error("Failed to fetch polishing report:",t)}}async runPolishing(){if(this.taskId){this.loading=!0,this.statusMessage={type:"info",text:"正在分析论文并进行润色..."};try{const t=await fetch(`${et}/api/tasks/${this.taskId}/polishing/run`,{method:"POST",headers:tt()});if(t.ok){const e=await t.json();this.polishingReport=e.polishing,this.statusMessage={type:"success",text:"润色分析完成！"}}}catch(t){console.error("Failed to run polishing:",t)}finally{this.loading=!1}}}toggleIssue(t){if(!this.polishingReport)return;const e=this.polishingReport.issues.find(a=>a.id===t);e&&(e.fixed=!e.fixed,this.polishingReport={...this.polishingReport})}confirmPolishing(){this.dispatchEvent(new CustomEvent("polishing-confirmed",{detail:{report:this.polishingReport}}))}renderDefaultReport(){return{overallScore:78,issues:[{id:1,type:"style",severity:"medium",location:"Section 1.1, Line 15",original:"The results shows that...",suggestion:"The results show that...",explanation:'Subject-verb agreement: "results" is plural',fixed:!1},{id:2,type:"clarity",severity:"high",location:"Section 2.2, Line 8",original:"The mesh independence study was performed.",suggestion:"We performed a mesh independence study to ensure numerical accuracy.",explanation:"Add context for clarity",fixed:!1},{id:3,type:"grammar",severity:"low",location:"Section 3.1, Line 22",original:"Figure 1 shows the velocity profile.",suggestion:"Figure 1 shows the velocity profile. The profile exhibits a parabolic shape characteristic of laminar flow.",explanation:"Consider adding a brief interpretation",fixed:!1},{id:4,type:"technical",severity:"high",location:"Section 4.2, Line 5",original:"The friction factor was calculated using the Blasius correlation.",suggestion:"The friction factor was calculated using the modified Blasius correlation for rough walls (Eq. 7).",explanation:"Specify which correlation and reference equation",fixed:!1},{id:5,type:"format",severity:"low",location:"References",original:"[1] J. Smith, 2020",suggestion:'[1] Smith, J., "Title of Paper", Journal Name, Vol. XX, No. XX, pp. XX-XX, 2020.',explanation:"Use consistent citation format",fixed:!1}],summary:"论文整体质量良好，主要问题集中在表达的清晰度和专业术语的规范性上。",suggestions:["建议在每个结果章节添加更详细的物理分析","图表引用需要增加简要说明","参考文献格式需要统一"]}}render(){const t=this.polishingReport||this.renderDefaultReport(),e=t.issues.filter(a=>a.fixed).length;return n`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 润色评分</h3>
          
          ${this.statusMessage?n`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          `:""}

          <div class="score-display" style="--score: ${t.overallScore}">
            <div class="score-circle">
              <div class="score-inner">
                <span class="score-value">${t.overallScore}</span>
              </div>
            </div>
            <div class="score-label">论文质量评分</div>
          </div>

          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);">
            ${t.summary}
          </p>

          <div style="display: flex; gap: var(--space-2);">
            <button @click=${this.runPolishing} ?disabled=${this.loading} style="flex: 1;">
              ${this.loading?"分析中...":"🔍 重新分析"}
            </button>
            <button @click=${this.confirmPolishing} class="primary" style="flex: 1;">
              ✅ 确认润色 (${e}/${t.issues.length})
            </button>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 问题与建议</h3>
          
          ${this.loading?n`
            <div class="generating">
              <div class="spinner"></div>
              <p>AI 正在检查论文...</p>
            </div>
          `:n`
            <div class="issues-list">
              ${t.issues.map(a=>n`
                <div class="issue-card">
                  <div class="issue-header">
                    <span class="issue-type ${a.type}">${a.type.toUpperCase()}</span>
                    <span class="severity-badge ${a.severity}">${a.severity==="high"?"重要":a.severity==="medium"?"中等":"轻微"}</span>
                  </div>
                  <div class="issue-location">📍 ${a.location}</div>
                  <div class="issue-content">
                    <div class="original-text">❌ ${a.original}</div>
                    <div class="suggested-text">✅ ${a.suggestion}</div>
                    <div class="issue-explanation">💡 ${a.explanation}</div>
                  </div>
                  <div class="checkbox-row">
                    <input 
                      type="checkbox" 
                      .checked=${a.fixed}
                      @change=${()=>this.toggleIssue(a.id)}
                      id="issue-${a.id}"
                    />
                    <label for="issue-${a.id}">已修复</label>
                  </div>
                </div>
              `)}
            </div>

            ${t.suggestions.length>0?n`
              <div style="margin-top: var(--space-4);">
                <h4 style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-2);">整体建议:</h4>
                <div class="suggestions-list">
                  ${t.suggestions.map(a=>n`
                    <div class="suggestion-item">
                      <span class="suggestion-icon">💡</span>
                      <span>${a}</span>
                    </div>
                  `)}
                </div>
              </div>
            `:""}
          `}
        </div>
      </div>
    `}};B.styles=y`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
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

    .score-display {
      text-align: center;
      padding: var(--space-6);
      background: var(--color-bg);
      border-radius: var(--radius-xl);
      margin-bottom: var(--space-4);
    }

    .score-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: conic-gradient(
        var(--color-accent) calc(var(--score) * 1%),
        var(--color-border) calc(var(--score) * 1%)
      );
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-3);
    }

    .score-inner {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: var(--color-bg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .score-value {
      font-size: var(--text-3xl);
      font-weight: 700;
      color: var(--color-accent);
    }

    .score-label {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .issues-list {
      display: grid;
      gap: var(--space-3);
      max-height: 400px;
      overflow-y: auto;
    }

    .issue-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .issue-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .issue-type {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
    }

    .issue-type.grammar { background: #eff6ff; color: #1e40af; }
    .issue-type.style { background: #fdf4ff; color: #7e22ce; }
    .issue-type.clarity { background: #fef9c3; color: #a16207; }
    .issue-type.technical { background: #fce7f3; color: #be185d; }
    .issue-type.format { background: #f0fdf4; color: #15803d; }

    .severity-badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .severity-badge.high { background: #fef2f2; color: #b91c1c; }
    .severity-badge.medium { background: #fffbeb; color: #b45309; }
    .severity-badge.low { background: #ecfdf5; color: #047857; }

    .issue-location {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
    }

    .issue-content {
      display: grid;
      gap: var(--space-2);
    }

    .original-text {
      font-size: var(--text-sm);
      color: #b91c1c;
      text-decoration: line-through;
      background: #fef2f2;
      padding: var(--space-2);
      border-radius: var(--radius-md);
    }

    .suggested-text {
      font-size: var(--text-sm);
      color: #047857;
      background: #ecfdf5;
      padding: var(--space-2);
      border-radius: var(--radius-md);
    }

    .issue-explanation {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      font-style: italic;
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-2);
    }

    .checkbox-row input {
      width: 16px;
      height: 16px;
    }

    .checkbox-row label {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .suggestions-list {
      display: grid;
      gap: var(--space-2);
    }

    .suggestion-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      padding: var(--space-3);
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
    }

    .suggestion-icon {
      color: var(--color-accent);
    }

    .actions {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-4);
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

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-8);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .status-message {
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      margin-bottom: var(--space-4);
    }

    .status-message.info {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    .status-message.success {
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
    }
  `;de([c()],B.prototype,"polishingReport",2);de([c()],B.prototype,"taskId",2);de([c()],B.prototype,"loading",2);de([c()],B.prototype,"statusMessage",2);B=de([x("polishing-stage")],B);var wa=Object.defineProperty,ka=Object.getOwnPropertyDescriptor,pe=(t,e,a,r)=>{for(var s=r>1?void 0:r?ka(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&wa(e,a,s),s};const at="http://192.168.1.161:8080",$a="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function rt(){return{"X-Api-Key":$a,"Content-Type":"application/json"}}let K=class extends g{constructor(){super(...arguments),this.reviewReport=null,this.taskId=null,this.loading=!1,this.statusMessage=null}connectedCallback(){super.connectedCallback(),this.loadReviewReport()}async loadReviewReport(){const t=localStorage.getItem("paper-dashboard-task");if(t){const e=JSON.parse(t);this.taskId=e.task_id,await this.fetchReviewReport()}}async fetchReviewReport(){if(this.taskId)try{const t=await fetch(`${at}/api/tasks/${this.taskId}/review`,{headers:rt()});if(t.ok){const e=await t.json();this.reviewReport=e.review}}catch(t){console.error("Failed to fetch review report:",t)}}async runReview(){if(this.taskId){this.loading=!0,this.statusMessage={type:"info",text:"正在进行质量门禁审核..."};try{const t=await fetch(`${at}/api/tasks/${this.taskId}/review/run`,{method:"POST",headers:rt()});if(t.ok){const e=await t.json();this.reviewReport=e.review,this.statusMessage={type:"success",text:"审核完成！"}}}catch(t){console.error("Failed to run review:",t)}finally{this.loading=!1}}}passReview(){this.dispatchEvent(new CustomEvent("review-passed",{detail:{report:this.reviewReport}}))}failReview(){this.dispatchEvent(new CustomEvent("review-failed",{detail:{report:this.reviewReport}}))}renderDefaultReport(){return{overallScore:82,passed:!0,criteria:[{id:1,name:"结构完整性",description:"章节结构是否完整、逻辑清晰",weight:20,score:18,maxScore:20,passed:!0,feedback:"IMRaD结构完整"},{id:2,name:"方法描述",description:"数值方法描述是否充分、可复现",weight:20,score:16,maxScore:20,passed:!0,feedback:"方法描述详细"},{id:3,name:"结果分析",description:"结果是否充分、讨论是否深入",weight:25,score:20,maxScore:25,passed:!0,feedback:"结果丰富、分析深入"},{id:4,name:"语言质量",description:"英语表达、语法、格式",weight:15,score:12,maxScore:15,passed:!0,feedback:"有小问题需要润色"},{id:5,name:"图表质量",description:"图表清晰度、规范性",weight:10,score:8,maxScore:10,passed:!0,feedback:"图表质量良好"},{id:6,name:"文献引用",description:"引用完整、格式规范",weight:10,score:8,maxScore:10,passed:!0,feedback:"引用格式需统一"}],finalFeedback:"论文整体质量良好，满足投稿要求。建议进行最后润色后提交。",mustFixIssues:[],recommendedFixes:["参考文献格式统一为期刊风格","检查所有图表编号连续性","确认所有单位使用SI制"]}}render(){const t=this.reviewReport||this.renderDefaultReport();return n`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 质量门禁审核</h3>
          
          ${this.statusMessage?n`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          `:""}

          <div class="result-banner ${t.passed?"passed":"failed"}">
            <div class="result-icon">${t.passed?"✅":"❌"}</div>
            <div class="result-title">${t.passed?"通过质量门禁":"未通过质量门禁"}</div>
            <div class="result-score">${t.overallScore}/100</div>
          </div>

          <div class="criteria-grid">
            ${t.criteria.map(e=>n`
              <div class="criterion-card">
                <div class="criterion-header">
                  <span class="criterion-name">${e.name}</span>
                  <span class="criterion-score">${e.score}/${e.maxScore}</span>
                </div>
                <div class="criterion-bar">
                  <div class="criterion-fill ${e.passed?"passed":"failed"}" style="width: ${e.score/e.maxScore*100}%"></div>
                </div>
                <div class="criterion-desc">${e.description}</div>
                <div class="criterion-feedback">${e.feedback}</div>
              </div>
            `)}
          </div>

          ${t.mustFixIssues.length>0?n`
            <div class="issues-section">
              <h4>⚠️ 必须修复的问题</h4>
              <div class="issues-list">
                ${t.mustFixIssues.map(e=>n`
                  <div class="issue-item must-fix">
                    <span class="issue-icon">🔴</span>
                    <span>${e}</span>
                  </div>
                `)}
              </div>
            </div>
          `:""}

          ${t.recommendedFixes.length>0?n`
            <div class="issues-section">
              <h4>💡 建议改进</h4>
              <div class="issues-list">
                ${t.recommendedFixes.map(e=>n`
                  <div class="issue-item recommended">
                    <span class="issue-icon">🟡</span>
                    <span>${e}</span>
                  </div>
                `)}
              </div>
            </div>
          `:""}

          <div class="actions">
            <button @click=${this.runReview} ?disabled=${this.loading}>
              ${this.loading?"审核中...":"🔍 重新审核"}
            </button>
            ${t.passed?n`
              <button @click=${this.passReview} class="primary">
                ✅ 通过审核
              </button>
            `:n`
              <button @click=${this.failReview} class="secondary">
                📝 返回修改
              </button>
            `}
          </div>
        </div>
      </div>
    `}};K.styles=y`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
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

    .result-banner {
      text-align: center;
      padding: var(--space-6);
      border-radius: var(--radius-xl);
      margin-bottom: var(--space-4);
    }

    .result-banner.passed {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 2px solid #10b981;
    }

    .result-banner.failed {
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border: 2px solid #ef4444;
    }

    .result-icon {
      font-size: 48px;
      margin-bottom: var(--space-2);
    }

    .result-title {
      font-size: var(--text-xl);
      font-weight: 700;
      margin-bottom: var(--space-1);
    }

    .result-banner.passed .result-title {
      color: #047857;
    }

    .result-banner.failed .result-title {
      color: #b91c1c;
    }

    .result-score {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--color-accent);
    }

    .criteria-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .criterion-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .criterion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .criterion-name {
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .criterion-score {
      font-weight: 700;
      color: var(--color-accent);
    }

    .criterion-bar {
      height: 6px;
      background: var(--color-border);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: var(--space-2);
    }

    .criterion-fill {
      height: 100%;
      transition: width 0.3s ease;
    }

    .criterion-fill.passed {
      background: #10b981;
    }

    .criterion-fill.failed {
      background: #ef4444;
    }

    .criterion-desc {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }

    .criterion-feedback {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      font-style: italic;
    }

    .issues-section {
      margin-top: var(--space-4);
    }

    .issues-section h4 {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-3);
    }

    .issues-list {
      display: grid;
      gap: var(--space-2);
    }

    .issue-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
    }

    .issue-item.must-fix {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
    }

    .issue-item.recommended {
      background: #fffbeb;
      border: 1px solid #fde68a;
      color: #b45309;
    }

    .issue-icon {
      flex-shrink: 0;
    }

    .actions {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-4);
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

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button.secondary {
      background: #fef2f2;
      border-color: #fecaca;
      color: #b91c1c;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-8);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .status-message {
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      margin-bottom: var(--space-4);
    }

    .status-message.info {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    .status-message.success {
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
    }
  `;pe([c()],K.prototype,"reviewReport",2);pe([c()],K.prototype,"taskId",2);pe([c()],K.prototype,"loading",2);pe([c()],K.prototype,"statusMessage",2);K=pe([x("review-stage")],K);var Sa=Object.defineProperty,Ia=Object.getOwnPropertyDescriptor,ve=(t,e,a,r)=>{for(var s=r>1?void 0:r?Ia(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Sa(e,a,s),s};const st="http://192.168.1.161:8080",_a="3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a";function it(){return{"X-Api-Key":_a,"Content-Type":"application/json"}}let W=class extends g{constructor(){super(...arguments),this.finalizeData=null,this.taskId=null,this.loading=!1,this.statusMessage=null}connectedCallback(){super.connectedCallback(),this.loadFinalizeData()}async loadFinalizeData(){const t=localStorage.getItem("paper-dashboard-task");if(t){const e=JSON.parse(t);this.taskId=e.task_id,await this.fetchFinalizeData()}}async fetchFinalizeData(){if(this.taskId)try{const t=await fetch(`${st}/api/tasks/${this.taskId}/finalize`,{headers:it()});if(t.ok){const e=await t.json();this.finalizeData=e.finalize}}catch(t){console.error("Failed to fetch finalize data:",t)}}async generatePackage(){if(this.taskId){this.loading=!0,this.statusMessage={type:"info",text:"正在生成投稿文件包..."};try{const t=await fetch(`${st}/api/tasks/${this.taskId}/finalize/generate`,{method:"POST",headers:it()});if(t.ok){const e=await t.json();this.finalizeData=e.finalize,this.statusMessage={type:"success",text:"投稿文件包生成完成！"}}}catch(t){console.error("Failed to generate package:",t)}finally{this.loading=!1}}}toggleChecklist(t){this.finalizeData&&(this.finalizeData.checklist[t].checked=!this.finalizeData.checklist[t].checked,this.finalizeData={...this.finalizeData})}markAsSubmitted(){this.finalizeData&&(this.finalizeData.status="submitted",this.finalizeData.submissionDate=new Date().toISOString(),this.finalizeData={...this.finalizeData},this.dispatchEvent(new CustomEvent("submission-complete",{detail:{data:this.finalizeData}})))}renderDefaultData(){return{targetJournal:{name:"Physics of Fluids",abbreviation:"PoF",impactFactor:4.9,acceptanceRate:"25%",reviewTime:"3-4 months",notes:"主要发表流体力学领域的理论和数值研究"},manuscriptInfo:{title:"基于分块三对角矩阵求解的纤维动力学系统高效算法研究",abstract:"本文针对纤维动力学系统中大规模稀疏线性系统的求解问题，提出了一种基于分块三对角矩阵的高效求解算法...",keywords:["Fiber Dynamics","Block Tridiagonal","CUDA","GPU Acceleration","Sparse Linear System"],authors:["张三","李四","王五"],correspondingAuthor:0},files:{manuscript:"manuscript.pdf",supplementary:["supplementary_data.pdf","source_code.zip"],coverLetter:"cover_letter.pdf"},checklist:[{item:"Manuscript formatted according to journal guidelines",checked:!0},{item:"All figures and tables are high resolution",checked:!0},{item:"References formatted in journal style",checked:!1},{item:"Cover letter prepared",checked:!0},{item:"Suggested reviewers list prepared",checked:!1},{item:"Conflict of interest statement included",checked:!0},{item:"All authors have approved the submission",checked:!0}],status:"preparing",submissionDate:null}}render(){const t=this.finalizeData||this.renderDefaultData(),e=t.checklist.every(a=>a.checked);return n`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 目标期刊与稿件信息</h3>
          
          ${this.statusMessage?n`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          `:""}

          <div class="journal-card">
            <div class="journal-name">${t.targetJournal.name}</div>
            <div class="journal-abbr">${t.targetJournal.abbreviation}</div>
            <div class="journal-stats">
              <div class="stat-item">
                <div class="stat-value">${t.targetJournal.impactFactor}</div>
                <div class="stat-label">IF</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${t.targetJournal.acceptanceRate}</div>
                <div class="stat-label">接收率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${t.targetJournal.reviewTime}</div>
                <div class="stat-label">审稿周期</div>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h4>稿件标题</h4>
            <p>${t.manuscriptInfo.title}</p>
          </div>

          <div class="info-section">
            <h4>关键词</h4>
            <div class="keywords">
              ${t.manuscriptInfo.keywords.map(a=>n`
                <span class="keyword-tag">${a}</span>
              `)}
            </div>
          </div>

          <div class="info-section">
            <h4>作者列表</h4>
            <p>${t.manuscriptInfo.authors.map((a,r)=>n`
              ${a}${r===t.manuscriptInfo.correspondingAuthor?" ✉️":""}
            `)}</p>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 投稿文件与检查清单</h3>
          
          <div class="files-list">
            <div class="file-item">
              <span class="file-icon">📄</span>
              <div class="file-info">
                <div class="file-name">${t.files.manuscript}</div>
                <div class="file-status">主稿件</div>
              </div>
              <span style="color: #10b981;">✅</span>
            </div>
            ${t.files.coverLetter?n`
              <div class="file-item">
                <span class="file-icon">📧</span>
                <div class="file-info">
                  <div class="file-name">${t.files.coverLetter}</div>
                  <div class="file-status">Cover Letter</div>
                </div>
                <span style="color: #10b981;">✅</span>
              </div>
            `:""}
            ${t.files.supplementary.map(a=>n`
              <div class="file-item">
                <span class="file-icon">📎</span>
                <div class="file-info">
                  <div class="file-name">${a}</div>
                  <div class="file-status">补充材料</div>
                </div>
                <span style="color: #10b981;">✅</span>
              </div>
            `)}
          </div>

          <div class="checklist">
            ${t.checklist.map((a,r)=>n`
              <div 
                class="checklist-item ${a.checked?"checked":"unchecked"}"
                @click=${()=>this.toggleChecklist(r)}
              >
                <div class="checkbox ${a.checked?"checked":""}">
                  ${a.checked?"✓":""}
                </div>
                <span>${a.item}</span>
              </div>
            `)}
          </div>

          ${e?n`
            <div class="ready-banner">
              <div class="ready-icon">🎉</div>
              <div class="ready-title">准备就绪！</div>
              <div class="ready-desc">所有检查项已完成，可以提交</div>
            </div>
          `:""}

          <div class="actions">
            <button @click=${this.generatePackage} ?disabled=${this.loading}>
              ${this.loading?"生成中...":"📦 生成投稿包"}
            </button>
            <button @click=${this.markAsSubmitted} class="primary" ?disabled=${!e}>
              ✅ 标记为已提交
            </button>
          </div>
        </div>
      </div>
    `}};W.styles=y`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
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

    .journal-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      background: var(--color-bg);
      margin-bottom: var(--space-4);
    }

    .journal-name {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-1);
    }

    .journal-abbr {
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-3);
    }

    .journal-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-3);
    }

    .stat-item {
      text-align: center;
      padding: var(--space-2);
      background: var(--color-surface);
      border-radius: var(--radius-md);
    }

    .stat-value {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-accent);
    }

    .stat-label {
      font-size: 10px;
      color: var(--color-text-tertiary);
    }

    .info-section {
      margin-bottom: var(--space-4);
    }

    .info-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }

    .info-section p {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      line-height: 1.6;
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .keyword-tag {
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: var(--text-xs);
      font-weight: 600;
    }

    .files-list {
      display: grid;
      gap: var(--space-2);
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
    }

    .file-icon {
      font-size: var(--text-xl);
    }

    .file-info {
      flex: 1;
    }

    .file-name {
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .file-status {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .checklist {
      display: grid;
      gap: var(--space-2);
    }

    .checklist-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      cursor: pointer;
    }

    .checklist-item:hover {
      background: var(--color-bg);
    }

    .checklist-item.checked {
      background: #ecfdf5;
      color: #047857;
    }

    .checklist-item.unchecked {
      background: #fef2f2;
      color: #b91c1c;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .checkbox.checked {
      background: #10b981;
      border-color: #10b981;
      color: white;
    }

    .actions {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-4);
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

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .ready-banner {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 2px solid #10b981;
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      text-align: center;
      margin-bottom: var(--space-4);
    }

    .ready-icon {
      font-size: 48px;
      margin-bottom: var(--space-2);
    }

    .ready-title {
      font-size: var(--text-xl);
      font-weight: 700;
      color: #047857;
      margin-bottom: var(--space-1);
    }

    .ready-desc {
      font-size: var(--text-sm);
      color: #065f46;
    }

    .status-message {
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      margin-bottom: var(--space-4);
    }

    .status-message.info {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    .status-message.success {
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
    }
  `;ve([c()],W.prototype,"finalizeData",2);ve([c()],W.prototype,"taskId",2);ve([c()],W.prototype,"loading",2);ve([c()],W.prototype,"statusMessage",2);W=ve([x("finalize-stage")],W);var Pa=Object.defineProperty,Aa=Object.getOwnPropertyDescriptor,k=(t,e,a,r)=>{for(var s=r>1?void 0:r?Aa(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Pa(e,a,s),s};const J=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"];let m=class extends g{constructor(){super(...arguments),this.papers=[],this.folders=[],this.tags=[],this.stats={total_papers:0,total_folders:0,total_tags:0,papers_this_week:0},this.selectedFolderId=null,this.searchQuery="",this.loading=!0,this.showUploader=!1,this.workflowActive=!1,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}async connectedCallback(){super.connectedCallback(),await this.loadData(),this.checkExistingWorkflow()}async checkExistingWorkflow(){localStorage.getItem("paper-dashboard-workflow-task-id"),this.workflowActive=!0,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1}onTaskLoaded(t){const{taskId:e,status:a}=t.detail;console.log("[PaperApp] Task loaded from storage:",e,a),this.workflowActive=!0,this.currentStage="INTAKE",((a==null?void 0:a.stage_status)==="waiting_confirm"||(a==null?void 0:a.stage_status)==="completed")&&(this.configReady=!0,this.completedStages=["INTAKE"])}async loadData(){this.loading=!0;try{const[t,e,a]=await Promise.all([M.listFolders(),M.listTags(),M.getStats()]);this.folders=t,this.tags=e,this.stats=a,await this.loadPapers()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadPapers(){try{const t=await M.listPapers({folder_id:this.selectedFolderId??void 0,search:this.searchQuery||void 0});this.papers=t.papers||[]}catch(t){console.error("Failed to load papers:",t)}}onSearch(t){this.searchQuery=t.detail,this.loadPapers()}onFolderSelect(t){this.selectedFolderId=t.detail,this.loadPapers()}async onUpload(){this.showUploader=!1,await this.loadData()}async onDeletePaper(){await this.loadPapers(),this.stats=await M.getStats()}onCreatePaper(){localStorage.removeItem("paper-dashboard-workflow-task-id"),localStorage.removeItem("paper-dashboard-task-id"),this.workflowActive=!0,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}onTaskSelect(t){localStorage.setItem("paper-dashboard-workflow-task-id",t.detail.taskId),this.workflowActive=!0,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}onTaskDeleted(t){localStorage.getItem("paper-dashboard-workflow-task-id")===t.detail.taskId&&(localStorage.removeItem("paper-dashboard-workflow-task-id"),localStorage.removeItem("paper-dashboard-task-id"),this.workflowActive=!1,this.currentStage="INTAKE",this.completedStages=[])}onConfigReadyChange(t){this.configReady=t.detail}onTopicConfirmed(t){const{topic:e,taskId:a}=t.detail;console.log("[PaperApp] Topic confirmed:",e,"taskId:",a),this.advanceStage()}onLiteratureConfirmed(t){console.log("[PaperApp] Literature confirmed"),this.advanceStage()}onOutlineConfirmed(t){console.log("[PaperApp] Outline confirmed"),this.advanceStage()}onRequirementsConfirmed(t){console.log("[PaperApp] Requirements confirmed"),this.advanceStage()}onDraftingConfirmed(t){console.log("[PaperApp] Drafting confirmed"),this.advanceStage()}onPolishingConfirmed(t){console.log("[PaperApp] Polishing confirmed"),this.advanceStage()}onReviewPassed(t){console.log("[PaperApp] Review passed"),this.advanceStage()}onReviewFailed(t){console.log("[PaperApp] Review failed, returning to polishing"),this.rollbackStage()}onSubmissionComplete(t){console.log("[PaperApp] Submission complete:",t.detail),alert("🎉 论文已提交！")}advanceStage(){if(!this.configReady&&this.currentStage==="INTAKE"){alert("请先完成 Intake 阶段的选题确认");return}const t=J.indexOf(this.currentStage);t<J.length-1&&(this.completedStages.includes(this.currentStage)||(this.completedStages=[...this.completedStages,this.currentStage]),this.currentStage=J[t+1],this.configReady=!1,this.previewMode=!1,this.previewStage=null)}rollbackStage(){const t=J.indexOf(this.currentStage);t>0&&(this.currentStage=J[t-1],this.completedStages=this.completedStages.filter(e=>J.indexOf(e)<t-1),this.configReady=!0,this.previewMode=!1,this.previewStage=null)}onPreviewStage(){this.previewMode=!0,this.previewStage=this.currentStage}closePreview(){this.previewMode=!1,this.previewStage=null}selectStage(t){const e=t.detail;e===this.currentStage?(this.previewMode=!1,this.previewStage=null):(this.previewMode=!0,this.previewStage=e)}canAdvance(){return this.currentStage==="INTAKE"?this.configReady:!0}canRollback(){return this.currentStage!=="INTAKE"}getStageDisplayName(t){return{INTAKE:"Intake - 校验输入",LITERATURE:"Literature - 文献检索",OUTLINE:"Outline - 确定结构",DATA_REQUIREMENTS:"Data Req. - 算例需求",DRAFTING:"Drafting - 章节草稿",POLISHING:"Polishing - PoF润色",REVIEW:"Review - 质量门禁",FINALIZE:"Finalize - 投稿封装"}[t]||t}renderStageContent(t){return t==="INTAKE"?n`
        <config-stage
          @config-ready-change=${this.onConfigReadyChange}
          @topic-confirmed=${this.onTopicConfirmed}
          @task-loaded=${this.onTaskLoaded}
        ></config-stage>
      `:t==="LITERATURE"?n`
        <literature-stage
          @literature-confirmed=${this.onLiteratureConfirmed}
        ></literature-stage>
      `:t==="OUTLINE"?n`
        <outline-stage
          @outline-confirmed=${this.onOutlineConfirmed}
        ></outline-stage>
      `:t==="DATA_REQUIREMENTS"?n`
        <data-requirements-stage
          @requirements-confirmed=${this.onRequirementsConfirmed}
        ></data-requirements-stage>
      `:t==="DRAFTING"?n`
        <drafting-stage
          @drafting-confirmed=${this.onDraftingConfirmed}
        ></drafting-stage>
      `:t==="POLISHING"?n`
        <polishing-stage
          @polishing-confirmed=${this.onPolishingConfirmed}
        ></polishing-stage>
      `:t==="REVIEW"?n`
        <review-stage
          @review-passed=${this.onReviewPassed}
          @review-failed=${this.onReviewFailed}
        ></review-stage>
      `:t==="FINALIZE"?n`
        <finalize-stage
          @submission-complete=${this.onSubmissionComplete}
        ></finalize-stage>
      `:n`
      <div class="empty-state">
        <h2>${this.getStageDisplayName(t)}</h2>
        <p>Stage not found</p>
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
              @task-select=${this.onTaskSelect}
              @task-deleted=${this.onTaskDeleted}
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
            <span style="font-size: var(--text-sm); color: var(--color-text-tertiary);">
              当前没有进行中的论文写作任务
            </span>
          </div>
          
          <aside>
            <paper-sidebar
              .folders=${this.folders}
              .tags=${this.tags}
              .selectedFolderId=${this.selectedFolderId}
              @folder-select=${this.onFolderSelect}
              @create-paper=${this.onCreatePaper}
              @task-select=${this.onTaskSelect}
              @task-deleted=${this.onTaskDeleted}
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
    `}};m.styles=y`
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
  `;k([c()],m.prototype,"papers",2);k([c()],m.prototype,"folders",2);k([c()],m.prototype,"tags",2);k([c()],m.prototype,"stats",2);k([c()],m.prototype,"selectedFolderId",2);k([c()],m.prototype,"searchQuery",2);k([c()],m.prototype,"loading",2);k([c()],m.prototype,"showUploader",2);k([c()],m.prototype,"workflowActive",2);k([c()],m.prototype,"currentStage",2);k([c()],m.prototype,"completedStages",2);k([c()],m.prototype,"configReady",2);k([c()],m.prototype,"previewMode",2);k([c()],m.prototype,"previewStage",2);m=k([x("paper-app")],m);
