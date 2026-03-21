(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis,pe=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),fe=new WeakMap;let Pe=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(pe&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=fe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&fe.set(t,e))}return e}toString(){return this.cssText}};const De=r=>new Pe(typeof r=="string"?r:r+"",void 0,he),S=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,a,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+r[i+1],r[0]);return new Pe(t,r,he)},Ne=(r,e)=>{if(pe)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),a=J.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,r.appendChild(s)}},be=pe?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return De(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ue,defineProperty:Me,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:je,getOwnPropertySymbols:He,getPrototypeOf:Le}=Object,T=globalThis,me=T.trustedTypes,Ve=me?me.emptyScript:"",oe=T.reactiveElementPolyfillSupport,V=(r,e)=>r,X={toAttribute(r,e){switch(e){case Boolean:r=r?Ve:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ue=(r,e)=>!Ue(r,e),ye={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:ue};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),T.litPropertyMetadata??(T.litPropertyMetadata=new WeakMap);let M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Me(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){const{get:a,set:i}=Fe(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:a,set(o){const c=a==null?void 0:a.call(this);i==null||i.call(this,o),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ye}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;const e=Le(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){const t=this.properties,s=[...je(t),...He(t)];for(const a of s)this.createProperty(a,t[a])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,a]of t)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const a=this._$Eu(t,s);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const a of s)t.unshift(be(a))}else e!==void 0&&t.push(be(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var i;const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){const o=(((i=s.converter)==null?void 0:i.toAttribute)!==void 0?s.converter:X).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){var i,o;const s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const c=s.getPropertyOptions(a),l=typeof c.converter=="function"?{fromAttribute:c.converter}:((i=c.converter)==null?void 0:i.fromAttribute)!==void 0?c.converter:X;this._$Em=a;const h=l.fromAttribute(t,c.type);this[a]=h??((o=this._$Ej)==null?void 0:o.get(a))??h,this._$Em=null}}requestUpdate(e,t,s,a=!1,i){var o;if(e!==void 0){const c=this.constructor;if(a===!1&&(i=this[e]),s??(s=c.getPropertyOptions(e)),!((s.hasChanged??ue)(i,t)||s.useDefault&&s.reflect&&i===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(c._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:a,wrapped:i},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[i,o]of a){const{wrapped:c}=o,l=this[i];c!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(a=>{var i;return(i=a.hostUpdate)==null?void 0:i.call(a)}),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var a;return(a=s.hostUpdated)==null?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[V("elementProperties")]=new Map,M[V("finalized")]=new Map,oe==null||oe({ReactiveElement:M}),(T.reactiveElementVersions??(T.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,$e=r=>r,ee=B.trustedTypes,xe=ee?ee.createPolicy("lit-html",{createHTML:r=>r}):void 0,Te="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Ce="?"+P,Be=`<${Ce}>`,z=document,G=()=>z.createComment(""),q=r=>r===null||typeof r!="object"&&typeof r!="function",ve=Array.isArray,Ge=r=>ve(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ne=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,we=/-->/g,_e=/>/g,C=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Se=/"/g,Ie=/^(?:script|style|textarea|title)$/i,qe=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),n=qe(1),D=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ee=new WeakMap,O=z.createTreeWalker(z,129);function Oe(r,e){if(!ve(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return xe!==void 0?xe.createHTML(e):e}const Ke=(r,e)=>{const t=r.length-1,s=[];let a,i=e===2?"<svg>":e===3?"<math>":"",o=L;for(let c=0;c<t;c++){const l=r[c];let h,g,p=-1,A=0;for(;A<l.length&&(o.lastIndex=A,g=o.exec(l),g!==null);)A=o.lastIndex,o===L?g[1]==="!--"?o=we:g[1]!==void 0?o=_e:g[2]!==void 0?(Ie.test(g[2])&&(a=RegExp("</"+g[2],"g")),o=C):g[3]!==void 0&&(o=C):o===C?g[0]===">"?(o=a??L,p=-1):g[1]===void 0?p=-2:(p=o.lastIndex-g[2].length,h=g[1],o=g[3]===void 0?C:g[3]==='"'?Se:Ae):o===Se||o===Ae?o=C:o===we||o===_e?o=L:(o=C,a=void 0);const k=o===C&&r[c+1].startsWith("/>")?" ":"";i+=o===L?l+Be:p>=0?(s.push(h),l.slice(0,p)+Te+l.slice(p)+P+k):l+P+(p===-2?c:k)}return[Oe(r,i+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class K{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let i=0,o=0;const c=e.length-1,l=this.parts,[h,g]=Ke(e,t);if(this.el=K.createElement(h,s),O.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=O.nextNode())!==null&&l.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(const p of a.getAttributeNames())if(p.endsWith(Te)){const A=g[o++],k=a.getAttribute(p).split(P),Z=/([.?@])?(.*)/.exec(A);l.push({type:1,index:i,name:Z[2],strings:k,ctor:Z[1]==="."?Qe:Z[1]==="?"?Ye:Z[1]==="@"?Ze:ae}),a.removeAttribute(p)}else p.startsWith(P)&&(l.push({type:6,index:i}),a.removeAttribute(p));if(Ie.test(a.tagName)){const p=a.textContent.split(P),A=p.length-1;if(A>0){a.textContent=ee?ee.emptyScript:"";for(let k=0;k<A;k++)a.append(p[k],G()),O.nextNode(),l.push({type:2,index:++i});a.append(p[A],G())}}}else if(a.nodeType===8)if(a.data===Ce)l.push({type:2,index:i});else{let p=-1;for(;(p=a.data.indexOf(P,p+1))!==-1;)l.push({type:7,index:i}),p+=P.length-1}i++}}static createElement(e,t){const s=z.createElement("template");return s.innerHTML=e,s}}function F(r,e,t=r,s){var o,c;if(e===D)return e;let a=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const i=q(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==i&&((c=a==null?void 0:a._$AO)==null||c.call(a,!1),i===void 0?a=void 0:(a=new i(r),a._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=a:t._$Cl=a),a!==void 0&&(e=F(r,a._$AS(r,e.values),a,s)),e}class We{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,a=((e==null?void 0:e.creationScope)??z).importNode(t,!0);O.currentNode=a;let i=O.nextNode(),o=0,c=0,l=s[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new Q(i,i.nextSibling,this,e):l.type===1?h=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(h=new Je(i,this,e)),this._$AV.push(h),l=s[++c]}o!==(l==null?void 0:l.index)&&(i=O.nextNode(),o++)}return O.currentNode=z,a}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Q{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),q(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ge(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&q(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){var i;const{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=K.createElement(Oe(s.h,s.h[0]),this.options)),s);if(((i=this._$AH)==null?void 0:i._$AD)===a)this._$AH.p(t);else{const o=new We(a,this),c=o.u(this.options);o.p(t),this.T(c),this._$AH=o}}_$AC(e){let t=Ee.get(e.strings);return t===void 0&&Ee.set(e.strings,t=new K(e)),t}k(e){ve(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,a=0;for(const i of e)a===t.length?t.push(s=new Q(this.O(G()),this.O(G()),this,this.options)):s=t[a],s._$AI(i),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const a=$e(e).nextSibling;$e(e).remove(),e=a}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class ae{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,a){const i=this.strings;let o=!1;if(i===void 0)e=F(this,e,t,0),o=!q(e)||e!==this._$AH&&e!==D,o&&(this._$AH=e);else{const c=e;let l,h;for(e=i[0],l=0;l<i.length-1;l++)h=F(this,c[s+l],t,l),h===D&&(h=this._$AH[l]),o||(o=!q(h)||h!==this._$AH[l]),h===u?e=u:e!==u&&(e+=(h??"")+i[l+1]),this._$AH[l]=h}o&&!a&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Qe extends ae{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class Ye extends ae{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class Ze extends ae{constructor(e,t,s,a,i){super(e,t,s,a,i),this.type=5}_$AI(e,t=this){if((e=F(this,e,t,0)??u)===D)return;const s=this._$AH,a=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==u&&(s===u||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Je{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const le=B.litHtmlPolyfillSupport;le==null||le(K,Q),(B.litHtmlVersions??(B.litHtmlVersions=[])).push("3.3.2");const Xe=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let a=s._$litPart$;if(a===void 0){const i=(t==null?void 0:t.renderBefore)??null;s._$litPart$=a=new Q(e.insertBefore(G(),i),i,void 0,t??{})}return a._$AI(r),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=globalThis;let y=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return D}};var ke;y._$litElement$=!0,y.finalized=!0,(ke=R.litElementHydrateSupport)==null||ke.call(R,{LitElement:y});const ce=R.litElementPolyfillSupport;ce==null||ce({LitElement:y});(R.litElementVersions??(R.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:ue},tt=(r=et,e,t)=>{const{kind:s,metadata:a}=t;let i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(t.name,r),s==="accessor"){const{name:o}=t;return{set(c){const l=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,l,r,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,r,c),c}}}if(s==="setter"){const{name:o}=t;return function(c){const l=this[o];e.call(this,c),this.requestUpdate(o,l,r,!0,c)}}throw Error("Unsupported decorator location: "+s)};function m(r){return(e,t)=>typeof t=="object"?tt(r,e,t):((s,a,i)=>{const o=a.hasOwnProperty(i);return a.constructor.createProperty(i,s),o?Object.getOwnPropertyDescriptor(a,i):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(r){return m({...r,state:!0,attribute:!1})}const rt="/api";async function x(r,e,t){const s={method:r,headers:{}};t instanceof FormData?s.body=t:t&&(s.headers={"Content-Type":"application/json"},s.body=JSON.stringify(t));const a=await fetch(`${rt}${e}`,s);if(!a.ok){const i=await a.json().catch(()=>({error:"Unknown error"}));throw new Error(i.error||`HTTP ${a.status}`)}return a.json()}const I={uploadPaper:r=>x("POST","/papers",r),listPapers:r=>{const e=new URLSearchParams;r!=null&&r.page&&e.set("page",String(r.page)),r!=null&&r.limit&&e.set("limit",String(r.limit)),r!=null&&r.search&&e.set("search",r.search),r!=null&&r.folder_id&&e.set("folder_id",String(r.folder_id));const t=e.toString();return x("GET",`/papers${t?`?${t}`:""}`)},getPaper:r=>x("GET",`/papers/${r}`),updatePaper:(r,e)=>x("PUT",`/papers/${r}`,e),deletePaper:r=>x("DELETE",`/papers/${r}`),listFolders:()=>x("GET","/folders"),createFolder:(r,e)=>x("POST","/folders",{name:r,parent_id:e}),deleteFolder:r=>x("DELETE",`/folders/${r}`),listTags:()=>x("GET","/tags"),createTag:(r,e)=>x("POST","/tags",{name:r,color:e||"#10b981"}),deleteTag:r=>x("DELETE",`/tags/${r}`),getStats:()=>x("GET","/stats")};var at=Object.defineProperty,st=Object.getOwnPropertyDescriptor,Re=(r,e,t,s)=>{for(var a=s>1?void 0:s?st(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&at(e,t,a),a};let te=class extends y{constructor(){super(...arguments),this.searchValue=""}onSearch(r){const e=r.target;this.searchValue=e.value,this.dispatchEvent(new CustomEvent("search",{detail:this.searchValue}))}render(){return n`
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
    `}};te.styles=S`
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
  `;Re([d()],te.prototype,"searchValue",2);te=Re([E("paper-header")],te);var it=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,se=(r,e,t,s)=>{for(var a=s>1?void 0:s?ot(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&it(e,t,a),a};let j=class extends y{constructor(){super(...arguments),this.folders=[],this.tags=[],this.selectedFolderId=null}selectFolder(r){this.dispatchEvent(new CustomEvent("folder-select",{detail:r}))}createPaper(){this.dispatchEvent(new CustomEvent("create-paper"))}render(){return n`
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
          ${this.folders.map(r=>n`
            <div class="nav-item ${this.selectedFolderId===r.id?"active":""}"
                 @click=${()=>this.selectFolder(r.id)}>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              ${r.name}
            </div>
          `)}
        </div>
        
        <div class="section">
          <h3>Tags</h3>
          <div class="tags-container">
            ${this.tags.map(r=>n`
              <span class="tag" style="background: ${r.color}20;">
                <span class="tag-dot" style="background: ${r.color};"></span>
                ${r.name}
              </span>
            `)}
          </div>
        </div>
      </div>
    `}};j.styles=S`
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
  `;se([m({type:Array})],j.prototype,"folders",2);se([m({type:Array})],j.prototype,"tags",2);se([m({type:Number})],j.prototype,"selectedFolderId",2);j=se([E("paper-sidebar")],j);var nt=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,ge=(r,e,t,s)=>{for(var a=s>1?void 0:s?lt(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&nt(e,t,a),a};let W=class extends y{constructor(){super(...arguments),this.showConfirm=!1}async download(){const r=document.createElement("a");r.href=`/uploads/${this.paper.file_path.replace("uploads/","")}`,r.download=this.paper.file_name,r.click()}async delete(){if(!this.showConfirm){this.showConfirm=!0,setTimeout(()=>this.showConfirm=!1,3e3);return}try{await I.deletePaper(this.paper.id),this.dispatchEvent(new CustomEvent("delete"))}catch(r){console.error("Delete failed:",r)}}render(){const{title:r,authors:e,journal:t,year:s,abstract:a,file_name:i,tags:o}=this.paper;return n`
      <div class="card">
        <div class="header">
          <div class="title">${r||"Untitled"}</div>
          ${s?n`<span class="year">${s}</span>`:""}
        </div>
        
        ${e?n`<div class="authors">${e}</div>`:""}
        ${t?n`<div class="journal">${t}</div>`:""}
        
        ${a?n`<div class="abstract">${a}</div>`:""}
        
        <div class="footer">
          <div class="tags">
            ${o==null?void 0:o.slice(0,3).map(c=>n`
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
    `}};W.styles=S`
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
  `;ge([m({type:Object})],W.prototype,"paper",2);ge([d()],W.prototype,"showConfirm",2);W=ge([E("paper-card")],W);var ct=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,ze=(r,e,t,s)=>{for(var a=s>1?void 0:s?dt(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&ct(e,t,a),a};let re=class extends y{constructor(){super(...arguments),this.papers=[]}render(){return n`
      <div class="grid">
        ${this.papers.map(r=>n`
          <paper-card .paper=${r} @delete=${()=>this.dispatchEvent(new CustomEvent("delete"))}></paper-card>
        `)}
      </div>
    `}};re.styles=S`
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
  `;ze([m({type:Array})],re.prototype,"papers",2);re=ze([E("paper-grid")],re);var pt=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,w=(r,e,t,s)=>{for(var a=s>1?void 0:s?ht(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&pt(e,t,a),a};let b=class extends y{constructor(){super(...arguments),this.folders=[],this.file=null,this.paperTitle="",this.authors="",this.abstract="",this.journal="",this.year="",this.doi="",this.folderId="",this.loading=!1,this.error=""}close(){this.dispatchEvent(new CustomEvent("close"))}onFileChange(r){var t;const e=r.target;(t=e.files)!=null&&t[0]&&(this.file=e.files[0],this.paperTitle||(this.paperTitle=this.file.name.replace(/\.pdf$/i,"")))}async submit(r){if(r.preventDefault(),!this.file){this.error="Please select a PDF file";return}this.loading=!0,this.error="";try{const e=new FormData;e.append("file",this.file),e.append("title",this.paperTitle),e.append("authors",this.authors),e.append("abstract",this.abstract),e.append("journal",this.journal),this.year&&e.append("year",this.year),e.append("doi",this.doi),this.folderId&&e.append("folder_id",this.folderId),await I.uploadPaper(e),this.dispatchEvent(new CustomEvent("upload"))}catch(e){this.error=e.message}finally{this.loading=!1}}render(){return n`
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
            <input type="text" .value=${this.paperTitle} @input=${r=>this.paperTitle=r.target.value}>
          </div>
          
          <div class="field">
            <label>Authors</label>
            <input type="text" .value=${this.authors} @input=${r=>this.authors=r.target.value}>
          </div>
          
          <div class="field" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
            <div class="field">
              <label>Year</label>
              <input type="number" .value=${this.year} @input=${r=>this.year=r.target.value}>
            </div>
            <div class="field">
              <label>Folder</label>
              <select .value=${this.folderId} @change=${r=>this.folderId=r.target.value}>
                <option value="">None</option>
                ${this.folders.map(r=>n`<option value=${r.id}>${r.name}</option>`)}
              </select>
            </div>
          </div>
          
          <div class="field">
            <label>Journal / Venue</label>
            <input type="text" .value=${this.journal} @input=${r=>this.journal=r.target.value}>
          </div>
          
          <div class="field">
            <label>DOI</label>
            <input type="text" .value=${this.doi} @input=${r=>this.doi=r.target.value}>
          </div>
          
          <div class="field">
            <label>Abstract</label>
            <textarea .value=${this.abstract} @input=${r=>this.abstract=r.target.value}></textarea>
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
    `}};b.styles=S`
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
  `;w([m({type:Array})],b.prototype,"folders",2);w([d()],b.prototype,"file",2);w([d()],b.prototype,"paperTitle",2);w([d()],b.prototype,"authors",2);w([d()],b.prototype,"abstract",2);w([d()],b.prototype,"journal",2);w([d()],b.prototype,"year",2);w([d()],b.prototype,"doi",2);w([d()],b.prototype,"folderId",2);w([d()],b.prototype,"loading",2);w([d()],b.prototype,"error",2);b=w([E("paper-uploader")],b);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut={CHILD:2},vt=r=>(...e)=>({_$litDirective$:r,values:e});class gt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class de extends gt{constructor(e){if(super(e),this.it=u,e.type!==ut.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this._t=void 0,this.it=e;if(e===D)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}de.directiveName="unsafeHTML",de.resultType=1;const ft=vt(de);var bt=Object.defineProperty,mt=Object.getOwnPropertyDescriptor,ie=(r,e,t,s)=>{for(var a=s>1?void 0:s?mt(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&bt(e,t,a),a};let H=class extends y{constructor(){super(...arguments),this.label="",this.value=0,this.icon="file"}getIcon(){const r={"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'};return r[this.icon]||r["file-text"]}render(){return n`
      <div class="card">
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${ft(this.getIcon())}
          </svg>
        </div>
        <div class="info">
          <div class="value">${this.value}</div>
          <div class="label">${this.label}</div>
        </div>
      </div>
    `}};H.styles=S`
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
  `;ie([m({type:String})],H.prototype,"label",2);ie([m({type:Number})],H.prototype,"value",2);ie([m({type:String})],H.prototype,"icon",2);H=ie([E("stat-card")],H);var yt=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,Y=(r,e,t,s)=>{for(var a=s>1?void 0:s?$t(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&yt(e,t,a),a};let N=class extends y{constructor(){super(...arguments),this.completedStages=[],this.canAdvance=!0,this.canRollback=!0}get stages(){return[{key:"INTAKE",label:"Intake",description:"校验输入、建立上下文",agent:"Orchestrator"},{key:"LITERATURE",label:"Literature",description:"文献检索、证据沉淀",agent:"Agent A"},{key:"OUTLINE",label:"Outline",description:"确定结构、论证路径",agent:"Agent A"},{key:"DATA_REQUIREMENTS",label:"Data Req.",description:"算例需求、数据映射",agent:"Agent B"},{key:"DRAFTING",label:"Drafting",description:"章节草稿、无缺段检查",agent:"Agent C"},{key:"POLISHING",label:"Polishing",description:"PoF风格润色",agent:"Agent C"},{key:"REVIEW",label:"Review",description:"质量门禁、返工决策",agent:"Orchestrator"},{key:"FINALIZE",label:"Finalize",description:"固化产物、投稿封装",agent:"Orchestrator"}]}isCompleted(r){return this.completedStages.includes(r)}isCurrent(r){return r===this.currentStage}canPreviewStage(r){const e=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"],t=e.indexOf(this.currentStage);return e.indexOf(r)<=t+1}previewStage(){this.dispatchEvent(new CustomEvent("preview-stage"))}advanceStage(){this.dispatchEvent(new CustomEvent("advance-stage"))}rollbackStage(){this.dispatchEvent(new CustomEvent("rollback-stage"))}selectStage(r){this.canPreviewStage(r)&&this.dispatchEvent(new CustomEvent("select-stage",{detail:r}))}render(){const r=this.stages.find(e=>e.key===this.currentStage);return n`
      <section class="wrap">
        <div class="stages">
          ${this.stages.map(e=>{const t=this.isCurrent(e.key),s=this.isCompleted(e.key),a=this.canPreviewStage(e.key);return n`
              <article 
                class="stage ${t?"current":""} ${s?"completed":""} ${a&&!t?"previewable":""}"
                @click=${()=>this.selectStage(e.key)}
              >
                <div class="stage-name">
                  <span class="stage-label">${e.label}</span>
                  ${t?n`<span class="badge current">当前</span>`:s?n`<span class="badge">已完成</span>`:a?n`<span class="badge preview">可预览</span>`:""}
                </div>
                <div class="stage-meta">${e.description}</div>
                ${e.agent?n`<span class="agent-tag">${e.agent}</span>`:""}
              </article>
            `})}
        </div>

        <div class="actions">
          <div class="current-stage-info">
            <span>当前阶段：</span>
            <strong>${(r==null?void 0:r.label)||this.currentStage}</strong>
            ${r!=null&&r.agent?n`<span class="agent-tag">${r.agent}</span>`:""}
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
    `}};N.styles=S`
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
  `;Y([m({type:String})],N.prototype,"currentStage",2);Y([m({type:Array})],N.prototype,"completedStages",2);Y([m({type:Boolean})],N.prototype,"canAdvance",2);Y([m({type:Boolean})],N.prototype,"canRollback",2);N=Y([E("stage-navigator")],N);var xt=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,_=(r,e,t,s)=>{for(var a=s>1?void 0:s?wt(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&xt(e,t,a),a};let $=class extends y{constructor(){super(...arguments),this.uploadedPapers=[],this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null},this.processing=!1,this.processingCurrent=0,this.analysisComplete=!1,this.feedbackHistory=[],this.currentFeedback="",this.dragover=!1}notifyReadyState(){const r=!this.processing&&this.analysisComplete&&this.selectedTopic.title.trim().length>0;this.dispatchEvent(new CustomEvent("config-ready-change",{detail:!!r}))}onReferenceFileInput(r){const e=r.target;!e.files||e.files.length===0||(this.addReferenceFiles(Array.from(e.files)),e.value="")}onDrop(r){var t;r.preventDefault(),this.dragover=!1;const e=(t=r.dataTransfer)==null?void 0:t.files;!e||e.length===0||this.addReferenceFiles(Array.from(e).filter(s=>s.name.endsWith(".pdf")))}onDragOver(r){r.preventDefault(),this.dragover=!0}onDragLeave(){this.dragover=!1}addReferenceFiles(r){if(r.length===0)return;const e=this.uploadedPapers.length+1,t=r.map((s,a)=>({id:e+a,name:s.name,pages:Math.floor(Math.random()*20)+5,status:"uploaded"}));this.uploadedPapers=[...this.uploadedPapers,...t],this.startProcessing()}startProcessing(){if(this.uploadedPapers.length===0||this.processing)return;this.processing=!0,this.processingCurrent=0,this.analysisComplete=!1,this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null},this.notifyReadyState();const r=this.uploadedPapers.length;let e=0;const t=()=>{if(e+=1,this.processingCurrent=e,this.uploadedPapers=this.uploadedPapers.map((s,a)=>a+1<e?{...s,status:"done"}:a+1===e?{...s,status:e<=r*.6?"processing":"analyzing"}:{...s,status:"uploaded"}),e>=r){this.uploadedPapers=this.uploadedPapers.map(s=>({...s,status:"done",metadata:{title:s.name.replace(/\.pdf$/i,""),authors:"待提取",abstract:"正在通过 AI 分析论文内容...",keywords:[],contentSummary:"AI 正在深度阅读和分析论文..."}})),this.processing=!1,this.analysisComplete=!0,this.topics=this.generateRealisticTopics(),this.requestUpdate(),this.notifyReadyState();return}window.setTimeout(t,800)};window.setTimeout(t,500)}generateRealisticTopics(){const e=this.uploadedPapers.map(t=>t.name.replace(/\.pdf$/i,"").replace(/[_-]+/g," "))[0]||"基于输入文献的研究";return[{id:1,title:`${e} 方法的改进与优化研究`,score:92,summary:"基于现有方法提出改进方案，在保持原有优势的基础上提升性能或效率。",rationale:"通过分析现有文献的方法论，发现可行的改进空间和优化方向。",feasibility:"高 - 改进方案明确，可通过数值实验验证。"},{id:2,title:`${e} 在新场景/条件下的应用探索`,score:85,summary:"将现有方法应用于新的物理场景或边界条件，拓展其适用范围。",rationale:"现有方法在特定条件下表现良好，有潜力应用于相关新场景。",feasibility:"中 - 需要针对新场景进行适应性调整和验证。"},{id:3,title:`${e} 与其他方法的对比与融合研究`,score:78,summary:"系统对比现有方法与其他主流方法，分析各自优缺点，探索融合可能性。",rationale:"通过对比研究揭示不同方法的适用边界，为方法选择提供依据。",feasibility:"中 - 需要全面的对比分析和实验验证。"},{id:4,title:`面向${e}的高效计算方法研究`,score:88,summary:"针对现有方法的计算瓶颈，开发更高效的数值算法或近似方法。",rationale:"计算效率是实际应用的关键因素，提升效率具有重要实用价值。",feasibility:"高 - 优化目标明确，可通过算法改进实现。"}]}selectTopic(r){this.selectedTopicId=r.id,this.selectedTopic={title:r.title,researchObjective:`针对 ${r.title} 的核心问题，建立理论模型并进行数值验证。`,expectedContribution:"提出一种可行的研究方案，产出具有创新性的学术成果。",selectedCandidateId:r.id},this.notifyReadyState()}submitFeedback(){if(!this.currentFeedback.trim()||!this.selectedTopicId)return;this.feedbackHistory=[...this.feedbackHistory,{topicId:this.selectedTopicId,feedback:this.currentFeedback.trim(),timestamp:new Date}];const r=this.topics.map((e,t)=>({...e,id:e.id+10,score:Math.min(98,e.score+Math.floor(Math.random()*5)),title:`${e.title}（根据反馈优化）`}));this.topics=r,this.selectedTopicId=null,this.currentFeedback="",this.notifyReadyState()}regenerateTopics(){if(this.processing||this.uploadedPapers.length===0)return;const r=this.generateRealisticTopics().map((e,t)=>({...e,id:t+100,score:Math.min(95,e.score-t*3)}));this.topics=r,this.selectedTopicId=null,this.selectedTopic={title:"",researchObjective:"",expectedContribution:"",selectedCandidateId:null},this.notifyReadyState()}updateTopicField(r,e){this.selectedTopic={...this.selectedTopic,[r]:e},this.notifyReadyState()}confirmTopic(){if(!this.selectedTopic.title.trim()){alert("请先选择一个选题或输入论文标题");return}this.notifyReadyState(),this.dispatchEvent(new CustomEvent("topic-confirmed",{detail:{topic:this.selectedTopic,papers:this.uploadedPapers}}))}statusLabel(r){return{uploaded:"待处理",processing:"解析中",analyzing:"AI分析中",done:"已完成",error:"失败"}[r]||r}get progressPercent(){return this.uploadedPapers.length===0?0:Math.min(100,Math.round(this.processingCurrent/this.uploadedPapers.length*100))}render(){const r=this.uploadedPapers.length>0,e=this.topics.length>0;return n`
      <section class="layout">
        <!-- Panel 1: 参考论文上传区 -->
        <article class="panel">
          <h3><span class="step">1</span>参考论文上传</h3>
          <p>拖拽或点击上传 PDF 论文，AI 将自动分析论文内容</p>
          
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

          <div class="paper-list">
            ${this.uploadedPapers.length===0?n`<div class="empty">尚未上传参考论文</div>`:this.uploadedPapers.map(t=>n`
                  <div class="paper-item">
                    <div>
                      <div class="paper-name">${t.name}</div>
                      <div class="paper-meta">${t.pages} 页</div>
                      ${t.metadata?n`
                        <div class="metadata-preview">
                          <div class="meta-title">${t.metadata.title}</div>
                          <div class="meta-authors">${t.metadata.authors}</div>
                          <div class="meta-keywords">
                            ${t.metadata.keywords.map(s=>n`<span class="keyword-tag">${s}</span>`)}
                          </div>
                        </div>
                      `:""}
                    </div>
                    <div class="paper-status">
                      <span class="status ${t.status}">${this.statusLabel(t.status)}</span>
                    </div>
                  </div>
                `)}
          </div>

          <button 
            ?disabled=${this.processing} 
            @click=${()=>{var t,s;return(s=(t=this.shadowRoot)==null?void 0:t.querySelector("label.dropzone input"))==null?void 0:s.click()}}
          >
            + 继续添加论文
          </button>
        </article>

        <!-- Panel 2: 自动处理与选题推荐 -->
        <article class="panel">
          <h3><span class="step">2</span>AI 分析与选题推荐</h3>
          
          ${this.processing?n`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>正在处理论文，请稍候...</div>
              <div>${this.processingCurrent} / ${this.uploadedPapers.length}</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
            </div>
          `:r?n`
            <p>✅ 分析完成，请从右侧候选选题中选择或修改。</p>
            
            ${e?n`
              <div class="topics-section">
                <strong>推荐选题（可多轮反馈）</strong>
                ${this.topics.map(t=>n`
                  <div 
                    class="candidate ${t.id===this.selectedTopicId?"active":""}"
                    @click=${()=>this.selectTopic(t)}
                  >
                    <div class="candidate-header">
                      <span class="candidate-title">${t.title}</span>
                      <span class="candidate-score">${t.score}%</span>
                    </div>
                    <div class="candidate-summary">${t.summary}</div>
                    <div class="candidate-detail">
                      <div><strong>理论依据：</strong>${t.rationale}</div>
                      <div><strong>可行性：</strong>${t.feasibility}</div>
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
              
              <!-- Feedback Section -->
              ${this.selectedTopicId?n`
                <div class="feedback-section">
                  <h4>💬 选题反馈（支持多轮）</h4>
                  
                  ${this.feedbackHistory.length>0?n`
                    <div class="feedback-history">
                      ${this.feedbackHistory.map((t,s)=>n`
                        <div class="feedback-item">
                          <span class="round">第 ${s+1} 轮反馈：</span>
                          <span class="text">${t.feedback}</span>
                        </div>
                      `)}
                    </div>
                  `:""}
                  
                  <div class="feedback-input">
                    <textarea 
                      placeholder="输入对选题的修改意见或要求，AI 将根据反馈重新生成..."
                      .value=${this.currentFeedback}
                      @input=${t=>this.currentFeedback=t.target.value}
                    ></textarea>
                    <button @click=${this.submitFeedback} ?disabled=${!this.currentFeedback.trim()}>
                      提交反馈并重新生成
                    </button>
                  </div>
                </div>
              `:""}
            `:n`
              <div class="empty-waiting">
                <div class="icon">⏳</div>
                <p>等待 AI 分析完成...</p>
              </div>
            `}
          `:n`
            <div class="empty-waiting">
              <div class="icon">📚</div>
              <p>请上传参考论文</p>
              <p class="subtle">AI 将自动分析论文并推荐研究选题</p>
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
                  @input=${t=>this.updateTopicField("title",t.target.value)}
                >
              </div>

              <div class="field">
                <label>研究目标</label>
                <textarea
                  placeholder="描述研究的核心目标..."
                  .value=${this.selectedTopic.researchObjective}
                  @input=${t=>this.updateTopicField("researchObjective",t.target.value)}
                ></textarea>
              </div>

              <div class="field">
                <label>预期贡献</label>
                <textarea
                  placeholder="说明研究的创新点和贡献..."
                  .value=${this.selectedTopic.expectedContribution}
                  @input=${t=>this.updateTopicField("expectedContribution",t.target.value)}
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
    `}};$.styles=S`
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

    @media (max-width: 1280px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .panel {
        min-height: auto;
      }
    }
  `;_([d()],$.prototype,"uploadedPapers",2);_([d()],$.prototype,"topics",2);_([d()],$.prototype,"selectedTopicId",2);_([d()],$.prototype,"selectedTopic",2);_([d()],$.prototype,"processing",2);_([d()],$.prototype,"processingCurrent",2);_([d()],$.prototype,"analysisComplete",2);_([d()],$.prototype,"feedbackHistory",2);_([d()],$.prototype,"currentFeedback",2);_([d()],$.prototype,"dragover",2);$=_([E("config-stage")],$);var _t=Object.defineProperty,At=Object.getOwnPropertyDescriptor,f=(r,e,t,s)=>{for(var a=s>1?void 0:s?At(e,t):e,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&_t(e,t,a),a};const U=["INTAKE","LITERATURE","OUTLINE","DATA_REQUIREMENTS","DRAFTING","POLISHING","REVIEW","FINALIZE"];let v=class extends y{constructor(){super(...arguments),this.papers=[],this.folders=[],this.tags=[],this.stats={total_papers:0,total_folders:0,total_tags:0,papers_this_week:0},this.selectedFolderId=null,this.searchQuery="",this.loading=!0,this.showUploader=!1,this.workflowActive=!1,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}async connectedCallback(){super.connectedCallback(),await this.loadData()}async loadData(){this.loading=!0;try{const[r,e,t]=await Promise.all([I.listFolders(),I.listTags(),I.getStats()]);this.folders=r,this.tags=e,this.stats=t,await this.loadPapers()}catch(r){console.error("Failed to load data:",r)}finally{this.loading=!1}}async loadPapers(){try{const r=await I.listPapers({folder_id:this.selectedFolderId??void 0,search:this.searchQuery||void 0});this.papers=r.papers||[]}catch(r){console.error("Failed to load papers:",r)}}onSearch(r){this.searchQuery=r.detail,this.loadPapers()}onFolderSelect(r){this.selectedFolderId=r.detail,this.loadPapers()}async onUpload(){this.showUploader=!1,await this.loadData()}async onDeletePaper(){await this.loadPapers(),this.stats=await I.getStats()}onCreatePaper(){this.workflowActive=!0,this.currentStage="INTAKE",this.completedStages=[],this.configReady=!1,this.previewMode=!1,this.previewStage=null}onConfigReadyChange(r){this.configReady=r.detail}advanceStage(){if(!this.configReady&&this.currentStage==="INTAKE"){alert("请先完成 Intake 阶段的选题确认");return}const r=U.indexOf(this.currentStage);r<U.length-1&&(this.completedStages.includes(this.currentStage)||(this.completedStages=[...this.completedStages,this.currentStage]),this.currentStage=U[r+1],this.configReady=!1,this.previewMode=!1,this.previewStage=null)}rollbackStage(){const r=U.indexOf(this.currentStage);r>0&&(this.currentStage=U[r-1],this.completedStages=this.completedStages.filter(e=>U.indexOf(e)<r-1),this.configReady=!0,this.previewMode=!1,this.previewStage=null)}onPreviewStage(){this.previewMode=!0,this.previewStage=this.currentStage}closePreview(){this.previewMode=!1,this.previewStage=null}selectStage(r){const e=r.detail;e===this.currentStage?(this.previewMode=!1,this.previewStage=null):(this.previewMode=!0,this.previewStage=e)}canAdvance(){return this.currentStage==="INTAKE"?this.configReady:!0}canRollback(){return this.currentStage!=="INTAKE"}getStageDisplayName(r){return{INTAKE:"Intake - 校验输入",LITERATURE:"Literature - 文献检索",OUTLINE:"Outline - 确定结构",DATA_REQUIREMENTS:"Data Req. - 算例需求",DRAFTING:"Drafting - 章节草稿",POLISHING:"Polishing - PoF润色",REVIEW:"Review - 质量门禁",FINALIZE:"Finalize - 投稿封装"}[r]||r}renderStageContent(r){return r==="INTAKE"?n`
        <config-stage
          @config-ready-change=${this.onConfigReadyChange}
        ></config-stage>
      `:n`
      <div class="empty-state">
        <h2>${this.getStageDisplayName(r)}</h2>
        <p>该阶段开发中...</p>
        <p style="margin-top: var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary);">
          由 ${this.getStageAgent(r)} 负责
        </p>
      </div>
    `}getStageAgent(r){return{INTAKE:"Orchestrator",LITERATURE:"Agent A (学术架构师)",OUTLINE:"Agent A (学术架构师)",DATA_REQUIREMENTS:"Agent B (物理-数据映射师)",DRAFTING:"Agent C (PoF执笔人)",POLISHING:"Agent C (PoF润色人)",REVIEW:"Orchestrator",FINALIZE:"Orchestrator"}[r]||"TBD"}render(){return n`
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
    `}};v.styles=S`
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
  `;f([d()],v.prototype,"papers",2);f([d()],v.prototype,"folders",2);f([d()],v.prototype,"tags",2);f([d()],v.prototype,"stats",2);f([d()],v.prototype,"selectedFolderId",2);f([d()],v.prototype,"searchQuery",2);f([d()],v.prototype,"loading",2);f([d()],v.prototype,"showUploader",2);f([d()],v.prototype,"workflowActive",2);f([d()],v.prototype,"currentStage",2);f([d()],v.prototype,"completedStages",2);f([d()],v.prototype,"configReady",2);f([d()],v.prototype,"previewMode",2);f([d()],v.prototype,"previewStage",2);v=f([E("paper-app")],v);
