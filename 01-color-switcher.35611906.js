const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body,r=document.createElement("div");r.classList.add("btn-wrapper"),t.before(r),r.append(t,e),t.addEventListener("click",(function(){a=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),e.removeAttribute("disabled"),t.setAttribute("disabled",!0)})),e.addEventListener("click",(function(){clearInterval(a),e.setAttribute("disabled",!0),t.removeAttribute("disabled")})),e.setAttribute("disabled",!0);let a=null;
//# sourceMappingURL=01-color-switcher.35611906.js.map
