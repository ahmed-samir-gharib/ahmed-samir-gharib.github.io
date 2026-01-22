
/* ---------- Demo data (UI-only) ---------- */
let _vendors = [
  { id: 1, name: 'SNB Supplies', contact: 'Omar Alsaif', phone: '+966500000101', email: 'sales@snb.com', website: 'https://snb.com', address: 'Riyadh, KSA', active: true,  notes: 'Primary supplier', logoKind:'bi', logoValue:'bi-truck' },
  { id: 2, name: 'AlFanar IT',   contact: 'Mona Almutlaq', phone: '+966500000202', email: 'info@alfanar-it.com', website: 'https://alfanar-it.com', address: 'Riyadh Tech Park', active: true,  notes: '', logoKind:'bi', logoValue:'bi-box-seam' },
  { id: 3, name: 'TechZone',     contact: 'Rashed Alqahtani', phone: '+966500000303', email: 'support@techzone.sa', website: '', address: 'Jeddah', active: false, notes: 'Pending contract renewal', logoKind:'bi', logoValue:'bi-gear' }
];

/* Curated Bootstrap icon list */
const ICONS = [
  'bi-truck','bi-box-seam','bi-shop','bi-building','bi-bag','bi-bag-check','bi-bag-fill',
  'bi-briefcase','bi-gear','bi-receipt','bi-credit-card','bi-people','bi-telephone','bi-envelope',
  'bi-globe'
];

/* ---------- DOM refs ---------- */
const tbody = document.querySelector('#tblVendors tbody');
const countBadge = document.getElementById('vendorsCount');

const txtSearch = document.getElementById('txtSearchVendors');
const ddlActive = document.getElementById('ddlActiveFilter');
const btnExportCsv = document.getElementById('btnExportCsv');

/* Add form */
const frmAdd = document.getElementById('frmAddVendor');
const logoPrevAdd = document.getElementById('logoPreviewAdd');
const fileLogoAdd = document.getElementById('fileLogoAdd');
const btnSaveAdd = document.getElementById('btnSaveAddVendor');

/* Edit form */
const frmEdit = document.getElementById('frmEditVendor');
const logoPrevEdit = document.getElementById('logoPreviewEdit');
const fileLogoEdit = document.getElementById('fileLogoEdit');
const btnSaveEdit = document.getElementById('btnSaveEditVendor');

/* Delete confirm */
const delName = document.getElementById('delVendorName');
const btnConfirmDelete = document.getElementById('btnConfirmDeleteVendor');

/* Icon picker */
const iconGrid = document.getElementById('iconGrid');
let iconPickerMode = 'add';

/* ---------- State ---------- */
let filterText = '';
let filterActive = ''; // '', 'active', 'inactive'

/* ---------- Helpers ---------- */
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
function formatLink(url){
  if(!url) return '—';
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    return `${u.href}${escapeHtml(u.hostname)}</a>`;
  } catch { return escapeHtml(url); }
}
function renderLogoCell(kind, value){
  if (kind === 'img' && value) return `<div class="logo-preview">${escapeHtml(value)}</div>`;
  return `<div class="logo-preview"><i class="bi ${escapeHtml(value || 'bi-truck')}"></i></div>`;
}

/* ---------- Icon Picker render ---------- */
(function renderIconGrid(){
  iconGrid.innerHTML = '';
  ICONS.forEach(name => {
    const col = document.createElement('div');
    col.className = 'col-2 col-md-1 d-flex justify-content-center';
    col.innerHTML = `<div class="icon-btn" data-icon="${name}"><i class="bi ${name}" style="font-size:22px;"></i></div>`;
    iconGrid.appendChild(col);
  });
})();
document.querySelectorAll('[data-bs-target="#dlgIconPicker"]').forEach(btn=>{
  btn.addEventListener('click', ()=>{ iconPickerMode = btn.dataset.mode || 'add'; });
});
iconGrid.addEventListener('click', (e)=>{
  const btn = e.target.closest('.icon-btn'); if(!btn) return;
  const iconName = btn.dataset.icon;
  if (iconPickerMode==='add') {
    frmAdd.LogoKind.value='bi'; frmAdd.LogoValue.value=iconName;
    logoPrevAdd.innerHTML = `<i class="bi ${iconName}"></i>`;
  } else {
    frmEdit.LogoKind.value='bi'; frmEdit.LogoValue.value=iconName;
    logoPrevEdit.innerHTML = `<i class="bi ${iconName}"></i>`;
  }
});

/* ---------- File inputs (logo upload preview) ---------- */
function handleLogoInput(fileInput, form, previewDiv){
  fileInput.addEventListener('change', ()=>{
    const f = fileInput.files?.[0]; if(!f) return;
    const url = URL.createObjectURL(f);
    form.LogoKind.value = 'img';
    form.LogoValue.value = url;       // UI-only preview
    previewDiv.innerHTML = `${url}`;
  });
}
handleLogoInput(fileLogoAdd, frmAdd, logoPrevAdd);
handleLogoInput(fileLogoEdit, frmEdit, logoPrevEdit);

/* ---------- Render ---------- */
function renderRows(){
  const list = _vendors.filter(v => {
    const text = `${v.name} ${v.contact} ${v.email} ${v.phone} ${v.address} ${v.website} ${v.notes}`.toLowerCase();
    const mt = !filterText || text.includes(filterText);
    const ma = !filterActive || (filterActive==='active' ? v.active : !v.active);
    return mt && ma;
  });

  tbody.innerHTML = '';
  list.forEach(v=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${renderLogoCell(v.logoKind, v.logoValue)}</td>
      <td>
        <strong>${escapeHtml(v.name)}</strong><br>
        <small class="text-secondary">${escapeHtml(v.address || v.notes || '')}</small>
      </td>
      <td>${escapeHtml(v.contact || '—')}</td>
      <td>${v.phone ? `tel:${escapeHtml(v.phone)}${escapeHtml(v.phone)}</a>` : '—'}</td>
      <td>${v.email ? `mailto:${escapeHtml(v.email)}${escapeHtml(v.email)}</a>` : '—'}</td>
      <td>${formatLink(v.website)}</td>
      <td>${v.active ? '<span class="badge bg-success">Active</span>' : '<span class="badge bg-secondary">Inactive</span>'}</td>
      <td class="text-end">
        <div class="btn-group btn-group-sm">
          edit<i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-glass text-danger" data-action="delete    </td>`;
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

/* ---------- Add Vendor ---------- */
btnSaveAdd.addEventListener('click', () => {
  if (!frmAdd.checkValidity()) { frmAdd.reportValidity(); return; }
  const name = frmAdd.Name.value.trim();
  const nextId = _vendors.length ? Math.max(..._vendors.map(x=>x.id)) + 1 : 1;

  const v = {
    id: nextId,
    name,
    contact: frmAdd.Contact.value.trim(),
    phone: frmAdd.Phone.value.trim(),
    email: frmAdd.Email.value.trim(),
    address: frmAdd.Address.value.trim(),
    website: frmAdd.Website.value.trim(),
    notes: frmAdd.Notes.value.trim(),
    active: document.getElementById('chkActiveAdd').checked,
    logoKind: frmAdd.LogoKind.value || 'bi',
    logoValue: frmAdd.LogoValue.value || 'bi-truck'
  };
  _vendors.unshift(v);

  // Reset form & close
  bootstrap.Modal.getInstance(document.getElementById('dlgAddVendor'))?.hide();
  frmAdd.reset();
  frmAdd.LogoKind.value = 'bi'; frmAdd.LogoValue.value = 'bi-truck';
  logoPrevAdd.innerHTML = `<i class="bi bi-truck"></i>`;
  document.getElementById('chkActiveAdd').checked = true;

  renderRows();
});

/* ---------- Edit Vendor ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="edit"]'); if(!btn) return;
  const id = +btn.dataset.id;
  const v = _vendors.find(x => x.id === id); if(!v) return;

  frmEdit.VendorId.value = v.id;
  frmEdit.Name.value = v.name;
  frmEdit.Contact.value = v.contact || '';
  frmEdit.Phone.value = v.phone || '';
  frmEdit.Email.value = v.email || '';
  frmEdit.Address.value = v.address || '';
  frmEdit.Website.value = v.website || '';
  frmEdit.Notes.value = v.notes || '';
  document.getElementById('chkActiveEdit').checked = !!v.active;
  frmEdit.LogoKind.value = v.logoKind || 'bi';
  frmEdit.LogoValue.value = v.logoValue || 'bi-truck';
  logoPrevEdit.innerHTML = (v.logoKind === 'img' && v.logoValue)
    ? `${escapeHtml(v.logoValue)}`
    : `<i class="bi ${escapeHtml(v.logoValue || 'bi-truck')}"></i>`;

  new bootstrap.Modal('#dlgEditVendor').show();
});

btnSaveEdit.addEventListener('click', () => {
  if (!frmEdit.checkValidity()) { frmEdit.reportValidity(); return; }
  const id = +frmEdit.VendorId.value;
  const v = _vendors.find(x => x.id === id); if(!v) return;

  v.name = frmEdit.Name.value.trim();
  v.contact = frmEdit.Contact.value.trim();
  v.phone = frmEdit.Phone.value.trim();
  v.email = frmEdit.Email.value.trim();
  v.address = frmEdit.Address.value.trim();
  v.website = frmEdit.Website.value.trim();
  v.notes = frmEdit.Notes.value.trim();
  v.active = document.getElementById('chkActiveEdit').checked;
  v.logoKind = frmEdit.LogoKind.value || 'bi';
  v.logoValue = frmEdit.LogoValue.value || 'bi-truck';

  bootstrap.Modal.getInstance(document.getElementById('dlgEditVendor'))?.hide();
  renderRows();
});

/* ---------- Delete Vendor ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="delete"]'); if(!btn) return;
  const id = +btn.dataset.id;
  const name = btn.dataset.name || 'this vendor';
  delName.textContent = name;
  btnConfirmDelete.dataset.id = id;
  new bootstrap.Modal('#dlgDeleteVendor').show();
});

btnConfirmDelete.addEventListener('click', (e) => {
  const id = +e.currentTarget.dataset.id;
  const idx = _vendors.findIndex(x => x.id === id);
  if (idx >= 0) _vendors.splice(idx, 1);
  bootstrap.Modal.getInstance(document.getElementById('dlgDeleteVendor'))?.hide();
  renderRows();
});

/* ---------- Export CSV (UI-only) ---------- */
btnExportCsv.addEventListener('click', () => {
  // Export the currently filtered list
  const header = ['Id','Name','Contact','Phone','Email','Website','Address','Active','Notes'];
  const list = Array.from(tbody.querySelectorAll('tr')).map(tr => {
    const id = tr.querySelector('button[data-action="edit"]')?.dataset.id || '';
    const tds = tr.querySelectorAll('td');
    return {
      Id: id,
      Name: tds[1]?.querySelector('strong')?.textContent?.trim() || '',
      Contact: tds[2]?.textContent?.trim() || '',
      Phone: tds[3]?.textContent?.trim() || '',
      Email: tds[4]?.textContent?.trim() || '',
      Website: tds[5]?.textContent?.trim() || '',
      Active: tds[6]?.textContent?.trim() || '',
      Address: _vendors.find(v=>String(v.id)===String(id))?.address || '',
      Notes: _vendors.find(v=>String(v.id)===String(id))?.notes || ''
    };
  });

  const csv = [header.join(',')]
    .concat(list.map(r => header.map(h => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(',')))
    .join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `vendors_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

/* ---------- Initial render ---------- */
renderRows();
