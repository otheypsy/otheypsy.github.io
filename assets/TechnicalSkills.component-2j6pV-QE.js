import{j as s,u as i,L as t}from"./index-CrPpEVpL.js";const o="_logo_qg4yd_1",m="_roles_qg4yd_5",x="_dates_qg4yd_9",c={logo:o,roles:m,dates:x},j=c.logo+" img-fluid me-3",r=a=>s.jsxs("div",{className:"p-4",children:[s.jsxs("h4",{children:[a.imgUrl&&s.jsx("img",{alt:"",className:j,src:a.imgUrl}),a.name]}),s.jsx("div",{className:c.roles+" my-4 mx-2 ms-4",children:a.roles.map((e,l)=>s.jsx("div",{children:s.jsxs("div",{className:"px-4 py-2",children:[s.jsx("div",{className:c.tag}),s.jsx("label",{className:"lead",children:e.title}),s.jsx("br",{}),s.jsxs("i",{className:c.dates,children:[e.start," to ",e.end]})]})},l))})]}),f=()=>{const{data:a,isLoading:e}=i("/data/experience.data.json");return e?null:s.jsx("div",{className:"row",children:a.map((l,n)=>s.jsx("div",{className:"col-lg-12 col-xl-6 col-xxl-4",children:s.jsx(r,{name:l.name,roles:l.roles,imgUrl:l.imgUrl},n)},n))})},p=()=>{const{data:a,isLoading:e}=i("/data/education.data.json");return e?s.jsx(t,{}):s.jsx("div",{className:"row",children:a.map((l,n)=>s.jsx("div",{className:"col-lg-12 col-xl-6 col-xxl-4",children:s.jsx(r,{name:l.name,roles:l.roles,imgUrl:l.imgUrl},n)},n))})},g="_icon_1edht_1",h="_badge_1edht_5",d={icon:g,badge:h,"label-container":"_label-container_1edht_10"},N=d.icon+" p-5 fa-brands fa-xl",u=a=>s.jsx("h2",{className:"d-inline",children:s.jsx("i",{className:N+" fa-"+a.icon})}),_=a=>s.jsx("div",{className:"badge mx-4 my-2 px-4 py-2 "+d.badge,children:s.jsx("span",{className:"lead",children:a.label})}),b=a=>s.jsx("div",{className:"p-5",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-md-12 col-xl-3 col-xxl-2",children:s.jsx("div",{className:"d-flex align-items-center justify-content-center "+d["label-container"],children:s.jsx("h4",{children:a.label})})}),s.jsx("div",{className:"col-md-12 col-xl-9 col-xxl-10",children:a.skills.map(e=>a.type==="icons"?s.jsx(u,{icon:e},e):s.jsx(_,{label:e},e))})]})}),U=()=>{const{data:a,isLoading:e}=i("/data/techSkills.data.json");return e?s.jsx(t,{}):a.map(l=>s.jsx(b,{type:l.type,label:l.name,skills:l.skills},l.name))};export{f as B,p as E,U as T};
