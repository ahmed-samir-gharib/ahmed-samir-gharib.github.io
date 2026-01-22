// Demo data (UI only; to be replaced by real data later)
const _deptData = [
  { id: 1, name: 'Logistics', code: 'LOG', location: 'HQ - Tower B', people: 42, notes: '' },
  { id: 2, name: 'Finance',   code: 'FIN', location: 'HQ - Tower A', people: 28, notes: 'Handles vendor payments' },
  { id: 3, name: 'IT',        code: 'IT',  location: 'DC - Riyadh',  people: 35, notes: 'Infrastructure & Apps' },
  { id: 4, name: 'HR',        code: 'HR',  location: 'HQ - Tower A', people: 17, notes: '' },
];

(function () {

  const tblBody = document.querySelector('#tblDepartments tbody');
  const txtSearch = document.getElementById('txtSearchDept');
  const countBadge = document.getElementById('deptCount');

  if (!tblBody) return;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function renderRows(list) {
    tblBody.innerHTML = '';

    list.forEach(d => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td><i class="bi bi-building text-primary"></i></td>

        <td>
          <strong>${escapeHtml(d.name)}</strong><br>
          <small class="text-secondary">${escapeHtml(d.notes || '')}</small>
        </td>

        <td>
          <span class="badge bg-info-subtle text-info border">
            ${escapeHtml(d.code)}
          </span>
        </td>

        <td>
          <span class="badge">${escapeHtml(d.location || '—')}</span>
        </td>

        <td class="text-center">${d.people}</td>

        <td class="text-end">
          <div class="btn-group btn-group-sm">
            <button
              class="btn btn-glass"
              data-action="edit"
              data-id="${d.id}">
              <i class="bi bi-pencil"></i>
            </button>

            <button
              class="btn btn-glass text-danger"
              data-action="delete"
              data-id="${d.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `;

      tblBody.appendChild(tr);
    });

    if (countBadge) countBadge.textContent = list.length;
  }

  function filter() {
    const q = (txtSearch?.value || '').trim().toLowerCase();
    if (!q) return renderRows(_deptData);

    renderRows(
      _deptData.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        (d.location || '').toLowerCase().includes(q)
      )
    );
  }

  txtSearch?.addEventListener('input', filter);

  // Global edit/delete handler
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const dept = _deptData.find(x => x.id === id);
    if (!dept) return;

    if (btn.dataset.action === 'edit') {
      const dlgEl = document.getElementById('dlgEditDept');
      const f = document.getElementById('frmEditDept');

      f.DepartmentId.value = dept.id;
      f.Name.value = dept.name;
      f.Code.value = dept.code;
      f.Location.value = dept.location || '';
      f.Notes.value = dept.notes || '';

      new bootstrap.Modal(dlgEl).show();
    }

    if (btn.dataset.action === 'delete') {
      document.getElementById('delDeptName').textContent = dept.name;
      document.getElementById('btnConfirmDelete').dataset.id = dept.id;
      new bootstrap.Modal(document.getElementById('dlgDeleteDept')).show();
    }
  });

  // Add
  document.getElementById('btnSaveAdd')?.addEventListener('click', () => {
    const f = document.getElementById('frmAddDept');
    if (!f.checkValidity()) return f.reportValidity();

    const nextId = (_deptData.at(-1)?.id || 0) + 1;

    _deptData.push({
      id: nextId,
      name: f.Name.value.trim(),
      code: f.Code.value.trim(),
      location: f.Location.value.trim(),
      people: 0,
      notes: f.Notes.value.trim()
    });

    bootstrap.Modal.getInstance(document.getElementById('dlgAddDept'))?.hide();
    f.reset();
    filter();
  });

  // Edit
  document.getElementById('btnSaveEdit')?.addEventListener('click', () => {
    const f = document.getElementById('frmEditDept');
    if (!f.checkValidity()) return f.reportValidity();

    const d = _deptData.find(x => x.id === +f.DepartmentId.value);
    if (!d) return;

    Object.assign(d, {
      name: f.Name.value.trim(),
      code: f.Code.value.trim(),
      location: f.Location.value.trim(),
      notes: f.Notes.value.trim()
    });

    bootstrap.Modal.getInstance(document.getElementById('dlgEditDept'))?.hide();
    filter();
  });

  // Delete
  document.getElementById('btnConfirmDelete')?.addEventListener('click', (e) => {
    const id = +e.currentTarget.dataset.id;
    const idx = _deptData.findIndex(x => x.id === id);
    if (idx >= 0) _deptData.splice(idx, 1);

    bootstrap.Modal.getInstance(document.getElementById('dlgDeleteDept'))?.hide();
    filter();
  });

  // Initial render
  renderRows(_deptData);

})();
