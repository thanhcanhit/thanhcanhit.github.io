import{a as l,aZ as m,a_ as d,r as c,j as s}from"./index-973ef9b2.js";import{T as x}from"./index-f7955a36.js";import{s as h}from"./postRequest-3a86598c.js";import{P as g,S as p}from"./index-207052ec.js";import{E as u}from"./tagRequest-2c59bce1.js";import"./index-a599768c.js";const f="/assets/searching-523e61b7.svg",E=()=>{const t=l(m),a=l(d),[e,i]=c.useState();c.useEffect(()=>{(async()=>{const n=await h(t,a);i(n.data)})()},[t,a]);const o=e==null?void 0:e.map(r=>s.jsx(g,{post:r},r._id));return c.useEffect(()=>{window.scrollTo(0,0)},[]),s.jsxs("div",{className:"container",children:[s.jsxs("div",{className:"flex flex-col items-center justify-center gap-4 pt-4 md:gap-20 md:flex-row",children:[s.jsx("img",{loading:"lazy",src:f,alt:"search illustrator",className:"w-[200px] md:w-[250px]"}),s.jsxs("div",{className:"text-xl font-semibold md:text-3xl text-normal",children:[s.jsxs("h1",{children:["Có ",e==null?void 0:e.length," kết quả tìm kiếm cho:"]}),s.jsxs("span",{className:"block my-2 text-xl",children:["Tiêu đề: ",t||"Bất kỳ"]}),s.jsxs("div",{className:"flex gap-2",children:[s.jsx("span",{className:"text-xl",children:"Chủ đề:"}),s.jsx(x,{tags:a})]})]})]}),s.jsx(p,{open:!0}),e&&(e==null?void 0:e.length)>0?s.jsx("div",{className:"container grid grid-cols-2 gap-3 py-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3 scroll-mt-2",children:o}):s.jsx("div",{className:"flex justify-center mt-8",children:s.jsx(u,{className:"p-4 mx-auto bg-white rounded-md",description:"Không có bài viết nào phù hợp"})})]})};export{E as default};