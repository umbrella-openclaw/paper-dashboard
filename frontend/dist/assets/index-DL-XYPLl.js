(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=globalThis,de=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pe=Symbol(),fe=new WeakMap;let Ee=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==pe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(de&&e===void 0){const a=t!==void 0&&t.length===1;a&&(e=fe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&fe.set(t,e))}return e}toString(){return this.cssText}};const Ue=r=>new Ee(typeof r=="string"?r:r+"",void 0,pe),A=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((a,s,o)=>a+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new Ee(t,r,pe)},Ie=(r,e)=>{if(de)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const a=document.createElement("style"),s=Q.litNonce;s!==void 0&&a.setAttribute("nonce",s),a.textContent=t.cssText,r.appendChild(a)}},ge=de?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return Ue(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:De,defineProperty:je,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:Me,getOwnPropertySymbols:Ne,getPrototypeOf:He}=Object,k=globalThis,be=k.trustedTypes,Le=be?be.emptyScript:"",oe=k.reactiveElementPolyfillSupport,L=(r,e)=>r,Z={toAttribute(r,e){switch(e){case Boolean:r=r?Le:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},he=(r,e)=>!De(r,e),me={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let j=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),s=this.getPropertyDescriptor(e,a,t);s!==void 0&&je(this.prototype,e,s)}}static getPropertyDescriptor(e,t,a){const{get:s,set:o}=Fe(this.prototype,e)??{get(){return this[t]},set(i){this[t]=i}};return{get:s,set(i){const c=s==null?void 0:s.call(this);o==null||o.call(this,i),this.requestUpdate(e,c,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;const e=He(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){const t=this.properties,a=[...Me(t),...Ne(t)];for(const s of a)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[a,s]of t)this.elementProperties.set(a,s)}this._$Eh=new Map;for(const[t,a]of this.elementProperties){const s=this._$Eu(t,a);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const s of a)t.unshift(ge(s))}else e!==void 0&&t.push(ge(e));return t}static _$Eu(e,t){const a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ie(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var a;return(a=t.hostConnected)==null?void 0:a.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var a;return(a=t.hostDisconnected)==null?void 0:a.call(t)})}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){var o;const a=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,a);if(s!==void 0&&a.reflect===!0){const i=(((o=a.converter)==null?void 0:o.toAttribute)!==void 0?a.converter:Z).toAttribute(t,a.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){var o,i;const a=this.constructor,s=a._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const c=a.getPropertyOptions(s),n=typeof c.converter=="function"?{fromAttribute:c.converter}:((o=c.converter)==null?void 0:o.fromAttribute)!==void 0?c.converter:Z;this._$Em=s;const h=n.fromAttribute(t,c.type);this[s]=h??((i=this._$Ej)==null?void 0:i.get(s))??h,this._$Em=null}}requestUpdate(e,t,a,s=!1,o){var i;if(e!==void 0){const c=this.constructor;if(s===!1&&(o=this[e]),a??(a=c.getPropertyOptions(e)),!((a.hasChanged??he)(o,t)||a.useDefault&&a.reflect&&o===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(c._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:s,wrapped:o},i){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??t??this[e]),o!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var a;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,i]of s){const{wrapped:c}=i,n=this[o];c!==!0||this._$AL.has(o)||n===void 0||this.C(o,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(a=this._$EO)==null||a.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(a=>{var s;return(s=a.hostUpdated)==null?void 0:s.call(a)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[L("elementProperties")]=new Map,j[L("finalized")]=new Map,oe==null||oe({ReactiveElement:j}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis,ye=r=>r,X=V.trustedTypes,$e=X?X.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ce="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+C,Ve=`<${ke}>`,U=document,B=()=>U.createComment(""),q=r=>r===null||typeof r!="object"&&typeof r!="function",ue=Array.isArray,Be=r=>ue(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ie=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,we=/>/g,T=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,Ae=/"/g,Te=/^(?:script|style|textarea|title)$/i,qe=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),l=qe(1),I=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Se=new WeakMap,R=U.createTreeWalker(U,129);function Oe(r,e){if(!ue(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(e):e}const Ge=(r,e)=>{const t=r.length-1,a=[];let s,o=e===2?"<svg>":e===3?"<math>":"",i=H;for(let c=0;c<t;c++){const n=r[c];let h,v,p=-1,_=0;for(;_<n.length&&(i.lastIndex=_,v=i.exec(n),v!==null);)_=i.lastIndex,i===H?v[1]==="!--"?i=xe:v[1]!==void 0?i=we:v[2]!==void 0?(Te.test(v[2])&&(s=RegExp("</"+v[2],"g")),i=T):v[3]!==void 0&&(i=T):i===T?v[0]===">"?(i=s??H,p=-1):v[1]===void 0?p=-2:(p=i.lastIndex-v[2].length,h=v[1],i=v[3]===void 0?T:v[3]==='"'?Ae:_e):i===Ae||i===_e?i=T:i===xe||i===we?i=H:(i=T,s=void 0);const E=i===T&&r[c+1].startsWith("/>")?" ":"";o+=i===H?n+Ve:p>=0?(a.push(h),n.slice(0,p)+Ce+n.slice(p)+C+E):n+C+(p===-2?c:E)}return[Oe(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class G{constructor({strings:e,_$litType$:t},a){let s;this.parts=[];let o=0,i=0;const c=e.length-1,n=this.parts,[h,v]=Ge(e,t);if(this.el=G.createElement(h,a),R.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=R.nextNode())!==null&&n.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(Ce)){const _=v[i++],E=s.getAttribute(p).split(C),K=/([.?@])?(.*)/.exec(_);n.push({type:1,index:o,name:K[2],strings:E,ctor:K[1]==="."?Ye:K[1]==="?"?Je:K[1]==="@"?Ke:re}),s.removeAttribute(p)}else p.startsWith(C)&&(n.push({type:6,index:o}),s.removeAttribute(p));if(Te.test(s.tagName)){const p=s.textContent.split(C),_=p.length-1;if(_>0){s.textContent=X?X.emptyScript:"";for(let E=0;E<_;E++)s.append(p[E],B()),R.nextNode(),n.push({type:2,index:++o});s.append(p[_],B())}}}else if(s.nodeType===8)if(s.data===ke)n.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(C,p+1))!==-1;)n.push({type:7,index:o}),p+=C.length-1}o++}}static createElement(e,t){const a=U.createElement("template");return a.innerHTML=e,a}}function F(r,e,t=r,a){var i,c;if(e===I)return e;let s=a!==void 0?(i=t._$Co)==null?void 0:i[a]:t._$Cl;const o=q(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((c=s==null?void 0:s._$AO)==null||c.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,a)),a!==void 0?(t._$Co??(t._$Co=[]))[a]=s:t._$Cl=s),s!==void 0&&(e=F(r,s._$AS(r,e.values),s,a)),e}class We{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,s=((e==null?void 0:e.creationScope)??U).importNode(t,!0);R.currentNode=s;let o=R.nextNode(),i=0,c=0,n=a[0];for(;n!==void 0;){if(i===n.index){let h;n.type===2?h=new Y(o,o.nextSibling,this,e):n.type===1?h=new n.ctor(o,n.name,n.strings,this,e):n.type===6&&(h=new Qe(o,this,e)),this._$AV.push(h),n=a[++c]}i!==(n==null?void 0:n.index)&&(o=R.nextNode(),i++)}return R.currentNode=U,s}p(e){let t=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class Y{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,a,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),q(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==I&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Be(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&q(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:a}=e,s=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=G.createElement(Oe(a.h,a.h[0]),this.options)),a);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(t);else{const i=new We(s,this),c=i.u(this.options);i.p(t),this.T(c),this._$AH=i}}_$AC(e){let t=Se.get(e.strings);return t===void 0&&Se.set(e.strings,t=new G(e)),t}k(e){ue(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,s=0;for(const o of e)s===t.length?t.push(a=new Y(this.O(B()),this.O(B()),this,this.options)):a=t[s],a._$AI(o),s++;s<t.length&&(this._$AR(a&&a._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var a;for((a=this._$AP)==null?void 0:a.call(this,!1,!0,t);e!==this._$AB;){const s=ye(e).nextSibling;ye(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class re{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,s,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=u}_$AI(e,t=this,a,s){const o=this.strings;let i=!1;if(o===void 0)e=F(this,e,t,0),i=!q(e)||e!==this._$AH&&e!==I,i&&(this._$AH=e);else{const c=e;let n,h;for(e=o[0],n=0;n<o.length-1;n++)h=F(this,c[a+n],t,n),h===I&&(h=this._$AH[n]),i||(i=!q(h)||h!==this._$AH[n]),h===u?e=u:e!==u&&(e+=(h??"")+o[n+1]),this._$AH[n]=h}i&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ye extends re{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class Je extends re{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class Ke extends re{constructor(e,t,a,s,o){super(e,t,a,s,o),this.type=5}_$AI(e,t=this){if((e=F(this,e,t,0)??u)===I)return;const a=this._$AH,s=e===u&&a!==u||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==u&&(a===u||s);s&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Qe{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const ne=V.litHtmlPolyfillSupport;ne==null||ne(G,Y),(V.litHtmlVersions??(V.litHtmlVersions=[])).push("3.3.2");const Ze=(r,e,t)=>{const a=(t==null?void 0:t.renderBefore)??e;let s=a._$litPart$;if(s===void 0){const o=(t==null?void 0:t.renderBefore)??null;a._$litPart$=s=new Y(e.insertBefore(B(),o),o,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis;let m=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return I}};var Pe;m._$litElement$=!0,m.finalized=!0,(Pe=z.litElementHydrateSupport)==null||Pe.call(z,{LitElement:m});const le=z.litElementPolyfillSupport;le==null||le({LitElement:m});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:he},et=(r=Xe,e,t)=>{const{kind:a,metadata:s}=t;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),a==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(t.name,r),a==="accessor"){const{name:i}=t;return{set(c){const n=e.get.call(this);e.set.call(this,c),this.requestUpdate(i,n,r,!0,c)},init(c){return c!==void 0&&this.C(i,void 0,r,c),c}}}if(a==="setter"){const{name:i}=t;return function(c){const n=this[i];e.call(this,c),this.requestUpdate(i,n,r,!0,c)}}throw Error("Unsupported decorator location: "+a)};function b(r){return(e,t)=>typeof t=="object"?et(r,e,t):((a,s,o)=>{const i=s.hasOwnProperty(o);return s.constructor.createProperty(o,a),i?Object.getOwnPropertyDescriptor(s,o):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(r){return b({...r,state:!0,attribute:!1})}const tt="/api";async function $(r,e,t){const a={method:r,headers:{}};t instanceof FormData?a.body=t:t&&(a.headers={"Content-Type":"application/json"},a.body=JSON.stringify(t));const s=await fetch(`${tt}${e}`,a);if(!s.ok){const o=await s.json().catch(()=>({error:"Unknown error"}));throw new Error(o.error||`HTTP ${s.status}`)}return s.json()}const O={uploadPaper:r=>$("POST","/papers",r),listPapers:r=>{const e=new URLSearchParams;r!=null&&r.page&&e.set("page",String(r.page)),r!=null&&r.limit&&e.set("limit",String(r.limit)),r!=null&&r.search&&e.set("search",r.search),r!=null&&r.folder_id&&e.set("folder_id",String(r.folder_id));const t=e.toString();return $("GET",`/papers${t?`?${t}`:""}`)},getPaper:r=>$("GET",`/papers/${r}`),updatePaper:(r,e)=>$("PUT",`/papers/${r}`,e),deletePaper:r=>$("DELETE",`/papers/${r}`),listFolders:()=>$("GET","/folders"),createFolder:(r,e)=>$("POST","/folders",{name:r,parent_id:e}),deleteFolder:r=>$("DELETE",`/folders/${r}`),listTags:()=>$("GET","/tags"),createTag:(r,e)=>$("POST","/tags",{name:r,color:e||"#10b981"}),deleteTag:r=>$("DELETE",`/tags/${r}`),getStats:()=>$("GET","/stats")};var rt=Object.defineProperty,st=Object.getOwnPropertyDescriptor,Re=(r,e,t,a)=>{for(var s=a>1?void 0:a?st(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&rt(e,t,s),s};let ee=class extends m{constructor(){super(...arguments),this.searchValue=""}onSearch(r){const e=r.target;this.searchValue=e.value,this.dispatchEvent(new CustomEvent("search",{detail:this.searchValue}))}render(){return l`
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
    `}};ee.styles=A`
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
  `;Re([d()],ee.prototype,"searchValue",2);ee=Re([S("paper-header")],ee);var at=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,se=(r,e,t,a)=>{for(var s=a>1?void 0:a?ot(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&at(e,t,s),s};let M=class extends m{constructor(){super(...arguments),this.folders=[],this.tags=[],this.selectedFolderId=null}selectFolder(r){this.dispatchEvent(new CustomEvent("folder-select",{detail:r}))}createPaper(){this.dispatchEvent(new CustomEvent("create-paper"))}render(){return l`
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
          ${this.folders.map(r=>l`
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
            ${this.tags.map(r=>l`
              <span class="tag" style="background: ${r.color}20;">
                <span class="tag-dot" style="background: ${r.color};"></span>
                ${r.name}
              </span>
            `)}
          </div>
        </div>
      </div>
    `}};M.styles=A`
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
  `;se([b({type:Array})],M.prototype,"folders",2);se([b({type:Array})],M.prototype,"tags",2);se([b({type:Number})],M.prototype,"selectedFolderId",2);M=se([S("paper-sidebar")],M);var it=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,ve=(r,e,t,a)=>{for(var s=a>1?void 0:a?nt(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&it(e,t,s),s};let W=class extends m{constructor(){super(...arguments),this.showConfirm=!1}async download(){const r=document.createElement("a");r.href=`/uploads/${this.paper.file_path.replace("uploads/","")}`,r.download=this.paper.file_name,r.click()}async delete(){if(!this.showConfirm){this.showConfirm=!0,setTimeout(()=>this.showConfirm=!1,3e3);return}try{await O.deletePaper(this.paper.id),this.dispatchEvent(new CustomEvent("delete"))}catch(r){console.error("Delete failed:",r)}}render(){const{title:r,authors:e,journal:t,year:a,abstract:s,file_name:o,tags:i}=this.paper;return l`
      <div class="card">
        <div class="header">
          <div class="title">${r||"Untitled"}</div>
          ${a?l`<span class="year">${a}</span>`:""}
        </div>
        
        ${e?l`<div class="authors">${e}</div>`:""}
        ${t?l`<div class="journal">${t}</div>`:""}
        
        ${s?l`<div class="abstract">${s}</div>`:""}
        
        <div class="footer">
          <div class="tags">
            ${i==null?void 0:i.slice(0,3).map(c=>l`
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
              ${this.showConfirm?l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>`:l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>`}
            </button>
          </div>
        </div>
      </div>
    `}};W.styles=A`
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
  `;ve([b({type:Object})],W.prototype,"paper",2);ve([d()],W.prototype,"showConfirm",2);W=ve([S("paper-card")],W);var lt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,ze=(r,e,t,a)=>{for(var s=a>1?void 0:a?ct(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&lt(e,t,s),s};let te=class extends m{constructor(){super(...arguments),this.papers=[]}render(){return l`
      <div class="grid">
        ${this.papers.map(r=>l`
          <paper-card .paper=${r} @delete=${()=>this.dispatchEvent(new CustomEvent("delete"))}></paper-card>
        `)}
      </div>
    `}};te.styles=A`
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
  `;ze([b({type:Array})],te.prototype,"papers",2);te=ze([S("paper-grid")],te);var dt=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,x=(r,e,t,a)=>{for(var s=a>1?void 0:a?pt(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&dt(e,t,s),s};let g=class extends m{constructor(){super(...arguments),this.folders=[],this.file=null,this.paperTitle="",this.authors="",this.abstract="",this.journal="",this.year="",this.doi="",this.folderId="",this.loading=!1,this.error=""}close(){this.dispatchEvent(new CustomEvent("close"))}onFileChange(r){var t;const e=r.target;(t=e.files)!=null&&t[0]&&(this.file=e.files[0],this.paperTitle||(this.paperTitle=this.file.name.replace(/\.pdf$/i,"")))}async submit(r){if(r.preventDefault(),!this.file){this.error="Please select a PDF file";return}this.loading=!0,this.error="";try{const e=new FormData;e.append("file",this.file),e.append("title",this.paperTitle),e.append("authors",this.authors),e.append("abstract",this.abstract),e.append("journal",this.journal),this.year&&e.append("year",this.year),e.append("doi",this.doi),this.folderId&&e.append("folder_id",this.folderId),await O.uploadPaper(e),this.dispatchEvent(new CustomEvent("upload"))}catch(e){this.error=e.message}finally{this.loading=!1}}render(){return l`
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
              ${this.file?l`<p>Selected: ${this.file.name}</p>`:l`<p>Click or drag PDF here</p>`}
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
                ${this.folders.map(r=>l`<option value=${r.id}>${r.name}</option>`)}
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
          
          ${this.error?l`<div class="error">${this.error}</div>`:""}
          
          <div class="actions">
            <button type="button" class="cancel" @click=${this.close}>Cancel</button>
            <button type="submit" ?disabled=${this.loading}>
              ${this.loading?"Uploading...":"Upload"}
            </button>
          </div>
        </form>
      </div>
    `}};g.styles=A`
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
  `;x([b({type:Array})],g.prototype,"folders",2);x([d()],g.prototype,"file",2);x([d()],g.prototype,"paperTitle",2);x([d()],g.prototype,"authors",2);x([d()],g.prototype,"abstract",2);x([d()],g.prototype,"journal",2);x([d()],g.prototype,"year",2);x([d()],g.prototype,"doi",2);x([d()],g.prototype,"folderId",2);x([d()],g.prototype,"loading",2);x([d()],g.prototype,"error",2);g=x([S("paper-uploader")],g);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht={CHILD:2},ut=r=>(...e)=>({_$litDirective$:r,values:e});class vt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,a){this._$Ct=e,this._$AM=t,this._$Ci=a}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ce extends vt{constructor(e){if(super(e),this.it=u,e.type!==ht.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this._t=void 0,this.it=e;if(e===I)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}ce.directiveName="unsafeHTML",ce.resultType=1;const ft=ut(ce);var gt=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,ae=(r,e,t,a)=>{for(var s=a>1?void 0:a?bt(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&gt(e,t,s),s};let N=class extends m{constructor(){super(...arguments),this.label="",this.value=0,this.icon="file"}getIcon(){const r={"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'};return r[this.icon]||r["file-text"]}render(){return l`
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
    `}};N.styles=A`
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
  `;ae([b({type:String})],N.prototype,"label",2);ae([b({type:Number})],N.prototype,"value",2);ae([b({type:String})],N.prototype,"icon",2);N=ae([S("stat-card")],N);var mt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,J=(r,e,t,a)=>{for(var s=a>1?void 0:a?yt(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&mt(e,t,s),s};let D=class extends m{constructor(){super(...arguments),this.completedStages=[],this.canAdvance=!0,this.canRollback=!0}get stages(){return[{key:"CONFIG",label:"配置阶段",description:"参考论文与选题"},{key:"LITERATURE_REVIEW",label:"文献综述",description:"综述脉络与研究缺口"},{key:"METHODS",label:"方法",description:"方法设计与实验方案"},{key:"RESULTS",label:"结果",description:"结果整理与可视化"},{key:"DISCUSSION",label:"讨论",description:"解释与局限性"},{key:"COMPLETED",label:"完稿",description:"终稿检查与提交"}]}isCompleted(r){return this.completedStages.includes(r)}advance(){this.dispatchEvent(new CustomEvent("advance-stage"))}rollback(){this.dispatchEvent(new CustomEvent("rollback-stage"))}render(){return l`
      <section class="wrap">
        <div class="stages">
          ${this.stages.map(r=>{const e=r.key===this.currentStage,t=this.isCompleted(r.key);return l`
              <article class="stage ${e?"current":""} ${t?"completed":""}">
                <div class="stage-name">
                  <span>${r.label}</span>
                  ${e?l`<span class="badge current">当前</span>`:t?l`<span class="badge">已完成</span>`:""}
                </div>
                <p class="stage-meta">${r.description}</p>
              </article>
            `})}
        </div>

        <div class="actions">
          <button ?disabled=${!this.canRollback} @click=${this.rollback}>回滚</button>
          <button class="primary" ?disabled=${!this.canAdvance} @click=${this.advance}>推进</button>
        </div>
      </section>
    `}};D.styles=A`
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
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .stage {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
      transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
    }

    .stage.current {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
      transform: translateY(-1px);
    }

    .stage.completed {
      border-color: #34d399;
      background: #ecfdf5;
    }

    .stage-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 2px;
    }

    .stage-meta {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .badge {
      font-size: 10px;
      border-radius: 999px;
      padding: 2px 8px;
      background: #d1fae5;
      color: #047857;
      font-weight: 700;
    }

    .badge.current {
      background: var(--color-accent);
      color: #fff;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-3);
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
      transition: transform var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
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

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    @media (max-width: 1100px) {
      .stages {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 700px) {
      .stages {
        grid-template-columns: 1fr;
      }

      .actions {
        justify-content: stretch;
      }

      .actions button {
        flex: 1;
      }
    }
  `;J([b({type:String})],D.prototype,"currentStage",2);J([b({type:Array})],D.prototype,"completedStages",2);J([b({type:Boolean})],D.prototype,"canAdvance",2);J([b({type:Boolean})],D.prototype,"canRollback",2);D=J([S("stage-navigator")],D);var $t=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,P=(r,e,t,a)=>{for(var s=a>1?void 0:a?xt(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&$t(e,t,s),s};let w=class extends m{constructor(){super(...arguments),this.uploadedPapers=[],this.metadata=[],this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",objective:"",contribution:""},this.formatRequirementFile=null,this.processing=!1,this.processingCurrent=0}toCandidateLabel(r){return r.replace(/\.pdf$/i,"").replace(/[_-]+/g," ").trim()}notifyReadyState(){const r=!this.processing&&this.selectedTopic.title.trim().length>0;this.dispatchEvent(new CustomEvent("config-ready-change",{detail:r}))}onReferenceFileInput(r){const e=r.target;!e.files||e.files.length===0||(this.addReferenceFiles(Array.from(e.files)),e.value="")}onFormatFileInput(r){const e=r.target;!e.files||e.files.length===0||(this.formatRequirementFile=e.files[0])}onDrop(r){var t;r.preventDefault();const e=(t=r.dataTransfer)==null?void 0:t.files;!e||e.length===0||this.addReferenceFiles(Array.from(e))}onDragOver(r){r.preventDefault()}addReferenceFiles(r){const e=this.uploadedPapers.length+1,t=r.map((a,s)=>({id:e+s,name:a.name,pages:6+(a.size+s)%25,status:"uploaded"}));this.uploadedPapers=[...this.uploadedPapers,...t],this.startProcessing()}startProcessing(){if(this.uploadedPapers.length===0||this.processing)return;this.processing=!0,this.processingCurrent=0,this.metadata=[],this.topics=[],this.selectedTopicId=null,this.selectedTopic={title:"",objective:"",contribution:""},this.notifyReadyState();const r=this.uploadedPapers.length;let e=0;const t=()=>{if(e+=1,this.processingCurrent=e,this.uploadedPapers=this.uploadedPapers.map((a,s)=>s+1<e?{...a,status:"done"}:s+1===e?{...a,status:"processing"}:{...a,status:"uploaded"}),e>=r){this.uploadedPapers=this.uploadedPapers.map(a=>({...a,status:"done"})),this.processing=!1,this.metadata=this.generateMetadata(),this.topics=this.generateTopics(),this.processingCurrent=r,this.requestUpdate(),this.notifyReadyState();return}window.setTimeout(t,650)};window.setTimeout(t,500)}generateMetadata(){return this.uploadedPapers.slice(0,3).map((r,e)=>{const a=(this.toCandidateLabel(r.name)||`Reference Paper ${e+1}`).split(/\s+/).slice(0,2).join(" ");return{title:`${a} for Knowledge-Grounded Writing`,authors:`Author ${e+1}A, Author ${e+1}B`,abstract:`This paper studies ${a.toLowerCase()} and reports reproducible findings for academic writing workflows.`,keywords:[a,"workflow","benchmark","writing"]}})}generateTopics(){const r=this.uploadedPapers.slice(0,5),e=["面向论文写作的阶段化知识组织模型","融合参考文献语义的研究选题推荐方法","写作工作流中的方法-结果一致性评估","从文献到终稿的可追溯研究流程设计","学术写作系统中的结构化协同机制"];return Array.from({length:5}).map((t,a)=>{const s=r[a]?this.toCandidateLabel(r[a].name):"",o=s?`${s} 驱动的研究问题建模`:e[a];return{id:a+1,title:o,score:86-a*4,summary:"结合已上传文献中的共同方法与结论结构，形成可执行的问题定义、评估路径和贡献边界。"}})}selectTopic(r){this.selectedTopicId=r.id,this.selectedTopic={title:r.title,objective:"构建可复用的论文写作流程，降低阶段切换成本并提升写作一致性。",contribution:"提出一个可推进/可回滚的写作阶段框架，并验证其在选题与草稿构建中的有效性。"},this.notifyReadyState()}regenerateTopics(){if(this.processing||this.uploadedPapers.length===0)return;const r=this.generateTopics().map((e,t)=>({...e,id:t+1,score:84-t*3,title:`${e.title}（候选 ${t+1}）`}));this.topics=r,this.selectedTopicId=null,this.selectedTopic={title:"",objective:"",contribution:""},this.notifyReadyState()}updateTopicField(r,e){this.selectedTopic={...this.selectedTopic,[r]:e},this.notifyReadyState()}statusLabel(r){return r==="processing"?"处理中":r==="done"?"已完成":"待处理"}get progressPercent(){return this.uploadedPapers.length===0?0:Math.min(100,Math.round(this.processingCurrent/this.uploadedPapers.length*100))}render(){const r=this.uploadedPapers.length>0;return l`
      <section class="layout">
        <article class="panel">
          <h3>参考论文上传区</h3>
          <label
            class="dropzone"
            @drop=${this.onDrop}
            @dragover=${this.onDragOver}
          >
            <input type="file" multiple accept=".pdf" @change=${this.onReferenceFileInput}>
            <p>拖拽 PDF 到这里，或点击选择多个文件</p>
            <p class="subtle">支持多文件上传，可持续追加参考论文</p>
          </label>

          <div class="paper-list">
            ${this.uploadedPapers.length===0?l`<div class="empty">尚未上传参考论文</div>`:this.uploadedPapers.map(e=>l`
                  <div class="paper-item">
                    <div>
                      <div class="paper-name">${e.name}</div>
                      <div class="paper-meta">页数：${e.pages} 页</div>
                    </div>
                    <span class="status ${e.status}">${this.statusLabel(e.status)}</span>
                  </div>
                `)}
          </div>

          <button ?disabled=${this.processing} @click=${()=>{var e,t;return(t=(e=this.shadowRoot)==null?void 0:e.querySelector("label.dropzone input"))==null?void 0:t.click()}}>
            继续添加更多参考论文
          </button>
        </article>

        <article class="panel">
          <h3>自动处理状态区（阻塞式）</h3>

          ${this.processing?l`
                <div class="processing">
                  <div>正在分析论文，请稍候...</div>
                  <div>处理进度：${this.processingCurrent}/${this.uploadedPapers.length}</div>
                  <div class="progress-track">
                    <div class="progress-fill" style=${`--progress:${this.progressPercent}%`}></div>
                  </div>
                </div>
              `:r?l`<p>处理完成：已提取元数据与候选选题。</p>`:l`<p>上传参考论文后将自动开始分析。</p>`}

          ${!this.processing&&this.metadata.length>0?l`
                <div class="metadata">
                  <strong>提取的元数据与内容摘要</strong>
                  ${this.metadata.map(e=>l`
                    <div class="meta-item"><strong>标题：</strong>${e.title}</div>
                    <div class="meta-item"><strong>作者：</strong>${e.authors}</div>
                    <div class="meta-item"><strong>摘要：</strong>${e.abstract}</div>
                    <div class="meta-item"><strong>关键词：</strong>${e.keywords.join(" / ")}</div>
                  `)}
                </div>

                <div class="topics">
                  <strong>推荐选题（可确认/修改/重新生成）</strong>
                  ${this.topics.map(e=>l`
                    <div
                      class="candidate ${e.id===this.selectedTopicId?"active":""}"
                      @click=${()=>this.selectTopic(e)}
                    >
                      <div class="candidate-title">
                        <span>${e.title}</span>
                        <span class="candidate-score">相关度 ${e.score}%</span>
                      </div>
                      <div class="candidate-summary">${e.summary}</div>
                    </div>
                  `)}
                  <div class="topic-actions">
                    <button class="primary" ?disabled=${this.selectedTopicId===null}>
                      确认选题
                    </button>
                    <button ?disabled=${this.selectedTopicId===null}>修改选题</button>
                    <button @click=${this.regenerateTopics}>重新生成</button>
                  </div>
                </div>
              `:""}
        </article>

        <article class="panel">
          <h3>选题详情区</h3>

          ${this.selectedTopicId===null?l`<div class="empty">请先在中间区域选择一个候选选题。</div>`:l`
                <div class="topic-detail">
                  <div class="field">
                    <label>论文标题（可编辑）</label>
                    <input
                      .value=${this.selectedTopic.title}
                      @input=${e=>this.updateTopicField("title",e.target.value)}
                    >
                  </div>

                  <div class="field">
                    <label>研究目标</label>
                    <textarea
                      .value=${this.selectedTopic.objective}
                      @input=${e=>this.updateTopicField("objective",e.target.value)}
                    ></textarea>
                  </div>

                  <div class="field">
                    <label>预期贡献</label>
                    <textarea
                      .value=${this.selectedTopic.contribution}
                      @input=${e=>this.updateTopicField("contribution",e.target.value)}
                    ></textarea>
                  </div>
                </div>
              `}

          <div class="format-upload">
            <strong>格式要求上传（目标期刊模板）</strong>
            <label class="dropzone">
              <input type="file" @change=${this.onFormatFileInput}>
              <p>${this.formatRequirementFile?`已选择：${this.formatRequirementFile.name}`:"上传期刊格式要求文件（可选）"}</p>
            </label>
          </div>
        </article>
      </section>
    `}};w.styles=A`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1.05fr 1.2fr 1fr;
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
      min-height: 480px;
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
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
      transition: border-color var(--transition-base), background var(--transition-base), transform var(--transition-base);
      cursor: pointer;
    }

    .dropzone:hover {
      border-color: var(--color-accent);
      background: #f0fdf4;
      transform: translateY(-1px);
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
      max-height: 270px;
      overflow: auto;
      border-top: 1px solid var(--color-border-light);
      padding-top: var(--space-3);
    }

    .paper-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-2);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
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
    }

    .status {
      font-size: 10px;
      border-radius: 999px;
      font-weight: 700;
      height: fit-content;
      padding: 3px 8px;
      text-align: center;
      border: 1px solid transparent;
    }

    .status.uploaded {
      background: #f4f4f5;
      color: #52525b;
      border-color: #e4e4e7;
    }

    .status.processing {
      background: #fffbeb;
      color: #92400e;
      border-color: #fde68a;
    }

    .status.done {
      background: #ecfdf5;
      color: #065f46;
      border-color: #a7f3d0;
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
      transition: transform var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
    }

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
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

    .processing {
      border-radius: var(--radius-md);
      border: 1px solid #fde68a;
      background: #fffbeb;
      color: #92400e;
      padding: var(--space-3);
      font-size: var(--text-sm);
      display: grid;
      gap: var(--space-2);
    }

    .progress-track {
      width: 100%;
      height: 8px;
      border-radius: 999px;
      background: #fef3c7;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #f59e0b;
      transition: width var(--transition-base);
      width: var(--progress, 0%);
    }

    .metadata,
    .topics,
    .topic-detail,
    .format-upload {
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      background: var(--color-bg);
      display: grid;
      gap: var(--space-2);
    }

    .meta-item {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .meta-item strong {
      color: var(--color-text-primary);
      margin-right: 6px;
    }

    .candidate {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2);
      background: #fff;
      cursor: pointer;
      transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    .candidate:hover {
      border-color: var(--color-accent);
      transform: translateY(-1px);
    }

    .candidate.active {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 1px var(--color-accent-light) inset;
      background: #f0fdf4;
    }

    .candidate-title {
      display: flex;
      justify-content: space-between;
      gap: var(--space-2);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .candidate-summary {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.45;
    }

    .candidate-score {
      font-size: 11px;
      color: #047857;
      background: #d1fae5;
      border-radius: 999px;
      padding: 2px 7px;
      font-weight: 700;
      height: fit-content;
      white-space: nowrap;
    }

    .topic-actions {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }

    .field {
      display: grid;
      gap: var(--space-1);
    }

    label {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    input,
    textarea {
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: #fff;
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-3);
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    textarea {
      min-height: 80px;
      resize: vertical;
    }

    .empty {
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
    }

    @media (max-width: 1280px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .panel {
        min-height: auto;
      }
    }
  `;P([d()],w.prototype,"uploadedPapers",2);P([d()],w.prototype,"metadata",2);P([d()],w.prototype,"topics",2);P([d()],w.prototype,"selectedTopicId",2);P([d()],w.prototype,"selectedTopic",2);P([d()],w.prototype,"formatRequirementFile",2);P([d()],w.prototype,"processing",2);P([d()],w.prototype,"processingCurrent",2);w=P([S("config-stage")],w);var wt=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,y=(r,e,t,a)=>{for(var s=a>1?void 0:a?_t(e,t):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(s=(a?i(e,t,s):i(s))||s);return a&&s&&wt(e,t,s),s};let f=class extends m{constructor(){super(...arguments),this.papers=[],this.folders=[],this.tags=[],this.stats={total_papers:0,total_folders:0,total_tags:0,papers_this_week:0},this.selectedFolderId=null,this.searchQuery="",this.loading=!0,this.showUploader=!1,this.workflowActive=!1,this.currentStage="CONFIG",this.completedStages=[],this.configReady=!1}async connectedCallback(){super.connectedCallback(),await this.loadData()}async loadData(){this.loading=!0;try{const[r,e,t]=await Promise.all([O.listFolders(),O.listTags(),O.getStats()]);this.folders=r,this.tags=e,this.stats=t,await this.loadPapers()}catch(r){console.error("Failed to load data:",r)}finally{this.loading=!1}}async loadPapers(){try{const r=await O.listPapers({folder_id:this.selectedFolderId??void 0,search:this.searchQuery||void 0});this.papers=r.papers||[]}catch(r){console.error("Failed to load papers:",r)}}onSearch(r){this.searchQuery=r.detail,this.loadPapers()}onFolderSelect(r){this.selectedFolderId=r.detail,this.loadPapers()}async onUpload(){this.showUploader=!1,await this.loadData()}async onDeletePaper(){await this.loadPapers(),this.stats=await O.getStats()}onCreatePaper(){this.workflowActive=!0,this.currentStage="CONFIG",this.completedStages=[],this.configReady=!1}onConfigReadyChange(r){this.configReady=r.detail}advanceStage(){if(!this.configReady&&this.currentStage==="CONFIG"){alert("请先完成配置阶段的选题确认");return}const r=["CONFIG","LITERATURE_REVIEW","METHODS","RESULTS","DISCUSSION","COMPLETED"],e=r.indexOf(this.currentStage);e<r.length-1&&(this.completedStages.includes(this.currentStage)||(this.completedStages=[...this.completedStages,this.currentStage]),this.currentStage=r[e+1],this.configReady=!1)}rollbackStage(){const r=["CONFIG","LITERATURE_REVIEW","METHODS","RESULTS","DISCUSSION","COMPLETED"],e=r.indexOf(this.currentStage);e>0&&(this.currentStage=r[e-1],this.completedStages=this.completedStages.filter(t=>r.indexOf(t)<e-1),this.configReady=!0)}canAdvance(){return this.currentStage==="CONFIG"?this.configReady:!0}canRollback(){return this.currentStage!=="CONFIG"}render(){return l`
      <div class="layout">
        <header>
          <paper-header
            @search=${this.onSearch}
            @upload=${()=>this.showUploader=!0}
          ></paper-header>
        </header>
        
        ${this.workflowActive?l`
          <div class="stage-bar">
            <stage-navigator
              .currentStage=${this.currentStage}
              .completedStages=${this.completedStages}
              .canAdvance=${this.canAdvance()}
              .canRollback=${this.canRollback()}
              @advance-stage=${this.advanceStage}
              @rollback-stage=${this.rollbackStage}
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
            ${this.currentStage==="CONFIG"?l`
              <config-stage
                @config-ready-change=${this.onConfigReadyChange}
              ></config-stage>
            `:l`
              <div class="empty-state">
                <h2>${this.currentStage} 阶段</h2>
                <p>该阶段开发中...</p>
              </div>
            `}
          </main>
        `:l`
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
            ${this.loading?l`<div class="empty-state"><p>Loading...</p></div>`:this.papers.length===0?l`
                    <div class="empty-state">
                      <h2>No papers yet</h2>
                      <p>Upload your first paper to get started</p>
                    </div>
                  `:l`<paper-grid .papers=${this.papers} @delete=${this.onDeletePaper}></paper-grid>`}
          </main>
        `}
      </div>
      
      ${this.showUploader?l`
        <paper-uploader
          .folders=${this.folders}
          @close=${()=>this.showUploader=!1}
          @upload=${this.onUpload}
        ></paper-uploader>
      `:""}
    `}};f.styles=A`
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
  `;y([d()],f.prototype,"papers",2);y([d()],f.prototype,"folders",2);y([d()],f.prototype,"tags",2);y([d()],f.prototype,"stats",2);y([d()],f.prototype,"selectedFolderId",2);y([d()],f.prototype,"searchQuery",2);y([d()],f.prototype,"loading",2);y([d()],f.prototype,"showUploader",2);y([d()],f.prototype,"workflowActive",2);y([d()],f.prototype,"currentStage",2);y([d()],f.prototype,"completedStages",2);y([d()],f.prototype,"configReady",2);f=y([S("paper-app")],f);
