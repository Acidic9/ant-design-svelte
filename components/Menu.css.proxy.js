// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".full-height-menu{height:100%;width:100%}@media(min-width: 772px){.full-height-menu{height:calc(100vh - 100px);overflow-y:hidden;position:sticky;top:0}.full-height-menu:hover{overflow-y:scroll;border-right:none}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}