(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[8],{236:function(e,t,i){"use strict";i.d(t,"d",(function(){return o})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return c})),i.d(t,"b",(function(){return l}));var a=i(49),n=i.n(a),s=(JSON.parse(localStorage.getItem("userData"))||[]).accessToken,o=n.a.create({baseURL:"https://qa.zammad.rgg.digital.gob.do/api/v1/",headers:{authorization:"Basic ".concat(s)}}),r=n.a.create({baseURL:"https://api.digital.gob.do/v1/territories/"}),c=n.a.create({baseURL:"https://api.digital.gob.do/v2/incidents/"}),l=n.a.create({baseURL:"https://reportero-strapi-api-staging-c3pxhzpxoa-ue.a.run.app/api/"});l.interceptors.request.use((function(e){var t=(JSON.parse(localStorage.getItem("user"))||[]).token,i="";return t&&(i=t),e.headers.Authorization="Bearer ".concat(i),e}),(function(e){return console.log("error ============> ",e)})),l.interceptors.response.use((function(e){return e}),(function(e){var t;console.log("error response ============> ",e),401===(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status)&&(localStorage.clear(),window.location.href="/")}))},256:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var a={auth:{login:"/auth/local"},dashboard:{total:"tickets",open:"tickets?filters[state][$eq]=open",end:"tickets?filters[state][$eq]=closed",notClose:"tickets?filters[state][$ne]=closed",priorityLow:"tickets?filters[priority][$eq]=low",priorityNormal:"tickets?filters[priority][$eq]=normal",priorityHigh:"tickets?filters[priority][$eq]=high",institutionWithTickets:"institutions?populate[tickets][fields]=id",usersActive:"users"},beneficiaries:{beneficiary:function(e){var t=e.valueSearch,i=void 0===t?"":t,a=e.pageNumber;return"beneficiaries?pagination[page]=".concat(void 0===a?1:a,"&pagination[pageSize]=10&filters[cedula][$containsi]=").concat(i)},beneficiaryPost:"beneficiaries",beneficiaryId:function(e){return"beneficiaries/".concat(e)},beneficiaryByCedula:function(e){return"beneficiaries?filters[cedula][$eq]=".concat(e)}},users:{userMe:"users/me?populate[institution][fields]=name&populate[institution][fields]=acronym",user:function(e){var t=e.valueSearch,i=void 0===t?"":t,a=e.valueZone,n=void 0===a?"":a;e.pageNumber;return"users?pagination[page]=1&pagination[pageSize]=10&filters[cedula][$containsi]=".concat(i,"&filters[zone_code][$startsWith]=").concat(n)},userPost:"users",userId:function(e){return"users/".concat(e,"?populate[institution][fields]=name&populate[institution][fields]=acronym")},userImport:"users/import"},tickets:{ticket:function(e){var t=e.valueSearch,i=void 0===t?"":t,a=e.valueZone,n=void 0===a?"":a,s=e.pageNumber;return"tickets".concat(function(e){var t=e.pageNumber;return"?pagination[page]=".concat(t,"&pagination[pageSize]=10&fields[0]=title&fields[1]=address&fields[2]=description&fields[3]=state&fields[4]=priority&fields[5]=createdAt&fields[6]=zone_code&sort[0]=publishedAt:desc&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula&populate[beneficiary][fields][0]=name&populate[beneficiary][fields][1]=cedula&populate[beneficiary][fields][2]=phone&populate[beneficiary][fields][3]=email&populate[institution][fields][0]=acronym&populate[institution][fields][1]=name&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id")}({pageNumber:void 0===s?1:s}),"&filters[title][$containsi]=").concat(i,"&filters[zone_code][$startsWith]=").concat(n)},ticketPost:"tickets",ticketId:function(e){return"tickets/".concat(e).concat("?fields[0]=title&fields[1]=address&fields[2]=description&fields[3]=state&fields[4]=priority&fields[5]=createdAt&fields[6]=zone_code&sort[0]=publishedAt:desc&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula&populate[beneficiary][fields][0]=name&populate[beneficiary][fields][1]=cedula&populate[beneficiary][fields][2]=phone&populate[beneficiary][fields][3]=email&populate[institution][fields][0]=acronym&populate[institution][fields][1]=name&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id").concat("&populate[comments][populate][0]=attachments&populate[comments][populate][attachments][fields][0]=url&populate[comments][populate][attachments][fields][1]=name&populate[comments][populate][attachments][fields][1]=mime").concat("&populate[comments][populate][owner][fields][1]=firstname&populate[comments][populate][owner][fields][2]=lastname&populate[comments][populate][owner][fields][2]=cedula")},ticketImport:"tickets/import"},institutions:{institution:function(e){var t=e.valueSearch,i=void 0===t?"":t,a=e.pageNumber;return"institutions?pagination[page]=".concat(void 0===a?1:a,"&pagination[pageSize]=10&filters[name][$containsi]=").concat(i)},institutionPost:"institutions",institutionId:function(e){return"institutions/".concat(e,"?populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula")},institutionByIdService:function(e){return"institutions?fields[0]=name&fields[1]=acronym&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id&filters[services][id][$eq]=".concat(e)}},services:{all:"services?pagination[page]=1&pagination[pageSize]=10",serviceId:function(e){return"services/".concat(e,"?fields[0]=name&fields[1]=type&populate[children][fields][0]=name&populate[children][fields][1]=type&populate[parent][fields][0]=name&populate[parent][fields][1]=type&sort[0]=publishedAt:asc")},service:function(e){var t=e.valueSearch,i=e.pageNumber;return"services?pagination[page]=".concat(void 0===i?1:i,"&pagination[pageSize]=10&filters[type][$eq]=service&filters[name][$containsi]=").concat(t)},category:function(e){var t=e.valueSearch,i=e.pageNumber;return"services?pagination[page]=".concat(void 0===i?1:i,"&pagination[pageSize]=10&filters[type][$eq]=category&filters[name][$containsi]=").concat(t)},subCategory:function(e){var t=e.valueSearch,i=e.pageNumber;return"services?pagination[page]=".concat(void 0===i?1:i,"&pagination[pageSize]=10&filters[type][$eq]=subcategory&filters[name][$containsi]=").concat(t)}},comments:{comment:"comments"},uploads:{upload:"upload"}}},260:function(e,t,i){"use strict";i.d(t,"a",(function(){return r})),i.d(t,"b",(function(){return c})),i.d(t,"c",(function(){return l}));var a=i(288),n=i.n(a),s=i(289),o=i.n(s)()(n.a),r=function(e){var t=e.title,i=void 0===t?"":t,a=e.text,n=void 0===a?"":a,s=e.type,r=void 0===s?"error":s;return o.fire({title:i,text:n,icon:r,customClass:{confirmButton:"btn btn-primary"},buttonsStyling:!1})},c=function(){return o.fire({title:"Error",text:"Ocurri\xf3 un error al procesar la solicitud",icon:"error",customClass:{confirmButton:"btn btn-primary"},buttonsStyling:!1})},l=function(){n.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:5e3,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",n.a.stopTimer),e.addEventListener("mouseleave",n.a.resumeTimer)}}).fire({icon:"success",title:"Proceso realizado correctamente"})}},284:function(e,t,i){"use strict";var a=i(4);t.a=function(){return Object(a.jsx)("div",{className:"fallback-spinner",children:Object(a.jsxs)("div",{className:"loading component-loader",children:[Object(a.jsx)("div",{className:"effect-1 effects"}),Object(a.jsx)("div",{className:"effect-2 effects"}),Object(a.jsx)("div",{className:"effect-3 effects"})]})})}},301:function(e,t,i){},308:function(e,t,i){"use strict";i.d(t,"c",(function(){return w})),i.d(t,"d",(function(){return k})),i.d(t,"b",(function(){return S})),i.d(t,"a",(function(){return B}));var a=i(241),n=i(887),s=i(832),o=i(940),r=i(881),c=i(794),l="Admin",u="Presidencial",d="Instituci\xf3n",p="Reportero",f="Ciudadano",m={admin:{name:l,icon:s.a,classText:"text-primary"},presidencial:{name:u,icon:o.a,classText:"text-primary"},institucion:{name:d,icon:r.a,classText:"text-primary"},reportero:{name:p,icon:c.a,classText:"text-warning"},ciudadano:{name:f,icon:n.a,classText:"text-primary"}},v=(i(261),i(806)),g=i(1096),b=i(810),h=i(820),j=i(922),x=i(843),y=i(250),N=i(4),O=function(e){var t,i=["light-success","light-danger","light-warning","light-info","light-primary","light-secondary"][Math.floor(6*Math.random())];return(null===e||void 0===e||null===(t=e.avatar)||void 0===t?void 0:t.length)?Object(N.jsx)(y.a,{className:"mr-1",img:e.avatar,width:"32",height:"32"}):Object(N.jsx)(y.a,{color:i||"primary",className:"mr-1",content:e.firstName?e.firstName:"X",initials:!0})},w=function(e){return e&&Object(N.jsxs)("div",{className:"d-flex justify-content-left align-items-center",children:[O(e),Object(N.jsxs)("div",{className:"d-flex flex-column",children:[Object(N.jsx)(a.b,{to:"#",className:"user-name text-truncate mb-0",children:Object(N.jsxs)("span",{className:"font-weight-bold",children:[e.firstName?"".concat(e.firstName):""," ",e.lastName?"".concat(e.lastName):""]})}),Object(N.jsx)("small",{className:"text-truncate text-muted mb-0",style:{marginTop:"4px"},children:e.cedula&&e.cedula})]})]})},k=function(e){return e&&Object(N.jsx)("div",{className:"d-flex justify-content-left align-items-center",children:Object(N.jsxs)("div",{className:"d-flex flex-column",children:[Object(N.jsx)(a.b,{to:"#",className:"user-name text-truncate mb-0",children:Object(N.jsx)("span",{className:"font-weight-bold",children:e.acronym?e.acronym:"No definido"})}),Object(N.jsx)("small",{className:"text-muted mb-0",style:{marginTop:"4px"},children:e.name?e.name:"No definido"})]})})},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return Object(N.jsxs)(v.a,{children:[Object(N.jsx)(g.a,{tag:"div",className:"btn btn-sm",children:Object(N.jsx)(j.a,{size:14,className:"cursor-pointer"})}),Object(N.jsx)(b.a,{right:!0,children:Object(N.jsxs)(h.a,{tag:a.b,to:"".concat(null===t||void 0===t?void 0:t.edit,"/").concat(e),className:"w-100",children:[Object(N.jsx)(x.a,{size:14,className:"mr-50"}),Object(N.jsx)("span",{className:"align-middle",children:"Editar"})]})})]})},B=function(e){var t=m[e]?m[e].icon:n.a;return Object(N.jsxs)("span",{className:"text-truncate text-capitalize align-middle",children:[Object(N.jsx)(t,{size:18,className:"".concat(m[e]&&m[e].classText," mr-50")}),e||"No Definido"]})}},525:function(e,t,i){"use strict";var a=i(8),n=i(1),s=i(311),o=i(393),r=i.n(o),c=i(246),l=i(247),u=i(274),d=i(823),p=i(248),f=i(253),m=i(243),v=(i(303),i(937),i(893),i(254),i(1096),i(810),i(820),i(252),i(4)),g=i(678),b=i(261),h=(i(553),i(301),function(e){var t=e.setValueSearch,i=(e.dataTable,e.showButtonAddUser),a=e.showButtonAddInstitution,n=e.showButtonAddReport,o=e.showButton,r=e.labelButton,p=e.urlButton,f=Object(s.g)();return Object(v.jsx)("div",{className:"invoice-list-table-header w-100 py-2",children:Object(v.jsxs)(c.a,{children:[Object(v.jsx)(l.a,{lg:"6",className:"d-flex align-items-center px-0 px-lg-1"}),Object(v.jsxs)(l.a,{lg:"6",className:"actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0",children:[Object(v.jsxs)("div",{className:"d-flex align-items-center",children:[Object(v.jsx)(u.a,{for:"search-invoice",children:"Buscar"}),Object(v.jsx)(d.a,{id:"search-invoice",className:"ml-50 mr-2 w-100",type:"text",onChange:function(e){return t(e.target.value)},placeholder:"Escribe..."})]}),i&&Object(v.jsx)(g.a,{label:"A\xf1adir Nuevo Usuario",onClick:function(){return f.push(b.a.userCreate)}}),a&&Object(v.jsx)(g.a,{label:"A\xf1adir Nueva Instituci\xf3n",onClick:function(){return f.push(b.a.institutionCreate)}}),n&&Object(v.jsx)(g.a,{label:"A\xf1adir Nuevo Ticket",onClick:function(){return f.push(b.a.dashboardInboxCreate)}}),o&&Object(v.jsx)(g.a,{label:r,onClick:function(){return f.push(p)}})]})]})})});t.a=function(e){var t,i,s=e.columnsTable,o=e.dataTable,c=e.setValueSearch,l=e.setPageNumber,u=e.showButtonAddUser,d=void 0!==u&&u,g=e.showButtonAddInstitution,b=void 0!==g&&g,j=e.showButtonAddReport,x=void 0!==j&&j,y=e.showButton,N=void 0!==y&&y,O=e.labelButton,w=void 0===O?"":O,k=e.urlButton,S=void 0===k?"":k,B=e.dataTableTitle,T=void 0===B?"":B,C=e.loadingTable,z=void 0===C||C;console.log("dataTable",o);var P=Object(n.useState)(0),A=Object(a.a)(P,2),$=A[0];A[1];console.log($);return Object(v.jsx)("div",{className:"invoice-list-wrapper",children:Object(v.jsxs)(p.a,{children:[T&&Object(v.jsx)(f.a,{children:Object(v.jsx)(m.a,{tag:"h4",children:T})}),Object(v.jsx)("div",{className:"invoice-list-dataTable",children:Object(v.jsx)(r.a,{noHeader:!0,pagination:!0,subHeader:!0,columns:s,responsive:!0,className:"react-dataTable",paginationServer:!!(null===o||void 0===o?void 0:o.data),paginationComponentOptions:{rowsPerPageText:"Filas por p\xe1gina",rangeSeparatorText:"de"},paginationRowsPerPageOptions:[10],paginationPerPage:10,data:(null===o||void 0===o?void 0:o.data)?null===o||void 0===o?void 0:o.data:o,noDataComponent:"No hay registros para mostrar",progressPending:z,onChangeRowsPerPage:function(e,t){console.log("newPerPage",e),console.log("page",t)},paginationTotalRows:null===o||void 0===o||null===(t=o.meta)||void 0===t||null===(i=t.pagination)||void 0===i?void 0:i.total,onChangePage:function(e){var t,i;console.log("handlePageChange ",e),(null===o||void 0===o||null===(t=o.meta)||void 0===t||null===(i=t.pagination)||void 0===i?void 0:i.total)&&l(e)},progressComponent:"Cargando...",subHeaderComponent:Object(v.jsx)(h,{dataTable:o,setValueSearch:c,showButtonAddUser:d,showButtonAddInstitution:b,showButtonAddReport:x,showButton:N,labelButton:w,urlButton:S})})})]})})}},553:function(e,t,i){},678:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var a=i(234),n=i(4),s=function(e){var t=e.color,i=void 0===t?"primary":t,s=e.onClick,o=e.label,r=e.outline,c=void 0!==r&&r;return Object(n.jsx)(a.a.Ripple,{color:i,onClick:s,outline:c,children:o})}}}]);
//# sourceMappingURL=8.4b95fc75.chunk.js.map