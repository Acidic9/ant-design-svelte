// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@media screen and (max-width: 575px){.ant-col-xs-0.svelte-x2c1kt{display:none}}@media screen and (max-width: 767px){.ant-col-sm-0.svelte-x2c1kt{display:none}}@media screen and (max-width: 991px){.ant-col-md-0.svelte-x2c1kt{display:none}}@media screen and (max-width: 1199px){.ant-col-lg-0.svelte-x2c1kt{display:none}}@media screen and (max-width: 1599px){.ant-col-xl-0.svelte-x2c1kt{display:none}}@media screen and (min-width: 1600px){.ant-col-xxl-0.svelte-x2c1kt{display:none}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}