
/* ---------- Demo master data (UI-only) ---------- */
const _vendors = [
  { id: 1, name: 'SNB Supplies' },
  { id: 2, name: 'AlFanar IT' },
  { id: 3, name: 'TechZone' }
];

const _types = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Monitor' },
  { id: 3, name: 'Tablet' },
  { id: 4, name: 'Rugged' }
];

const _models = [
  { id: 1, name: 'T14', manufacturer: 'Lenovo', typeId: 1, warrantyDefault: 24 },
  { id: 2, name: 'Latitude 5420', manufacturer: 'Dell', typeId: 1, warrantyDefault: 36 },
  { id: 3, name: 'P2419H', manufacturer: 'Dell', typeId: 2, warrantyDefault: 36 },
  { id: 4, name: 'iPad 9th', manufacturer: 'Apple', typeId: 3, warrantyDefault: 12 },
  { id: 5, name: 'TOUGHBOOK 55', manufacturer: 'Panasonic', typeId: 4, warrantyDefault: 24 }
];

/* ---------- DOM refs ---------- */
const ddlVendor = document.getElementById('ddlVendor');
const ddlType   = document.getElementById('ddlType');
const ddlModel  = document.getElementById('ddlModel');

const txtInvoice   = document.getElementById('txtInvoice');
const dtReceived   = document.getElementById('dtReceived');
const numUnitCost  = document.getElementById('numUnitCost');
const numQty       = document.getElementById('numQty');
const numWarranty  = document.getElementById('numWarranty');
const txtNotes     = document.getElementById('txtNotes');

const tagPrefix = document.getElementById('tagPrefix');
const tagStart  = document.getElementById('tagStart');
const tagHint   = document.getElementById('tagPreviewHint');

const btnPreview      = document.getElementById('btnPreview');
const btnCreateAssets = document.getElementById('btnCreateAssets');
const btnPreviewSheet = document.getElementById('btnPreviewSheet');

const tblBody = document.querySelector('#tblPreview tbody');
const batchBadge = document.getElementById('batchBadge');

const dlgSheet   = document.getElementById('dlgSheet');
const sheetFrame = document.getElementById('sheetFrame');
const btnPrintSheet = document.getElementById('btnPrintSheet');

/* ---------- State ---------- */
let previewRows = [];   // [{idx, assetTag, serial, modelId, warrantyEnd, notes}]
let createdBatches = []; // demo store

/* ---------- Init ---------- */
(function init() {
  // Today
  const today = new Date();
  dtReceived.valueAsDate = today;

  // Vendors
  ddlVendor.innerHTML = '';
  _vendors.forEach(v => {
    const o = document.createElement('option');
    o.value = v.id; o.textContent = v.name;
    ddlVendor.appendChild(o);
  });

  // Types
  ddlType.innerHTML = '';
  _types.forEach(t => {
    const o = document.createElement('option');
    o.value = t.id; o.textContent = t.name;
    ddlType.appendChild(o);
  });

  // Models (filtered)
  refreshModels();

  // Default qty
  numQty.value = 5;

  // Update tag hint
  updateTagHint();

  // Events
  ddlType.addEventListener('change', () => { refreshModels(); });
  ddlModel.addEventListener('change', () => { setWarrantyDefault(); });
  tagPrefix.addEventListener('input', updateTagHint);
  tagStart.addEventListener('input', updateTagHint);

  btnPreview.addEventListener('click', onGeneratePreview);
  btnCreateAssets.addEventListener('click', onCreateAssets);
  btnPreviewSheet.addEventListener('click', openSheetPreview);
  btnPrintSheet.addEventListener('click', () => {
    sheetFrame.contentWindow.focus();
    sheetFrame.contentWindow.print();
  });
})();

function refreshModels(){
  const typeId = +ddlType.value;
  ddlModel.innerHTML = '';
  _models.filter(m => m.typeId === typeId).forEach(m => {
    const o = document.createElement('option');
    o.value = m.id; o.textContent = `${m.manufacturer} ${m.name}`;
    ddlModel.appendChild(o);
  });
  setWarrantyDefault();
}

function setWarrantyDefault(){
  const model = _models.find(m => m.id === +ddlModel.value);
  numWarranty.value = model ? (model.warrantyDefault || 0) : '';
}

function updateTagHint(){
  const p = tagPrefix.value || 'AST-';
  const s = tagStart.value ? Number(tagStart.value) : 1000;
  tagHint.textContent = `Example: ${p}${s}, ${p}${s+1}, …`;
}

/* ---------- Preview generation ---------- */
function onGeneratePreview(){
  // Basic validation
  const required = [ddlVendor, ddlType, ddlModel, txtInvoice, dtReceived, numQty, tagPrefix, tagStart];
  let ok = true;
  required.forEach(el => {
    const empty = !el.value || (el.type === 'number' && el.value === '');
    el.classList.toggle('is-invalid', empty);
    ok = ok && !empty;
  });
  if (!ok) return;

  const qty = Math.max(1, Math.min(500, Number(numQty.value)));
  const prefix = tagPrefix.value.trim();
  let startNo = Math.max(1, Number(tagStart.value));

  const received = dtReceived.value ? new Date(dtReceived.value) : new Date();
  const modelId = +ddlModel.value;

  previewRows = [];
  for (let i = 0; i < qty; i++) {
    const assetTag = `${prefix}${startNo + i}`;
    const warrantyMonths = Number(numWarranty.value || 0);
    const warrantyEnd = warrantyMonths > 0 ? addMonths(received, warrantyMonths) : null;

    previewRows.push({
      idx: i + 1,
      assetTag,
      serial: '',
      modelId,
      warrantyEnd: warrantyEnd ? warrantyEnd.toISOString().slice(0,10) : '',
      notes: ''
    });
  }
  renderPreview();
  btnCreateAssets.disabled = previewRows.length === 0;
  btnPreviewSheet.disabled = previewRows.length === 0;
  batchBadge.textContent = `${previewRows.length} to create`;
}

function renderPreview(){
  tblBody.innerHTML = '';
  const modelName = () => {
    const m = _models.find(x => x.id === +ddlModel.value);
    return m ? `${m.manufacturer} ${m.name}` : '—';
  };

  previewRows.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.idx}</td>
      <td><strong>${escapeHtml(row.assetTag)}</strong></td>
      <td>
        <input class="form-control form-control-sm" data-field="serial" data-idx="${row.idx}" placeholder="(optional)" value="${escapeAttr(row.serial)}">
      </td>
      <td>${escapeHtml(modelName())}</td>
      <td>
        <input class="form-control form-control-sm" type="date" data-field="warrantyEnd" data-idx="${row.idx}" value="${escapeAttr(row.warrantyEnd)}">
      </td>
      <td>
        <input class="form-control form-control-sm" data-field="notes" data-idx="${row.idx}" placeholder="Notes" value="${escapeAttr(row.notes)}">
      </td>`;
    tblBody.appendChild(tr);
  });

  // Handle inline edits
  tblBody.querySelectorAll('input[data-field]').forEach(inp => {
    inp.addEventListener('input', () => {
      const idx = Number(inp.dataset.idx);
      const field = inp.dataset.field;
      const row = previewRows.find(r => r.idx === idx);
      if (row) row[field] = inp.value;
    });
  });
}

/* ---------- Create assets (UI only) ---------- */
function onCreateAssets(){
  if (previewRows.length === 0) return;

  const batch = {
    vendorId: +ddlVendor.value,
    typeId: +ddlType.value,
    modelId: +ddlModel.value,
    invoiceNo: txtInvoice.value.trim(),
    receivedOn: dtReceived.value,
    unitCost: numUnitCost.value ? Number(numUnitCost.value) : null,
    warrantyMonths: numWarranty.value ? Number(numWarranty.value) : null,
    notes: txtNotes.value.trim(),
    items: previewRows.slice()  // clone
  };
  createdBatches.unshift(batch);

  // Reset UI
  previewRows = [];
  renderPreview();
  btnCreateAssets.disabled = true;
  btnPreviewSheet.disabled = true;
  batchBadge.textContent = 'Batch created (UI)';

  // Optional: toast
  showToast('Assets created (demo only).');
}

/* ---------- Receipt preview ---------- */
function openSheetPreview(){
  if (previewRows.length === 0) return;

  const vendor = _vendors.find(v => v.id === +ddlVendor.value);
  const model  = _models.find(m => m.id === +ddlModel.value);
  const total  = numUnitCost.value ? (Number(numUnitCost.value) * previewRows.length) : null;

  const rowsHtml = previewRows.map(r => `
    <tr>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${r.idx}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(r.assetTag)}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(r.serial || '—')}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(`${model.manufacturer} ${model.name}`)}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(r.warrantyEnd || '—')}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(r.notes || '—')}</td>
    </tr>
  `).join('');

  const totalsHtml = total != null
    ? `<div><strong>Total Cost:</strong> SAR ${total.toFixed(2)}</div>`
    : '';

  const docHtml = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Stock Receipt</title>
  <style>
    body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827; margin: 24px; }
    h1 { font-size: 20px; margin: 0 0 4px; }
    .sub { color:#6b7280; font-size: 12px; margin-bottom: 16px; }
    .kvs { margin: 10px 0 16px; font-size: 14px; }
    .kvs div { margin: 2px 0; }
    table { border-collapse: collapse; width: 100%; font-size: 14px; }
    th { text-align: left; background:#f3f4f6; }
    th, td { border:1px solid #e5e7eb; padding: 6px 8px; }
    .footer { margin-top: 12px; color:#6b7280; font-size: 12px; }
    @media print { .no-print { display:none; } body { margin: 16mm; } }
  </style>
</head>
<body>
  <h1>Stock Receipt</h1>
  <div class="sub">Generated: ${new Date().toLocaleString()}</div>

  <div class="kvs">
    <div><strong>Vendor:</strong> ${escapeHtml(vendor?.name || '')}</div>
    <div><strong>Invoice No:</strong> ${escapeHtml(txtInvoice.value)}</div>
    <div><strong>Received On:</strong> ${escapeHtml(dtReceived.value)}</div>
    <div><strong>Model:</strong> ${escapeHtml(model ? `${model.manufacturer} ${model.name}` : '')}</div>
    <div><strong>Unit Cost:</strong> ${numUnitCost.value ? 'SAR ' + Number(numUnitCost.value).toFixed(2) : '—'}</div>
    ${totalsHtml}
    <div><strong>Notes:</strong> ${escapeHtml(txtNotes.value || '—')}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:40px;">#</th>
        <th>Asset Tag</th>
        <th>Serial</th>
        <th>Model</th>
        <th>Warranty End</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="footer">This is a receiving record for internal use.</div>

  <div class="no-print" style="margin-top:16px;">
    <button onclick="window.print()">Print</button>
  </div>
</body>
</html>
  `;

  const doc = sheetFrame.contentWindow.document;
  doc.open(); doc.write(docHtml); doc.close();
  new bootstrap.Modal(dlgSheet).show();
}

/* ---------- Utils ---------- */
function addMonths(date, months){
  const d = new Date(date.getTime());
  d.setMonth(d.getMonth() + months);
  // Correct for month roll-over (e.g., Jan 31 + 1 month)
  if (d.getDate() !== date.getDate()) d.setDate(0);
  return d;
}

function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
function escapeAttr(s){
  return escapeHtml(s).replace(/"/g, '&quot;');
}

function showToast(msg){
  // Minimal toast using alert-like fallback (kept simple for static demo)
  console.log(msg);
}
