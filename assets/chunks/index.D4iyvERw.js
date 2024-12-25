import{c as Ht,g as Kt}from"./commonjsHelpers.Cpj98o6Y.js";import{d as Bt,ad as yt,s as gt,h as _t,v as Et,an as Lt,ao as Pt,ap as Ut,y as Yt,z as Wt,aq as Xt}from"./framework.BsyaW25I.js";var Ft={exports:{}};/*!
 * sortable-dnd v0.6.20
 * open source under the MIT license
 * https://github.com/mfuu/sortable-dnd#readme
 */(function(d,o){(function(i,r){d.exports=r()})(Ht,function(){function i(t){return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},i(t)}function r(){return r=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},r.apply(this,arguments)}var u={capture:!1,passive:!1},f=/\s+/g;function C(t){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(t)}var j=C(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),nt=C(/Edge/i),O=C(/safari/i)&&!C(/chrome/i)&&!C(/android/i),st=function(){var t=!1;return document.addEventListener("checkIfSupportPassive",null,{get passive(){return t=!0,!0}}),t}();function A(t,n,e){window.addEventListener?t.addEventListener(n,e,!(!st&&j)&&u):window.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e}function M(t,n,e){window.removeEventListener?t.removeEventListener(n,e,!(!st&&j)&&u):window.detachEvent?t.detachEvent("on"+n,e):t["on"+n]=null}function rt(){return document.scrollingElement||document.documentElement}function K(t,n,e){if(t.getBoundingClientRect||t===window){var s,l,c,h,y,z,H;if(t!==window&&t.parentNode&&t!==rt()?(l=(s=t.getBoundingClientRect()).top,c=s.left,h=s.bottom,y=s.right,z=s.height,H=s.width):(l=0,c=0,h=window.innerHeight,y=window.innerWidth,z=window.innerHeight,H=window.innerWidth),n&&t!==window){e=e||t.parentNode;do if(e&&e.getBoundingClientRect){var T=e.getBoundingClientRect();l-=T.top+parseInt(w(e,"border-top-width")),c-=T.left+parseInt(w(e,"border-left-width")),h=l+s.height,y=c+s.width;break}while(e=e.parentNode)}return{top:l,left:c,bottom:h,right:y,width:H,height:z}}}function ut(t,n,e,s){if(t){if(e&&!n){for(var l=Array.prototype.slice.call(e.children),c=0,h=l.length;c<h;c++)if(l[c]===t||mt(t,l[c]))return l[c]}e=e||document;do{if(n!=null&&(n[0]===">"?t.parentNode===e&&dt(t,n):dt(t,n))||s&&t===e)return t;if(t===e)break}while(t=t.parentNode);return null}}function mt(t,n){if(!t||!n)return!1;if(n.compareDocumentPosition)return!!(16&n.compareDocumentPosition(t));if(n.contains&&t.nodeType===1)return n.contains(t)&&n!==t;for(;t=t.parentNode;)if(t===n)return!0;return!1}function wt(t,n){for(var e=t.lastElementChild;e&&(e===I.ghost||w(e,"display")==="none"||n);)e=e.previousElementSibling;return e||null}function Q(t,n){if(!t||!t.parentNode)return-1;for(var e=0;t=t.previousElementSibling;)t.nodeName.toUpperCase()==="TEMPLATE"||n&&!dt(t,n)||w(t,"display")==="none"||e++;return e}function ot(t,n,e,s){for(var l=0,c=0,h=t.children;l<h.length;){if(h[l]!==I.ghost&&w(h[l],"display")!=="none"&&ut(h[l],e,t,!1)&&h[l]!==I.dragged){if(c===n)return h[l];c++}l++}return null}function lt(t,n){var e=w(t),s=parseInt(e.width)-parseInt(e.paddingLeft)-parseInt(e.paddingRight)-parseInt(e.borderLeftWidth)-parseInt(e.borderRightWidth),l=ot(t,0,n),c=ot(t,1,n),h=l&&w(l),y=c&&w(c),z=h&&parseInt(h.marginLeft)+parseInt(h.marginRight)+K(l).width,H=y&&parseInt(y.marginLeft)+parseInt(y.marginRight)+K(c).width,T=nt||j?"cssFloat":"float";if(e.display==="flex")return e.flexDirection==="column"||e.flexDirection==="column-reverse"?"vertical":"horizontal";if(e.display==="grid")return e.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(l&&h.float&&h.float!=="none"){var E=h.float==="left"?"left":"right";return!c||y.clear!=="both"&&y.clear!==E?"horizontal":"vertical"}return l&&(h.display==="block"||h.display==="flex"||h.display==="table"||h.display==="grid"||z>=s&&e[T]==="none"||c&&e[T]==="none"&&z+H>s)?"vertical":"horizontal"}function L(t,n,e){if(t&&n)if(t.classList)t.classList[e?"add":"remove"](n);else{var s=(" "+t.className+" ").replace(f," ").replace(" "+n+" "," ");t.className=(s+(e?" "+n:"")).replace(f," ")}}function dt(t,n){if(n){if(n[0]===">"&&(n=n.substring(1)),t)try{if(t.matches)return t.matches(n);if(t.msMatchesSelector)return t.msMatchesSelector(n);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(n)}catch{return!1}return!1}}function w(t,n,e){var s=t&&t.style;if(s){if(e===void 0)return document.defaultView&&document.defaultView.getComputedStyle?e=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(e=t.currentStyle),n===void 0?e:e[n];n in s||n.indexOf("webkit")!==-1||(n="-webkit-"+n),s[n]=e+(typeof e=="string"?"":"px")}}function at(t,n){var e,s,l=(s=n,(e=t).compareDocumentPosition?e.compareDocumentPosition(s):e.contains?(e!=s&&e.contains(s)&&16)+(e!=s&&s.contains(e)&&8)+(e.sourceIndex>=0&&s.sourceIndex>=0?(e.sourceIndex<s.sourceIndex&&4)+(e.sourceIndex>s.sourceIndex&&2):1):0);return l===2?1:l===4?-1:0}function S(t){t.preventDefault!==void 0&&t.cancelable&&t.preventDefault()}function k(t){var n=t.sortable,e=t.name,s=t.params,l=n.options[e];typeof l=="function"&&l(r({},s))}(function(){if(typeof window>"u"||typeof document>"u")return"";var t=window.getComputedStyle(document.documentElement,"")||["-moz-hidden-iframe"];(Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/)||t.OLink===""&&["","o"])[1]})();var D,ct,vt,U="Sortable"+Date.now();function xt(t){this.options=t,this.autoScrollAnimationFrame=null}function zt(t){this.options=t,this.stack=[]}function Tt(t){this.options=t||{},this.selects=[]}window.requestAnimationFrame||(window.requestAnimationFrame=function(t){return setTimeout(t,17)}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),xt.prototype={stop:function(){this.autoScrollAnimationFrame&&(cancelAnimationFrame(this.autoScrollAnimationFrame),this.autoScrollAnimationFrame=null)},start:function(t,n,e){var s=this;cancelAnimationFrame(this.autoScrollAnimationFrame),this.autoScrollAnimationFrame=requestAnimationFrame(function(){n&&e&&s.autoScroll(t,e),s.start(t,n,e)})},autoScroll:function(t,n){if(t&&n.clientX!==void 0&&n.clientY!==void 0){var e=K(t);if(e){var s=n.clientX,l=n.clientY,c=e.top,h=e.right,y=e.bottom,z=e.left,H=e.height,T=e.width;if(!(l<c||s>h||l>y||s<z)){var E=this.options,it=E.scrollThreshold,tt=E.scrollSpeed,pt=t.scrollTop,_=t.scrollLeft,P=t.scrollHeight,Dt=pt>0&&l>=c&&l<=c+it,It=_+T<t.scrollWidth&&s<=h&&s>=h-it,Rt=pt+H<P&&l<=y&&l>=y-it;_>0&&s>=z&&s<=z+it&&(t.scrollLeft+=Math.floor(Math.max(-1,(s-z)/it-1)*tt.x)),It&&(t.scrollLeft+=Math.ceil(Math.min(1,(s-h)/it+1)*tt.x)),Dt&&(t.scrollTop+=Math.floor(Math.max(-1,(l-c)/it-1)*tt.y)),Rt&&(t.scrollTop+=Math.ceil(Math.min(1,(l-y)/it+1)*tt.y))}}}}},zt.prototype={collect:function(t){if(t){for(var n=K(t),e=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,s=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,l=Math.min(n.right,e),c=Math.min(n.bottom,s),h=Array.prototype.slice.call(t.children),y=[],z=0,H=h.length;z<=H;z++){var T=h[z];if(T&&T!==I.ghost&&w(T,"display")!=="none"){var E=K(T);if(!(E.bottom<0||E.right<0)){if(E.top-E.height>c||E.left-E.width>l)break;y.push({el:T,rect:E})}}}this.stack.push(y)}},animate:function(){var t=this.stack.pop();if(t&&this.options.animation)for(var n=0,e=t.length;n<e;n++){var s=t[n],l=s.el,c=s.rect;this._excute(l,c)}},_excute:function(t,n){var e=K(t);if(e.top!==n.top||e.left!==n.left){var s=n.left-e.left,l=n.top-e.top;w(t,"transition",""),w(t,"transform","translate3d(".concat(s,"px, ").concat(l,"px, 0)")),t.offsetWidth;var c=this.options,h=c.animation,y=c.easing;w(t,"transition","transform ".concat(h,"ms ").concat(y?" "+y:"")),w(t,"transform","translate3d(0px, 0px, 0px)"),typeof t.animated=="number"&&clearTimeout(t.animated),t.animated=setTimeout(function(){w(t,"transition",""),w(t,"transform",""),t.animated=null},h)}}},Tt.prototype={active:function(){return!!D},nulling:function(){D=ct=vt=null},params:function(){return{nodes:D||[],clones:ct||[]}},select:function(t){L(t,this.options.selectedClass,!0),this.selects.push(t),this.selects.sort(function(n,e){return at(n,e)})},deselect:function(t){var n=this.selects.indexOf(t);n>-1&&(L(t,this.options.selectedClass,!1),this.selects.splice(n,1))},useSelectHandle:function(t,n){var e=this.options.selectHandle;return!!(vt=typeof e=="function"&&e(t)||typeof e=="string"&&dt(n,e))},getGhostElement:function(){if(!D)return null;var t=document.createElement("div");return L(t,this.options.chosenClass,!0),this.selects.forEach(function(n,e){var s=n.cloneNode(!0),l=e===0?1:.5;s.style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;opacity: ".concat(l,";z-index: ").concat(e,";"),t.appendChild(s)}),t},onChoose:function(){!this.options.multiple||this.selects.length===0||this.selects.indexOf(I.dragged)<0||(this.selects.sort(function(t,n){return at(t,n)}),D=this.selects,this.toggleChosenClass(!0))},onDrop:function(t,n,e){if(D){var s=I.dragged,l=I.clone,c=D.indexOf(s);t!==n&&e?(w(l,"display","none"),this.toggleVisible(!0),ct=D.map(function(h){return h.cloneNode(!0)}),this._sortElements(ct,c,l)):this._sortElements(D,c,l),t!==n&&(n[U].multiplayer.toggleSelected(ct||D,!0),!e&&t[U].multiplayer.toggleSelected(D,!1))}},onSelect:function(t,n,e,s){var l=this.options,c=l.multiple,h=l.selectHandle;if(c&&(h&&vt||!h&&!e)){var y=this.selects.indexOf(n);L(n,this.options.selectedClass,y<0);var z={from:s.el,event:t,node:n,index:Q(n)};y<0?(this.selects.push(n),k({sortable:s,name:"onSelect",params:z})):(this.selects.splice(y,1),k({sortable:s,name:"onDeselect",params:z})),this.selects.sort(function(H,T){return at(H,T)})}},toggleChosenClass:function(t){if(D)for(var n=0,e=D.length;n<e;n++)L(D[n],this.options.chosenClass,t)},toggleVisible:function(t){if(D)for(var n=0,e=D.length;n<e;n++)D[n]!=I.dragged&&w(D[n],"display",t?"":"none")},toggleSelected:function(t,n){var e=this;n?t.forEach(function(s){return e.selects.push(s)}):this.selects=this.selects.filter(function(s){return t.indexOf(s)<0})},_sortElements:function(t,n,e){for(var s=0,l=t.length;s<l;s++)if(w(t[s],"display",""),s<n)e.parentNode.insertBefore(t[s],e);else{var c=s>0?t[s-1]:e;e.parentNode.insertBefore(t[s],c.nextSibling)}}};var G,v,B,m,b,ht,g,F,$,N,a,p,x,J,R,W,V,Y,X,q,Z,St,ft=[];function bt(t){var n={},e=t.group;e&&i(e)=="object"||(e={name:e,pull:!0,put:!0,revertDrag:!0}),n.name=e.name,n.pull=e.pull,n.put=e.put,n.revertDrag=e.revertDrag,t.group=n}function Nt(t){var n=W||R;return!(t.clientX!==void 0&&t.clientY!==void 0&&Math.abs(t.clientX-n.clientX)<=0&&Math.abs(t.clientY-n.clientY)<=0)}function I(t,n){if(!t||!t.nodeType||t.nodeType!==1)throw"Sortable-dnd: `el` must be an HTMLElement, not ".concat({}.toString.call(t));t[U]=this,this.el=t,this.options=n=r({},n);var e={store:null,group:"",handle:null,sortable:!0,disabled:!1,multiple:!1,lockAxis:"",direction:"",animation:150,easing:"",draggable:null,selectHandle:null,customGhost:null,autoScroll:!0,scrollThreshold:55,scrollSpeed:{x:10,y:10},delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,ghostClass:"",ghostStyle:{},chosenClass:"",selectedClass:"",placeholderClass:"",swapOnDrop:!0,removeCloneOnDrop:!0,fallbackOnBody:!1,supportTouch:"ontouchstart"in window,emptyInsertThreshold:-1};for(var s in e)!(s in this.options)&&(this.options[s]=e[s]);for(var l in bt(n),this)l.charAt(0)==="_"&&typeof this[l]=="function"&&(this[l]=this[l].bind(this));A(t,this.options.supportTouch?"touchstart":"mousedown",this._onDrag),this.autoScroller=new xt(this.options),this.multiplayer=new Tt(this.options),this.animator=new zt(this.options),ft.push(t)}return I.prototype={constructor:I,_onDrag:function(t){var n=this;if(!m&&!this.options.disabled&&this.options.group.pull&&(!/mousedown|pointerdown/.test(t.type)||t.button===0)){var e=t.touches&&t.touches[0],s=(e||t).target;if(!O||!s||s.tagName.toUpperCase()!=="SELECT"){var l=ut(s,this.options.draggable,this.el);if(l&&!l.animated&&(R={event:t,clientX:(e||t).clientX,clientY:(e||t).clientY},m=l,A(q=e?m:document,"mouseup",this._onDrop),A(q,"touchend",this._onDrop),A(q,"touchcancel",this._onDrop),!this.multiplayer.useSelectHandle(t,s))){var c=this.options.handle;if((typeof c!="function"||c(t))&&(typeof c!="string"||dt(s,c))){var h=this.options,y=h.delay,z=h.delayOnTouchOnly;!y||z&&!e||nt||j?this._onStart(e,t):(A(this.el.ownerDocument,"touchmove",this._delayMoveHandler),A(this.el.ownerDocument,"mousemove",this._delayMoveHandler),A(this.el.ownerDocument,"mouseup",this._cancelStart),A(this.el.ownerDocument,"touchend",this._cancelStart),A(this.el.ownerDocument,"touchcancel",this._cancelStart),St=setTimeout(function(){return n._onStart(e,t)},y)),A(document,"selectstart",S),O&&w(document.body,"user-select","none")}}}}},_delayMoveHandler:function(t){var n=t.touches?t.touches[0]:t;Math.max(Math.abs(n.clientX-R.clientX),Math.abs(n.clientY-R.clientY))>=Math.floor(this.options.touchStartThreshold/(window.devicePixelRatio||1))&&this._cancelStart()},_cancelStart:function(){clearTimeout(St),M(this.el.ownerDocument,"touchmove",this._delayMoveHandler),M(this.el.ownerDocument,"mousemove",this._delayMoveHandler),M(this.el.ownerDocument,"mouseup",this._cancelStart),M(this.el.ownerDocument,"touchend",this._cancelStart),M(this.el.ownerDocument,"touchcancel",this._cancelStart),M(document,"selectstart",S),O&&w(document.body,"user-select","")},_onStart:function(t,n){S(n);var e=Q(m);G=this.el,v=this.el,$=m,p=e,x=e,J=e,Y={to:this.el,target:m,newIndex:e,relative:0},X=m,B=this.el,g=m.cloneNode(!0),N=m.parentNode,a=this.options.group.pull,I.clone=g,I.active=this,I.dragged=m,this.multiplayer.onChoose(),L(m,this.options.chosenClass,!0),k({sortable:this,name:"onChoose",params:this._getParams(n)}),A(q,t?"touchmove":"mousemove",this._nearestSortable);try{document.selection?setTimeout(function(){return document.selection.empty()},0):window.getSelection().removeAllRanges()}catch{}},_onStarted:function(){this.animator.collect(N),L(g,this.options.chosenClass,!0),L(g,this.options.placeholderClass,!0),this._appendGhost(),this.multiplayer.toggleVisible(!1),w(m,"display","none"),m.parentNode.insertBefore(g,m),k({sortable:this,name:"onDrag",params:this._getParams(R.event)}),this.animator.animate()},_getGhostElement:function(){var t=this.options.customGhost;if(typeof t=="function"){var n=this.multiplayer.selects;return t(n.length?n:[m])}return this.multiplayer.getGhostElement()||m},_appendGhost:function(){if(!F){var t=this.options.fallbackOnBody?document.body:this.el,n=this._getGhostElement();L(F=n.cloneNode(!0),this.options.ghostClass,!0);var e=K(m),s=r({position:"fixed",top:e.top,left:e.left,width:e.width,height:e.height,zIndex:"100000",opacity:"0.8",overflow:"hidden",boxSizing:"border-box",transform:"",transition:"",pointerEvents:"none"},this.options.ghostStyle);for(var l in s)w(F,l,s[l]);I.ghost=F,t.appendChild(F);var c=(R.clientX-e.left)/parseInt(F.style.width)*100,h=(R.clientY-e.top)/parseInt(F.style.height)*100;w(F,"transform-origin","".concat(c,"% ").concat(h,"%")),w(F,"will-change","transform")}},_nearestSortable:function(t){S(t);var n=t.touches&&t.touches[0]||t;if(m&&Nt(n)){!W&&this._onStarted();var e=this.options.lockAxis,s=e==="x"?R.clientX:n.clientX,l=e==="y"?R.clientY:n.clientY,c=document.elementFromPoint(s,l),h=s-R.clientX,y=l-R.clientY;W={event:t,clientX:s,clientY:l},w(F,"transform","translate3d(".concat(h,"px, ").concat(y,"px, 0)"));var z,H,T,E=(z=s,H=l,ft.reduce(function(tt,pt){var _=pt[U].options.emptyInsertThreshold;if(_!=null){var P=K(pt),Dt=z>=P.left-_&&z<=P.right+_,It=H>=P.top-_&&H<=P.bottom+_;return Dt&&It&&(!T||T&&P.left>=T.left&&P.right<=T.right&&P.top>=T.top&&P.bottom<=T.bottom)&&(tt=pt,T=P),tt}},null));if(E&&E[U]._onMove(t,c),!E||E[U].options.autoScroll){var it=function(tt,pt){if(!tt||!tt.getBoundingClientRect)return rt();var _=tt;do if(_.clientWidth<_.scrollWidth||_.clientHeight<_.scrollHeight){var P=w(_);if(_.clientWidth<_.scrollWidth&&(P.overflowX=="auto"||P.overflowX=="scroll")||_.clientHeight<_.scrollHeight&&(P.overflowY=="auto"||P.overflowY=="scroll"))return!_.getBoundingClientRect||_===document.body?rt():_}while(_=_.parentNode);return rt()}(c);this.autoScroller.start(it,R,W)}else this.autoScroller.stop()}},_allowPut:function(){if(B===this.el)return!0;if(!this.options.group.put)return!1;var t=this.options.group,n=t.name,e=t.put,s=B[U].options.group;return e.join&&e.indexOf(s.name)>-1||s.name&&n&&s.name===n},_getDirection:function(){var t=this.options,n=t.draggable,e=t.direction;return e?typeof e=="function"?e.call(W.event,g,this):e:lt(N,n)},_allowSwap:function(){var t=K(b),n=this._getDirection()==="vertical",e=n?"top":"left",s=n?"bottom":"right",l=b[n?"offsetHeight":"offsetWidth"],c=n?W.clientY:W.clientX,h=c>=t[e]&&c<t[s]-l/2?-1:1,y=ot(N,0,this.options.draggable),z=wt(N),H=K(y),T=K(z);if(b===N||mt(N,b))return g===y&&c<H[e]?(ht=b,!0):g===z&&c>T[s]&&(ht=b.nextSibling,!0);var E=at(g,b);return ht=E<0?b.nextSibling:b,V!==b?(Z=h,!0):Z!==h&&(Z=h,h<0?E>0:E<0)},_onMove:function(t,n){if(!this.options.disabled&&this._allowPut()){if(b=ut(n,this.options.draggable,this.el),k({sortable:this,name:"onMove",params:this._getParams(t,{target:b})}),this.options.sortable||this.el!==B)return this.el===v||n!==this.el&&wt(this.el)?void(b&&!b.animated&&!mt(b,g)&&this._allowSwap()&&(b!==g&&ht!==g&&(this.el!==v?this._onInsert(t):b!==m&&this._onChange(t)),V=b)):(b=V=null,void this._onInsert(t));v!==B&&(b=V=m,Z=0,this._onInsert(t))}},_onInsert:function(t){var n=b||g,e=a==="clone"&&this.el!==B&&v===B,s=a==="clone"&&this.el===B&&v!==B,l=mt(b,document),c=b===m&&!l,h=v[U],y=B[U];G=this.el,p=Q(g),$=n,N=l?b.parentNode:this.el,h.animator.collect(g.parentNode),this.animator.collect(N),e&&(Y.target=X,Y.newIndex=p,Y.relative=X===m?0:at(g,X),w(m,"display",""),y.multiplayer.toggleVisible(!0),y.options.group.revertDrag||g.parentNode.insertBefore(m,g)),s&&(p=Q(m),w(m,"display","none"),this.multiplayer.toggleVisible(!1)),w(g,"display",c?"none":""),b&&l?N.insertBefore(g,Z<0?b:b.nextSibling):N.appendChild(g),x=c?J:Q(g),e&&y.options.group.revertDrag&&(Y.target=m,Y.newIndex=J,Y.relative=0,k({sortable:y,name:"onChange",params:this._getParams(t,{to:B,target:m,newIndex:J,revertDrag:!0})})),e||k({sortable:h,name:"onRemove",params:this._getParams(t,{newIndex:-1})}),s&&n!==m&&(X=n,k({sortable:this,name:"onChange",params:this._getParams(t,{from:B,backToOrigin:!0})})),s||k({sortable:this,name:"onAdd",params:this._getParams(t,{oldIndex:-1})}),h.animator.animate(),this.animator.animate(),v=this.el},_onChange:function(t){this.animator.collect(N),p=Q(g),N=b.parentNode,$=b,this.el===B&&(X=b),N.insertBefore(g,ht),x=Q(g),k({sortable:this,name:"onChange",params:this._getParams(t)}),this.animator.animate(),v=this.el},_onDrop:function(t){this._cancelStart(),M(q,"touchmove",this._nearestSortable),M(q,"mousemove",this._nearestSortable),M(q,"mouseup",this._onDrop),M(q,"touchend",this._onDrop),M(q,"touchcancel",this._onDrop),B&&(v=B,p=J,$===g&&($=m),this.animator.collect(N),this.multiplayer.toggleChosenClass(!1),L(m,this.options.chosenClass,!1),k({sortable:this,name:"onUnchoose",params:this._getParams(t)}),W&&this._onEnd(t),!W&&this.animator.animate()),!Nt(t.changedTouches?t.changedTouches[0]:t)&&this.multiplayer.onSelect(t,m,B,this),F&&F.parentNode&&F.parentNode.removeChild(F),this.autoScroller.stop(),this.multiplayer.nulling(),this._nulling()},_onEnd:function(t){L(g,this.options.chosenClass,!1),L(g,this.options.placeholderClass,!1);var n=a==="clone";this.multiplayer.onDrop(v,G,n);var e=this._getParams(t),s=this.options,l=s.swapOnDrop,c=s.removeCloneOnDrop;n&&v!==G||!(typeof l=="function"?l(e):l)||N.insertBefore(m,g),n&&v!==G&&!this.multiplayer.active()||!(typeof c=="function"?c(e):c)||g&&g.parentNode&&g.parentNode.removeChild(g),w(m,"display",""),this.animator.animate(),v!==G&&k({sortable:v[U],name:"onDrop",params:r({},e,n?Y:{newIndex:-1})}),k({sortable:G[U],name:"onDrop",params:r({},e,v===G?{}:{oldIndex:-1})})},_getParams:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e={};return e.event=t,e.to=G,e.from=v,e.node=m,e.clone=g,e.target=$,e.oldIndex=p,e.newIndex=x,e.pullMode=a,r(e,this.multiplayer.params(),n),e.relative=$===m?0:at(g,$),e},_nulling:function(){G=v=B=m=b=ht=g=F=$=N=a=p=x=J=R=W=V=Y=X=q=Z=St=I.clone=I.ghost=I.active=I.dragged=null},destroy:function(){this._cancelStart(),this._nulling(),this.multiplayer.nulling(),this.autoScroller.stop(),M(this.el,"touchstart",this._onDrag),M(this.el,"mousedown",this._onDrag);var t=ft.indexOf(this.el);t>-1&&ft.splice(t,1),this.el[U]=this.animator=this.multiplayer=this.autoScroller=null},option:function(t,n){if(n===void 0)return this.options[t];this.options[t]=n,this.animator.options[t]=n,this.multiplayer.options[t]=n,this.autoScroller.options[t]=n,t==="group"&&bt(this.options)},select:function(t){this.multiplayer.select(t)},deselect:function(t){this.multiplayer.deselect(t)},getSelectedElements:function(){return this.multiplayer.selects}},I.utils={on:A,off:M,css:w,index:Q,closest:ut,getRect:K,toggleClass:L,detectDirection:lt},I.get=function(t){return t[U]},I.create=function(t,n){return new I(t,n)},I})})(Ft);var qt=Ft.exports;const et=Kt(qt);function Ct(d,o){let i;const r=function(...u){i||(o<=0?d.apply(this,u):i=setTimeout(()=>{i=null,d.apply(this,u)},o))};return r.cancel=function(){i&&(clearTimeout(i),i=null)},r}function Vt(d,o){const i=Ct(d,o),r=function(){i.cancel(),i.apply(this,arguments)};return r.cancel=function(){i.cancel()},r}function Ot(d,o){return d==o}function kt(d,o){return(Array.isArray(o)?o:o.replace(/\[/g,".").replace(/\]/g,".").split(".")).reduce((i,r)=>(i||{})[r],d)}function At(d){return d instanceof Document&&d.nodeType===9||d instanceof Window}const Mt=["delay","group","handle","lockAxis","disabled","sortable","draggable","animation","autoScroll","ghostClass","ghostStyle","chosenClass","scrollSpeed","fallbackOnBody","scrollThreshold","delayOnTouchOnly","placeholderClass"];class jt{constructor(o,i){this.el=o,this.options=i,this.rangeChanged=!1,this.installSortable()}destroy(){this.sortable.destroy(),this.rangeChanged=!1}option(o,i){this.options[o]=i,Mt.includes(o)&&this.sortable.option(o,i)}installSortable(){const o=Mt.reduce((i,r)=>(i[r]=this.options[r],i),{});this.sortable=new et(this.el,{...o,emptyInsertThreshold:0,swapOnDrop:i=>i.from===i.to,removeCloneOnDrop:i=>i.from===i.to,onDrag:i=>this.onDrag(i),onDrop:i=>this.onDrop(i),onChoose:i=>this.onChoose(i),onUnchoose:i=>this.onUnchoose(i)})}onChoose(o){this.dispatchEvent("onChoose",o)}onUnchoose(o){this.dispatchEvent("onUnchoose",o)}onDrag(o){const i=o.node.getAttribute("data-key"),r=this.getIndex(i),u=this.options.list[r],f=this.options.uniqueKeys[r];this.sortable.option("store",{item:u,key:f,index:r}),this.dispatchEvent("onDrag",{item:u,key:f,index:r,event:o})}onDrop(o){var j,nt,O;const{item:i,key:r,index:u}=(j=et.get(o.from))==null?void 0:j.option("store"),f=this.options.list,C={key:r,item:i,list:f,event:o,changed:!1,oldList:[...f],oldIndex:u,newIndex:u};o.from===o.to&&o.node===o.target||this.handleDropEvent(o,C,u),this.dispatchEvent("onDrop",C),o.from===this.el&&this.rangeChanged&&((nt=et.dragged)==null||nt.remove()),o.from!==o.to&&((O=et.clone)==null||O.remove()),this.rangeChanged=!1}handleDropEvent(o,i,r){const u=o.target.getAttribute("data-key");let f=-1,C=r;o.from===o.to?(C=this.getIndex(i.key),f=this.getIndex(u),(C<f&&o.relative===-1||C>f&&o.relative===1)&&(f+=o.relative),f!==C&&(i.list.splice(C,1),i.list.splice(f,0,i.item))):(o.from===this.el&&(C=this.getIndex(i.key),i.list.splice(C,1)),o.to===this.el&&(C=-1,f=this.getIndex(u),o.relative===0?f=i.list.length:o.relative===1&&(f+=o.relative),i.list.splice(f,0,i.item))),i.changed=o.from!==o.to||f!==C,i.oldIndex=C,i.newIndex=f}getIndex(o){if(o==null)return-1;const{uniqueKeys:i}=this.options;for(let r=0,u=i.length;r<u;r++)if(Ot(i[r],o))return r;return-1}dispatchEvent(o,i){const r=this.options[o];r&&r(i)}}const Gt=["size","keeps","scroller","direction","debounceTime","throttleTime"];class $t{constructor(o){this.options=o;const i={size:0,keeps:0,buffer:0,wrapper:null,scroller:null,direction:"vertical",uniqueKeys:[],debounceTime:null,throttleTime:null};for(const r in i)!(r in this.options)&&(this.options[r]=i[r]);this.sizes=new Map,this.sizeType="INIT",this.fixedSize=0,this.averageSize=0,this.range={start:0,end:0,front:0,behind:0},this.offset=0,this.direction="STATIONARY",this.updateScrollElement(),this.updateOnScrollFunction(),this.addScrollEventListener(),this.checkIfUpdate(0,o.keeps-1)}isFixed(){return this.sizeType==="FIXED"}isFront(){return this.direction==="FRONT"}isBehind(){return this.direction==="BEHIND"}isHorizontal(){return this.options.direction==="horizontal"}getSize(o){return this.sizes.get(o)||this.getItemSize()}getOffset(){const o=this.isHorizontal()?"scrollLeft":"scrollTop";return this.scrollEl[o]}getScrollSize(){const o=this.isHorizontal()?"scrollWidth":"scrollHeight";return this.scrollEl[o]}getClientSize(){const o=this.isHorizontal()?"offsetWidth":"offsetHeight";return this.scrollEl[o]}scrollToOffset(o){const i=this.isHorizontal()?"scrollLeft":"scrollTop";this.scrollEl[i]=o}scrollToIndex(o){if(o>=this.options.uniqueKeys.length-1)this.scrollToBottom();else{const i=this.getOffsetByRange(0,o),r=this.getScrollStartOffset();this.scrollToOffset(i+r)}}scrollToBottom(){const o=this.getScrollSize();this.scrollToOffset(o),setTimeout(()=>{const i=this.getClientSize(),r=this.getScrollSize();this.getOffset()+i+1<r&&this.scrollToBottom()},5)}option(o,i){const r=this.options[o];this.options[o]=i,o==="uniqueKeys"&&this.sizes.forEach((u,f)=>{i.includes(f)||this.sizes.delete(f)}),o==="scroller"&&(r&&et.utils.off(r,"scroll",this.onScroll),this.updateScrollElement(),this.addScrollEventListener())}updateRange(o){if(o){this.handleUpdate(o.start);return}let i=this.range.start;i=Math.max(i,0),this.handleUpdate(i)}onItemResized(o,i){!i||this.sizes.get(o)===i||(this.sizes.set(o,i),this.sizeType==="INIT"?(this.sizeType="FIXED",this.fixedSize=i):this.isFixed()&&this.fixedSize!==i&&(this.sizeType="DYNAMIC",this.fixedSize=0),!this.averageSize&&this.sizeType==="DYNAMIC"&&this.sizes.size===this.options.keeps&&this.updateAverageSize())}updateAverageSize(){const o=[...this.sizes.values()].reduce((i,r)=>i+r,0);this.averageSize=Math.round(o/this.sizes.size)}addScrollEventListener(){this.options.scroller&&et.utils.on(this.options.scroller,"scroll",this.onScroll)}removeScrollEventListener(){this.options.scroller&&et.utils.off(this.options.scroller,"scroll",this.onScroll)}enableScroll(o){const{scroller:i}=this.options,r=o?et.utils.off:et.utils.on,u="onwheel"in document.createElement("div")?"wheel":"mousewheel";r(i,"DOMMouseScroll",this.preventDefault),r(i,u,this.preventDefault),r(i,"touchmove",this.preventDefault),r(i,"keydown",this.preventDefaultForKeyDown)}preventDefault(o){o.preventDefault()}preventDefaultForKeyDown(o){if({37:1,38:1,39:1,40:1}[o.keyCode])return this.preventDefault(o),!1}updateScrollElement(){const o=this.options.scroller;if(At(o)){const i=document.scrollingElement||document.documentElement||document.body;this.scrollEl=i}else this.scrollEl=o}updateOnScrollFunction(){const{debounceTime:o,throttleTime:i}=this.options;o?this.onScroll=Vt(()=>this.handleScroll(),o):i?this.onScroll=Ct(()=>this.handleScroll(),i):this.onScroll=()=>this.handleScroll()}handleScroll(){const o=this.getOffset(),i=this.getClientSize(),r=this.getScrollSize();o===this.offset?this.direction="STATIONARY":this.direction=o<this.offset?"FRONT":"BEHIND",this.offset=o;const u=this.isFront()&&o<=0,f=this.isBehind()&&i+o+1>=r;this.options.onScroll({top:u,bottom:f,offset:o,direction:this.direction}),this.isFront()?this.handleScrollFront():this.isBehind()&&this.handleScrollBehind()}handleScrollFront(){const o=this.getScrollItems();if(o>=this.range.start)return;const i=Math.max(o-this.options.buffer,0);this.checkIfUpdate(i,this.getEndByStart(i))}handleScrollBehind(){const o=this.getScrollItems();o<this.range.start+this.options.buffer||this.checkIfUpdate(o,this.getEndByStart(o))}getScrollItems(){const o=this.offset-this.getScrollStartOffset();if(o<=0)return 0;if(this.isFixed())return Math.floor(o/this.fixedSize);let i=0,r=this.options.uniqueKeys.length,u=0,f=0;for(;i<=r;){if(u=i+Math.floor((r-i)/2),f=this.getOffsetByRange(0,u),f===o)return u;f<o?i=u+1:f>o&&(r=u-1)}return i>0?--i:0}checkIfUpdate(o,i){const r=this.options.keeps;this.options.uniqueKeys.length<=r?o=0:i-o<r-1&&(o=i-r+1),this.range.start!==o&&this.handleUpdate(o)}handleUpdate(o){this.range.start=o,this.range.end=this.getEndByStart(o),this.range.front=this.getFrontOffset(),this.range.behind=this.getBehindOffset(),this.options.onUpdate({...this.range})}getFrontOffset(){return this.isFixed()?this.fixedSize*this.range.start:this.getOffsetByRange(0,this.range.start)}getBehindOffset(){const o=this.range.end,i=this.getLastIndex();return this.isFixed()?(i-o)*this.fixedSize:(i-o)*this.getItemSize()}getOffsetByRange(o,i){if(o>=i)return 0;let r=0;for(let u=o;u<i;u++){const f=this.sizes.get(this.options.uniqueKeys[u]);r=r+(typeof f=="number"?f:this.getItemSize())}return r}getEndByStart(o){return Math.min(o+this.options.keeps-1,this.getLastIndex())}getLastIndex(){const{uniqueKeys:o,keeps:i}=this.options;return o.length>0?o.length-1:i-1}getItemSize(){return this.isFixed()?this.fixedSize:this.options.size||this.averageSize}getScrollStartOffset(){const{wrapper:o,scroller:i}=this.options;if(i===o)return 0;let r=0;if(i&&o){const u=this.isHorizontal()?"left":"top",f=At(i)?et.utils.getRect(o):et.utils.getRect(o,!0,i);r=this.offset+f[u]}return r}}const Jt={modelValue:{},dataKey:{type:String,default:"",required:!0},tableMode:{type:Boolean,default:!1},draggable:{type:String,default:".virtual-dnd-list-item"},itemClass:{type:String,default:"virtual-dnd-list-item"},sortable:{type:Boolean,default:!0},handle:{type:[Function,String],default:void 0},group:{type:[Object,String],default:void 0},scroller:{type:[Document,HTMLElement],default:void 0},lockAxis:{type:String,default:""},direction:{type:String,default:"vertical"},keeps:{type:Number,default:30},size:{type:Number,default:void 0},debounceTime:{type:Number,default:0},throttleTime:{type:Number,default:0},animation:{type:Number,default:150},autoScroll:{type:Boolean,default:!0},scrollSpeed:{type:Object,default:()=>({x:10,y:10})},scrollThreshold:{type:Number,default:55},keepOffset:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},fallbackOnBody:{type:Boolean,default:!1},delay:{type:Number,default:0},delayOnTouchOnly:{type:Boolean,default:!1},rootTag:{type:String,default:"div"},wrapTag:{type:String,default:"div"},wrapClass:{type:String,default:""},wrapStyle:{type:Object,default:()=>({})},ghostClass:{type:String,default:""},ghostStyle:{type:Object,default:()=>({})},chosenClass:{type:String,default:""},placeholderClass:{type:String,default:""}},Qt={dataKey:{type:[String,Number],default:void 0},sizeKey:{type:String,default:"offsetHeight"},itemClass:{type:String,default:void 0}},Zt=({mounted:d,updated:o,unmounted:i})=>Bt({props:["vnode"],mounted(){d(this.$el)},onUpdated(){o(this.$el)},onUnmounted(){i(this.$el)},render(r){return r.vnode}}),te=Bt({props:Qt,emits:["resize"],setup(d,{emit:o,slots:i}){let r=null;const u=O=>{const st=O?O[d.sizeKey]:0;o("resize",st,d.dataKey)},nt=Zt({mounted:O=>{typeof ResizeObserver<"u"&&(r=new ResizeObserver(()=>{u(O)}),O&&r.observe(O))},updated:O=>{u(O)},unmounted:()=>{r&&(r.disconnect(),r=null)}});return()=>{var M;const{dataKey:O,itemClass:st}=d,[A]=((M=i.default)==null?void 0:M.call(i))||[];return yt(nt,{key:O,class:st,vnode:A,"data-key":O},{default:()=>{var rt;return(rt=i.default)==null?void 0:rt.call(i)}})}}}),ee=d=>Xt(d)?d.value:d,ie=Bt({props:Jt,emits:["update:modelValue","top","bottom","drag","drop","rangeChange"],setup(d,{emit:o,slots:i,expose:r}){const u=gt([]),f=gt({start:0,end:d.keeps-1,front:0,behind:0}),C=_t(()=>d.direction!=="vertical"),j=gt(),nt=gt();function O(a){return S.getSize(a)}function st(){return S.getOffset()}function A(){return S.getClientSize()}function M(){return S.getScrollSize()}function rt(a){const p=ot.indexOf(a);p>-1&&S.scrollToIndex(p)}function K(a){S.scrollToOffset(a)}function ut(a){S.scrollToIndex(a)}function mt(){K(0)}function wt(){S.scrollToBottom()}r({getSize:O,getOffset:st,getClientSize:A,getScrollSize:M,scrollToTop:mt,scrollToBottom:wt,scrollToKey:rt,scrollToIndex:ut,scrollToOffset:K}),Et(()=>[d.modelValue],()=>{L()},{deep:!0}),Lt(()=>{L()}),Pt(()=>{S&&K(S.offset),S.addScrollEventListener()}),Ut(()=>{S.removeScrollEventListener()}),Yt(()=>{Tt(),F()}),Wt(()=>{v==null||v.destroy(),S==null||S.removeScrollEventListener()});let Q=[],ot=[],lt=0;const L=()=>{const a=ee(d.modelValue);if(a){if(u.value=a,dt(),w(Q,a),v==null||v.option("list",a),lt&&d.keepOffset){const p=a.length-lt;p>0&&ut(p),lt=0}Q=[...u.value]}},dt=()=>{ot=u.value.map(a=>kt(a,d.dataKey)),S==null||S.option("uniqueKeys",ot),v==null||v.option("uniqueKeys",ot)},w=(a,p)=>{if(!a.length&&!p.length||a.length===p.length)return;let x={...f.value};a.length>d.keeps&&p.length>a.length&&x.end===a.length-1&&at()&&x.start++,S==null||S.updateRange(x)},at=()=>{const a=st(),p=A(),x=M();return a+p+1>=x};let S;const k=gt(!1),D=gt(""),ct=_t(()=>Gt.reduce((a,p)=>(a[p]=d[p],a),{}));Et(ct,(a,p)=>{if(S)for(let x in a)a[x]!==p[x]&&S.option(x,a[x])});const vt=Ct(()=>{lt=u.value.length,o("top")},50),U=Ct(()=>{o("bottom")},50),xt=a=>{lt=0,u.value.length&&a.top?vt():a.bottom&&U()},zt=a=>{const p=a.start!==f.value.start;k.value&&p&&v&&(v.rangeChanged=!0),f.value=a,p&&o("rangeChange",a)},Tt=()=>{S=new $t({...ct.value,buffer:Math.round(d.keeps/3),wrapper:nt.value,scroller:d.scroller||j.value,uniqueKeys:ot,onScroll:xt,onUpdate:zt})},G=(a,p)=>{if(Ot(p,D.value))return;const x=S.sizes.size,J=Math.min(d.keeps,u.value.length);S.onItemResized(p,a),x===J-1&&S.updateRange(f.value)};let v;const B=_t(()=>Mt.reduce((a,p)=>(a[p]=d[p],a),{}));Et(B,(a,p)=>{if(v)for(let x in a)a[x]!==p[x]&&v.option(x,a[x])});const m=a=>{D.value=a.node.getAttribute("data-key")},b=()=>{D.value=""},ht=a=>{k.value=!0,d.sortable||(S.enableScroll(!1),v.option("autoScroll",!1)),o("drag",a)},g=a=>{k.value=!1,S.enableScroll(!0),v.option("autoScroll",d.autoScroll),a.changed&&o("update:modelValue",a.list),o("drop",a)},F=()=>{v=new jt(j.value,{...B.value,list:u.value,uniqueKeys:ot,onDrag:ht,onDrop:g,onChoose:m,onUnchoose:b})},$=a=>{if(d.tableMode){const p={padding:0,border:0,height:`${a}px`};return yt("tr",{},[yt("td",{style:p})])}return null},N=()=>{const a=[],{start:p,end:x,front:J,behind:R}=f.value,W=C.value?"offsetWidth":"offsetHeight";a.push($(J));for(let V=p;V<=x;V++){const Y=u.value[V];if(Y){const X=kt(Y,d.dataKey),q=Ot(X,D.value);a.push(i.item?yt(te,{key:X,class:d.itemClass,style:k.value&&q&&{display:"none"},dataKey:X,sizeKey:W,onResize:G},{default:()=>{var Z;return(Z=i.item)==null?void 0:Z.call(i,{record:Y,index:V,dataKey:X})}}):null)}}return a.push($(R)),a};return()=>{const{front:a,behind:p}=f.value,{tableMode:x,rootTag:J,wrapTag:R,scroller:W,wrapClass:V,wrapStyle:Y}=d,X=C.value?"auto hidden":"hidden auto",q=C.value?`0 ${p}px 0 ${a}px`:`${a}px 0 ${p}px`,Z=x?"table":J,St=x?"tbody":R;return yt(Z,{ref:j,style:!W&&!x&&{overflow:X}},{default:()=>{var ft,bt;return[(ft=i.header)==null?void 0:ft.call(i),yt(St,{ref:nt,class:V,style:{...Y,padding:!x&&q}},{default:()=>N()}),(bt=i.footer)==null?void 0:bt.call(i)]}})}}});export{ie as default};
