
/* ---------- Demo master data (UI-only) ---------- */
const _itemTypes = [
  { id: 1, name: 'Laptop'  },
  { id: 2, name: 'Monitor' },
  { id: 3, name: 'Tablet'  },
  { id: 4, name: 'Rugged'  }
];

/* Demo models */
let _models = [
  { id: 1, name: 'T14', manufacturer: 'Lenovo',    itemTypeId: 1, warrantyMonths: 24, sku: '20W0', active: true,  iconKind:'bi',  iconValue:'bi-laptop', notes:'14" business laptop' },
  { id: 2, name: 'Latitude 5420', manufacturer:'Dell',      itemTypeId: 1, warrantyMonths: 36, sku: 'LAT5420', active: true,  iconKind:'bi',  iconValue:'bi-laptop', notes:'' },
  { id: 3, name: 'P2419H', manufacturer: 'Dell',    itemTypeId: 2, warrantyMonths: 36, sku: 'P2419H', active: true,  iconKind:'bi',  iconValue:'bi-display', notes:'24" FHD IPS' },
  { id: 4, name: 'iPad 9th', manufacturer: 'Apple', itemTypeId: 3, warrantyMonths: 12, sku: 'A2602',  active: true,  iconKind:'bi',  iconValue:'bi-tablet', notes:'' },
  { id: 5, name: 'TOUGHBOOK 55', manufacturer:'Panasonic', itemTypeId: 4, warrantyMonths: 24, sku: 'FZ-55',  active: false, iconKind:'bi',  iconValue:'bi-shield', notes:'Rugged' }
];

/* Curated Bootstrap icon list */
const ICONS = [
  'bi-laptop','bi-laptop-fill','bi-display','bi-tablet','bi-phone','bi-cpu','bi-hdd',
  'bi-ssd','bi-gpu-card','bi-keyboard','bi-mouse','bi-printer','bi-router','bi-wifi',
  'bi-camera-video','bi-headset','bi-battery-half','bi-gear','bi-shield','bi-box-seam',
  'bi-qr-code','bi-upc'
];

/* ---------- DOM refs ---------- */
const tbody = document.querySelector('#tblModels tbody');
const countBadge = document.getElementById('modelsCount');

const txtSearch = document.getElementById('txtSearchModels');
const ddlTypeFilter = document.getElementById('ddlTypeFilter');
const ddlMfrFilter  = document.getElementById('ddlMfrFilter');
const ddlActive     = document.getElementById('ddlActiveFilter');

/* Add form */
const frmAdd = document.getElementById('frmAddModel');
const iconPrevAdd = document.getElementById('iconPreviewAdd');
const fileImgAdd  = document.getElementById('fileImgAdd');
const btnSaveAdd  = document.getElementById('btnSaveAddModel');

/* Edit form */
const frmEdit = document.getElementById('frmEditModel');
const iconPrevEdit = document.getElementById('iconPreviewEdit');
const fileImgEdit  = document.getElementById('fileImgEdit');
const btnSaveEdit  = document.getElementById('btnSaveEditModel');

/* Delete confirmation */
const delName = document.getElementById('delModelName');
const btnConfirmDelete = document.getElementById('btnConfirmDeleteModel');

/* Icon picker */
const iconGrid = document.getElementById('iconGrid');
let iconPickerMode = 'add';

/* ---------- State ---------- */
let filterText = '';
let filterType = '';
let filterMfr  = '';
let filterActive = '';

/* ---------- Helpers ---------- */
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
function typeNameById(id){ const t=_itemTypes.find(x=>x.id===id); return t? t.name:'—'; }
function renderIconCell(kind, value) {
  if (kind === 'img' && value) return `<div class="icon-preview">${escapeHtml(value)}</div>`;
  return `<div class="icon-preview"><i class="bi ${escapeHtml(value || 'bi-cpu')}"></i></div>`;
}

/* ---------- Init filters (types, manufacturers) ---------- */
(function initFilters(){
  // Types
  _itemTypes.forEach(t => {
    const o=document.createElement('option'); o.value=t.id; o.textContent=t.name; ddlTypeFilter.appendChild(o);
  });
  // Manufacturers (unique from models)
  refreshManufacturerFilter();
  // Icon grid
  renderIconGrid();
  // Add/Edit dropdown (Item Type)
  const addSel = frmAdd.querySelector('select[name="ItemTypeId"]');
  const editSel = frmEdit.querySelector('select[name="ItemTypeId"]');
  [addSel, editSel].forEach(sel => {
    sel.innerHTML = '';
    _itemTypes.forEach(t => {
      const o = document.createElement('option'); o.value=t.id; o.textContent=t.name; sel.appendChild(o);
    });
  });
})();

function refreshManufacturerFilter(){
  const mfrs = Array.from(new Set(_models.map(m => (m.manufacturer || '').trim()).filter(Boolean))).sort();
  ddlMfrFilter.innerHTML = '<option value="">All Manufacturers</option>';
  mfrs.forEach(m => {
    const o = document.createElement('option'); o.value=m; o.textContent=m; ddlMfrFilter.appendChild(o);
  });
}

function renderIconGrid(){
  iconGrid.innerHTML = '';
  ICONS.forEach(name => {
    const col = document.createElement('div');
    col.className = 'col-2 col-md-1 d-flex justify-content-center';
    col.innerHTML = `<div class="icon-btn" data-icon="${name}"><i class="bi ${name}" style="font-size:22px;"></i></div>`;
    iconGrid.appendChild(col);
  });
}

/* ---------- Render ---------- */
function renderRows(){
  const list = _models.filter(m => {
    const text = `${m.name} ${m.manufacturer} ${m.sku} ${m.notes}`.toLowerCase();
    const mt = !filterText || text.includes(filterText);
    const ty = !filterType || String(m.itemTypeId) === filterType;
    const mf = !filterMfr  || m.manufacturer === filterMfr;
    const ac = !filterActive || (filterActive==='active' ? m.active : !m.active);
    return mt && ty && mf && ac;
  });

  tbody.innerHTML='';
  list.forEach(m=>{
    const tr=document.createElement('tr');
    tr.innerHTML = `
      <td>${renderIconCell(m.iconKind, m.iconValue)}</td>
      <td>
        <strong>${escapeHtml(m.name)}</strong><br>
        <small class="text-secondary">${escapeHtml(m.notes || '')}</small>
      </td>
      <td>${escapeHtml(m.manufacturer)}</td>
      <td>${escapeHtml(typeNameById(m.itemTypeId))}</td>
      <td>${m.warrantyMonths ?? 0}</td>
      <td>${escapeHtml(m.sku || '—')}</td>
      <td>${m.active ? '<span class="badge bg-success">Active</span>' : '<span class="badge bg-secondary">Inactive</span>'}</td>
      <td class="text-end">
        <div class="btn-group btn-group-sm">
          edit<i class="bi bi-pencil-square"></i></button>
          delete<i class="bi bi-trash3"></i></button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
  countBadge.textContent = list.length;
}

/* ---------- Filter events ---------- */
txtSearch.addEventListener('input', () => { filterText = (txtSearch.value||'').trim().toLowerCase(); renderRows(); });
ddlTypeFilter.addEventListener('change', () => { filterType = ddlTypeFilter.value; renderRows(); });
ddlMfrFilter.addEventListener('change', () => { filterMfr  = ddlMfrFilter.value; renderRows(); });
ddlActive.addEventListener('change', () => { filterActive = ddlActive.value; renderRows(); });

/* ---------- Icon picker open mode ---------- */
document.querySelectorAll('[data-bs-target="#dlgIconPicker"]').forEach(btn=>{
  btn.addEventListener('click', ()=>{ iconPickerMode = btn.dataset.mode || 'add'; });
});

/* Pick icon */
iconGrid.addEventListener('click', (e)=>{
  const btn = e.target.closest('.icon-btn'); if(!btn) return;
  const iconName = btn.dataset.icon;
  if (iconPickerMode==='add'){
    frmAdd.IconKind.value='bi'; frmAdd.IconValue.value=iconName;
    iconPrevAdd.innerHTML = `<i class="bi ${iconName}"></i>`;
  } else {
    frmEdit.IconKind.value='bi'; frmEdit.IconValue.value=iconName;
    iconPrevEdit.innerHTML = `<i class="bi ${iconName}"></i>`;
  }
});

/* ---------- File (image) inputs ---------- */
function handleImageInput(fileInput, form, previewDiv){
  fileInput.addEventListener('change', ()=>{
    const f = fileInput.files?.[0]; if(!f) return;
    const url = URL.createObjectURL(f);
    form.IconKind.value = 'img';
    form.IconValue.value = url;     // UI-only preview
    previewDiv.innerHTML = `${url}`;
  });
}
handleImageInput(fileImgAdd, frmAdd, iconPrevAdd);
handleImageInput(fileImgEdit, frmEdit, iconPrevEdit);

/* ---------- Add Model ---------- */
btnSaveAdd.addEventListener('click', ()=>{
  if(!frmAdd.checkValidity()){ frmAdd.reportValidity(); return; }

  // Optional: ensure (manufacturer+name) unique in UI demo
  const name = frmAdd.Name.value.trim();
  const manu = frmAdd.Manufacturer.value.trim();
  if (_models.some(m => m.name.toLowerCase()===name.toLowerCase() && m.manufacturer.toLowerCase()===manu.toLowerCase())){
    alert('A model with the same name and manufacturer already exists.');
    return;
  }

  const nextId = _models.length ? Math.max(..._models.map(x=>x.id))+1 : 1;
  const m = {
    id: nextId,
    name,
    manufacturer: manu,
    itemTypeId: +frmAdd.ItemTypeId.value,
    warrantyMonths: frmAdd.WarrantyMonths.value ? +frmAdd.WarrantyMonths.value : 0,
    sku: frmAdd.Sku.value.trim(),
    notes: frmAdd.Notes.value.trim(),
    active: document.getElementById('chkActiveAdd').checked,
    iconKind: frmAdd.IconKind.value || 'bi',
    iconValue: frmAdd.IconValue.value || 'bi-cpu'
  };
  _models.unshift(m);
  // Reset
  bootstrap.Modal.getInstance(document.getElementById('dlgAddModel'))?.hide();
  frmAdd.reset();
  frmAdd.IconKind.value='bi'; frmAdd.IconValue.value='bi-cpu';
  iconPrevAdd.innerHTML = `<i class="bi bi-cpu"></i>`;
  document.getElementById('chkActiveAdd').checked = true;

  refreshManufacturerFilter();
  renderRows();
});

/* ---------- Edit Model ---------- */
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-action="edit"]'); if(!btn) return;
  const id = +btn.dataset.id;
  const m = _models.find(x=>x.id===id); if(!m) return;

  frmEdit.ModelId.value = m.id;
  frmEdit.Name.value = m.name;
  frmEdit.Manufacturer.value = m.manufacturer;
  frmEdit.ItemTypeId.value = m.itemTypeId;
  frmEdit.WarrantyMonths.value = m.warrantyMonths ?? 0;
  frmEdit.Sku.value = m.sku || '';
  frmEdit.Notes.value = m.notes || '';
  document.getElementById('chkActiveEdit').checked = !!m.active;
  frmEdit.IconKind.value = m.iconKind || 'bi';
  frmEdit.IconValue.value = m.iconValue || 'bi-cpu';
  iconPrevEdit.innerHTML = (m.iconKind==='img' && m.iconValue)
    ? `${escapeHtml(m.iconValue)}`
    : `<i class="bi ${escapeHtml(m.iconValue || 'bi-cpu')}"></i>`;

  new bootstrap.Modal('#dlgEditModel').show();
});

btnSaveEdit.addEventListener('click', ()=>{
  if(!frmEdit.checkValidity()){ frmEdit.reportValidity(); return; }
  const id = +frmEdit.ModelId.value;
  const m = _models.find(x=>x.id===id); if(!m) return;

  // Optional: uniqueness check
  const name = frmEdit.Name.value.trim();
  const manu = frmEdit.Manufacturer.value.trim();
  if (_models.some(x => x.id!==id && x.name.toLowerCase()===name.toLowerCase() && x.manufacturer.toLowerCase()===manu.toLowerCase())){
    alert('A model with the same name and manufacturer already exists.');
    return;
  }

  m.name = name;
  m.manufacturer = manu;
  m.itemTypeId = +frmEdit.ItemTypeId.value;
  m.warrantyMonths = frmEdit.WarrantyMonths.value ? +frmEdit.WarrantyMonths.value : 0;
  m.sku = frmEdit.Sku.value.trim();
  m.notes = frmEdit.Notes.value.trim();
  m.active = document.getElementById('chkActiveEdit').checked;
  m.iconKind = frmEdit.IconKind.value || 'bi';
  m.iconValue = frmEdit.IconValue.value || 'bi-cpu';

  bootstrap.Modal.getInstance(document.getElementById('dlgEditModel'))?.hide();
  refreshManufacturerFilter();
  renderRows();
});

/* ---------- Delete Model ---------- */
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-action="delete"]'); if(!btn) return;
  const id = +btn.dataset.id;
  const name = btn.dataset.name || 'this model';
  delName.textContent = name;
  btnConfirmDelete.dataset.id = id;
  new bootstrap.Modal('#dlgDeleteModel').show();
});

btnConfirmDelete.addEventListener('click', (e)=>{
  const id = +e.currentTarget.dataset.id;
  const idx = _models.findIndex(x=>x.id===id);
  if(idx>=0) _models.splice(idx,1);
  bootstrap.Modal.getInstance(document.getElementById('dlgDeleteModel'))?.hide();
  refreshManufacturerFilter();
  renderRows();
});

/* ---------- Initial render ---------- */
renderRows();
