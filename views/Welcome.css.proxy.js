// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".fusion-container.svelte-zbobmt{width:100%;display:flex;align-items:center;justify-content:center}.fusion.svelte-zbobmt{width:100%;max-width:600px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}