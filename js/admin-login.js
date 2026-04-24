document.getElementById('admin-login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var email = document.getElementById('al-email').value.trim();
  var pass  = document.getElementById('al-password').value;
  var status = document.getElementById('admin-login-status');

  if (!email || !pass) {
    status.textContent = 'Please fill in both fields.';
    status.style.color = '#c0392b';
    return;
  }

  status.textContent = 'Signing in…';
  status.style.color = '';

  sessionStorage.setItem('mn_admin', '1');
  sessionStorage.setItem('mn_admin_email', email);

  setTimeout(function () {
    window.location.href = 'admin-dashboard.html';
  }, 400);
});
