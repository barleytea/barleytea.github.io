"use strict";(self.webpackChunkbarleytea_github_io=self.webpackChunkbarleytea_github_io||[]).push([[628],{9354:function(e,t,r){r.r(t),r.d(t,{default:function(){return h}});var a=r(7294),l=r(6193);const o=e=>{let{detailPage:t}=e;return a.createElement("div",{className:"text-[color:var(--text-color)]"},a.createElement("article",{dangerouslySetInnerHTML:{__html:t.html||""},className:"markdown"}))};var n=r(8032),c=r(5892);const m=e=>{let{markdownMeta:t}=e;if(!(t&&t.title&&t.created&&t.eyecatcher&&t.tags))throw new Error("Invalid node");const r=(0,n.c)(t.eyecatcher.childImageSharp);if(!r)throw new Error("No image");return a.createElement("div",{className:"markdown"},a.createElement("h1",{className:"break-all"},t.title),a.createElement("p",{className:"text-sm"},t.created),a.createElement(c.P,{tags:t.tags}),a.createElement(n.G,{image:r,alt:"thumbnail"}))};var s=r(4160);const i=e=>{var t,r;let{post:l,direction:o}=e;if(null===(t=l.frontmatter)||void 0===t||!t.path||null===(r=l.frontmatter)||void 0===r||!r.title)throw new Error;return a.createElement(s.Link,{to:l.frontmatter.path,className:"text-[color:var(--text-color)] hover:bg-[color:var(--primary-color)]"},a.createElement("div",{className:"flex"},"left"===o?a.createElement("div",{className:"h-24 w-56 border border-solid p-3 text-[color:var(--text-color)]"},a.createElement("span",{className:"line-clamp-3 whitespace-pre-wrap break-words text-[color:var(--text-color)]"},"<<"," ",l.frontmatter.title)):a.createElement("div",{className:"h-24 w-56 border border-solid p-3 text-[color:var(--text-color)]"},a.createElement("span",{className:"line-clamp-3 whitespace-pre-wrap break-words text-[color:var(--text-color)]"},">>"," ",l.frontmatter.title))))},d=e=>{let{next:t,prev:r}=e;return a.createElement("div",{className:"flex justify-between"},r?a.createElement(i,{post:r,direction:"left"}):a.createElement("div",null),t?a.createElement(i,{post:t,direction:"right"}):a.createElement("div",null))},v=e=>{var t,r,l;let{post:o}=e;if(null===(t=o.frontmatter)||void 0===t||!t.path||null===(r=o.frontmatter)||void 0===r||!r.title||null===(l=o.frontmatter)||void 0===l||!l.eyecatcher)throw new Error("Invalid node");const c=(0,n.c)(o.frontmatter.eyecatcher.childImageSharp);if(!c)throw new Error("No image");return a.createElement("li",{key:o.frontmatter.path,className:"border-b-2 border-solid border-[color:var(--text-color)]"},a.createElement(s.Link,{to:o.frontmatter.path},a.createElement("div",{className:"flex h-full text-[color:var(--text-color)] hover:bg-[color:var(--text-color)] hover:text-[color:var(--base-color)]"},a.createElement(n.G,{image:c,alt:"thumbnail"}),a.createElement("div",{className:"w-full break-all px-2 py-1"},a.createElement("span",null,o.frontmatter.title)))))},E=e=>{let{posts:t}=e;return a.createElement("ul",{className:"rounded border-solid border-[color:var(--text-color)] p-0"},t.map((e=>{var t;return a.createElement(v,{key:null===(t=e.frontmatter)||void 0===t?void 0:t.path,post:e})})))},p=e=>{let{tags:t}=e;return a.createElement("div",null,a.createElement("section",{className:"mb-12"},a.createElement("h2",{className:"mb-4 text-xl text-[color:var(--text-color)]"},"Related Posts"),a.createElement(E,{posts:t})))};var h=e=>{let{data:t,pageContext:r}=e;if(console.log(r),!t.markdownRemark)throw new Error("MarkdownRemark shouled be provided");return a.createElement(l.A,null,a.createElement("div",{className:"grid gap-y-6"},a.createElement(m,{markdownMeta:t.markdownRemark.frontmatter}),a.createElement("div",{className:"grid grid-cols-[70%_30%] gap-x-6"},a.createElement(o,{detailPage:t.markdownRemark}),a.createElement("aside",null,a.createElement(p,{tags:t.tags.nodes})),a.createElement("section",{className:"mt-4"},a.createElement(d,{next:r.next,prev:r.prev})))))}}}]);
//# sourceMappingURL=component---src-templates-detail-tsx-0d2a14d3cf2a9d3a74cb.js.map