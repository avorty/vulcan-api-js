"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8103],{7661:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>r,metadata:()=>a,toc:()=>u});var s=t(5893),o=t(1151);const r={sidebar_position:5},i="Usage",a={id:"getting-started/usage",title:"Usage",description:"First, you need to create a keystore, this is where your certificate is stored.",source:"@site/docs/getting-started/usage.md",sourceDirName:"getting-started",slug:"/getting-started/usage",permalink:"/vulcan-api-js/docs/getting-started/usage",draft:!1,unlisted:!1,editUrl:"https://github.com/avorty/vulcan-api-js/tree/main/docs/docs/getting-started/usage.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/vulcan-api-js/docs/getting-started/installation"},next:{title:"Methods",permalink:"/vulcan-api-js/docs/category/methods"}},c={},u=[];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(n.p,{children:"First, you need to create a keystore, this is where your certificate is stored."}),"\n",(0,s.jsx)(n.p,{children:"You will have to save it somewhere as that's what gets registered in Vulcan."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const {Keystore} = require('vulcan-api-js');\nconst fs = require('fs');\n\nconst main = async () => {\n    const keystore = new Keystore();\n    await keystore.init();\n    \n    fs.writeFileSync(\"keystore.json\", keystore.dumpToJsonString(), { encoding: 'utf-8' });\n};\n\nmain();\n"})}),"\n",(0,s.jsx)(n.p,{children:"Then you will have to register the account."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const {Keystore, AccountTools, registerAccount} = require('vulcan-api-js');\nconst fs = require('fs');\n\nconst main = async () => {\n    const keystore = new Keystore();\n    keystore.loadFromJsonString(fs.readFileSync(\"keystore.json\", { encoding: 'utf-8' }));\n    \n    const account = await registerAccount(keystore, {TOKEN}, {SYMBOL}, {PIN});\n    fs.writeFileSync(\"account.json\", AccountTools.dumpToJsonString(account), { encoding: 'utf-8' });\n};\n\nmain();\n"})}),"\n",(0,s.jsx)(n.p,{children:"When you have your keystore and account generated, you can load them and use the SDK."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const {Keystore, AccountTools, VulcanHebe} = require('vulcan-api-js');\n\nconst main = async () => {\n    const keystore = new Keystore();\n    keystore.loadFromJsonString(fs.readFileSync(\"keystore.json\", { encoding: 'utf-8' }));\n\n    const client = new VulcanHebe(keystore, AccountTools.loadFromJsonString(fs.readFileSync(\"account.json\", { encoding: 'utf-8' })));\n    \n    // Pick your student (defaults to the first one)\n    await client.selectStudent();\n    \n    // You can use the SDK here\n};\n\nmain();\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsx)(n.p,{children:"All the methods in the Vulcan API JS are async."})})]})}function l(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>i});var s=t(7294);const o={},r=s.createContext(o);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);