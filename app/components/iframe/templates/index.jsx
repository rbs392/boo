const style = 'font-weight: 100;font-size:14px;background:#666;';

const popup = (x, y, attrs) => {
  let lis = '';
  $.each(attrs, (i, attr) => {
    console.log(attr)
    lis += `<li class="boo-el">${attr.name}</li>`;
  });
  return `
  <div class="boo-el" id="selector-popup" 
      style="${style}position:fixed;left:${x}px;top:${y + 10}px;width:100px;height:100px;border:1px solid black;"
    >
    <ul class="boo-el">${lis}</ul>
    </div> 
  `;
};

const selectorinfo = selector => `
  <span class="boo-el" id="selector-info" style="${style}position:fixed;right:0px;bottom:0px">${selector}</span>`;

export {
  popup,
  selectorinfo,
};
