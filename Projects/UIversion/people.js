function renderRows(list) {
  tblBody.innerHTML = '';

  list.forEach(p => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>
        <span class="avatar-initials" title="${escapeHtml(p.fullName)}">
          ${initials(p.fullName)}
        </span>
      </td>

      <td>
        <strong>${escapeHtml(p.fullName)}</strong><br>
        <small class="text-secondary">${escapeHtml(p.notes)}</small>
      </td>

      <td>
        <span class="badge bg-info-subtle text-info border">
          ${escapeHtml(p.employeeId)}
        </span>
      </td>

      <td>${escapeHtml(deptNameById(p.departmentId))}</td>

      <td>
        ${
          p.email
            ? `<a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`
            : '—'
        }
      </td>

      <td>
        ${
          p.phone
            ? `<a href="tel:${escapeHtml(p.phone)}">${escapeHtml(p.phone)}</a>`
            : '—'
        }
      </td>

      <td class="text-end">
        <div class="btn-group btn-group-sm">

          <button
            class="btn btn-glass text-primary"
            data-action="edit"
            data-id="${p.id}"
            title="Edit">
            <i class="bi bi-pencil-square"></i>
          </button>

          <button
            class="btn btn-glass text-danger"
            data-action="delete"
            data-id="${p.id}"
            title="Delete">
            <i class="bi bi-trash3"></i>
          </button>

          <button
            class="btn btn-glass ${p.active ? 'text-warning' : 'text-success'}"
            data-action="toggle"
            data-id="${p.id}"
            title="${p.active ? 'Deactivate' : 'Activate'}">
            <i class="bi ${p.active ? 'bi-pause-circle' : 'bi-play-circle'}"></i>
          </button>

        </div>
      </td>
    `;

    tblBody.appendChild(tr);
  });

  countBadge.textContent = list.length;
}
