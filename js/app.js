const OWNER="stephenehawkingecechomoravk-lang",REPO="Universal-Order-W3-Official",BRANCH="main";
const githubUrl=`https://github.com/${OWNER}/${REPO}`;
const apiUrl=`https://api.github.com/repos/${OWNER}/${REPO}/readme?ref=${BRANCH}`;
document.querySelector("#githubTop").href=githubUrl;
document.querySelector("#githubButton").href=githubUrl;
function renderMarkdown(md){
 let text=md.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
 text=text.replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>").replace(/^> (.*)$/gm,"<blockquote>$1</blockquote>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1 ↗</a>');
 const lines=text.split("\n");let html="",inList=false;
 for(const line of lines){if(/^[-*] /.test(line)){if(!inList){html+="<ul>";inList=true}html+=`<li>${line.slice(2)}</li>`}else{if(inList){html+="</ul>";inList=false}if(line.trim()&&!/^<h[1-3]>|^<blockquote>/.test(line))html+=`<p>${line}</p>`;else html+=line}}
 if(inList)html+="</ul>";return html;
}
async function loadGitHubReadme(){
 const status=document.querySelector("#status"),content=document.querySelector("#content"),title=document.querySelector("#repoTitle");
 try{const response=await fetch(apiUrl,{headers:{"Accept":"application/vnd.github.raw+json"},cache:"no-store"});if(!response.ok)throw new Error(`GitHub API: ${response.status}`);const readme=await response.text();title.textContent="README.md";content.innerHTML=renderMarkdown(readme);status.textContent="● načteno";status.classList.add("ok")}
 catch(error){status.textContent="Nelze načíst";status.classList.add("error");content.innerHTML=`<h2>Obsah se nepodařilo načíst</h2><p>GitHub je stále dostupný přímo přes tlačítko výše.</p><p><a href="${githubUrl}" target="_blank" rel="noopener">Otevřít Universal-Order-W3-Official na GitHubu ↗</a></p>`;console.error(error)}
}
loadGitHubReadme();