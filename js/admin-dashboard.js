(function () {
  if (!sessionStorage.getItem('mn_admin')) {
    window.location.href = 'admin-login.html';
  }
  var email = sessionStorage.getItem('mn_admin_email') || '';
  if (email) {
    var label = email.split('@')[0];
    var avatar = label.substring(0, 2).toUpperCase();
    var el = document.getElementById('adm-user-label');
    var av = document.getElementById('adm-avatar');
    if (el) el.textContent = email;
    if (av) av.textContent = avatar;
  }
}());

var DEFAULTS = {
  articles: [
    { id: 'art-1', title: 'Building Secure REST APIs with Python', category: 'Backend Engineering',
      summary: 'A deep dive into API security best practices including JWT authentication, rate limiting, and input validation for production-grade services.',
      content: 'When building REST APIs, security must be a first-class concern from day one. This article walks through the essential security patterns every backend developer should know.',
      author: 'Maurice Nshimyumukiza', date: '2026-03-15', published: true, tags: 'Python, Security, REST API' },
    { id: 'art-2', title: 'HAProxy Load Balancing in Production', category: 'Infrastructure',
      summary: 'How to configure and manage HAProxy for production-grade load balancing across distributed Linux servers with automated health checks.',
      content: 'HAProxy is one of the most reliable load balancers available. In this guide, I walk through a real-world setup I have deployed.',
      author: 'Maurice Nshimyumukiza', date: '2026-02-20', published: true, tags: 'HAProxy, Linux, DevOps' },
    { id: 'art-3', title: 'Technology for Social Impact in Africa', category: 'Social Impact',
      summary: 'Reflections on how technology can be a powerful lever for positive change across African communities — and what builders must keep in mind.',
      content: 'Africa is at a digital inflection point. The question is not whether technology will transform the continent, but who will lead that transformation.',
      author: 'Maurice Nshimyumukiza', date: '2026-01-10', published: false, tags: 'Social Impact, Africa, Technology' }
  ],
  projects: [
    { id: 'proj-1', title: 'Financial Intelligence API', category: 'Backend Engineering', description: 'A RESTful API system designed to detect anomalous financial transactions and generate real-time risk reports.', tags: 'Python, PostgreSQL, REST API, Docker', link: '', demo: '' },
    { id: 'proj-2', title: 'Umubyeyi Foundation Platform', category: 'Full-Stack', description: 'An educational infrastructure platform enabling community learning programs, resource sharing, and impact tracking across Rwanda.', tags: 'Node.js, MySQL, Linux, HAProxy', link: '', demo: '' },
    { id: 'proj-3', title: 'Distributed Load Balancer Setup', category: 'Infrastructure', description: 'Multi-node distributed system using HAProxy for load balancing across Linux servers with automated failover.', tags: 'HAProxy, Linux, Bash, Nginx', link: '', demo: '' },
    { id: 'proj-4', title: 'Portfolio Backend API', category: 'Backend Engineering', description: 'Self-hosted RESTful backend powering this portfolio with a lightweight admin dashboard.', tags: 'Python, PostgreSQL, Docker', link: '', demo: '' },
    { id: 'proj-5', title: 'Digital Literacy Initiative', category: 'Research', description: 'Research-driven initiative to assess and address digital literacy gaps in Rwandan communities.', tags: 'Research, Curriculum Design, Data Analysis', link: '', demo: '' }
  ],
  education: [
    { id: 'edu-1', institution: 'African Leadership University (ALU)', degree: 'BSc Software Engineering', period: '2024 – Present', description: 'Focusing on backend development, distributed systems, and technology for social impact.' },
    { id: 'edu-2', institution: 'Saint Ignatius High School', degree: 'A-Level — MPC (Mathematics, Physics, Computer Science)', period: '2022 – 2023', description: 'Advanced studies in the MPC combination, building strong analytical and computational thinking.' },
    { id: 'edu-3', institution: 'G.S Mater Dei', degree: 'Ordinary Level (Secondary)', period: '2019 – 2021', description: 'Completed secondary education with a strong grounding in science and mathematics.' }
  ],
  experience: [
    { id: 'exp-1', role: 'Group Leader — PLP', organization: 'Peace and Love Proclaimers', period: 'School Years', type: 'Leadership', description: 'Led in-school student peace-building group, managing teams and organising school events.' },
    { id: 'exp-2', role: 'Choir Leader', organization: 'Community Choir', period: 'School Years', type: 'Leadership', description: 'Led a community choir outside school, coordinating rehearsals and public performances.' },
    { id: 'exp-3', role: 'Sales Representative', organization: 'Private Company', period: '~6 months', type: 'Work Experience', description: 'Worked as a salesman developing customer communication and business operations skills.' },
    { id: 'exp-4', role: 'Founder', organization: 'Community Initiative', period: 'Past', type: 'Entrepreneurship', description: 'Founded a grassroots initiative — a formative experience in entrepreneurship and learning from failure.' },
    { id: 'exp-5', role: 'Teacher Facilitator', organization: 'Nursery School', period: 'Past', type: 'Education', description: 'Supported early childhood education, building patience and skill in simplifying complex ideas.' }
  ],
  likes: { 'art-1': 24, 'art-2': 18, 'art-3': 7 },
  comments: {
    'art-1': [
      { id: 'c1', author: 'Amara K.', text: 'Great post! The JWT validation section was especially helpful.', date: '2026-03-16' },
      { id: 'c2', author: 'Jean-Pierre N.', text: 'Would love a follow-up on OAuth 2.0 integration.', date: '2026-03-18' }
    ],
    'art-2': [
      { id: 'c3', author: 'Diane M.', text: 'Very practical guide. I have implemented this at work!', date: '2026-02-22' }
    ],
    'art-3': []
  }
};

function getStore(key) {
  try {
    var v = localStorage.getItem('mn_' + key);
    return v ? JSON.parse(v) : JSON.parse(JSON.stringify(DEFAULTS[key]));
  } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS[key])); }
}

function setStore(key, val) {
  localStorage.setItem('mn_' + key, JSON.stringify(val));
}

function initStores() {
  Object.keys(DEFAULTS).forEach(function (k) {
    if (!localStorage.getItem('mn_' + k)) {
      setStore(k, DEFAULTS[k]);
    }
  });
}

function genId(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 999);
}

initStores();

function showToast(msg) {
  var t = document.getElementById('adm-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 2800);
}

var _modalSaveCb = null;

function openModal(title, bodyHtml, saveCb) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  _modalSaveCb = saveCb;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  _modalSaveCb = null;
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
document.getElementById('modal-save').addEventListener('click', function () {
  if (_modalSaveCb) _modalSaveCb();
});

var PANEL_TITLES = { overview: 'Overview', articles: 'Articles', portfolio: 'Portfolio', engagement: 'Engagement', messages: 'Messages' };

function showPanel(id) {
  document.querySelectorAll('.adm-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelectorAll('.adm-nav-btn').forEach(function (b) { b.classList.remove('active'); });
  var panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
  var btn = document.querySelector('[data-panel="' + id + '"]');
  if (btn) btn.classList.add('active');
  document.getElementById('adm-page-title').textContent = PANEL_TITLES[id] || id;

  if (id === 'overview')   renderOverview();
  if (id === 'articles')   renderArticles();
  if (id === 'portfolio')  { renderProjects(); renderEducation(); renderExperience(); }
  if (id === 'engagement') renderEngagement();
  if (id === 'messages')   renderMessages();
}

document.querySelectorAll('.adm-nav-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    showPanel(this.dataset.panel);
    if (window.innerWidth < 900) {
      document.getElementById('adm-sidebar').classList.remove('open');
    }
  });
});

/* Sidebar toggle */
document.getElementById('sidebar-toggle').addEventListener('click', function () {
  document.getElementById('adm-sidebar').classList.toggle('open');
});

/* Logout */
document.getElementById('logout-btn').addEventListener('click', function () {
  sessionStorage.removeItem('mn_admin');
  sessionStorage.removeItem('mn_admin_email');
  window.location.href = 'admin-login.html';
});

/* Portfolio sub-tabs */
document.getElementById('portfolio-subtabs').addEventListener('click', function (e) {
  var tab = e.target.closest('.adm-subtab');
  if (!tab) return;
  document.querySelectorAll('.adm-subtab').forEach(function (t) { t.classList.remove('active'); });
  document.querySelectorAll('.adm-subtab-panel').forEach(function (p) { p.classList.remove('active'); });
  tab.classList.add('active');
  var panel = document.getElementById('subtab-' + tab.dataset.subtab);
  if (panel) panel.classList.add('active');
});

function renderOverview() {
  var articles   = getStore('articles');
  var projects   = getStore('projects');
  var education  = getStore('education');
  var experience = getStore('experience');
  var likes      = getStore('likes');
  var comments   = getStore('comments');
  var msgs = []; try { msgs = JSON.parse(localStorage.getItem('mn_messages') || '[]'); } catch (_) {}
  var unreadMsgs = msgs.filter(function (m) { return !m.read; }).length;

  updateMsgBadge(msgs);

  var totalLikes = Object.values(likes).reduce(function (s, v) { return s + (v || 0); }, 0);
  var totalComments = Object.values(comments).reduce(function (s, v) { return s + (Array.isArray(v) ? v.length : 0); }, 0);

  var statsHtml = [
    { icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>', label: 'Articles', value: articles.length, cls: 'teal' },
    { icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>', label: 'Projects', value: projects.length, cls: 'gold' },
    { icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>', label: 'Total Likes', value: totalLikes, cls: 'blue' },
    { icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', label: 'Comments', value: totalComments, cls: 'purple' },
    { icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', label: 'Unread Messages', value: unreadMsgs, cls: 'teal' }
  ].map(function (s) {
    return '<div class="adm-stat-card">' +
      '<div class="adm-stat-icon ' + s.cls + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + s.icon + '</svg></div>' +
      '<div class="adm-stat-value">' + s.value + '</div>' +
      '<div class="adm-stat-label">' + s.label + '</div>' +
      '</div>';
  }).join('');
  document.getElementById('overview-stats').innerHTML = statsHtml;

  var artHtml = articles.length === 0 ? '<div class="empty-note">No articles yet.</div>' :
    articles.slice(0, 5).map(function (a) {
      return '<div class="adm-recent-row"><span>' + esc(a.title) + '</span>' +
        '<span>' + (a.published ? '&#9679; Live' : 'Draft') + '</span></div>';
    }).join('');
  document.getElementById('overview-articles').innerHTML = artHtml;

  var engHtml = articles.length === 0 ? '<div class="empty-note">No data yet.</div>' :
    articles.map(function (a) {
      var l = (likes[a.id] || 0);
      var c = (comments[a.id] || []).length;
      return '<div class="adm-recent-row">' +
        '<span style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(a.title) + '</span>' +
        '<span>&#9829; ' + l + ' &nbsp; &#9829; ' + c + ' cmt</span></div>';
    }).join('');
  document.getElementById('overview-engagement').innerHTML = engHtml;
}

function renderArticles() {
  var articles = getStore('articles');
  var tbody = document.getElementById('articles-tbody');
  if (articles.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:32px;">No articles yet. Create your first one.</td></tr>';
    return;
  }
  tbody.innerHTML = articles.map(function (a) {
    return '<tr>' +
      '<td><strong>' + esc(a.title) + '</strong><br><span style="font-size:0.78rem;color:var(--muted);">' + esc(a.tags || '') + '</span></td>' +
      '<td>' + esc(a.category) + '</td>' +
      '<td>' + esc(a.author) + '</td>' +
      '<td>' + esc(a.date) + '</td>' +
      '<td><span class="badge ' + (a.published ? 'badge-published' : 'badge-draft') + '">' + (a.published ? 'Published' : 'Draft') + '</span></td>' +
      '<td class="actions">' +
        '<button class="tbl-btn tbl-btn-edit" onclick="editArticle(\'' + a.id + '\')">Edit</button>' +
        '<button class="tbl-btn tbl-btn-del" onclick="deleteArticle(\'' + a.id + '\')">Delete</button>' +
      '</td></tr>';
  }).join('');
}

function articleFormHtml(a) {
  a = a || {};
  return '<div class="adm-field"><label>Title *</label><input id="f-title" value="' + esc(a.title || '') + '" placeholder="Article title" required></div>' +
    '<div class="adm-field"><label>Category *</label><select id="f-category">' +
      ['Backend Engineering','Infrastructure','Full-Stack','Research','Social Impact','DevOps','Security'].map(function (c) {
        return '<option value="' + c + '"' + (a.category === c ? ' selected' : '') + '>' + c + '</option>';
      }).join('') +
    '</select></div>' +
    '<div class="adm-field"><label>Summary *</label><textarea id="f-summary" rows="3" placeholder="Short summary shown in listings...">' + esc(a.summary || '') + '</textarea></div>' +
    '<div class="adm-field"><label>Full Content *</label><textarea id="f-content" rows="6" placeholder="Full article body...">' + esc(a.content || '') + '</textarea></div>' +
    '<div class="adm-field-row">' +
      '<div class="adm-field"><label>Author</label><input id="f-author" value="' + esc(a.author || 'Maurice Nshimyumukiza') + '"></div>' +
      '<div class="adm-field"><label>Date</label><input id="f-date" type="date" value="' + esc(a.date || new Date().toISOString().split('T')[0]) + '"></div>' +
    '</div>' +
    '<div class="adm-field"><label>Tags (comma separated)</label><input id="f-tags" value="' + esc(a.tags || '') + '" placeholder="Python, Security, REST API"></div>' +
    '<div class="adm-field"><label><input id="f-published" type="checkbox"' + (a.published ? ' checked' : '') + '> &nbsp;Published (visible on site)</label></div>';
}

document.getElementById('new-article-btn').addEventListener('click', function () {
  openModal('New Article', articleFormHtml(), function () {
    var title = document.getElementById('f-title').value.trim();
    if (!title) { showToast('Title is required.'); return; }
    var articles = getStore('articles');
    articles.unshift({
      id: genId('art'),
      title: title,
      category: document.getElementById('f-category').value,
      summary: document.getElementById('f-summary').value.trim(),
      content: document.getElementById('f-content').value.trim(),
      author: document.getElementById('f-author').value.trim() || 'Maurice Nshimyumukiza',
      date: document.getElementById('f-date').value,
      tags: document.getElementById('f-tags').value.trim(),
      published: document.getElementById('f-published').checked
    });
    setStore('articles', articles);
    closeModal();
    renderArticles();
    showToast('Article created successfully.');
  });
});

function editArticle(id) {
  var articles = getStore('articles');
  var a = articles.find(function (x) { return x.id === id; });
  if (!a) return;
  openModal('Edit Article', articleFormHtml(a), function () {
    var title = document.getElementById('f-title').value.trim();
    if (!title) { showToast('Title is required.'); return; }
    a.title     = title;
    a.category  = document.getElementById('f-category').value;
    a.summary   = document.getElementById('f-summary').value.trim();
    a.content   = document.getElementById('f-content').value.trim();
    a.author    = document.getElementById('f-author').value.trim();
    a.date      = document.getElementById('f-date').value;
    a.tags      = document.getElementById('f-tags').value.trim();
    a.published = document.getElementById('f-published').checked;
    setStore('articles', articles);
    closeModal();
    renderArticles();
    showToast('Article updated.');
  });
}

function deleteArticle(id) {
  if (!confirm('Delete this article? This cannot be undone.')) return;
  var articles = getStore('articles').filter(function (a) { return a.id !== id; });
  setStore('articles', articles);
  renderArticles();
  showToast('Article deleted.');
}

function renderProjects() {
  var projects = getStore('projects');
  var grid = document.getElementById('projects-grid');
  if (projects.length === 0) {
    grid.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">No projects yet.</div>';
    return;
  }
  grid.innerHTML = projects.map(function (p) {
    var tagList = (p.tags || '').split(',').map(function (t) {
      return '<span class="adm-tag">' + esc(t.trim()) + '</span>';
    }).join('');
    return '<div class="adm-item-card">' +
      '<div class="adm-item-card-meta">' + esc(p.category) + '</div>' +
      '<h4>' + esc(p.title) + '</h4>' +
      '<p>' + esc(p.description) + '</p>' +
      '<div class="adm-tags-wrap">' + tagList + '</div>' +
      '<div class="adm-item-card-actions">' +
        '<button class="tbl-btn tbl-btn-edit" onclick="editProject(\'' + p.id + '\')">Edit</button>' +
        '<button class="tbl-btn tbl-btn-del" onclick="deleteProject(\'' + p.id + '\')">Delete</button>' +
      '</div></div>';
  }).join('');
}

function projectFormHtml(p) {
  p = p || {};
  return '<div class="adm-field"><label>Title *</label><input id="f-title" value="' + esc(p.title || '') + '" placeholder="Project title" required></div>' +
    '<div class="adm-field"><label>Category</label><select id="f-category">' +
      ['Backend Engineering','Full-Stack','Infrastructure','Research','Mobile','Design'].map(function (c) {
        return '<option value="' + c + '"' + (p.category === c ? ' selected' : '') + '>' + c + '</option>';
      }).join('') +
    '</select></div>' +
    '<div class="adm-field"><label>Description *</label><textarea id="f-description" rows="4" placeholder="Describe the project...">' + esc(p.description || '') + '</textarea></div>' +
    '<div class="adm-field"><label>Tags (comma separated)</label><input id="f-tags" value="' + esc(p.tags || '') + '" placeholder="Python, PostgreSQL, Docker"></div>' +
    '<div class="adm-field-row">' +
      '<div class="adm-field"><label>Repo URL</label><input id="f-link" value="' + esc(p.link || '') + '" placeholder="https://github.com/..."></div>' +
      '<div class="adm-field"><label>Demo URL</label><input id="f-demo" value="' + esc(p.demo || '') + '" placeholder="https://..."></div>' +
    '</div>';
}

document.getElementById('new-project-btn').addEventListener('click', function () {
  openModal('New Project', projectFormHtml(), function () {
    var title = document.getElementById('f-title').value.trim();
    if (!title) { showToast('Title is required.'); return; }
    var projects = getStore('projects');
    projects.push({
      id: genId('proj'), title: title,
      category: document.getElementById('f-category').value,
      description: document.getElementById('f-description').value.trim(),
      tags: document.getElementById('f-tags').value.trim(),
      link: document.getElementById('f-link').value.trim(),
      demo: document.getElementById('f-demo').value.trim()
    });
    setStore('projects', projects);
    closeModal();
    renderProjects();
    showToast('Project added.');
  });
});

function editProject(id) {
  var projects = getStore('projects');
  var p = projects.find(function (x) { return x.id === id; });
  if (!p) return;
  openModal('Edit Project', projectFormHtml(p), function () {
    var title = document.getElementById('f-title').value.trim();
    if (!title) { showToast('Title is required.'); return; }
    p.title       = title;
    p.category    = document.getElementById('f-category').value;
    p.description = document.getElementById('f-description').value.trim();
    p.tags        = document.getElementById('f-tags').value.trim();
    p.link        = document.getElementById('f-link').value.trim();
    p.demo        = document.getElementById('f-demo').value.trim();
    setStore('projects', projects);
    closeModal();
    renderProjects();
    showToast('Project updated.');
  });
}

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  setStore('projects', getStore('projects').filter(function (p) { return p.id !== id; }));
  renderProjects();
  showToast('Project deleted.');
}

function renderEducation() {
  var edu = getStore('education');
  var grid = document.getElementById('education-grid');
  if (edu.length === 0) {
    grid.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">No education entries yet.</div>';
    return;
  }
  grid.innerHTML = edu.map(function (e) {
    return '<div class="adm-item-card">' +
      '<div class="adm-item-card-meta">' + esc(e.period) + '</div>' +
      '<h4>' + esc(e.institution) + '</h4>' +
      '<p style="font-weight:600;color:var(--ink);font-size:0.88rem;margin-bottom:4px;">' + esc(e.degree) + '</p>' +
      '<p>' + esc(e.description) + '</p>' +
      '<div class="adm-item-card-actions">' +
        '<button class="tbl-btn tbl-btn-edit" onclick="editEducation(\'' + e.id + '\')">Edit</button>' +
        '<button class="tbl-btn tbl-btn-del" onclick="deleteEducation(\'' + e.id + '\')">Delete</button>' +
      '</div></div>';
  }).join('');
}

function educationFormHtml(e) {
  e = e || {};
  return '<div class="adm-field"><label>Institution *</label><input id="f-institution" value="' + esc(e.institution || '') + '" placeholder="e.g. African Leadership University" required></div>' +
    '<div class="adm-field"><label>Degree / Qualification *</label><input id="f-degree" value="' + esc(e.degree || '') + '" placeholder="e.g. BSc Software Engineering" required></div>' +
    '<div class="adm-field"><label>Period</label><input id="f-period" value="' + esc(e.period || '') + '" placeholder="e.g. 2024 – Present"></div>' +
    '<div class="adm-field"><label>Description</label><textarea id="f-description" rows="4" placeholder="Brief description...">' + esc(e.description || '') + '</textarea></div>';
}

document.getElementById('new-education-btn').addEventListener('click', function () {
  openModal('Add Education', educationFormHtml(), function () {
    var inst = document.getElementById('f-institution').value.trim();
    var deg  = document.getElementById('f-degree').value.trim();
    if (!inst || !deg) { showToast('Institution and degree are required.'); return; }
    var edu = getStore('education');
    edu.unshift({ id: genId('edu'), institution: inst, degree: deg,
      period: document.getElementById('f-period').value.trim(),
      description: document.getElementById('f-description').value.trim() });
    setStore('education', edu);
    closeModal();
    renderEducation();
    showToast('Education entry added.');
  });
});

function editEducation(id) {
  var edu = getStore('education');
  var e = edu.find(function (x) { return x.id === id; });
  if (!e) return;
  openModal('Edit Education', educationFormHtml(e), function () {
    var inst = document.getElementById('f-institution').value.trim();
    var deg  = document.getElementById('f-degree').value.trim();
    if (!inst || !deg) { showToast('Institution and degree are required.'); return; }
    e.institution = inst;
    e.degree      = deg;
    e.period      = document.getElementById('f-period').value.trim();
    e.description = document.getElementById('f-description').value.trim();
    setStore('education', edu);
    closeModal();
    renderEducation();
    showToast('Education updated.');
  });
}

function deleteEducation(id) {
  if (!confirm('Delete this education entry?')) return;
  setStore('education', getStore('education').filter(function (e) { return e.id !== id; }));
  renderEducation();
  showToast('Entry deleted.');
}

function renderExperience() {
  var exp = getStore('experience');
  var grid = document.getElementById('experience-grid');
  if (exp.length === 0) {
    grid.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">No experience entries yet.</div>';
    return;
  }
  grid.innerHTML = exp.map(function (e) {
    return '<div class="adm-item-card">' +
      '<div style="display:flex;gap:8px;align-items:center;">' +
        '<div class="adm-item-card-meta">' + esc(e.type) + '</div>' +
        '<div style="font-size:0.76rem;color:var(--muted);">' + esc(e.period) + '</div>' +
      '</div>' +
      '<h4>' + esc(e.role) + '</h4>' +
      '<p style="font-size:0.82rem;font-weight:600;color:var(--brand);margin-bottom:4px;">' + esc(e.organization) + '</p>' +
      '<p>' + esc(e.description) + '</p>' +
      '<div class="adm-item-card-actions">' +
        '<button class="tbl-btn tbl-btn-edit" onclick="editExperience(\'' + e.id + '\')">Edit</button>' +
        '<button class="tbl-btn tbl-btn-del" onclick="deleteExperience(\'' + e.id + '\')">Delete</button>' +
      '</div></div>';
  }).join('');
}

function experienceFormHtml(e) {
  e = e || {};
  var types = ['Leadership', 'Work Experience', 'Entrepreneurship', 'Education', 'Volunteer', 'Research'];
  return '<div class="adm-field"><label>Role / Position *</label><input id="f-role" value="' + esc(e.role || '') + '" placeholder="e.g. Sales Representative" required></div>' +
    '<div class="adm-field"><label>Organisation *</label><input id="f-org" value="' + esc(e.organization || '') + '" placeholder="e.g. Company Name" required></div>' +
    '<div class="adm-field-row">' +
      '<div class="adm-field"><label>Type</label><select id="f-type">' +
        types.map(function (t) { return '<option value="' + t + '"' + (e.type === t ? ' selected' : '') + '>' + t + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="adm-field"><label>Period</label><input id="f-period" value="' + esc(e.period || '') + '" placeholder="e.g. 2023 – 2024"></div>' +
    '</div>' +
    '<div class="adm-field"><label>Description</label><textarea id="f-description" rows="4" placeholder="Describe your role and achievements...">' + esc(e.description || '') + '</textarea></div>';
}

document.getElementById('new-experience-btn').addEventListener('click', function () {
  openModal('Add Experience', experienceFormHtml(), function () {
    var role = document.getElementById('f-role').value.trim();
    var org  = document.getElementById('f-org').value.trim();
    if (!role || !org) { showToast('Role and organisation are required.'); return; }
    var exp = getStore('experience');
    exp.unshift({ id: genId('exp'), role: role, organization: org,
      type: document.getElementById('f-type').value,
      period: document.getElementById('f-period').value.trim(),
      description: document.getElementById('f-description').value.trim() });
    setStore('experience', exp);
    closeModal();
    renderExperience();
    showToast('Experience entry added.');
  });
});

function editExperience(id) {
  var exp = getStore('experience');
  var e = exp.find(function (x) { return x.id === id; });
  if (!e) return;
  openModal('Edit Experience', experienceFormHtml(e), function () {
    var role = document.getElementById('f-role').value.trim();
    var org  = document.getElementById('f-org').value.trim();
    if (!role || !org) { showToast('Role and organisation are required.'); return; }
    e.role         = role;
    e.organization = org;
    e.type         = document.getElementById('f-type').value;
    e.period       = document.getElementById('f-period').value.trim();
    e.description  = document.getElementById('f-description').value.trim();
    setStore('experience', exp);
    closeModal();
    renderExperience();
    showToast('Experience updated.');
  });
}

function deleteExperience(id) {
  if (!confirm('Delete this experience entry?')) return;
  setStore('experience', getStore('experience').filter(function (e) { return e.id !== id; }));
  renderExperience();
  showToast('Entry deleted.');
}

/* Metadata for static blog articles (mirrors IDs from blog.js BLOG_ARTICLES) */
var BLOG_META = {
  'financial-intelligence-api':    { title: 'Financial Intelligence API', category: 'Backend Engineering', date: '2026-01-15' },
  'postgresql-vs-mongodb':         { title: 'PostgreSQL vs MongoDB', category: 'Databases', date: '2026-01-28' },
  'scalable-rest-apis':            { title: 'Scalable REST APIs', category: 'Backend Engineering', date: '2026-02-05' },
  'docker-for-backend':            { title: 'Docker for Backend Developers', category: 'DevOps', date: '2026-02-14' },
  'haproxy-load-balancing':        { title: 'HAProxy Load Balancing in Production', category: 'Infrastructure', date: '2026-02-20' },
  'rest-api-best-practices':       { title: 'REST API Best Practices', category: 'Backend Engineering', date: '2026-03-01' },
  'distributed-systems-fundamentals': { title: 'Distributed Systems Fundamentals', category: 'Systems', date: '2026-03-10' },
  'tech-community-education':      { title: 'Technology for Community Education', category: 'Social Impact', date: '2026-03-18' },
  'umubyeyi-digital-divide':       { title: 'Umubyeyi & the Digital Divide', category: 'Social Impact', date: '2026-03-25' },
  'api-security-authentication':   { title: 'API Security & Authentication', category: 'Security', date: '2026-04-01' },
  'cybercrime-africa':             { title: 'Cybercrime in Africa', category: 'Security', date: '2026-04-08' }
};

function renderEngagement() {
  var adminArticles = getStore('articles');
  var likes         = getStore('likes');
  var comments      = getStore('comments');
  var list          = document.getElementById('engagement-list');

  /* Build a unified list: admin articles + static blog articles (deduplicated) */
  var unified = adminArticles.map(function (a) {
    return { id: a.id, title: a.title, category: a.category, date: a.date, published: a.published };
  });

  Object.keys(BLOG_META).forEach(function (id) {
    if (!unified.find(function (a) { return a.id === id; })) {
      var m = BLOG_META[id];
      unified.push({ id: id, title: m.title, category: m.category, date: m.date, published: true });
    }
  });

  /* Also surface any article that already has real engagement data */
  Object.keys(comments).concat(Object.keys(likes)).forEach(function (id) {
    if (!unified.find(function (a) { return a.id === id; })) {
      unified.push({ id: id, title: id, category: '—', date: '', published: true });
    }
  });

  /* Only show articles that actually have engagement or are published */
  var toShow = unified.filter(function (a) {
    return (likes[a.id] || 0) > 0 || (comments[a.id] || []).length > 0 || a.published;
  });

  if (toShow.length === 0) {
    list.innerHTML = '<div class="empty-note">No articles to show engagement for.</div>';
    return;
  }

  list.innerHTML = toShow.map(function (a) {
    var lCount = likes[a.id] || 0;
    var cList  = Array.isArray(comments[a.id]) ? comments[a.id] : [];

    var commentsHtml = cList.length === 0
      ? '<div class="eng-no-comments">No comments yet.</div>'
      : cList.map(function (c) {
          var initials = (c.author || 'A').replace(/\s+/g, ' ').trim().split(' ').map(function(w){ return w[0]; }).join('').substring(0,2).toUpperCase();

          /* Nested user replies */
          var repliesHtml = (c.replies || []).map(function (r) {
            var ri = (r.author || 'A').replace(/\s+/g, ' ').trim().split(' ').map(function(w){ return w[0]; }).join('').substring(0,2).toUpperCase();
            return '<div class="eng-comment-reply-item">' +
              '<div class="eng-comment-reply-avatar">' + ri + '</div>' +
              '<div class="eng-comment-reply-body">' +
                '<strong>' + esc(r.author) + '</strong>' +
                '<p>' + esc(r.text) + '</p>' +
              '</div></div>';
          }).join('');

          /* Admin reply block */
          var adminHtml = c.adminReply
            ? '<div class="eng-admin-reply-block">' +
                '<div class="eng-admin-badge"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Maurice replied</div>' +
                '<p>' + esc(c.adminReply) + '</p>' +
              '</div>'
            : '';

          return '<div class="eng-comment-item" id="adm-cmt-' + esc(c.id) + '">' +
            '<div class="eng-comment-avatar">' + initials + '</div>' +
            '<div class="eng-comment-text" style="flex:1;">' +
              '<div class="eng-comment-meta-row">' +
                '<strong>' + esc(c.author) + '</strong>' +
                '<span class="eng-comment-date" style="margin-left:8px;">' + esc(fmtEngDate(c.date)) + '</span>' +
                '<button class="eng-reply-as-admin" type="button" data-article="' + esc(a.id) + '" data-cid="' + esc(c.id) + '">' +
                  (c.adminReply ? '&#9998; Edit reply' : '+ Reply as Maurice') +
                '</button>' +
              '</div>' +
              '<p>' + esc(c.text) + '</p>' +
              adminHtml +
              (repliesHtml ? '<div class="eng-comment-replies">' + repliesHtml + '</div>' : '') +
              '<div class="eng-admin-reply-form" id="adm-rf-' + esc(c.id) + '">' +
                '<textarea rows="3" placeholder="Write your reply as Maurice…">' + esc(c.adminReply || '') + '</textarea>' +
                '<div class="eng-admin-reply-form-btns">' +
                  '<button type="button" class="eng-save-reply-btn" data-article="' + esc(a.id) + '" data-cid="' + esc(c.id) + '">Save Reply</button>' +
                  '<button type="button" class="eng-cancel-reply-btn" data-cid="' + esc(c.id) + '">Cancel</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
        }).join('');

    return '<div class="eng-article-row">' +
      '<div class="eng-article-head" onclick="toggleEngRow(this)">' +
        '<div style="min-width:0;">' +
          '<div class="eng-article-title">' + esc(a.title) + '</div>' +
          '<div class="eng-article-meta">' + esc(a.category) + (a.date ? ' &middot; ' + esc(a.date) : '') + ' &middot; ' +
            (a.published ? '<span style="color:var(--brand);">Published</span>' : 'Draft') + '</div>' +
        '</div>' +
        '<div class="eng-stats">' +
          '<div class="eng-stat likes">' +
            '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
            lCount + ' likes' +
          '</div>' +
          '<div class="eng-stat comments">' +
            '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
            cList.length + ' comments' +
          '</div>' +
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</div>' +
      '</div>' +
      '<div class="eng-comments-body">' +
        '<div style="padding-top:14px;">' + commentsHtml + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  /* Bind reply-as-Maurice buttons */
  list.querySelectorAll('.eng-reply-as-admin').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var rf = document.getElementById('adm-rf-' + btn.dataset.cid);
      if (rf) { rf.style.display = rf.style.display === 'flex' ? 'none' : 'flex'; }
    });
  });

  /* Bind cancel buttons */
  list.querySelectorAll('.eng-cancel-reply-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var rf = document.getElementById('adm-rf-' + btn.dataset.cid);
      if (rf) rf.style.display = 'none';
    });
  });

  /* Bind save reply buttons */
  list.querySelectorAll('.eng-save-reply-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var articleId = btn.dataset.article;
      var cid       = btn.dataset.cid;
      var rf        = document.getElementById('adm-rf-' + cid);
      var textarea  = rf ? rf.querySelector('textarea') : null;
      if (!textarea) return;
      var replyText = textarea.value.trim();
      if (!replyText) { textarea.style.borderColor = '#c0392b'; return; }
      textarea.style.borderColor = '';

      /* Update comment adminReply in mn_comments */
      var allComments = getStore('comments');
      var cList = Array.isArray(allComments[articleId]) ? allComments[articleId] : [];
      var cmt   = cList.find(function (x) { return x.id === cid; });
      if (cmt) {
        cmt.adminReply = replyText;
        allComments[articleId] = cList;
        setStore('comments', allComments);
      }
      showToast('Reply saved.');
      renderEngagement();
    });
  });
}

function renderMessages() {
  var list = document.getElementById('messages-list');
  var msgs = [];
  try { msgs = JSON.parse(localStorage.getItem('mn_messages') || '[]'); } catch (_) {}

  updateMsgBadge(msgs);

  if (msgs.length === 0) {
    list.innerHTML = '<div class="empty-note">No contact messages yet. Messages from the contact form will appear here.</div>';
    return;
  }

  list.innerHTML = msgs.map(function (m) {
    var initials = (m.name || 'U').replace(/\s+/g,' ').trim().split(' ').map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
    var mailtoSubject = encodeURIComponent('Re: ' + (m.subject || 'Your message'));
    var mailtoBody    = encodeURIComponent('\n\n---\nOriginal message from ' + (m.name || '') + ':\n' + (m.message || ''));
    return '<div class="msg-card' + (m.read ? '' : ' unread') + '" id="msg-' + esc(m.id) + '">' +
      '<div class="msg-card-header">' +
        (m.read ? '' : '<div class="msg-unread-dot"></div>') +
        '<div class="msg-avatar">' + initials + '</div>' +
        '<div class="msg-meta">' +
          '<div class="msg-name">' + esc(m.name) + '</div>' +
          '<div class="msg-email-date">' + esc(m.email) + ' &middot; ' + esc(fmtEngDate(m.date)) + '</div>' +
        '</div>' +
      '</div>' +
      (m.subject ? '<div class="msg-subject">' + esc(m.subject) + '</div>' : '') +
      '<p class="msg-body">' + esc(m.message) + '</p>' +
      '<div class="msg-actions">' +
        '<a class="msg-reply-btn" href="mailto:' + esc(m.email) + '?subject=' + mailtoSubject + '&body=' + mailtoBody + '">' +
          '<svg viewBox="0 0 24 24"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>' +
          'Reply by email' +
        '</a>' +
        (!m.read ? '<button style="background:transparent;border:1px solid var(--line);border-radius:8px;padding:7px 14px;font-size:0.8rem;color:var(--muted);cursor:pointer;" onclick="markMsgRead(\'' + esc(m.id) + '\')" type="button">Mark read</button>' : '') +
      '</div>' +
    '</div>';
  }).join('');
}

function markMsgRead(id) {
  var msgs = [];
  try { msgs = JSON.parse(localStorage.getItem('mn_messages') || '[]'); } catch (_) {}
  msgs = msgs.map(function (m) { return m.id === id ? Object.assign({}, m, { read: true }) : m; });
  localStorage.setItem('mn_messages', JSON.stringify(msgs));
  renderMessages();
}

function markAllRead() {
  var msgs = [];
  try { msgs = JSON.parse(localStorage.getItem('mn_messages') || '[]'); } catch (_) {}
  msgs = msgs.map(function (m) { return Object.assign({}, m, { read: true }); });
  localStorage.setItem('mn_messages', JSON.stringify(msgs));
  renderMessages();
}

function updateMsgBadge(msgs) {
  var badge = document.getElementById('msg-badge');
  if (!badge) return;
  var unread = (msgs || []).filter(function (m) { return !m.read; }).length;
  if (unread > 0) { badge.textContent = unread; badge.style.display = 'inline'; }
  else { badge.style.display = 'none'; }
}

function fmtEngDate(str) {
  if (!str) return '';
  try {
    return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) { return str; }
}

function toggleEngRow(headEl) {
  var body = headEl.nextElementSibling;
  body.classList.toggle('open');
  var arrow = headEl.querySelector('svg:last-child');
  if (arrow) arrow.style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

renderOverview();
