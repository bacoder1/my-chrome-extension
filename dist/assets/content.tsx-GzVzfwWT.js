import{f as G,g as Z,s as I,r as X,c as J,i as K}from"./resize_image-50o9hnDU.js";const Q={Lycee:"Lycée",Francais:"Français"},ee=e=>{const r=e.split(" ");let o="";for(let t of r)t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase(),t=Q[t]||t,o=o+" "+t;return o.trim()};function te(e,r){const o=document.querySelector(e);o?r(o):new MutationObserver((i,s)=>{const n=document.querySelector(e);n&&(s.disconnect(),r(n))}).observe(document.body,{childList:!0,subtree:!0})}function oe(e){const r=/(\d{2})\/(\d{2})\/(\d{4})/g;return e.replace(r,(t,i,s,n)=>{const a=new Date(`${n}-${s}-${i}`);return`${i} ${a.toLocaleString("fr-FR",{month:"short"})} ${n}`})}function B(){const e=`
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
 */const V=(e,r,o=[])=>{const t=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(r).forEach(i=>{t.setAttribute(i,String(r[i]))}),o.length&&o.forEach(i=>{const s=V(...i);t.appendChild(s)}),t};var R=([e,r,o])=>V(e,r,o);/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=["svg",z,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=["svg",z,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];function ie(){const e={"Travail à faire pour les prochains jours":"Devoirs","Dernières ressources pédagogiques":"Dernières ressources","Découvrir les actualités et les documents du CDI depuis e-sidoc":"Actualités & Documents du CDI"};document.querySelectorAll(".widget").forEach(t=>{const i=t.querySelector("header > h2 > span");i!=null&&i.textContent&&(i.textContent=e[i.textContent]??i.textContent)}),console.log("dsdsq"),document.querySelectorAll(".widget .cta-conteneur i").forEach(t=>{t.querySelector("svg")||t.insertAdjacentElement("beforeend",R(re))});const r=.3,o=.9;document.querySelectorAll(".widget").forEach(t=>{const i=r+Math.random()*(o-r);t.style.animationDuration=`${i}s`}),chrome.storage.sync.get("widgets",t=>{let i=t.widgets;console.log(i),i=Array.from(document.querySelectorAll("section.widget")).map(s=>{var a;if(window.getComputedStyle(s).display==="none")return null;let n=((a=s.querySelector("header h2 span"))==null?void 0:a.textContent)||"";return n=n.trim(),n?{"Informations & Sondages":"Infos","Actualités & Documents du CDI":"CDI","Carnet de correspondance":"Carnet","Dernières ressources pédagogiques":"Ressources","Dernières évaluations":"Evals.","Dernières notes":"Notes"}[n]??n:null}).filter(s=>s!==null),console.log("set storage to "+i),document.querySelectorAll(".liste-imbriquee .sub-liste li").forEach(s=>{const n=s.querySelector(".with-color");if(n){const a=window.getComputedStyle(n).getPropertyValue("--couleur-matiere");s.style.setProperty("--couleur-matiere",a)}}),chrome.storage.sync.get("customHomework",s=>{let n=s.customHomework;Y(n)})})}const F=[{selector:".widget.travailafaire .liste-imbriquee ul li > .conteneur-item .titre-matiere",hasColor:!0,id:"devoirs"},{selector:".widget.ressourcepedagogique ul li .wrap h3",hasColor:!0,id:"ressources"},{selector:".widget.notes ul li h3 > span"},{selector:".widget.competences ul li .wrap h3 > span"},{selector:".widget.edt ul.container-cours > li.libelle-cours",hasColor:!0,id:"edt",hasEmoji:!1},{selector:".widget.ds .infos-ds-conteneur > h3",hasEmoji:!1},{selector:".ObjetGrilleCours .cours-simple td :nth-child(2)",hasColor:!0,id:"vie-scolaire-edt",hasEmoji:!1}];function M(e,r=!0){let o=e.innerText;o=o.split(">")[0],chrome.storage.sync.get("subjectData",t=>{const i=t.subjectData[o];if(!i)return;let s=[];if(F.forEach(n=>{n.hasColor&&document.querySelectorAll(n.selector).forEach(l=>{s.push({element:l,selectorId:n.id})})}),s.some(n=>n.element===e)){const n=s.find(l=>l.element===e),a=n==null?void 0:n.selectorId;n&&a==="devoirs"?(e.parentElement.style.removeProperty("--couleur-matiere"),e.parentElement.parentElement.parentElement.parentElement.style.setProperty("--couleur-matiere",i.color),console.log("did")):n&&a==="edt"?(e.parentElement.parentElement.querySelector(".trait-matiere").style.backgroundColor=i.color,console.log("did")):n&&a==="ressources"&&(e.style.setProperty("--color-line",i.color),console.log("did"))}console.log("done"),e.innerText=`${r?i.emoji:""} ${i.pretty}`})}function O(e){const r=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/,o=e.match(r);if(o){const t=parseInt(o[1],10),i=parseInt(o[2],10),s=parseInt(o[3],10);return`${t}, ${i}, ${s}`}return""}function se(e){const r=e.match(/\d+/g);return r?`#${r.map(o=>parseInt(o).toString(16).padStart(2,"0")).join("")}`:""}function ae(e){const r=document.createElement("div");if(r.className="colibri-button",e.iconNode){const t=R(e.iconNode);t.classList.add("icon"),r.appendChild(t)}e.background&&r.style.setProperty("background",e.background),e.color&&r.style.setProperty("color",e.color),e.onClick&&r.addEventListener("click",e.onClick);const o=document.createElement("span");return o.textContent=e.text,r.appendChild(o),r}const T=({onDateSelected:e})=>{const r=document.querySelector(".BloquerInterface");r&&(r.style.display="block",r.classList.add("VoileOpaque50"));const o=`date-picker-${Date.now()}`,t=(p,h)=>{const b=window.innerWidth,g=window.innerHeight;return{left:(b-p)/2,top:(g-h)/2}},i=330,s=400,{left:n,top:a}=t(i,s),l=(p,h)=>{const b=new Date(p,h,1),C=new Date(p,h+1,0).getDate(),q=b.getDay(),y=[];let v=[];for(let x=0;x<q;x++)v.push(null);for(let x=1;x<=C;x++)v.push(x+1),v.length===7&&(y.push(v),v=[]);if(v.length>0){for(;v.length<7;)v.push(null);y.push(v)}return y},f=new Date,u=f.getFullYear(),S=f.getMonth(),$=l(u,S).map(p=>`
      <tr class="jours" role="row">
        ${p.map(h=>{if(h===null)return'<td role="gridcell" class="date previous-date" tabindex="-1" aria-selected="false"></td>';{const b=new Date(u,S,h);return`
                  <td role="gridcell" class="date actif current-month" tabindex="0" aria-selected="false" aria-label="${`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}-${String(b.getDate()).padStart(2,"0")}`}">
                    <div><div><div>${h}</div></div></div>
                  </td>
                `}}).join("")}
      </tr>
    `).join(""),m=`
    <div class="zone-fenetre date-fenetre-colibri" id="${o}" style="z-index: 1101; left: ${n}px; top: ${a}px;">
      <span class="sr-only" tabindex="0" onfocus="${o}.focusSurPremierElement();"></span>
      <div id="${o}_Fenetre" aria-labelledby="${o}_Titre" class="ObjetFenetre_Espace ObjetFenetre_Date_racine" tabindex="-1" role="dialog" aria-modal="true">
        <div id="${o}_FenetreContenu" class="Fenetre_Cadre ombre-cadre" style="box-sizing:border-box; width: ${i}px; min-height: ${s}px; background-color:var(--color-background);">
          <div class="Fenetre_Titre NePasImprimer">
            <h1 id="${o}_Titre" class="ZoneDeplacementFenetre ie-draggable-handle" tabindex="0">Choisir un jour</h1>
            <div class="cta-conteneur">
              <i role="button" tabindex="0" class="btnImageIcon as-button icon_fermeture_widget btnImage close-button" aria-label="Fermer" title="Fermer"></i>
            </div>
          </div>
          <div id="${o}_Res" class="Fenetre_Espace">
            <div id="${o}_Contenu" class="Fenetre_Contenu">
              <div class="ContentBox">
                <div class="InterfaceSelectionDate" id="${o}_Contenu">
                  <div class="combos-container">
                    <div class="combo-selecteur ObjetSaisie ie-combo">
                      <div class="input-wrapper ObjetSaisie" role="presentation">
                        <i role="button" tabindex="0" class="icon_angle_left icon btnImageIcon btnImage" aria-label="Précédent" title="Précédent"></i>
                        <div class="ObjetSaisie_cont">
                          <div class="input-wrapper">
                            <div class="ocb_cont as-input as-select ie-ripple">
                              <div class="ocb-libelle ie-ellipsis" tabindex="0" id="${o}_month" title="" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-live="polite" aria-relevant="text" aria-label="Sélectionner un mois" style="width: 120px;">
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
                  <div id="${o}_Jours">
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
                <button id="${o}_close" class="themeBoutonSecondaire ieBouton ie-ripple NoWrap ieBoutonDefautSansImage" style="margin-left:4px;">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="sr-only" tabindex="0" onfocus="${o}.focusSurPremierElement();"></span>
    </div>
  `,j=new DOMParser().parseFromString(m,"text/html").body.firstElementChild,d=document.querySelector("#zone_fenetre");d==null||d.insertAdjacentElement("beforeend",j),(p=>{var h,b,g,C;(h=p.querySelector(".close-button"))==null||h.addEventListener("click",()=>{D()}),(b=p.querySelector(`#${o}_close`))==null||b.addEventListener("click",()=>{D()}),p.querySelectorAll(".date").forEach(q=>{q.addEventListener("click",()=>{const y=q.getAttribute("aria-label");y&&(e(y),D())})}),(g=p.querySelector(".icon_angle_left"))==null||g.addEventListener("click",()=>{console.log("Mois précédent")}),(C=p.querySelector(".icon_angle_right"))==null||C.addEventListener("click",()=>{console.log("Mois suivant")})})(j)},D=()=>{const e=document.querySelector(".BloquerInterface");e&&(e.style.display="none",e.classList.remove("VoileOpaque50"));const r=document.querySelector(".date-fenetre-colibri");r&&r.remove()},ce=e=>{const r=document.querySelector(".BloquerInterface");r&&(r.style.display="block",r.classList.add("VoileOpaque50"));const o=`popup-${Date.now()}`,t=(d,w)=>{const p=window.innerWidth,h=window.innerHeight;return{left:(p-d)/2,top:(h-w)/2}},i=e.width||630,s=e.minHeight||100,{left:n,top:a}=t(i,s),l=d=>`
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
            `;window.openDatePickerModal=T;const f=d=>{const w=Object.entries(d),p={};return w.forEach(([h,b])=>{const g=b.sameLineAs||h;p[g]||(p[g]=[]),p[g].push(h)}),`
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
    <div class="zone-fenetre colibri-fenetre" id="${o}" style="width: ${i}px; min-height: ${s}px; left: ${n}px; top: ${a}px; z-index: 1100">
      <span class="sr-only" tabindex="0" onfocus="${o}.focusSurPremierElement();"></span>
      <div id="${o}_Fenetre" aria-labelledby="${o}_Titre" class="ObjetFenetre_Espace ObjetFenetre_Message_racine" tabindex="-1" role="dialog" aria-modal="true">
        <div id="${o}_FenetreContenu" class="Fenetre_Cadre ombre-cadre" style="box-sizing:border-box; background-color:var(--color-background);">
          <div class="Fenetre_Titre NePasImprimer">
            <h1 id="${o}_Titre" class="ZoneDeplacementFenetre ie-draggable-handle" tabindex="0">${e.title}</h1>
            <div class="cta-conteneur">
              <i role="button" tabindex="0" class="btnImageIcon as-button icon_fermeture_widget btnImage close-button" aria-label="Fermer" title="Fermer"></i>
            </div>
          </div>
          <div id="${o}_Res" class="Fenetre_Espace">
            <div id="${o}_Contenu" class="Fenetre_Contenu">
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
      <span class="sr-only" tabindex="0" onfocus="${o}.focusSurPremierElement();"></span>
    </div>
  `,m=new DOMParser().parseFromString(S,"text/html").body.firstElementChild,c=document.querySelector("#zone_fenetre");c==null||c.insertAdjacentElement("beforeend",m);const E=d=>{const w={};return d.querySelectorAll("input, textarea, .ocb-libelle").forEach(h=>{var C;const b=h.id.replace(/_Edit$/,""),g=h.value||((C=h.textContent)==null?void 0:C.trim())||"";w[b]=g}),w};(d=>{var C,q;d.querySelectorAll(".ocb_cont[data-date-picker]").forEach(y=>{const v=y.getAttribute("data-date-picker");y.addEventListener("click",()=>{T({onDateSelected:x=>{const N=document.getElementById(`${v}_Edit`);N&&(N.textContent=x)}})})}),(C=d.querySelector(".close-button"))==null||C.addEventListener("click",()=>{k()}),d.querySelectorAll("button").forEach(y=>{y.addEventListener("buttonClick",()=>{const v=e.buttons.find(x=>x.label===y.textContent);if(v){const x=E(d);v.onClick(x)}})}),e.tabs&&d.querySelectorAll(".tab-item").forEach(y=>{y.addEventListener("click",()=>{d.querySelectorAll(".tab-item").forEach(v=>{v.classList.remove("selected")}),y.classList.add("selected")})});let w=!1,p,h,b,g;(q=d.querySelector(".ie-draggable-handle"))==null||q.addEventListener("mousedown",y=>{w=!0,p=y.clientX,h=y.clientY,b=d.offsetLeft,g=d.offsetTop,d.style.cursor="grabbing"}),document.addEventListener("mousemove",y=>{if(!w)return;const v=y.clientX-p,x=y.clientY-h;d.style.left=`${b+v}px`,d.style.top=`${g+x}px`}),document.addEventListener("mouseup",()=>{w=!1,d.style.cursor="auto"})})(m)},k=()=>{const e=document.querySelector(".BloquerInterface");e&&(e.style.display="none",e.classList.remove("VoileOpaque50"));const r=document.querySelector(".colibri-fenetre");r&&r.remove()};function le(){var o;const e={};F.forEach(t=>{document.querySelectorAll(t.selector).forEach(s=>{let n=s.innerText;const a=G(n),l=Z(n);let f=null;t.id==="devoirs"?(f=window.getComputedStyle(s.parentElement).getPropertyValue("--couleur-matiere"),console.log(f)):t.id==="edt"?f=window.getComputedStyle(s.parentElement.parentElement.querySelector(".trait-matiere")).backgroundColor:t.id==="ressources"&&(f=window.getComputedStyle(s).getPropertyValue("--color-line")),n=n.split(">")[0],n=n.trim(),a!=="Pas de cours"&&(!e[n]&&n&&a&&(e[n]={}),f!=null&&f.startsWith("rgb")&&(f=se(f).toUpperCase()),a&&(e[n].pretty=a),l&&(e[n].emoji=l),f&&(e[n].color=f),s.hasAttribute("originalSubjectName")||s.setAttribute("originalSubjectName",n))})}),chrome.storage.sync.get("subjectData",t=>{let i=t.subjectData??{};for(let s in e)!i.hasOwnProperty(s)&&!Object.values(i).some(n=>n.pretty.toLowerCase()===e[s].pretty.toLowerCase())&&!Object.values(i).some(n=>n.pretty.toLowerCase()===s.toLowerCase())&&(i[s]=e[s]);console.log(e,i),chrome.storage.sync.set({subjectData:i})}),document.querySelectorAll(".widget.travailafaire .liste-imbriquee ul li > .conteneur-item .titre-matiere, .widget.ressourcepedagogique ul li .wrap h3, .widget.notes ul li h3 > span, .widget.competences ul li .wrap h3 > span, .ListeDernieresNotes:not(:has(.liste-footer)) .zone-centrale .titre-principal:first-child, .ListeDernieresNotes:not(:has(.liste-footer)) .zone-centrale .titre-principal > div:first-child, .ListeDernieresNotes .zone-centrale .titre-principal .ie-titre-gros, .Zone-DetailsNotes > header > div > div:nth-child(1), .Zone-DetailsNotes > header > div").forEach(t=>M(t)),document.querySelectorAll(".widget.edt ul.container-cours > li.libelle-cours, .widget.ds .infos-ds-conteneur > h3").forEach(t=>M(t,!1)),document.querySelectorAll(".widget.edt ul.liste-cours > li").forEach(t=>{const i=t.querySelector(".trait-matiere");if(i){const s=window.getComputedStyle(i).backgroundColor;console.log(s),t.style.setProperty("--subject-color",O(s))}}),document.querySelectorAll(".liste_celluleGrid").forEach(t=>{const i=t.querySelector(".trait-matiere");if(i){const s=window.getComputedStyle(i).backgroundColor;console.log(s),t.style.setProperty("--subject-color",O(s))}}),document.querySelector(".widget.travailafaire .content-container .as-footer .colibri-button")||(o=document.querySelector(".widget.travailafaire .content-container .as-footer"))==null||o.insertAdjacentElement("beforeend",ae({iconNode:ne,text:"Ajouter un devoir",onClick:()=>ce({title:"Ajouter un devoir",minHeight:600,width:500,fields:{subject:{label:"Nom de la matière",maxLength:30},content:{label:"Contenu",maxLength:500,height:200},date:{type:"date",label:"Date de remise",sameLineAs:"subject"}},buttons:[{label:"Annuler",onClick:()=>k(),type:"secondary"},{label:"Envoyer",onClick:t=>{k(),r(t)},type:"primary"}]})}));function r(t){const i=t.subject.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,"").trim();console.log(i),chrome.storage.sync.get("subjectData",({subjectData:s})=>{let n;if(s&&s.hasOwnProperty(i))n=s[i].color;else{let a=!1;for(const l of Object.keys(s))if(s[l].pretty===i){n=s[l].color,a=!0;break}a||(n=I[Math.floor(Math.random()*I.length)])}chrome.storage.sync.get("customHomework",a=>{const l=a.customHomework||[],f={subject:t.subject,description:t.content,color:n,done:!1,date:t.date};chrome.storage.sync.set({customHomework:[...l,f]},()=>{console.log("Custom homework added:",f)})})})}}function de(e){const r=/^([A-Z\p{L}]+) ([\p{L}\- ]+)$/u,o=/^([\p{L} \-]+?) ([\p{L}\- ]+)$/u,t=e.match(r);if(t)return{first:t[2],last:t[1]};const i=e.match(o);return i?{first:i[2],last:i[1]}:{first:e,last:""}}async function ue(e){try{const o=await(await fetch(e)).blob(),t=await new Promise((i,s)=>{const n=new FileReader;n.onloadend=()=>i(n.result),n.onerror=s,n.readAsDataURL(o)});return X(t,192,192)}catch(r){throw console.error("Error converting or resizing image:",r),r}}function me(){}function pe(){}const A=document.createElement("script");A.src=chrome.runtime.getURL("intercept.js");A.onload=function(){this.remove()};(document.head||document.documentElement).appendChild(A);window.addEventListener("message",e=>{var r;e.source===window&&((r=e.data)==null?void 0:r.type)==="DernieresNotes"&&(console.log("Received grades data from page context:",e.data.data),chrome.runtime.sendMessage({type:"DernieresNotes",data:e.data.data}))});chrome.storage.sync.get("accentColor",e=>{let r=e.accentColor;r||(r=J[0],chrome.storage.sync.set({accentColor:r}));for(let o in r.rgb){const t=r.rgb[o];document.body.style.setProperty(`--accent-color-${o}`,t)}});chrome.storage.onChanged.addListener((e,r)=>{if(console.log(e,r),e.account&&e.account.newValue.studentName&&chrome.storage.sync.get("showLastName",o=>{P(e.account.newValue.studentName.first,o.showLastName&&e.account.newValue.studentName.last)}),e.profilePicture){const o=document.querySelector(".ObjetBandeauEspace .ibe_util_photo img");o&&e.profilePicture.newValue&&(o.src=e.profilePicture.newValue)}if(e.siteIconSrc){console.log("hi");const o=document.querySelector("link[rel='icon']");o&&(o.href=e.siteIconSrc.newValue)}e.showLastName&&chrome.storage.sync.get("account",o=>{const t=o.account;console.log(t),P(t.studentName.first,e.showLastName.newValue&&t.studentName.last)}),e.showProfilePicture&&W(e.showProfilePicture.newValue),e.accentColor&&chrome.storage.sync.get("accentColor",o=>{const t=o.accentColor;for(let i in t.rgb){const s=t.rgb[i];document.body.style.setProperty(`--accent-color-${i}`,s)}}),e.subjectData&&chrome.storage.sync.get("subjectData",o=>{let t=o.subjectData;F.forEach(i=>{document.querySelectorAll(i.selector).forEach(n=>{const a=n.getAttribute("originalSubjectName");if(a){const l=t[a];n.innerText=`${l.emoji} ${l.pretty}`,i.hasColor&&(i.id==="devoirs"?(n.parentElement.style.removeProperty("--couleur-matiere"),n.parentElement.parentElement.parentElement.parentElement.style.setProperty("--couleur-matiere",l.color)):i.id==="edt"?n.parentElement.parentElement.querySelector(".trait-matiere").style.backgroundColor=l.color:i.id==="ressources"?n.style.setProperty("--color-line",l.color):i.id==="vie-scolaire-edt"&&(n.parentElement.parentElement.parentElement.parentElement.style.backgroundColor=`color-mix(in oklab, ${l.color} 45.5%, white 54.5%)`,n.parentElement.parentElement.parentElement.parentElement.style.borderColor=`color-mix(in oklab, ${l.color} 28.5%, black 71.5%)`))}})})}),e.customHomework&&chrome.storage.sync.get("customHomework",o=>{let t=o.customHomework;Y(t,!0,e.customHomework.oldValue)})});function P(e,r){console.log(e,r);const o=document.querySelector(".ibe_etab");if(o){let t=`${e||""} ${r||""}`;t=t.trim();const i=t+o.innerHTML.slice(o.innerHTML.indexOf("<"));o.innerHTML=i}}function W(e){const r=document.querySelector(".ObjetBandeauEspace .ibe_util_photo img");r&&(e?r.style.display="inline":r.style.display="none")}chrome.storage.local.get("siteIconSrc",e=>{let r=e.siteIconSrc;if(!r)chrome.storage.local.set({siteIconSrc:K[0].emojis[0].skins[0].src});else{document.querySelectorAll("link[rel='icon']").forEach(t=>t.remove());const o=document.createElement("link");o.rel="icon",o.href=r,document.head.appendChild(o)}});const L=()=>{const e=document.querySelector(".ObjetBandeauEspace");let r=e==null?void 0:e.getAttribute("aria-label");if(r){r=r.replace("Pour utiliser les raccourcis clavier, appuyez simultanément sur les touches Alt + Maj + un des chiffres de la partie supérieure du clavier (pas le pavé numérique). Menu: Alt + Maj + 0, Contenu: Alt + Maj + 1, Déconnexion: Alt + Maj + 9",""),r=r.replace(/\(.*?\)/g,""),r=r.split("-").slice(1).join("-").trim(),r=r.trim();const{first:o,last:t}=de(r);return{firstName:o,lastName:t}}return{firstName:"",lastName:""}};function be(){const e={home:{elementSelector:".dotty .widget header > h2 > span",script:ie},grades:{elementSelector:".ListeDernieresNotes .zone-centrale",script:me},timetable:{elementSelector:".ObjetGrilleCours .cours-simple td :nth-child(2)",script:pe}};let r=0;const o=1e3;function t(s){const n=Date.now();n-r>=o&&(s(),le(),r=n)}Object.values(e).forEach(({elementSelector:s,script:n})=>{document.querySelector(s)&&typeof n=="function"&&t(n)}),console.log("First call"),new MutationObserver(()=>{Object.values(e).forEach(({elementSelector:s,script:n})=>{document.querySelector(s)&&typeof n=="function"&&t(n)})}).observe(document.body,{childList:!0,subtree:!0})}B();const U=document.createElement("script");U.src="https://unpkg.com/lucide@latest";document.body.appendChild(U);function fe(){document.getElementById("GInterface_T")?H():new MutationObserver((o,t)=>{document.getElementById("GInterface_T")&&(t.disconnect(),H())}).observe(document.body,{childList:!0,subtree:!0})}function H(){var s,n,a,l,f,u,S,_,$;B(),be();const e=["Cahier<br>de textes","Vie<br>scolaire"];document.querySelectorAll(".item-menu_niveau0").forEach(m=>{const c=m.querySelector(".label-menu_niveau0");c&&e.includes(c==null?void 0:c.innerHTML.trim())&&(c.innerHTML=c==null?void 0:c.innerHTML.replace(/<br\s*\/?>/gi," "))}),(s=document.querySelector(".label-menu_niveau0"))==null||s.insertAdjacentHTML("beforeend","Acceuil"),(n=document.querySelector(".label-menu_niveau0 i"))==null||n.remove(),(a=document.querySelector(".ibe_logo"))==null||a.remove(),(l=document.querySelector(".ibe_image_etab"))==null||l.remove(),(f=document.querySelector(".footer-wrapper"))==null||f.remove(),(u=document.querySelector(".objetBandeauEntete_membres"))==null||u.remove();const r=document.querySelector(".ibe_centre");if(r){for(let m=0;m<=2;m++){const c=r.firstChild;console.log(c,r),c&&((S=document.querySelector(".ibe_gauche"))==null||S.appendChild(c))}r.remove()}document.querySelectorAll(".ibe_iconebtn.ibe_actif").forEach(m=>{var c;return(c=document.querySelector(".ibe_droite"))==null?void 0:c.appendChild(m)});const o=document.querySelector(".ibe_util_texte"),t=document.querySelector(".ibe_etab"),i=(_=t==null?void 0:t.textContent)==null?void 0:_.trim();if(o&&i&&t){const m=()=>{var d;const c=document.querySelector(".ObjetBandeauEspace"),E=/\((.*?)\)/,j=(d=c==null?void 0:c.getAttribute("aria-label"))==null?void 0:d.match(E);return j?j[1]:""};($=t.querySelector("i"))==null||$.remove(),o.innerHTML=ee(i),t.innerHTML=Object.values(L()).join(" "),t.insertAdjacentHTML("beforeend",`<span class='class-indicator'>${m()}</span>`)}te('h1[aria-label="Mon emploi du temps"] + .element-bandeau-wrapper',m=>{console.log("hey i'm here lol");const c=m.querySelector("span");c&&(c.textContent=oe(c.textContent))}),chrome.storage.local.get("profilePicture",m=>{let c=m.profilePicture;const E=document.querySelector(".ObjetBandeauEspace .ibe_util_photo img");E&&ue(E.src).then(j=>{chrome.storage.local.set({originalProfilePicture:j})}),E&&c&&(E.src=c)}),chrome.storage.sync.get("account",m=>{let c=m.account;(!c||c.studentName.first===""||c.studentName.last==="")&&chrome.storage.sync.set({account:{studentName:{first:L().firstName,last:L().lastName}}})}),chrome.storage.sync.get("showLastName",m=>{let c=m.showLastName;c==null?chrome.storage.sync.set({showLastName:!0}):chrome.storage.sync.get("account",E=>{P(E.account.studentName.first,c===!0&&E.account.studentName.last)})}),chrome.storage.sync.get("showProfilePicture",m=>{let c=m.showProfilePicture;c==null?chrome.storage.sync.set({showProfilePicture:!0}):chrome.storage.sync.get("showProfilePicture",E=>{W(E.showProfilePicture)})})}fe();function Y(e,r=!1,o){var n;if(!r&&document.querySelector("ul.liste-imbriquee .colibri-hw"))return;const t=o?e.filter(a=>!o.some(l=>l.subject===a.subject&&l.description===a.description&&l.date===a.date)):e,i={};t.forEach(a=>{const l=a.date;i[l]||(i[l]=[]),i[l].push(a)});const s=document.querySelector("ul.liste-imbriquee");if(!s){console.error("Homework list container not found!");return}for(const a in i){let l=s.querySelector(`h3[id="id_173_date_${a.replace(/-/g,"_")}"]`);if(!l){const u=document.createElement("li");u.setAttribute("aria-labelledby",`id_173_date_${a.replace(/-/g,"_")}`),u.setAttribute("tabindex","0");const _=new Date(a).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"}),$=document.createElement("h3");$.id=`id_173_date_${a.replace(/-/g,"_")}`,$.innerHTML=`<span>Pour</span> ${_}`,u.appendChild($);const m=document.createElement("ul");m.className="sub-liste cols",u.appendChild(m),s.appendChild(u),l=$}const f=(n=l.parentElement)==null?void 0:n.querySelector("ul.sub-liste");if(!f){console.error("Sub-list not found for date:",a);continue}i[a].forEach(u=>{const S=document.createElement("li");S.setAttribute("aria-labelledby",`id_173_date_${a.replace(/-/g,"_")}`),S.style.setProperty("--couleur-matiere",u.color||"#000000");const _=`
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
      `;S.innerHTML=_,f.appendChild(S)})}}console.log("hi");export{Y as renderCustomHomework};
