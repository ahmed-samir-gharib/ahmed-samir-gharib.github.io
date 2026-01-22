
// ===== Theme bootstrap =====
(function initTheme() {
  const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
  const root = document.documentElement;

  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  } else {
    // respect system; keep "auto" marker for clarity
    root.setAttribute('data-theme', (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark');
  }
})();

// ===== Theme toggle =====
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.setAttribute('aria-pressed', String(next === 'light'));
  });
}

// ===== Form behavior =====
const form = document.getElementById('loginForm');
const btn = document.getElementById('signInBtn');

function setLoading(isLoading) {
  if (!btn) return;
  btn.classList.toggle('loading', isLoading);
  btn.disabled = isLoading;
  btn.querySelector('.btn__label').textContent = isLoading ? 'Verifying…' : 'Sign In';
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */(document.getElementById('email')).value.trim();
    const password = /** @type {HTMLInputElement} */(document.getElementById('password')).value;

    // Basic client-side validation
    if (!email || !password) {
      // You can surface a toast or inline error here
      form.querySelector('#email')?.focus();
      return;
    }

    setLoading(true);

    try {
      // Simulate async call (replace with real auth later)
      await new Promise(res => setTimeout(res, 1200));

      // TODO: replace with navigation or VB interop hook
      // window.location.href = 'index.html';
      console.log('Authenticated (mock). Ready to navigate.');

    } catch (err) {
      console.error(err);
      // Surface an error message to the user here
    } finally {
      setLoading(false);
    }
  });
}
