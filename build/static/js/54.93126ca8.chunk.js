(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[54],{1706:function(e,t,s){"use strict";s.r(t);var a=s(1),r=s(246),c=s(247),o=s(252),i=s(239),n=s(68),l=s(248),d=s(244),b=s(4),j=["icon","color","stats","statTitle","className"],u=function(e){var t=e.icon,s=e.color,a=e.stats,r=e.statTitle,c=e.className;Object(n.a)(e,j);return Object(b.jsx)(l.a,{className:"text-center",children:Object(b.jsxs)(d.a,{className:c,children:[Object(b.jsx)("div",{className:"avatar p-50 m-0 mb-1 ".concat(s?"bg-light-".concat(s):"bg-light-primary"),children:Object(b.jsx)("div",{className:"avatar-content",children:t})}),Object(b.jsx)("h2",{className:"font-weight-bolder",children:a}),Object(b.jsx)("p",{className:"card-text line-ellipsis",children:r})]})})},h=["icon","color","stats","statTitle","className"],m=function(e){var t=e.icon,s=e.color,a=e.stats,r=e.statTitle,c=e.className;Object(n.a)(e,h);return Object(b.jsx)(l.a,{children:Object(b.jsx)(d.a,{className:c,children:Object(b.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{className:"font-weight-bolder mb-0",children:a}),Object(b.jsx)("p",{className:"card-text",children:r})]}),Object(b.jsx)("div",{className:"avatar avatar-stats p-50 m-0 ".concat(s?"bg-light-".concat(s):"bg-light-primary"),children:Object(b.jsx)("div",{className:"avatar-content",children:t})})]})})})},p=s(890),O=s(918),x=s(939),g=s(900),f=s(848),y=s(951),w=s(879),v=s(935),N=s(839),T=s(840),k=s(71),C=s(775),z=s(776),M=s(777),P=s(423),E=function(e){var t=e.kFormatter,s=e.dataInfoChart,a={chart:{id:"revenue",toolbar:{show:!1},sparkline:{enabled:!0}},grid:{show:!1},colors:[s.colorHEX],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2.5},fill:{type:"gradient",gradient:{shadeIntensity:.9,opacityFrom:.7,opacityTo:.5,stops:[0,80,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}};return Object(b.jsx)(P.a,{icon:s.icon,color:s.color,stats:t(s.quantity),statTitle:s.title,series:[{name:s.title,data:s.data}],options:a,type:"area"})},S=s(8),B=s(49),F=s.n(B),D=s(880),I=function(e){var t=e.kFormatter,s=e.success,r=Object(a.useState)(null),c=Object(S.a)(r,2),o=c[0],i=c[1],n={chart:{id:"revenue",toolbar:{show:!1},sparkline:{enabled:!0}},grid:{show:!1},colors:[s],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2.5},fill:{type:"gradient",gradient:{shadeIntensity:.9,opacityFrom:.7,opacityTo:.5,stops:[0,80,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}};return Object(a.useEffect)((function(){F.a.get("/card/card-statistics/revenue").then((function(e){return i(e.data)}))}),[]),null!==o?Object(b.jsx)(P.a,{icon:Object(b.jsx)(D.a,{size:21}),color:"success",stats:t(o.analyticsData.revenue),statTitle:"Revenue Generated",options:n,series:o.series,type:"area"}):null},L=s(829),R=function(e){var t=e.danger,s=Object(a.useState)(null),r=Object(S.a)(s,2),c=r[0],o=r[1],i={chart:{id:"revenue",toolbar:{show:!1},sparkline:{enabled:!0}},grid:{show:!1},colors:[t],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2.5},fill:{type:"gradient",gradient:{shadeIntensity:.9,opacityFrom:.7,opacityTo:.5,stops:[0,80,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}};return Object(a.useEffect)((function(){F.a.get("/card/card-statistics/sales").then((function(e){return o(e.data)}))}),[]),null!==c?Object(b.jsx)(P.a,{icon:Object(b.jsx)(L.a,{size:21}),color:"danger",stats:c.analyticsData.sales,statTitle:"Quarterly Sales",options:i,series:c.series,type:"area"}):null},A=s(923),U=function(e){var t=e.kFormatter,s=e.warning,r=Object(a.useState)(null),c=Object(S.a)(r,2),o=c[0],i=c[1],n={chart:{id:"revenue",toolbar:{show:!1},sparkline:{enabled:!0}},grid:{show:!1},colors:[s],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2.5},fill:{type:"gradient",gradient:{shadeIntensity:.9,opacityFrom:.7,opacityTo:.5,stops:[0,80,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}};return Object(a.useEffect)((function(){F.a.get("/card/card-statistics/orders").then((function(e){return i(e.data)}))}),[]),null!==o?Object(b.jsx)(P.a,{icon:Object(b.jsx)(A.a,{size:21}),color:"warning",stats:t(o.analyticsData.orders),statTitle:"Orders Received",options:n,series:o.series,type:"area"}):null},G=s(919),H=s(0),W=s(250),q=s(266),J=s.n(q),X=s(253),Q=s(255),V=["icon","color","stats","statTitle","series","options","type","height"],$=function(e){var t=e.icon,s=e.color,a=e.stats,r=e.statTitle,c=e.series,o=e.options,i=e.type,d=e.height,j=Object(n.a)(e,V);return Object(b.jsxs)(l.a,Object(H.a)(Object(H.a)({},j),{},{children:[Object(b.jsxs)(X.a,{className:"align-items-start pb-0",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{className:"font-weight-bolder",children:a}),Object(b.jsx)(Q.a,{children:r})]}),Object(b.jsx)(W.a,{className:"avatar-stats p-50 m-0",color:"light-".concat(s),icon:t})]}),Object(b.jsx)(J.a,{options:o,series:c,type:i,height:d||100})]}))},K=$;$.defaultProps={options:{chart:{toolbar:{show:!1},sparkline:{enabled:!0},dropShadow:{enabled:!0,top:5,left:0,blur:4,opacity:.1}},grid:{show:!1},colors:["#044386"],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:5},fill:{type:"gradient",gradient:{shadeIntensity:1,gradientToColors:["#A9A2F6"],opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}},color:"primary"};var Y=function(){var e=Object(a.useState)(null),t=Object(S.a)(e,2),s=t[0],r=t[1];return Object(a.useEffect)((function(){F.a.get("/card/card-statistics/site-traffic").then((function(e){return r(e.data)}))}),[]),null!==s?Object(b.jsx)(K,{icon:Object(b.jsx)(G.a,{size:21}),color:"primary",stats:"78.9k",statTitle:"Site Traffic",series:s.series,type:"line"}):null},Z=s(955),_=function(e){var t=e.success,s=Object(a.useState)(null),r=Object(S.a)(s,2),c=r[0],o=r[1];Object(a.useEffect)((function(){F.a.get("/card/card-statistics/active-users").then((function(e){return o(e.data)}))}),[]);var i={chart:{id:"activeUsers",toolbar:{show:!1},sparkline:{enabled:!0},dropShadow:{enabled:!0,top:5,left:0,blur:4,opacity:.1}},grid:{show:!1},colors:[t],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:5},fill:{type:"gradient",gradient:{shadeIntensity:1,gradientToColors:["#55DD92"],opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}};return null!==c?Object(b.jsx)(K,{icon:Object(b.jsx)(Z.a,{size:21}),color:"success",stats:"659.8k",statTitle:"Active Users",series:c.series,options:i,type:"line"}):null},ee=s(914),te=function(e){var t=e.warning,s=Object(a.useState)(null),r=Object(S.a)(s,2),c=r[0],o=r[1];Object(a.useEffect)((function(){F.a.get("/card/card-statistics/newsletter").then((function(e){return o(e.data)}))}),[]);var i={chart:{id:"newsletter",toolbar:{show:!1},sparkline:{enabled:!0},dropShadow:{enabled:!0,top:5,left:0,blur:4,opacity:.1}},grid:{show:!1},colors:[t],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:5},fill:{type:"gradient",gradient:{shadeIntensity:1,gradientToColors:["#ffc085"],opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}};return null!==c?Object(b.jsx)(K,{icon:Object(b.jsx)(ee.a,{size:21}),color:"warning",stats:"28.7k",statTitle:"Newsletter",series:c.series,type:"line",options:i}):null};t.default=function(){var e=Object(a.useContext)(k.a);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(i.a,{breadCrumbTitle:"Statistics Cards",breadCrumbParent:"Card",breadCrumbActive:"Statistics Cards"}),Object(b.jsxs)(r.a,{children:[Object(b.jsx)(c.a,{lg:"2",xs:"6",children:Object(b.jsx)(z.a,{warning:e.colors.warning.main})}),Object(b.jsx)(c.a,{lg:"2",xs:"6",children:Object(b.jsx)(M.a,{info:e.colors.info.main})}),Object(b.jsx)(c.a,{lg:"8",sm:"12",children:Object(b.jsx)(C.a,{cols:{md:"3",sm:"6"}})})]}),Object(b.jsxs)(r.a,{children:[Object(b.jsx)(c.a,{xl:"2",md:"4",sm:"6",children:Object(b.jsx)(u,{icon:Object(b.jsx)(p.a,{size:21}),color:"info",stats:"36.9k",statTitle:"Views"})}),Object(b.jsx)(c.a,{xl:"2",md:"4",sm:"6",children:Object(b.jsx)(u,{icon:Object(b.jsx)(O.a,{size:21}),color:"warning",stats:"12k",statTitle:"Comments"})}),Object(b.jsx)(c.a,{xl:"2",md:"4",sm:"6",children:Object(b.jsx)(u,{icon:Object(b.jsx)(x.a,{size:21}),color:"danger",stats:"97.8k",statTitle:"Orders"})}),Object(b.jsx)(c.a,{xl:"2",md:"4",sm:"6",children:Object(b.jsx)(u,{icon:Object(b.jsx)(g.a,{size:21}),color:"primary",stats:"26.8",statTitle:"Bookmarks"})}),Object(b.jsx)(c.a,{xl:"2",md:"4",sm:"6",children:Object(b.jsx)(u,{icon:Object(b.jsx)(f.a,{size:21}),color:"success",stats:"689",statTitle:"Reviews"})}),Object(b.jsx)(c.a,{xl:"2",md:"4",sm:"6",children:Object(b.jsx)(u,{icon:Object(b.jsx)(y.a,{size:21}),color:"danger",stats:"2.1k",statTitle:"Returns"})})]}),Object(b.jsxs)(r.a,{children:[Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(m,{icon:Object(b.jsx)(w.a,{size:21}),color:"primary",stats:"86%",statTitle:"CPU Usage"})}),Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(m,{icon:Object(b.jsx)(v.a,{size:21}),color:"success",stats:"1.2gb",statTitle:"Memory Usage"})}),Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(m,{icon:Object(b.jsx)(N.a,{size:21}),color:"danger",stats:"0.1%",statTitle:"Downtime Ratio"})}),Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(m,{icon:Object(b.jsx)(T.a,{size:21}),color:"warning",stats:"13",statTitle:"Issues Found"})})]}),Object(b.jsxs)(r.a,{children:[Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(E,{kFormatter:o.h})}),Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(I,{kFormatter:o.h,success:e.colors.success.main})}),Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(R,{danger:e.colors.danger.main})}),Object(b.jsx)(c.a,{lg:"3",sm:"6",children:Object(b.jsx)(U,{kFormatter:o.h,warning:e.colors.warning.main})})]}),Object(b.jsxs)(r.a,{children:[Object(b.jsx)(c.a,{lg:"4",sm:"6",children:Object(b.jsx)(Y,{})}),Object(b.jsx)(c.a,{lg:"4",sm:"6",children:Object(b.jsx)(_,{success:e.colors.success.main})}),Object(b.jsx)(c.a,{lg:"4",sm:"6",children:Object(b.jsx)(te,{warning:e.colors.warning.main})})]})]})}},239:function(e,t,s){"use strict";var a=s(241),r=s(899),c=s(859),o=s(918),i=s(914),n=s(856),l=s(257),d=s(258),b=s(254),j=s(1096),u=s(810),h=s(820),m=s(4);t.a=function(e){var t=e.breadCrumbTitle,s=e.breadCrumbParent,p=e.breadCrumbParent2,O=e.breadCrumbParent3,x=e.breadCrumbActive;return Object(m.jsxs)("div",{className:"content-header row",children:[Object(m.jsx)("div",{className:"content-header-left col-md-9 col-12 mb-2",children:Object(m.jsx)("div",{className:"row breadcrumbs-top",children:Object(m.jsxs)("div",{className:"col-12",children:[t?Object(m.jsx)("h2",{className:"content-header-title float-left mb-0",children:t}):"",Object(m.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(m.jsxs)(l.a,{children:[Object(m.jsx)(d.a,{tag:"li",children:Object(m.jsx)(a.b,{to:"/",children:"Home"})}),Object(m.jsx)(d.a,{tag:"li",className:"text-primary",children:s}),p?Object(m.jsx)(d.a,{tag:"li",className:"text-primary",children:p}):"",O?Object(m.jsx)(d.a,{tag:"li",className:"text-primary",children:O}):"",Object(m.jsx)(d.a,{tag:"li",active:!0,children:x})]})})]})})}),Object(m.jsx)("div",{className:"content-header-right text-md-right col-md-3 col-12 d-md-block d-none",children:Object(m.jsx)("div",{className:"form-group breadcrum-right dropdown",children:Object(m.jsxs)(b.a,{children:[Object(m.jsx)(j.a,{color:"primary",size:"sm",className:"btn-icon btn-round dropdown-toggle",children:Object(m.jsx)(r.a,{size:14})}),Object(m.jsxs)(u.a,{tag:"ul",right:!0,children:[Object(m.jsxs)(h.a,{tag:a.b,to:"/apps/chat",children:[Object(m.jsx)(c.a,{className:"mr-1",size:14}),Object(m.jsx)("span",{className:"align-middle",children:"Todo"})]}),Object(m.jsxs)(h.a,{tag:a.b,to:"/apps/chat",children:[Object(m.jsx)(o.a,{className:"mr-1",size:14}),Object(m.jsx)("span",{className:"align-middle",children:"Chat"})]}),Object(m.jsxs)(h.a,{tag:a.b,to:"/apps/email",children:[Object(m.jsx)(i.a,{className:"mr-1",size:14}),Object(m.jsx)("span",{className:"align-middle",children:"Email"})]}),Object(m.jsxs)(h.a,{tag:a.b,to:"/apps/calendar",children:[Object(m.jsx)(n.a,{className:"mr-1",size:14}),Object(m.jsx)("span",{className:"align-middle",children:"Calendar"})]})]})]})})})]})}},240:function(e,t,s){"use strict";var a=s(7),r=s(1),c=s.n(r),o=s(3),i=s.n(o),n=s(251),l={children:i.a.node},d=function(e){return c.a.createElement(n.a,Object(a.a)({group:!0},e))};d.propTypes=l,t.a=d},243:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j={tag:b.tagPropType,className:n.a.string,cssModule:n.a.object},u=function(e){var t=e.className,s=e.cssModule,c=e.tag,i=Object(r.a)(e,["className","cssModule","tag"]),n=Object(b.mapToCssModules)(d()(t,"card-title"),s);return o.a.createElement(c,Object(a.a)({},i,{className:n}))};u.propTypes=j,u.defaultProps={tag:"div"},t.a=u},246:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j=n.a.oneOfType([n.a.number,n.a.string]),u={tag:b.tagPropType,noGutters:n.a.bool,className:n.a.string,cssModule:n.a.object,form:n.a.bool,xs:j,sm:j,md:j,lg:j,xl:j},h={tag:"div",widths:["xs","sm","md","lg","xl"]},m=function(e){var t=e.className,s=e.cssModule,c=e.noGutters,i=e.tag,n=e.form,l=e.widths,j=Object(r.a)(e,["className","cssModule","noGutters","tag","form","widths"]),u=[];l.forEach((function(t,s){var a=e[t];if(delete j[t],a){var r=!s;u.push(r?"row-cols-"+a:"row-cols-"+t+"-"+a)}}));var h=Object(b.mapToCssModules)(d()(t,c?"no-gutters":null,n?"form-row":"row",u),s);return o.a.createElement(i,Object(a.a)({},j,{className:h}))};m.propTypes=u,m.defaultProps=h,t.a=m},247:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j=n.a.oneOfType([n.a.number,n.a.string]),u=n.a.oneOfType([n.a.bool,n.a.number,n.a.string,n.a.shape({size:n.a.oneOfType([n.a.bool,n.a.number,n.a.string]),order:j,offset:j})]),h={tag:b.tagPropType,xs:u,sm:u,md:u,lg:u,xl:u,className:n.a.string,cssModule:n.a.object,widths:n.a.array},m={tag:"div",widths:["xs","sm","md","lg","xl"]},p=function(e,t,s){return!0===s||""===s?e?"col":"col-"+t:"auto"===s?e?"col-auto":"col-"+t+"-auto":e?"col-"+s:"col-"+t+"-"+s},O=function(e){var t=e.className,s=e.cssModule,c=e.widths,i=e.tag,n=Object(r.a)(e,["className","cssModule","widths","tag"]),l=[];c.forEach((function(t,a){var r=e[t];if(delete n[t],r||""===r){var c=!a;if(Object(b.isObject)(r)){var o,i=c?"-":"-"+t+"-",j=p(c,t,r.size);l.push(Object(b.mapToCssModules)(d()(((o={})[j]=r.size||""===r.size,o["order"+i+r.order]=r.order||0===r.order,o["offset"+i+r.offset]=r.offset||0===r.offset,o)),s))}else{var u=p(c,t,r);l.push(u)}}})),l.length||l.push("col");var j=Object(b.mapToCssModules)(d()(t,l),s);return o.a.createElement(i,Object(a.a)({},n,{className:j}))};O.propTypes=h,O.defaultProps=m,t.a=O},248:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j={tag:b.tagPropType,inverse:n.a.bool,color:n.a.string,body:n.a.bool,outline:n.a.bool,className:n.a.string,cssModule:n.a.object,innerRef:n.a.oneOfType([n.a.object,n.a.string,n.a.func])},u=function(e){var t=e.className,s=e.cssModule,c=e.color,i=e.body,n=e.inverse,l=e.outline,j=e.tag,u=e.innerRef,h=Object(r.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),m=Object(b.mapToCssModules)(d()(t,"card",!!n&&"text-white",!!i&&"card-body",!!c&&(l?"border":"bg")+"-"+c),s);return o.a.createElement(j,Object(a.a)({},h,{className:m,ref:u}))};u.propTypes=j,u.defaultProps={tag:"div"},t.a=u},253:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j={tag:b.tagPropType,className:n.a.string,cssModule:n.a.object},u=function(e){var t=e.className,s=e.cssModule,c=e.tag,i=Object(r.a)(e,["className","cssModule","tag"]),n=Object(b.mapToCssModules)(d()(t,"card-header"),s);return o.a.createElement(c,Object(a.a)({},i,{className:n}))};u.propTypes=j,u.defaultProps={tag:"div"},t.a=u},254:function(e,t,s){"use strict";s.d(t,"a",(function(){return m}));var a=s(242),r=s(7),c=s(64),o=s(63),i=s(1),n=s.n(i),l=s(3),d=s.n(l),b=s(240),j=s(48);function u(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,a)}return s}var h=["defaultOpen"],m=function(e){function t(t){var s;return(s=e.call(this,t)||this).state={isOpen:t.defaultOpen||!1},s.toggle=s.toggle.bind(Object(c.a)(s)),s}Object(o.a)(t,e);var s=t.prototype;return s.toggle=function(){this.setState({isOpen:!this.state.isOpen})},s.render=function(){return n.a.createElement(b.a,Object(r.a)({isOpen:this.state.isOpen,toggle:this.toggle},Object(j.omit)(this.props,h)))},t}(i.Component);m.propTypes=function(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?u(Object(s),!0).forEach((function(t){Object(a.a)(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):u(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}({defaultOpen:d.a.bool},b.a.propTypes)},255:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j={tag:b.tagPropType,className:n.a.string,cssModule:n.a.object},u=function(e){var t=e.className,s=e.cssModule,c=e.tag,i=Object(r.a)(e,["className","cssModule","tag"]),n=Object(b.mapToCssModules)(d()(t,"card-text"),s);return o.a.createElement(c,Object(a.a)({},i,{className:n}))};u.propTypes=j,u.defaultProps={tag:"p"},t.a=u},257:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j={tag:b.tagPropType,listTag:b.tagPropType,className:n.a.string,listClassName:n.a.string,cssModule:n.a.object,children:n.a.node,"aria-label":n.a.string},u=function(e){var t=e.className,s=e.listClassName,c=e.cssModule,i=e.children,n=e.tag,l=e.listTag,j=e["aria-label"],u=Object(r.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),h=Object(b.mapToCssModules)(d()(t),c),m=Object(b.mapToCssModules)(d()("breadcrumb",s),c);return o.a.createElement(n,Object(a.a)({},u,{className:h,"aria-label":j}),o.a.createElement(l,{className:m},i))};u.propTypes=j,u.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},t.a=u},258:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j={tag:b.tagPropType,active:n.a.bool,className:n.a.string,cssModule:n.a.object},u=function(e){var t=e.className,s=e.cssModule,c=e.active,i=e.tag,n=Object(r.a)(e,["className","cssModule","active","tag"]),l=Object(b.mapToCssModules)(d()(t,!!c&&"active","breadcrumb-item"),s);return o.a.createElement(i,Object(a.a)({},n,{className:l,"aria-current":c?"page":void 0}))};u.propTypes=j,u.defaultProps={tag:"li"},t.a=u},280:function(e,t,s){"use strict";var a=s(7),r=s(14),c=s(1),o=s.n(c),i=s(3),n=s.n(i),l=s(62),d=s.n(l),b=s(48),j={tag:b.tagPropType,type:n.a.string,size:n.a.string,color:n.a.string,className:n.a.string,cssModule:n.a.object,children:n.a.string},u=function(e){var t=e.className,s=e.cssModule,c=e.type,i=e.size,n=e.color,l=e.children,j=e.tag,u=Object(r.a)(e,["className","cssModule","type","size","color","children","tag"]),h=Object(b.mapToCssModules)(d()(t,!!i&&"spinner-"+c+"-"+i,"spinner-"+c,!!n&&"text-"+n),s);return o.a.createElement(j,Object(a.a)({role:"status"},u,{className:h}),l&&o.a.createElement("span",{className:Object(b.mapToCssModules)("sr-only",s)},l))};u.propTypes=j,u.defaultProps={tag:"div",type:"border",children:"Loading..."},t.a=u},337:function(e,t,s){"use strict";var a=s(280),r=s(4);t.a=function(e){var t=e.size,s=void 0===t?"":t;return Object(r.jsx)(a.a,{color:"primary",size:s})}},423:function(e,t,s){"use strict";var a=s(15),r=s(68),c=s(250),o=s(65),i=s.n(o),n=s(266),l=s.n(n),d=s(248),b=s(244),j=s(337),u=s(4),h=["kFormatter","newDataTableTicketsTwo","dataInfoChart","series","type","height","className","loadingTicket"];t.a=function(e){var t=e.kFormatter,s=(e.newDataTableTicketsTwo,e.dataInfoChart),o=e.series,n=e.type,m=void 0===n?"area":n,p=e.height,O=e.className,x=e.loadingTicket,g=(Object(r.a)(e,h),{chart:{id:"revenue",toolbar:{show:!1},sparkline:{enabled:!0}},grid:{show:!1},colors:[s.colorHEX],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2.5},fill:{type:"gradient",gradient:{shadeIntensity:.9,opacityFrom:.7,opacityTo:.5,stops:[0,80,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}});return Object(u.jsxs)(d.a,{children:[Object(u.jsxs)(b.a,{className:i()("pb-0",Object(a.a)({},O,O)),children:[Object(u.jsx)(c.a,{className:"avatar-stats p-50 m-0",color:"light-".concat(s.color),icon:s.icon}),Object(u.jsx)("h2",{className:"font-weight-bolder mt-1",children:x?Object(u.jsx)(j.a,{}):t(s.quantity)}),Object(u.jsx)("p",{className:"card-text mb-1",children:s.title})]}),o[0].data&&Object(u.jsx)(l.a,{options:g,series:o,type:m,height:p||100})]})}},522:function(e,t,s){"use strict";var a=s(1),r=s(71),c=s(266),o=s.n(c),i=s(248),n=s(244),l=s(337),d=s(4);t.a=function(e){var t=e.title,s=(e.newDataTableTicketsTwo,e.total),c=e.series,b=e.type,j=e.height,u=e.loadingTicket,h={chart:{stacked:!0,toolbar:{show:!1}},grid:{show:!0,padding:{left:0,right:0,top:-15,bottom:-15}},plotOptions:{bar:{horizontal:!1,columnWidth:"30%",startingShape:"rounded",colors:{backgroundBarColors:["#f3f3f3","#f3f3f3","#f3f3f3","#f3f3f3","#f3f3f3"],backgroundBarRadius:5}}},legend:{show:!1},dataLabels:{enabled:!1},colors:[Object(a.useContext)(r.a).colors.warning.main],xaxis:{labels:{show:!1},axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{show:!1},tooltip:{x:{show:!1}}};return Object(d.jsx)(i.a,{className:"card-tiny-line-stats",children:Object(d.jsxs)(n.a,{className:"pb-50",children:[Object(d.jsx)("h6",{children:t}),Object(d.jsx)("h2",{className:"font-weight-bolder mb-1",children:u?Object(d.jsx)(l.a,{}):s}),c&&Object(d.jsx)(o.a,{options:h,series:c,type:b,height:j})]})})}},775:function(e,t,s){"use strict";var a=s(0),r=s(15),c=s(65),o=s.n(c),i=s(250),n=s(950),l=s(832),d=s(854),b=s(883),j=s(247),u=s(826),h=s(255),m=s(248),p=s(253),O=s(243),x=s(244),g=s(246),f=s(4);t.a=function(e){var t=e.cols,s=[{title:"230k",subtitle:"Sales",color:"light-primary",icon:Object(f.jsx)(n.a,{size:24})},{title:"8.549k",subtitle:"Customers",color:"light-info",icon:Object(f.jsx)(l.a,{size:24})},{title:"1.423k",subtitle:"Products",color:"light-danger",icon:Object(f.jsx)(d.a,{size:24})},{title:"$9745",subtitle:"Revenue",color:"light-success",icon:Object(f.jsx)(b.a,{size:24})}];return Object(f.jsxs)(m.a,{className:"card-statistics",children:[Object(f.jsxs)(p.a,{children:[Object(f.jsx)(O.a,{tag:"h4",children:"Statistics"}),Object(f.jsx)(h.a,{className:"card-text font-small-2 mr-25 mb-0",children:"Updated 1 month ago"})]}),Object(f.jsx)(x.a,{className:"statistics-body",children:Object(f.jsx)(g.a,{children:s.map((function(e,c){var n=Object.keys(t);return Object(f.jsx)(j.a,Object(a.a)(Object(a.a)({},t),{},{className:o()(Object(r.a)({},"mb-2 mb-".concat(n[0],"-0"),c!==s.length-1)),children:Object(f.jsxs)(u.a,{children:[Object(f.jsx)(i.a,{color:e.color,icon:e.icon,className:"mr-2"}),Object(f.jsxs)(u.a,{className:"my-auto",body:!0,children:[Object(f.jsx)("h4",{className:"font-weight-bolder mb-0",children:e.title}),Object(f.jsx)(h.a,{className:"font-small-3 mb-0",children:e.subtitle})]})]})}),c)}))})})]})}},776:function(e,t,s){"use strict";var a=s(8),r=s(1),c=s(49),o=s.n(c),i=s(522),n=s(4);t.a=function(e){var t=e.warning,s=Object(r.useState)(null),c=Object(a.a)(s,2),l=c[0],d=c[1];Object(r.useEffect)((function(){o.a.get("/card/card-statistics/orders-bar-chart").then((function(e){return d(e.data)}))}),[]);var b={chart:{stacked:!0,toolbar:{show:!1}},grid:{show:!1,padding:{left:0,right:0,top:-15,bottom:-15}},plotOptions:{bar:{horizontal:!1,columnWidth:"20%",startingShape:"rounded",colors:{backgroundBarColors:["#f3f3f3","#f3f3f3","#f3f3f3","#f3f3f3","#f3f3f3"],backgroundBarRadius:5}}},legend:{show:!1},dataLabels:{enabled:!1},colors:[t],xaxis:{labels:{show:!1},axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{show:!1},tooltip:{x:{show:!1}}};return null!==l?Object(n.jsx)(i.a,{height:70,type:"bar",options:b,title:"Casos por D\xeda",stats:l.statistics,series:l.series}):null}},777:function(e,t,s){"use strict";var a=s(8),r=s(1),c=s(49),o=s.n(c),i=s(522),n=s(4);t.a=function(e){var t=e.info,s=Object(r.useState)(null),c=Object(a.a)(s,2),l=c[0],d=c[1];Object(r.useEffect)((function(){o.a.get("/card/card-statistics/profit-line-chart").then((function(e){return d(e.data)}))}),[]);var b={chart:{toolbar:{show:!1},zoom:{enabled:!1}},grid:{borderColor:"#EBEBEB",strokeDashArray:5,xaxis:{lines:{show:!0}},yaxis:{lines:{show:!1}},padding:{top:-30,bottom:-10}},stroke:{width:3},colors:[t],series:[{data:[0,20,5,30,15,45]}],markers:{size:2,colors:t,strokeColors:t,strokeWidth:2,strokeOpacity:1,strokeDashArray:0,fillOpacity:1,discrete:[{seriesIndex:0,dataPointIndex:5,fillColor:"#ffffff",strokeColor:t,size:5}],shape:"circle",radius:2,hover:{size:3}},xaxis:{labels:{show:!0,style:{fontSize:"0px"}},axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{show:!1},tooltip:{x:{show:!1}}};return null!==l?Object(n.jsx)(i.a,{height:70,type:"line",options:b,title:"Casos por Mes",stats:l.statistics,series:l.series}):null}}}]);
//# sourceMappingURL=54.93126ca8.chunk.js.map