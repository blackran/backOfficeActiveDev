(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[6],{wEEd:function(e,t,r){"use strict";r.d(t,"a",(function(){return me})),r.d(t,"b",(function(){return G}));var a=r("wx14"),i=r("zLVn"),n=r("q1tI"),o=r.n(n);const s={arr:Array.isArray,obj:e=>"[object Object]"===Object.prototype.toString.call(e),fun:e=>"function"===typeof e,str:e=>"string"===typeof e,num:e=>"number"===typeof e,und:e=>void 0===e,nul:e=>null===e,set:e=>e instanceof Set,map:e=>e instanceof Map,equ(e,t){if(typeof e!==typeof t)return!1;if(s.str(e)||s.num(e))return e===t;if(s.obj(e)&&s.obj(t)&&Object.keys(e).length+Object.keys(t).length===0)return!0;let r;for(r in e)if(!(r in t))return!1;for(r in t)if(e[r]!==t[r])return!1;return!s.und(r)||e===t}};function l(){const e=Object(n.useState)(!1)[1];return Object(n.useCallback)(()=>e(e=>!e),[])}function u(e,t){return s.und(e)||s.nul(e)?t:e}function c(e){return s.und(e)?[]:s.arr(e)?e:[e]}function d(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];return s.fun(e)?e(...r):e}function h(e){const t=function(e){return e.to,e.from,e.config,e.onStart,e.onRest,e.onFrame,e.children,e.reset,e.reverse,e.force,e.immediate,e.delay,e.attach,e.destroyed,e.interpolateTo,e.ref,e.lazy,Object(i.a)(e,["to","from","config","onStart","onRest","onFrame","children","reset","reverse","force","immediate","delay","attach","destroyed","interpolateTo","ref","lazy"])}(e);if(s.und(t))return Object(a.a)({to:t},e);const r=Object.keys(e).reduce((r,i)=>s.und(t[i])?Object(a.a)({},r,{[i]:e[i]}):r,{});return Object(a.a)({to:t},r)}class p{constructor(){this.payload=void 0,this.children=[]}getAnimatedValue(){return this.getValue()}getPayload(){return this.payload||this}attach(){}detach(){}getChildren(){return this.children}addChild(e){0===this.children.length&&this.attach(),this.children.push(e)}removeChild(e){const t=this.children.indexOf(e);this.children.splice(t,1),0===this.children.length&&this.detach()}}class f extends p{constructor(){super(...arguments),this.payload=[],this.attach=()=>this.payload.forEach(e=>e instanceof p&&e.addChild(this)),this.detach=()=>this.payload.forEach(e=>e instanceof p&&e.removeChild(this))}}class g extends p{constructor(){super(...arguments),this.payload={},this.attach=()=>Object.values(this.payload).forEach(e=>e instanceof p&&e.addChild(this)),this.detach=()=>Object.values(this.payload).forEach(e=>e instanceof p&&e.removeChild(this))}getValue(e){void 0===e&&(e=!1);const t={};for(const r in this.payload){const a=this.payload[r];(!e||a instanceof p)&&(t[r]=a instanceof p?a[e?"getAnimatedValue":"getValue"]():a)}return t}getAnimatedValue(){return this.getValue(!0)}}let m,y;function b(e,t){m={fn:e,transform:t}}function v(e){y=e}let w,O=e=>"undefined"!==typeof window?window.requestAnimationFrame(e):-1;function j(e){w=e}let k,V=()=>Date.now();function x(e){k=e}let E,A,C=e=>e.current;function q(e){E=e}class P extends g{constructor(e,t){super(),this.update=void 0,this.payload=e.style?Object(a.a)({},e,{style:E(e.style)}):e,this.update=t,this.attach()}}let S=!1;const F=new Set,R=()=>{if(!S)return!1;let e=V();for(let t of F){let r=!1;for(let a=0;a<t.configs.length;a++){let i,n,o=t.configs[a];for(let t=0;t<o.animatedValues.length;t++){let a=o.animatedValues[t];if(a.done)continue;let s=o.fromValues[t],l=o.toValues[t],u=a.lastPosition,c=l instanceof p,d=Array.isArray(o.initialVelocity)?o.initialVelocity[t]:o.initialVelocity;if(c&&(l=l.getValue()),o.immediate)a.setValue(l),a.done=!0;else if("string"!==typeof s&&"string"!==typeof l){if(void 0!==o.duration)u=s+o.easing((e-a.startTime)/o.duration)*(l-s),i=e>=a.startTime+o.duration;else if(o.decay)u=s+d/(1-.998)*(1-Math.exp(-(1-.998)*(e-a.startTime))),i=Math.abs(a.lastPosition-u)<.1,i&&(l=u);else{n=void 0!==a.lastTime?a.lastTime:e,d=void 0!==a.lastVelocity?a.lastVelocity:o.initialVelocity,e>n+64&&(n=e);let t=Math.floor(e-n);for(let e=0;e<t;++e){d+=1*((-o.tension*(u-l)+-o.friction*d)/o.mass)/1e3,u+=1*d/1e3}let r=!(!o.clamp||0===o.tension)&&(s<l?u>l:u<l),c=Math.abs(d)<=o.precision,h=0===o.tension||Math.abs(l-u)<=o.precision;i=r||c&&h,a.lastVelocity=d,a.lastTime=e}c&&!o.toValues[t].done&&(i=!1),i?(a.value!==l&&(u=l),a.done=!0):r=!0,a.setValue(u),a.lastPosition=u}else a.setValue(l),a.done=!0}t.props.onFrame&&(t.values[o.name]=o.interpolation.getValue())}t.props.onFrame&&t.props.onFrame(t.values),r||(F.delete(t),t.stop(!0))}return F.size?A?A():O(R):S=!1,S};function T(e,t,r){if("function"===typeof e)return e;if(Array.isArray(e))return T({range:e,output:t,extrapolate:r});if(w&&"string"===typeof e.output[0])return w(e);const a=e,i=a.output,n=a.range||[0,1],o=a.extrapolateLeft||a.extrapolate||"extend",s=a.extrapolateRight||a.extrapolate||"extend",l=a.easing||(e=>e);return e=>{const t=function(e,t){for(var r=1;r<t.length-1&&!(t[r]>=e);++r);return r-1}(e,n);return function(e,t,r,a,i,n,o,s,l){let u=l?l(e):e;if(u<t){if("identity"===o)return u;"clamp"===o&&(u=t)}if(u>r){if("identity"===s)return u;"clamp"===s&&(u=r)}if(a===i)return a;if(t===r)return e<=t?a:i;t===-1/0?u=-u:r===1/0?u-=t:u=(u-t)/(r-t);u=n(u),a===-1/0?u=-u:i===1/0?u+=a:u=u*(i-a)+a;return u}(e,n[t],n[t+1],i[t],i[t+1],l,o,s,a.map)}}class M extends f{constructor(e,t,r,a){super(),this.calc=void 0,this.payload=e instanceof f&&!(e instanceof M)?e.getPayload():Array.isArray(e)?e:[e],this.calc=T(t,r,a)}getValue(){return this.calc(...this.payload.map(e=>e.getValue()))}updateConfig(e,t,r){this.calc=T(e,t,r)}interpolate(e,t,r){return new M(this,e,t,r)}}class I extends p{constructor(e){var t;super(),t=this,this.animatedStyles=new Set,this.value=void 0,this.startPosition=void 0,this.lastPosition=void 0,this.lastVelocity=void 0,this.startTime=void 0,this.lastTime=void 0,this.done=!1,this.setValue=function(e,r){void 0===r&&(r=!0),t.value=e,r&&t.flush()},this.value=e,this.startPosition=e,this.lastPosition=e}flush(){0===this.animatedStyles.size&&function e(t,r){"update"in t?r.add(t):t.getChildren().forEach(t=>e(t,r))}(this,this.animatedStyles),this.animatedStyles.forEach(e=>e.update())}clearStyles(){this.animatedStyles.clear()}getValue(){return this.value}interpolate(e,t,r){return new M(this,e,t,r)}}class $ extends f{constructor(e){super(),this.payload=e.map(e=>new I(e))}setValue(e,t){void 0===t&&(t=!0),Array.isArray(e)?e.length===this.payload.length&&e.forEach((e,r)=>this.payload[r].setValue(e,t)):this.payload.forEach(r=>r.setValue(e,t))}getValue(){return this.payload.map(e=>e.getValue())}interpolate(e,t){return new M(this,e,t)}}let z=0;class L{constructor(){this.id=void 0,this.idle=!0,this.hasChanged=!1,this.guid=0,this.local=0,this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.listeners=[],this.queue=[],this.localQueue=void 0,this.getValues=()=>this.interpolations,this.id=z++}update(e){if(!e)return this;const t=h(e),r=t.delay,n=void 0===r?0:r,o=t.to,l=Object(i.a)(t,["delay","to"]);if(s.arr(o)||s.fun(o))this.queue.push(Object(a.a)({},l,{delay:n,to:o}));else if(o){let e={};Object.entries(o).forEach(t=>{let r=t[0],i=t[1];const o=Object(a.a)({to:{[r]:i},delay:d(n,r)},l),s=e[o.delay]&&e[o.delay].to;e[o.delay]=Object(a.a)({},e[o.delay],o,{to:Object(a.a)({},s,o.to)})}),this.queue=Object.values(e)}return this.queue=this.queue.sort((e,t)=>e.delay-t.delay),this.diff(l),this}start(e){if(this.queue.length){this.idle=!1,this.localQueue&&this.localQueue.forEach(e=>{let t=e.from,r=void 0===t?{}:t,i=e.to,n=void 0===i?{}:i;s.obj(r)&&(this.merged=Object(a.a)({},r,this.merged)),s.obj(n)&&(this.merged=Object(a.a)({},this.merged,n))});const t=this.local=++this.guid,r=this.localQueue=this.queue;this.queue=[],r.forEach((a,n)=>{let o=a.delay,l=Object(i.a)(a,["delay"]);const u=a=>{n===r.length-1&&t===this.guid&&a&&(this.idle=!0,this.props.onRest&&this.props.onRest(this.merged)),e&&e()};let c=s.arr(l.to)||s.fun(l.to);o?setTimeout(()=>{t===this.guid&&(c?this.runAsync(l,u):this.diff(l).start(u))},o):c?this.runAsync(l,u):this.diff(l).start(u)})}else s.fun(e)&&this.listeners.push(e),this.props.onStart&&this.props.onStart(),t=this,F.has(t)||F.add(t),S||(S=!0,O(A||R));var t;return this}stop(e){return this.listeners.forEach(t=>t(e)),this.listeners=[],this}pause(e){var t;return this.stop(!0),e&&(t=this,F.has(t)&&F.delete(t)),this}runAsync(e,t){var r=this;e.delay;let n=Object(i.a)(e,["delay"]);const o=this.local;let l=Promise.resolve(void 0);if(s.arr(n.to))for(let i=0;i<n.to.length;i++){const e=i,t=Object(a.a)({},n,h(n.to[e]));s.arr(t.config)&&(t.config=t.config[e]),l=l.then(()=>{if(o===this.guid)return new Promise(e=>this.diff(t).start(e))})}else if(s.fun(n.to)){let e,t=0;l=l.then(()=>n.to(r=>{const i=Object(a.a)({},n,h(r));if(s.arr(i.config)&&(i.config=i.config[t]),t++,o===this.guid)return e=new Promise(e=>this.diff(i).start(e))},(function(e){return void 0===e&&(e=!0),r.stop(e)})).then(()=>e))}l.then(t)}diff(e){this.props=Object(a.a)({},this.props,e);let t=this.props,r=t.from,i=void 0===r?{}:r,n=t.to,o=void 0===n?{}:n,l=t.config,h=void 0===l?{}:l,p=t.reverse,f=t.attach,g=t.reset,m=t.immediate;if(p){var b=[o,i];i=b[0],o=b[1]}this.merged=Object(a.a)({},i,this.merged,o),this.hasChanged=!1;let v=f&&f(this);if(this.animations=Object.entries(this.merged).reduce((e,t)=>{let r=t[0],n=t[1],o=e[r]||{};const l=s.num(n),p=s.str(n)&&!n.startsWith("#")&&!/\d/.test(n)&&!y[n],f=s.arr(n),b=!l&&!f&&!p;let O=s.und(i[r])?n:i[r],j=l||f||p?n:1,k=d(h,r);v&&(j=v.animations[r].parent);let x,E=o.parent,A=o.interpolation,C=c(v?j.getPayload():j),q=n;b&&(q=w({range:[0,1],output:[n,n]})(1));let P=A&&A.getValue();const S=!s.und(E)&&o.animatedValues.some(e=>!e.done),F=!s.equ(q,P),R=!s.equ(q,o.previous),T=!s.equ(k,o.config);if(g||R&&F||T){if(l||p)E=A=o.parent||new I(O);else if(f)E=A=o.parent||new $(O);else if(b){let e=o.interpolation&&o.interpolation.calc(o.parent.value);e=void 0===e||g?O:e,o.parent?(E=o.parent,E.setValue(0,!1)):E=new I(0);const t={output:[e,n]};o.interpolation?(A=o.interpolation,o.interpolation.updateConfig(t)):A=E.interpolate(t)}return C=c(v?j.getPayload():j),x=c(E.getPayload()),g&&!b&&E.setValue(O,!1),this.hasChanged=!0,x.forEach(e=>{e.startPosition=e.value,e.lastPosition=e.value,e.lastVelocity=S?e.lastVelocity:void 0,e.lastTime=S?e.lastTime:void 0,e.startTime=V(),e.done=!1,e.animatedStyles.clear()}),d(m,r)&&E.setValue(b?j:n,!1),Object(a.a)({},e,{[r]:Object(a.a)({},o,{name:r,parent:E,interpolation:A,animatedValues:x,toValues:C,previous:q,config:k,fromValues:c(E.getValue()),immediate:d(m,r),initialVelocity:u(k.velocity,0),clamp:u(k.clamp,!1),precision:u(k.precision,.01),tension:u(k.tension,170),friction:u(k.friction,26),mass:u(k.mass,1),duration:k.duration,easing:u(k.easing,e=>e),decay:k.decay})})}return F?e:(b&&(E.setValue(1,!1),A.updateConfig({output:[q,q]})),E.done=!0,this.hasChanged=!0,Object(a.a)({},e,{[r]:Object(a.a)({},e[r],{previous:q})}))},this.animations),this.hasChanged){this.configs=Object.values(this.animations),this.values={},this.interpolations={};for(let e in this.animations)this.interpolations[e]=this.animations[e].interpolation,this.values[e]=this.animations[e].interpolation.getValue()}return this}destroy(){this.stop(),this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.local=0}}const N=(e,t)=>{const r=Object(n.useRef)(!1),a=Object(n.useRef)(),i=s.fun(t),o=Object(n.useMemo)(()=>{let r;return a.current&&(a.current.map(e=>e.destroy()),a.current=void 0),[new Array(e).fill().map((e,a)=>{const n=new L,o=i?d(t,a,n):t[a];return 0===a&&(r=o.ref),n.update(o),r||n.start(),n}),r]},[e]),l=o[0],u=o[1];a.current=l;Object(n.useImperativeHandle)(u,()=>({start:()=>Promise.all(a.current.map(e=>new Promise(t=>e.start(t)))),stop:e=>a.current.forEach(t=>t.stop(e)),get controllers(){return a.current}}));const c=Object(n.useMemo)(()=>e=>a.current.map((t,r)=>{t.update(i?d(e,r,t):e[r]),u||t.start()}),[e]);Object(n.useEffect)(()=>{r.current?i||c(t):u||a.current.forEach(e=>e.start())}),Object(n.useEffect)(()=>(r.current=!0,()=>a.current.forEach(e=>e.destroy())),[]);const h=a.current.map(e=>e.getValues());return i?[h,c,e=>a.current.forEach(t=>t.pause(e))]:h},G=e=>{const t=s.fun(e),r=N(1,t?e:[e]),a=r[0],i=r[1],n=r[2];return t?[a[0],i,n]:a};class W extends g{constructor(e){void 0===e&&(e={}),super(),!e.transform||e.transform instanceof p||(e=m.transform(e)),this.payload=e}}const Q={transparent:0,aliceblue:4042850303,antiquewhite:4209760255,aqua:16777215,aquamarine:2147472639,azure:4043309055,beige:4126530815,bisque:4293182719,black:255,blanchedalmond:4293643775,blue:65535,blueviolet:2318131967,brown:2771004159,burlywood:3736635391,burntsienna:3934150143,cadetblue:1604231423,chartreuse:2147418367,chocolate:3530104575,coral:4286533887,cornflowerblue:1687547391,cornsilk:4294499583,crimson:3692313855,cyan:16777215,darkblue:35839,darkcyan:9145343,darkgoldenrod:3095792639,darkgray:2846468607,darkgreen:6553855,darkgrey:2846468607,darkkhaki:3182914559,darkmagenta:2332068863,darkolivegreen:1433087999,darkorange:4287365375,darkorchid:2570243327,darkred:2332033279,darksalmon:3918953215,darkseagreen:2411499519,darkslateblue:1211993087,darkslategray:793726975,darkslategrey:793726975,darkturquoise:13554175,darkviolet:2483082239,deeppink:4279538687,deepskyblue:12582911,dimgray:1768516095,dimgrey:1768516095,dodgerblue:512819199,firebrick:2988581631,floralwhite:4294635775,forestgreen:579543807,fuchsia:4278255615,gainsboro:3705462015,ghostwhite:4177068031,gold:4292280575,goldenrod:3668254975,gray:2155905279,green:8388863,greenyellow:2919182335,grey:2155905279,honeydew:4043305215,hotpink:4285117695,indianred:3445382399,indigo:1258324735,ivory:4294963455,khaki:4041641215,lavender:3873897215,lavenderblush:4293981695,lawngreen:2096890111,lemonchiffon:4294626815,lightblue:2916673279,lightcoral:4034953471,lightcyan:3774873599,lightgoldenrodyellow:4210742015,lightgray:3553874943,lightgreen:2431553791,lightgrey:3553874943,lightpink:4290167295,lightsalmon:4288707327,lightseagreen:548580095,lightskyblue:2278488831,lightslategray:2005441023,lightslategrey:2005441023,lightsteelblue:2965692159,lightyellow:4294959359,lime:16711935,limegreen:852308735,linen:4210091775,magenta:4278255615,maroon:2147483903,mediumaquamarine:1724754687,mediumblue:52735,mediumorchid:3126187007,mediumpurple:2473647103,mediumseagreen:1018393087,mediumslateblue:2070474495,mediumspringgreen:16423679,mediumturquoise:1221709055,mediumvioletred:3340076543,midnightblue:421097727,mintcream:4127193855,mistyrose:4293190143,moccasin:4293178879,navajowhite:4292783615,navy:33023,oldlace:4260751103,olive:2155872511,olivedrab:1804477439,orange:4289003775,orangered:4282712319,orchid:3664828159,palegoldenrod:4008225535,palegreen:2566625535,paleturquoise:2951671551,palevioletred:3681588223,papayawhip:4293907967,peachpuff:4292524543,peru:3448061951,pink:4290825215,plum:3718307327,powderblue:2967529215,purple:2147516671,rebeccapurple:1714657791,red:4278190335,rosybrown:3163525119,royalblue:1097458175,saddlebrown:2336560127,salmon:4202722047,sandybrown:4104413439,seagreen:780883967,seashell:4294307583,sienna:2689740287,silver:3233857791,skyblue:2278484991,slateblue:1784335871,slategray:1887473919,slategrey:1887473919,snow:4294638335,springgreen:16744447,steelblue:1182971135,tan:3535047935,teal:8421631,thistle:3636451583,tomato:4284696575,turquoise:1088475391,violet:4001558271,wheat:4125012991,white:4294967295,whitesmoke:4126537215,yellow:4294902015,yellowgreen:2597139199},_="[-+]?\\d*\\.?\\d+";function D(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return"\\(\\s*("+t.join(")\\s*,\\s*(")+")\\s*\\)"}const H=new RegExp("rgb"+D(_,_,_)),J=new RegExp("rgba"+D(_,_,_,_)),U=new RegExp("hsl"+D(_,"[-+]?\\d*\\.?\\d+%","[-+]?\\d*\\.?\\d+%")),Z=new RegExp("hsla"+D(_,"[-+]?\\d*\\.?\\d+%","[-+]?\\d*\\.?\\d+%",_)),B=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,K=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,X=/^#([0-9a-fA-F]{6})$/,Y=/^#([0-9a-fA-F]{8})$/;function ee(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}function te(e,t,r){const a=r<.5?r*(1+t):r+t-r*t,i=2*r-a,n=ee(i,a,e+1/3),o=ee(i,a,e),s=ee(i,a,e-1/3);return Math.round(255*n)<<24|Math.round(255*o)<<16|Math.round(255*s)<<8}function re(e){const t=parseInt(e,10);return t<0?0:t>255?255:t}function ae(e){return(parseFloat(e)%360+360)%360/360}function ie(e){const t=parseFloat(e);return t<0?0:t>1?255:Math.round(255*t)}function ne(e){const t=parseFloat(e);return t<0?0:t>100?1:t/100}function oe(e){let t=function(e){let t;return"number"===typeof e?e>>>0===e&&e>=0&&e<=4294967295?e:null:(t=X.exec(e))?parseInt(t[1]+"ff",16)>>>0:Q.hasOwnProperty(e)?Q[e]:(t=H.exec(e))?(re(t[1])<<24|re(t[2])<<16|re(t[3])<<8|255)>>>0:(t=J.exec(e))?(re(t[1])<<24|re(t[2])<<16|re(t[3])<<8|ie(t[4]))>>>0:(t=B.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+"ff",16)>>>0:(t=Y.exec(e))?parseInt(t[1],16)>>>0:(t=K.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+t[4]+t[4],16)>>>0:(t=U.exec(e))?(255|te(ae(t[1]),ne(t[2]),ne(t[3])))>>>0:(t=Z.exec(e))?(te(ae(t[1]),ne(t[2]),ne(t[3]))|ie(t[4]))>>>0:null}(e);return null===t?e:(t=t||0,`rgba(${(4278190080&t)>>>24}, ${(16711680&t)>>>16}, ${(65280&t)>>>8}, ${(255&t)/255})`)}const se=/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,le=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,ue=new RegExp(`(${Object.keys(Q).join("|")})`,"g");let ce={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};const de=["Webkit","Ms","Moz","O"];function he(e,t,r){return null==t||"boolean"===typeof t||""===t?"":r||"number"!==typeof t||0===t||ce.hasOwnProperty(e)&&ce[e]?(""+t).trim():t+"px"}ce=Object.keys(ce).reduce((e,t)=>(de.forEach(r=>e[((e,t)=>e+t.charAt(0).toUpperCase()+t.substring(1))(r,t)]=e[t]),e),ce);const pe={};q(e=>new W(e)),x("div"),j(e=>{const t=e.output.map(e=>e.replace(le,oe)).map(e=>e.replace(ue,oe)),r=t[0].match(se).map(()=>[]);t.forEach(e=>{e.match(se).forEach((e,t)=>r[t].push(+e))});const i=t[0].match(se).map((t,i)=>T(Object(a.a)({},e,{output:r[i]})));return e=>{let r=0;return t[0].replace(se,()=>i[r++](e)).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,(e,t,r,a,i)=>`rgba(${Math.round(t)}, ${Math.round(r)}, ${Math.round(a)}, ${i})`)}}),v(Q),b((e,t)=>{if(!e.nodeType||void 0===e.setAttribute)return!1;{const n=t.style,o=t.children,s=t.scrollTop,l=t.scrollLeft,u=Object(i.a)(t,["style","children","scrollTop","scrollLeft"]),c="filter"===e.nodeName||e.parentNode&&"filter"===e.parentNode.nodeName;void 0!==s&&(e.scrollTop=s),void 0!==l&&(e.scrollLeft=l),void 0!==o&&(e.textContent=o);for(let t in n)if(n.hasOwnProperty(t)){var r=0===t.indexOf("--"),a=he(t,n[t],r);"float"===t&&(t="cssFloat"),r?e.style.setProperty(t,a):e.style[t]=a}for(let t in u){const r=c?t:pe[t]||(pe[t]=t.replace(/([A-Z])/g,e=>"-"+e.toLowerCase()));"undefined"!==typeof e.getAttribute(r)&&e.setAttribute(r,u[t])}}},e=>e);var fe,ge;const me=(fe=e=>Object(n.forwardRef)((t,r)=>{const u=l(),c=Object(n.useRef)(!0),d=Object(n.useRef)(null),h=Object(n.useRef)(null),p=Object(n.useCallback)(e=>{const t=d.current;d.current=new P(e,()=>{let e=!1;h.current&&(e=m.fn(h.current,d.current.getAnimatedValue())),h.current&&!1!==e||u()}),t&&t.detach()},[]);Object(n.useEffect)(()=>()=>{c.current=!1,d.current&&d.current.detach()},[]),Object(n.useImperativeHandle)(r,()=>C(h,c,u)),p(t);const f=d.current.getValue(),g=(f.scrollTop,f.scrollLeft,Object(i.a)(f,["scrollTop","scrollLeft"])),y=(b=e,!s.fun(b)||b.prototype instanceof o.a.Component?e=>h.current=function(e,t){return t&&(s.fun(t)?t(e):s.obj(t)&&(t.current=e)),e}(e,r):void 0);var b;return o.a.createElement(e,Object(a.a)({},g,{ref:y}))}),void 0===(ge=!1)&&(ge=!0),e=>(s.arr(e)?e:Object.keys(e)).reduce((e,t)=>{const r=ge?t[0].toLowerCase()+t.substring(1):t;return e[r]=fe(r),e},fe))(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"])}}]);