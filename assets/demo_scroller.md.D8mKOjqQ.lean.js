import{g as d}from"./chunks/sentence.8nI1dqcd.js";import{_ as F,p as k,B as p,o as E,b as g,w as e,j as s,t as A,d as y,c,a as C,G as t}from"./chunks/framework.Tst34yPz.js";import"./chunks/commonjsHelpers.Cpj98o6Y.js";const o={class:"list-item"},m={class:"item-title"},x={class:"index"},u={__name:"scroller",setup(D){const l=k(d(100,0)),i=k(document);return(n,a)=>{const B=p("virtual-list");return E(),g(B,{modelValue:l.value,"onUpdate:modelValue":a[0]||(a[0]=h=>l.value=h),"data-key":"id",handle:".handle",scroller:i.value,"chosen-class":"chosen",class:"window-scroll"},{item:e(({record:h,index:r,dateKey:_})=>[s("div",o,[s("div",m,[s("span",x,"#"+A(r),1),a[1]||(a[1]=s("span",{class:"handle"},"☰",-1))]),s("p",null,A(h.desc),1)])]),_:1},8,["modelValue","scroller"])}}},v=F(u,[["__scopeId","data-v-b2342fa8"]]),S=JSON.parse('{"title":"Customize Scroller","description":"","frontmatter":{},"headers":[],"relativePath":"demo/scroller.md","filePath":"demo/scroller.md"}'),f={name:"demo/scroller.md"},V=y({...f,setup(D){return(l,i)=>{const n=p("demo-preview");return E(),c("div",null,[i[0]||(i[0]=s("h1",{id:"customize-scroller",tabindex:"-1"},[C("Customize Scroller "),s("a",{class:"header-anchor",href:"#customize-scroller","aria-label":'Permalink to "Customize Scroller"'},"​")],-1)),i[1]||(i[1]=s("p",null,[C("This Demo uses "),s("code",null,"scroller: document")],-1)),t(n,{title:"",description:"",code:"%3Ctemplate%3E%0A%20%20%3Cvirtual-list%0A%20%20%20%20v-model=%22list%22%0A%20%20%20%20data-key=%22id%22%0A%20%20%20%20handle=%22.handle%22%0A%20%20%20%20:scroller=%22scroller%22%0A%20%20%20%20chosen-class=%22chosen%22%0A%20%20%20%20class=%22window-scroll%22%0A%20%20%3E%0A%20%20%20%20%3Ctemplate%20v-slot:item=%22%7B%20record,%20index,%20dateKey%20%7D%22%3E%0A%20%20%20%20%20%20%3Cdiv%20class=%22list-item%22%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20class=%22item-title%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class=%22index%22%3E#%7B%7B%20index%20%7D%7D%3C/span%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class=%22handle%22%3E%E2%98%B0%3C/span%3E%0A%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%3Cp%3E%7B%7B%20record.desc%20%7D%7D%3C/p%3E%0A%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%3C/template%3E%0A%20%20%3C/virtual-list%3E%0A%3C/template%3E%0A%0A%3Cscript%20setup%3E%0Aimport%20%7B%20ref%20%7D%20from%20'vue';%0Aimport%20%7B%20getPageData%20%7D%20from%20'../public/sentence';%0A%0Aconst%20list%20=%20ref(getPageData(100,%200));%0Aconst%20scroller%20=%20ref(document);%0A%3C/script%3E%0A%0A%3Cstyle%20scoped%3E%0A.list-item%20%7B%0A%20%20position:%20relative;%0A%20%20border-radius:%205px;%0A%20%20box-shadow:%200px%202px%2010px%20-5px%20#57bbb4;%0A%20%20padding:%2016px;%0A%7D%0A%0A.item-title%20%7B%0A%20%20display:%20flex;%0A%20%20justify-content:%20space-between;%0A%7D%0A%0A.index%20%7B%0A%20%20float:%20left;%0A%7D%0A%0A.handle%20%7B%0A%20%20cursor:%20grab;%0A%20%20text-align:%20right;%0A%7D%0A%0A.chosen%20%7B%0A%20%20box-shadow:%200px%200px%200px%202px%20#306aa4;%0A%7D%0A%3C/style%3E%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20vitesse-light%20vitesse-dark%20vp-code%22%20tabindex%3D%220%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Evirtual-list%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20%20%20%20v-model%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Elist%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20%20%20%20data-key%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Eid%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20%20%20%20handle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3E.handle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20%20%20%20%3Ascroller%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Escroller%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20%20%20%20chosen-class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Echosen%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20%20%20%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Ewindow-scroll%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2359873A%3B--shiki-dark%3A%2380A665%22%3E%20v-slot%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2359873A%3B--shiki-dark%3A%2380A665%22%3Eitem%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%7B%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Erecord%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%2C%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Eindex%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%2C%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3EdateKey%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Elist-item%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Eitem-title%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Eindex%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23393A34%3B--shiki-dark%3A%23DBD7CAEE%22%3E%23%7B%7B%20index%20%7D%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Ehandle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23393A34%3B--shiki-dark%3A%23DBD7CAEE%22%3E%E2%98%B0%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Ep%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23393A34%3B--shiki-dark%3A%23DBD7CAEE%22%3E%7B%7B%20record.desc%20%7D%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Ep%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Evirtual-list%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Eimport%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3E%20from%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%20'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3Evue%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Eimport%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20getPageData%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3E%20from%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E%20'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B56959%3B--shiki-dark%3A%23C98A7D%22%3E..%2Fpublic%2Fsentence%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B5695977%3B--shiki-dark%3A%23C98A7D77%22%3E'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20list%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2359873A%3B--shiki-dark%3A%2380A665%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2359873A%3B--shiki-dark%3A%2380A665%22%3EgetPageData%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E100%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E))%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20scroller%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2359873A%3B--shiki-dark%3A%2380A665%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Edocument%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E)%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3E%20scoped%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E.%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Elist-item%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20position%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E%20relative%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20border-radius%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%205%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20box-shadow%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%202%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%2010%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%20-5%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%23%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E57bbb4%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20padding%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%2016%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E.%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Eitem-title%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20display%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E%20flex%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20justify-content%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E%20space-between%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E.%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Eindex%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20float%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E%20left%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E.%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Ehandle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20cursor%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E%20grab%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20text-align%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E%20right%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E.%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23B07D48%3B--shiki-dark%3A%23BD976A%22%3Echosen%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23998418%3B--shiki-dark%3A%23B8A965%22%3E%20%20box-shadow%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F798A%3B--shiki-dark%3A%234C9A91%22%3E%202%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23AB5959%3B--shiki-dark%3A%23CB7676%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%20%23%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A65E2B%3B--shiki-dark%3A%23C99076%22%3E306aa4%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%231E754F%3B--shiki-dark%3A%234D9375%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23999999%3B--shiki-dark%3A%23666666%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"/home/runner/work/vue3-virtual-drag-list/vue3-virtual-drag-list/docs/components/scroller.vue",relativePath:"../components/scroller.vue"},{default:e(()=>[t(v)]),_:1})])}}});export{S as __pageData,V as default};