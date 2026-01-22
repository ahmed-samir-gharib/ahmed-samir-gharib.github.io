
(function(){
  // Theme toggle
  const html = document.documentElement;
  const btn = document.getElementById('btnTheme');
  if(btn){
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      btn.innerHTML = next === 'dark' ? '<i class="bi bi-moon-stars"></i>' : '<i class="bi bi-brightness-high"></i>';
    });
  }

  // Demo: add asset to "Selected" list (handover-new.html)
  const table = document.getElementById('tblAssets');
  const selected = document.getElementById('selectedList');
  if(table && selected){
    table.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON'){
        const row = e.target.closest('tr');
        const tag = row.children[0].innerText;
        const model = row.children[1].innerText;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center bg-transparent text-white';
        li.innerHTML = `<span><strong>${tag}</strong> — ${model}</span><button class="btn btn-xs btn-outline-light">Remove</button>`;
        selected.appendChild(li);
        e.target.disabled = true;
        li.querySelector('button').addEventListener('click', () => {
          selected.removeChild(li);
          e.target.disabled = false;
        }, { once:true });
      }
    });
  }
})();
