// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".demo-header{color:#000;background:#fff;box-shadow:0 2px 8px #f0f1f2;padding:0 22px;margin-bottom:12px}.demo-header > h1 > span:first-child{font-size:14px}body > div > .ant-layout, body > div > .ant-layout > .ant-layout{background:#fff}body > div > .ant-layout > .ant-layout:nth-child(2){min-height:inherit}.demo-content.svelte-jgntho{padding:20px 72px;min-height:calc(100vh - 80px)}.demo-logo.svelte-jgntho{position:relative;top:-1.5px;height:32px;margin-right:10px}.main-layout{overflow-y:scroll;max-height:100vh}@media(min-width: 772px){.demo-content.svelte-jgntho{max-height:calc(100vh - 78px);overflow-y:scroll}.main-layout.svelte-jgntho{overflow-y:hidden}body > div > .ant-layout > .ant-layout:nth-child(2){min-height:calc(100vh - 64px)}}@media(max-width: 772px){.demo-content.svelte-jgntho{padding:20px 32px}}@media(max-width: 500px){.demo-content.svelte-jgntho{padding:20px 24px}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}