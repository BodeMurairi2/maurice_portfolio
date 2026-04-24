/* ── Blog data ─────────────────────────────────────────────── */

const BLOG_ARTICLES = [
  {
    id: 'financial-intelligence-api',
    topic: 'backend',
    topicLabel: 'Backend Engineering',
    title: 'Building a Financial Intelligence API from Scratch',
    excerpt: 'How I designed and built a RESTful API system for real-time financial anomaly detection, covering architecture decisions, database design, and security hardening.',
    date: 'April 10, 2026',
    readTime: '8 min read',
    content: `
      <p>Building a financial intelligence API is one of the most demanding backend challenges — it requires real-time processing, strict data integrity, and robust security. Here I walk through how I built one from scratch using Python and PostgreSQL.</p>
      <h2>The Architecture</h2>
      <p>The system needed to handle thousands of transactions per second while flagging suspicious patterns in near real-time. I chose a REST architecture over GraphQL for its simplicity and predictability in financial contexts. Every decision was weighed against the constraints of auditability and compliance.</p>
      <h2>Database Design</h2>
      <p>PostgreSQL was the right choice. Its ACID compliance, mature ecosystem, and support for complex queries made it ideal for financial data. I designed the schema around immutable transaction records — once written, a transaction record is never updated, only appended. This creates a clean audit trail.</p>
      <h2>Detection Logic</h2>
      <p>The anomaly detection layer uses a combination of rule-based checks and statistical thresholds. Transactions are scored on multiple dimensions including velocity, geographic outliers, and historical patterns. Suspicious transactions are flagged in a separate queue for human review rather than automatically blocked.</p>
      <h2>Security Considerations</h2>
      <p>Every endpoint requires JWT authentication. Sensitive data is encrypted at rest using AES-256. Rate limiting is enforced at the API gateway level. All inputs are validated and sanitised before reaching the database layer. Parameterised queries everywhere — no string concatenation in SQL.</p>
      <h2>What I Learned</h2>
      <p>The most important lesson: define your failure modes before you write code. In financial systems, knowing exactly what happens when something goes wrong is more important than knowing what happens when everything works.</p>
    `
  },
  {
    id: 'postgresql-vs-mongodb',
    topic: 'backend',
    topicLabel: 'Backend Engineering',
    title: 'Why I Chose PostgreSQL Over MongoDB for My API Projects',
    excerpt: 'A practical comparison of relational vs document databases from the perspective of a backend engineer building data-heavy APIs — and why schema discipline pays off.',
    date: 'March 22, 2026',
    readTime: '6 min read',
    content: `
      <p>The relational vs NoSQL debate continues in backend circles. After using both extensively, I want to share why PostgreSQL has become my default choice for API-driven projects.</p>
      <h2>The Flexibility Trap</h2>
      <p>MongoDB's schema flexibility is often its biggest selling point — and its biggest trap. When you start a project without a strict schema, technical debt accumulates quickly. Data inconsistencies become hard to debug, and migrations become painful as your application grows.</p>
      <h2>Joins Are Not Your Enemy</h2>
      <p>The common criticism of relational databases is that joins are slow. In practice, well-indexed PostgreSQL queries with proper joins outperform equivalent MongoDB aggregations for most structured data workloads — especially when data relationships are well understood from the start.</p>
      <h2>ACID Compliance Matters</h2>
      <p>For any system handling user data, financial records, or transactions, ACID guarantees are non-negotiable. PostgreSQL's strict transactional model has saved me from countless bugs that would have been invisible in a document store. Consistency is not optional in production systems.</p>
      <h2>When MongoDB Makes Sense</h2>
      <p>MongoDB genuinely shines for unstructured content — CMS systems, product catalogs with highly variable attributes, or real-time logging pipelines. The key is matching the tool to the problem, not choosing a default and applying it everywhere.</p>
    `
  },
  {
    id: 'scalable-rest-apis',
    topic: 'backend',
    topicLabel: 'Backend Engineering',
    title: 'Designing Scalable REST APIs: Lessons from Real Projects',
    excerpt: 'Practical patterns I have applied building APIs that need to grow — from versioning strategies to pagination, error handling, and documentation discipline.',
    date: 'February 14, 2026',
    readTime: '7 min read',
    content: `
      <p>A REST API that works for 100 users often breaks at 10,000. Scalability is not just about infrastructure — it starts with design decisions made in the first week of a project.</p>
      <h2>Versioning from Day One</h2>
      <p>The single most important decision before writing your first endpoint is how you will version your API. I use URL-based versioning (/api/v1/) because it is explicit, easy to route at the infrastructure level, and unambiguous to API consumers.</p>
      <h2>Consistent Error Responses</h2>
      <p>Every error should return the same structure: a machine-readable code, a human-readable message, and optionally a details object. Clients should never have to guess what went wrong or parse free-text error strings.</p>
      <h2>Pagination Is Not Optional</h2>
      <p>Every endpoint that returns a list must support pagination from the start — retrofitting it later is painful for API consumers. Cursor-based pagination scales better than offset for large datasets, but offset pagination is acceptable for most moderate-scale use cases.</p>
      <h2>Rate Limiting and Throttling</h2>
      <p>Implement rate limiting from the start, not as an afterthought. HAProxy and Nginx can handle this at the infrastructure level, keeping your application code clean and your database protected from abusive clients.</p>
    `
  },
  {
    id: 'docker-for-backend',
    topic: 'devops',
    topicLabel: 'DevOps & Infrastructure',
    title: 'Docker for Backend Developers: A Practical Guide',
    excerpt: 'Everything I wish I knew when I started containerising backend services — from writing your first Dockerfile to managing multi-container applications with Compose.',
    date: 'April 2, 2026',
    readTime: '10 min read',
    content: `
      <p>Docker changed how I develop and deploy backend services. This guide covers what I consider the essential Docker knowledge for any backend engineer entering production environments.</p>
      <h2>Why Containerisation Matters</h2>
      <p>The classic "it works on my machine" problem disappears when your application and its dependencies are packaged together. Docker guarantees your development, staging, and production environments are identical — eliminating an entire category of bugs.</p>
      <h2>Writing a Good Dockerfile</h2>
      <p>Start from the smallest base image possible. Order your COPY and RUN instructions to maximise layer caching. Use multi-stage builds to keep production images lean — your build tools do not need to be in your production container. Never include secrets or credentials in your image.</p>
      <h2>Docker Compose for Local Development</h2>
      <p>A docker-compose.yml file that spins up your API, database, and cache in one command is one of the most productive tools you can give a development team. New developers can be running the full stack in minutes without reading pages of setup documentation.</p>
      <h2>Container Security Basics</h2>
      <p>Run containers as non-root users. Scan images for vulnerabilities before deploying. Use read-only filesystems where possible. Keep images updated and minimise the attack surface by removing unnecessary packages from your base image.</p>
    `
  },
  {
    id: 'haproxy-load-balancing',
    topic: 'devops',
    topicLabel: 'DevOps & Infrastructure',
    title: 'Load Balancing with HAProxy: From Theory to Production',
    excerpt: 'A hands-on introduction to configuring HAProxy for high-availability deployments, covering health checks, SSL termination, ACL routing, and the stats dashboard.',
    date: 'January 30, 2026',
    readTime: '9 min read',
    content: `
      <p>HAProxy is one of the most battle-tested load balancers available. Understanding it deeply gives you fine-grained control over how traffic flows through your infrastructure and how your system behaves under failure.</p>
      <h2>The Core Concepts</h2>
      <p>HAProxy operates on frontends and backends. Frontends define how traffic enters the system — what port to listen on, what protocol to expect. Backends define how traffic is distributed across your servers. ACLs connect the two, enabling sophisticated routing rules based on any attribute of the request.</p>
      <h2>Health Checks</h2>
      <p>A load balancer without health checks is dangerous. Configure HAProxy to regularly probe each backend server and automatically remove unhealthy instances from the rotation. This makes your system self-healing — a failing server is taken out of service without manual intervention.</p>
      <h2>SSL Termination</h2>
      <p>Terminating SSL at the load balancer reduces the cryptographic overhead on your application servers and simplifies certificate management. HAProxy handles this cleanly with a bind line pointing to your certificate file — your backend servers can then communicate over plain HTTP on a private network.</p>
      <h2>Monitoring with the Stats Page</h2>
      <p>Enable the built-in stats page to get real-time visibility into request rates, error rates, response times, and backend health. In production I expose it only on a private network interface with basic authentication enabled.</p>
    `
  },
  {
    id: 'rest-api-best-practices',
    topic: 'apis',
    topicLabel: 'APIs & System Design',
    title: 'REST API Best Practices Every Developer Should Know',
    excerpt: 'From naming conventions and HTTP semantics to authentication patterns and documentation — the principles that separate good APIs from great ones.',
    date: 'March 5, 2026',
    readTime: '7 min read',
    content: `
      <p>A well-designed API is a joy to consume. A poorly designed one is a source of frustration for every developer who touches it. These are the principles I follow in every API I build.</p>
      <h2>Use Nouns, Not Verbs in Endpoints</h2>
      <p>/users is correct. /getUsers is not. The HTTP method — GET, POST, PUT, DELETE — already expresses the action. Your endpoint path should describe the resource, not the operation. This keeps your API predictable and aligned with REST semantics.</p>
      <h2>HTTP Status Codes Are Not Optional</h2>
      <p>Return 200 for success, 201 for resource creation, 400 for bad client input, 401 for authentication failures, 403 for authorisation failures, 404 for missing resources, and 500 for server errors. Returning 200 for everything forces clients to parse error messages and breaks every HTTP-aware tool in the ecosystem.</p>
      <h2>Document Everything</h2>
      <p>An undocumented API is an unusable API. I use OpenAPI/Swagger specifications and generate interactive documentation from my code. Documentation must be treated as a first-class deliverable — if it is wrong or missing, the API is broken regardless of how well the code works.</p>
      <h2>Idempotency in Write Operations</h2>
      <p>PUT and DELETE operations should be idempotent — calling them multiple times with the same input should produce the same result as calling them once. This makes distributed systems and client retry logic significantly safer and more predictable.</p>
    `
  },
  {
    id: 'distributed-systems-fundamentals',
    topic: 'apis',
    topicLabel: 'APIs & System Design',
    title: 'System Design Fundamentals: Thinking in Distributed Systems',
    excerpt: 'The mental models and architectural patterns that help backend engineers reason about complex systems — from CAP theorem to event-driven architecture and graceful degradation.',
    date: 'February 28, 2026',
    readTime: '11 min read',
    content: `
      <p>Thinking in systems is a skill that separates senior backend engineers from junior ones. These are the foundational concepts I return to whenever I design something new.</p>
      <h2>The CAP Theorem</h2>
      <p>Every distributed system must choose two of three properties: Consistency, Availability, and Partition Tolerance. In practice, network partitions are inevitable in any real-world system, so the real design choice is between consistency and availability when partitions occur.</p>
      <h2>Eventual Consistency</h2>
      <p>Many systems do not need strong consistency. Social media likes, analytics counters, and recommendation engines can tolerate briefly stale data. Embracing eventual consistency where appropriate often unlocks massive scalability improvements that would be impossible under strict consistency requirements.</p>
      <h2>Event-Driven Architecture</h2>
      <p>Decoupling services through event queues reduces tight coupling and improves resilience. When Service A publishes an event and Service B consumes it asynchronously, you gain both flexibility — services can evolve independently — and fault isolation — a failure in Service B does not block Service A.</p>
      <h2>The Fallacies of Distributed Computing</h2>
      <p>The network is not reliable. Latency is not zero. Bandwidth is not infinite. Topology does not change. Every distributed system design must assume failure at every layer and design for graceful degradation — the system should degrade, not fail catastrophically, when components are unavailable.</p>
    `
  },
  {
    id: 'tech-community-education',
    topic: 'impact',
    topicLabel: 'Tech for Social Impact',
    title: 'Technology as a Tool for Community Education in Africa',
    excerpt: 'Reflections on building educational technology for under-resourced communities — the constraints, the breakthroughs, and what genuine impact looks like beyond metrics.',
    date: 'March 15, 2026',
    readTime: '6 min read',
    content: `
      <p>Building technology for social impact is not just about writing code. It requires deep understanding of the communities you are serving, their actual constraints, and what they genuinely need — not what you assume they need.</p>
      <h2>Starting with the Problem</h2>
      <p>In my work with the Umubyeyi Foundation, the problem was clear: communities in Rwanda lacked access to structured educational resources. Schools had teachers but no materials. Students had motivation but no tools. Technology had an opportunity to bridge that gap — but only if it was designed for the actual context.</p>
      <h2>The Infrastructure Constraint</h2>
      <p>Reliable internet connectivity cannot be assumed. Any educational platform built for these communities must work offline, sync when connected, and be lightweight enough to run on low-end Android devices with limited storage. Performance is not a luxury — it is an accessibility requirement.</p>
      <h2>Designing for Real Users</h2>
      <p>The instinct of most developers is to build the most feature-rich solution possible. Impact technology requires the opposite discipline: build the minimum viable feature set that genuinely solves the problem, then iterate based on actual usage and feedback from teachers and students in the field.</p>
      <h2>Measuring Impact, Not Just Engagement</h2>
      <p>Page views and session duration are vanity metrics when the goal is education. The metrics that matter are learning outcomes: quiz scores, course completions, and — most importantly — qualitative feedback from the people the platform is supposed to serve.</p>
    `
  },
  {
    id: 'umubyeyi-digital-divide',
    topic: 'impact',
    topicLabel: 'Tech for Social Impact',
    title: 'How the Umubyeyi Foundation Uses Tech to Bridge the Digital Divide',
    excerpt: 'The story of building a community technology platform in Rwanda — lessons learned, challenges faced, and the principles that guide our approach to ethical, community-centred technology.',
    date: 'January 20, 2026',
    readTime: '5 min read',
    content: `
      <p>The digital divide is not a technology problem. It is a systems problem — involving infrastructure, economics, digital literacy, and policy. Technology can only close the gap when deployed as part of a broader, community-centred strategy.</p>
      <h2>What the Umubyeyi Foundation Does</h2>
      <p>The foundation connects students and educators in underserved communities with curated educational content, peer learning networks, and mentorship from professionals in the Rwandan tech sector. The goal is not just access to information but pathways to meaningful opportunity.</p>
      <h2>The Platform We Built</h2>
      <p>We built a lightweight web platform optimised for slow connections, a content management system that teachers can use without technical training, and a mobile-first interface that works on any smartphone. Every performance decision was made with the lowest-end device in our user base in mind.</p>
      <h2>Partnerships Over Technology</h2>
      <p>The most valuable thing we did was not technical. It was building relationships with school administrators, local government officials, and community leaders. Technology without trust and community buy-in achieves nothing. The relationship work came first — the technology followed.</p>
      <h2>What is Next</h2>
      <p>We are expanding to three additional districts in 2026, building an offline-first mobile application, and exploring partnerships with regional universities to create mentorship and internship pathways for our students graduating into the workforce.</p>
    `
  },
  {
    id: 'api-security-authentication',
    topic: 'security',
    topicLabel: 'Security & Threats',
    title: 'Understanding API Security: Authentication vs Authorisation',
    excerpt: 'Two concepts that are frequently confused but serve entirely different purposes — and why getting them wrong is one of the most common causes of API security breaches.',
    date: 'April 5, 2026',
    readTime: '8 min read',
    content: `
      <p>Authentication answers "who are you?" Authorisation answers "what are you allowed to do?" These are fundamentally different questions, and conflating them leads to security vulnerabilities that are often invisible until they are exploited.</p>
      <h2>Authentication Patterns</h2>
      <p>JWT tokens, API keys, OAuth 2.0, and session cookies all serve authentication. Each has appropriate use cases. JWTs are excellent for stateless APIs but require careful key management and short expiry windows. API keys are simple to implement but must always be transmitted over HTTPS and rotated regularly.</p>
      <h2>Authorisation: RBAC vs ABAC</h2>
      <p>Role-Based Access Control assigns permissions to roles, then assigns roles to users. It is simple to implement and works for most applications. Attribute-Based Access Control is more granular and powerful — decisions can factor in any combination of user, resource, and environment attributes — but significantly more complex to maintain.</p>
      <h2>Common Vulnerabilities</h2>
      <p>Broken object level authorisation (BOLA) is the most common API vulnerability according to the OWASP API Top 10. It occurs when an endpoint does not verify that the requesting user owns or has permission to access the specific resource they are requesting — allowing users to access other users' data by simply changing an ID in the URL.</p>
      <h2>Defence in Depth</h2>
      <p>No single security control is sufficient. Layer authentication at the gateway, authorisation at the service level, and audit logging throughout. Assume any individual layer can be bypassed and design your system to remain secure even when it is.</p>
    `
  },
  {
    id: 'cybercrime-africa',
    topic: 'security',
    topicLabel: 'Security & Threats',
    title: 'Cybercrime Trends in Africa: What Developers Can Do',
    excerpt: 'African digital infrastructure is growing rapidly — and so are the threats targeting it. An overview of the evolving threat landscape and practical steps engineers can take to build more resilient systems.',
    date: 'March 8, 2026',
    readTime: '7 min read',
    content: `
      <p>Africa's digital transformation is accelerating. Mobile money platforms, fintech startups, and government digital services are connecting millions of people to the digital economy for the first time. This growth also dramatically expands the attack surface.</p>
      <h2>The Current Threat Landscape</h2>
      <p>Phishing campaigns targeting mobile money users, ransomware attacks on healthcare infrastructure, and account takeover fraud are among the most prevalent threats across the continent. Many attacks successfully exploit the gap between rapid technological adoption and the slower growth of security awareness and expertise.</p>
      <h2>Why African Systems Are Targeted</h2>
      <p>Rapid growth without commensurate security investment creates exploitable vulnerabilities. Many organisations deploy digital services without dedicated security expertise or incident response capabilities. Attackers identify and target these gaps systematically — they follow the path of least resistance.</p>
      <h2>What Developers Can Do</h2>
      <p>Secure defaults matter enormously at scale. When security is opt-in, it is routinely skipped under time pressure. Build authentication, encryption, and input validation into your frameworks and templates so developers get them automatically. The goal is to make insecure code harder to write than secure code.</p>
      <h2>Building a Security Culture</h2>
      <p>Technical controls are necessary but not sufficient. Security is a culture, not a checklist. Developers need to understand why they are implementing controls — the actual threat they are defending against — not just that they must implement them. Threat modelling sessions and regular security reviews build that understanding over time.</p>
    `
  }
];

/* ── Blog landing page logic ──────────────────────────────── */

(function initBlogLanding() {
  const grid = document.getElementById('blog-posts-grid');
  if (!grid) return;

  const emptyMsg = document.getElementById('blog-empty');

  renderArticles('all');

  document.querySelectorAll('.blog-topic-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.blog-topic-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      renderArticles(this.dataset.topic);
    });
  });

  function renderArticles(topic) {
    const list = topic === 'all'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter(a => a.topic === topic);

    if (list.length === 0) {
      grid.innerHTML = '';
      emptyMsg.hidden = false;
      return;
    }

    emptyMsg.hidden = true;

    const [featured, ...rest] = list;
    let html = featuredCardHTML(featured);

    if (rest.length > 0) {
      html += '<div class="post-cards-grid">';
      rest.forEach(a => { html += cardHTML(a); });
      html += '</div>';
    }

    grid.innerHTML = html;
  }

  function featuredCardHTML(a) {
    return `
      <article class="post-featured-card">
        <span class="post-topic-badge">${a.topicLabel}</span>
        <h2>${a.title}</h2>
        <p>${a.excerpt}</p>
        <div class="post-meta" style="margin-bottom:24px;">
          <span>${a.date}</span>
          <span>${a.readTime}</span>
        </div>
        <a class="btn btn-outline-brand" href="blog-article.html?id=${a.id}">Read Article</a>
      </article>`;
  }

  function cardHTML(a) {
    return `
      <article class="post-card">
        <span class="post-topic-badge">${a.topicLabel}</span>
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        <div class="post-card-footer">
          <div class="post-meta">
            <span>${a.date}</span>
            <span>${a.readTime}</span>
          </div>
          <a class="post-read-link" href="blog-article.html?id=${a.id}">
            Read Article
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </article>`;
  }
}());

/* ── Article detail page logic ────────────────────────────── */

(function initArticlePage() {
  const main = document.getElementById('article-main');
  if (!main) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const article = BLOG_ARTICLES.find(a => a.id === id);

  if (!article) {
    main.innerHTML = `
      <div class="article-not-found">
        <h2>Article not found</h2>
        <p>The article you're looking for doesn't exist.</p>
        <a class="btn btn-outline-brand" href="blog.html" style="margin-top:20px;display:inline-flex;">← Back to Blog</a>
      </div>`;
    return;
  }

  document.title = `${article.title} | MN Blog`;

  main.innerHTML = `
    <section class="article-hero">
      <div class="container">
        <a class="article-back" href="blog.html">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Articles
        </a>
        <span class="post-topic-badge">${article.topicLabel}</span>
        <h1>${article.title}</h1>
        <div class="article-hero-meta">
          <span>${article.date}</span>
          <span class="meta-dot"></span>
          <span>${article.readTime}</span>
          <span class="meta-dot"></span>
          <span>Maurice Nshimyumukiza</span>
        </div>
      </div>
    </section>

    <section class="article-body-section">
      <div class="container">
        <div class="article-prose">
          ${article.content}
          <a class="article-back-bottom" href="blog.html">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to all articles
          </a>
        </div>
      </div>
    </section>

    <section class="eng-section">
      <div class="container">
        <div class="eng-wrap">

          <!-- Like bar -->
          <div class="eng-like-row">
            <button class="eng-like-btn" id="eng-like-btn" type="button">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span id="eng-like-label">Like this article</span>
            </button>
            <span class="eng-like-count" id="eng-like-count">0 likes</span>
          </div>

          <!-- Comments header -->
          <div class="eng-section-head">
            <h3 id="eng-comment-heading">Discussion</h3>
          </div>

          <!-- Comments list -->
          <div id="eng-comments-list"></div>

          <!-- New comment form -->
          <div class="eng-new-comment">
            <h4>Leave a comment</h4>
            <form id="eng-comment-form" novalidate>
              <div class="eng-form-row">
                <input id="eng-author" type="text" placeholder="Your name *" required>
                <input id="eng-email" type="email" placeholder="Email (optional)">
              </div>
              <textarea id="eng-text" rows="4" placeholder="Share your thoughts on this article…" required></textarea>
              <button type="submit" class="btn btn-outline-brand">Post Comment</button>
            </form>
          </div>

        </div>
      </div>
    </section>`;

  initEngagement(article.id);
}());

/* ── Likes & Comments engine ─────────────────────────────── */

(function () {

  function engStore(key) {
    try { var v = localStorage.getItem('mn_' + key); return v ? JSON.parse(v) : (key === 'likes' ? {} : {}); }
    catch (e) { return {}; }
  }

  function engSave(key, val) {
    localStorage.setItem('mn_' + key, JSON.stringify(val));
  }

  function engGenId(p) {
    return p + '-' + Date.now() + '-' + Math.floor(Math.random() * 9999);
  }

  function engEsc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function engInitials(name) {
    return (name || 'A').trim().split(' ').map(function(w){ return w[0]; }).slice(0,2).join('').toUpperCase();
  }

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric' }); }
    catch(e) { return iso; }
  }

  window.initEngagement = function (articleId) {
    var likeBtn   = document.getElementById('eng-like-btn');
    var likeCount = document.getElementById('eng-like-count');
    var likeLabel = document.getElementById('eng-like-label');
    if (!likeBtn) return;

    /* ── LIKES ── */
    function renderLikes() {
      var likes   = engStore('likes');
      var liked   = engStore('liked_articles');
      var count   = likes[articleId] || 0;
      var hasLiked = !!liked[articleId];
      likeCount.textContent = count + (count === 1 ? ' like' : ' likes');
      likeLabel.textContent = hasLiked ? 'Liked!' : 'Like this article';
      likeBtn.classList.toggle('eng-liked', hasLiked);
    }

    likeBtn.addEventListener('click', function () {
      var likes  = engStore('likes');
      var liked  = engStore('liked_articles');
      if (liked[articleId]) return;
      likes[articleId] = (likes[articleId] || 0) + 1;
      liked[articleId] = true;
      engSave('likes', likes);
      engSave('liked_articles', liked);
      renderLikes();
      likeBtn.style.transform = 'scale(1.18)';
      setTimeout(function(){ likeBtn.style.transform = ''; }, 200);
    });

    renderLikes();

    /* ── COMMENTS ── */
    function getComments() {
      var all = engStore('comments');
      return Array.isArray(all[articleId]) ? all[articleId] : [];
    }

    function saveComments(list) {
      var all = engStore('comments');
      all[articleId] = list;
      engSave('comments', all);
    }

    function renderComments() {
      var list = getComments();
      var heading = document.getElementById('eng-comment-heading');
      if (heading) heading.textContent = list.length === 0 ? 'Discussion' : 'Discussion (' + list.length + ')';

      var container = document.getElementById('eng-comments-list');
      if (!container) return;

      if (list.length === 0) {
        container.innerHTML = '<p class="eng-no-comments">No comments yet. Be the first to share your thoughts!</p>';
        return;
      }

      container.innerHTML = list.map(function (c) {
        var repliesHtml = '';
        (c.replies || []).forEach(function (r) {
          repliesHtml += '<div class="eng-reply-item">' +
            '<div class="eng-reply-avatar">' + engEsc(engInitials(r.author)) + '</div>' +
            '<div class="eng-reply-body">' +
              '<div class="eng-reply-header"><strong>' + engEsc(r.author) + '</strong><span>' + engEsc(fmtDate(r.date)) + '</span></div>' +
              '<p>' + engEsc(r.text) + '</p>' +
            '</div></div>';
        });

        var adminHtml = '';
        if (c.adminReply) {
          adminHtml = '<div class="eng-admin-reply">' +
            '<div class="eng-admin-badge"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Maurice replied</div>' +
            '<p>' + engEsc(c.adminReply) + '</p>' +
          '</div>';
        }

        return '<div class="eng-comment" id="cmt-' + engEsc(c.id) + '">' +
          '<div class="eng-comment-header">' +
            '<div class="eng-cmt-avatar">' + engEsc(engInitials(c.author)) + '</div>' +
            '<div class="eng-cmt-info"><strong>' + engEsc(c.author) + '</strong><span>' + engEsc(fmtDate(c.date)) + '</span></div>' +
            '<button class="eng-reply-toggle" type="button" data-cid="' + engEsc(c.id) + '">Reply</button>' +
          '</div>' +
          '<div class="eng-comment-text"><p>' + engEsc(c.text) + '</p></div>' +
          adminHtml +
          (repliesHtml ? '<div class="eng-replies">' + repliesHtml + '</div>' : '') +
          '<div class="eng-reply-form" id="rf-' + engEsc(c.id) + '" style="display:none;">' +
            '<div class="eng-form-row"><input type="text" class="eng-ri-author" placeholder="Your name *"></div>' +
            '<textarea class="eng-ri-text" rows="3" placeholder="Write your reply…"></textarea>' +
            '<div style="display:flex;gap:10px;margin-top:8px;">' +
              '<button type="button" class="btn btn-outline-brand eng-submit-reply" data-cid="' + engEsc(c.id) + '" style="min-height:38px;padding:8px 18px;font-size:0.84rem;">Post Reply</button>' +
              '<button type="button" class="eng-cancel-reply" data-cid="' + engEsc(c.id) + '" style="background:transparent;border:0;color:var(--muted);font-size:0.84rem;cursor:pointer;">Cancel</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');

      /* bind reply toggles */
      container.querySelectorAll('.eng-reply-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var rf = document.getElementById('rf-' + btn.dataset.cid);
          if (rf) { rf.style.display = rf.style.display === 'none' ? 'block' : 'none'; }
        });
      });

      /* bind cancel */
      container.querySelectorAll('.eng-cancel-reply').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var rf = document.getElementById('rf-' + btn.dataset.cid);
          if (rf) rf.style.display = 'none';
        });
      });

      /* bind submit reply */
      container.querySelectorAll('.eng-submit-reply').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var cid = btn.dataset.cid;
          var rf  = document.getElementById('rf-' + cid);
          var nameEl = rf.querySelector('.eng-ri-author');
          var textEl = rf.querySelector('.eng-ri-text');
          if (!nameEl.value.trim() || !textEl.value.trim()) {
            nameEl.style.borderColor = '#c0392b';
            return;
          }
          nameEl.style.borderColor = '';
          var list = getComments();
          var cmt  = list.find(function(x){ return x.id === cid; });
          if (!cmt) return;
          if (!cmt.replies) cmt.replies = [];
          cmt.replies.push({ id: engGenId('r'), author: nameEl.value.trim(), text: textEl.value.trim(), date: new Date().toISOString() });
          saveComments(list);
          renderComments();
        });
      });
    }

    /* New comment form */
    var commentForm = document.getElementById('eng-comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var author = document.getElementById('eng-author').value.trim();
        var text   = document.getElementById('eng-text').value.trim();
        if (!author || !text) return;
        var list = getComments();
        list.push({ id: engGenId('c'), author: author, text: text, date: new Date().toISOString(), adminReply: null, replies: [] });
        saveComments(list);
        commentForm.reset();
        renderComments();
        var container = document.getElementById('eng-comments-list');
        if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    renderComments();
  };

}());
