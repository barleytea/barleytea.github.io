"use strict";(self.webpackChunkbarleytea_github_io=self.webpackChunkbarleytea_github_io||[]).push([[144],{7592:function(e,t,r){r.r(t),r.d(t,{Head:function(){return f},default:function(){return E}});var a=r(1504),l=r(3488);const o=e=>{let{detailPage:t}=e;return a.createElement("div",{className:"text-[color:var(--text-color)]"},a.createElement("article",{dangerouslySetInnerHTML:{__html:t.html||""},className:"markdown"}))};var n=r(1536),c=r(1488);const m=e=>{let{markdownMeta:t}=e;if(!(t&&t.title&&t.created&&t.eyecatcher&&t.tags))throw new Error("Invalid node");const r=(0,n.c)(t.eyecatcher.childImageSharp);if(!r)throw new Error("No image");return a.createElement("div",{className:"markdown"},a.createElement("h1",{className:"break-all"},t.title),a.createElement("div",{className:"my-2"},a.createElement(c.k,{tags:t.tags})),a.createElement("p",{className:"text-sm"},t.created),a.createElement("div",{className:"mb-3"},a.createElement(n.G,{image:r,alt:"thumbnail"})))};var i=r(2296);const s=e=>{var t,r;let{post:l,direction:o}=e;if(null===(t=l.frontmatter)||void 0===t||!t.path||null===(r=l.frontmatter)||void 0===r||!r.title)throw new Error;return a.createElement(i.Link,{to:l.frontmatter.path,className:"text-[color:var(--text-color)] hover:bg-[color:var(--primary-color)]"},a.createElement("div",{className:"flex"},"left"===o?a.createElement("div",{className:"h-24 w-56 border border-solid p-3 text-[color:var(--text-color)]"},a.createElement("span",{className:"line-clamp-3 whitespace-pre-wrap break-words text-[color:var(--text-color)]"},"<<"," ",l.frontmatter.title)):a.createElement("div",{className:"h-24 w-56 border border-solid p-3 text-[color:var(--text-color)]"},a.createElement("span",{className:"line-clamp-3 whitespace-pre-wrap break-words text-[color:var(--text-color)]"},">>"," ",l.frontmatter.title))))},d=e=>{let{next:t,prev:r}=e;return a.createElement("div",{className:"flex justify-between max-[480px]:flex-col"},r?a.createElement(s,{post:r,direction:"left"}):a.createElement("div",null),t?a.createElement(s,{post:t,direction:"right"}):a.createElement("div",null))},v=e=>{var t,r,l;let{post:o}=e;if(null===(t=o.frontmatter)||void 0===t||!t.path||null===(r=o.frontmatter)||void 0===r||!r.title||null===(l=o.frontmatter)||void 0===l||!l.eyecatcher)throw new Error("Invalid node");const c=(0,n.c)(o.frontmatter.eyecatcher.childImageSharp);if(!c)throw new Error("No image");return a.createElement("li",{key:o.frontmatter.path,className:"border-b-2 border-solid border-[color:var(--text-color)]"},a.createElement(i.Link,{to:o.frontmatter.path},a.createElement("div",{className:"flex h-full text-[color:var(--text-color)] hover:bg-[color:var(--text-color)] hover:text-[color:var(--base-color)]"},a.createElement(n.G,{image:c,alt:"thumbnail",className:"shrink-0"}),a.createElement("div",{className:"w-full px-2 py-1"},a.createElement("span",{className:"break-all"},o.frontmatter.title)))))},h=e=>{let{posts:t}=e;return a.createElement("ul",{className:"rounded border-solid border-[color:var(--text-color)] p-0"},t.map((e=>{var t;return a.createElement(v,{key:null===(t=e.frontmatter)||void 0===t?void 0:t.path,post:e})})))},p=e=>{let{tags:t}=e;return a.createElement("div",null,a.createElement("section",{className:"mb-12"},a.createElement("h2",{className:"mb-4 text-xl text-[color:var(--text-color)]"},"Related Posts"),a.createElement(h,{posts:t})))};var u=r(3308);var E=e=>{let{data:t,pageContext:r}=e;if(console.log(r),!t.markdownRemark)throw new Error("MarkdownRemark shouled be provided");const n=t.tags.nodes,c=n.length>0?"invisible min-[480px]:visible":"invisible";return a.createElement(l._,null,a.createElement("div",null,a.createElement(m,{markdownMeta:t.markdownRemark.frontmatter}),a.createElement("div",{className:"grid min-[480px]:gap-x-6 min-[480px]:grid-cols-[70%_30%] max-[480px]:grid-cols-[100%]"},a.createElement(o,{detailPage:t.markdownRemark}),a.createElement("aside",{className:c},a.createElement(p,{tags:n})),a.createElement("section",{className:"mt-4"},a.createElement(d,{next:r.next,prev:r.prev})))))};const f=e=>{var t,r,l,o,c,m,i;let{data:s}=e;if(null===(t=s.markdownRemark)||void 0===t||null===(r=t.frontmatter)||void 0===r||!r.title||null===(l=s.markdownRemark)||void 0===l||null===(o=l.frontmatter)||void 0===o||!o.created||null===(c=s.markdownRemark)||void 0===c||null===(m=c.frontmatter)||void 0===m||null===(i=m.eyecatcher)||void 0===i||!i.childImageSharp)throw new Error("Insufficient details");const d=(0,n.d)(s.markdownRemark.frontmatter.eyecatcher.childImageSharp);return a.createElement(u.c,{title:s.markdownRemark.frontmatter.title,path:`${s.markdownRemark.frontmatter.path}/`,eyecatcherPath:d})}}}]);
//# sourceMappingURL=component---src-templates-detail-tsx-1857e66fde9caeaea0ec.js.map