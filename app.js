
/* global herbData */
let currentFilter = '', showFavoritesOnly = false, currentSort='alphabetical';
function getFavorites(){return JSON.parse(localStorage.getItem('favorites')||'[]');}
function saveFavorites(f){localStorage.setItem('favorites',JSON.stringify(f));}
function createHerbCard(h){const sec=document.createElement('section');sec.className='herb-card';
sec.innerHTML=`<h2>${h.Herb}<button class="favorite-btn ${getFavorites().includes(h.Herb)?'active':''}">★</button></h2>
<p><strong>Category:</strong> ${h.Category}</p>
<p><strong>Effects:</strong> ${h.Effects}</p>
<details><summary>Mechanism</summary><p>${h["Mechanism of Action"]||'N/A'}</p></details>
<details><summary>Pharmacokinetics</summary><p>${h.Pharmacokinetics||'N/A'}</p></details>
<details><summary>Therapeutic</summary><p>${h["Therapeutic Uses"]||'N/A'}</p></details>
<details><summary>Side Effects</summary><p>${h["Side Effects"]||'N/A'}</p></details>
<details><summary>Contraindications</summary><p>${h.Contraindications||'N/A'}</p></details>
<details><summary>Interactions</summary><p>${h["Drug Interactions"]||'N/A'}</p></details>
<details><summary>Toxicity</summary><p>${h.Toxicity||'N/A'}</p></details>`;
const btn=sec.querySelector('.favorite-btn');btn.addEventListener('click',e=>{e.stopPropagation();let f=getFavorites();if(f.includes(h.Herb)){f=f.filter(x=>x!==h.Herb);btn.classList.remove('active')}else{f.push(h.Herb);btn.classList.add('active')}saveFavorites(f);});
const hdr=sec.querySelector('h2');hdr.style.cursor='pointer';hdr.addEventListener('click',()=>{const ds=sec.querySelectorAll('details');const any=Array.from(ds).some(d=>!d.open);ds.forEach(d=>d.open=any);});
return sec;}
function renderHerbs(){const c=document.getElementById('herb-list');c.innerHTML='';let lst=herbData.filter(h=>{const hay=(h.Herb+h.Effects+h.Category).toLowerCase();return(!currentFilter||hay.includes(currentFilter.toLowerCase()))&&( !showFavoritesOnly||getFavorites().includes(h.Herb));});
if(currentSort==='alphabetical')lst.sort((a,b)=>a.Herb.localeCompare(b.Herb));else{const order=['Mild','Moderate','High'];lst.sort((a,b)=>order.indexOf(a.Intensity)-order.indexOf(b.Intensity));}
lst.forEach(h=>c.appendChild(createHerbCard(h));}
document.addEventListener('DOMContentLoaded',()=>{renderHerbs();
document.getElementById('favoritesToggle').addEventListener('click',()=>{showFavoritesOnly=!showFavoritesOnly;renderHerbs();});
document.getElementById('searchInput')?.addEventListener('input',e=>{currentFilter=e.target.value;renderHerbs();});
document.getElementById('sortSelect')?.addEventListener('change',e=>{currentSort=e.target.value;renderHerbs();});
document.getElementById('darkModeToggle')?.addEventListener('click',()=>document.body.classList.toggle('dark-mode'));
document.getElementById('randomHerb')?.addEventListener('click',()=>{const pick=herbData[Math.floor(Math.random()*herbData.length)].Herb;currentFilter=pick;document.getElementById('searchInput').value=pick;renderHerbs();});
});
