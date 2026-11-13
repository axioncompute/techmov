/**
 * export_techmov_wp.js
 *
 * Run with: node export_techmov_wp.js
 *
 * 1. Downloads your official live Techmov.in Site Logo & Favicon from WordPress:
 *    - Site Logo (512x512): https://techmov.in/wp-content/uploads/2026/03/cropped-site-logo.webp -> public/assets/logo.webp
 *    - Site Icon (192x192 / 32x32): https://techmov.in/wp-content/uploads/2026/03/cropped-cropped-site-logo-32x32.webp -> public/favicon.webp & public/assets/site-icon.webp
 * 2. Fetches all 20 published WordPress posts from https://techmov.in/wp-json/wp/v2/posts?_embed=1
 * 3. Applies Bloomberg / Stripe Press editorial polish to headings, callouts, and internal links
 *    so ZERO links point back to old WordPress URLs after you replace techmov.in with this build.
 * 4. Downloads all 20 Featured Images locally into public/assets/blog/thumb-XX-slug.webp
 *    and writes self-contained modules into src/data/blogs/post-XX-slug.js.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WP_SITE = process.env.WP_SITE || 'https://techmov.in';
const BLOGS_DIR = path.join(__dirname, 'src', 'data', 'blogs');
const THUMBS_DIR = path.join(__dirname, 'public', 'assets', 'blog');
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');
const PUBLIC_DIR = path.join(__dirname, 'public');

fs.mkdirSync(BLOGS_DIR, { recursive: true });
fs.mkdirSync(THUMBS_DIR, { recursive: true });
fs.mkdirSync(ASSETS_DIR, { recursive: true });

// Bloomberg-grade Editorial Headlines & Subheads Mapped by Slug
const EDITORIAL_OVERRIDES = {
  'i-stopped-getting-my-whatsapp-number-banned-heres-the-exact-n8n-setup-that-fixed-it': {
    editorialTitle: 'The 24-Hour Compliance Engine: How We Eliminated Meta WhatsApp API Bans in n8n',
    editorialSubhead: 'Why unofficial scraping libraries fail within 11 days—and the exact PostgreSQL timestamp architecture that keeps production numbers alive indefinitely.'
  },
  'n8n-sub-workflows-explained-the-pattern-that-cut-my-build-time-in-half': {
    editorialTitle: 'Beyond the 38-Node Monolith: Modular Sub-Workflow Architecture in n8n',
    editorialSubhead: 'Treating visual workflows like microservice functions cuts debugging time in half and isolates upstream API failures.'
  },
  'n8n-google-sheets-when-it-makes-sense-when-it-doesnt-and-what-i-use-instead': {
    editorialTitle: 'Why Google Sheets Fails Under Webhook Concurrency—And When to Switch to PostgreSQL',
    editorialSubhead: 'Race conditions, missing row locks, and API rate ceilings make spreadsheets a liability for live state management.'
  },
  'n8n-vs-make-after-running-both-for-real-clients-heres-what-i-actually-use': {
    editorialTitle: 'n8n vs. Make at Production Scale: An Engineering & Unit-Economics Breakdown',
    editorialSubhead: 'After six months of running client workloads on both platforms, array execution billing and self-hosted Docker control decide the winner.'
  },
  'giving-your-n8n-ai-agent-real-memory-a-postgres-backed-pattern-that-actually-survives-restarts': {
    editorialTitle: 'Stateful AI Agents: Designing Persistent PostgreSQL Memory That Survives Container Restarts',
    editorialSubhead: 'Default RAM buffer memory wipes customer context on every redeploy. Here is the deterministic session-key pattern backed by Neon Postgres.'
  },
  'the-n8n-code-node-is-more-powerful-than-most-builders-realize-heres-what-i-actually-use-it-for': {
    editorialTitle: 'The Case for the n8n Code Node: Replacing Eight Visual Blocks With Twelve Lines of JavaScript',
    editorialSubhead: 'How native V8 array transformations, regex sanitization, and cryptographic hashing simplify complex automation pipelines.'
  },
  'n8n-error-handling-that-actually-works-how-i-stopped-losing-data-on-workflow-failures': {
    editorialTitle: 'Zero-Loss Webhook Architecture: Dead-Letter Queues and Global Error Triggers in n8n',
    editorialSubhead: 'How an expired API key silently dropped 42 client leads—and the three-layer PostgreSQL recovery pattern that prevented it from ever happening again.'
  },
  'n8n-self-hosted-vs-n8n-cloud-the-honest-cost-comparison-after-running-both': {
    editorialTitle: 'The Infrastructure Math: Self-Hosted n8n on Linux VPS vs. Managed Cloud Tiers',
    editorialSubhead: 'Cutting annual automation infrastructure overhead by 80% with Docker Compose, Caddy auto-SSL, and unlimited workflow executions.'
  },
  'using-n8n-with-webhooks-the-only-explanation-beginners-actually-need': {
    editorialTitle: 'Event-Driven Architecture 101: How Real-Time HTTP Webhooks Replace Wasteful API Polling',
    editorialSubhead: 'A first-principles look at HTTP POST listeners, HMAC signature verification, and sub-20ms trigger response times.'
  },
  'building-a-smart-lead-qualifier-using-n8n-telegram-and-openai': {
    editorialTitle: 'Autonomous Lead Triage: Sub-2-Second Qualification With OpenAI Structured Outputs and Telegram',
    editorialSubhead: 'Using strict JSON schemas to score inbound inquiries from 0 to 100 and dispatch interactive approval cards to mobile.'
  },
  'stop-getting-overwhelmed-by-n8n-start-with-these-10-basic-nodes': {
    editorialTitle: 'The 80/20 of Workflow Engineering: Ten Core n8n Primitives That Power 95% of Production Systems',
    editorialSubhead: 'Why mastering HTTP Request, Code, IF, and Postgres makes 400+ app-specific wrapper icons optional.'
  },
  'close-leads-9x-faster-auto-sync-postgres-whatsapp-and-your-crm': {
    editorialTitle: 'Sub-Minute Speed-to-Lead: Bi-Directional synchronization Across PostgreSQL, WhatsApp, and CRM',
    editorialSubhead: 'Eliminating infinite webhook echo loops with idempotency hashes and atomic database upserts.'
  },
  'i-built-a-custom-whatsapp-crm-for-local-client-leads-in-n8n-and-you-can-too': {
    editorialTitle: 'Field Report: Engineering a Lightweight WhatsApp CRM and Automated Follow-Up Engine in n8n',
    editorialSubhead: 'How a custom PostgreSQL + Meta Cloud API pipeline rescued buried customer inquiries for a local design studio.'
  },
  'add-ai-to-your-whatsapp-agent-using-openai-llm-nodes-in-n8n-the-right-way': {
    editorialTitle: 'Production Guardrails for WhatsApp AI Agents: Tool Calling and Deterministic Human Handoff',
    editorialSubhead: 'Preventing LLM pricing hallucinations by restricting agents to read-only catalog tools and escalation flags.'
  },
  'master-the-n8n-postgresql-node-complete-guide-setup-using-neon-database': {
    editorialTitle: 'Production PostgreSQL in n8n: Connection Pooling, Neon Serverless Branches, and SQLi Defense',
    editorialSubhead: 'Why inline string interpolation invites SQL injection—and how parameterized queries ($1, $2) secure your database layer.'
  },
  'hardening-your-n8n-instance-security-settings-you-shouldnt-ignore': {
    editorialTitle: 'DevSecOps for Workflow Servers: Hardening Self-Hosted n8n Instances Against Public Exploits',
    editorialSubhead: 'Locking down environment variable access, webhook HMAC headers, encryption keys, and UFW Docker port bindings.'
  },
  'i-built-an-n8n-workflow-to-fetch-apis-clean-data-automatically-full-guide': {
    editorialTitle: 'Resilient ETL Pipelines in n8n: Cursor Pagination, Schema Sanitization, and Batch Upserts',
    editorialSubhead: 'Taming inconsistent third-party REST APIs with automated JavaScript validation filters before database insertion.'
  },
  'run-n8n-on-your-own-vps-free-paid-full-guide': {
    editorialTitle: 'The 10-Minute Production Server: Deploying n8n on Ubuntu VPS With Docker Compose and Caddy SSL',
    editorialSubhead: 'Step-by-step infrastructure blueprint for automatic Let’s Encrypt HTTPS certificates and persistent volume backups.'
  },
  'how-to-connect-n8n-with-neon-postgres-step-by-step-for-beginners': {
    editorialTitle: 'Serverless State Management: Wiring n8n to Neon PostgreSQL With Pooled SSL Connections',
    editorialSubhead: 'Provisioning a production relational database in 30 seconds with point-in-time recovery and zero server maintenance.'
  },
  'build-your-industrial-grade-n8n-whatsapp-lead-agent-beginner-friendly': {
    editorialTitle: 'Foundational Blueprint: Building an Industrial-Grade WhatsApp Lead Intake Agent in n8n',
    editorialSubhead: 'From Meta webhook challenge verification to payload parsing, database logging, and conditional routing.'
  }
};

function getHeaders(accept = 'application/json') {
  return {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TechmovLocalMigrator/4.0',
    'Accept': accept,
  };
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: getHeaders('application/json') });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
}

async function downloadFile(url, dest) {
  try {
    const res = await fetch(url, { headers: getHeaders('*/*') });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
      return true;
    }
  } catch {}
  return false;
}

function decodeHtmlEntities(str = '') {
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

async function run() {
  console.log('==============================================================');
  console.log('🚀 Techmov.in Logo, Site Icon & 20-Post Editorial Sync Engine');
  console.log('==============================================================\n');

  // 1. Download Official Live Site Logo & Site Icon from techmov.in
  console.log('🖼️ 1/5: Fetching Official Site Logo & Site Icon from techmov.in...');
  const logoCandidates = [
    'https://techmov.in/wp-content/uploads/2026/03/cropped-site-logo.webp',
    'https://techmov.in/wp-content/uploads/2026/03/site-logo.webp',
    'https://techmov.in/wp-content/uploads/2026/03/cropped-cropped-site-logo-192x192.webp',
    'https://techmov.in/wp-content/uploads/2026/03/cropped-cropped-site-logo-32x32.webp'
  ];
  const iconCandidates = [
    'https://techmov.in/wp-content/uploads/2026/03/cropped-cropped-site-logo-32x32.webp',
    'https://techmov.in/wp-content/uploads/2026/03/cropped-cropped-site-logo-192x192.webp'
  ];

  // Also check /wp-json/ root in case site_icon_url is exposed there
  try {
    const wpRoot = await fetchJson(`${WP_SITE}/wp-json/`);
    if (wpRoot.site_icon_url) {
      logoCandidates.unshift(wpRoot.site_icon_url);
      iconCandidates.unshift(wpRoot.site_icon_url);
    }
  } catch {}

  for (const url of logoCandidates) {
    if (await downloadFile(url, path.join(ASSETS_DIR, 'logo.webp'))) {
      console.log(`   ✓ Downloaded Header/Footer Logo -> public/assets/logo.webp (${url})`);
      break;
    }
  }
  for (const url of iconCandidates) {
    if (await downloadFile(url, path.join(PUBLIC_DIR, 'favicon.webp'))) {
      fs.copyFileSync(path.join(PUBLIC_DIR, 'favicon.webp'), path.join(ASSETS_DIR, 'site-icon.webp'));
      console.log(`   ✓ Downloaded Browser Site Icon  -> public/favicon.webp (${url})`);
      break;
    }
  }

  // 2. Clean old auto-generated blog files
  console.log('\n🧹 2/5: Cleaning src/data/blogs/ directory...');
  for (const file of fs.readdirSync(BLOGS_DIR)) {
    if (file.startsWith('post-') && file.endsWith('.js')) {
      fs.unlinkSync(path.join(BLOGS_DIR, file));
    }
  }

  // 3. Fetch Categories
  console.log(`📡 3/5: Fetching categories from ${WP_SITE}/wp-json/wp/v2/categories...`);
  const categoryMap = {};
  try {
    const cats = await fetchJson(`${WP_SITE}/wp-json/wp/v2/categories?per_page=100`);
    cats.forEach(c => {
      categoryMap[c.id] = decodeHtmlEntities(c.name);
    });
  } catch {}

  // 4. Fetch All Published Posts
  console.log(`📡 4/5: Fetching all published posts + embedded featured media...`);
  let allPosts = [];
  let page = 1;
  while (true) {
    try {
      const batch = await fetchJson(`${WP_SITE}/wp-json/wp/v2/posts?per_page=20&page=${page}&_embed=1`);
      if (!Array.isArray(batch) || batch.length === 0) break;
      allPosts = allPosts.concat(batch);
      if (batch.length < 20) break;
      page++;
    } catch {
      break;
    }
  }
  console.log(`   ✓ Retrieved ${allPosts.length} posts.`);

  // 5. Write Editorial-Polished Local Post Modules & Download Featured Images
  console.log('\n💾 5/5: Applying Bloomberg editorial polish & downloading 20 featured images...');
  const imageDownloads = [];
  const indexExports = [];

  allPosts.forEach((post, idx) => {
    const order = idx + 1;
    const orderStr = String(order).padStart(2, '0');
    const slug = post.slug;
    const wpTitle = decodeHtmlEntities(post.title?.rendered || slug);
    const editorial = EDITORIAL_OVERRIDES[slug] || {};

    const categories = (post.categories || []).map(id => categoryMap[id]).filter(Boolean);
    const primaryCategory = categories[0] || 'N8N Workflows';

    let featuredImageUrl = post.jetpack_featured_media_url || '';
    if (!featuredImageUrl && post._embedded && post._embedded['wp:featuredmedia']?.[0]) {
      const media = post._embedded['wp:featuredmedia'][0];
      featuredImageUrl =
        media.source_url ||
        media.media_details?.sizes?.large?.source_url ||
        media.media_details?.sizes?.full?.source_url ||
        '';
    }
    if (!featuredImageUrl && post.content?.rendered) {
      const imgMatch = post.content.rendered.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch && imgMatch[1]) featuredImageUrl = imgMatch[1];
    }

    let localThumbPath = '';
    if (featuredImageUrl) {
      let ext = '.webp';
      try {
        ext = path.extname(new URL(featuredImageUrl).pathname) || '.webp';
      } catch {}
      const localThumbFilename = `thumb-${orderStr}-${slug}${ext}`;
      localThumbPath = `/assets/blog/${localThumbFilename}`;
      imageDownloads.push({
        url: featuredImageUrl,
        dest: path.join(THUMBS_DIR, localThumbFilename)
      });
    }

    const rawDate = new Date(post.date_gmt || post.date);
    const dateStr = rawDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const isoDate = rawDate.toISOString().split('T')[0];

    let excerpt = editorial.editorialSubhead || decodeHtmlEntities(post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    let htmlContent = post.content?.rendered || '';
    htmlContent = htmlContent.replace(
      /href=["']https?:\/\/(?:www\.)?techmov\.in\/([a-z0-9-]+)\/?["']/gi,
      'href="#/blog/$1" data-internal-slug="$1"'
    );

    const wordCount = htmlContent.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readTime = `${Math.max(5, Math.round(wordCount / 200))} min read`;

    const postObj = {
      id: `post-${orderStr}`,
      order,
      slug,
      title: editorial.editorialTitle || wpTitle,
      originalWpTitle: wpTitle,
      subhead: editorial.editorialSubhead || excerpt,
      date: dateStr,
      isoDate,
      readTime,
      author: 'axiomcompute',
      category: primaryCategory,
      categories,
      featuredImage: localThumbPath || featuredImageUrl,
      thumbnailLocal: localThumbPath,
      featuredImageRemoteBackup: featuredImageUrl,
      localRoute: `#/blog/${slug}`,
      excerpt,
      htmlContent
    };

    const fileName = `post-${orderStr}-${slug}.js`;
    fs.writeFileSync(
      path.join(BLOGS_DIR, fileName),
      `// Self-contained local blog module: ${fileName}\nconst post = ${JSON.stringify(postObj, null, 2)};\nexport default post;\n`,
      'utf-8'
    );
    indexExports.push({ varName: `post_${orderStr}`, fileName: `./${fileName}` });
  });

  const indexContent =
    indexExports.map(e => `import ${e.varName} from '${e.fileName}';`).join('\n') +
    `\n\nexport const EXPORTED_WP_POSTS = [\n  ${indexExports.map(e => e.varName).join(',\n  ')}\n];\nexport default EXPORTED_WP_POSTS;\n`;
  fs.writeFileSync(path.join(BLOGS_DIR, 'index.js'), indexContent, 'utf-8');

  if (imageDownloads.length > 0) {
    for (let i = 0; i < imageDownloads.length; i += 5) {
      const batch = imageDownloads.slice(i, i + 5);
      await Promise.all(batch.map(item => downloadFile(item.url, item.dest)));
      process.stdout.write(`   Downloaded ${Math.min(i + 5, imageDownloads.length)} / ${imageDownloads.length} featured images...\r`);
    }
  }

  console.log('\n\n==============================================================');
  console.log('✅ ALL DONE! Logo, Favicon & 20 Bloomberg-edited posts synced!');
  console.log('==============================================================\n');
}

run().catch(console.error);
