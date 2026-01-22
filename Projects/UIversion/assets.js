
/* ---------- Demo lookup data (UI-only) ---------- */
const _types = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Monitor' },
  { id: 3, name: 'Tablet' },
  { id: 4, name: 'Rugged' }
];

const _models = [
  { id: 1, name: 'T14', manufacturer: 'Lenovo', typeId: 1 },
  { id: 2, name: 'Latitude 5420', manufacturer: 'Dell', typeId: 1 },
  { id: 3, name: 'P2419H', manufacturer: 'Dell', typeId: 2 },
  { id: 4, name: 'iPad 9th', manufacturer: 'Apple', typeId: 3 },
  { id: 5, name: 'TOUGHBOOK 55', manufacturer: 'Panasonic', typeId: 4 }
];

const _departments = [
  { id: 1, name: 'Logistics' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'IT' },
  { id: 4, name: 'HR' }
];

const _locations = [
  { id: 1, name: 'HQ - Tower A' },
  { id: 2, name: 'HQ - Tower B' },
  { id: 3, name: 'DC - Riyadh' }
];

const _assets = [
  { id: 1, assetTag: 'AST-001234', serial: 'S12345', typeId: 1, modelId: 1, departmentId: 3, locationId: 3, status: 'InStock',  notes: '', purchaseDate: '2025-10-01', warrantyMonths: 24 },
  { id: 2, assetTag: 'AST-001235', serial: 'S12346', typeId: 2, modelId: 3, departmentId: 2, locationId: 1, status: 'Assigned', notes: 'Issued to Finance', purchaseDate: '2025-05-15', warrantyMonths: 36 },
  { id: 3, assetTag: 'AST-001236', serial: 'S12347', typeId: 3, modelId: 4, departmentId: 1, locationId: 2, status: 'Returned', notes: 'Pending QC', purchaseDate: '2024-12-20', warrantyMonths: 12 },
  { id: 4, assetTag: 'AST-001237', serial: 'S12348', typeId: 4, modelId: 5, departmentId: 1, locationId: 2, status: 'Repair',   notes: 'RMA opened', purchaseDate: '2023-11-03', warrantyMonths: 36 },
  { id: 5, assetTag: 'AST-001238', serial: 'S12349', typeId: 1, modelId: 2, departmentId: 4, locationId: 1, status: 'Retired',  notes: 'Old device', purchaseDate: '2021-08-12', warrantyMonths: 12 }
];

/* ---------- Helpers ---------- */
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
function typeNameById(id){ const t=_types.find(x=>x.id===id); return t? t.name:'—'; }
function modelNameById(id){ const m=_models.find(x=>x.id===id); return m? `${m.manufacturer} ${m.name}`:'—'; }
function deptNameById(id){ const d=_departments.find(x=>x.id===id); return d? d.name:'—'; }
function locNameById(id){ const l=_locations.find(x=>x.id===id); return l? l.name:'—'; }

/* ---------- DOM refs ---------- */
const tbody = document.querySelector('#tblAssets tbody');
const countBadge = document.getElementById('assetCount');
const txtSearch = document.getElementById('txtSearchAssets');
const ddlStatus = document.getElementById('ddlAssetStatus');
const ddlType   = document.getElementById('ddlAssetType');
const ddlDept   = document.getElementById('ddlAssetDept');
const ddlLoc    = document.getElementById('ddlAssetLoc');

/* ---------- Init filter dropdowns ---------- */
(function initFilters(){
  // Types
  _types.forEach(t=>{
    const o=document.createElement('option'); o.value=t.id; o.textContent=t.name; ddlType.appendChild(o);
  });
  // Departments
  _departments.forEach(d=>{
    const o=document.createElement('option'); o.value=d.id; o.textContent=d.name; ddlDept.appendChild(o);
  });
  // Locations
  _locations.forEach(l=>{
    const o=document.createElement('option'); o.value=l.id; o.textContent=l.name; ddlLoc.appendChild(o);
  });
})();

/* ---------- Render ---------- */
function statusPillCls(s){ return `status-pill status-${s}`; }

function renderAssetRows(list){
  tbody.innerHTML='';
  list.forEach(a=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td><i class="bi bi-hdd text-primary"></i></td>
      <td><strong>${escapeHtml(a.assetTag)}</strong><br><small class="text-secondary">${escapeHtml(a.notes)}</small></td>
      <td>${escapeHtml(modelNameById(a.modelId))}</td>
      <td>${escapeHtml(a.serial || '—')}</td>
      <td>${escapeHtml(typeNameById(a.typeId))}</td>
      <td>${escapeHtml(deptNameById(a.departmentId))}</td>
      <td><span class="${statusPillCls(a.status)}">${a.status}</span></td>
      <td class="text-end">
        <div class="btn-group btn-group-sm">
          view<i class="bi bi-eye"></i></button>
          <button class="bi bi-upc"></i></button>
          delete<i class="bi bi-trash3"></i></button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
  countBadge.textContent=list.length;
}

/* ---------- Filter ---------- */
function filterAssets(){
  const q = (txtSearch.value || '').trim().toLowerCase();
  const st = ddlStatus.value || '';
  const t  = ddlType.value ? +ddlType.value : null;
  const d  = ddlDept.value ? +ddlDept.value : null;
  const l  = ddlLoc.value  ? +ddlLoc.value  : null;

  let list = _assets.slice();
  if (st) list = list.filter(x => x.status === st);
  if (t)  list = list.filter(x => x.typeId === t);
  if (d)  list = list.filter(x => x.departmentId === d);
  if (l)  list = list.filter(x => x.locationId === l);

  if (q) {
    list = list.filter(x =>
      (x.assetTag || '').toLowerCase().includes(q) ||
      (x.serial || '').toLowerCase().includes(q) ||
      modelNameById(x.modelId).toLowerCase().includes(q) ||
      typeNameById(x.typeId).toLowerCase().includes(q)
    );
  }
  renderAssetRows(list);
}
[txtSearch, ddlStatus, ddlType, ddlDept, ddlLoc].forEach(el => el && el.addEventListener('input', filterAssets));
[ddlStatus, ddlType, ddlDept, ddlLoc].forEach(el => el && el.addEventListener('change', filterAssets));

/* ---------- View & Label ---------- */
function openViewForAsset(a){
  document.getElementById('vAssetTag').textContent = a.assetTag;
  document.getElementById('vModel').textContent    = modelNameById(a.modelId);
  document.getElementById('vSerial').textContent   = a.serial || '—';
  document.getElementById('vType').textContent     = typeNameById(a.typeId);
  document.getElementById('vDept').textContent     = deptNameById(a.departmentId);
  document.getElementById('vStatus').textContent   = a.status;
  document.getElementById('vLocation').textContent = locNameById(a.locationId);
  document.getElementById('vNotes').textContent    = a.notes || '—';

  const url = `https://example.local/assets/view/${a.id}`;
  document.getElementById('vAssetUrl').textContent = url;

  // QR preview
  const box = document.getElementById('vQrBox');
  box.innerHTML = '';
  const canvas = document.createElement('canvas');
  box.appendChild(canvas);
  QRCode.toCanvas(canvas, url, { width: 120, margin: 1 });

  const modal = new bootstrap.Modal('#dlgViewAsset');
  modal.show();

  document.getElementById('btnFromViewPrint').onclick = () => openLabelForAsset(a);
}

function openLabelForAsset(a){
  document.getElementById('lblAssetTag').textContent = a.assetTag;
  document.getElementById('lblModel').textContent    = 'Model: ' + modelNameById(a.modelId);
  document.getElementById('lblSerial').textContent   = 'Serial: ' + (a.serial || '—');
  document.getElementById('lblDept').textContent     = 'Dept: ' + deptNameById(a.departmentId);

  // QR (short URL)
  const labelQr = document.getElementById('qrCanvas');
  labelQr.innerHTML = '';
  const canvas = document.createElement('canvas');
  labelQr.appendChild(canvas);
  const url = `https://example.local/a/${a.id}`;
  QRCode.toCanvas(canvas, url, { width: 120, margin: 0 });

  // Barcode (AssetTag)
  JsBarcode('#barcode', a.assetTag, { format:'CODE128', width:1, height:48, displayValue:false, margin:0 });

  new bootstrap.Modal('#dlgLabel').show();
}

// Print only label area (CSS handles print scoping)
document.getElementById('btnPrintLabel')?.addEventListener('click', () => {
  window.print();
});

/* ---------- Row actions ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = +btn.dataset.id;
  const a = _assets.find(x => x.id === id);
  if (!a) return;

  const action = btn.dataset.action;
  if (action === 'view') {
    openViewForAsset(a);
  } else if (action === 'label') {
    openLabelForAsset(a);
  } else if (action === 'delete') {
    if (confirm(`Delete ${a.assetTag}? This cannot be undone.`)) {
      const i = _assets.findIndex(x => x.id === id);
      if (i >= 0) _assets.splice(i,1);
      filterAssets();
    }
  }
});

/* ---------- New Asset modal ---------- */
function fillNewAssetDropdowns(){
  const f = document.getElementById('frmNewAsset');
  if (!f) return;
  const selType=f.TypeId, selModel=f.ModelId, selDept=f.DepartmentId, selLoc=f.LocationId;

  // Type
  selType.innerHTML='';
  _types.forEach(t=>{
    const o=document.createElement('option'); o.value=t.id; o.textContent=t.name; selType.appendChild(o);
  });

  // Model filtered by type
  function refreshModels(){
    const typeId = +selType.value || null;
    selModel.innerHTML='';
    _models.filter(m => !typeId || m.typeId===typeId).forEach(m=>{
      const o=document.createElement('option');
      o.value=m.id; o.textContent=`${m.manufacturer} ${m.name}`; selModel.appendChild(o);
    });
  }
  selType.removeEventListener('change', refreshModels); // avoid dup
  selType.addEventListener('change', refreshModels);
  refreshModels();

  // Dept
  selDept.innerHTML='<option value="">—</option>';
  _departments.forEach(d=>{
    const o=document.createElement('option'); o.value=d.id; o.textContent=d.name; selDept.appendChild(o);
  });

  // Location
  selLoc.innerHTML='<option value="">—</option>';
  _locations.forEach(l=>{
    const o=document.createElement('option'); o.value=l.id; o.textContent=l.name; selLoc.appendChild(o);
  });
}

// open modal: ensure dropdowns ready
document.querySelector('[data-bs-target="#dlgNewAsset"]')?.addEventListener('click', fillNewAssetDropdowns);

// save new asset (UI only)
document.getElementById('btnSaveNewAsset')?.addEventListener('click', () => {
  const f = document.getElementById('frmNewAsset');
  if (!f.checkValidity()){ f.reportValidity(); return; }

  const nextId = _assets.length ? Math.max(..._assets.map(x => x.id)) + 1 : 1;

  const newAsset = {
    id: nextId,
    assetTag: f.AssetTag.value.trim(),
    serial: f.Serial.value.trim(),
    typeId: +f.TypeId.value,
    modelId: +f.ModelId.value,
    departmentId: f.DepartmentId.value ? +f.DepartmentId.value : null,
    locationId:  f.LocationId.value  ? +f.LocationId.value  : null,
    status: f.Status.value,
    purchaseDate: f.PurchaseDate.value || null,
    warrantyMonths: f.WarrantyMonths.value ? +f.WarrantyMonths.value : null,
    notes: f.Notes.value.trim()
  };

  _assets.unshift(newAsset);
  bootstrap.Modal.getInstance(document.getElementById('dlgNewAsset'))?.hide();
  f.reset();

  filterAssets();

  // Optional: go straight to label
  if (document.getElementById('chkLabelAfterCreate').checked) {
    openLabelForAsset(newAsset);
  }
});

/* ---------- Initial render ---------- */
filterAssets();
