(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[37],{1076:function(e,t,n){"use strict";n.r(t);var a=n(165),r=n(166),o=n(168),s=n(167),c=n(169),i=n(1),l=n.n(i),u=n(569),d=n(689),p=n(690),f=n(718),m=n(759),b=n(719),E=(n(590),n(164)),h=n(580),g=n(616),v=n(542),O=n.n(v),y=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(o.a)(this,Object(s.a)(t).call(this,e))).componentWillMount=function(){Object(h.d)(E.a.getAccessToken(),0,1e3).then((function(e){console.log(e.data.list),e.data&&e.data.list&&n.setState({data:e.data.list})})),Object(g.a)(E.a.getAccessToken(),0,1e3).then((function(e){e.data&&e.data.list&&n.setState({ruleVersions:e.data.list})}))},n.renderTable=function(e){return l.a.createElement(u.a,{responsive:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,void 0!==e&&Object.keys(e).length>0?Object.keys(e[0]).map((function(t){return"latestVersion"===t?l.a.createElement(l.a.Fragment,null,l.a.createElement("th",{scope:"row"},"latestVersionId"),Object.keys(e[0][t]).map((function(e){return l.a.createElement("td",{scope:"row"},e)}))):"isChoose"!==t?l.a.createElement("th",{scope:"col"},t):void 0})):l.a.createElement("th",null))),l.a.createElement("tbody",null,void 0!==e?e.map((function(e,t){return l.a.createElement("tr",{key:t},Object.keys(e).length>0?Object.keys(e).map((function(t){return"infoCode"===t?l.a.createElement("td",{scope:"row",width:"20%"},"[",e[t].id,"] ",e[t].message," - ",e[t].description):"latestVersion"===t?l.a.createElement(l.a.Fragment,null,l.a.createElement("td",{scope:"row"},l.a.createElement("i",{className:"fa fa-arrow-right"})),Object.keys(e[t]).map((function(n){return"createAt"===n||"maintenanceStart"===n||"maintenanceEnd"===n?l.a.createElement("td",{scope:"row"},O()(e[t][n]).format("DD-MM-YYYY HH:mm:ss")):l.a.createElement("td",{scope:"row"},e[t][n]?e[t][n].toString():"null")}))):"createAt"===t||"maintenanceStart"===t||"maintenanceEnd"===t?l.a.createElement("td",{scope:"row"},O()(e[t]).format("DD-MM-YYYY HH:mm:ss")):"isChoose"!==t?l.a.createElement("td",{scope:"row"},e[t]):void 0})):l.a.createElement("th",null))})):l.a.createElement("tr",null)))},n.state={data:[],ruleVersions:[]},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.state.data.find((function(t){return t.id.toString()===e.props.match.params.id})),n=this.state.ruleVersions.filter((function(t){return t.ruleId.toString()===e.props.match.params.id}));return l.a.createElement("div",{className:"animated fadeIn"},l.a.createElement(d.a,null,l.a.createElement(p.a,{lg:6},l.a.createElement(f.a,null,l.a.createElement(m.a,null,l.a.createElement("strong",null,l.a.createElement("i",{className:"icon-info pr-1"}),"Rule id: ",this.props.match.params.id)),l.a.createElement(b.a,null,l.a.createElement(u.a,{responsive:!0,striped:!0,hover:!0},l.a.createElement("tbody",null,t?Object.keys(t).map((function(e){return"createAt"===e?l.a.createElement("tr",{key:e},l.a.createElement("td",null,"".concat(e,":")),l.a.createElement("td",null,l.a.createElement("strong",null,O()(t[e]).format("DD-MM-YYYY HH:mm:ss")))):"infoCode"===e?l.a.createElement("tr",{key:e},l.a.createElement("td",null,"".concat(e,":")),l.a.createElement("td",null,l.a.createElement("strong",null,l.a.createElement("span",{style:{color:"red"}},"[",t.infoCode.id,"]")," ",t.infoCode.message," - ",t.infoCode.description))):"actionCode"===e?l.a.createElement("tr",{key:e},l.a.createElement("td",null,"".concat(e,":")),l.a.createElement("td",null,l.a.createElement("strong",null,l.a.createElement("span",{style:{color:"red"}},"[",t.actionCode.id,"]")," ",t.actionCode.message))):"latestVersion"!==e&&"infoCode"!==e?l.a.createElement("tr",{key:e},l.a.createElement("td",null,"".concat(e,":")),l.a.createElement("td",null,l.a.createElement("strong",null,t[e]))):void 0})):l.a.createElement("tr",null)))))),l.a.createElement(p.a,{lg:6},l.a.createElement(f.a,null,l.a.createElement(m.a,null,l.a.createElement("strong",null,l.a.createElement("i",{className:"icon-info pr-1"}),"Latest version")),l.a.createElement(b.a,null,l.a.createElement(u.a,{responsive:!0,striped:!0,hover:!0},l.a.createElement("tbody",null,t?Object.keys(t).map((function(e,n){if("latestVersion"===e)return Object.keys(t[e]).map((function(a){return"createAt"===a||"maintenanceStart"===a||"maintenanceEnd"===a?l.a.createElement("tr",{key:n},l.a.createElement("td",null,"".concat(a,":")),l.a.createElement("td",null,l.a.createElement("strong",null,O()(t[e][a]).format("DD-MM-YYYY HH:mm:ss")))):l.a.createElement("tr",{key:n},l.a.createElement("td",null,"".concat(a,":")),l.a.createElement("td",null,l.a.createElement("strong",null,t[e][a])))}))})):l.a.createElement("tr",null))))))),l.a.createElement(d.a,null,l.a.createElement(p.a,{lg:12},l.a.createElement(f.a,null,l.a.createElement(m.a,null,l.a.createElement("strong",null,l.a.createElement("i",{className:"icon-info pr-1"}),"All version")),l.a.createElement(b.a,null,this.renderTable(n))))))}}]),t}(i.Component);t.default=y},569:function(e,t,n){"use strict";var a=n(10),r=n(43),o=n(1),s=n.n(o),c=n(4),i=n.n(c),l=n(529),u=n.n(l),d=n(530),p={className:i.a.string,cssModule:i.a.object,size:i.a.string,bordered:i.a.bool,borderless:i.a.bool,striped:i.a.bool,dark:i.a.bool,hover:i.a.bool,responsive:i.a.oneOfType([i.a.bool,i.a.string]),tag:d.t,responsiveTag:d.t,innerRef:i.a.oneOfType([i.a.func,i.a.string,i.a.object])},f=function(e){var t=e.className,n=e.cssModule,o=e.size,c=e.bordered,i=e.borderless,l=e.striped,p=e.dark,f=e.hover,m=e.responsive,b=e.tag,E=e.responsiveTag,h=e.innerRef,g=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),v=Object(d.p)(u()(t,"table",!!o&&"table-"+o,!!c&&"table-bordered",!!i&&"table-borderless",!!l&&"table-striped",!!p&&"table-dark",!!f&&"table-hover"),n),O=s.a.createElement(b,Object(a.a)({},g,{ref:h,className:v}));if(m){var y=Object(d.p)(!0===m?"table-responsive":"table-responsive-"+m,n);return s.a.createElement(E,{className:y},O)}return O};f.propTypes=p,f.defaultProps={tag:"table",responsiveTag:"div"},t.a=f},580:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return p})),n.d(t,"b",(function(){return m})),n.d(t,"d",(function(){return E}));var a=n(532),r=n.n(a),o=n(16),s=n(533),c=(n(164),n(537)),i=n.n(c),l=n(538);function u(e,t){return d.apply(this,arguments)}function d(){return(d=Object(s.a)(r.a.mark((function e(t,n){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),delete(a=JSON.parse(JSON.stringify(t))).latestVersion,e.abrupt("return",Object(l.b)("POST","/api/ruleConfigs",a,n).then((function(e){return console.log(e),e.latestVersion=Object(o.a)({},t.latestVersion,{createAt:(new Date).getTime(),ruleId:e.id,rule:{id:e.id}}),delete e.latestVersion.id,console.log(e),Object(l.b)("POST","api/ruleVersions",e,n).then(function(){var e=Object(s.a)(r.a.mark((function e(a){var o,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(a),console.log(t.ruleConditions),o=0;case 3:if(!(o<t.ruleConditions.length)){e.next=12;break}return delete(s=t.ruleConditions[o]).id,s.conditionTypeId=a.id,e.next=9,Object(l.b)("POST","api/conditionConfigs",s,n);case 9:o++,e.next=3;break;case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e})));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(e,t,n,a){return f.apply(this,arguments)}function f(){return(f=Object(s.a)(r.a.mark((function e(t,n,a,c){var i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),delete(i=JSON.parse(JSON.stringify(n))).latestVersion,e.next=5,Object(l.b)("PUT","/api/ruleConfigs/"+t,i,c).then((function(e){console.log(e);var t=JSON.parse(JSON.stringify(n));return n.latestVersion.id&&n.latestVersion.id.toString().length>10?(delete t.latestVersion.id,t=Object(o.a)({},t,{latestVersion:Object(o.a)({},t.latestVersion,{createAt:(new Date).getTime(),ruleId:e.id,rule:{id:e.id}})}),console.log(t),Object(l.b)("POST","api/ruleVersions",t,c).then(function(){var e=Object(s.a)(r.a.mark((function e(t){var a,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),console.log(n.ruleConditions),a=0;case 3:if(!(a<n.ruleConditions.length)){e.next=13;break}return delete(o=n.ruleConditions[a]).id,o.conditionTypeId=t.id,console.log(o),e.next=10,Object(l.b)("POST","api/conditionConfigs",o,c);case 10:a++,e.next=3;break;case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())):(console.log(n.ruleConditions),console.log(a.ruleConditions),n.ruleConditions.forEach(function(){var e=Object(s.a)(r.a.mark((function e(t){var o,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=!1,a.ruleConditions.forEach(function(){var e=Object(s.a)(r.a.mark((function e(n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id!==n.id){e.next=6;break}if(o=!0,JSON.stringify(t)===JSON.stringify(n)){e.next=6;break}return console.log("edit condition"),e.next=6,Object(l.b)("PUT","api/conditionConfigs/"+t.id,t,c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),o||!(t.id.toString().length>10)){e.next=9;break}return console.log("create condition "),delete(i=t).id,i.conditionTypeId=n.latestVersion.id,e.next=9,Object(l.b)("POST","api/conditionConfigs",i,c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a.ruleConditions.forEach(function(){var e=Object(s.a)(r.a.mark((function e(t){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=!1,n.ruleConditions.forEach(function(){var e=Object(s.a)(r.a.mark((function e(n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.id===n.id&&(a=!0);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a){e.next=6;break}return console.log("delete condition "),e.next=6,Object(l.b)("DELETE","api/conditionConfigs/"+t.id,t,c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())),e}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e,t,n){return b.apply(this,arguments)}function b(){return(b=Object(s.a)(r.a.mark((function e(t,n,a){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,Object(l.b)("DELETE","/api/ruleConfigs/"+t,n,a).then((function(e){return console.log(e),e}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e,t,n){return h.apply(this,arguments)}function h(){return(h=Object(s.a)(r.a.mark((function e(t,n,a){var o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o="/api/ruleConfigs?page="+n+"&size="+a,e.next=3,fetch(o,{method:"GET",headers:{Authorization:"Bearer "+t}}).then((function(e){var t=e;return t.data=[],200!==e.status?(console.log("URL: "+o+" "+e.status+" "+e.statusText),i()("Th\xf4ng b\xe1o",e.status+" "+e.statusText,"error"),t):200===e.status?(console.log("URL: "+o+" 200 OK"),e.json().then((function(e){return t.data=e,t}))):t})).catch((function(){return console.log("Can\u2019t access "+o+" response. Blocked by browser?"),{}}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},590:function(e,t,n){"use strict"},616:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(532),r=n.n(a),o=n(533),s=n(164);n(538);function c(e,t,n){return i.apply(this,arguments)}function i(){return(i=Object(o.a)(r.a.mark((function e(t,n,a){var o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o="/api/ruleVersions?page="+n+"&size="+a,e.next=3,fetch(o,{method:"GET",headers:{Authorization:"Bearer "+t}}).then((function(e){var t=e;return t.data=[],200!==e.status?(console.log("URL: "+o+" "+e.status+" "+e.statusText),s.a.signout((function(){})),t):200===e.status?(console.log("URL: "+o+" 200 OK"),e.json().then((function(e){return t.data=e,t}))):t})).catch((function(){return console.log("Can\u2019t access "+o+" response. Blocked by browser?"),{}}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=37.c476e8a3.chunk.js.map