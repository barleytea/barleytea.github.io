"use strict";(self.webpackChunkbarleytea_github_io=self.webpackChunkbarleytea_github_io||[]).push([[279],{1081:function(e,t,r){r.r(t),r.d(t,{default:function(){return s}});var a=r(7294),l=r(6193),n=r(4160),o=r(8032);const c=e=>{let{node:t}=e;if(!(t.frontmatter&&t.frontmatter.title&&t.frontmatter.path&&t.frontmatter.created&&t.frontmatter.eyecatcher))throw new Error("Invalid node");const r=(0,o.c)(t.frontmatter.eyecatcher.childImageSharp);if(!r)throw new Error("No image");return a.createElement(n.Link,{to:`${t.frontmatter.path}`,className:"text-[color:var(--text-color)]"},a.createElement(o.G,{image:r,alt:"thumbnail"}),a.createElement("div",{className:"flex flex-col justify-between"},a.createElement("div",{className:"break-all p-2"},a.createElement("div",{className:"font-semibold"},t.frontmatter.title),a.createElement("div",{className:"text-sm font-light italic"},t.frontmatter.created))))},m=e=>{let{nodes:t}=e;return a.createElement("ul",{className:"grid list-none grid-cols-3 gap-1 pl-0"},t.map((e=>a.createElement("li",{key:e.id,className:"rounded border border-gray-500"},a.createElement(c,{node:e})))))},i=e=>{let{currentPage:t,totalPages:r}=e;return a.createElement("ul",{className:"flex list-none pl-0 text-[color:var(--text-color)]"},new Array(r).fill(0).map(((e,r)=>a.createElement(n.Link,{to:0===r?"/":`/posts/${r+1}`,key:r},a.createElement("li",{className:r+1===t?"border-grey-500 flex h-12 w-12 items-center justify-center border bg-[color:var(--primary-color)] align-middle":"border-grey-500 flex h-12 w-12 items-center justify-center border align-middle hover:bg-[color:var(--primary-color)]"},r+1)))))};var s=e=>{let{data:t,pageContext:r}=e;return a.createElement(l.A,null,a.createElement(m,{nodes:t.allMarkdownRemark.nodes}),a.createElement("div",{className:"my-12 flex justify-center"},a.createElement(i,{totalPages:r.totalPages,currentPage:r.currentPage})))}}}]);
//# sourceMappingURL=component---src-templates-root-tsx-a74a86671bbe6e5496ba.js.map