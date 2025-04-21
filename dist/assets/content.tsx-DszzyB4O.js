import{f as Z,g as X,s as M,r as J,c as K,i as Q}from"./resize_image-50o9hnDU.js";const ee={Lycee:"Lycée",Francais:"Français"},te=e=>{const r=e.split(" ");let t="";for(let o of r)o=o.charAt(0).toUpperCase()+o.slice(1).toLowerCase(),o=ee[o]||o,t=t+" "+o;return t.trim()};function oe(e,r){const t=document.querySelector(e);t?r(t):new MutationObserver((n,i)=>{const s=document.querySelector(e);s&&(i.disconnect(),r(s))}).observe(document.body,{childList:!0,subtree:!0})}function re(e){const r=/(\d{2})\/(\d{2})\/(\d{4})/g;return e.replace(r,(o,n,i,s)=>{const a=new Date(`${s}-${i}-${n}`);return`${n} ${a.toLocaleString("fr-FR",{month:"short"})} ${s}`})}function V(){const e=`
	@font-face {
			font-family: 'FixelVariable';
			src: url('${chrome.runtime.getURL("/fonts/fixel/FixelVariable.ttf")}') format('truetype');
			font-weight: 100 900;
			font-style: normal;
	}
	@font-face {
			font-family: 'FixelVariable';
			src: url('${chrome.runtime.getURL("/fonts/fixel/FixelVariableItalic.ttf")}') format('truetype');
			font-weight: 100 900;
			font-style: italic;
	}
	`,r=document.createElement("style");r.textContent=e,document.head.appendChild(r),document.body.style.fontFamily="FixelVariable, sans-serif"}/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=(e,r,t=[])=>{const o=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(r).forEach(n=>{o.setAttribute(n,String(r[n]))}),t.length&&t.forEach(n=>{const i=R(...n);o.appendChild(i)}),o};var z=([e,r,t])=>R(e,r,t);/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=["svg",W,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=["svg",W,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];function se(){const e={"Travail à faire pour les prochains jours":"Devoirs","Dernières ressources pédagogiques":"Dernières ressources","Découvrir les actualités et les documents du CDI depuis e-sidoc":"Actualités & Documents du CDI"};document.querySelectorAll(".widget").forEach(o=>{const n=o.querySelector("header > h2 > span");n!=null&&n.textContent&&(n.textContent=e[n.textContent]??n.textContent)}),document.querySelectorAll(".widget .cta-conteneur i").forEach(o=>{o.querySelector("svg")||o.insertAdjacentElement("beforeend",z(ne))});const r=.3,t=.9;document.querySelectorAll(".widget").forEach(o=>{const n=r+Math.random()*(t-r);o.style.animationDuration=`${n}s`}),chrome.storage.sync.get("widgets",o=>{let n=o.widgets;console.log(n),n=Array.from(document.querySelectorAll("section.widget")).map(i=>{var a;if(window.getComputedStyle(i).display==="none")return null;let s=((a=i.querySelector("header h2 span"))==null?void 0:a.textContent)||"";return s=s.trim(),s?{"Informations & Sondages":"Infos","Actualités & Documents du CDI":"CDI","Carnet de correspondance":"Carnet","Dernières ressources pédagogiques":"Ressources","Dernières évaluations":"Evals.","Dernières notes":"Notes"}[s]??s:null}).filter(i=>i!==null),console.log("set storage to "+n),document.querySelectorAll(".liste-imbriquee .sub-liste li").forEach(i=>{const s=i.querySelector(".with-color");if(s){const a=window.getComputedStyle(s).getPropertyValue("--couleur-matiere");i.style.setProperty("--couleur-matiere",a)}}),chrome.storage.sync.get("customHomework",i=>{let s=i.customHomework;G(s)})})}const A=[{selector:".widget.travailafaire .liste-imbriquee ul li > .conteneur-item .titre-matiere",hasColor:!0,id:"devoirs"},{selector:".widget.ressourcepedagogique ul li .wrap h3",hasColor:!0,id:"ressources"},{selector:".widget.notes ul li h3 > span"},{selector:".widget.competences ul li .wrap h3 > span"},{selector:".widget.edt ul.container-cours > li.libelle-cours",hasColor:!0,id:"edt",hasEmoji:!1},{selector:".widget.ds .infos-ds-conteneur > h3",hasEmoji:!1},{selector:".ObjetGrilleCours .cours-simple td :nth-child(2)",hasColor:!0,id:"vie-scolaire-edt",hasEmoji:!1}];function O(e,r=!0){let t=e.innerText;t=t.split(">")[0],chrome.storage.sync.get("subjectData",o=>{const n=o.subjectData[t];if(!n)return;let i=[];if(A.forEach(s=>{s.hasColor&&document.querySelectorAll(s.selector).forEach(l=>{i.push({element:l,selectorId:s.id})})}),i.some(s=>s.element===e)){const s=i.find(l=>l.element===e),a=s==null?void 0:s.selectorId;s&&a==="devoirs"?(e.parentElement.style.removeProperty("--couleur-matiere"),e.parentElement.parentElement.parentElement.parentElement.style.setProperty("--couleur-matiere",n.color)):s&&a==="edt"?e.parentElement.parentElement.querySelector(".trait-matiere").style.backgroundColor=n.color:s&&a==="ressources"&&e.style.setProperty("--color-line",n.color)}e.innerText=`${r?n.emoji:""} ${n.pretty}`})}function T(e){const r=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/,t=e.match(r);if(t){const o=parseInt(t[1],10),n=parseInt(t[2],10),i=parseInt(t[3],10);return`${o}, ${n}, ${i}`}return""}function ae(e){const r=e.match(/\d+/g);return r?`#${r.map(t=>parseInt(t).toString(16).padStart(2,"0")).join("")}`:""}function ce(e){const r=document.createElement("div");if(r.className="colibri-button",e.iconNode){const o=z(e.iconNode);o.classList.add("icon"),r.appendChild(o)}e.background&&r.style.setProperty("background",e.background),e.color&&r.style.setProperty("color",e.color),e.onClick&&r.addEventListener("click",e.onClick);const t=document.createElement("span");return t.textContent=e.text,r.appendChild(t),r}const H=({onDateSelected:e})=>{const r=document.querySelector(".BloquerInterface");r&&(r.style.display="block",r.classList.add("VoileOpaque50"));const t=`date-picker-${Date.now()}`,o=(p,h)=>{const b=window.innerWidth,g=window.innerHeight;return{left:(b-p)/2,top:(g-h)/2}},n=330,i=400,{left:s,top:a}=o(n,i),l=(p,h)=>{const b=new Date(p,h,1),C=new Date(p,h+1,0).getDate(),q=b.getDay(),y=[];let v=[];for(let x=0;x<q;x++)v.push(null);for(let x=1;x<=C;x++)v.push(x+1),v.length===7&&(y.push(v),v=[]);if(v.length>0){for(;v.length<7;)v.push(null);y.push(v)}return y},f=new Date,u=f.getFullYear(),S=f.getMonth(),$=l(u,S).map(p=>`
      <tr class="jours" role="row">
        ${p.map(h=>{if(h===null)return'<td role="gridcell" class="date previous-date" tabindex="-1" aria-selected="false"></td>';{const b=new Date(u,S,h);return`
                  <td role="gridcell" class="date actif current-month" tabindex="0" aria-selected="false" aria-label="${`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}-${String(b.getDate()).padStart(2,"0")}`}">
                    <div><div><div>${h}</div></div></div>
                  </td>
                `}}).join("")}
      </tr>
    `).join(""),m=`
    <div class="zone-fenetre date-fenetre-colibri" id="${t}" style="z-index: 1101; left: ${s}px; top: ${a}px;">
      <span class="sr-only" tabindex="0" onfocus="${t}.focusSurPremierElement();"></span>
      <div id="${t}_Fenetre" aria-labelledby="${t}_Titre" class="ObjetFenetre_Espace ObjetFenetre_Date_racine" tabindex="-1" role="dialog" aria-modal="true">
        <div id="${t}_FenetreContenu" class="Fenetre_Cadre ombre-cadre" style="box-sizing:border-box; width: ${n}px; min-height: ${i}px; background-color:var(--color-background);">
          <div class="Fenetre_Titre NePasImprimer">
            <h1 id="${t}_Titre" class="ZoneDeplacementFenetre ie-draggable-handle" tabindex="0">Choisir un jour</h1>
            <div class="cta-conteneur">
              <i role="button" tabindex="0" class="btnImageIcon as-button icon_fermeture_widget btnImage close-button" aria-label="Fermer" title="Fermer"></i>
            </div>
          </div>
          <div id="${t}_Res" class="Fenetre_Espace">
            <div id="${t}_Contenu" class="Fenetre_Contenu">
              <div class="ContentBox">
                <div class="InterfaceSelectionDate" id="${t}_Contenu">
                  <div class="combos-container">
                    <div class="combo-selecteur ObjetSaisie ie-combo">
                      <div class="input-wrapper ObjetSaisie" role="presentation">
                        <i role="button" tabindex="0" class="icon_angle_left icon btnImageIcon btnImage" aria-label="Précédent" title="Précédent"></i>
                        <div class="ObjetSaisie_cont">
                          <div class="input-wrapper">
                            <div class="ocb_cont as-input as-select ie-ripple">
                              <div class="ocb-libelle ie-ellipsis" tabindex="0" id="${t}_month" title="" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-live="polite" aria-relevant="text" aria-label="Sélectionner un mois" style="width: 120px;">
                                ${new Date(u,S).toLocaleString("default",{month:"long"})} ${u}
                              </div>
                              <div class="ocb_bouton" role="presentation"></div>
                            </div>
                          </div>
                        </div>
                        <i role="button" tabindex="0" class="icon_angle_right icon btnImageIcon btnImage" aria-label="Suivant" title="Suivant"></i>
                      </div>
                    </div>
                  </div>
                  <div id="${t}_Jours">
                    <table class="full-width Texte10 EspaceHaut m-top-l" role="grid">
                      <tbody>
                        <tr class="titre-jours" role="row">
                          <th role="columnheader" class=" ouvre" aria-label="lundi">lun.</th>
                          <th role="columnheader" class=" ouvre" aria-label="mardi">mar.</th>
                          <th role="columnheader" class=" ouvre" aria-label="mercredi">mer.</th>
                          <th role="columnheader" class=" ouvre" aria-label="jeudi">jeu.</th>
                          <th role="columnheader" class=" ouvre" aria-label="vendredi">ven.</th>
                          <th role="columnheader" class=" ouvre" aria-label="samedi">sam.</th>
                          <th role="columnheader" class=" ouvre" aria-label="dimanche">dim.</th>
                        </tr>
                        ${$}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="NePasImprimer">
            <div class="zone-bas">
              <div class="btn-conteneur">
                <button id="${t}_close" class="themeBoutonSecondaire ieBouton ie-ripple NoWrap ieBoutonDefautSansImage" style="margin-left:4px;">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="sr-only" tabindex="0" onfocus="${t}.focusSurPremierElement();"></span>
    </div>
  `,j=new DOMParser().parseFromString(m,"text/html").body.firstElementChild,d=document.querySelector("#zone_fenetre");d==null||d.insertAdjacentElement("beforeend",j),(p=>{var h,b,g,C;(h=p.querySelector(".close-button"))==null||h.addEventListener("click",()=>{L()}),(b=p.querySelector(`#${t}_close`))==null||b.addEventListener("click",()=>{L()}),p.querySelectorAll(".date").forEach(q=>{q.addEventListener("click",()=>{const y=q.getAttribute("aria-label");y&&(e(y),L())})}),(g=p.querySelector(".icon_angle_left"))==null||g.addEventListener("click",()=>{console.log("Mois précédent")}),(C=p.querySelector(".icon_angle_right"))==null||C.addEventListener("click",()=>{console.log("Mois suivant")})})(j)},L=()=>{const e=document.querySelector(".BloquerInterface");e&&(e.style.display="none",e.classList.remove("VoileOpaque50"));const r=document.querySelector(".date-fenetre-colibri");r&&r.remove()},le=e=>{const r=document.querySelector(".BloquerInterface");r&&(r.style.display="block",r.classList.add("VoileOpaque50"));const t=`popup-${Date.now()}`,o=(d,w)=>{const p=window.innerWidth,h=window.innerHeight;return{left:(p-d)/2,top:(h-w)/2}},n=e.width||630,i=e.minHeight||100,{left:s,top:a}=o(n,i),l=d=>`
      <div class="conteneur-tabs">
        <div class="menu-tabs">
          ${d.map(w=>`
            <div class="tab-item">
              <div tabindex="0" class="tab-content">
                <div class="libelle BordureNavigationInactive">${w.label}</div>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="tabs-contenu with-border">
          ${d.map(w=>`
            <ul class="ul-contenu-item">
              ${w.content}
            </ul>
          `).join("")}
            </div>
            </div>
            `;window.openDatePickerModal=H;const f=d=>{const w=Object.entries(d),p={};return w.forEach(([h,b])=>{const g=b.sameLineAs||h;p[g]||(p[g]=[]),p[g].push(h)}),`
      <div class="form-section">
        ${Object.values(p).map(h=>`
              <div class="flex-contain">
                ${h.map(b=>{const g=d[b];return g.type==="date"?`
                        <div class="element-bandeau-wrapper" style="display: flex; margin-left: 16px; flex-direction: column; align-self: center">
                          <span class="ie-titre-petit m-bottom">${g.label}</span>
                          <div class="ObjetCelluleDate input-wrapper">
                            <div id="${b}" style="flex:1 1 auto;">
                              <div class="input-wrapper">
                                <div class="ocb_cont as-input as-date-picker ie-ripple" data-date-picker="${b}">
                                  <div class="ocb-libelle ie-ellipsis" tabindex="0" id="${b}_Edit" title="" role="combobox" aria-haspopup="dialog" aria-expanded="false" aria-live="polite" aria-relevant="text" aria-labelledby="${b}_labelwai" style="width: 75px;">
                                    Sélectionner une date
                                  </div>
                                  <div class="ocb_bouton" role="presentation"></div>
                                </div>
                              </div>
                            </div>
                            <span class="sr-only" role="presentation" id="${b}_labelwai">${g.label}</span>
                          </div>
                        </div>
                      `:`
                      <label class="flex-contain cols m-top-l m-bottom-l" style="flex: ${g.sameLineAs?1:2};">
                        <span class="ie-titre-petit m-bottom">${g.label}</span>
                        ${g.height?`<textarea id="${b}" class="round-style" maxlength="${g.maxLength}" style="height: ${g.height}px"></textarea>`:`<input id="${b}" type="text" class="round-style" maxlength="${g.maxLength}" />`}
                      </label>
                    `}).join("")}
              </div>
            `).join("")}
      </div>
    `},u=d=>{const w={primary:"themeBoutonPrimaire",secondary:"themeBoutonSecondaire"};return`
      <div class="btn-conteneur">
        ${d.map(p=>`
          <button class="${w[p.type]} ieBouton ie-ripple NoWrap ieBoutonDefautSansImage" style="margin-left:8px;" onclick="this.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true }))">${p.label}</button>
        `).join("")}
      </div>
    `},S=`
    <div class="zone-fenetre colibri-fenetre" id="${t}" style="width: ${n}px; min-height: ${i}px; left: ${s}px; top: ${a}px; z-index: 1100">
      <span class="sr-only" tabindex="0" onfocus="${t}.focusSurPremierElement();"></span>
      <div id="${t}_Fenetre" aria-labelledby="${t}_Titre" class="ObjetFenetre_Espace ObjetFenetre_Message_racine" tabindex="-1" role="dialog" aria-modal="true">
        <div id="${t}_FenetreContenu" class="Fenetre_Cadre ombre-cadre" style="box-sizing:border-box; background-color:var(--color-background);">
          <div class="Fenetre_Titre NePasImprimer">
            <h1 id="${t}_Titre" class="ZoneDeplacementFenetre ie-draggable-handle" tabindex="0">${e.title}</h1>
            <div class="cta-conteneur">
              <i role="button" tabindex="0" class="btnImageIcon as-button icon_fermeture_widget btnImage close-button" aria-label="Fermer" title="Fermer"></i>
            </div>
          </div>
          <div id="${t}_Res" class="Fenetre_Espace">
            <div id="${t}_Contenu" class="Fenetre_Contenu">
              ${e.tabs?l(e.tabs):""}
              ${f(e.fields)}
            </div>
          </div>
          <div class="NePasImprimer">
            <div class="zone-bas">
              ${u(e.buttons)}
            </div>
          </div>
        </div>
      </div>
      <span class="sr-only" tabindex="0" onfocus="${t}.focusSurPremierElement();"></span>
    </div>
  `,m=new DOMParser().parseFromString(S,"text/html").body.firstElementChild,c=document.querySelector("#zone_fenetre");c==null||c.insertAdjacentElement("beforeend",m);const E=d=>{const w={};return d.querySelectorAll("input, textarea, .ocb-libelle").forEach(h=>{var C;const b=h.id.replace(/_Edit$/,""),g=h.value||((C=h.textContent)==null?void 0:C.trim())||"";w[b]=g}),w};(d=>{var C,q;d.querySelectorAll(".ocb_cont[data-date-picker]").forEach(y=>{const v=y.getAttribute("data-date-picker");y.addEventListener("click",()=>{H({onDateSelected:x=>{const I=document.getElementById(`${v}_Edit`);I&&(I.textContent=x)}})})}),(C=d.querySelector(".close-button"))==null||C.addEventListener("click",()=>{P()}),d.querySelectorAll("button").forEach(y=>{y.addEventListener("buttonClick",()=>{const v=e.buttons.find(x=>x.label===y.textContent);if(v){const x=E(d);v.onClick(x)}})}),e.tabs&&d.querySelectorAll(".tab-item").forEach(y=>{y.addEventListener("click",()=>{d.querySelectorAll(".tab-item").forEach(v=>{v.classList.remove("selected")}),y.classList.add("selected")})});let w=!1,p,h,b,g;(q=d.querySelector(".ie-draggable-handle"))==null||q.addEventListener("mousedown",y=>{w=!0,p=y.clientX,h=y.clientY,b=d.offsetLeft,g=d.offsetTop,d.style.cursor="grabbing"}),document.addEventListener("mousemove",y=>{if(!w)return;const v=y.clientX-p,x=y.clientY-h;d.style.left=`${b+v}px`,d.style.top=`${g+x}px`}),document.addEventListener("mouseup",()=>{w=!1,d.style.cursor="auto"})})(m)},P=()=>{const e=document.querySelector(".BloquerInterface");e&&(e.style.display="none",e.classList.remove("VoileOpaque50"));const r=document.querySelector(".colibri-fenetre");r&&r.remove()};function de(){var t;const e={};A.forEach(o=>{document.querySelectorAll(o.selector).forEach(i=>{let s=i.innerText;const a=Z(s),l=X(s);let f=null;o.id==="devoirs"?(f=window.getComputedStyle(i.parentElement).getPropertyValue("--couleur-matiere"),console.log(f)):o.id==="edt"?f=window.getComputedStyle(i.parentElement.parentElement.querySelector(".trait-matiere")).backgroundColor:o.id==="ressources"&&(f=window.getComputedStyle(i).getPropertyValue("--color-line")),s=s.split(">")[0],s=s.trim(),a!=="Pas de cours"&&(e[s]||(e[s]={}),f!=null&&f.startsWith("rgb")&&(f=ae(f).toUpperCase()),a&&(e[s].pretty=a),l&&(e[s].emoji=l),f&&(e[s].color=f),i.hasAttribute("originalSubjectName")||i.setAttribute("originalSubjectName",s))})}),chrome.storage.sync.get("subjectData",o=>{let n=o.subjectData??{};for(let i in e)!n.hasOwnProperty(i)&&!Object.values(n).some(s=>s.pretty.toLowerCase()===e[i].pretty.toLowerCase())&&!Object.values(n).some(s=>s.pretty.toLowerCase()===i.toLowerCase())&&(n[i]=e[i]);console.log(e,n),chrome.storage.sync.set({subjectData:n})}),document.querySelectorAll(".widget.travailafaire .liste-imbriquee ul li > .conteneur-item .titre-matiere, .widget.ressourcepedagogique ul li .wrap h3, .widget.notes ul li h3 > span, .widget.competences ul li .wrap h3 > span, .ListeDernieresNotes:not(:has(.liste-footer)) .zone-centrale .titre-principal:first-child, .ListeDernieresNotes:not(:has(.liste-footer)) .zone-centrale .titre-principal > div:first-child, .ListeDernieresNotes .zone-centrale .titre-principal .ie-titre-gros, .Zone-DetailsNotes > header > div > div:nth-child(1), .Zone-DetailsNotes > header > div").forEach(o=>O(o)),document.querySelectorAll(".widget.edt ul.container-cours > li.libelle-cours, .widget.ds .infos-ds-conteneur > h3").forEach(o=>O(o,!1)),document.querySelectorAll(".widget.edt ul.liste-cours > li").forEach(o=>{const n=o.querySelector(".trait-matiere");if(n){const i=window.getComputedStyle(n).backgroundColor;console.log(i),o.style.setProperty("--subject-color",T(i))}}),document.querySelectorAll(".liste_celluleGrid").forEach(o=>{const n=o.querySelector(".trait-matiere");if(n){const i=window.getComputedStyle(n).backgroundColor;console.log(i),o.style.setProperty("--subject-color",T(i))}}),document.querySelector(".widget.travailafaire .content-container .as-footer .colibri-button")||(t=document.querySelector(".widget.travailafaire .content-container .as-footer"))==null||t.insertAdjacentElement("beforeend",ce({iconNode:ie,text:"Ajouter un devoir",onClick:()=>le({title:"Ajouter un devoir",minHeight:600,width:500,fields:{subject:{label:"Nom de la matière",maxLength:30},content:{label:"Contenu",maxLength:500,height:200},date:{type:"date",label:"Date de remise",sameLineAs:"subject"}},buttons:[{label:"Annuler",onClick:()=>P(),type:"secondary"},{label:"Envoyer",onClick:o=>{P(),r(o)},type:"primary"}]})}));function r(o){const n=o.subject.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,"").trim();console.log(n),chrome.storage.sync.get("subjectData",({subjectData:i})=>{let s;if(i&&i.hasOwnProperty(n))s=i[n].color;else{let a=!1;for(const l of Object.keys(i))if(i[l].pretty===n){s=i[l].color,a=!0;break}a||(s=M[Math.floor(Math.random()*M.length)])}chrome.storage.sync.get("customHomework",a=>{const l=a.customHomework||[],f={subject:o.subject,description:o.content,color:s,done:!1,date:o.date};chrome.storage.sync.set({customHomework:[...l,f]},()=>{console.log("Custom homework added:",f)})})})}}function ue(e){const r=/^([A-Z\p{L}]+) ([\p{L}\- ]+)$/u,t=/^([\p{L} \-]+?) ([\p{L}\- ]+)$/u,o=e.match(r);if(o)return{first:o[2],last:o[1]};const n=e.match(t);return n?{first:n[2],last:n[1]}:{first:e,last:""}}async function me(e){try{const t=await(await fetch(e)).blob(),o=await new Promise((n,i)=>{const s=new FileReader;s.onloadend=()=>n(s.result),s.onerror=i,s.readAsDataURL(t)});return J(o,192,192)}catch(r){throw console.error("Error converting or resizing image:",r),r}}function pe(){console.log("gradesssss")}function be(){}const N=document.createElement("script");N.src=chrome.runtime.getURL("intercept.js");N.onload=function(){this.remove()};(document.head||document.documentElement).appendChild(N);const D={home:{elementSelector:".dotty .widget header > h2 > span",script:se},grades:{elementSelector:".ListeDernieresNotes .zone-centrale",script:pe},timetable:{elementSelector:".ObjetGrilleCours .cours-simple td :nth-child(2)",script:be}};window.addEventListener("message",e=>{var r,t,o;if(e.source===window&&((r=e.data)==null?void 0:r.type)==="DernieresNotes"&&(console.log("Received grades data from page context:",e.data.data),chrome.runtime.sendMessage({type:"DernieresNotes",data:e.data.data})),e.source===window&&((t=e.data)==null?void 0:t.type)==="page-update")for(let n in D){const i=document.querySelector((o=D[n])==null?void 0:o.selector);i?console.log("page changed, and heres the key "+n+"and the element",i):console.log("no element for",n)}});chrome.storage.sync.get("accentColor",e=>{let r=e.accentColor;r||(r=K[0],chrome.storage.sync.set({accentColor:r}));for(let t in r.rgb){const o=r.rgb[t];document.body.style.setProperty(`--accent-color-${t}`,o)}});chrome.storage.onChanged.addListener((e,r)=>{if(console.log(e,r),e.account&&e.account.newValue.studentName&&chrome.storage.sync.get("showLastName",t=>{F(e.account.newValue.studentName.first,t.showLastName&&e.account.newValue.studentName.last)}),e.profilePicture){const t=document.querySelector(".ObjetBandeauEspace .ibe_util_photo img");t&&e.profilePicture.newValue&&(t.src=e.profilePicture.newValue)}if(e.siteIconSrc){const t=document.querySelector("link[rel='icon']");t&&(t.href=e.siteIconSrc.newValue)}e.showLastName&&chrome.storage.sync.get("account",t=>{const o=t.account;console.log(o),F(o.studentName.first,e.showLastName.newValue&&o.studentName.last)}),e.showProfilePicture&&U(e.showProfilePicture.newValue),e.accentColor&&chrome.storage.sync.get("accentColor",t=>{const o=t.accentColor;for(let n in o.rgb){const i=o.rgb[n];document.body.style.setProperty(`--accent-color-${n}`,i)}}),e.subjectData&&chrome.storage.sync.get("subjectData",t=>{let o=t.subjectData;A.forEach(n=>{document.querySelectorAll(n.selector).forEach(s=>{const a=s.getAttribute("originalSubjectName");if(a){const l=o[a];s.innerText=`${l.emoji} ${l.pretty}`,n.hasColor&&(n.id==="devoirs"?(s.parentElement.style.removeProperty("--couleur-matiere"),s.parentElement.parentElement.parentElement.parentElement.style.setProperty("--couleur-matiere",l.color)):n.id==="edt"?s.parentElement.parentElement.querySelector(".trait-matiere").style.backgroundColor=l.color:n.id==="ressources"?s.style.setProperty("--color-line",l.color):n.id==="vie-scolaire-edt"&&(s.parentElement.parentElement.parentElement.parentElement.style.backgroundColor=`color-mix(in oklab, ${l.color} 45.5%, white 54.5%)`,s.parentElement.parentElement.parentElement.parentElement.style.borderColor=`color-mix(in oklab, ${l.color} 28.5%, black 71.5%)`))}})})}),e.customHomework&&chrome.storage.sync.get("customHomework",t=>{let o=t.customHomework;G(o,!0,e.customHomework.oldValue)})});function F(e,r){console.log(e,r);const t=document.querySelector(".ibe_etab");if(t){let o=`${e||""} ${r||""}`;o=o.trim();const n=o+t.innerHTML.slice(t.innerHTML.indexOf("<"));t.innerHTML=n}}function U(e){const r=document.querySelector(".ObjetBandeauEspace .ibe_util_photo img");r&&(e?r.style.display="inline":r.style.display="none")}chrome.storage.local.get("siteIconSrc",e=>{let r=e.siteIconSrc;if(!r)chrome.storage.local.set({siteIconSrc:Q[0].emojis[0].skins[0].src});else{document.querySelectorAll("link[rel='icon']").forEach(o=>o.remove());const t=document.createElement("link");t.rel="icon",t.href=r,document.head.appendChild(t)}});const k=()=>{const e=document.querySelector(".ObjetBandeauEspace");let r=e==null?void 0:e.getAttribute("aria-label");if(r){r=r.replace("Pour utiliser les raccourcis clavier, appuyez simultanément sur les touches Alt + Maj + un des chiffres de la partie supérieure du clavier (pas le pavé numérique). Menu: Alt + Maj + 0, Contenu: Alt + Maj + 1, Déconnexion: Alt + Maj + 9",""),r=r.replace(/\(.*?\)/g,""),r=r.split("-").slice(1).join("-").trim(),r=r.trim();const{first:t,last:o}=ue(r);return{firstName:t,lastName:o}}return{firstName:"",lastName:""}};function fe(){let e=0;const r=1e3;function t(n){const i=Date.now();i-e>=r&&(n(),de(),e=i)}Object.values(D).forEach(({elementSelector:n,script:i})=>{document.querySelector(n)&&typeof i=="function"&&t(i)}),console.log("First call"),new MutationObserver(()=>{Object.values(D).forEach(({elementSelector:n,script:i})=>{document.querySelector(n)&&typeof i=="function"&&t(i)})}).observe(document.body,{childList:!0,subtree:!0})}V();const Y=document.createElement("script");Y.src="https://unpkg.com/lucide@latest";document.body.appendChild(Y);function he(){document.getElementById("GInterface_T")?B():new MutationObserver((t,o)=>{document.getElementById("GInterface_T")&&(o.disconnect(),B())}).observe(document.body,{childList:!0,subtree:!0})}function B(){var i,s,a,l,f,u,S,_,$;V(),fe();const e=["Cahier<br>de textes","Vie<br>scolaire"];document.querySelectorAll(".item-menu_niveau0").forEach(m=>{const c=m.querySelector(".label-menu_niveau0");c&&e.includes(c==null?void 0:c.innerHTML.trim())&&(c.innerHTML=c==null?void 0:c.innerHTML.replace(/<br\s*\/?>/gi," "))}),(i=document.querySelector(".label-menu_niveau0"))==null||i.insertAdjacentHTML("beforeend","Acceuil"),(s=document.querySelector(".label-menu_niveau0 i"))==null||s.remove(),(a=document.querySelector(".ibe_logo"))==null||a.remove(),(l=document.querySelector(".ibe_image_etab"))==null||l.remove(),(f=document.querySelector(".footer-wrapper"))==null||f.remove(),(u=document.querySelector(".objetBandeauEntete_membres"))==null||u.remove();const r=document.querySelector(".ibe_centre");if(r){for(let m=0;m<=2;m++){const c=r.firstChild;console.log(c,r),c&&((S=document.querySelector(".ibe_gauche"))==null||S.appendChild(c))}r.remove()}document.querySelectorAll(".ibe_iconebtn.ibe_actif").forEach(m=>{var c;return(c=document.querySelector(".ibe_droite"))==null?void 0:c.appendChild(m)});const t=document.querySelector(".ibe_util_texte"),o=document.querySelector(".ibe_etab"),n=(_=o==null?void 0:o.textContent)==null?void 0:_.trim();if(t&&n&&o){const m=()=>{var d;const c=document.querySelector(".ObjetBandeauEspace"),E=/\((.*?)\)/,j=(d=c==null?void 0:c.getAttribute("aria-label"))==null?void 0:d.match(E);return j?j[1]:""};($=o.querySelector("i"))==null||$.remove(),t.innerHTML=te(n),o.innerHTML=Object.values(k()).join(" "),o.insertAdjacentHTML("beforeend",`<span class='class-indicator'>${m()}</span>`)}oe('h1[aria-label="Mon emploi du temps"] + .element-bandeau-wrapper',m=>{console.log("hey i'm here lol");const c=m.querySelector("span");c&&(c.textContent=re(c.textContent))}),chrome.storage.local.get("profilePicture",m=>{let c=m.profilePicture;const E=document.querySelector(".ObjetBandeauEspace .ibe_util_photo img");E&&me(E.src).then(j=>{chrome.storage.local.set({originalProfilePicture:j})}),E&&c&&(E.src=c)}),chrome.storage.sync.get("account",m=>{let c=m.account;(!c||c.studentName.first===""||c.studentName.last==="")&&chrome.storage.sync.set({account:{studentName:{first:k().firstName,last:k().lastName}}})}),chrome.storage.sync.get("showLastName",m=>{let c=m.showLastName;c==null?chrome.storage.sync.set({showLastName:!0}):chrome.storage.sync.get("account",E=>{F(E.account.studentName.first,c===!0&&E.account.studentName.last)})}),chrome.storage.sync.get("showProfilePicture",m=>{let c=m.showProfilePicture;c==null?chrome.storage.sync.set({showProfilePicture:!0}):chrome.storage.sync.get("showProfilePicture",E=>{U(E.showProfilePicture)})})}he();function G(e,r=!1,t){var s;if(!r&&document.querySelector("ul.liste-imbriquee .colibri-hw"))return;const o=t?e.filter(a=>!t.some(l=>l.subject===a.subject&&l.description===a.description&&l.date===a.date)):e,n={};o.forEach(a=>{const l=a.date;n[l]||(n[l]=[]),n[l].push(a)});const i=document.querySelector("ul.liste-imbriquee");if(!i){console.error("Homework list container not found!");return}for(const a in n){let l=i.querySelector(`h3[id="id_173_date_${a.replace(/-/g,"_")}"]`);if(!l){const u=document.createElement("li");u.setAttribute("aria-labelledby",`id_173_date_${a.replace(/-/g,"_")}`),u.setAttribute("tabindex","0");const _=new Date(a).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"}),$=document.createElement("h3");$.id=`id_173_date_${a.replace(/-/g,"_")}`,$.innerHTML=`<span>Pour</span> ${_}`,u.appendChild($);const m=document.createElement("ul");m.className="sub-liste cols",u.appendChild(m),i.appendChild(u),l=$}const f=(s=l.parentElement)==null?void 0:s.querySelector("ul.sub-liste");if(!f){console.error("Sub-list not found for date:",a);continue}n[a].forEach(u=>{const S=document.createElement("li");S.setAttribute("aria-labelledby",`id_173_date_${a.replace(/-/g,"_")}`),S.style.setProperty("--couleur-matiere",u.color||"#000000");const _=`
        <div class="wrap conteneur-item colibri-hw">
          <div tabindex="0" role="link" class="as-header">
            <div class="with-color" style="margin-left: 0.8rem;">
              <span class="titre-matiere ${u.done?"est-fait":""}" originalsubjectname="${u.subject}">
                ${u.subject}
              </span>
            </div>
            <div tabindex="0" class="tag-style ThemeCat-pedagogie ie-chips">
              <div class="text ie-ellipsis">${u.done?"Fait":"Non Fait"}</div>
            </div>
          </div>
          <div class="m-left">
            <div tabindex="0" class="as-content ${u.done?"avecAction done":"avecAction"}" aria-labelledby="IE.Identite.collection.g25_0">
              <div class="description widgetTAF tiny-view ${u.done?"est-fait":""}">
                <div>${u.description}</div>
              </div>
            </div>
          </div>
          <div class="flex-contain conteneur-cb">
            <label class="iecb iecbrbdroite cb-termine colored-label ${u.done?"is-checked":""}" for="cb-g7-gen-for">
              <input type="checkbox" id="cb-g7-gen-for" ${u.done?"checked":""}>
              <span aria-hidden="true"></span>
              <span>J'ai terminé</span>
            </label>
          </div>
        </div>
      `;S.innerHTML=_,f.appendChild(S)})}}console.log("hi");export{G as renderCustomHomework};
