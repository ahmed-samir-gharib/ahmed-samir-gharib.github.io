
/* ---------- Demo data (UI-only) ---------- */
const _departments = [
  { id: 1, name: 'Logistics' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'IT' },
  { id: 4, name: 'HR' }
];

const _people = [
  { id: 1, fullName: 'Ahmed Samir', employeeId: 'EMP1001', departmentId: 3 },
  { id: 2, fullName: 'Dana Alharbi', employeeId: 'EMP1017', departmentId: 2 },
  { id: 3, fullName: 'Yousef Almutairi', employeeId: 'EMP1033', departmentId: 1 },
  { id: 4, fullName: 'Lama Alqahtani', employeeId: 'EMP1042', departmentId: 4 }
];

/* Asset sample:
  status: InStock | Assigned | Returned | Repair | Retired
  If status=Assigned, it has personId (who has it) and deptId.
*/
const _assets = [
  { id: 1, assetTag:'AST-001234', serial:'S12345', model:'Lenovo T14',    status:'Assigned', personId:1, deptId:3 },
  { id: 2, assetTag:'AST-001235', serial:'S12346', model:'Dell P2419H',   status:'Assigned', personId:2, deptId:2 },
  { id: 3, assetTag:'AST-001236', serial:'S12347', model:'iPad 9th',      status:'Returned', personId:null, deptId:1 },
  { id: 4, assetTag:'AST-001237', serial:'S12348', model:'TOUGHBOOK 55',  status:'Repair',   personId:null, deptId:1 },
  { id: 5, assetTag:'AST-001238', serial:'S12349', model:'Latitude 5420', status:'Assigned', personId:4, deptId:4 },
  { id: 6, assetTag:'AST-001239', serial:'S12350', model:'Lenovo T14',    status:'InStock',  personId:null, deptId:3 }
];

/* ---------- DOM refs ---------- */
const txtLookup = document.getElementById('txtLookup');
const lookupBody = document.querySelector('#tblLookup tbody');

const cartBody   = document.querySelector('#tblCart tbody');
const cartBadge  = document.getElementById('cartBadge');
const cartSummary= document.getElementById('cartSummary');
const btnClearCart = document.getElementById('btnClearCart');

const btnPreviewReturn = document.getElementById('btnPreviewReturn');
const btnProcessReturn = document.getElementById('btnProcessReturn');

const returnFrame = document.getElementById('returnFrame');
const btnPrintReturn = document.getElementById('btnPrintReturn');

/* ---------- State ---------- */
const state = {
  cart: [] // [{id, assetTag, serial, model, personId, deptId, condition, disposition, notes}]
};

/* ---------- Helpers ---------- */
function personById(id){ return _people.find(p => p.id === id); }
function deptById(id){ return _departments.find(d => d.id === id); }
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

/* ---------- Lookup render & filter ---------- */
function renderLookup(list){
  lookupBody.innerHTML = '';
  list.forEach(a => {
    const assignedTo = a.personId
      ? `${escapeHtml(personById(a.personId)?.fullName || '')} — ${escapeHtml(deptById(a.deptId)?.name || '')}`
      : '—';
    const eligible = a.status === 'Assigned' && !state.cart.find(x => x.id === a.id);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(a.assetTag)}</strong></td>
      <td>${escapeHtml(a.model)}</td>
      <td>${escapeHtml(a.serial || '—')}</td>
      <td>${assignedTo}</td>
      <td>${a.status === 'Assigned'
            ? '<span class="badge badge-status badge-assigned">Assigned</span>'
            : `<span class="badge badge-status badge-other">${escapeHtml(a.status)}</span>`}
      </td>
      <td class="text-end">
        addAdd</button>
      </td>`;
    lookupBody.appendChild(tr);
  });
}

function filterLookup(){
  const q = (txtLookup.value || '').trim().toLowerCase();
  let list = _assets.slice();
  if (q){
    list = list.filter(a => 
      (a.assetTag||'').toLowerCase().includes(q) ||
      (a.serial||'').toLowerCase().includes(q) ||
      (a.model||'').toLowerCase().includes(q) ||
      (a.personId && (personById(a.personId)?.fullName || '').toLowerCase().includes(q))
    );
  }
  renderLookup(list);
}
txtLookup.addEventListener('input', filterLookup);

/* ---------- Cart render ---------- */
function renderCart(){
  cartBody.innerHTML = '';
  state.cart.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(item.assetTag)}</strong></td>
      <td>${escapeHtml(item.model)}</td>
      <td>${escapeHtml(item.serial || '—')}</td>
      <td>
        <select class="form-select form-select-sm" data-field="condition" data-id="${item.id}">
          <option value="Good" ${item.condition==='Good'?'selected':''}>Good</option>
          <option value="Damaged" ${item.condition==='Damaged'?'selected':''}>Damaged</option>
          <option value="Lost" ${item.condition==='Lost'?'selected':''}>Lost</option>
          <option value="Other" ${item.condition==='Other'?'selected':''}>Other</option>
        </select>
      </td>
      <td>
        <select class="form-select form-select-sm" data-field="disposition" data-id="${item.id}">
          <option value="InStock" ${item.disposition==='InStock'?'selected':''}>In Stock</option>
          <option value="Repair" ${item.disposition==='Repair'?'selected':''}>Repair</option>
          <option value="Retired" ${item.disposition==='Retired'?'selected':''}>Retired</option>
        </select>
      </td>
      <td>
        <input class="form-control form-control-sm" data-field="notes" data-id="${item.id}" placeholder="Condition notes" value="${escapeHtml(item.notes || '')}">
      </td>
      <td class="text-end">
        removeRemove</button>
      </td>`;
    cartBody.appendChild(tr);
  });

  // wire changes
  cartBody.querySelectorAll('[data-field]').forEach(ctrl => {
    ctrl.addEventListener('input', () => {
      const id = +ctrl.dataset.id;
      const field = ctrl.dataset.field;
      const it = state.cart.find(x => x.id === id);
      if (!it) return;
      it[field] = ctrl.value;
      // auto map disposition from condition (only when user hasn't changed manually)
      if (field === 'condition' && !it._dispositionTouched) {
        it.disposition = (it.condition === 'Good') ? 'InStock'
                         : (it.condition === 'Damaged') ? 'Repair'
                         : (it.condition === 'Lost') ? 'Retired'
                         : it.disposition;
        renderCart(); // refresh selects
      }
      if (field === 'disposition') it._dispositionTouched = true;
    });
  });

  // footer badges + buttons
  cartBadge.textContent = `${state.cart.length} in cart`;
  cartSummary.textContent = state.cart.length
    ? `${state.cart.length} item(s) ready to process.`
    : 'No items selected.';
  btnClearCart.disabled = state.cart.length === 0;
  btnPreviewReturn.disabled = state.cart.length === 0;
  btnProcessReturn.disabled = state.cart.length === 0;

  // refresh lookup buttons (disable added ones)
  filterLookup();
}

/* ---------- Global click handlers for add/remove ---------- */
lookupBody.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="add"]');
  if (!btn) return;
  const id = +btn.dataset.id;
  const a = _assets.find(x => x.id === id);
  if (!a || a.status !== 'Assigned') return; // only Assigned eligible
  if (state.cart.find(x => x.id === a.id)) return;

  state.cart.push({
    id: a.id,
    assetTag: a.assetTag,
    serial: a.serial,
    model: a.model,
    personId: a.personId,
    deptId: a.deptId,
    condition: 'Good',
    disposition: 'InStock',
    notes: ''
  });
  renderCart();
});

cartBody.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="remove"]');
  if (!btn) return;
  const id = +btn.dataset.id;
  const idx = state.cart.findIndex(x => x.id === id);
  if (idx >= 0) {
    state.cart.splice(idx, 1);
    renderCart();
  }
});

/* ---------- Clear cart ---------- */
btnClearCart.addEventListener('click', () => {
  state.cart = [];
  renderCart();
});

/* ---------- Receipt Preview & Process (UI only) ---------- */
btnPreviewReturn.addEventListener('click', openReturnReceipt);
btnProcessReturn.addEventListener('click', () => {
  // Apply status changes (UI-only)
  state.cart.forEach(item => {
    const a = _assets.find(x => x.id === item.id);
    if (!a) return;
    a.status = item.disposition;
    a.personId = null;
    a.deptId = null;
  });
  // Open receipt for the processed items
  openReturnReceipt(true);
  // Empty cart after "processing"
  state.cart = [];
  renderCart();
});

btnPrintReturn.addEventListener('click', () => {
  returnFrame.contentWindow.focus();
  returnFrame.contentWindow.print();
});

function openReturnReceipt(processed = false){
  if (state.cart.length === 0 && !processed) return;

  const now = new Date();
  const receivedOn = now.toLocaleString();
  const receivedBy = 'IT Staff';

  const items = processed
    ? _assets.filter(a => a.status !== 'Assigned') // just a fallback; we’ll use last snapshot if needed
    : state.cart;

  const rowsHtml = (processed ? lastProcessedSnapshot : state.cart).map((it, i) => `
    <tr>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${i+1}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(it.assetTag)}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(it.model)}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(it.serial || '—')}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(personById(it.personId)?.fullName || '—')}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(deptById(it.deptId)?.name || '—')}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(it.condition)}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(it.disposition)}</td>
      <td style="padding:6px 8px; border:1px solid #e5e7eb;">${escapeHtml(it.notes || '—')}</td>
    </tr>
  `).join('');

  const docHtml = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Return Receipt</title>
  <style>
    body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827; margin: 24px; }
    h1 { font-size: 20px; margin: 0 0 4px; }
    .sub { color:#6b7280; font-size: 12px; margin-bottom: 16px; }
    table { border-collapse: collapse; width: 100%; font-size: 14px; }
    th { text-align: left; background:#f3f4f6; }
    th, td { border:1px solid #e5e7eb; padding: 6px 8px; }
    .kvs { margin: 10px 0 16px; font-size: 14px; }
    .kvs div { margin: 2px 0; }
    @media print { .no-print { display:none; } body { margin: 16mm; } }
  </style>
</head>
<body>
  <h1>Return Receipt</h1>
  <div class="sub">Received On: ${receivedOn} &nbsp; | &nbsp; Received By: ${receivedBy}</div>

  <div class="kvs">
    <div><strong>Items:</strong> ${(processed ? lastProcessedSnapshot : state.cart).length}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:40px;">#</th>
        <th>Asset Tag</th>
        <th>Model</th>
        <th>Serial</th>
        <th>Assigned To</th>
        <th>Department</th>
        <th>Condition</th>
        <th>Disposition</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="no-print" style="margin-top:16px;">
    <button onclick="window.print()">Print</button>
  </div>
</body>
</html>
  `;

  // write to iframe and show modal
  const doc = returnFrame.contentWindow.document;
  doc.open(); doc.write(docHtml); doc.close();
  new bootstrap.Modal('#dlgReturnSheet').show();
}

/* Keep a snapshot of current cart before processing to show in receipt */
let lastProcessedSnapshot = [];
btnProcessReturn.addEventListener('click', () => {
  lastProcessedSnapshot = state.cart.map(x => ({...x})); // deep-ish copy
});

/* ---------- Init ---------- */
filterLookup();
renderCart();
