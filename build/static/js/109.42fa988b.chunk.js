(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[109],{1790:function(e,t,a){"use strict";a.r(t);var s=a(237),i=a.n(s),n=a(238),r=a(8),o=a(1),c=a(65),l=a.n(c),u=(a(49),a(250)),p=(a(1094),a(69)),d=a(265),f=a(70),m=a(831),b=a(78),g=a(311),j=a(241),v=a(323),h=a(252),O=a(875),y=a(248),x=a(244),N=a(243),w=a(255),S=a(291),k=a(796),z=a(274),C=a(823),P=a(234),$=a(587),T=(a(318),a(236)),I=a(256),M=function(){var e=Object(n.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.b.post(I.a.auth.login,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=a(1095),q=a(4),E=function(e){var t=e.name;return Object(q.jsxs)(q.Fragment,{children:[Object(q.jsx)("div",{className:"toastify-header",children:Object(q.jsxs)("div",{className:"title-wrapper",children:[Object(q.jsx)(u.a,{size:"sm",color:"success",icon:Object(q.jsx)(O.a,{size:12})}),Object(q.jsxs)("h6",{className:"toast-title font-weight-bold",children:["Bienvenido, ",t]})]})}),Object(q.jsx)("div",{className:"toastify-body",children:Object(q.jsx)("span",{children:"Has iniciado sesi\xf3n con \xe9xito en Reportero de la Gesti\xf3n Gubernamental."})})]})};t.default=function(e){var t=Object(o.useContext)(b.a),s=Object(o.useContext)(R.a).addAuthFN,c=Object(p.b)(),u=Object(g.g)(),O=Object(o.useState)(""),T=Object(r.a)(O,2),I=T[0],A=T[1],B=Object(o.useState)(""),L=Object(r.a)(B,2),U=L[0],F=L[1],G=Object(o.useState)(!1),J=Object(r.a)(G,2),_=J[0],W=J[1],H=Object(o.useState)(!1),Z=Object(r.a)(H,2),D=Z[0],K=Z[1],Q=Object(d.c)(),V=Q.register,X=Q.errors,Y=Q.handleSubmit,ee=function(){var e=Object(n.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(h.f)(X)&&(window.btoa(unescape(encodeURIComponent("".concat(n.loginEmail,":").concat(n.loginPassword)))),K(!0),console.log(n),M({identifier:n.loginEmail,password:n.loginPassword}).then((function(e){var i={id:1,fullName:"".concat(e.data.user.firstname," ").concat(e.data.user.lastname),username:e.data.user.username,password:"admin",cedula:e.data.user.cedula,avatar:a(75).default,email:e.data.user.email,role:"admin",ability:[{action:"manage",subject:"all"}],extras:{eCommerceCartItemsCount:5},zammadUser:e.data,strapiUser:e.data,accessToken:e.data.jwt,refreshToken:e.data.jwt};c(Object(m.a)(i)),s({token:e.data.jwt,logged:!0,user:e.data.user}),t.update(i.ability),u.push(Object(h.e)(i.role)),f.f.success(Object(q.jsx)(E,{name:i.fullName||i.username||"",role:i.role||"admin"}),{transition:f.c,hideProgressBar:!0,autoClose:1e4})})).catch((function(e){K(!1),W(!0),console.log(e.message)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(q.jsx)("div",{className:"auth-wrapper auth-v1 px-2",children:Object(q.jsx)("div",{className:"auth-inner py-2",children:Object(q.jsx)(y.a,{className:"mb-0",children:Object(q.jsxs)(x.a,{children:[Object(q.jsx)($.a,{}),Object(q.jsx)(N.a,{tag:"h4",className:"mb-1",children:"Bienvenido al Reportero de la Gesti\xf3n Gubernamental"}),Object(q.jsx)(w.a,{className:"mb-2",children:"Inicie sesi\xf3n en su cuenta para empezar el trabajo!"}),Object(q.jsxs)(S.a,{className:"auth-login-form mt-2",onSubmit:Y(ee),children:[Object(q.jsxs)(k.a,{children:[Object(q.jsx)(z.a,{className:"form-label",for:"loginEmail",children:"Correo Electr\xf3nico"}),Object(q.jsx)(C.a,{autoFocus:!0,type:"email",value:I,id:"loginEmail",name:"loginEmail",placeholder:"tucorreo@ejemplo.com",onChange:function(e){return A(e.target.value)},className:l()({"is-invalid":X.loginEmail}),innerRef:V({required:!0,validate:function(e){return""!==e}})})]}),Object(q.jsxs)(k.a,{children:[Object(q.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(q.jsx)(z.a,{className:"form-label",for:"loginPassword",children:"Contrase\xf1a"}),Object(q.jsx)(j.b,{to:"/pages/forgot-password-v1",children:Object(q.jsx)("small",{children:"\xbfOlvidaste tu Contrase\xf1a?"})})]}),Object(q.jsx)(v.a,{value:U,id:"loginPassword",name:"loginPassword",onChange:function(e){return F(e.target.value)},className:l()({"is-invalid":X.loginPassword}),innerRef:V({required:!0,validate:function(e){return""!==e}})})]}),Object(q.jsx)("p",{style:{marginBottom:"10px",color:"red"},children:_&&"Error al autenticar, por favor verifique sus datos."}),Object(q.jsx)(P.a.Ripple,{type:"submit",color:"primary",block:!0,disabled:D,children:D?"Cargando...":"Login"})]})]})})})})}},236:function(e,t,a){"use strict";a.d(t,"d",(function(){return r})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return l}));var s=a(49),i=a.n(s),n=(JSON.parse(localStorage.getItem("userData"))||[]).accessToken,r=i.a.create({baseURL:"https://qa.zammad.rgg.digital.gob.do/api/v1/",headers:{authorization:"Basic ".concat(n)}}),o=i.a.create({baseURL:"https://api.digital.gob.do/v1/territories/"}),c=i.a.create({baseURL:"https://api.digital.gob.do/v2/incidents/"}),l=i.a.create({baseURL:"https://reportero-strapi-api-staging-c3pxhzpxoa-ue.a.run.app/api/"});l.interceptors.request.use((function(e){var t=(JSON.parse(localStorage.getItem("user"))||[]).token,a="";return t&&(a=t),e.headers.Authorization="Bearer ".concat(a),e}),(function(e){return console.log("error ============> ",e)})),l.interceptors.response.use((function(e){return e}),(function(e){var t;console.log("error response ============> ",e),401===(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status)&&(localStorage.clear(),window.location.href="/")}))},243:function(e,t,a){"use strict";var s=a(7),i=a(14),n=a(1),r=a.n(n),o=a(3),c=a.n(o),l=a(62),u=a.n(l),p=a(48),d={tag:p.tagPropType,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,a=e.cssModule,n=e.tag,o=Object(i.a)(e,["className","cssModule","tag"]),c=Object(p.mapToCssModules)(u()(t,"card-title"),a);return r.a.createElement(n,Object(s.a)({},o,{className:c}))};f.propTypes=d,f.defaultProps={tag:"div"},t.a=f},244:function(e,t,a){"use strict";var s=a(7),i=a(14),n=a(1),r=a.n(n),o=a(3),c=a.n(o),l=a(62),u=a.n(l),p=a(48),d={tag:p.tagPropType,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},f=function(e){var t=e.className,a=e.cssModule,n=e.innerRef,o=e.tag,c=Object(i.a)(e,["className","cssModule","innerRef","tag"]),l=Object(p.mapToCssModules)(u()(t,"card-body"),a);return r.a.createElement(o,Object(s.a)({},c,{className:l,ref:n}))};f.propTypes=d,f.defaultProps={tag:"div"},t.a=f},248:function(e,t,a){"use strict";var s=a(7),i=a(14),n=a(1),r=a.n(n),o=a(3),c=a.n(o),l=a(62),u=a.n(l),p=a(48),d={tag:p.tagPropType,inverse:c.a.bool,color:c.a.string,body:c.a.bool,outline:c.a.bool,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},f=function(e){var t=e.className,a=e.cssModule,n=e.color,o=e.body,c=e.inverse,l=e.outline,d=e.tag,f=e.innerRef,m=Object(i.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),b=Object(p.mapToCssModules)(u()(t,"card",!!c&&"text-white",!!o&&"card-body",!!n&&(l?"border":"bg")+"-"+n),a);return r.a.createElement(d,Object(s.a)({},m,{className:b,ref:f}))};f.propTypes=d,f.defaultProps={tag:"div"},t.a=f},255:function(e,t,a){"use strict";var s=a(7),i=a(14),n=a(1),r=a.n(n),o=a(3),c=a.n(o),l=a(62),u=a.n(l),p=a(48),d={tag:p.tagPropType,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,a=e.cssModule,n=e.tag,o=Object(i.a)(e,["className","cssModule","tag"]),c=Object(p.mapToCssModules)(u()(t,"card-text"),a);return r.a.createElement(n,Object(s.a)({},o,{className:c}))};f.propTypes=d,f.defaultProps={tag:"p"},t.a=f},256:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var s={auth:{login:"/auth/local"},dashboard:{total:"tickets",open:"tickets?filters[state][$eq]=open",end:"tickets?filters[state][$eq]=closed",notClose:"tickets?filters[state][$ne]=closed",priorityLow:"tickets?filters[priority][$eq]=low",priorityNormal:"tickets?filters[priority][$eq]=normal",priorityHigh:"tickets?filters[priority][$eq]=high",institutionWithTickets:"institutions?populate[tickets][fields]=id",usersActive:"users"},beneficiaries:{beneficiary:function(e){var t=e.valueSearch,a=void 0===t?"":t,s=e.pageNumber;return"beneficiaries?pagination[page]=".concat(void 0===s?1:s,"&pagination[pageSize]=10&filters[cedula][$containsi]=").concat(a)},beneficiaryPost:"beneficiaries",beneficiaryId:function(e){return"beneficiaries/".concat(e)},beneficiaryByCedula:function(e){return"beneficiaries?filters[cedula][$eq]=".concat(e)}},users:{userMe:"users/me?populate[institution][fields]=name&populate[institution][fields]=acronym",user:function(e){var t=e.valueSearch,a=void 0===t?"":t,s=e.valueZone,i=void 0===s?"":s;e.pageNumber;return"users?pagination[page]=1&pagination[pageSize]=10&filters[cedula][$containsi]=".concat(a,"&filters[zone_code][$startsWith]=").concat(i)},userPost:"users",userId:function(e){return"users/".concat(e,"?populate[institution][fields]=name&populate[institution][fields]=acronym")},userImport:"users/import"},tickets:{ticket:function(e){var t=e.valueSearch,a=void 0===t?"":t,s=e.valueZone,i=void 0===s?"":s,n=e.pageNumber;return"tickets".concat(function(e){var t=e.pageNumber;return"?pagination[page]=".concat(t,"&pagination[pageSize]=10&fields[0]=title&fields[1]=address&fields[2]=description&fields[3]=state&fields[4]=priority&fields[5]=createdAt&fields[6]=zone_code&sort[0]=publishedAt:desc&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula&populate[beneficiary][fields][0]=name&populate[beneficiary][fields][1]=cedula&populate[beneficiary][fields][2]=phone&populate[beneficiary][fields][3]=email&populate[institution][fields][0]=acronym&populate[institution][fields][1]=name&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id")}({pageNumber:void 0===n?1:n}),"&filters[title][$containsi]=").concat(a,"&filters[zone_code][$startsWith]=").concat(i)},ticketPost:"tickets",ticketId:function(e){return"tickets/".concat(e).concat("?fields[0]=title&fields[1]=address&fields[2]=description&fields[3]=state&fields[4]=priority&fields[5]=createdAt&fields[6]=zone_code&sort[0]=publishedAt:desc&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula&populate[beneficiary][fields][0]=name&populate[beneficiary][fields][1]=cedula&populate[beneficiary][fields][2]=phone&populate[beneficiary][fields][3]=email&populate[institution][fields][0]=acronym&populate[institution][fields][1]=name&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id").concat("&populate[comments][populate][0]=attachments&populate[comments][populate][attachments][fields][0]=url&populate[comments][populate][attachments][fields][1]=name&populate[comments][populate][attachments][fields][1]=mime").concat("&populate[comments][populate][owner][fields][1]=firstname&populate[comments][populate][owner][fields][2]=lastname&populate[comments][populate][owner][fields][2]=cedula")},ticketImport:"tickets/import"},institutions:{institution:function(e){var t=e.valueSearch,a=void 0===t?"":t,s=e.pageNumber;return"institutions?pagination[page]=".concat(void 0===s?1:s,"&pagination[pageSize]=10&filters[name][$containsi]=").concat(a)},institutionPost:"institutions",institutionId:function(e){return"institutions/".concat(e,"?populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula")},institutionByIdService:function(e){return"institutions?fields[0]=name&fields[1]=acronym&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id&filters[services][id][$eq]=".concat(e)}},services:{all:"services?pagination[page]=1&pagination[pageSize]=10",serviceId:function(e){return"services/".concat(e,"?fields[0]=name&fields[1]=type&populate[children][fields][0]=name&populate[children][fields][1]=type&populate[parent][fields][0]=name&populate[parent][fields][1]=type&sort[0]=publishedAt:asc")},service:function(e){var t=e.valueSearch,a=e.pageNumber;return"services?pagination[page]=".concat(void 0===a?1:a,"&pagination[pageSize]=10&filters[type][$eq]=service&filters[name][$containsi]=").concat(t)},category:function(e){var t=e.valueSearch,a=e.pageNumber;return"services?pagination[page]=".concat(void 0===a?1:a,"&pagination[pageSize]=10&filters[type][$eq]=category&filters[name][$containsi]=").concat(t)},subCategory:function(e){var t=e.valueSearch,a=e.pageNumber;return"services?pagination[page]=".concat(void 0===a?1:a,"&pagination[pageSize]=10&filters[type][$eq]=subcategory&filters[name][$containsi]=").concat(t)}},comments:{comment:"comments"},uploads:{upload:"upload"}}},318:function(e,t,a){},323:function(e,t,a){"use strict";var s=a(0),i=a(15),n=a(8),r=a(68),o=a(1),c=a(65),l=a.n(c),u=a(890),p=a(889),d=a(274),f=a(821),m=a(823),b=a(822),g=a(669),j=a(4),v=["label","hideIcon","showIcon","visible","className","htmlFor","placeholder","iconSize","inputClassName"],h=function(e){var t=e.label,a=e.hideIcon,c=e.showIcon,h=e.visible,O=e.className,y=e.htmlFor,x=e.placeholder,N=e.iconSize,w=e.inputClassName,S=Object(r.a)(e,v),k=Object(o.useState)(h),z=Object(n.a)(k,2),C=z[0],P=z[1];return Object(j.jsxs)(o.Fragment,{children:[t?Object(j.jsx)(d.a,{for:y,children:t}):null,Object(j.jsxs)(f.a,{className:l()(Object(i.a)({},O,O)),children:[Object(j.jsx)(m.a,Object(s.a)(Object(s.a)({type:!1===C?"password":"text",placeholder:x||"\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7",className:l()(Object(i.a)({},w,w))},t&&y?{id:y}:{}),S)),Object(j.jsx)(b.a,{addonType:"append",onClick:function(){return P(!C)},children:Object(j.jsx)(g.a,{className:"cursor-pointer",children:function(){var e=N||14;return!1===C?a||Object(j.jsx)(u.a,{size:e}):c||Object(j.jsx)(p.a,{size:e})}()})})]})]})};t.a=h,h.defaultProps={visible:!1}},587:function(e,t,a){"use strict";var s=a(122),i=a(4);t.a=function(){return Object(i.jsx)("div",{className:"d-flex justify-content-center mt-2 mb-4",children:Object(i.jsx)("img",{className:"img-fluid",src:s.a,width:250,alt:"Logo"})})}}}]);
//# sourceMappingURL=109.42fa988b.chunk.js.map