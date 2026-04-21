const API_BASE = window.PORTFOLIO_API_BASE || "http://127.0.0.1:8000";
const page = document.body.dataset.page;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function formatDate(value) {
  if (!value) return "Present";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const data = await response.json();
      message = data.detail || message;
    } catch (error) {
      message = message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function renderEmptyState(target, message) {
  if (!target) return;
  target.innerHTML = `<div class="empty-state"><p>${escapeHtml(message)}</p></div>`;
}

function createDataItem(title, body, actions = "") {
  return `
    <article class="data-item">
      <strong>${escapeHtml(title)}</strong>
      <p>${body}</p>
      ${actions ? `<div class="action-row">${actions}</div>` : ""}
    </article>
  `;
}

function optionalDateInput(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function renderPortfolioEditForm(kind, item) {
  if (kind === "Education") {
    return `
      <form class="reply-form portfolio-update-form" data-kind="education" data-id="${item.education_id}">
        <input type="text" name="institution_name" value="${escapeHtml(item.institution_name)}" required>
        <input type="url" name="institution_url" value="${escapeHtml(item.institution_url || "")}" placeholder="Institution URL">
        <input type="text" name="degree" value="${escapeHtml(item.degree)}" required>
        <textarea name="description" rows="2">${escapeHtml(item.description || "")}</textarea>
        <div class="form-row two-up">
          <input type="date" name="start_date" value="${optionalDateInput(item.start_date)}" required>
          <input type="date" name="end_date" value="${optionalDateInput(item.end_date)}">
        </div>
        <div class="action-row">
          <button class="small-button" type="submit">Update</button>
          <button class="small-button danger delete-button" data-path="/portfolio/educations" data-id="${item.education_id}" type="button">Delete</button>
        </div>
      </form>
    `;
  }

  if (kind === "Experience") {
    return `
      <form class="reply-form portfolio-update-form" data-kind="experience" data-id="${item.experience_id}">
        <input type="text" name="company" value="${escapeHtml(item.company)}" required>
        <input type="url" name="company_url" value="${escapeHtml(item.company_url || "")}" placeholder="Company URL">
        <input type="text" name="role" value="${escapeHtml(item.role)}" required>
        <textarea name="description" rows="2">${escapeHtml(item.description || "")}</textarea>
        <div class="form-row two-up">
          <input type="date" name="start_date" value="${optionalDateInput(item.start_date)}" required>
          <input type="date" name="end_date" value="${optionalDateInput(item.end_date)}">
        </div>
        <div class="action-row">
          <button class="small-button" type="submit">Update</button>
          <button class="small-button danger delete-button" data-path="/portfolio/experiences" data-id="${item.experience_id}" type="button">Delete</button>
        </div>
      </form>
    `;
  }

  if (kind === "Projects") {
    return `
      <form class="reply-form portfolio-update-form" data-kind="project" data-id="${item.project_id}">
        <input type="text" name="title" value="${escapeHtml(item.title)}" required>
        <textarea name="description" rows="2" required>${escapeHtml(item.description || "")}</textarea>
        <input type="url" name="link" value="${escapeHtml(item.link || "")}" placeholder="Repository URL">
        <input type="url" name="demo_url" value="${escapeHtml(item.demo_url || "")}" placeholder="Demo URL">
        <div class="form-row two-up">
          <input type="date" name="start_date" value="${optionalDateInput(item.start_date)}" required>
          <input type="date" name="end_date" value="${optionalDateInput(item.end_date)}">
        </div>
        <div class="action-row">
          <button class="small-button" type="submit">Update</button>
          <button class="small-button danger delete-button" data-path="/portfolio/projects" data-id="${item.project_id}" type="button">Delete</button>
        </div>
      </form>
    `;
  }

  return `
    <form class="reply-form portfolio-update-form" data-kind="certification" data-id="${item.certification_id}">
      <input type="text" name="title" value="${escapeHtml(item.title)}" required>
      <input type="text" name="organization" value="${escapeHtml(item.organization)}" required>
      <input type="date" name="date_completion" value="${optionalDateInput(item.date_completion)}" required>
      <textarea name="description" rows="2" required>${escapeHtml(item.description || "")}</textarea>
      <input type="url" name="certificate_url" value="${escapeHtml(item.certificate_url || "")}" placeholder="Certificate URL">
      <div class="action-row">
        <button class="small-button" type="submit">Update</button>
        <button class="small-button danger delete-button" data-path="/portfolio/certifications" data-id="${item.certification_id}" type="button">Delete</button>
      </div>
    </form>
  `;
}

async function loadHomePage() {
  const [portfolio, skills, blogs, analytics] = await Promise.all([
    api("/portfolio"),
    api("/skills"),
    api("/blogs"),
    api("/analytics"),
  ]);

  document.getElementById("metric-projects").textContent = portfolio.projects.length;
  document.getElementById("metric-skills").textContent = skills.length;
  document.getElementById("metric-blogs").textContent = blogs.length;
  document.getElementById("metric-visitors").textContent = analytics.visitors;

  const homeProjects = document.getElementById("home-projects");
  homeProjects.innerHTML = portfolio.projects.slice(0, 3).map((project) => `
    <article class="feature-card">
      <p class="feature-kicker">Project</p>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="timeline-meta">
        <span>${formatDate(project.start_date)}</span>
        <span>${formatDate(project.end_date)}</span>
      </div>
      <div class="link-row">
        ${project.link ? `<a class="inline-link" href="${project.link}" target="_blank" rel="noreferrer">Repository</a>` : ""}
        ${project.demo_url ? `<a class="inline-link" href="${project.demo_url}" target="_blank" rel="noreferrer">Live Demo</a>` : ""}
      </div>
    </article>
  `).join("");

  const skillPreview = document.getElementById("home-skills");
  skillPreview.innerHTML = skills.slice(0, 8).map((skill) => `
    <span class="chip">${escapeHtml(skill.name)} · ${escapeHtml(skill.category)}</span>
  `).join("");

  const messageForm = document.getElementById("message-form");
  const messageStatus = document.getElementById("message-status");
  if (messageForm && messageStatus) {
    messageForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(messageForm);
      const payload = Object.fromEntries(formData.entries());
      messageStatus.textContent = "Sending...";
      try {
        await api("/messages", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        messageForm.reset();
        messageStatus.textContent = "Message sent successfully.";
      } catch (error) {
        messageStatus.textContent = error.message;
      }
    });
  }
}

async function loadSkillsPage() {
  const skills = await api("/skills");
  document.getElementById("skills-count").textContent = `${skills.length} loaded`;

  const grouped = skills.reduce((accumulator, skill) => {
    const key = skill.category || "Other";
    accumulator[key] = accumulator[key] || [];
    accumulator[key].push(skill);
    return accumulator;
  }, {});

  const groups = Object.entries(grouped).sort(([left], [right]) => left.localeCompare(right));
  const target = document.getElementById("skills-groups");

  target.innerHTML = groups.map(([category, items]) => `
    <section class="panel skill-category">
      <p class="feature-kicker">${escapeHtml(category)}</p>
      <h3>${escapeHtml(category)} Skills</h3>
      <div class="skill-list">
        ${items.map((skill) => `
          <article class="skill-item">
            <header>
              <strong>${escapeHtml(skill.name)}</strong>
              <span>${skill.level}%</span>
            </header>
            <div class="level-bar"><span style="width:${skill.level}%"></span></div>
            <p>${escapeHtml(skill.description || "No description provided.")}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
}

async function loadPortfolioPage() {
  const [portfolio, achievements] = await Promise.all([
    api("/portfolio"),
    api("/resume/achievements"),
  ]);

  const sections = [
    {
      title: "Education",
      description: "Academic background and training.",
      items: portfolio.educations.map((item) => ({
        heading: item.degree,
        meta: `${item.institution_name} · ${formatDate(item.start_date)} - ${formatDate(item.end_date)}`,
        body: item.description || "No description provided.",
      })),
    },
    {
      title: "Experience",
      description: "Professional roles and leadership work.",
      items: portfolio.experiences.map((item) => ({
        heading: item.role,
        meta: `${item.company} · ${formatDate(item.start_date)} - ${formatDate(item.end_date)}`,
        body: item.description || "No description provided.",
      })),
    },
    {
      title: "Projects",
      description: "Selected work and shipped builds.",
      items: portfolio.projects.map((item) => ({
        heading: item.title,
        meta: `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`,
        body: `${item.description}${item.link ? ` Repository: ${item.link}` : ""}${item.demo_url ? ` Demo: ${item.demo_url}` : ""}`,
      })),
    },
    {
      title: "Certifications",
      description: "Programs and credentials completed.",
      items: portfolio.certifications.map((item) => ({
        heading: item.title,
        meta: `${item.organization} · ${formatDate(item.date_completion)}`,
        body: `${item.description}${item.certificate_url ? ` Certificate: ${item.certificate_url}` : ""}`,
      })),
    },
    {
      title: "Achievements",
      description: "Milestones and recognitions from the resume endpoints.",
      items: achievements.map((item) => ({
        heading: item.title,
        meta: `${formatDate(item.achieved_at)}`,
        body: item.description,
      })),
    },
  ];

  const target = document.getElementById("portfolio-sections");
  target.innerHTML = sections.map((section) => `
    <details class="panel timeline-card expandable" open>
      <summary>
        <div>
          <p class="feature-kicker">${escapeHtml(section.title)}</p>
          <h2>${escapeHtml(section.title)}</h2>
          <p>${escapeHtml(section.description)}</p>
        </div>
      </summary>
      <div class="timeline-list">
        ${section.items.map((item) => `
          <article class="data-item">
            <strong>${escapeHtml(item.heading)}</strong>
            <div class="timeline-meta"><span>${escapeHtml(item.meta)}</span></div>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `).join("")}
      </div>
    </details>
  `).join("");
}

function renderBlogPosts(posts) {
  const target = document.getElementById("blog-posts");
  if (!posts.length) {
    renderEmptyState(target, "No blog posts matched your search.");
    return;
  }

  target.innerHTML = posts.map((post) => {
    const media = post.media_url
      ? post.media_type === "video"
        ? `<video controls src="${post.media_url}"></video>`
        : `<img src="${post.media_url}" alt="${escapeHtml(post.title)}">`
      : "";

    const preview = post.content.length > 190 ? `${post.content.slice(0, 190)}...` : post.content;
    return `
      <article class="blog-card">
        ${media}
        <div>
          <div class="blog-meta">
            <span>${escapeHtml(post.author)}</span>
            <span>${formatDate(post.date)}</span>
            <span>${post.likes} likes</span>
          </div>
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.summary || preview)}</p>
        </div>
        <details class="expandable">
          <summary>Read More</summary>
          <p>${escapeHtml(post.content)}</p>
        </details>
        <div class="chips-wrap">${(post.tags || []).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="action-row">
          <button class="small-button like-button" data-post-id="${post.post_id}" type="button">Like Post</button>
        </div>
        <div class="comment-list">
          ${(post.comments || []).map((comment) => `
            <article class="comment-item">
              <strong>${escapeHtml(comment.author)}</strong>
              <div class="timeline-meta"><span>${formatDate(comment.created_at)}</span></div>
              <p>${escapeHtml(comment.content)}</p>
              ${comment.reply ? `<p><strong>Admin reply:</strong> ${escapeHtml(comment.reply)}</p>` : ""}
            </article>
          `).join("")}
        </div>
        <form class="comment-form" data-post-id="${post.post_id}">
          <input type="text" name="author" placeholder="Your name" required>
          <textarea name="content" rows="3" placeholder="Add a comment" required></textarea>
          <button class="btn btn-secondary" type="submit">Post Comment</button>
        </form>
      </article>
    `;
  }).join("");

  target.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", async () => {
      await api(`/blogs/${button.dataset.postId}/like`, { method: "POST" });
      await loadBlogPage(document.getElementById("blog-search").value.trim());
    });
  });

  target.querySelectorAll(".comment-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      await api("/comments", {
        method: "POST",
        body: JSON.stringify({
          post_id: form.dataset.postId,
          author: data.get("author"),
          content: data.get("content"),
        }),
      });
      await loadBlogPage(document.getElementById("blog-search").value.trim());
    });
  });
}

async function loadBlogPage(query = "") {
  const posts = await api(`/blogs${query ? `?query=${encodeURIComponent(query)}` : ""}`);
  renderBlogPosts(posts);

  const input = document.getElementById("blog-search");
  const button = document.getElementById("blog-search-button");
  if (button && !button.dataset.bound) {
    const runSearch = () => loadBlogPage(input.value.trim());
    button.dataset.bound = "true";
    button.addEventListener("click", runSearch);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        runSearch();
      }
    });
  }
}

async function loadAdminLoginPage() {
  const form = document.getElementById("admin-login-form");
  const status = document.getElementById("admin-login-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    status.textContent = "Signing in...";
    try {
      const response = await api("/admin/login", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!response.success) {
        status.textContent = "Invalid credentials.";
        return;
      }
      localStorage.setItem("portfolio-admin-token", response.token);
      localStorage.setItem("portfolio-admin-name", response.admin_name);
      status.textContent = "Login successful. Redirecting...";
      window.location.href = "admin-dashboard.html";
    } catch (error) {
      status.textContent = error.message;
    }
  });
}

function ensureAdminAccess() {
  const token = localStorage.getItem("portfolio-admin-token");
  if (!token) {
    window.location.href = "admin-login.html";
    return false;
  }
  return true;
}

function dateToIso(dateValue) {
  return dateValue ? new Date(`${dateValue}T00:00:00`).toISOString() : null;
}

function formEntries(form) {
  const raw = Object.fromEntries(new FormData(form).entries());
  Object.keys(raw).forEach((key) => {
    if (raw[key] === "") {
      raw[key] = null;
    }
  });
  return raw;
}

function bindCreateForm(formId, path, transform, onSuccess) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = transform(formEntries(form));
    await api(path, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    form.reset();
    await onSuccess();
  });
}

async function renderDashboard() {
  const [portfolio, skills, blogs, messages, analytics] = await Promise.all([
    api("/portfolio"),
    api("/skills"),
    api("/blogs"),
    api("/messages"),
    api("/analytics"),
  ]);

  document.getElementById("dashboard-metrics").innerHTML = `
    <article class="metric-card"><strong>${analytics.visitors}</strong><span>Total visitors</span></article>
    <article class="metric-card"><strong>${analytics.blog_engagement.likes}</strong><span>Blog likes</span></article>
    <article class="metric-card"><strong>${analytics.blog_engagement.comments}</strong><span>Comments</span></article>
    <article class="metric-card"><strong>${analytics.messages_received}</strong><span>Messages received</span></article>
    <article class="metric-card"><strong>${analytics.page_visits.blogs}</strong><span>Blog page visits</span></article>
  `;

  const portfolioLists = [
    ["Education", portfolio.educations, "education_id", "/portfolio/educations"],
    ["Experience", portfolio.experiences, "experience_id", "/portfolio/experiences"],
    ["Projects", portfolio.projects, "project_id", "/portfolio/projects"],
    ["Certifications", portfolio.certifications, "certification_id", "/portfolio/certifications"],
  ];

  document.getElementById("portfolio-admin-lists").innerHTML = portfolioLists.map(([label, items, idField, path]) => `
    <div class="data-list-card">
      <div class="list-header">
        <h3>${label}</h3>
        <p>${items.length} entries</p>
      </div>
      <div class="data-list">
        ${items.map((item) => {
          const title = item.title || item.degree || item.role || item.organization || item.institution_name || item.company;
          const body = item.description || `${item.institution_name || item.company || item.organization || ""}`;
          return `
            <article class="data-item">
              <strong>${escapeHtml(title)}</strong>
              <p>${escapeHtml(body)}</p>
              ${renderPortfolioEditForm(label, item)}
            </article>
          `;
        }).join("")}
      </div>
    </div>
  `).join("");

  document.getElementById("skills-admin-list").innerHTML = `
    <div class="data-list">
      ${skills.map((skill) => createDataItem(
        `${skill.name} (${skill.level}%)`,
        escapeHtml(`${skill.category}${skill.description ? ` · ${skill.description}` : ""}`),
        `
          <form class="reply-form skill-update-form" data-id="${skill.skill_id}">
            <input type="text" name="name" value="${escapeHtml(skill.name)}" required>
            <div class="form-row two-up">
              <input type="text" name="category" value="${escapeHtml(skill.category)}" required>
              <input type="number" name="level" min="1" max="100" value="${skill.level}" required>
            </div>
            <textarea name="description" rows="2">${escapeHtml(skill.description || "")}</textarea>
            <div class="action-row">
              <button class="small-button" type="submit">Update</button>
              <button class="small-button danger delete-button" data-path="/skills" data-id="${skill.skill_id}" type="button">Delete</button>
            </div>
          </form>
        `
      )).join("")}
    </div>
  `;

  document.getElementById("blogs-admin-list").innerHTML = `
    <div class="data-list">
      ${blogs.map((blog) => createDataItem(
        blog.title,
        escapeHtml(`${blog.author} · ${formatDate(blog.date)} · ${blog.likes} likes`),
        `
          <form class="reply-form blog-update-form" data-id="${blog.post_id}" data-date="${blog.date}" data-likes="${blog.likes}">
            <input type="text" name="title" value="${escapeHtml(blog.title)}" required>
            <input type="text" name="author" value="${escapeHtml(blog.author)}" required>
            <textarea name="summary" rows="2" required>${escapeHtml(blog.summary || "")}</textarea>
            <textarea name="content" rows="4" required>${escapeHtml(blog.content || "")}</textarea>
            <div class="form-row two-up">
              <select name="media_type">
                <option value="image" ${blog.media_type === "image" ? "selected" : ""}>Image</option>
                <option value="video" ${blog.media_type === "video" ? "selected" : ""}>Video</option>
              </select>
              <input type="url" name="media_url" value="${escapeHtml(blog.media_url || "")}" placeholder="Media URL">
            </div>
            <input type="text" name="tags" value="${escapeHtml((blog.tags || []).join(", "))}" placeholder="Tags">
            <div class="action-row">
              <button class="small-button" type="submit">Update</button>
              <button class="small-button danger delete-button" data-path="/blogs" data-id="${blog.post_id}" type="button">Delete</button>
            </div>
          </form>
        `
      )).join("")}
    </div>
  `;

  document.getElementById("comments-admin-list").innerHTML = `
    <div class="data-list">
      ${blogs.flatMap((blog) => (blog.comments || []).map((comment) => `
        <article class="data-item">
          <strong>${escapeHtml(comment.author)} on ${escapeHtml(blog.title)}</strong>
          <p>${escapeHtml(comment.content)}</p>
          ${comment.reply ? `<p><strong>Reply:</strong> ${escapeHtml(comment.reply)}</p>` : ""}
          <form class="reply-form" data-comment-id="${comment.comment_id}">
            <textarea name="reply" rows="2" placeholder="Write a reply">${escapeHtml(comment.reply || "")}</textarea>
            <div class="action-row">
              <button class="small-button" type="submit">Save Reply</button>
              <button class="small-button danger delete-button" data-path="/comments" data-id="${comment.comment_id}" type="button">Delete</button>
            </div>
          </form>
        </article>
      `)).join("")).join("")}
    </div>
  `;

  document.getElementById("messages-admin-list").innerHTML = `
    <div class="data-list">
      ${messages.map((message) => `
        <article class="data-item">
          <strong>${escapeHtml(message.subject)}</strong>
          <p>${escapeHtml(message.name)} · ${escapeHtml(message.email)}</p>
          <p>${escapeHtml(message.message)}</p>
          ${message.response ? `<p><strong>Response:</strong> ${escapeHtml(message.response)}</p>` : ""}
          <form class="reply-form" data-message-id="${message.message_id}">
            <textarea name="reply" rows="2" placeholder="Write a direct response">${escapeHtml(message.response || "")}</textarea>
            <button class="small-button" type="submit">Send Response</button>
          </form>
        </article>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", async () => {
      await api(`${button.dataset.path}/${button.dataset.id}`, { method: "DELETE" });
      await renderDashboard();
    });
  });

  document.querySelectorAll(".reply-form[data-comment-id]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const reply = new FormData(form).get("reply");
      await api(`/comments/${form.dataset.commentId}/reply`, {
        method: "PUT",
        body: JSON.stringify({ reply }),
      });
      await renderDashboard();
    });
  });

  document.querySelectorAll(".reply-form[data-message-id]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const reply = new FormData(form).get("reply");
      await api(`/messages/${form.dataset.messageId}/reply`, {
        method: "PUT",
        body: JSON.stringify({ reply }),
      });
      await renderDashboard();
    });
  });

  document.querySelectorAll(".portfolio-update-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = formEntries(form);
      const kind = form.dataset.kind;
      const id = form.dataset.id;
      const configs = {
        education: {
          path: `/portfolio/educations/${id}`,
          payload: {
            ...data,
            start_date: dateToIso(data.start_date),
            end_date: dateToIso(data.end_date),
          },
        },
        experience: {
          path: `/portfolio/experiences/${id}`,
          payload: {
            ...data,
            start_date: dateToIso(data.start_date),
            end_date: dateToIso(data.end_date),
          },
        },
        project: {
          path: `/portfolio/projects/${id}`,
          payload: {
            ...data,
            start_date: dateToIso(data.start_date),
            end_date: dateToIso(data.end_date),
          },
        },
        certification: {
          path: `/portfolio/certifications/${id}`,
          payload: {
            ...data,
            date_completion: dateToIso(data.date_completion),
          },
        },
      };
      await api(configs[kind].path, {
        method: "PUT",
        body: JSON.stringify(configs[kind].payload),
      });
      await renderDashboard();
    });
  });

  document.querySelectorAll(".skill-update-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = formEntries(form);
      await api(`/skills/${form.dataset.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          level: Number(data.level),
        }),
      });
      await renderDashboard();
    });
  });

  document.querySelectorAll(".blog-update-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = formEntries(form);
      await api(`/blogs/${form.dataset.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          date: form.dataset.date,
          summary: data.summary,
          content: data.content,
          media_type: data.media_type || "image",
          media_url: data.media_url,
          tags: (data.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean),
          likes: Number(form.dataset.likes || 0),
        }),
      });
      await renderDashboard();
    });
  });
}

function bindDashboardForms() {
  bindCreateForm("education-form", "/portfolio/educations", (data) => ({
    ...data,
    start_date: dateToIso(data.start_date),
    end_date: dateToIso(data.end_date),
  }), renderDashboard);

  bindCreateForm("experience-form", "/portfolio/experiences", (data) => ({
    ...data,
    start_date: dateToIso(data.start_date),
    end_date: dateToIso(data.end_date),
  }), renderDashboard);

  bindCreateForm("project-form", "/portfolio/projects", (data) => ({
    ...data,
    start_date: dateToIso(data.start_date),
    end_date: dateToIso(data.end_date),
  }), renderDashboard);

  bindCreateForm("certification-form", "/portfolio/certifications", (data) => ({
    ...data,
    date_completion: dateToIso(data.date_completion),
  }), renderDashboard);

  bindCreateForm("skill-form", "/skills", (data) => ({
    ...data,
    level: Number(data.level),
  }), renderDashboard);

  bindCreateForm("blog-form", "/blogs", (data) => ({
    title: data.title,
    author: data.author,
    summary: data.summary,
    content: data.content,
    media_type: data.media_type || "image",
    media_url: data.media_url,
    tags: (data.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    likes: 0,
  }), renderDashboard);
}

async function bootstrap() {
  try {
    if (page === "home") await loadHomePage();
    if (page === "skills") await loadSkillsPage();
    if (page === "portfolio") await loadPortfolioPage();
    if (page === "blog") await loadBlogPage();
    if (page === "admin-login") await loadAdminLoginPage();
    if (page === "admin-dashboard") {
      if (!ensureAdminAccess()) return;
      bindDashboardForms();
      await renderDashboard();
    }
  } catch (error) {
    const fallbackTarget =
      document.querySelector("#home-projects, #skills-groups, #portfolio-sections, #blog-posts, #dashboard-metrics");
    renderEmptyState(
      fallbackTarget,
      `Unable to load API data. Start the backend and confirm it is reachable at ${API_BASE}.`
    );
    console.error(error);
  }
}

bootstrap();
