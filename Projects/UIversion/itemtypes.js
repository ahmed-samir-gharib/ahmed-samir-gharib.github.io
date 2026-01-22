
/* ---------- Demo data (UI-only) ---------- */
const _itemTypes = [
  { id: 1, name: 'Laptop',  iconKind: 'bi',  iconValue: 'bi-laptop',  color: '#0ea5ff', description: 'Notebook / Ultrabook', active: true,  modelsCount: 2, assetsCount: 620 },
  { id: 2, name: 'Monitor', iconKind: 'bi',  iconValue: 'bi-display', color: '#22c55e', description: 'External displays',   active: true,  modelsCount: 1, assetsCount: 410 },
  { id: 3, name: 'Tablet',  iconKind: 'bi',  iconValue: 'bi-tablet',  color: '#f59e0b', description: 'iPad / Android',     active: true,  modelsCount: 1, assetsCount: 165 },
  { id: 4, name: 'Rugged',  iconKind: 'bi',  iconValue: 'bi-shield',  color: '#ec4899', description: 'Rugged devices',     active: false, modelsCount: 1, assetsCount: 42 }
];

/* Curated Bootstrap icon list for picker (add more anytime) */
const ICONS = [
  'bi-laptop','bi-laptop-fill','bi-display','bi-displayport','bi-tablet','bi-phone',
  'bi-cpu','bi-gpu-card','bi-hdd','bi-ssd','bi-usb-c','bi-keyboard','bi-mouse',
  'bi-printer','bi-router','bi-wifi','bi-camera-video','bi-headset','bi-battery-half',
  'bi-gear','bi-shield','bi-box-seam','bi-qr-code','bi-upc'
];

/* ---------- DOM refs ---------- */
const tbody = document.querySelector('#tblTypes tbody');
const countBadge = document.getElementById('typesCount');
const txtSearch = document.getElementById('txtSearchTypes');
const ddlActive = document.getElementById('ddlActiveFilter');

// Add form
const frmAdd = document.getElementById('frmAddType');
const iconPrevAdd = document.getElementById('iconPreviewAdd');
const fileIconAdd = document.getElementById('fileIconAdd');
const btnSaveAdd = document.getElementById('btnSaveAddType');

// Edit form
const frmEdit = document.getElementById('frmEditType');
const iconPrevEdit = document.getElementById('iconPreviewEdit');
const fileIconEdit = document.getElementById('fileIconEdit');
const btnSaveEdit = document.getElementById('btnSaveEditType');

// Delete
const delName = document.getElementById('delTypeName');
const btnConfirmDelete = document.getElementById('btnConfirmDeleteType');

// Icon picker
const iconGrid = document.getElementById('iconGrid');
let iconPickerMode = 'add'; // or 'edit'

/* ---------- State ---------- */
let types = _itemTypes.slice(); // copy for UI
let filterText = '';
let filterActive = '';

/* ---------- Helpers ---------- */
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function renderIconCell(kind, value, color) {
  if (kind === 'img' && value) {
    return `<div class="icon-preview" title="Custom icon">${escapeHtml(value)}</div>`;
  }
  // default to Bootstrap icon
  return `<div class="icon-preview" title="${escapeHtml(value || 'bi-laptop')}"><i class="bi ${escapeHtml(value || 'bi-laptop')}" style="color:${escapeHtml(color || '#fff')}"></i></div>`;
}

function renderColorPill(color) {
  const text = color?.toUpperCase() || '#FFFFFF';
  return `<span class="color-pill" style="background:${escapeHtml(color || '#ffffff')}">${escapeHtml(text)}</span>`;
}

/* ---------- Render ---------- */
function renderRows() {
  const list = types.filter(t => {
    const mt = (t.name || '').toLowerCase().includes(filterText);
    const ma = !filterActive
      || (filterActive === 'active' && t.active)
      || (filterActive === 'inactive' && !t.active);
    return mt && ma;
  });

  tbody.innerHTML = '';
  list.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${renderIconCell(t.iconKind, t.iconValue, t.color)}</td>
      <td>
        <strong>${escapeHtml(t.name)}</strong><br>
        <small class="text-secondary">${escapeHtml(t.description || '')}</small>
      </td>
      <td>${renderColorPill(t.color)}</td>
      <td>${t.modelsCount ?? 0}</td>
      <td>${t.assetsCount ?? 0}</td>
      <td>${t.active ? '<span class="badge bg-success">Active</span>' : '<span class="badge bg-secondary">Inactive</span>'}</td>
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

/* ---------- Filters ---------- */
txtSearch.addEventListener('input', () => {
  filterText = (txtSearch.value || '').trim().toLowerCase();
  renderRows();
});
ddlActive.addEventListener('change', () => {
  filterActive = ddlActive.value;
  renderRows();
});

/* ---------- Icon Picker ---------- */
function renderIconGrid() {
  iconGrid.innerHTML = '';
  ICONS.forEach(name => {
    const col = document.createElement('div');
    col.className = 'col-2 col-md-1 d-flex justify-content-center';
    col.innerHTML = `<div class="icon-btn" data-icon="${name}"><i class="bi ${name}" style="font-size:22px;"></i></div>`;
    iconGrid.appendChild(col);
  });
}
renderIconGrid();

// Decide which form to update when opening picker
document.querySelectorAll('[data-bs-target="#dlgIconPicker"]').forEach(btn => {
  btn.addEventListener('click', () => {
    iconPickerMode = btn.dataset.mode || 'add';
  });
});

// Pick icon
iconGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.icon-btn');
  if (!btn) return;
  const iconName = btn.dataset.icon;
  if (iconPickerMode === 'add') {
    frmAdd.IconKind.value = 'bi';
    frmAdd.IconValue.value = iconName;
    iconPrevAdd.innerHTML = `<i class="bi ${iconName}"></i>`;
  } else {
    frmEdit.IconKind.value = 'bi';
    frmEdit.IconValue.value = iconName;
    iconPrevEdit.innerHTML = `<i class="bi ${iconName}"></i>`;
  }
});

/* ---------- File input (custom icon) ---------- */
function handleFileInput(fileInput, form, previewDiv) {
  fileInput.addEventListener('change', () => {
    const f = fileInput.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    form.IconKind.value = 'img';
    form.IconValue.value = url; // UI-only preview
    previewDiv.innerHTML = `${url}`;
  });
}
handleFileInput(fileIconAdd, frmAdd, iconPrevAdd);
handleFileInput(fileIconEdit, frmEdit, iconPrevEdit);

/* ---------- Add ---------- */
btnSaveAdd.addEventListener('click', () => {
  if (!frmAdd.checkValidity()) { frmAdd.reportValidity(); return; }
  const nextId = types.length ? Math.max(...types.map(x => x.id)) + 1 : 1;
  const t = {
    id: nextId,
    name: frmAdd.Name.value.trim(),
    description: frmAdd.Description.value.trim(),
    color: frmAdd.Color.value || '#ffffff',
    iconKind: frmAdd.IconKind.value || 'bi',
    iconValue: frmAdd.IconValue.value || 'bi-laptop',
    active: document.getElementById('chkActiveAdd').checked,
    modelsCount: 0,
    assetsCount: 0
  };
  types.unshift(t);
  bootstrap.Modal.getInstance(document.getElementById('dlgAddType'))?.hide();
  frmAdd.reset();
  // restore defaults
  frmAdd.Color.value = '#0ea5ff';
  frmAdd.IconKind.value = 'bi';
  frmAdd.IconValue.value = 'bi-laptop';
  iconPrevAdd.innerHTML = `<i class="bi bi-laptop"></i>`;
  document.getElementById('chkActiveAdd').checked = true;
  renderRows();
});

/* ---------- Edit ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="edit"]');
  if (!btn) return;
  const id = +btn.dataset.id;
  const t = types.find(x => x.id === id);
  if (!t) return;

  frmEdit.TypeId.value = t.id;
  frmEdit.Name.value = t.name;
  frmEdit.Description.value = t.description || '';
  frmEdit.Color.value = t.color || '#ffffff';
  frmEdit.IconKind.value = t.iconKind || 'bi';
  frmEdit.IconValue.value = t.iconValue || 'bi-laptop';
  document.getElementById('chkActiveEdit').checked = !!t.active;
  iconPrevEdit.innerHTML = (t.iconKind === 'img' && t.iconValue)
    ? `<{escapeHtml(t.iconValue)}`
    : `<i class="bi ${escapeHtml(t.iconValue || 'bi-laptop')}"></i>`;

  new bootstrap.Modal('#dlgEditType').show();
});

btnSaveEdit.addEventListener('click', () => {
  if (!frmEdit.checkValidity()) { frmEdit.reportValidity(); return; }
  const id = +frmEdit.TypeId.value;
  const t = types.find(x => x.id === id);
  if (!t) return;

  t.name = frmEdit.Name.value.trim();
  t.description = frmEdit.Description.value.trim();
  t.color = frmEdit.Color.value || '#ffffff';
  t.iconKind = frmEdit.IconKind.value || 'bi';
  t.iconValue = frmEdit.IconValue.value || 'bi-laptop';
  t.active = document.getElementById('chkActiveEdit').checked;

  bootstrap.Modal.getInstance(document.getElementById('dlgEditType'))?.hide();
  renderRows();
});

/* ---------- Delete ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="delete"]');
  if (!btn) return;
  const id = +btn.dataset.id;
  const name = btn.dataset.name || 'this type';
  delName.textContent = name;
  btnConfirmDelete.dataset.id = id;
  new bootstrap.Modal('#dlgDeleteType').show();
});

btnConfirmDelete.addEventListener('click', (e) => {
  const id = +e.currentTarget.dataset.id;
  const idx = types.findIndex(x => x.id === id);
  if (idx >= 0) types.splice(idx, 1);
  bootstrap.Modal.getInstance(document.getElementById('dlgDeleteType'))?.hide();
  renderRows();
});

/* ---------- Initial render ---------- */
renderRows();
