(function () {
  var btn = document.getElementById('skills-toggle-btn');
  if (!btn) return;
  var hidden = document.querySelectorAll('.cs-group-hidden');
  btn.addEventListener('click', function () {
    var expanded = btn.getAttribute('data-expanded') === 'true';
    hidden.forEach(function (el) {
      el.style.display = expanded ? 'none' : 'grid';
    });
    btn.setAttribute('data-expanded', expanded ? 'false' : 'true');
    btn.textContent = expanded ? 'View All Skills' : 'Show Less';
  });
}());

(function () {
  var WEB3FORMS_KEY = '7fa7d954-da1e-45e0-b40a-9f8b231b3343';

  var form   = document.getElementById('message-form');
  var status = document.getElementById('message-status');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = (document.getElementById('c-name')   || {}).value || '';
    var email   = (document.getElementById('c-email')  || {}).value || '';
    var subject = (document.getElementById('c-subject')|| {}).value || '';
    var message = (document.getElementById('c-message')|| {}).value || '';

    if (!name.trim() || !email.trim() || !message.trim()) {
      status.textContent = 'Please fill in all required fields.';
      status.style.color = '#c0392b';
      return;
    }

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    status.textContent = '';

    try {
      var msgs = JSON.parse(localStorage.getItem('mn_messages') || '[]');
      msgs.unshift({ id: 'msg-' + Date.now(), name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim(), date: new Date().toISOString(), read: false });
      localStorage.setItem('mn_messages', JSON.stringify(msgs));
    } catch (_) {}

    if (WEB3FORMS_KEY && WEB3FORMS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, name: name.trim(), email: email.trim(), subject: subject.trim() || 'Portfolio Contact', message: message.trim() })
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          status.textContent = 'Message sent! I\'ll get back to you soon.';
          status.style.color = '#1a7a45';
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please email me directly.';
          status.style.color = '#c0392b';
        }
      })
      .catch(function () {
        status.textContent = 'Network error. Your message was saved — please also email me directly.';
        status.style.color = '#c0392b';
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
      });
    } else {
      status.textContent = 'Message received! I\'ll get back to you soon.';
      status.style.color = '#1a7a45';
      form.reset();
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
    }
  });
}());
