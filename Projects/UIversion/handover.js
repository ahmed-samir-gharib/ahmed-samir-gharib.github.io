/* ---------- Demo master data ---------- */
const _departments = [
  { id: 1, name: 'Logistics' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'IT' },
  { id: 4, name: 'HR' }
];

const _people = [
  { id: 1, fullName: 'Ahmed Samir', employeeId: 'EMP1001', departmentId: 3, email: 'ahmed.samir@company.com' },
  { id: 2, fullName: 'Dana Alharbi', employeeId: 'EMP1017', departmentId: 2, email: 'dana.h@company.com' },
  { id: 3, fullName: 'Yousef Almutairi', employeeId: 'EMP1033', departmentId: 1, email: 'yousef.m@company.com' },
  { id: 4, fullName: 'Lama Alqahtani', employeeId: 'EMP1042', departmentId: 4, email: 'lama.q@company.com' }
];

// Available assets for handover (only InStock can be added)
const _assets = [
  { id: 1, assetTag:'AST-001234', model:'Lenovo T14',    serial:'S12345', status:'InStock'  },
  { id: 2, assetTag:'AST-001235', model:'Dell P2419H',   serial:'S12346', status:'InStock'  },
  { id: 3, assetTag:'AST-001236', model:'iPad 9th',      serial:'S12347', status:'Returned' },
  { id: 4, assetTag:'AST-001237', model:'TOUGHBOOK 55',  serial:'S12348', status:'InStock'  },
  { id: 5, assetTag:'AST-001238', model:'Latitude 5420', serial:'S12349', status:'Assigned' }
];

/* ---------- DOM refs ---------- */
const ddlDept = document.getElementById('ddlDept');
const ddlPerson = document.getElementById('ddlPerson');
const txtRemarks = document.getElementById('txtRemarks');
const txtScan = document.getElementById('txtScan');
const tblAvail = document.querySelector('#tblAvail tbody');
const listSel = document.getElementById('listSelected');
const selectedCount = document.getElementById('selectedCount');
const selectedSummary = document.getElementById('selectedSummary');
const btnClearSelected = document.getElementById('btnClearSelected');
const btnOpenSignature = document.getElementById('btnOpenSignature');
const btnPreviewDoc = document.getElementById('btnPreviewDoc');
const btnCreateHandover = document.getElementById('btnCreateHandover');
const btnClearSig = document.getElementById('btnClearSig');
const btnSaveSig = document.getElementById('btnSaveSig');
const docFrame = document.getElementById('docFrame');
const btnPrintDoc = document.getElementById('btnPrintDoc');

/* ---------- Signature Pad ---------- */
const pad = new SignaturePad(document.getElementById('sigPad'), {
  backgroundColor: 'rgba(0,0,0,0)'
});

btnClearSig.addEventListener('click', () => {
  pad.clear();
  btnSaveSig.disabled = true;
});

pad.onEnd = () => {
  btnSaveSig.disabled = pad.isEmpty();
};

/* ---------- State ---------- */
const state = {
  deptId: null,
  personId: null,
  selected: [],
  signatureDataUrl: null
};

/* ---------- Init dropdowns ---------- */
(function initDropdowns(){
  ddlDept.innerHTML = '<option value="">Select Department</option>';
  _departments.forEach(d => {
    const o = document.createElement('option');
    o.value = d.id;
    o.textContent = d.name;
    ddlDept.appendChild(o);
  });
  ddlPerson.disabled = true;
})();

ddlDept.addEventListener('change', () => {
  state.deptId = ddlDept.value ? +ddlDept.value : null;

  ddlPerson.innerHTML = '<option value="">Select Person</option>';

  if (state.deptId) {
    _people
      .filter(p => p.departmentId === state.deptId)
      .forEach(p => {
        const o = document.createElement('option');
        o.value = p.id;
        o.textContent = `${p.fullName} — ${p.employeeId}`;
        ddlPerson.appendChild(o);
      });
    ddlPerson.disabled = false;
  } else {
    ddlPerson.disabled = true;
  }

  enableActions();
});

ddlPerson.addEventListener('change', () => {
  state.personId = ddlPerson.value ? +ddlPerson.value : null;
  enableActions();
});

/* ---------- Available assets ---------- */
function renderAvailable(list){
  tblAvail.innerHTML = '';

  list.forEach(a => {
    const tr = document.createElement('tr');
    const isAddable =
      a.status === 'InStock' &&
      !state.selected.find(x => x.id === a.id);

    tr.innerHTML = `
      <td>
        <strong>${escapeHtml(a.assetTag)}</strong><br>
        <small class="text-secondary">${escapeHtml(a.model)}</small>
      </td>
      <td>${escapeHtml(a.model)}</td>
      <td>${escapeHtml(a.serial || '—')}</td>
      <td>
        ${
          a.status === 'InStock'
            ? '<span class="badge bg-success">In Stock</span>'
            : `<span class="badge bg-secondary">${escapeHtml(a.status)}</span>`
        }
      </td>
      <td class="text-end">
        <button
          class="btn btn-sm btn-primary"
          data-action="add"
          data-id="${a.id}"
          ${isAddable ? '' : 'disabled'}>
          Add
        </button>
      </td>
    `;

    tblAvail.appendChild(tr);
  });
}

function filterAvailable(){
  const q = (txtScan.value || '').trim().toLowerCase();
  let list = _assets.slice();

  if (q) {
    list = list.filter(a =>
      (a.assetTag || '').toLowerCase().includes(q) ||
      (a.serial || '').toLowerCase().includes(q) ||
      (a.model || '').toLowerCase().includes(q)
    );
  }

  renderAvailable(list);
}

txtScan.addEventListener('input', filterAvailable);

/* ---------- Selected assets ---------- */
function renderSelected(){
  listSel.innerHTML = '';

  state.selected.forEach(a => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      <span>
        <strong>${escapeHtml(a.assetTag)}</strong> — ${escapeHtml(a.model)}
        <small class="text-secondary">(${escapeHtml(a.serial || '—')})</small>
      </span>
      <button
        class="btn btn-sm btn-outline-danger"
        data-action="remove"
        data-id="${a.id}">
        Remove
      </button>
    `;

    listSel.appendChild(li);
  });

  selectedCount.textContent = `${state.selected.length} selected`;
  selectedSummary.textContent = state.selected.length
    ? `${state.selected.length} item(s) selected for handover.`
    : 'No items selected.';

  btnClearSelected.disabled = state.selected.length === 0;
  btnOpenSignature.disabled = state.selected.length === 0 || !state.personId;

  enableActions();
  filterAvailable();
}

document.addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const id = +btn.dataset.id;

  if (btn.dataset.action === 'add') {
    const a = _assets.find(x => x.id === id);
    if (!a || a.status !== 'InStock') return;
    if (!state.selected.find(x => x.id === id)) {
      state.selected.push(a);
      renderSelected();
    }
  }

  if (btn.dataset.action === 'remove') {
    const i = state.selected.findIndex(x => x.id === id);
    if (i >= 0) {
      state.selected.splice(i, 1);
      renderSelected();
    }
  }
});

btnClearSelected.addEventListener('click', () => {
  state.selected = [];
  renderSelected();
});

btnOpenSignature.addEventListener('click', () => {
  document
    .querySelector('.signature-wrap')
    ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* ---------- Signature ---------- */
btnSaveSig.addEventListener('click', () => {
  if (!pad.isEmpty()) {
    state.signatureDataUrl = pad.toDataURL('image/png');
    btnSaveSig.disabled = true;
    enableActions();
  }
});

/* ---------- Actions ---------- */
function enableActions(){
  const ready =
    !!state.personId &&
    state.selected.length > 0 &&
    !!state.signatureDataUrl;

  btnPreviewDoc.disabled = !ready;
  btnCreateHandover.disabled = !ready;
}

/* ---------- Document preview ---------- */
btnPreviewDoc.addEventListener('click', openDocPreview);
btnCreateHandover.addEventListener('click', openDocPreview);

function openDocPreview(){
  const dept = _departments.find(d => d.id === state.deptId);
  const person = _people.find(p => p.id === state.personId);
  const remarks = txtRemarks.value.trim();
  const issuedOn = new Date().toLocaleString();

  const rowsHtml = state.selected.map((a, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${escapeHtml(a.assetTag)}</td>
      <td>${escapeHtml(a.model)}</td>
      <td>${escapeHtml(a.serial || '—')}</td>
    </tr>
  `).join('');

  const docHtml = `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Handover</title>
<style>
body { font-family: Arial; margin: 24px; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ccc; padding: 6px; }
.sig img { max-width: 100%; max-height: 100%; }
</style>
</head>
<body>
<h2>IT Equipment Handover</h2>
<p><strong>Department:</strong> ${escapeHtml(dept?.name || '')}</p>
<p><strong>Recipient:</strong> ${escapeHtml(person?.fullName || '')}</p>
<p><strong>Remarks:</strong> ${escapeHtml(remarks || '—')}</p>

<table>
<thead>
<tr><th>#</th><th>Asset</th><th>Model</th><th>Serial</th></tr>
</thead>
<tbody>${rowsHtml}</tbody>
</table>

<h4>Signature</h4>
<div class="sig">
  ${
    state.signatureDataUrl
      ? `<img src="${state.signatureDataUrl}">`
      : '—'
  }
</div>

<button onclick="window.print()">Print</button>
</body>
</html>
`;

  const doc = docFrame.contentWindow.document;
  doc.open();
  doc.write(docHtml);
  doc.close();

  new bootstrap.Modal('#dlgPreview').show();
}

btnPrintDoc.addEventListener('click', () => {
  docFrame.contentWindow.focus();
  docFrame.contentWindow.print();
});

/* ---------- Utils ---------- */
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

/* ---------- Init ---------- */
renderAvailable(_assets);
renderSelected();
enableActions();
