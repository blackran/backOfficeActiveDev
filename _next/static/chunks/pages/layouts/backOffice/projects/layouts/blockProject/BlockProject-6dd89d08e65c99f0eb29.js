_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[29],{BsWD:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("a3WO");function a(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},DSFK:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},ODXe:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("DSFK");var a=n("BsWD"),o=n("PYwp");function c(e,t){return Object(r.a)(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var c,u=e[Symbol.iterator]();!(r=(c=u.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(i){a=!0,o=i}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return n}}(e,t)||Object(a.a)(e,t)||Object(o.a)()}},PYwp:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},YFqc:function(e,t,n){e.exports=n("cTJO")},a3WO:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},cTJO:function(e,t,n){"use strict";var r=n("J4zp"),a=n("284h");t.__esModule=!0,t.default=void 0;var o,c=a(n("q1tI")),u=n("elyg"),i=n("nOHt"),s=new Map,f=window.IntersectionObserver,l={};var p=function(e,t){var n=o||(f?o=new f((function(e){e.forEach((function(e){if(s.has(e.target)){var t=s.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(o.unobserve(e.target),s.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(e),s.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}s.delete(e)}):function(){}};function d(e,t,n,r){(0,u.isLocalURL)(t)&&(e.prefetch(t,n,r).catch((function(e){0})),l[t+"%"+n]=!0)}var g=function(e){var t=!1!==e.prefetch,n=c.default.useState(),a=r(n,2),o=a[0],s=a[1],g=(0,i.useRouter)(),v=g&&g.pathname||"/",h=c.default.useMemo((function(){var t=(0,u.resolveHref)(v,e.href);return{href:t,as:e.as?(0,u.resolveHref)(v,e.as):t}}),[v,e.href,e.as]),y=h.href,m=h.as;c.default.useEffect((function(){if(t&&f&&o&&o.tagName&&(0,u.isLocalURL)(y)&&!l[y+"%"+m])return p(o,(function(){d(g,y,m)}))}),[t,o,y,m,g]);var j=e.children,b=e.replace,O=e.shallow,w=e.scroll;"string"===typeof j&&(j=c.default.createElement("a",null,j));var _=c.Children.only(j),E={ref:function(e){e&&s(e),_&&"object"===typeof _&&_.ref&&("function"===typeof _.ref?_.ref(e):"object"===typeof _.ref&&(_.ref.current=e))},onClick:function(e){_.props&&"function"===typeof _.props.onClick&&_.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,c){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,u.isLocalURL)(n))&&(e.preventDefault(),null==c&&(c=r.indexOf("#")<0),t[a?"replace":"push"](n,r,{shallow:o}).then((function(e){e&&c&&(window.scrollTo(0,0),document.body.focus())})))}(e,g,y,m,b,O,w)}};return t&&(E.onMouseEnter=function(e){(0,u.isLocalURL)(y)&&(_.props&&"function"===typeof _.props.onMouseEnter&&_.props.onMouseEnter(e),d(g,y,m,{priority:!0}))}),(e.passHref||"a"===_.type&&!("href"in _.props))&&(E.href=(0,u.addBasePath)(m)),c.default.cloneElement(_,E)};t.default=g},juXC:function(e,t,n){"use strict";n.r(t);var r=n("ODXe"),a=n("q1tI"),o=n.n(a),c=n("YFqc"),u=n.n(c),i=n("nOHt"),s=n("wEEd"),f=o.a.createElement;t.default=function(e){var t=e.data,n=e.add,o=e.i,c=Object(a.useState)({idProject:"",titleProject:"",imgProject:"",language:""}),l=c[0],p=c[1],d=Object(i.useRouter)(),g=1e3*o,v=Object(s.b)((function(){return{transform:"translateY("+(g||100)+"px)",opacity:0}})),h=Object(r.a)(v,2),y=h[0],m=h[1];Object(a.useEffect)((function(){p(t),m({transform:"translateY(0px)",opacity:1})}),[t]);var j=function(e){return"object"===typeof e?d.push("/ProjectsDetails"):d.push("/ProjectsDetails?id="+e)},b=l.idProject,O=l.titleProject,w=l.imgProject,_=l.language;return f(s.a.div,{style:y,className:"BlockProject shadow-1"},n?f("div",{onClick:j},"  ",f("header",null,f("h1",null,O||"Nouveau")),f("div",{className:"image"},f("img",{src:"/add-new-project.jpg",alt:"image_language"})),f("div",{className:"list_language"},_&&_.map((function(e,t){return f(u.a,{href:"/",key:e.idLanguage},f("div",{className:"language"},f("img",{src:"/add-new-project.jpg",alt:"image_language"})))})))):f("div",{onClick:function(){return j(b)}}," ",f("header",null,f("h1",null,O||"Nouveau")),f("div",{className:"image"},f("img",{src:w,alt:"image_project"})),f("div",{className:"list_language"},_&&_.map((function(e,t){return f(u.a,{href:e.urlLanguage||"/",key:e.idLanguage},f("div",{className:"language"},f("img",{src:e.imgLanguage,alt:"image_language"})))})))))}},pOTO:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/layouts/backOffice/projects/layouts/blockProject/BlockProject",function(){return n("juXC")}])},wx14:function(e,t,n){"use strict";function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.d(t,"a",(function(){return r}))},zLVn:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}n.d(t,"a",(function(){return r}))}},[["pOTO",0,1,2,5,4]]]);