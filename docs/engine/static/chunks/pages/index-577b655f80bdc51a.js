(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(5995)}])},5995:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return y}});var i=t(5893),s=t(214),r=t.n(s),a=t(7294),o=t(7568),c=t(7582),l=t(8967),u=function(n){var e=(0,a.useState)(!1),t=e[0],i=e[1],s=(0,a.useState)(!1),r=s[0],u=s[1],d=(0,a.useState)(!1),h=d[0],f=d[1],m=(0,a.useState)(!1),x=m[0],j=m[1],g=(0,a.useState)(!1),v=g[0],p=g[1],w=function(){var e=(0,o.Z)((function(){return(0,c.__generator)(this,(function(e){switch(e.label){case 0:return r&&"".concat(h)=="".concat(n)?(r.eth.getAccounts().then((function(n){j(n[0]||!1)})).catch((function(n){console.log(">>> initOnWeb3Ready",n)})),[3,3]):[3,1];case 1:return[4,(0,l.IC)()];case 2:e.sent()?b():j(!1),e.label=3;case 3:return[2]}}))}));return function(){return e.apply(this,arguments)}}();(0,a.useEffect)((function(){w()}),[r]);var N=function(){var n=(0,o.Z)((function(){return(0,c.__generator)(this,(function(n){return w(),[2]}))}));return function(){return n.apply(this,arguments)}}();(0,a.useEffect)((function(){(0,l.Wk)(N),(0,l.uK)((function(n){w()}))}),[]);var b=function(){var e=(0,o.Z)((function(){return(0,c.__generator)(this,(function(e){return(0,l.pE)({onBeforeConnect:function(){i(!0)},onSetActiveChain:f,onConnected:function(){var e=(0,o.Z)((function(e,t){return(0,c.__generator)(this,(function(s){switch(s.label){case 0:return i(!1),u("".concat(e)=="".concat(n)&&t),t?[3,2]:[4,(0,l.cg)()];case 1:j.apply(void 0,[s.sent()]),s.label=2;case 2:return[2]}}))}));return function(n,t){return e.apply(this,arguments)}}(),onError:function(n){i(!1)}}),[2]}))}));return function(){return e.apply(this,arguments)}}();return{isWalletConnecting:t,isConnected:function(){return!1!==x},isSwitchChain:v,address:x,activeChainId:h,activeWeb3:r,connectWeb3:b,switchChainId:function(e){p(!0),(0,l.M5)(e||n).then((function(n){p(!1)}))}}},d=t(7326),h=t(4360),f=t(797),m=t(794),x=function(){var n=(0,o.Z)((function(n,e,t,i,s){var r,a,o,l;return(0,c.__generator)(this,(function(c){switch(c.label){case 0:return a={from:n,gas:"0"},s&&(a.value=new m.O(s)),[4,(r=e.methods)[t].apply(r,(0,f.Z)(i)).estimateGas(a)];case 1:return o=c.sent(),l=new m.O(new m.O(o).multipliedBy(1.15).toFixed(0)).toString(16),a.gas="0x"+l,[2,a]}}))}));return function(e,t,i,s,r){return n.apply(this,arguments)}}(),j=function(n){return new Promise((function(e,t){var i=n.activeWeb3,s=n.contract,r=n.method,a=n.args,l=n.weiAmount,u=n.onTrx||function(){},d=n.onSuccess||function(){},h=n.onError||function(){},m=n.onFinally||function(){};i.eth.getAccounts().then(function(){var n=(0,o.Z)((function(n){var o,j,g,v,p;return(0,c.__generator)(this,(function(c){switch(c.label){case 0:return n.length>0?(j=n[0],console.log(">> amount",l),[4,x(j,s,r,a||[],l)]):[3,3];case 1:return g=c.sent(),[4,i.eth.getGasPrice()];case 2:return v=c.sent(),g.gasPrice=v,console.log(">> amount 2",l,g),(o=s.methods)[r].apply(o,(0,f.Z)(a||[])).send(g).on("transactionHash",(function(n){console.log("transaction hash:",n),p=n,u(n)})).on("error",(function(n){console.log("transaction error:",n),h(n),t(n)})).on("receipt",(function(n){console.log("transaction receipt:",n),d(n)})).then((function(n){e(n),m(n)})).catch((function(n){if(n.message.includes("not mined within 50 blocks"))var s=setInterval((function(){i.eth.getTransactionReceipt(p).then((function(n){null!=n&&n.blockNumber>0&&(clearInterval(s),e(n),d(n))}))}),1e3);else h(n),t(n)})),[3,4];case 3:t("NO_ACTIVE_ACCOUNT"),c.label=4;case 4:return[2]}}))}));return function(e){return n.apply(this,arguments)}}()).catch((function(n){console.log(">>> callContractMethod",n),t(n)}))}))},g=t(3852),v=(t(5888),t(1987)),p=t.n(v),w=/^0x[A-Fa-f0-9]{40}$/,N=function(n){return"string"===typeof n&&w.test(n)},b=t(4262),C={owner:"Migrate ownership"},y=(function(){var n=Object.keys(b.w5).map((function(n){return{id:b.w5[n].networkVersion,title:b.w5[n].chainName}}));n.unshift({id:0,title:"Select Blockchain"})}(),function(n){var e=(0,d.n)(),t=e.storageChainId,s=e.storageAddress,o=n.openConfirmWindow,c=n.addNotify,l=u(t),f=l.isWalletConnecting,m=l.isConnected,x=(l.isSwitchChain,l.address),v=l.activeChainId,w=l.activeWeb3,y=l.connectWeb3,_=(l.switchChainId,(0,a.useState)(!1)),S=_[0],k=_[1];(0,a.useEffect)((function(){if(w&&t&&s){var n=new w.eth.Contract(h.Mt,s);k(n)}}),[w,t,s]);var F=(0,a.useState)("owner"),I=F[0],E=F[1],O=function(n){var e=p().parse(n);return e.hostname||e.pathname},T=(0,a.useState)(""),W=T[0],B=T[1],M=(0,a.useState)(""),A=M[0],R=M[1],Z=(0,a.useState)(""),D=Z[0],P=Z[1],J=(0,a.useState)(!1),U=J[0],G=J[1],K=(0,a.useState)(!1),V=K[0],X=K[1],Y=(0,a.useState)(!1),H=Y[0],L=Y[1],$=function(){X(!1),G(!0);var n=O(W);S.methods.getData(n).call().then((function(n){console.log(">>> JSON",n),R(n.owner);try{var e=JSON.parse(n.info);console.log(">>> JSON",e),L(e)}catch(t){L({})}X(!0),G(!1)})).catch((function(n){G(!1),c("Fail fetch domain info. ".concat(n.message),"error")}))},q=(0,a.useState)(!1),z=q[0],Q=q[1],nn=function(){B(""),R(""),X(""),L("")};return(0,i.jsxs)("div",{className:r().container,children:[(0,i.jsx)("h1",{className:r().h1,children:"Onout migrate tools"}),m()?(0,i.jsxs)(i.Fragment,{children:[function(){var n=(0,b.T_)(v),e=(0,b.T_)(t);return(0,i.jsxs)("div",{className:r().adminActiveChainInfo,children:[(0,i.jsxs)("span",{children:["Current active network is ",(0,i.jsxs)("b",{children:[(null===n||void 0===n?void 0:n.chainName)||"Unknown"," (",v,")"]})]}),(0,i.jsxs)("span",{children:["Main config storage network is ",(0,i.jsxs)("b",{children:[(null===e||void 0===e?void 0:e.chainName)||"Unknown"," (",t,")"]})]})]})}(),(0,i.jsx)("div",{className:r().adminForm,children:(0,i.jsxs)("div",{className:r().adminInfo,children:[(0,i.jsx)("span",{children:"Connected wallet"}),(0,i.jsx)("span",{children:(0,i.jsx)("strong",{children:x})})]})}),(0,i.jsx)("ul",{className:r().settingsTabsNav,children:Object.keys(C).map((function(n){return(0,i.jsx)("li",{onClick:function(){E(n)},className:n===I?r().activeTab:"",children:C[n]},n)}))}),(0,i.jsx)("hr",{className:"".concat(r().divider," ").concat(r().spacerTop)}),"domain"==I&&(0,i.jsx)(i.Fragment,{children:"Domain"}),"owner"==I&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:r().adminForm,children:(0,i.jsxs)("div",{className:r().subFormInfo,children:[(0,i.jsx)("h3",{children:"Migrate ownership of domain"}),!V&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:r().infoRow,children:[(0,i.jsx)("label",{children:"Domain:"}),(0,i.jsx)("div",{children:(0,i.jsx)("input",{type:"text",value:W,onChange:function(n){B(n.target.value)}})})]}),(0,i.jsx)("div",{className:r().actionsRow,children:(0,i.jsx)("button",{disabled:U,onClick:$,className:r().adminButton,children:U?"Fetching domain info...":"Fetch domain info"})})]}),V&&(0,i.jsx)(i.Fragment,{children:A==b.r_?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("hr",{}),(0,i.jsx)("div",{className:r().adminInfo,children:(0,i.jsx)("span",{children:(0,i.jsx)("strong",{children:O(W)})})}),(0,i.jsx)("div",{className:r().adminInfoError,children:(0,i.jsx)("span",{children:"This domain is not configured. Migration not aviable"})}),(0,i.jsx)("hr",{}),(0,i.jsx)("div",{className:r().actionsRow,children:(0,i.jsx)("button",{className:r().adminButton,onClick:nn,children:"Try other domain"})})]}):(0,i.jsx)(i.Fragment,{children:A!==x?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("hr",{}),(0,i.jsx)("div",{className:r().adminInfo,children:(0,i.jsx)("span",{children:(0,i.jsx)("strong",{children:O(W)})})}),(0,i.jsxs)("div",{className:r().adminInfoError,children:[(0,i.jsxs)("span",{children:["You are not ownership of ",O(W)]}),(0,i.jsxs)("span",{children:["This domain ownership is: ",A]})]}),(0,i.jsx)("hr",{}),(0,i.jsx)("div",{className:r().actionsRow,children:(0,i.jsx)("button",{className:r().adminButton,onClick:nn,children:"Try other domain"})})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("hr",{}),(0,i.jsx)("div",{className:r().adminInfo,children:(0,i.jsx)("span",{children:(0,i.jsx)("strong",{children:O(W)})})}),(0,i.jsxs)("div",{className:r().adminInfoError,children:[(0,i.jsxs)("span",{children:["Migrate owner ship for ",O(W)]}),(0,i.jsx)("span",{children:"Be carefull"}),(0,i.jsx)("span",{children:"if you specify a wallet that you do not have access to, you will lose access to the domain"}),(0,i.jsx)("span",{children:"Migration is available ONLY for the domain owner"}),(0,i.jsx)("span",{children:"If you lose access to your wallet, we will not be able to help you!"})]}),(0,i.jsx)("hr",{}),(0,i.jsxs)("div",{className:r().infoRow,children:[(0,i.jsx)("label",{children:"New ownership:"}),(0,i.jsx)("div",{children:(0,i.jsx)("input",{type:"text",value:D,onChange:function(n){P(n.target.value)}})})]}),(0,i.jsxs)("div",{className:r().actionsRow,children:[(0,i.jsx)("button",{className:r().adminButton,onClick:function(){N(D)?o({title:"Migrate ownership",message:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{children:["Do you realy want migrate owner for domain",(0,i.jsx)("br",{}),(0,i.jsx)("strong",{children:O(W)}),(0,i.jsx)("br",{})," from ",(0,i.jsx)("br",{}),(0,i.jsx)("strong",{children:A}),(0,i.jsx)("br",{})," to ",(0,i.jsx)("br",{}),(0,i.jsx)("strong",{children:D}),(0,i.jsx)("br",{}),"???"]}),(0,i.jsx)("div",{})]}),onConfirm:function(){Q(!0),j({activeWeb3:w,contract:S,method:"setKeyData",args:[O(W),{owner:D,info:JSON.stringify(H)}],onTrx:function(n){c("txId ".concat(n),"success")},onSuccess:function(){c("Ownership migrated","success"),Q(!1),$()},onError:function(n){c("Fail migrate ownership ".concat(n.message),"error"),Q(!1)}})}}):o({title:"Error",message:"Specifiy correct address of new ownership",isOk:!0,onConfirm:function(){}})},disabled:z,children:"Migrate ownership"}),(0,i.jsx)("button",{className:r().adminButton,onClick:nn,disabled:z,children:"Cancel"})]}),(0,i.jsx)("div",{className:r().adminInfoWarning,children:(0,i.jsx)("span",{children:"Current domain settings"})}),(0,i.jsx)("hr",{}),(0,i.jsx)("div",{children:(0,i.jsx)(g.gc,{data:H,shouldExpandNode:g.il,style:g._l})}),(0,i.jsx)("hr",{})]})})})]})})})]}):(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("button",{disabled:f,className:"".concat(r().mainButton," primaryButton"),onClick:y,children:f?"Connecting":"Connect Wallet"})})]})})}},function(n){n.O(0,[789,774,888,179],(function(){return e=8312,n(n.s=e);var e}));var e=n.O();_N_E=e}]);