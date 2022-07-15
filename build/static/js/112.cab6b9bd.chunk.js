(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[112],{1778:function(t,e,n){"use strict";n.r(e);var r=n(8),c=n(1),a=n(69),i=(n(252),n(308)),u=(n(261),[{name:"Nombre",minWidth:"400px",selector:"name",sortable:!0,cell:function(t){var e={id:t.id,firstName:t.attributes.name,lastName:t.attributes.lastname,cedula:t.attributes.cedula};return Object(i.c)(e)}},{name:"Correo",minWidth:"160px",selector:"email",sortable:!0,cell:function(t){return t.attributes.email}},{name:"Tel\xe9fono",minWidth:"160px",selector:"phone",sortable:!0,cell:function(t){return t.attributes.phone}}]),s=n(525),o=(n(275),n(284),n(374),n(397),n(437),n(379),n(304),n(301),n(287),n(260)),f=n(566),p=(n(300),n(4));e.default=function(){var t=Object(a.b)(),e=Object(c.useState)([]),n=Object(r.a)(e,2),i=n[0],d=n[1];console.log(i);var b=Object(c.useState)(!0),l=Object(r.a)(b,2),h=l[0],v=l[1],y=Object(c.useState)(""),g=Object(r.a)(y,2),m=g[0],x=g[1],j=Object(c.useState)(1),k=Object(r.a)(j,2),O=k[0],B=k[1];return Object(c.useEffect)((function(){Object(f.a)({valueSearch:m,pageNumber:O}).then((function(t){return d(t.data)})).catch((function(){return Object(o.b)()})).finally((function(){return v(!1)}))}),[t,m,O]),Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(s.a,{columnsTable:u,setValueSearch:x,setPageNumber:B,dataTable:i,loadingTable:h})})}},249:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r={tickets:"tickets",ticketById:function(t){return"tickets/".concat(t,"?expand=true")},allTickets:"ticket_overviews?view=all",ticketsByDate:"tickets/search?query=created_at:",ticketsByState:"tickets/search?query=state_id:",ticketsByGroup:"tickets/search?query=group_id:",ticketPriorities:"ticket_priorities",ticketStates:"ticket_states",postTags:"tag_list",tagsByName:function(t){return"tag_search?term=".concat(t)},postTicketTags:"tags/add",ticketTags:function(t){return"tags?object=Ticket&o_id=".concat(t)},ticketArticles:"ticket_articles/by_ticket/",postTicketArticles:"ticket_articles",ticketArticlesAttachment:"ticket_attachment/",users:"users",userMe:"users/me?expand=true",userById:function(t){return"users/".concat(t,"?expand=true")},userByCedula:"users/search?query=cedula:",allUsers:"users?expand=true",allRols:"roles",organizations:"organizations",organizationsByAcronym:function(t){return"organizations/search?query=acronimo:".concat(t)},groups:"groups"}},264:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r={regions:"regions",provinces:"provinces",municipalities:"municipalities",regionByIdentifier:function(t){return"regions?identifier=".concat(t)},provinceByIdentifier:function(t){return"provinces?identifier=".concat(t)},municipalityByIdentifier:function(t){return"municipalities?identifier=".concat(t)},districtByIdentifier:function(t){return"districts?identifier=".concat(t)},sectionByIdentifier:function(t){return"sections?identifier=".concat(t)},neighborhoodByIdentifier:function(t){return"neighborhoods?identifier=".concat(t)},subNeighborhoodByIdentifier:function(t){return"sub-neighborhoods?identifier=".concat(t)},provincesByRegion:function(t){return"regions/".concat(t,"/provinces")},municipalitiesByprovincesByRegions:function(t,e){return"regions/".concat(t,"/provinces/").concat(e,"/municipalities")},districtByIdProvinceByIdMunicipality:function(t,e,n){return"regions/".concat(t,"/provinces/").concat(e,"/municipalities/").concat(n,"/districts")},sectionByIdMunicipalityByIdDistrict:function(t,e,n,r){return"regions/".concat(t,"/provinces/").concat(e,"/municipalities/").concat(n,"/districts/").concat(r,"/sections")},neighborhoodByIdDistrictByIdSection:function(t,e,n,r,c){return"regions/".concat(t,"/provinces/").concat(e,"/municipalities/").concat(n,"/districts/").concat(r,"/sections/").concat(c,"/neighborhoods")},subNeighborhoodByIdSectionByIdNeighborhood:function(t,e,n,r,c,a){return"regions/".concat(t,"/provinces/").concat(e,"/municipalities/").concat(n,"/districts/").concat(r,"/sections/").concat(c,"/neighborhoods/").concat(a,"/sub-neighborhoods")}}},275:function(t,e,n){"use strict";var r=n(248),c=n(253),a=n(243),i=n(244),u=n(4);e.a=function(t){var e=t.cardHeaderTitle,n=t.cardHeaderComponent,s=t.children;return Object(u.jsxs)(r.a,{children:[e||n?Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(c.a,{children:[e&&Object(u.jsx)(a.a,{tag:"h4",children:e}),n&&n()]})}):null,Object(u.jsx)(i.a,{children:s})]})}},287:function(t,e,n){"use strict";n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return o})),n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return p}));var r=n(237),c=n.n(r),a=n(238),i=n(236),u=n(249),s=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.d.post(u.a.users,e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.d.put("".concat(u.a.users,"/").concat(e.id),e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=Object(a.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.d.get(u.a.userMe);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),p=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.d.get("".concat(u.a.userByCedula).concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},300:function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return f})),n.d(e,"f",(function(){return p})),n.d(e,"e",(function(){return d})),n.d(e,"d",(function(){return b}));var r=n(237),c=n.n(r),a=n(238),i=n(236),u=n(256),s=function(){var t=Object(a.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.get(u.a.users.userMe);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),o=function(){var t=Object(a.a)(c.a.mark((function t(e){var n,r,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.valueSearch,r=e.valueZone,a=e.pageNumber,t.next=3,i.b.get(u.a.users.user({valueSearch:n,valueZone:r,pageNumber:a}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.get(u.a.users.userId(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=Object(a.a)(c.a.mark((function t(e,n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.put("".concat(u.a.users.userPost,"/").concat(e),n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),d=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.post(u.a.users.userPost,e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.post(u.a.users.userImport,e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},374:function(t,e,n){"use strict";n(236),n(249),n(12)},379:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return u}));var r=n(236),c=n(264),a=n(13),i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return function(n){return t&&e?r.c.get(c.a.municipalitiesByprovincesByRegions(t,e)).then((function(t){n({type:a.a.GET_MUNICIPALITIES_BY_PROVINCES_BY_REGIONS,payload:t.data.data})})):n(u())}},u=function(){return{type:a.a.CLEAN_SELECT_MUNICIPALITIES}}},397:function(t,e,n){"use strict";n(236),n(249),n(12)},437:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(236),c=n(264),a=n(13),i=n(379),u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(e){return t?r.c.get(c.a.provincesByRegion(t)).then((function(t){e({type:a.a.GET_PROVINCES_BY_REGION,payload:t.data.data})})):(e(s()),e(Object(i.a)()))}},s=function(){return{type:a.a.CLEAN_SELECT_PROVINCES}}},566:function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return f})),n.d(e,"b",(function(){return p}));var r=n(237),c=n.n(r),a=n(238),i=n(236),u=n(256),s=function(){var t=Object(a.a)(c.a.mark((function t(e){var n,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.valueSearch,r=e.pageNumber,t.next=3,i.b.get(u.a.beneficiaries.beneficiary({valueSearch:n,pageNumber:r}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.post(u.a.beneficiaries.beneficiaryPost,e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=Object(a.a)(c.a.mark((function t(e,n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.put(u.a.beneficiaries.beneficiaryId(e),n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),p=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.b.get(u.a.beneficiaries.beneficiaryByCedula(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}]);
//# sourceMappingURL=112.cab6b9bd.chunk.js.map