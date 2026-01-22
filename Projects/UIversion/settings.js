
/* ---------- Demo roles & permissions (UI-only) ---------- */
/*
Permissions:
  users.read, users.manage
  departments.read, departments.manage
  people.read, people.manage
  itemtypes.manage, models.manage, vendors.manage
  assets.read, assets.manage
  handover.manage, returns.manage
  reports.read
  settings.manage
*/

let _roles = [
  { id: 1, name: 'Admin',     desc: 'Full access', perms: [
    'users.read','users.manage','departments.read','departments.manage','people.read','people.manage',
    'itemtypes.manage','models.manage','vendors.manage','assets.read','assets.manage',
    'handover.manage','returns.manage','reports.read','settings.manage'
  ], usersCount: 1 },
  { id: 2, name: 'IT Staff',  desc: 'Ops & inventory', perms: [
    'users.read',
    'departments.read','people.read','itemtypes.manage','models.manage','vendors.manage',
    'assets.read','assets.manage','handover.manage','returns.manage','reports.read'
  ], usersCount: 3 },
  { id: 3, name: 'Manager',   desc: 'View reports', perms: [
    'users.read','departments.read','people.read','assets.read','reports.read'
  ], usersCount: 5 },
  { id: 4, name: 'Auditor',   desc: 'Read-only', perms: [
    'users.read','departments.read','people.read','assets.read','reports.read'
  ], usersCount: 2 },
  { id: 5, name: 'User',      desc: 'Acknowledge handover', perms: [
    'reports.read'
  ], usersCount: 30 }
];

const PERMISSIONS = [
  { key: 'users.read',        label: 'Users: View' },
  { key: 'users.manage',      label: 'Users: Manage' },
  { key: 'departments.read',  label: 'Departments: View' },
  { key: 'departments.manage',label: 'Departments: Manage' },
  { key: 'people.read',       label: 'People: View' },
  { key: 'people.manage',     label: 'People: Manage' },
  { key: 'itemtypes.manage',  label: 'Item Types: Manage' },
  { key: 'models.manage',     label: 'Models: Manage' },
  { key: 'vendors.manage',    label: 'Vendors: Manage' },
  { key: 'assets.read',       label: 'Assets: View' },
  { key: 'assets.manage',     label: 'Assets: Manage' },
  { key: 'handover.manage',   label: 'Handover: Manage' },
  { key: 'returns.manage',    label: 'Returns: Manage' },
  { key: 'reports.read',      label: 'Reports: View' },
  { key: 'settings.manage',   label: 'Settings: Manage' }
];

/* ---------- Demo users (UI-only) ---------- */
let _users = [
  { id: 1, fullName: 'Ahmed Samir',   email: 'ahmed.samir@company.com', employeeId: 'EMP1001', roles: [1],      status: 'Active' },
  { id: 2, fullName: 'Dana Alharbi',  email: 'dana.h@company.com',       employeeId: 'EMP1017', roles: [2],      status: 'Active' },
  { id: 3, fullName: 'Yousef M.',     email: 'yousef.m@company.com',     employeeId: 'EMP1033', roles: [3],      status: 'Active' },
  { id: 4, fullName: 'Lama Q.',       email: 'lama.q@company.com',       employeeId: 'EMP1042', roles: [4],      status: 'Locked' },
  { id: 5, fullName: 'Noura T.',      email: 'noura.t@company.com',      employeeId: 'EMP1049', roles: [5],      status: 'Active' }
];

/* ---------- DOM refs ---------- */
// Users
const usersTbody = document.querySelector('#tblUsers tbody');
const usersCount = document.getElementById('usersCount');
const txtSearchUsers = document.getElementById('txtSearchUsers');
const ddlRoleFilter  = document.getElementById('ddlRoleFilter');
const ddlStatusFilter= document.getElementById('ddlStatusFilter');

const frmAddUser   = document.getElementById('frmAddUser');
const frmEditUser  = document.getElementById('frmEditUser');
const rolesMultiAdd= document.getElementById('rolesMultiAdd');
const rolesMultiEdit= document.getElementById('rolesMultiEdit');
const btnSaveAddUser = document.getElementById('btnSaveAddUser');
const btnSaveEditUser= document.getElementById('btnSaveEditUser');
const resetUserEmail = document.getElementById('resetUserEmail');
const btnConfirmResetPwd = document.getElementById('btnConfirmResetPwd');
const btnExportUsers = document.getElementById('btnExportUsers');

// Roles
const rolesTbody = document.querySelector('#tblRoles tbody');
const rolesCount = document.getElementById('rolesCount');
const txtSearchRoles = document.getElementById('txtSearchRoles');

const frmAddRole  = document.getElementById('frmAddRole');
const frmEditRole = document.getElementById('frmEditRole');
const permAdd     = document.getElementById('permAdd');
const permEdit    = document.getElementById('permEdit');
const btnSaveAddRole  = document.getElementById('btnSaveAddRole');
const btnSaveEditRole = document.getElementById('btnSaveEditRole');
const delRoleName = document.getElementById('delRoleName');
const btnConfirmDeleteRole = document.getElementById('btnConfirmDeleteRole');

// Auth
const ddlDefaultRole = document.getElementById('ddlDefaultRole');
const btnSaveAuth = document.getElementById('btnSaveAuth');
const btnSaveTemplates = document.getElementById('btnSaveTemplates');

/* ---------- Local state for filters ---------- */
let usersFilterText = '';
let usersFilterRole = '';
let usersFilterStatus = '';

let rolesFilterText = '';

/* ---------- Utilities ---------- */
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
function initials(name) {
  return (name || '').split(' ').filter(Boolean).slice(0,2).map(x=>x[0].toUpperCase()).join('');
}
function roleNames(ids){
  return ids.map(id => _roles.find(r => r.id===id)?.name || '').filter(Boolean);
}
function renderBadge(text, type='info'){
  const map = { info:'bg-info', success:'bg-success', secondary:'bg-secondary' };
  return `<span class="badge ${map[type]||map.info}">${escapeHtml(text)}</span>`;
}

/* ---------- Init dropdowns & perm grids ---------- */
(function init(){
  // Role filter
  ddlRoleFilter.innerHTML = '<option value="">All Roles</option>';
  _roles.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id; opt.textContent = r.name;
    ddlRoleFilter.appendChild(opt);
  });

  // Roles multi selects (add/edit)
  function fillRolesMulti(sel){
    sel.innerHTML = '';
    _roles.forEach(r=>{
      const opt = document.createElement('option'); opt.value=r.id; opt.textContent=r.name; sel.appendChild(opt);
    });
  }
  fillRolesMulti(rolesMultiAdd);
  fillRolesMulti(rolesMultiEdit);

  // Permissions grid (Add/Edit)
  function fillPermGrid(container){
    container.innerHTML = '';
    PERMISSIONS.forEach(p => {
      const div = document.createElement('div');
      div.className = 'form-check';
      div.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${p.key}" id="${container.id}_${p.key}">
        <label class="form-check-label" for="${container.id}_${p.key}">${escapeHtml(p.label)}</label>`;
      container.appendChild(div);
    });
  }
  fillPermGrid(permAdd);
  fillPermGrid(permEdit);

  // Default role dropdown (Auth tab)
  ddlDefaultRole.innerHTML = '';
  _roles.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id; opt.textContent = r.name;
    ddlDefaultRole.appendChild(opt);
  });
  // default to "User" if exists
  const userRole = _roles.find(r => r.name.toLowerCase()==='user');
  if (userRole) ddlDefaultRole.value = userRole.id;

  // First render
  renderUsers();
  renderRoles();
})();

/* ---------- Users: render & filters ---------- */
function renderUsers(){
  const list = _users.filter(u => {
    const txt = `${u.fullName} ${u.email} ${u.employeeId}`.toLowerCase();
    const t = !usersFilterText || txt.includes(usersFilterText);
    const r = !usersFilterRole || u.roles.includes(+usersFilterRole);
    const s = !usersFilterStatus || (usersFilterStatus==='active' ? u.status==='Active' : u.status==='Locked');
    return t && r && s;
  });

  usersTbody.innerHTML = '';
  list.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="avatar-initials" title="${escapeHtml(u.fullName)}">${initials(u.fullName)}</span></td>
      <td><strong>${escapeHtml(u.fullName)}</strong></td>
      <td>mailto:${escapeHtml(u.email)}${escapeHtml(u.email)}</a></td>
      <td>${escapeHtml(u.employeeId || '—')}</td>
      <td>${roleNames(u.roles).map(n => renderBadge(n,'secondary')).join(' ') || '—'}</td>
      <td>${u.status==='Active' ? renderBadge('Active','success') : renderBadge('Locked','secondary')}</td>
      <td class="text-end">
        <div class="btn-group btn-group-sm">
          edit-user<i class="bi bi-pencil-square"></i></button>
          toggle-user
            <i class="bi ${u.status==='Active'?'bi-lock':'bi-unlock'}"></i>
          </button>
          reset-user<i class="bi bi-key"></i></button>
          delete-user<i class="bi bi-trash3"></i></button>
        </div>
      </td>`;
    usersTbody.appendChild(tr);
  });
  usersCount.textContent = list.length;
}
txtSearchUsers.addEventListener('input', () => { usersFilterText=(txtSearchUsers.value||'').trim().toLowerCase(); renderUsers(); });
ddlRoleFilter.addEventListener('change', () => { usersFilterRole=ddlRoleFilter.value; renderUsers(); });
ddlStatusFilter.addEventListener('change', () => { usersFilterStatus=ddlStatusFilter.value; renderUsers(); });

/* ---------- Users: actions ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const id = +btn.dataset.id;
  const action = btn.dataset.action;

  if (action === 'edit-user') {
    const u = _users.find(x => x.id===id); if (!u) return;
    frmEditUser.UserId.value = u.id;
    frmEditUser.FullName.value = u.fullName;
    frmEditUser.Email.value = u.email;
    frmEditUser.EmployeeId.value = u.employeeId || '';
    frmEditUser.Status.value = u.status;
    Array.from(rolesMultiEdit.options).forEach(o => o.selected = u.roles.includes(+o.value));
    new bootstrap.Modal('#dlgEditUser').show();

  } else if (action === 'toggle-user') {
    const u = _users.find(x => x.id===id); if (!u) return;
    u.status = (u.status==='Active') ? 'Locked' : 'Active';
    renderUsers();

  } else if (action === 'reset-user') {
    resetUserEmail.textContent = btn.dataset.email || '';
    btnConfirmResetPwd.dataset.id = id;
    new bootstrap.Modal('#dlgResetPwd').show();

  } else if (action === 'delete-user') {
    if (confirm('Delete this user? This cannot be undone.')) {
      const i = _users.findIndex(x => x.id===id);
      if (i>=0) _users.splice(i,1);
      renderUsers();
    }
  }
});

// Add user
btnSaveAddUser.addEventListener('click', () => {
  if (!frmAddUser.checkValidity()) { frmAddUser.reportValidity(); return; }
  const nextId = _users.length ? Math.max(..._users.map(x=>x.id))+1 : 1;
  const roles = Array.from(rolesMultiAdd.selectedOptions).map(o => +o.value);
  const u = {
    id: nextId,
    fullName: frmAddUser.FullName.value.trim(),
    email: frmAddUser.Email.value.trim(),
    employeeId: frmAddUser.EmployeeId.value.trim(),
    status: frmAddUser.Status.value,
    roles
  };
  _users.unshift(u);
  bootstrap.Modal.getInstance(document.getElementById('dlgAddUser'))?.hide();
  frmAddUser.reset();
  renderUsers();

  if (document.getElementById('chkSendInvite').checked) {
    console.log('Invite email would be sent (UI only).');
  }
});

// Edit user
btnSaveEditUser.addEventListener('click', () => {
  if (!frmEditUser.checkValidity()) { frmEditUser.reportValidity(); return; }
  const id = +frmEditUser.UserId.value;
  const u = _users.find(x => x.id===id); if (!u) return;
  u.fullName = frmEditUser.FullName.value.trim();
  u.email = frmEditUser.Email.value.trim();
  u.employeeId = frmEditUser.EmployeeId.value.trim();
  u.status = frmEditUser.Status.value;
  u.roles = Array.from(rolesMultiEdit.selectedOptions).map(o => +o.value);
  bootstrap.Modal.getInstance(document.getElementById('dlgEditUser'))?.hide();
  renderUsers();
});

// Confirm password reset (UI only)
btnConfirmResetPwd.addEventListener('click', () => {
  const id = +btnConfirmResetPwd.dataset.id;
  const u = _users.find(x => x.id===id);
  if (u) console.log(`Password reset email sent to ${u.email} (UI only).`);
  bootstrap.Modal.getInstance(document.getElementById('dlgResetPwd'))?.hide();
});

/* ---------- Roles: render & actions ---------- */
function renderRoles(){
  const list = _roles.filter(r => {
    const txt = `${r.name} ${r.desc}`.toLowerCase();
    return !rolesFilterText || txt.includes(rolesFilterText);
  });

  rolesTbody.innerHTML='';
  list.forEach(r => {
    const perms = r.perms.map(k => PERMISSIONS.find(p => p.key===k)?.label || k).filter(Boolean);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(r.name)}</strong></td>
      <td>${escapeHtml(r.desc || '')}</td>
      <td>${r.usersCount ?? 0}</td>
      <td>${perms.length ? perms.map(p => `<span class="badge bg-secondary me-1">${escapeHtml(p)}</span>`).join('') : '—'}</td>
      <td class="text-end">
        <div class="btn-group btn-group-sm">
          edit-role<i class="bi bi-pencil-square"></i></button>
          delete-role<i class="bi bi-trash3"></i></button>
        </div>
      </td>`;
    rolesTbody.appendChild(tr);
  });
  rolesCount.textContent = list.length;
}
txtSearchRoles.addEventListener('input', () => {
  rolesFilterText = (txtSearchRoles.value||'').trim().toLowerCase();
  renderRoles();
});

// Prepare perms checkboxes for a form (container is permAdd or permEdit)
function setPermCheckboxes(container, permKeys){
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.checked = permKeys.includes(cb.value);
  });
}
function getPermCheckboxes(container){
  return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
}

// Add role
btnSaveAddRole.addEventListener('click', () => {
  if (!frmAddRole.checkValidity()) { frmAddRole.reportValidity(); return; }
  const nextId = _roles.length ? Math.max(..._roles.map(x=>x.id)) + 1 : 1;
  const perms = getPermCheckboxes(permAdd);
  const role = {
    id: nextId,
    name: frmAddRole.Name.value.trim(),
    desc: frmAddRole.Description.value.trim(),
    perms,
    usersCount: 0
  };
  _roles.push(role);
  // refresh dropdowns & views
  ddlRoleFilter.innerHTML = '<option value="">All Roles</option>';
  _roles.forEach(r => {
    const opt=document.createElement('option'); opt.value=r.id; opt.textContent=r.name; ddlRoleFilter.appendChild(opt);
  });
  // reset add form
  frmAddRole.reset();
  setPermCheckboxes(permAdd, []);
  bootstrap.Modal.getInstance(document.getElementById('dlgAddRole'))?.hide();
  renderRoles();
});

// Edit role open
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="edit-role"]'); if(!btn) return;
  const id = +btn.dataset.id;
  const r = _roles.find(x => x.id===id); if(!r) return;

  frmEditRole.RoleId.value = r.id;
  frmEditRole.Name.value = r.name;
  frmEditRole.Description.value = r.desc || '';
  setPermCheckboxes(permEdit, r.perms || []);
  new bootstrap.Modal('#dlgEditRole').show();
});

// Save edit role
btnSaveEditRole.addEventListener('click', () => {
  if (!frmEditRole.checkValidity()) { frmEditRole.reportValidity(); return; }
  const id = +frmEditRole.RoleId.value;
  const r = _roles.find(x => x.id===id); if(!r) return;
  r.name = frmEditRole.Name.value.trim();
  r.desc = frmEditRole.Description.value.trim();
  r.perms = getPermCheckboxes(permEdit);
  bootstrap.Modal.getInstance(document.getElementById('dlgEditRole'))?.hide();
  renderRoles();

  // also refresh role filters & user role labels
  ddlRoleFilter.innerHTML = '<option value="">All Roles</option>';
  _roles.forEach(rr => {
    const opt=document.createElement('option'); opt.value=rr.id; opt.textContent=rr.name; ddlRoleFilter.appendChild(opt);
  });
  renderUsers();
});

// Delete role
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-action="delete-role"]'); if(!btn) return;
  const id = +btn.dataset.id;
  const name = btn.dataset.name || 'this role';
  delRoleName.textContent = name;
  btnConfirmDeleteRole.dataset.id = id;
  new bootstrap.Modal('#dlgDeleteRole').show();
});
btnConfirmDeleteRole.addEventListener('click', (e) => {
  const id = +e.currentTarget.dataset.id;
  // (UI-only) prevent deleting if any user currently has this role
  const inUse = _users.some(u => u.roles.includes(id));
  if (inUse) { alert('Cannot delete: role is assigned to one or more users.'); return; }
  const idx = _roles.findIndex(r => r.id===id);
  if (idx>=0) _roles.splice(idx,1);

  bootstrap.Modal.getInstance(document.getElementById('dlgDeleteRole'))?.hide();

  // refresh filters and views
  ddlRoleFilter.innerHTML = '<option value="">All Roles</option>';
  _roles.forEach(r => {
    const opt=document.createElement('option'); opt.value=r.id; opt.textContent=r.name; ddlRoleFilter.appendChild(opt);
  });
  renderRoles();
  renderUsers();
});

/* ---------- Export users CSV (current filtered view) ---------- */
btnExportUsers.addEventListener('click', () => {
  const rows = Array.from(usersTbody.querySelectorAll('tr')).map(tr => {
    const tds = tr.querySelectorAll('td');
    return {
      FullName: tds[1]?.textContent?.trim() || '',
      Email: tds[2]?.textContent?.trim() || '',
      EmployeeId: tds[3]?.textContent?.trim() || '',
      Roles: tds[4]?.textContent?.replace(/\s+/g,' ').trim() || '',
      Status: tds[5]?.textContent?.trim() || ''
    };
  });
  const header = ['FullName','Email','EmployeeId','Roles','Status'];
  const csv = [header.join(',')]
    .concat(rows.map(r => header.map(h => `"${String(r[h]??'').replace(/"/g,'""')}"`).join(',')))
    .join('\r\n');
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `users_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

/* ---------- Save Auth / Templates (UI-only) ---------- */
btnSaveAuth.addEventListener('click', () => {
  console.log('Auth settings saved (UI):', {
    mode: 'Forms',
    minLen: document.getElementById('pwdMinLen').value,
    upper: document.getElementById('pwdUpper').checked,
    lower: document.getElementById('pwdLower').checked,
    digit: document.getElementById('pwdDigit').checked,
    symbol: document.getElementById('pwdSymbol').checked,
    lockout: document.getElementById('pwdLockout').value,
    defaultRoleId: ddlDefaultRole.value
  });
  alert('Authentication settings saved (UI only).');
});
btnSaveTemplates.addEventListener('click', () => {
  console.log('Templates saved (UI).');
  alert('Email templates saved (UI only).');
});
