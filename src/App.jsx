import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Zap,
  Terminal,
  Cpu,
  Database,
  MessageSquare,
  Code2,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Play,
  RotateCcw,
  Search,
  Filter,
  Moon,
  Sun,
  ShieldCheck,
  Clock,
  GitBranch,
  Send,
  X,
  ChevronRight,
  ExternalLink,
  BookOpen,
  User,
  Calendar,
  Briefcase,
  Sliders,
  Activity,
  Server,
  Workflow,
  Globe,
  Lock,
  Check,
  Copy,
  AlertCircle,
  Menu,
  FileCode,
  HelpCircle,
  Smartphone,
  Tablet,
  Monitor,
  MousePointer,
  CreditCard,
  Package,
  RefreshCw,
  FileText,
  Scale,
  Mail,
  MapPin,
  Award
} from 'lucide-react';

// ============================================================================
// OFFICIAL LIVE TECHMOV.IN LOGO & SITE ICON ASSETS
// ============================================================================
const BRAND_ASSETS = {
  logoLocal: '/assets/logo.webp',
  logoRemote: 'https://techmov.in/wp-content/uploads/2026/03/cropped-site-logo.webp',
  iconLocal: '/favicon.webp',
  iconRemote: 'https://techmov.in/wp-content/uploads/2026/03/cropped-cropped-site-logo-32x32.webp'
};

// Bloomberg / Stripe Press Editorial Headlines & Subheads for All 20 Articles
const EDITORIAL_REFINEMENTS = {
  'i-stopped-getting-my-whatsapp-number-banned-heres-the-exact-n8n-setup-that-fixed-it': {
    title: 'The 24-Hour Compliance Engine: How We Eliminated Meta WhatsApp API Bans in n8n',
    subhead: 'Why unofficial scraping libraries fail within 11 days—and the exact PostgreSQL timestamp architecture that keeps production numbers alive indefinitely.',
    desk: 'SYSTEMS ARCHITECTURE'
  },
  'n8n-sub-workflows-explained-the-pattern-that-cut-my-build-time-in-half': {
    title: 'Beyond the 38-Node Monolith: Modular Sub-Workflow Architecture in n8n',
    subhead: 'Treating visual workflows like microservice functions cuts debugging time in half and isolates upstream API failures.',
    desk: 'SOFTWARE ENGINEERING'
  },
  'n8n-google-sheets-when-it-makes-sense-when-it-doesnt-and-what-i-use-instead': {
    title: 'Why Google Sheets Fails Under Webhook Concurrency—And When to Switch to PostgreSQL',
    subhead: 'Race conditions, missing row locks, and API rate ceilings make spreadsheets a liability for live state management.',
    desk: 'DATABASE INFRASTRUCTURE'
  },
  'n8n-vs-make-after-running-both-for-real-clients-heres-what-i-actually-use': {
    title: 'n8n vs. Make at Production Scale: An Engineering & Unit-Economics Breakdown',
    editorialSubhead: 'After six months of running client workloads on both platforms, array execution billing and self-hosted Docker control decide the winner.',
    subhead: 'After six months of running client workloads on both platforms, array execution billing and self-hosted Docker control decide the winner.',
    desk: 'UNIT ECONOMICS'
  },
  'giving-your-n8n-ai-agent-real-memory-a-postgres-backed-pattern-that-actually-survives-restarts': {
    title: 'Stateful AI Agents: Designing Persistent PostgreSQL Memory That Survives Container Restarts',
    subhead: 'Default RAM buffer memory wipes customer context on every redeploy. Here is the deterministic session-key pattern backed by Neon Postgres.',
    desk: 'APPLIED AI SYSTEMS'
  },
  'the-n8n-code-node-is-more-powerful-than-most-builders-realize-heres-what-i-actually-use-it-for': {
    title: 'The Case for the n8n Code Node: Replacing Eight Visual Blocks With Twelve Lines of JavaScript',
    subhead: 'How native V8 array transformations, regex sanitization, and cryptographic hashing simplify complex automation pipelines.',
    desk: 'RUNTIME OPTIMIZATION'
  },
  'n8n-error-handling-that-actually-works-how-i-stopped-losing-data-on-workflow-failures': {
    title: 'Zero-Loss Webhook Architecture: Dead-Letter Queues and Global Error Triggers in n8n',
    subhead: 'How an expired API key silently dropped 42 client leads—and the three-layer PostgreSQL recovery pattern that prevented it from ever happening again.',
    desk: 'RELIABILITY ENGINEERING'
  },
  'n8n-self-hosted-vs-n8n-cloud-the-honest-cost-comparison-after-running-both': {
    title: 'The Infrastructure Math: Self-Hosted n8n on Linux VPS vs. Managed Cloud Tiers',
    subhead: 'Cutting annual automation infrastructure overhead by 80% with Docker Compose, Caddy auto-SSL, and unlimited workflow executions.',
    desk: 'CLOUD ECONOMICS'
  },
  'using-n8n-with-webhooks-the-only-explanation-beginners-actually-need': {
    title: 'Event-Driven Architecture 101: How Real-Time HTTP Webhooks Replace Wasteful API Polling',
    subhead: 'A first-principles look at HTTP POST listeners, HMAC signature verification, and sub-20ms trigger response times.',
    desk: 'API PROTOCOLS'
  },
  'building-a-smart-lead-qualifier-using-n8n-telegram-and-openai': {
    title: 'Autonomous Lead Triage: Sub-2-Second Qualification With OpenAI Structured Outputs and Telegram',
    subhead: 'Using strict JSON schemas to score inbound inquiries from 0 to 100 and dispatch interactive approval cards to mobile.',
    desk: 'REVENUE AUTOMATION'
  },
  'stop-getting-overwhelmed-by-n8n-start-with-these-10-basic-nodes': {
    title: 'The 80/20 of Workflow Engineering: Ten Core n8n Primitives That Power 95% of Production Systems',
    subhead: 'Why mastering HTTP Request, Code, IF, and Postgres makes 400+ app-specific wrapper icons optional.',
    desk: 'SYSTEMS DESIGN'
  },
  'close-leads-9x-faster-auto-sync-postgres-whatsapp-and-your-crm': {
    title: 'Sub-Minute Speed-to-Lead: Bi-Directional Synchronization Across PostgreSQL, WhatsApp, and CRM',
    subhead: 'Eliminating infinite webhook echo loops with idempotency hashes and atomic database upserts.',
    desk: 'PIPELINE ENGINEERING'
  },
  'i-built-a-custom-whatsapp-crm-for-local-client-leads-in-n8n-and-you-can-too': {
    title: 'Field Report: Engineering a Lightweight WhatsApp CRM and Automated Follow-Up Engine in n8n',
    subhead: 'How a custom PostgreSQL + Meta Cloud API pipeline rescued buried customer inquiries for a local design studio.',
    desk: 'CASE STUDY'
  },
  'add-ai-to-your-whatsapp-agent-using-openai-llm-nodes-in-n8n-the-right-way': {
    title: 'Production Guardrails for WhatsApp AI Agents: Tool Calling and Deterministic Human Handoff',
    subhead: 'Preventing LLM pricing hallucinations by restricting agents to read-only catalog tools and escalation flags.',
    desk: 'AI SAFETY & CONTROL'
  },
  'master-the-n8n-postgresql-node-complete-guide-setup-using-neon-database': {
    title: 'Production PostgreSQL in n8n: Connection Pooling, Neon Serverless Branches, and SQLi Defense',
    subhead: 'Why inline string interpolation invites SQL injection—and how parameterized queries ($1, $2) secure your database layer.',
    desk: 'DATABASE SECURITY'
  },
  'hardening-your-n8n-instance-security-settings-you-shouldnt-ignore': {
    title: 'DevSecOps for Workflow Servers: Hardening Self-Hosted n8n Instances Against Public Exploits',
    subhead: 'Locking down environment variable access, webhook HMAC headers, encryption keys, and UFW Docker port bindings.',
    desk: 'CYBERSECURITY'
  },
  'i-built-an-n8n-workflow-to-fetch-apis-clean-data-automatically-full-guide': {
    title: 'Resilient ETL Pipelines in n8n: Cursor Pagination, Schema Sanitization, and Batch Upserts',
    subhead: 'Taming inconsistent third-party REST APIs with automated JavaScript validation filters before database insertion.',
    desk: 'DATA ENGINEERING'
  },
  'run-n8n-on-your-own-vps-free-paid-full-guide': {
    title: 'The 10-Minute Production Server: Deploying n8n on Ubuntu VPS With Docker Compose and Caddy SSL',
    subhead: 'Step-by-step infrastructure blueprint for automatic Let’s Encrypt HTTPS certificates and persistent volume backups.',
    desk: 'DEVOPS & INFRASTRUCTURE'
  },
  'how-to-connect-n8n-with-neon-postgres-step-by-step-for-beginners': {
    title: 'Serverless State Management: Wiring n8n to Neon PostgreSQL With Pooled SSL Connections',
    subhead: 'Provisioning a production relational database in 30 seconds with point-in-time recovery and zero server maintenance.',
    desk: 'CLOUD DATABASES'
  },
  'build-your-industrial-grade-n8n-whatsapp-lead-agent-beginner-friendly': {
    title: 'Foundational Blueprint: Building an Industrial-Grade WhatsApp Lead Intake Agent in n8n',
    subhead: 'From Meta webhook challenge verification to payload parsing, database logging, and conditional routing.',
    desk: 'FOUNDATIONAL SYSTEMS'
  }
};

// ============================================================================
// EASY RAZORPAY PAYMENT LINKS CONFIGURATION (PASTE YOUR LINKS HERE!)
// ============================================================================
// Tip: Replace any URL below with your own Razorpay Payment Page / Payment Link
// (e.g. "https://rzp.io/l/techmov-starter" or "https://pages.razorpay.com/techmov").
// You can also update these live inside the website's "WP Sync & Razorpay Config" drawer!
const DEFAULT_RAZORPAY_LINKS = {
  masterCheckoutUrl: 'https://razorpay.me/@techmov',
  bundles: {
    'bundle-starter': 'https://razorpay.me/@techmov',
    'bundle-growth': 'https://razorpay.me/@techmov',
    'bundle-agency': 'https://razorpay.me/@techmov',
    'bundle-enterprise': 'https://razorpay.me/@techmov'
  },
  services: {
    'srv-01': 'https://razorpay.me/@techmov',
    'srv-02': 'https://razorpay.me/@techmov',
    'srv-03': 'https://razorpay.me/@techmov',
    'srv-04': 'https://razorpay.me/@techmov',
    'srv-05': 'https://razorpay.me/@techmov',
    'srv-06': 'https://razorpay.me/@techmov'
  }
};

// ============================================================================
// ALL-IN-ONE BUNDLE TILES (SERVICES + FREE .COM/.IN DOMAIN + FREE HOSTING)
// ============================================================================
const COMBO_BUNDLES = [
  {
    id: 'bundle-starter',
    tier: 'STARTER LAUNCHPAD',
    title: 'Business Website + Lead Automation Starter',
    tagline: 'Best for founders, creators & local businesses launching fast',
    priceDisplay: '₹19,999',
    priceNumeric: 19999,
    originalPrice: '₹28,500',
    domainPerk: 'FREE .com or .in Domain (1 Year Included)',
    hostingPerk: '3 Months Managed High-Speed Cloud Hosting Included',
    delivery: '5–7 Days Delivery',
    popular: false,
    includes: [
      'Custom 5-Page Responsive React + Tailwind Website (100/100 SEO)',
      'FREE .com or .in Domain Name Registration (1 Full Year)',
      '3 Months Managed Cloud Hosting + Free Let’s Encrypt SSL',
      'n8n Lead Capture Webhook -> Instant WhatsApp & Email Notification',
      ' Razorpay / Contact Form Integration + Google Search Console Setup'
    ]
  },
  {
    id: 'bundle-growth',
    tier: 'MOST POPULAR COMBO',
    title: 'Full-Stack Web App + Official WhatsApp CRM Suite',
    tagline: 'Complete growth engine with ban-proof WhatsApp automation & database',
    priceDisplay: '₹39,999',
    priceNumeric: 39999,
    originalPrice: '₹58,000',
    domainPerk: 'FREE .com + .in Domain Pair (1 Year Included)',
    hostingPerk: '6 Months Managed Cloud & n8n VPS Hosting Included',
    delivery: '10–14 Days Delivery',
    popular: true,
    includes: [
      'Custom Full-Stack Web App + Admin Portal (React + Node/Postgres)',
      'FREE .com or .in Domain (1 Year) + 6 Months Cloud VPS Hosting',
      'Official Meta WhatsApp Cloud API Setup + 24-Hr Window Guard in Postgres',
      'Automated Day-2 & Day-5 Lead Follow-up Workflows in n8n',
      'PostgreSQL Dead Letter Queue (Zero Lost Leads) + Razorpay Checkout'
    ]
  },
  {
    id: 'bundle-agency',
    tier: 'AI & SAAS SCALE SUITE',
    title: 'Custom SaaS MVP + Stateful AI Agent + Self-Hosted n8n',
    tagline: 'End-to-end product engineering with persistent AI memory & dedicated VPS',
    priceDisplay: '₹69,999',
    priceNumeric: 69999,
    originalPrice: '₹95,000',
    domainPerk: 'FREE Premium .com Domain (1 Year) + Cloudflare DNS',
    hostingPerk: '12 Months Dedicated Ubuntu VPS + Neon Postgres Hosting',
    delivery: '3–4 Weeks Delivery',
    popular: false,
    includes: [
      'Full-Stack SaaS MVP (Auth, User Dashboard, Billing, Role Permissions)',
      'FREE .com Domain + 12 Months Managed Linux VPS & Docker n8n Server',
      'OpenAI / Claude Agent with Persistent PostgreSQL Chat Memory',
      'Modular n8n Sub-Workflow Architecture + Telegram Lead Scorer Bot',
      'Full DevTools Security & SQL-Injection Hardening + GitHub Handover'
    ]
  }
];

// ============================================================================
// GROUNDED BLOG POSTS FROM https://techmov.in/ (All 20 Live Posts by axiomcompute)
// ============================================================================
const INITIAL_BLOG_POSTS = [
  {
    id: 'post-01',
    order: 1,
    slug: 'i-stopped-getting-my-whatsapp-number-banned-heres-the-exact-n8n-setup-that-fixed-it',
    thumbnailLocal: '/assets/blog/thumb-01-i-stopped-getting-my-whatsapp-number-banned-heres-the-exact-n8n-setup-that-fixed-it.webp',
    title: "I Stopped Getting My WhatsApp Number Banned — Here's the Exact n8n Setup That Fixed It",
    date: 'May 31, 2026',
    isoDate: '2026-05-31',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'META CLOUD API • 24H WINDOW GUARD',
    bannerMetric: '0 Number Bans',
    featuredImage: '',
    tags: ['WhatsApp Cloud API', 'Meta Compliance', 'Postgres Window', 'n8n Production'],
    localRoute: '#/blog/i-stopped-getting-my-whatsapp-number-banned-heres-the-exact-n8n-setup-that-fixed-it',
    excerpt: "How many messages can you send per day before WhatsApp bans your number? That's the question everyone asks. It's also the wrong question — and the reason most people building WhatsApp automation in n8n get banned before they figure out why.",
    keyTakeaway: 'Never use unofficial libraries like whatsapp-web.js or Baileys. Store last_user_message_at in PostgreSQL and use an IF node to route messages outside the 24-hour window to pre-approved Meta Utility templates.',
    codeSnippet: `// PostgreSQL 24-Hour Window Check inside n8n
ALTER TABLE contacts ADD COLUMN last_user_message_at TIMESTAMPTZ;

// On Inbound Webhook:
UPDATE contacts SET last_user_message_at = NOW() WHERE phone = $1;

// Outbound IF Node Condition:
// NOW() - last_user_message_at < INTERVAL '24 hours'
// TRUE  -> Send free-form text via Meta Graph API v19.0
// FALSE -> Send pre-approved Utility template`,
    content: [
      "How many messages can you send per day before WhatsApp bans your number? That's the question everyone asks. It's also the wrong question — and the reason most people building WhatsApp automation in n8n get banned before they figure out why.",
      "I got banned twice. The first time was ignorance (using an HTTP Request node pointed at a local whatsapp-web.js instance that lasted 11 days before Meta fingerprinted the unofficial client). The second time was impatience. After the second ban, I rebuilt the entire setup from scratch on the official Meta Cloud API, and I haven't had a number pulled since.",
      "Volume is almost never the primary cause. WhatsApp bans numbers for three things: (1) Sending free-form messages outside the 24-hour customer service window without an approved template, (2) Using unofficial automation libraries like Baileys or whatsapp-web.js, and (3) High user block and spam report rates.",
      "To solve the 24-hour window permanently, I store last_user_message_at in PostgreSQL alongside the contact record. Every time an incoming WhatsApp message hits the n8n webhook, the workflow updates this timestamp. Before any outbound message fires, an IF node checks if NOW() - last_user_message_at < 24 hours. Inside the window, it sends free-form text; outside the window, it switches to an approved Utility template."
    ]
  },
  {
    id: 'post-02',
    order: 2,
    slug: 'n8n-sub-workflows-explained-the-pattern-that-cut-my-build-time-in-half',
    thumbnailLocal: '/assets/blog/thumb-02-n8n-sub-workflows-explained-the-pattern-that-cut-my-build-time-in-half.webp',
    title: 'n8n Sub-Workflows Explained: The Pattern That Cut My Build Time in Half',
    date: 'May 30, 2026',
    isoDate: '2026-05-30',
    readTime: '5 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'EXECUTE WORKFLOW • MODULAR DESIGN',
    bannerMetric: '50% Faster Builds',
    featuredImage: '',
    tags: ['Modular Architecture', 'Sub-Workflows', 'Debugging', 'Execute Workflow'],
    localRoute: '#/blog/n8n-sub-workflows-explained-the-pattern-that-cut-my-build-time-in-half',
    excerpt: 'Six months in, I had a lead intake workflow with 38 nodes. It worked. I was also completely unable to debug it when something went wrong because tracing a failure across 38 tangled nodes took hours.',
    keyTakeaway: 'Break monolithic 35+ node workflows into single-responsibility micro-workflows (Intake Normalization, DB Upsert, AI Classification, Notification Router) called via Execute Workflow nodes.',
    codeSnippet: `// Standard Sub-Workflow Input Contract
{
  "trace_id": "req_98f2a1c",
  "source": "whatsapp_webhook",
  "contact": {
    "phone": "+919876543210",
    "name": "Client Inquiry",
    "raw_message": "Need custom CRM + n8n automation quote"
  }
}`,
    content: [
      "Six months in, I had a lead intake workflow with 38 nodes. It worked. I was also completely unable to debug it when something went wrong because tracing a failure required scrolling across a massive canvas.",
      "Just like software engineers don't write an entire application inside a single 4,000-line main() function, you shouldn't build monolithic n8n workflows. The Execute Workflow node is n8n's function call.",
      "By splitting my architecture into reusable Sub-Workflows — one for Lead Sanitization, one for Neon Postgres Upsert, one for OpenAI Lead Scoring, and one for Slack/WhatsApp Alerting — I cut build time on new client projects by 50%."
    ]
  },
  {
    id: 'post-03',
    order: 3,
    slug: 'n8n-google-sheets-when-it-makes-sense-when-it-doesnt-and-what-i-use-instead',
    thumbnailLocal: '/assets/blog/thumb-03-n8n-google-sheets-when-it-makes-sense-when-it-doesnt-and-what-i-use-instead.webp',
    title: "n8n + Google Sheets: When It Makes Sense, When It Doesn't, and What I Use Instead",
    date: 'May 29, 2026',
    isoDate: '2026-05-29',
    readTime: '5 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'DATABASE ARCHITECTURE • ACID LOCKING',
    bannerMetric: 'Zero Race Conditions',
    featuredImage: '',
    tags: ['Google Sheets', 'PostgreSQL', 'Database Design', 'Concurrency'],
    localRoute: '#/blog/n8n-google-sheets-when-it-makes-sense-when-it-doesnt-and-what-i-use-instead',
    excerpt: "Sam asked me this recently — he'd just migrated from Zapier to n8n and was building his first real client workflow. 'Can I just use Google Sheets as the database?'",
    keyTakeaway: 'Use Google Sheets only for human-facing reporting views or low-volume (<50 rows/day) logs. Use Neon PostgreSQL for state management, deduplication, and high-concurrency webhooks.',
    codeSnippet: `// Why Sheets fails under webhook concurrency:
// Two simultaneous webhooks reading Row 142 -> Race condition overwrite!
// Fix: Atomic Upsert in PostgreSQL first, then batch-sync to Sheets
INSERT INTO leads (email, phone, status, updated_at)
VALUES ($1, $2, 'qualified', NOW())
ON CONFLICT (phone) DO UPDATE SET status = EXCLUDED.status;`,
    content: [
      "Sam asked me this recently — he'd just migrated from Zapier to n8n and was building his first real client workflow. 'Can I just use Google Sheets as the database?'",
      "The honest answer: Google Sheets is a great spreadsheet and a terrible production database. When two webhooks fire within 400 milliseconds of each other, Sheets has no row-level locking, no unique constraints, and strict API rate quotas.",
      "My rule for clients: store all operational state in PostgreSQL (Neon or Supabase) and run a scheduled 15-minute sync workflow if the client's sales team still wants a Google Sheet dashboard."
    ]
  },
  {
    id: 'post-04',
    order: 4,
    slug: 'n8n-vs-make-after-running-both-for-real-clients-heres-what-i-actually-use',
    thumbnailLocal: '/assets/blog/thumb-04-n8n-vs-make-after-running-both-for-real-clients-heres-what-i-actually-use.webp',
    title: "n8n vs Make: After Running Both for Real Clients, Here's What I Actually Use",
    date: 'May 28, 2026',
    isoDate: '2026-05-28',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'PLATFORM BENCHMARK • EXECUTION ROI',
    bannerMetric: '10x Array Speed',
    featuredImage: '',
    tags: ['n8n vs Make', 'Agency Stack', 'Cost Analysis', 'Self-Hosting'],
    localRoute: '#/blog/n8n-vs-make-after-running-both-for-real-clients-heres-what-i-actually-use',
    excerpt: 'I started on Make. Paid $9/month, thought it was the better-designed tool, and spent six months building client workflows on it. Then I moved to n8n. The gap between what both handle at scale is massive.',
    keyTakeaway: 'Make bills per module operation (making loops and polling expensive), whereas n8n bills per full workflow execution—or zero per-execution fees when self-hosted on a Linux VPS.',
    codeSnippet: `// Cost comparison for a 10-step workflow running 5,000 times/month:
// Make.com: 5,000 runs x 10 modules = 50,000 Operations/mo
// n8n Self-Hosted (Docker + Linux VPS):
// Unlimited executions, full JS Code node, native Git control`,
    content: [
      "I started on Make. Paid $9/month, thought it was the better-designed tool, and spent six months building client workflows on it. Then I moved to n8n.",
      "The biggest difference isn't the visual canvas — it's how billing and data arrays work. In Make, every module inside an iterator counts as a separate billable operation. If you fetch 200 CRM records and transform them, you burn 200+ operations in a single run.",
      "In n8n, JavaScript array transformations inside a single Code node process all 200 items in 4 milliseconds as one step."
    ]
  },
  {
    id: 'post-05',
    order: 5,
    slug: 'giving-your-n8n-ai-agent-real-memory-a-postgres-backed-pattern-that-actually-survives-restarts',
    thumbnailLocal: '/assets/blog/thumb-05-giving-your-n8n-ai-agent-real-memory-a-postgres-backed-pattern-that-actually-survives-restarts.webp',
    title: 'Giving Your n8n AI Agent Real Memory: A Postgres-Backed Pattern That Actually Survives Restarts',
    date: 'May 27, 2026',
    isoDate: '2026-05-27',
    readTime: '7 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'STATEFUL AI AGENTS • POSTGRES MEMORY',
    bannerMetric: '100% Persistent Context',
    featuredImage: '',
    tags: ['AI Agents', 'Postgres Chat Memory', 'LangChain', 'Session Persistence'],
    localRoute: '#/blog/giving-your-n8n-ai-agent-real-memory-a-postgres-backed-pattern-that-actually-survives-restarts',
    excerpt: "Here's something the n8n AI agent setup guides don't say clearly: the default Window Buffer Memory forgets everything the moment your container restarts.",
    keyTakeaway: 'Replace volatile in-memory Window Buffer nodes with Postgres Chat Memory keyed by the user phone number or session_id so context persists across container updates and restarts.',
    codeSnippet: `// Postgres Chat Memory Session Key Configuration in n8n
// Session ID Expression:
{{ $json.from_phone_number }}_whatsapp_prod

// Automatically creates & indexes n8n_chat_histories table:
SELECT session_id, message->>'type' as role, message->>'content' as text
FROM n8n_chat_histories WHERE session_id = $1 ORDER BY id DESC LIMIT 10;`,
    content: [
      "Here's something the n8n AI agent setup guides don't say clearly: the default Window Buffer Memory stores conversation state in RAM. The moment your Docker container restarts or redeploys, every customer conversation resets to zero.",
      "For real client deployments, I wire every AI Agent node to a PostgreSQL Chat Memory node backed by Neon or Supabase, keyed deterministically by the customer's WhatsApp number or CRM contact ID.",
      "Even if the server reboots mid-conversation, the AI picks up the exact thread history without asking the client to repeat their name or project requirements."
    ]
  },
  {
    id: 'post-06',
    order: 6,
    slug: 'the-n8n-code-node-is-more-powerful-than-most-builders-realize-heres-what-i-actually-use-it-for',
    thumbnailLocal: '/assets/blog/thumb-06-the-n8n-code-node-is-more-powerful-than-most-builders-realize-heres-what-i-actually-use-it-for.webp',
    title: "The n8n Code Node Is More Powerful Than Most Builders Realize — Here's What I Actually Use It For",
    date: 'May 26, 2026',
    isoDate: '2026-05-26',
    readTime: '5 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'JAVASCRIPT ENGINE • PAYLOAD SANITIZER',
    bannerMetric: '8 Nodes -> 1 Node',
    featuredImage: '',
    tags: ['JavaScript', 'Code Node', 'Data Normalization', 'Regex'],
    localRoute: '#/blog/the-n8n-code-node-is-more-powerful-than-most-builders-realize-heres-what-i-actually-use-it-for',
    excerpt: "The Code node is not just for 'real developers.' That framing is why most n8n builders never touch it — and why their workflows end up three times longer than they need to be.",
    keyTakeaway: 'One 12-line JavaScript Code node can replace 8 chained Set, If, Split, and Merge nodes while making payload normalization 10x easier to read and version-control.',
    codeSnippet: `// Replace 7 nodes with 1 clean Code Node in n8n:
return $input.all().map(item => {
  const raw = item.json;
  const cleanPhone = String(raw.phone || '').replace(/\\D/g, '');
  return {
    json: {
      leadId: raw.id,
      phoneE164: cleanPhone.length === 10 ? '+91' + cleanPhone : '+' + cleanPhone,
      budgetTier: Number(raw.budget) >= 50000 ? 'ENTERPRISE' : 'GROWTH',
      normalizedAt: new Date().toISOString()
    }
  };
});`,
    content: [
      "The Code node is not just for hardcore programmers. That misconception is why many builders chain together nine Set, If, and Merge nodes just to clean a phone number and calculate a lead score.",
      "In JavaScript inside the n8n Code node, you get full access to `$input.all()`, regular expressions, array `.map()` and `.filter()`, and cryptographic hashes in a single visual block."
    ]
  },
  {
    id: 'post-07',
    order: 7,
    slug: 'n8n-error-handling-that-actually-works-how-i-stopped-losing-data-on-workflow-failures',
    thumbnailLocal: '/assets/blog/thumb-07-n8n-error-handling-that-actually-works-how-i-stopped-losing-data-on-workflow-failures.webp',
    title: 'n8n Error Handling That Actually Works: How I Stopped Losing Data on Workflow Failures',
    date: 'May 25, 2026',
    isoDate: '2026-05-25',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'DEAD LETTER QUEUE • ERROR TRIGGER',
    bannerMetric: '99.98% Data Recovery',
    featuredImage: '',
    tags: ['Error Trigger', 'Dead Letter Queue', 'Reliability', 'Retry Logic'],
    localRoute: '#/blog/n8n-error-handling-that-actually-works-how-i-stopped-losing-data-on-workflow-failures',
    excerpt: "The message came in on a Tuesday morning: 'Hey, I haven't received any new leads in the portal since Saturday.' My first thought was that the client's form was broken.",
    keyTakeaway: 'Always pair production workflows with a dedicated Error Trigger workflow that logs the failed payload to a dead_letter_queue table and sends an instant Telegram/Slack alert with a 1-click retry link.',
    codeSnippet: `// Dead Letter Queue Table for Zero Data Loss
CREATE TABLE workflow_dead_letter_queue (
  id SERIAL PRIMARY KEY,
  workflow_name TEXT NOT NULL,
  execution_id TEXT NOT NULL,
  error_message TEXT,
  raw_payload JSONB,
  resolved BOOLEAN DEFAULT FALSE,
  failed_at TIMESTAMPTZ DEFAULT NOW()
);`,
    content: [
      "The message came in on a Tuesday morning: 'Hey, I haven't received any new leads in the portal since Saturday.' An upstream API key had expired, and 42 incoming client leads had failed silently.",
      "Since that day, no workflow goes into production at Techmov without three layers of defense: (1) Retry On Fail enabled on external HTTP nodes, (2) A global Error Trigger workflow that catches any uncaught exception, and (3) A Postgres Dead Letter Queue that stores the raw webhook payload BEFORE any third-party API call is attempted."
    ]
  },
  {
    id: 'post-08',
    order: 8,
    slug: 'n8n-self-hosted-vs-n8n-cloud-the-honest-cost-comparison-after-running-both',
    thumbnailLocal: '/assets/blog/thumb-08-n8n-self-hosted-vs-n8n-cloud-the-honest-cost-comparison-after-running-both.webp',
    title: 'n8n Self-Hosted vs n8n Cloud: The Honest Cost Comparison After Running Both',
    date: 'May 24, 2026',
    isoDate: '2026-05-24',
    readTime: '5 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'CLOUD VS LINUX VPS • INFRASTRUCTURE',
    bannerMetric: '80% Cost Reduction',
    featuredImage: '',
    tags: ['Self-Hosting', 'Docker', 'VPS', 'ROI Comparison'],
    localRoute: '#/blog/n8n-self-hosted-vs-n8n-cloud-the-honest-cost-comparison-after-running-both',
    excerpt: "$600 a year. That's what n8n Cloud costs at the Pro tier, before you hit your execution ceiling and start paying overage. I know because I ran the math after migrating our agency workloads.",
    keyTakeaway: 'Self-hosting n8n with Docker Compose, Caddy/Traefik SSL, and automated Postgres backups on a 4GB RAM VPS cuts annual infrastructure costs by 80% while unlocking unlimited executions.',
    codeSnippet: `# Production Docker Compose snippet for Self-Hosted n8n
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: always
    environment:
      - N8N_ENCRYPTION_KEY=\${N8N_ENCRYPTION_KEY}
      - DB_TYPE=postgresdb
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168`,
    content: [
      "$600 a year. That's what n8n Cloud costs at the Pro tier, before you hit your execution ceiling. When you're running high-frequency webhook listeners and AI lead qualifiers for multiple clients, cloud execution caps become a bottleneck.",
      "Running n8n on your own Linux VPS with Docker Compose and a managed Postgres database gives you complete control over environment variables, custom npm packages, and zero execution throttling."
    ]
  },
  {
    id: 'post-09',
    order: 9,
    slug: 'using-n8n-with-webhooks-the-only-explanation-beginners-actually-need',
    thumbnailLocal: '/assets/blog/thumb-09-using-n8n-with-webhooks-the-only-explanation-beginners-actually-need.webp',
    title: 'Using n8n With Webhooks: The Only Explanation Beginners Actually Need',
    date: 'May 23, 2026',
    isoDate: '2026-05-23',
    readTime: '4 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'EVENT-DRIVEN HTTP • WEBHOOK TRIGGERS',
    bannerMetric: '< 20ms Latency',
    featuredImage: '',
    tags: ['Webhooks', 'HTTP POST', 'Real-Time Triggers', 'API Fundamentals'],
    localRoute: '#/blog/using-n8n-with-webhooks-the-only-explanation-beginners-actually-need',
    excerpt: "Webhooks. The word itself sounds intimidating, right? When I first started with n8n, the term 'webhook' felt like some advanced developer thing. Here is how it actually works.",
    keyTakeaway: 'Polling is asking "Are we there yet?" every 5 minutes. A Webhook is giving the server your address so it dispatches a packet the exact millisecond an event happens.',
    codeSnippet: `// Testing your n8n Webhook from Terminal or Browser DevTools:
curl -X POST https://automate.techmov.in/webhook/client-order \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: tm_live_99481a" \\
  -d '{"client":"Studio Partner","service":"Custom AI Agent","budget_inr":65000}'`,
    content: [
      "Think of polling like checking your physical mailbox every 10 minutes to see if a letter arrived. 99% of the time, the box is empty and you wasted a trip.",
      "A webhook flips the relationship: instead of n8n asking Razorpay, WhatsApp, or your website form if something happened, your website immediately sends an HTTP POST packet to n8n's unique URL the instant a user clicks Submit."
    ]
  },
  {
    id: 'post-10',
    order: 10,
    slug: 'building-a-smart-lead-qualifier-using-n8n-telegram-and-openai',
    thumbnailLocal: '/assets/blog/thumb-10-building-a-smart-lead-qualifier-using-n8n-telegram-and-openai.webp',
    title: 'Building a Smart Lead Qualifier Using n8n, Telegram, and OpenAI',
    date: 'May 22, 2026',
    isoDate: '2026-05-22',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'OPENAI JSON SCHEMA • TELEGRAM BOT',
    bannerMetric: '1.8s Lead Triage',
    featuredImage: '',
    tags: ['OpenAI', 'Telegram Bot', 'Lead Scoring', 'Structured Output'],
    localRoute: '#/blog/building-a-smart-lead-qualifier-using-n8n-telegram-and-openai',
    excerpt: "Lead qualification — the most boring task in any business, and yet the most important one. Sales teams spend hours reading every single message deciding who's a hot lead.",
    keyTakeaway: 'Use OpenAI JSON Structured Outputs inside n8n to score incoming inquiries (0-100), extract budget/timeline, and push instant interactive approval buttons to your Telegram phone.',
    codeSnippet: `// OpenAI System Prompt for Structured Lead Scoring
{
  "role": "system",
  "content": "Extract lead intent and return strict JSON: { score: number (0-100), urgency: 'HIGH'|'MEDIUM'|'LOW', summary: string, recommended_package: string }"
}`,
    content: [
      "Sales teams lose deals not because they can't close, but because they take 6 hours to reply to a high-intent inquiry buried under 30 low-intent messages.",
      "In this build, every incoming form or chat inquiry hits n8n, passes through an OpenAI Structured Output classifier, logs to PostgreSQL, and pings my Telegram within 1.8 seconds with a pre-drafted response and lead score."
    ]
  },
  {
    id: 'post-11',
    order: 11,
    slug: 'stop-getting-overwhelmed-by-n8n-start-with-these-10-basic-nodes',
    thumbnailLocal: '/assets/blog/thumb-11-stop-getting-overwhelmed-by-n8n-start-with-these-10-basic-nodes.webp',
    title: 'Stop Getting Overwhelmed by n8n: Start With These 10 Basic Nodes',
    date: 'May 17, 2026',
    isoDate: '2026-05-17',
    readTime: '5 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'FIRST PRINCIPLES • CORE 10 NODES',
    bannerMetric: '95% Use-Case Coverage',
    featuredImage: '',
    tags: ['Beginner Guide', 'Core Nodes', 'Workflow Design', 'n8n Basics'],
    localRoute: '#/blog/stop-getting-overwhelmed-by-n8n-start-with-these-10-basic-nodes',
    excerpt: "When I opened n8n for the first time, I did what most people do — I stared at the node panel, saw 400+ integrations, and immediately felt like I'd made a mistake.",
    keyTakeaway: '95% of production revenue-generating workflows are built with just 10 core nodes: Webhook, Schedule, HTTP Request, Code, Edit Fields (Set), IF, Switch, Merge, Postgres, and Execute Workflow.',
    codeSnippet: `// The 80/20 Rule of n8n Engineering:
// Master HTTP Request + Code + IF + Postgres -> You can integrate any API on Earth,
// even if n8n doesn't have a dedicated pre-built icon for it.`,
    content: [
      "When you see 400+ app icons in n8n, it's easy to get paralyzed. Here's the truth from building dozens of client systems: almost every app node is just a wrapper around the HTTP Request node.",
      "Once you master Webhook, HTTP Request, Edit Fields (Set), Code, IF, Switch, Merge, Split Out, Postgres, and Execute Workflow, you can build any automation architecture a client orders."
    ]
  },
  {
    id: 'post-12',
    order: 12,
    slug: 'close-leads-9x-faster-auto-sync-postgres-whatsapp-and-your-crm',
    thumbnailLocal: '/assets/blog/thumb-12-close-leads-9x-faster-auto-sync-postgres-whatsapp-and-your-crm.webp',
    title: 'Close Leads 9x Faster: Auto-Sync Postgres, WhatsApp, and Your CRM',
    date: 'May 15, 2026',
    isoDate: '2026-05-15',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'IDEMPOTENT SYNC • ANTI-LOOP GUARD',
    bannerMetric: '9x Faster Response',
    featuredImage: '',
    tags: ['CRM Sync', 'Speed to Lead', 'WhatsApp Automation', 'PostgreSQL'],
    localRoute: '#/blog/close-leads-9x-faster-auto-sync-postgres-whatsapp-and-your-crm',
    excerpt: 'The first time I tried to auto-sync leads between our database, WhatsApp, and the CRM, I broke production on a Friday afternoon with an infinite webhook loop.',
    keyTakeaway: 'Prevent infinite bi-directional sync loops by stamping an idempotency hash or last_synced_source field on every Postgres record before firing outbound CRM/WhatsApp updates.',
    codeSnippet: `// Idempotency Check to Prevent Infinite CRM <-> Postgres Sync Loops
if ($json.last_updated_by === 'n8n_sync_worker') {
  return []; // Halt execution — this change originated from our own sync!
}`,
    content: [
      "Responding to a lead within 60 seconds increases conversion rates dramatically compared to waiting 30 minutes. Manual copy-pasting between website forms, WhatsApp, and CRM kills speed-to-lead.",
      "Here is how we engineered a zero-loop, sub-2-second synchronization pipeline between Neon Postgres, Meta WhatsApp Cloud API, and HubSpot/Pipedrive."
    ]
  },
  {
    id: 'post-13',
    order: 13,
    slug: 'i-built-a-custom-whatsapp-crm-for-local-client-leads-in-n8n-and-you-can-too',
    thumbnailLocal: '/assets/blog/thumb-13-i-built-a-custom-whatsapp-crm-for-local-client-leads-in-n8n-and-you-can-too.webp',
    title: 'I Built a Custom WhatsApp CRM for Local Client Leads in n8n — and You Can Too',
    date: 'May 10, 2026',
    isoDate: '2026-05-10',
    readTime: '7 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'CLIENT CASE STUDY • WHATSAPP CRM',
    bannerMetric: 'Automated Day-2 Followup',
    featuredImage: '',
    tags: ['WhatsApp CRM', 'Case Study', 'Local Business', 'Lead Pipeline'],
    localRoute: '#/blog/i-built-a-custom-whatsapp-crm-for-local-client-leads-in-n8n-and-you-can-too',
    excerpt: "Last month a friend of mine — runs a small interior-design studio here in our city — called me and said, 'yaar, I'm losing leads on WhatsApp. Customers message me, and I forget to follow up.'",
    keyTakeaway: 'Local businesses do not want complicated enterprise CRMs; they want every WhatsApp inquiry automatically logged, tagged, and followed up on Day 2 and Day 5 if unanswered.',
    codeSnippet: `// Automated Follow-up Query (Runs Daily at 10:00 AM via Schedule Trigger)
SELECT id, name, phone, project_type
FROM studio_leads
WHERE status = 'awaiting_reply'
  AND last_contacted_at < NOW() - INTERVAL '48 hours'
  AND followup_count < 2;`,
    content: [
      "Last month a friend who runs an interior-design studio called me: 'I'm losing leads on WhatsApp. Customers message me asking for quotes, I'm on a site visit, and by evening the chat is buried under 40 other messages.'",
      "We built a lightweight n8n + Postgres WhatsApp CRM that captures every inbound message, tags the project type, and triggers automatic polite check-ins after 48 hours if the lead hasn't booked a call."
    ]
  },
  {
    id: 'post-14',
    order: 14,
    slug: 'add-ai-to-your-whatsapp-agent-using-openai-llm-nodes-in-n8n-the-right-way',
    thumbnailLocal: '/assets/blog/thumb-14-add-ai-to-your-whatsapp-agent-using-openai-llm-nodes-in-n8n-the-right-way.webp',
    title: 'Add AI to Your WhatsApp Agent: Using OpenAI/LLM Nodes in n8n—the Right Way',
    date: 'April 28, 2026',
    isoDate: '2026-04-28',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'LLM GUARDRAILS • TOOL CALLING',
    bannerMetric: 'Zero Hallucinations',
    featuredImage: '',
    tags: ['OpenAI', 'WhatsApp AI', 'Guardrails', 'Prompt Engineering'],
    localRoute: '#/blog/add-ai-to-your-whatsapp-agent-using-openai-llm-nodes-in-n8n-the-right-way',
    excerpt: "So we've already built our WhatsApp agent in n8n — receiving messages, saving leads, sending replies. It works. But hardcoded keyword matching feels robotic.",
    keyTakeaway: 'Never let an LLM invent pricing or promise custom features on WhatsApp. Give the AI Agent strict system prompt guardrails, a read-only pricing tool, and a human handoff trigger.',
    codeSnippet: `// AI Agent System Guardrail Prompt
"You are Techmov's intake assistant. Answer questions ONLY using the approved Service Catalog tool.
If a client asks for custom enterprise pricing or legal terms, set handoff_to_human = true."`,
    content: [
      "Hardcoded 'Press 1 for Sales, Press 2 for Support' menus feel dated. But plugging an unguarded LLM directly into your company WhatsApp is equally dangerous if it starts hallucinating discounts.",
      "The right pattern combines an n8n AI Agent node with deterministic Tool Calling and an instant Human Handoff flag when high-value custom software orders arrive."
    ]
  },
  {
    id: 'post-15',
    order: 15,
    slug: 'master-the-n8n-postgresql-node-complete-guide-setup-using-neon-database',
    thumbnailLocal: '/assets/blog/thumb-15-master-the-n8n-postgresql-node-complete-guide-setup-using-neon-database.webp',
    title: 'Master the n8n PostgreSQL Node: Complete Guide + Setup Using Neon Database',
    date: 'April 21, 2026',
    isoDate: '2026-04-21',
    readTime: '7 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'PARAMETERIZED SQL • NEON POOLER',
    bannerMetric: '100% SQLi Protected',
    featuredImage: '',
    tags: ['PostgreSQL', 'Neon DB', 'Parameterized Queries', 'SQL Injection Prevention'],
    localRoute: '#/blog/master-the-n8n-postgresql-node-complete-guide-setup-using-neon-database',
    excerpt: "When I first started using the PostgreSQL node in n8n, I thought it was just a 'connect and query' kind of thing. Then I learned about connection pooling and query parameters.",
    keyTakeaway: 'Always use Query Parameters ($1, $2) in the n8n Postgres node instead of inline {{ $json.input }} string interpolation to prevent SQL injection vulnerabilities.',
    codeSnippet: `// NEVER DO THIS (Vulnerable to SQL Injection):
// SELECT * FROM users WHERE email = '{{ $json.email }}';

// ALWAYS DO THIS (Parameterized Query in n8n Postgres Node):
SELECT id, name, plan FROM users WHERE email = $1 AND active = $2;
// Query Parameters field: {{ $json.email }}, true`,
    content: [
      "When connecting n8n to serverless PostgreSQL like Neon, two things matter most: using the pooled connection string (`-pooler` hostname) with SSL enabled, and never interpolating raw user text directly into SQL strings.",
      "Using `$1, $2` query parameters inside the n8n PostgreSQL node protects your client databases from SQL injection and handles special characters like apostrophes cleanly."
    ]
  },
  {
    id: 'post-16',
    order: 16,
    slug: 'hardening-your-n8n-instance-security-settings-you-shouldnt-ignore',
    thumbnailLocal: '/assets/blog/thumb-16-hardening-your-n8n-instance-security-settings-you-shouldnt-ignore.webp',
    title: "Hardening Your n8n Instance: Security Settings You Shouldn't Ignore",
    date: 'April 16, 2026',
    isoDate: '2026-04-16',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'DEVSECOPS • INSTANCE HARDENING',
    bannerMetric: 'HMAC + Env Isolation',
    featuredImage: '',
    tags: ['Cybersecurity', 'Instance Hardening', 'Webhook Auth', 'Env Variables'],
    localRoute: '#/blog/hardening-your-n8n-instance-security-settings-you-shouldnt-ignore',
    excerpt: 'Leaving a self-hosted n8n instance on default settings exposed to the public internet is an invitation for unauthorized webhook triggers and credential leaks.',
    keyTakeaway: 'Lock down your instance with HMAC Header Auth on all webhooks, strict N8N_ENCRYPTION_KEY management, firewall port restrictions (UFW + Docker), and 2FA.',
    codeSnippet: `# Essential Security Environment Variables for Production n8n
N8N_SECURE_COOKIE=true
N8N_BLOCK_ENV_ACCESS_IN_NODE=true
N8N_PUBLIC_API_DISABLED=false
WEBHOOK_URL=https://automate.techmov.in/`,
    content: [
      "When you build automation systems that hold database credentials, OpenAI API keys, and WhatsApp Business tokens, your n8n server is high-value infrastructure.",
      "We lock down every client deployment by blocking `$env` access inside untrusted Code nodes (`N8N_BLOCK_ENV_ACCESS_IN_NODE=true`), enforcing HMAC signature verification on webhooks, and placing the editor UI behind Cloudflare Zero Trust or VPN."
    ]
  },
  {
    id: 'post-17',
    order: 17,
    slug: 'i-built-an-n8n-workflow-to-fetch-apis-clean-data-automatically-full-guide',
    thumbnailLocal: '/assets/blog/thumb-17-i-built-an-n8n-workflow-to-fetch-apis-clean-data-automatically-full-guide.webp',
    title: 'I Built an n8n Workflow to Fetch APIs & Clean Data Automatically (Full Guide)',
    date: 'April 12, 2026',
    isoDate: '2026-04-12',
    readTime: '5 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'AUTOMATED ETL • SCHEMA SANITIZER',
    bannerMetric: 'Zero Null Crashes',
    featuredImage: '',
    tags: ['ETL Pipeline', 'REST API', 'Data Cleaning', 'Pagination'],
    localRoute: '#/blog/i-built-an-n8n-workflow-to-fetch-apis-clean-data-automatically-full-guide',
    excerpt: 'Three months ago I was building an automation that pulled product data from a third-party REST API. The API returned inconsistent nested JSON, nulls, and broken date formats.',
    keyTakeaway: 'Build resilient ETL pipelines using HTTP Request pagination loops followed by a schema-validation Code node before inserting into your production database.',
    codeSnippet: `// Schema Validation & Sanitization Filter in n8n
const validRecords = $input.all()
  .map(i => i.json)
  .filter(r => r.email && r.email.includes('@'))
  .map(r => ({
    email: r.email.trim().toLowerCase(),
    company: (r.company || 'Independent').trim(),
    mrr: Math.max(0, Number(r.mrr) || 0)
  }));`,
    content: [
      "Third-party APIs are messy in real life. Fields come back as `null`, phone numbers have spaces and brackets, and timestamps mix Unix epochs with ISO strings.",
      "This guide walks through our reusable API ingestion blueprint that handles cursor-based pagination, deduplication, and strict schema sanitization."
    ]
  },
  {
    id: 'post-18',
    order: 18,
    slug: 'run-n8n-on-your-own-vps-free-paid-full-guide',
    thumbnailLocal: '/assets/blog/thumb-18-run-n8n-on-your-own-vps-free-paid-full-guide.webp',
    title: 'Run n8n on Your Own VPS (Free/Paid): Full Guide',
    date: 'April 5, 2026',
    isoDate: '2026-04-05',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'Blog',
    bannerLabel: 'UBUNTU 24.04 VPS • CADDY AUTO-SSL',
    bannerMetric: '10-Min Deployment',
    featuredImage: '',
    tags: ['Linux VPS', 'Docker Compose', 'Reverse Proxy', 'Deployment'],
    localRoute: '#/blog/run-n8n-on-your-own-vps-free-paid-full-guide',
    excerpt: 'On demand, today we are going to learn how to deploy a production-ready n8n server on your own Ubuntu Linux VPS with automatic HTTPS certificates.',
    keyTakeaway: 'An Ubuntu 24.04 VPS running Docker Compose + Caddy reverse proxy gives you automatic Let’s Encrypt SSL and persistent volume storage in under 10 minutes.',
    codeSnippet: `# Caddyfile for instant automatic HTTPS reverse proxy to n8n
automate.techmov.in {
    reverse_proxy n8n:5678 {
        flush_interval -1
    }
}`,
    content: [
      "Deploying n8n on your own Linux VPS is one of the highest-leverage skills you can learn. With a 5-line Caddyfile and Docker Compose, Caddy automatically provisions and renews your SSL certificate so Meta, Razorpay, and Telegram webhooks trust your server immediately."
    ]
  },
  {
    id: 'post-19',
    order: 19,
    slug: 'how-to-connect-n8n-with-neon-postgres-step-by-step-for-beginners',
    thumbnailLocal: '/assets/blog/thumb-19-how-to-connect-n8n-with-neon-postgres-step-by-step-for-beginners.webp',
    title: 'How to Connect n8n With Neon Postgres: Step-By-Step for Beginners',
    date: 'March 18, 2026',
    isoDate: '2026-03-18',
    readTime: '5 min read',
    author: 'axiomcompute',
    category: 'N8N Workflows',
    bannerLabel: 'SERVERLESS SQL • NEON DB SETUP',
    bannerMetric: '30-Sec Provisioning',
    featuredImage: '',
    tags: ['Neon Postgres', 'Serverless SQL', 'Database Setup', 'Beginners'],
    localRoute: '#/blog/how-to-connect-n8n-with-neon-postgres-step-by-step-for-beginners',
    excerpt: "In the last blog I helped you build an Industry Grade WhatsApp Lead Agent in n8n — now let's wire it to a real serverless PostgreSQL database on Neon.",
    keyTakeaway: 'Neon provides a generous free tier of serverless PostgreSQL with database branching, instant point-in-time recovery, and seamless SSL connection into n8n.',
    codeSnippet: `// Connection Settings for Neon inside n8n Postgres Credential:
// Host: ep-cool-darkness-123456-pooler.ap-southeast-1.aws.neon.tech
// Database: neondb
// Port: 5432
// SSL: Allow / Require`,
    content: [
      "Every serious automation needs memory. Neon gives you a production PostgreSQL database in 30 seconds without managing database servers. Here is the exact step-by-step credential configuration inside n8n."
    ]
  },
  {
    id: 'post-20',
    order: 20,
    slug: 'build-your-industrial-grade-n8n-whatsapp-lead-agent-beginner-friendly',
    thumbnailLocal: '/assets/blog/thumb-20-build-your-industrial-grade-n8n-whatsapp-lead-agent-beginner-friendly.webp',
    title: 'Build your Industrial Grade n8n WhatsApp Lead Agent: Beginner Friendly',
    date: 'February 26, 2026',
    isoDate: '2026-02-26',
    readTime: '6 min read',
    author: 'axiomcompute',
    category: 'Blog',
    bannerLabel: 'STARTER ARCHITECTURE • WHATSAPP AGENT',
    bannerMetric: '< 2s Lead Response',
    featuredImage: '',
    tags: ['WhatsApp Agent', 'Lead Automation', 'n8n Foundation', 'Starter Blueprint'],
    localRoute: '#/blog/build-your-industrial-grade-n8n-whatsapp-lead-agent-beginner-friendly',
    excerpt: "The word 'n8n Automation' is trending everywhere, and businesses are looking for reliable WhatsApp lead intake systems that don't drop messages.",
    keyTakeaway: 'Start with a clean 5-node foundation: Meta Webhook Trigger -> Payload Parser -> Database Check -> Conditional Router -> Instant WhatsApp Reply.',
    codeSnippet: `// Webhook Verification Challenge Handler for Meta Cloud API
// GET Webhook Node:
// If hub.verify_token === 'techmov_verify_2026', return plain text:
{{ $json.query['hub.challenge'] }}`,
    content: [
      "This is where our journey on Techmov began: building a rock-solid, industrial-grade WhatsApp Lead Agent from scratch that verifies Meta's webhook challenge, parses incoming customer messages, and replies in under 2 seconds."
    ]
  }
].map(post => {
  const ed = EDITORIAL_REFINEMENTS[post.slug];
  if (!ed) return post;
  return {
    ...post,
    originalWpTitle: post.title,
    title: ed.title,
    excerpt: ed.subhead,
    editorialDesk: ed.desk
  };
});

// ============================================================================
// AGENCY SERVICES & CLIENT ORDER PACKAGES (INR ₹ + RAZORPAY SUPPORT)
// ============================================================================
const AGENCY_SERVICES = [
  {
    id: 'srv-01',
    title: 'Custom Full-Stack Web App & SaaS MVP',
    category: 'Software Engineering',
    badge: 'Flagship Build',
    delivery: '2–4 Weeks',
    priceRange: '₹45,000 – ₹1,20,000',
    basePrice: 45000,
    icon: Globe,
    summary: 'End-to-end React/Next.js frontend, Node/Python backend, and PostgreSQL architecture built to your exact product specification.',
    deliverables: [
      'Responsive React + Tailwind UI with light/dark mode & clean interactions',
      'Secure REST/GraphQL backend with JWT/OAuth authentication',
      'Neon/Supabase PostgreSQL schema design with parameterized queries',
      'Full GitHub repository ownership + CI/CD deployment (Vercel/VPS)'
    ]
  },
  {
    id: 'srv-02',
    title: 'Official WhatsApp Cloud API CRM & 24h Window Engine',
    category: 'Automation Systems',
    badge: 'Zero-Ban Setup',
    delivery: '5–7 Days',
    priceRange: '₹18,000 – ₹35,000',
    basePrice: 18000,
    icon: MessageSquare,
    summary: 'Compliant Meta Cloud API setup in n8n with PostgreSQL 24-hour window tracking, template fallbacks, and automated lead follow-ups.',
    deliverables: [
      'Meta Business Verification & Permanent Access Token setup',
      'PostgreSQL last_user_message_at 24-hour window guard logic',
      'Automated Day-2 and Day-5 Utility template follow-up sequences',
      'Real-time CRM sync (HubSpot, Zoho, Pipedrive, or custom dashboard)'
    ]
  },
  {
    id: 'srv-03',
    title: 'AI Agent with Persistent PostgreSQL Memory',
    category: 'AI & LLM Engineering',
    badge: 'Stateful AI',
    delivery: '1–2 Weeks',
    priceRange: '₹25,000 – ₹55,000',
    basePrice: 25000,
    icon: Cpu,
    summary: 'Custom OpenAI/Claude agent wired to your business knowledge base and Postgres chat history that survives server restarts.',
    deliverables: [
      'Postgres-backed session memory keyed by phone or user ID',
      'Strict anti-hallucination guardrails & deterministic tool-calling',
      'Structured JSON lead scoring (0–100) + instant Telegram/Slack alerts',
      'Seamless human-in-the-loop takeover switch for high-value deals'
    ]
  },
  {
    id: 'srv-04',
    title: 'Enterprise n8n Monolith-to-Subworkflow Refactor',
    category: 'Automation Systems',
    badge: 'High Reliability',
    delivery: '4–6 Days',
    priceRange: '₹15,000 – ₹30,000',
    basePrice: 15000,
    icon: Workflow,
    summary: 'Turn fragile 40-node Zapier/Make/n8n workflows into modular Sub-Workflows with a Dead Letter Queue and instant error recovery.',
    deliverables: [
      'Modular Execute-Workflow architecture (cuts debugging time by 50%)',
      'PostgreSQL Dead Letter Queue so zero webhook payloads are ever lost',
      'Idempotency keys to eliminate infinite CRM sync loops',
      'Global Error Trigger alerts to Telegram/Slack with 1-click retry'
    ]
  },
  {
    id: 'srv-05',
    title: 'Self-Hosted n8n VPS Deployment & Security Hardening',
    category: 'Cloud & DevSecOps',
    badge: 'Save 80% Cloud Cost',
    delivery: '2–3 Days',
    priceRange: '₹10,000 – ₹22,000',
    basePrice: 10000,
    icon: ShieldCheck,
    summary: 'Dedicated Docker Compose deployment on Ubuntu VPS with automatic SSL, HMAC webhook security, and automated database backups.',
    deliverables: [
      'Docker Compose + Caddy/Traefik automatic HTTPS configuration',
      'Environment hardening (N8N_BLOCK_ENV_ACCESS_IN_NODE, secure cookies)',
      'UFW firewall rules + automated daily off-site Postgres backups',
      'Full migration of existing workflows from Make, Zapier, or n8n Cloud'
    ]
  },
  {
    id: 'srv-06',
    title: 'Frontend Security Audit & Backend API Migration',
    category: 'Cloud & DevSecOps',
    badge: 'Security Audit',
    delivery: '3–5 Days',
    priceRange: '₹12,000 – ₹28,000',
    basePrice: 12000,
    icon: Lock,
    summary: 'Eliminate client-side data leaks, exposed API keys, and SQL injection risks by moving sensitive datasets behind rate-limited APIs.',
    deliverables: [
      'Full Chrome DevTools Network/Sources exposure & API vulnerability audit',
      'Migration of exposed client-side arrays/keys to secure backend endpoints',
      'Parameterized SQL queries ($1, $2) & CORS/rate-limit protection',
      'Before/After security verification report'
    ]
  }
];

// ============================================================================
// SEO FAQ SCHEMA ITEMS
// ============================================================================
const SEO_FAQS = [
  {
    q: 'How does Techmov prevent WhatsApp Business numbers from getting banned in n8n?',
    a: 'We never use unofficial scraping libraries like whatsapp-web.js or Baileys. Instead, we wire n8n to the official Meta WhatsApp Cloud API (Graph API v19.0+) and store every customer’s last_user_message_at timestamp in PostgreSQL. An IF node checks if the 24-hour customer service window is open before sending free-form text, automatically falling back to approved Meta Utility templates outside the window.'
  },
  {
    q: 'Do your Combo Bundles really include a free .com/.in domain and cloud hosting?',
    a: 'Yes. Every All-in-One Launch Bundle includes 1 year of .com or .in domain registration in your name plus 3 to 12 months of managed cloud or Linux VPS hosting so your web app and n8n workflows go live immediately without extra setup hurdles.'
  },
  {
    q: 'How does Razorpay checkout work for services and bundles?',
    a: 'Every bundle tile, individual service card, and custom scope calculator quote includes a direct Razorpay Instant Checkout option supporting UPI, Cards, NetBanking, and EMI in INR (₹).'
  },
  {
    q: 'Do I own the source code and self-hosted infrastructure when my order is delivered?',
    a: '100%. Every client receives full GitHub repository ownership, exported n8n JSON workflow blueprints, database schemas, and Docker Compose configurations with zero vendor lock-in.'
  }
];

// ============================================================================
// INTERACTIVE WORKFLOW BLUEPRINTS FOR SANDBOX & HERO TELEMETRY
// ============================================================================
const WORKFLOW_BLUEPRINTS = [
  {
    id: 'bp-whatsapp',
    name: 'WhatsApp 24-Hr Window Guard + AI CRM',
    relatedPostSlug: 'i-stopped-getting-my-whatsapp-number-banned-heres-the-exact-n8n-setup-that-fixed-it',
    description: 'Prevents Meta number bans by checking PostgreSQL last_user_message_at before routing to free-form AI reply or approved Utility template.',
    nodes: [
      { id: 'n1', label: 'Meta Webhook', sub: 'POST /whatsapp-in', icon: Globe, latency: '18ms', log: 'Payload verified: inbound inquiry ("Need custom SaaS MVP")' },
      { id: 'n2', label: 'Code Normalizer', sub: 'Sanitize E.164 & JSON', icon: Code2, latency: '4ms', log: 'Normalized E.164 phone + extracted intent parameters' },
      { id: 'n3', label: 'Neon Postgres', sub: 'Check 24h Window', icon: Database, latency: '31ms', log: 'SELECT last_user_message_at: 2h 14m ago (< 24h Window = TRUE)' },
      { id: 'n4', label: 'OpenAI Agent', sub: 'Lead Score + Memory', icon: Cpu, latency: '410ms', log: 'Lead Score: 94/100 (HIGH PRIORITY) | Context loaded from Postgres' },
      { id: 'n5', label: 'Meta Cloud API', sub: 'Send Reply + Telegram', icon: MessageSquare, latency: '89ms', log: '200 OK: Dispatched response + notified founder Telegram' }
    ]
  },
  {
    id: 'bp-subworkflow',
    name: 'Modular Sub-Workflow Lead Router + Dead Letter Queue',
    relatedPostSlug: 'n8n-error-handling-that-actually-works-how-i-stopped-losing-data-on-workflow-failures',
    description: 'Saves every raw client order to a PostgreSQL Dead Letter Queue first so zero leads are ever lost if an external CRM API goes down.',
    nodes: [
      { id: 'n1', label: 'Client Order Hook', sub: 'HMAC Verified POST', icon: ShieldCheck, latency: '12ms', log: 'Verified X-Webhook-Secret header; Order #TM-8042 received' },
      { id: 'n2', label: 'Postgres DLQ Guard', sub: 'Atomic Raw Backup', icon: Database, latency: '24ms', log: 'INSERT INTO workflow_dead_letter_queue (status: pending_sync)' },
      { id: 'n3', label: 'Execute Sub-Workflow', sub: 'AI Scope Estimator', icon: Workflow, latency: '195ms', log: 'Sub-workflow #04 computed sprint timeline + architecture spec' },
      { id: 'n4', label: 'Idempotent CRM Sync', sub: 'Anti-Loop Hash Check', icon: GitBranch, latency: '64ms', log: 'Upserted client deal to CRM without triggering echo webhook' },
      { id: 'n5', label: 'Telegram Instant Alert', sub: '1-Click Approve Card', icon: Send, latency: '52ms', log: 'Dispatched interactive order card to axiomcompute Telegram' }
    ]
  },
  {
    id: 'bp-etl',
    name: 'Automated API Ingestion & Schema Sanitizer',
    relatedPostSlug: 'i-built-an-n8n-workflow-to-fetch-apis-clean-data-automatically-full-guide',
    description: 'Pulls paginated external REST APIs, strips malformed nulls, validates types in JavaScript, and performs parameterized Postgres upserts.',
    nodes: [
      { id: 'n1', label: 'Schedule / Trigger', sub: 'Every 15 Mins', icon: Clock, latency: '2ms', log: 'Cron worker initiated batch sync job #ETL-409' },
      { id: 'n2', label: 'HTTP Paginator', sub: 'Fetch External REST', icon: Server, latency: '240ms', log: 'Fetched 250 records across 3 cursor pages (HTTP 200 OK)' },
      { id: 'n3', label: 'JS Schema Filter', sub: 'Deduplicate & Clean', icon: Terminal, latency: '7ms', log: 'Filtered 14 malformed rows; standardized 236 valid records' },
      { id: 'n4', label: 'Parameterized SQL', sub: 'ON CONFLICT DO UPDATE', icon: Database, latency: '48ms', log: 'Batch upserted 236 rows via $1, $2 parameters (0 SQLi risk)' },
      { id: 'n5', label: 'Metrics Logger', sub: 'Audit Trail Complete', icon: Activity, latency: '15ms', log: 'Sync health 100% — total runtime 312ms' }
    ]
  }
];

export default function App() {
  // Navigation & Minimalist Theme State (DEFAULT WHITE / LIGHT THEME)
  // Pages: 'home' | 'bundles' | 'services' | 'blog' | 'sandbox' | 'wp_sync' | 'about' | 'contact' | 'privacy' | 'terms' | 'refund'
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false); // Default is crisp minimalist White
  const [cursorMotionEnabled, setCursorMotionEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live WordPress Blog Posts State (Pre-loaded with all 20 real posts + live REST API sync updater)
  const [blogPosts, setBlogPosts] = useState(INITIAL_BLOG_POSTS);
  const [wpSyncStatus, setWpSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'success' | 'offline_fallback'
  const [wpSyncMessage, setWpSyncMessage] = useState('20 verified techmov.in articles loaded (Ready for Live WP REST API Sync)');

  // Razorpay Payment Links State (Editable in-app + persisted in localStorage safely)
  const [razorpayConfig, setRazorpayConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('techmov_razorpay_links');
      return saved ? JSON.parse(saved) : DEFAULT_RAZORPAY_LINKS;
    } catch {
      return DEFAULT_RAZORPAY_LINKS;
    }
  });
  const [activeRazorpayCheckout, setActiveRazorpayCheckout] = useState(null);

  // Scroll Progress & Cursor Follower Refs
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const heroCanvasRef = useRef(null);
  const heroSectionRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  // Hero & Workflow Simulator State
  const [selectedBlueprintIdx, setSelectedBlueprintIdx] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);
  const [executionCount, setExecutionCount] = useState(1428);
  const [executionLogs, setExecutionLogs] = useState([
    { time: '19:30:02', node: 'Meta Webhook', msg: 'Payload verified: inbound inquiry ("Need custom SaaS MVP")', status: 'ok' },
    { time: '19:30:03', node: 'Code Normalizer', msg: 'Normalized E.164 phone + extracted intent parameters', status: 'ok' },
    { time: '19:30:04', node: 'Neon Postgres', msg: 'SELECT last_user_message_at: 2h 14m ago (< 24h Window = TRUE)', status: 'ok' }
  ]);

  // Interactive Custom Software & Automation Order Configurator State (INR ₹)
  const [orderProjectType, setOrderProjectType] = useState('webapp');
  const [selectedAddons, setSelectedAddons] = useState(['postgres', 'whatsapp']);
  const [urgencyLevel, setUrgencyLevel] = useState('standard');

  // Client Order Modal & Form State
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    company: '',
    serviceTitle: 'Custom Full-Stack Web App & SaaS MVP',
    budget: '₹45,000 – ₹1,20,000',
    timeline: '2–4 Weeks',
    requirements: '',
    paymentLink: DEFAULT_RAZORPAY_LINKS.masterCheckoutUrl
  });
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [latestOrderReceipt, setLatestOrderReceipt] = useState(null);

  // Blog Reader & Filter State
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategory, setBlogCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentBlueprint = WORKFLOW_BLUEPRINTS[selectedBlueprintIdx];

  // ============================================================================
  // LIVE BROWSER-SIDE WORDPRESS REST API FETCHER (FETCHES LIVE POSTS + IMAGES)
  // ============================================================================
  const syncLiveFromWordPress = async () => {
    setWpSyncStatus('syncing');
    setWpSyncMessage('Connecting to https://techmov.in/wp-json/wp/v2/posts?_embed=1 ...');
    try {
      const response = await fetch('https://techmov.in/wp-json/wp/v2/posts?per_page=30&_embed=1');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const wpPosts = await response.json();
      if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
        throw new Error('Empty post array');
      }

      const merged = wpPosts.map((wp, idx) => {
        const existing = INITIAL_BLOG_POSTS.find(p => p.slug === wp.slug) || INITIAL_BLOG_POSTS[idx % INITIAL_BLOG_POSTS.length];
        const media = wp._embedded?.['wp:featuredmedia']?.[0];
        let featuredImg =
          media?.source_url ||
          media?.media_details?.sizes?.large?.source_url ||
          wp.jetpack_featured_media_url ||
          '';

        if (!featuredImg && wp.content?.rendered) {
          const match = wp.content.rendered.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (match && match[1]) featuredImg = match[1];
        }

        const rawWpTitle = (wp.title?.rendered || existing.title)
          .replace(/&#8211;/g, '–')
          .replace(/&#8212;/g, '—')
          .replace(/&#8217;/g, "'")
          .replace(/&amp;/g, '&');
        const editorialOverride = EDITORIAL_REFINEMENTS[wp.slug || existing.slug];
        const cleanTitle = editorialOverride?.title || rawWpTitle;

        const cleanExcerpt = (wp.excerpt?.rendered || existing.excerpt)
          .replace(/<[^>]+>/g, '')
          .replace(/&#8217;/g, "'")
          .replace(/&#8212;/g, '—')
          .trim();

        const orderStr = String(idx + 1).padStart(2, '0');
        const slugVal = wp.slug || existing.slug;
        const rawHtml = (wp.content?.rendered || '').replace(
          /href=["']https?:\/\/(?:www\.)?techmov\.in\/([a-z0-9-]+)\/?["']/gi,
          'href="#/blog/$1" data-internal-slug="$1"'
        );
        return {
          ...existing,
          id: `post-${orderStr}`,
          order: idx + 1,
          slug: slugVal,
          title: cleanTitle,
          thumbnailLocal: `/assets/blog/thumb-${orderStr}-${slugVal}.webp`,
          featuredImage: featuredImg || existing.featuredImage || '',
          featuredImageRemoteBackup: featuredImg || '',
          excerpt: cleanExcerpt || existing.excerpt,
          htmlContent: rawHtml || existing.htmlContent || '',
          localRoute: `#/blog/${slugVal}`
        };
      });

      setBlogPosts(merged);
      setWpSyncStatus('success');
      setWpSyncMessage(`Synced ${merged.length} live posts + featured media from techmov.in WP REST API!`);
    } catch (err) {
      // If browser CORS or sandbox blocks external fetch, keep the 20 verified posts + architectural banners
      setWpSyncStatus('offline_fallback');
      setWpSyncMessage(
        'Using 20 verified techmov.in articles + architectural featured banners (Run node export_techmov_wp.js locally to download raw .webp thumbnails).'
      );
    }
  };

  // Automatically load all locally exported src/data/blogs/post-*.js files if present in Vite build
  useEffect(() => {
    try {
      const modules = import.meta.glob('./data/blogs/post-*.js', { eager: true });
      const loaded = Object.values(modules)
        .map(m => m.default)
        .filter(Boolean)
        .sort((a, b) => (a.order || 99) - (b.order || 99));
      if (loaded.length > 0) {
        setBlogPosts(prev =>
          loaded.map((wpPost, idx) => {
            const fallback = prev.find(p => p.slug === wpPost.slug) || prev[idx] || {};
            const ed = EDITORIAL_REFINEMENTS[wpPost.slug];
            return {
              ...fallback,
              ...wpPost,
              title: ed?.title || wpPost.title || fallback.title,
              excerpt: ed?.subhead || wpPost.excerpt || fallback.excerpt,
              editorialDesk: ed?.desk || fallback.editorialDesk || 'SYSTEMS DESK',
              thumbnailLocal: wpPost.thumbnailLocal || fallback.thumbnailLocal,
              featuredImage: wpPost.thumbnailLocal || wpPost.featuredImage || fallback.featuredImage
            };
          })
        );
        return;
      }
    } catch {}
    syncLiveFromWordPress();
  }, []);

  // Save custom Razorpay link updates
  const updateMasterRazorpayLink = (newUrl) => {
    const updated = {
      ...razorpayConfig,
      masterCheckoutUrl: newUrl
    };
    setRazorpayConfig(updated);
    try {
      localStorage.setItem('techmov_razorpay_links', JSON.stringify(updated));
    } catch {}
  };

  // Trigger Instant Razorpay Checkout Modal
  const openRazorpayCheckout = (itemTitle, amountDisplay, categoryLabel, rzpUrl) => {
    setActiveRazorpayCheckout({
      title: itemTitle,
      amount: amountDisplay,
      category: categoryLabel,
      url: rzpUrl || razorpayConfig.masterCheckoutUrl || 'https://razorpay.me/@techmov'
    });
  };

  // ============================================================================
  // 1. MOUSE CURSOR SPRING FOLLOWER & SCROLL PROGRESS TRACKER (WITH OFF SWITCH)
  // ============================================================================
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!cursorMotionEnabled) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = null;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0)`;
      }
    };

    const animateRing = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${currentX - 18}px, ${currentY - 18}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorMotionEnabled]);

  // ============================================================================
  // 2. FULL-WIDTH ZOOMED 3D TOPOLOGY MESH BEHIND THE HERO SECTION
  // ============================================================================
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    const heroContainer = heroSectionRef.current;
    if (!canvas || !heroContainer || activeTab !== 'home') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = heroContainer.clientWidth || window.innerWidth);
    let height = (canvas.height = heroContainer.clientHeight || 640);

    const handleResize = () => {
      if (!heroContainer) return;
      width = canvas.width = heroContainer.clientWidth || window.innerWidth;
      height = canvas.height = heroContainer.clientHeight || 640;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = 46;
    const nodes = Array.from({ length: nodeCount }, (_, idx) => {
      const phi = Math.acos(-1 + (2 * idx) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      return {
        x3d: 520 * Math.cos(theta) * Math.sin(phi),
        y3d: 260 * Math.sin(theta) * Math.sin(phi),
        z3d: 340 * Math.cos(phi),
        label:
          idx % 7 === 0
            ? [
                'WEBHOOK_IN',
                'NEON_POSTGRES',
                'n8n_SUBWORKFLOW',
                'LLM_MEMORY',
                'META_CLOUD_API',
                'DEAD_LETTER_Q',
                'RAZORPAY_HOOK'
              ][Math.floor(idx / 7) % 7]
            : null
      };
    });

    const pulses = Array.from({ length: 9 }, (_, i) => ({
      from: (i * 4) % nodeCount,
      to: (i * 4 + 5) % nodeCount,
      progress: (i * 0.14) % 1,
      speed: 0.008 + (i % 3) * 0.003
    }));

    let angleY = 0.25;
    let angleX = 0.12;

    const onHeroMouseMove = (e) => {
      const rect = heroContainer.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const onHeroMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };
    heroContainer.addEventListener('mousemove', onHeroMouseMove, { passive: true });
    heroContainer.addEventListener('mouseleave', onHeroMouseLeave, { passive: true });

    const renderFrame = (time) => {
      ctx.clearRect(0, 0, width, height);

      const gridStep = 44;
      ctx.fillStyle = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.07)';
      for (let gx = 22; gx < width; gx += gridStep) {
        for (let gy = 22; gy < height; gy += gridStep) {
          ctx.fillRect(gx, gy, 1.2, 1.2);
        }
      }

      if (isSimulating && cursorMotionEnabled) {
        angleY += 0.0022;
        angleX = 0.1 + Math.sin(time * 0.0004) * 0.05;
      }

      const centerX = width * 0.56;
      const centerY = height * 0.5;
      const radiusScale = Math.max(0.85, Math.min(1.45, width / 1050));

      const projected = nodes.map(n => {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = n.x3d * radiusScale * cosY - n.z3d * sinY;
        const z1 = n.z3d * cosY + n.x3d * radiusScale * sinY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = n.y3d * radiusScale * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.y3d * radiusScale * sinX;

        const fov = 680;
        const scale = fov / Math.max(180, fov + z2 + 220);
        let px = centerX + x1 * scale;
        let py = centerY + y2 * scale;

        if (cursorMotionEnabled && mousePosRef.current.x > 0) {
          const dx = mousePosRef.current.x - px;
          const dy = mousePosRef.current.y - py;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 1) {
            const pull = ((180 - dist) / 180) * 18;
            px += (dx / dist) * pull;
            py += (dy / dist) * pull;
          }
        }

        return { px, py, scale, z2, label: n.label };
      });

      const maxDist = 230 * radiusScale;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const d = Math.hypot(a.px - b.px, a.py - b.py);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * (darkMode ? 0.24 : 0.18);
            ctx.strokeStyle = darkMode
              ? `rgba(148, 163, 184, ${alpha})`
              : `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.stroke();
          }
        }
      }

      pulses.forEach(p => {
        if (isSimulating) {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.from = p.to;
            p.to = Math.floor(Math.random() * projected.length);
          }
        }
        const start = projected[p.from];
        const end = projected[p.to];
        if (start && end) {
          const cx = start.px + (end.px - start.px) * p.progress;
          const cy = start.py + (end.py - start.py) * p.progress;

          ctx.strokeStyle = darkMode ? 'rgba(56, 189, 248, 0.32)' : 'rgba(37, 99, 235, 0.30)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(start.px, start.py);
          ctx.lineTo(end.px, end.py);
          ctx.stroke();

          ctx.fillStyle = darkMode ? '#38BDF8' : '#2563EB';
          ctx.beginPath();
          ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      projected.forEach((pt, idx) => {
        const isHighlighted = idx % 5 === activeNodeIdx;
        const r = (pt.label ? 4.4 : 2.6) * pt.scale;

        if (isHighlighted) {
          ctx.fillStyle = darkMode ? 'rgba(56, 189, 248, 0.18)' : 'rgba(37, 99, 235, 0.14)';
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, r * 3.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = pt.label
          ? darkMode
            ? '#38BDF8'
            : '#1D4ED8'
          : darkMode
          ? '#64748B'
          : '#94A3B8';
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, Math.max(2, r), 0, Math.PI * 2);
        ctx.fill();

        if (pt.label) {
          ctx.font = '600 10px "Space Grotesk", ui-monospace, SFMono-Regular, monospace';
          ctx.fillStyle = darkMode ? 'rgba(226, 232, 240, 0.78)' : 'rgba(15, 23, 42, 0.68)';
          ctx.fillText(pt.label, pt.px + 9, pt.py + 3);
        }
      });

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('resize', handleResize);
      heroContainer.removeEventListener('mousemove', onHeroMouseMove);
      heroContainer.removeEventListener('mouseleave', onHeroMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, darkMode, isSimulating, cursorMotionEnabled, activeNodeIdx]);

  // Dynamic SEO Meta & JSON-LD Structured Data Engine
  const currentSeoMeta = useMemo(() => {
    if (activePost) {
      return {
        title: `${activePost.title} | Techmov.in Engineering Blog`,
        description: activePost.excerpt,
        canonical: activePost.url,
        ogType: 'article'
      };
    }
    const metaByTab = {
      home: {
        title: 'Techmov.in — Custom Software Studio, Launch Bundles & n8n Automation Consultancy',
        description: 'Live the life of Automation. Order custom full-stack web apps, All-in-One Launch Bundles with free .com/.in domain & cloud hosting, and n8n workflows engineered by axiomcompute.',
        canonical: 'https://techmov.in/',
        ogType: 'website'
      },
      bundles: {
        title: 'All-in-One Launch Bundles (Free .com Domain + Hosting + Razorpay) | Techmov.in',
        description: 'Compare Techmov Launch Bundles combining custom web apps, n8n WhatsApp automation, a free .com/.in domain for 1 year, and managed cloud hosting.',
        canonical: 'https://techmov.in/#bundles',
        ogType: 'website'
      },
      services: {
        title: 'Software Engineering & n8n Automation Services | Techmov.in Client Portal',
        description: 'Browse turnkey software and automation packages on Techmov.in with instant Razorpay checkout: Full-Stack SaaS MVPs, Official WhatsApp Cloud API CRMs, and Postgres AI Agents.',
        canonical: 'https://techmov.in/#services',
        ogType: 'website'
      },
      sandbox: {
        title: 'Interactive n8n Workflow & Backend Pipeline Animator | Techmov.in',
        description: 'Test Techmov’s production n8n blueprints live: WhatsApp 24-hour window guard, modular sub-workflow lead router with Postgres Dead Letter Queue, and automated REST API ingestion.',
        canonical: 'https://techmov.in/#sandbox',
        ogType: 'website'
      },
      blog: {
        title: 'n8n Workflows & Systems Engineering Blog (20 Production Guides) | Techmov.in',
        description: 'Read all 20 real-world n8n automation, Neon PostgreSQL, OpenAI agent memory, and WhatsApp Cloud API engineering guides written by axiomcompute on Techmov.in.',
        canonical: 'https://techmov.in/category/blog/n8n-workflows/',
        ogType: 'blog'
      },
      wp_sync: {
        title: 'WordPress REST API Sync & Razorpay Link Manager | Techmov.in',
        description: '1-Page Node.js WordPress REST API blog and featured image sync engine plus live Razorpay payment link configuration for Techmov.in.',
        canonical: 'https://techmov.in/#wp-sync',
        ogType: 'website'
      },
      about: {
        title: 'Meet axiomcompute — Founder & Lead Systems Architect | Techmov.in',
        description: 'Learn how axiomcompute builds resilient full-stack web apps, PostgreSQL-backed AI agents, and production n8n workflows at Techmov.in.',
        canonical: 'https://techmov.in/author/axiomcompute/',
        ogType: 'profile'
      },
      contact: {
        title: 'Contact & Direct Order Desk | Techmov.in',
        description: 'Get in touch with axiomcompute at Techmov.in for custom software orders, n8n workflow architecture, or Razorpay milestone billing.',
        canonical: 'https://techmov.in/contact/',
        ogType: 'website'
      },
      privacy: {
        title: 'Privacy Policy & Data Protection | Techmov.in',
        description: 'How Techmov.in handles client data, webhook payloads, database credentials, and privacy compliance.',
        canonical: 'https://techmov.in/privacy-policy/',
        ogType: 'website'
      },
      terms: {
        title: 'Terms of Service & Intellectual Property Handover | Techmov.in',
        description: 'Standard client engagement terms, 100% repository ownership policy, and milestone delivery SLA at Techmov.in.',
        canonical: 'https://techmov.in/terms/',
        ogType: 'website'
      },
      refund: {
        title: 'Refund, Cancellation & Milestone SLA Policy | Techmov.in',
        description: 'Transparent milestone-based billing, domain/hosting provisioning terms, and refund protections for Techmov.in clients.',
        canonical: 'https://techmov.in/refund-policy/',
        ogType: 'website'
      }
    };
    return metaByTab[activeTab] || metaByTab.home;
  }, [activeTab, activePost]);

  useEffect(() => {
    document.title = currentSeoMeta.title;
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', currentSeoMeta.description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentSeoMeta.canonical);

    let iconTag = document.querySelector('link[rel="icon"]');
    if (!iconTag) {
      iconTag = document.createElement('link');
      iconTag.setAttribute('rel', 'icon');
      document.head.appendChild(iconTag);
    }
    iconTag.setAttribute('href', BRAND_ASSETS.iconRemote);
  }, [currentSeoMeta]);

  const jsonLdSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfessionalService',
          '@id': 'https://techmov.in/#organization',
          name: 'Techmov',
          alternateName: 'Techmov.in — Live the life of Automation',
          url: 'https://techmov.in/',
          slogan: 'Live the life of Automation',
          founder: {
            '@type': 'Person',
            name: 'axiomcompute',
            localRoute: '#/blog/author/axiomcompute',
            jobTitle: 'Lead Systems Architect & Full-Stack Automation Engineer'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Techmov Software & Automation Services & Launch Bundles',
            itemListElement: [
              ...COMBO_BUNDLES.map(b => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: b.title,
                  description: `${b.tagline} (${b.domainPerk} + ${b.hostingPerk})`
                },
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  price: b.priceNumeric,
                  priceCurrency: 'INR'
                }
              })),
              ...AGENCY_SERVICES.map(s => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: s.title,
                  description: s.summary
                },
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  price: s.basePrice,
                  priceCurrency: 'INR'
                }
              }))
            ]
          }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://techmov.in/#faq',
          mainEntity: SEO_FAQS.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a
            }
          }))
        },
        {
          '@type': 'Blog',
          '@id': 'https://techmov.in/#blog',
          name: 'Techmov n8n & Systems Engineering Blog',
          localRoute: '#/blog/category/blog/n8n-workflows',
          blogPost: blogPosts.slice(0, 10).map(p => ({
            '@type': 'BlogPosting',
            headline: p.title,
            datePublished: p.isoDate,
            author: { '@type': 'Person', name: p.author },
            url: p.url,
            description: p.excerpt
          }))
        }
      ]
    };
  }, [blogPosts]);

  // Continuous Node Animation Loop for the Telemetry Stream
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveNodeIdx(prev => {
        const next = (prev + 1) % currentBlueprint.nodes.length;
        const nodeObj = currentBlueprint.nodes[next];
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        setExecutionLogs(oldLogs => [
          { time: timeStr, node: nodeObj.label, msg: nodeObj.log, status: 'ok' },
          ...oldLogs.slice(0, 4)
        ]);
        if (next === currentBlueprint.nodes.length - 1) {
          setExecutionCount(c => c + 1);
        }
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isSimulating, selectedBlueprintIdx, currentBlueprint]);

  const triggerTestPayload = () => {
    setActiveNodeIdx(0);
    setIsSimulating(true);
    setExecutionCount(c => c + 1);
    const now = new Date().toTimeString().split(' ')[0];
    setExecutionLogs(old => [
      { time: now, node: 'PACKET DISPATCH', msg: `Executed live test trace on [${currentBlueprint.name}]`, status: 'burst' },
      ...old.slice(0, 4)
    ]);
  };

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Computed Scope Estimate in Indian Rupees (₹ INR)
  const scopeEstimate = useMemo(() => {
    const baseMap = {
      webapp: { label: 'Full-Stack Web App / SaaS MVP', price: 45000, days: 18, stack: ['React + Vite / Next.js', 'Tailwind CSS', 'Node.js API'] },
      n8n: { label: 'Modular n8n Automation System', price: 15000, days: 6, stack: ['n8n Self-Hosted / Cloud', 'Sub-Workflows', 'Webhook Router'] },
      ai_agent: { label: 'AI Agent + Persistent Memory', price: 25000, days: 9, stack: ['OpenAI Structured JSON', 'n8n Agent Node', 'Guardrail Prompts'] },
      whatsapp_crm: { label: 'Official WhatsApp Cloud API CRM', price: 18000, days: 6, stack: ['Meta Graph API v19.0', '24h Window Logic', 'Utility Templates'] }
    };
    const addonMap = {
      postgres: { label: 'Neon PostgreSQL + Dead Letter Queue', price: 6000, days: 2 },
      whatsapp: { label: 'WhatsApp Official Cloud API Integration', price: 8000, days: 3 },
      telegram: { label: 'Telegram Instant Lead Scorer Bot', price: 5000, days: 2 },
      vps: { label: 'Docker VPS Hardening + Auto SSL', price: 7000, days: 2 },
      security: { label: 'DevTools Security & SQLi Hardening Audit', price: 8500, days: 2 }
    };

    const selectedBase = baseMap[orderProjectType] || baseMap.webapp;
    let total = selectedBase.price;
    let totalDays = selectedBase.days;
    const activeStack = [...selectedBase.stack];

    selectedAddons.forEach(a => {
      if (addonMap[a]) {
        total += addonMap[a].price;
        totalDays += addonMap[a].days;
        activeStack.push(addonMap[a].label);
      }
    });

    if (urgencyLevel === 'priority') {
      total = Math.round(total * 1.2);
      totalDays = Math.max(3, Math.round(totalDays * 0.75));
    } else if (urgencyLevel === 'express') {
      total = Math.round(total * 1.4);
      totalDays = Math.max(2, Math.round(totalDays * 0.55));
    }

    return {
      projectLabel: selectedBase.label,
      totalPrice: total,
      estimatedDays: totalDays,
      stack: activeStack
    };
  }, [orderProjectType, selectedAddons, urgencyLevel]);

  const openOrderWithConfig = (customTitle, customBudget, customTimeline, customReq, customRzpUrl) => {
    setOrderForm(prev => ({
      ...prev,
      serviceTitle: customTitle || scopeEstimate.projectLabel,
      budget: customBudget || `₹${scopeEstimate.totalPrice.toLocaleString('en-IN')} Estimated`,
      timeline: customTimeline || `${scopeEstimate.estimatedDays} Days Sprint`,
      requirements: customReq || `Included modules: ${scopeEstimate.stack.join(', ')}`,
      paymentLink: customRzpUrl || razorpayConfig.masterCheckoutUrl
    }));
    setLatestOrderReceipt(null);
    setOrderModalOpen(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.name.trim() || !orderForm.email.trim()) return;
    const orderId = `TM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId,
      ...orderForm,
      createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Architecture Review & Razorpay Link Ready'
    };
    setSubmittedOrders(prev => [newOrder, ...prev]);
    setLatestOrderReceipt(newOrder);
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCat = blogCategory === 'All' || post.category === blogCategory;
      const q = blogSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags || []).some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [blogPosts, blogSearch, blogCategory]);

  const handleCopyCode = (code) => {
    try {
      navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Navigate to a tab and scroll smoothly to top
  const navigateToPage = (pageId) => {
    setActiveTab(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // High-Contrast Minimalist Theme Classes (Default Light = Pure White/Slate, Dark = Carbon/Slate)
  const bgMain = darkMode ? 'bg-[#090A0F] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardSurface = darkMode
    ? 'bg-[#12141D] border-[#25293A] text-[#F8FAFC]'
    : 'bg-white border-slate-200 text-slate-900 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)]';
  const mutedText = darkMode ? 'text-slate-300' : 'text-slate-600';
  const subText = darkMode ? 'text-slate-200' : 'text-slate-800';
  const borderSubtle = darkMode ? 'border-[#222634]' : 'border-slate-200';

  // Helper component: Renders local/exported Featured Image (`thumbnailLocal` / `featuredImage`) or Architectural Blueprint Banner
  const renderPostFeaturedMedia = (post, heightClass = 'h-48') => {
    const imgSrc = post.thumbnailLocal || post.featuredImage;
    if (imgSrc) {
      return (
        <div className={`relative w-full ${heightClass} overflow-hidden bg-slate-950 border-b ${borderSubtle} shrink-0`}>
          <img
            src={imgSrc}
            alt={post.title}
            loading="lazy"
            onError={(e) => {
              if (post.featuredImageRemoteBackup && e.currentTarget.src !== post.featuredImageRemoteBackup) {
                e.currentTarget.src = post.featuredImageRemoteBackup;
              } else {
                e.currentTarget.style.display = 'none';
              }
            }}
            className="w-full h-full object-contain sm:object-cover bg-slate-950 group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-editorial-tag font-bold uppercase bg-slate-950/85 text-white border border-white/15 backdrop-blur-xs">
            #{String(post.order).padStart(2, '0')} • {post.category}
          </div>
        </div>
      );
    }

    // Bespoke Architectural Blueprint Featured Thumbnail Banner (Consistent across all 20 guides)
    return (
      <div
        className={`relative w-full ${heightClass} overflow-hidden border-b ${borderSubtle} p-5 flex flex-col justify-between ${
          darkMode
            ? 'bg-gradient-to-br from-[#151928] via-[#0F131F] to-[#172036]'
            : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white'
        }`}
      >
        {/* Subtle Architectural Grid Pattern Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`grid-${post.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${post.id})`} />
        </svg>

        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="font-editorial-tag text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-blue-300 border border-white/15">
            GUIDE #{String(post.order).padStart(2, '0')} • {post.category}
          </span>
          <span className="font-editorial-tag text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-200 border border-blue-400/30">
            {post.bannerMetric || post.readTime}
          </span>
        </div>

        {/* Visual Node Pipeline Schematic inside the Featured Banner */}
        <div className="relative z-10 my-auto flex items-center gap-2 py-2">
          <div className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 font-mono text-[10px] text-slate-200">
            Webhook
          </div>
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-blue-400 to-emerald-400" />
          <div className="px-2.5 py-1 rounded-lg bg-blue-500/25 border border-blue-400/40 font-mono text-[10px] text-blue-200 font-bold">
            n8n Core
          </div>
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-emerald-400 to-blue-400" />
          <div className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 font-mono text-[10px] text-emerald-300">
            Postgres
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-editorial-tag uppercase tracking-wider text-slate-300">
          <span>{post.bannerLabel || 'PRODUCTION ARCHITECTURE'}</span>
          <span>techmov.in</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`${bgMain} min-h-screen font-body antialiased transition-colors duration-200 relative overflow-x-hidden flex flex-col`}>
      {/* Inject Real JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-slate-900 focus:text-white focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Load Distinct Display & Editorial Fonts (Space Grotesk + Instrument Serif + Plus Jakarta Sans) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

        .font-body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-editorial-tag {
          font-family: 'Space Grotesk', ui-monospace, SFMono-Regular, monospace;
          letter-spacing: 0.04em;
        }
        .font-serif-accent {
          font-family: 'Instrument Serif', Georgia, serif;
        }
        .btn-pill-primary {
          border-radius: 9999px;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
          box-shadow: 0 4px 14px -2px rgba(15, 23, 42, 0.18), 0 2px 4px -1px rgba(15, 23, 42, 0.08);
        }
        .btn-pill-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px -6px rgba(37, 99, 235, 0.32), 0 6px 12px -3px rgba(15, 23, 42, 0.12);
        }
        .btn-pill-primary:active {
          transform: translateY(0px);
        }
        .btn-pill-razorpay {
          border-radius: 9999px;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
          box-shadow: 0 4px 14px -2px rgba(37, 99, 235, 0.28);
        }
        .btn-pill-razorpay:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px -6px rgba(37, 99, 235, 0.45);
        }
        .btn-pill-secondary {
          border-radius: 9999px;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s ease, border-color 0.2s ease, background-color 0.2s ease;
        }
        .btn-pill-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px -6px rgba(15, 23, 42, 0.10);
        }
        .card-editorial {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.24s ease;
        }
                .wp-native-article h2, .wp-native-article h3, .wp-native-article h4 {
          font-weight: 800;
          margin-top: 1.5rem;
          margin-bottom: 0.65rem;
          line-height: 1.3;
        }
        .wp-native-article h2 { font-size: 1.35rem; }
        .wp-native-article h3 { font-size: 1.15rem; }
        .wp-native-article p { margin-bottom: 1rem; line-height: 1.75; }
        .wp-native-article ul, .wp-native-article ol {
          margin: 0.75rem 0 1.25rem 1.25rem;
          list-style: disc;
        }
        .wp-native-article li { margin-bottom: 0.4rem; }
        .wp-native-article pre, .wp-native-article code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.82rem;
        }
        .wp-native-article pre {
          background: #0F172A;
          color: #F8FAFC;
          padding: 1rem;
          border-radius: 1rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .wp-native-article img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 1rem 0;
        }
        .card-editorial:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 38px -12px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(37, 99, 235, 0.06);
        }
      `}</style>

      {/* Top Scroll Progress Line & Mouse Cursor Follower (When Motion FX is Enabled) */}
      {cursorMotionEnabled && (
        <>
          <div
            className="fixed top-0 left-0 h-[3px] bg-blue-600 z-50 transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
          <div
            ref={cursorDotRef}
            className="hidden lg:block pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-600 z-50 transition-transform duration-75"
            aria-hidden="true"
          />
          <div
            ref={cursorRingRef}
            className={`hidden lg:block pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full border z-50 ${
              darkMode ? 'border-blue-400/40 bg-blue-500/5' : 'border-slate-900/25 bg-slate-900/[0.02]'
            }`}
            aria-hidden="true"
          />
        </>
      )}

      {/* Clean Minimalist Sticky Header with Clear Page Links */}
      <header
        className={`${
          darkMode ? 'bg-[#090A0F]/90 border-[#222634]' : 'bg-white/90 border-slate-200/90'
        } sticky top-0 z-30 backdrop-blur-md border-b transition-colors`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Official Live Techmov.in Logo & Brand Mark */}
          <button
            onClick={() => navigateToPage('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            aria-label="Techmov.in Home"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src={BRAND_ASSETS.logoLocal}
                alt="Techmov.in Official Logo"
                onError={(e) => {
                  if (e.currentTarget.src !== BRAND_ASSETS.logoRemote) {
                    e.currentTarget.src = BRAND_ASSETS.logoRemote;
                  } else if (e.currentTarget.src !== BRAND_ASSETS.iconRemote) {
                    e.currentTarget.src = BRAND_ASSETS.iconRemote;
                  } else {
                    e.currentTarget.style.display = 'none';
                  }
                }}
                className="w-full h-full object-cover"
              />
              <span className="font-editorial-tag font-bold text-xs text-white select-none">TM</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight">Techmov</span>
                <span className="font-editorial-tag text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-600/10 text-blue-600">.in</span>
              </div>
              <p className={`text-[11px] font-medium ${mutedText} -mt-0.5 hidden sm:block`}>
                Live the life of Automation
              </p>
            </div>
          </button>

          {/* Pill Navigation Bar — Clear Pages */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden xl:flex items-center gap-1 p-1 rounded-full border ${
              darkMode ? 'bg-[#12141D] border-[#25293A]' : 'bg-slate-100/90 border-slate-200/80'
            }`}
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'bundles', label: 'Launch Bundles (.com + Hosting)' },
              { id: 'services', label: 'Services & Razorpay' },
              { id: 'blog', label: 'Engineering Blog (20)' },
              { id: 'sandbox', label: 'Workflow Simulator' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-white text-slate-950 shadow-xs'
                    : darkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Pill Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCursorMotionEnabled(!cursorMotionEnabled)}
              title="Toggle mouse cursor & scroll animations"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                cursorMotionEnabled
                  ? darkMode
                    ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                    : 'border-blue-200 bg-blue-50 text-blue-800'
                  : darkMode
                  ? 'border-[#25293A] bg-[#12141D] text-slate-400'
                  : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span>Cursor FX: {cursorMotionEnabled ? 'On' : 'Off'}</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle color theme"
              className={`p-2 rounded-full border transition-colors ${
                darkMode
                  ? 'border-[#25293A] bg-[#12141D] text-slate-200 hover:bg-white/10'
                  : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => openOrderWithConfig()}
              className={`btn-pill-primary inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-slate-900 text-white hover:bg-blue-600'
              }`}
            >
              <span>Order Software</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-full border ${borderSubtle}`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Nav Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className={`${
              darkMode ? 'bg-[#12141D] border-[#25293A]' : 'bg-white border-slate-200'
            } xl:hidden border-b px-4 py-3 space-y-2`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[
                { id: 'home', label: 'Home Overview' },
                { id: 'bundles', label: 'Launch Bundles (.com + Hosting)' },
                { id: 'services', label: 'Services & Razorpay (₹)' },
                { id: 'blog', label: 'Engineering Blog (20 Guides)' },
                { id: 'sandbox', label: 'Architecture Simulator' },
                { id: 'about', label: 'About axiomcompute' },
                { id: 'contact', label: 'Contact & Direct Order' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-bold ${
                    activeTab === item.id
                      ? darkMode
                        ? 'bg-white text-slate-950'
                        : 'bg-slate-900 text-white'
                      : darkMode
                      ? 'text-slate-200 hover:bg-white/5'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200/20 flex items-center justify-between">
              <span className={`text-xs font-semibold ${mutedText}`}>Mouse &amp; Scroll Motion FX</span>
              <button
                onClick={() => setCursorMotionEnabled(!cursorMotionEnabled)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold border ${
                  cursorMotionEnabled
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                {cursorMotionEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ==================================================================== */}
      {/* VIEW 1: HOME — FULL-WIDTH 3D HERO + BUNDLES + SERVICES + BLOGS       */}
      {/* ==================================================================== */}
      {activeTab === 'home' && (
        <main id="main-content" className="relative z-10 flex-1">
          {/* FULL-BLEED HERO SECTION WITH 3D INTERACTIVE TOPOLOGY MESH BEHIND FOREGROUND TEXT */}
          <section
            ref={heroSectionRef}
            className={`relative w-full min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden border-b ${borderSubtle}`}
          >
            {/* FULL-WIDTH ZOOMED 3D TOPOLOGY CANVAS BACKGROUND */}
            <div id="lineGrad" className="absolute inset-0 w-full h-full z-0">
              <canvas
                ref={heroCanvasRef}
                className="w-full h-full block"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: darkMode
                    ? 'radial-gradient(circle at 32% 50%, rgba(9,10,15,0.92) 0%, rgba(9,10,15,0.68) 48%, rgba(9,10,15,0.25) 100%)'
                    : 'radial-gradient(circle at 32% 50%, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.76) 50%, rgba(248,250,252,0.25) 100%)'
                }}
              />
            </div>

            {/* FOREGROUND HERO CONTENT OVERLAY */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
              <div className="max-w-3xl space-y-6">
                <div
                  className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md ${
                    darkMode
                      ? 'bg-[#12141D]/90 border-blue-500/30 text-blue-300 shadow-sm'
                      : 'bg-white/95 border-slate-300 text-slate-900 shadow-sm'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="font-editorial-tag text-xs sm:text-[13px] font-bold uppercase tracking-wider">
                    Software Consultancy &amp; n8n Systems Architecture
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.06]">
                  Custom software and{' '}
                  <span className="font-serif-accent italic font-normal text-blue-600 pr-1">
                    automation systems
                  </span>{' '}
                  built for production.
                </h1>

                <p
                  className={`text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl ${
                    darkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  Led by systems architect{' '}
                  <strong className="font-extrabold underline decoration-blue-600/50 underline-offset-4">
                    axiomcompute
                  </strong>
                  , Techmov engineers full-stack web applications, compliant Meta WhatsApp Cloud API pipelines, PostgreSQL-backed AI agents, and turnkey launch bundles with a free <code className="font-mono font-bold">.com</code> domain and cloud hosting.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <button
                    onClick={() => navigateToPage('bundles')}
                    className={`btn-pill-primary inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-sm sm:text-base ${
                      darkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-slate-900 text-white hover:bg-blue-600'
                    }`}
                  >
                    <span>Explore Launch Bundles (.com + Hosting)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={triggerTestPayload}
                    className={`btn-pill-secondary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-sm sm:text-base border backdrop-blur-md ${
                      darkMode
                        ? 'border-slate-700 bg-[#12141D]/90 text-white hover:border-blue-400'
                        : 'border-slate-300 bg-white/95 text-slate-900 hover:border-slate-900'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-blue-600" />
                    <span>Fire Live Packet Animation</span>
                  </button>
                </div>

                {/* Interactive Floating Telemetry Pill Bar */}
                <div
                  className={`mt-8 p-4 sm:p-5 rounded-2xl border backdrop-blur-md transition-all ${
                    darkMode
                      ? 'bg-[#12141D]/90 border-[#25293A]'
                      : 'bg-white/95 border-slate-200/95 shadow-lg shadow-slate-900/5'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="font-editorial-tag text-xs font-bold uppercase tracking-wider text-blue-600">
                        Live Background Mesh Telemetry
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsSimulating(!isSimulating)}
                        className={`px-3 py-1 rounded-full text-xs font-editorial-tag font-bold border ${
                          darkMode
                            ? 'border-slate-700 bg-white/5 text-slate-200'
                            : 'border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        {isSimulating ? '⏸ Pause Mesh' : '▶ Resume Mesh'}
                      </button>
                      <button
                        onClick={triggerTestPayload}
                        className="px-3.5 py-1 rounded-full text-xs font-editorial-tag font-bold bg-blue-600 text-white hover:bg-blue-500"
                      >
                        ⚡ Burst Packet
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {WORKFLOW_BLUEPRINTS.map((bp, idx) => (
                        <button
                          key={bp.id}
                          onClick={() => {
                            setSelectedBlueprintIdx(idx);
                            setActiveNodeIdx(0);
                          }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                            selectedBlueprintIdx === idx
                              ? darkMode
                                ? 'bg-white text-slate-950 shadow-xs'
                                : 'bg-slate-900 text-white shadow-xs'
                              : darkMode
                              ? 'bg-white/5 text-slate-300 hover:text-white'
                              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                          }`}
                        >
                          {bp.name}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs font-editorial-tag font-bold">
                      Active Node:{' '}
                      <span className="text-blue-600">
                        {currentBlueprint.nodes[activeNodeIdx]?.label} ({currentBlueprint.nodes[activeNodeIdx]?.latency})
                      </span>{' '}
                      • <span className="font-extrabold">{executionCount.toLocaleString('en-IN')}</span> Traces
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW: ALL-IN-ONE LAUNCH BUNDLE TILES (SERVICES + FREE .COM DOMAIN + 3–12 MO HOSTING + RAZORPAY) */}
          <section className={`py-16 border-b ${borderSubtle}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div className="max-w-2xl">
                  <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                    All-in-One Turnkey Launch Bundles • Free Domain &amp; Hosting Included
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold mt-1.5 tracking-tight">
                    Combined Software + Automation + Free <span className="text-blue-600">.com</span> Domain &amp; Cloud Hosting
                  </h2>
                  <p className={`mt-2 text-sm sm:text-base font-medium ${mutedText}`}>
                    Zero server headaches. Pick a complete bundle below—we register your <code className="font-mono font-bold">.com</code> or <code className="font-mono font-bold">.in</code> domain, provision your cloud/VPS hosting, engineer your web app &amp; n8n workflows, and hand over the keys.
                  </p>
                </div>
                <button
                  onClick={() => navigateToPage('bundles')}
                  className="btn-pill-secondary px-5 py-2.5 rounded-full text-xs font-bold border border-slate-300 dark:border-slate-700 inline-flex items-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span>Compare All Launch Tiers</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
                {COMBO_BUNDLES.map(bundle => {
                  const rzpUrl = razorpayConfig.bundles?.[bundle.id] || razorpayConfig.masterCheckoutUrl;
                  return (
                    <div
                      key={bundle.id}
                      className={`${cardSurface} card-editorial rounded-3xl border p-7 flex flex-col justify-between relative overflow-hidden ${
                        bundle.popular ? 'ring-2 ring-blue-600' : ''
                      }`}
                    >
                      {bundle.popular && (
                        <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600" />
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span
                            className={`font-editorial-tag text-[11px] font-bold uppercase px-3 py-1 rounded-full border ${
                              bundle.popular
                                ? 'bg-blue-600 text-white border-blue-600'
                                : darkMode
                                ? 'bg-white/5 border-white/15 text-slate-300'
                                : 'bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            {bundle.tier}
                          </span>
                          <span className="font-editorial-tag text-xs font-bold text-blue-600">
                            {bundle.delivery}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
                          {bundle.title}
                        </h3>
                        <p className={`text-xs sm:text-sm font-medium mt-1.5 ${mutedText}`}>
                          {bundle.tagline}
                        </p>

                        {/* Price Callout */}
                        <div className="mt-5 flex items-baseline gap-2.5">
                          <span className="text-3xl sm:text-4xl font-extrabold font-editorial-tag text-blue-600">
                            {bundle.priceDisplay}
                          </span>
                          <span className={`text-sm font-editorial-tag line-through ${mutedText}`}>
                            {bundle.originalPrice}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            All-Inclusive
                          </span>
                        </div>

                        {/* Highlighted Free Domain + Hosting Perks Box */}
                        <div
                          className={`mt-5 p-3.5 rounded-2xl border space-y-1.5 text-xs font-bold ${
                            darkMode
                              ? 'bg-blue-950/25 border-blue-500/30 text-blue-200'
                              : 'bg-blue-50/90 border-blue-200 text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{bundle.domainPerk}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{bundle.hostingPerk}</span>
                          </div>
                        </div>

                        {/* Included Services Checklist */}
                        <ul className={`mt-5 space-y-2.5 border-t ${borderSubtle} pt-4`}>
                          {bundle.includes.map((inc, i) => (
                            <li key={i} className="text-xs sm:text-[13px] font-semibold flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <span className={subText}>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Dual Action Footer: Razorpay Instant Pay + Custom Order Brief */}
                      <div className={`mt-7 pt-4 border-t ${borderSubtle} space-y-2.5`}>
                        <button
                          onClick={() =>
                            openRazorpayCheckout(bundle.title, bundle.priceDisplay, bundle.tier, rzpUrl)
                          }
                          className="btn-pill-razorpay w-full py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Pay {bundle.priceDisplay} via Razorpay</span>
                        </button>

                        <button
                          onClick={() =>
                            openOrderWithConfig(
                              bundle.title,
                              bundle.priceDisplay,
                              bundle.delivery,
                              `Bundle includes: ${bundle.domainPerk} + ${bundle.hostingPerk}`,
                              rzpUrl
                            )
                          }
                          className={`btn-pill-secondary w-full py-2.5 px-4 rounded-full font-bold text-xs border ${
                            darkMode
                              ? 'border-[#25293A] bg-[#171A26] text-slate-200 hover:border-slate-500'
                              : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          Customize Bundle &amp; Domain Name →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* AGENCY SERVICE PACKAGES WITH DIRECT RAZORPAY OPTION */}
          <section className={`py-16 border-b ${borderSubtle}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                    Individual Engineering Packages • Instant Razorpay Booking
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                    Software &amp; Automation Services
                  </h2>
                </div>
                <button
                  onClick={() => navigateToPage('services')}
                  className="btn-pill-secondary px-5 py-2.5 rounded-full text-xs font-bold border border-slate-300 dark:border-slate-700 inline-flex items-center gap-1.5"
                >
                  <span>View Full Service Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {AGENCY_SERVICES.map(srv => {
                  const IconComponent = srv.icon;
                  const rzpUrl = razorpayConfig.services?.[srv.id] || razorpayConfig.masterCheckoutUrl;
                  return (
                    <div
                      key={srv.id}
                      className={`${cardSurface} card-editorial rounded-3xl border p-7 flex flex-col justify-between relative overflow-hidden`}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-blue-500 dark:via-blue-400 dark:to-slate-800" />

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-5 pt-1">
                          <div
                            className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                              darkMode
                                ? 'bg-[#171A26] border-[#25293A] text-blue-400'
                                : 'bg-blue-50 border-blue-200/80 text-blue-700'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span
                            className={`font-editorial-tag text-[11px] font-bold px-3 py-1 rounded-full border ${
                              darkMode
                                ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                                : 'bg-slate-900 text-white border-slate-900'
                            }`}
                          >
                            {srv.badge}
                          </span>
                        </div>

                        <div className="font-editorial-tag text-xs uppercase tracking-wider text-blue-600 font-bold">
                          {srv.category} • {srv.delivery}
                        </div>
                        <h3 className="text-xl font-extrabold mt-1.5 leading-snug">{srv.title}</h3>
                        <p className={`text-sm font-medium mt-2.5 leading-relaxed ${mutedText}`}>
                          {srv.summary}
                        </p>

                        <ul className={`mt-5 space-y-2.5 border-t ${borderSubtle} pt-4`}>
                          {srv.deliverables.map((d, i) => (
                            <li key={i} className="text-xs sm:text-[13px] font-semibold flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <span className={subText}>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`mt-7 pt-4 border-t ${borderSubtle} space-y-3`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-bold uppercase font-editorial-tag ${mutedText}`}>
                            Sprint Estimate
                          </span>
                          <span className="font-extrabold text-base font-editorial-tag text-blue-600">
                            {srv.priceRange}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() =>
                              openRazorpayCheckout(
                                srv.title,
                                `₹${srv.basePrice.toLocaleString('en-IN')}`,
                                srv.category,
                                rzpUrl
                              )
                            }
                            className="btn-pill-razorpay py-2.5 px-3 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center gap-1.5"
                          >
                            <CreditCard className="w-3.5 h-3.5 shrink-0" />
                            <span>Pay via Razorpay</span>
                          </button>

                          <button
                            onClick={() =>
                              openOrderWithConfig(srv.title, srv.priceRange, srv.delivery, srv.summary, rzpUrl)
                            }
                            className={`btn-pill-secondary py-2.5 px-3 rounded-full text-xs font-bold border ${
                              darkMode
                                ? 'border-[#25293A] bg-[#171A26] text-white'
                                : 'border-slate-300 bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            Order Brief →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* INTERACTIVE CLIENT ORDER & SOFTWARE SCOPE CONFIGURATOR (INR ₹ + RAZORPAY) */}
          <section id="calculator" className={`py-16 border-b ${borderSubtle}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-10">
                <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                  Transparent Project Estimator • INR (₹)
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold mt-1.5 tracking-tight">
                  Configure Your Custom Software or Automation Scope
                </h2>
                <p className={`mt-2 text-sm sm:text-base font-medium ${mutedText}`}>
                  Select your core deliverable, attach database or WhatsApp Cloud API modules, and pay instantly via Razorpay or submit your project brief.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className={`${cardSurface} lg:col-span-7 rounded-3xl border p-6 sm:p-8 space-y-7`}>
                  <div>
                    <label className="block font-editorial-tag text-xs uppercase tracking-wider text-blue-600 font-bold mb-3">
                      1. Core Architecture Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        { id: 'webapp', title: 'Custom Web App / SaaS MVP', desc: 'React + Backend API + Database', price: '₹45,000 base' },
                        { id: 'n8n', title: 'n8n Automation Architecture', desc: 'Sub-workflows + Webhooks + CRM', price: '₹15,000 base' },
                        { id: 'ai_agent', title: 'AI Agent + Postgres Memory', desc: 'OpenAI/Claude + Persistent State', price: '₹25,000 base' },
                        { id: 'whatsapp_crm', title: 'WhatsApp Cloud API CRM', desc: 'Zero-ban 24h window + Templates', price: '₹18,000 base' }
                      ].map(opt => {
                        const selected = orderProjectType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setOrderProjectType(opt.id)}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                              selected
                                ? darkMode
                                  ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                                  : 'bg-blue-50/80 border-blue-600 text-slate-950 ring-2 ring-blue-600/20'
                                : darkMode
                                ? 'bg-[#171A26] border-[#25293A] text-slate-200 hover:border-slate-500'
                                : 'bg-slate-50 border-slate-200/90 text-slate-900 hover:border-slate-400'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-sm">{opt.title}</span>
                              <span className="font-editorial-tag text-xs font-bold text-blue-600 shrink-0">
                                {opt.price}
                              </span>
                            </div>
                            <p className={`text-xs font-medium mt-1 ${mutedText}`}>{opt.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block font-editorial-tag text-xs uppercase tracking-wider text-blue-600 font-bold mb-3">
                      2. Production Modules &amp; Integrations
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'postgres', label: 'Neon PostgreSQL + Dead Letter Queue (+₹6,000)' },
                        { id: 'whatsapp', label: 'Official WhatsApp Cloud API Node (+₹8,000)' },
                        { id: 'telegram', label: 'Telegram AI Lead Scorer Alert Bot (+₹5,000)' },
                        { id: 'vps', label: 'Self-Hosted Docker VPS + Auto SSL (+₹7,000)' },
                        { id: 'security', label: 'DevTools Security & SQLi Hardening (+₹8,500)' }
                      ].map(addon => {
                        const active = selectedAddons.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => toggleAddon(addon.id)}
                            className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                              active
                                ? darkMode
                                  ? 'bg-blue-600/20 border-blue-500 text-white'
                                  : 'bg-blue-50 border-blue-600 text-slate-950'
                                : darkMode
                                ? 'bg-[#171A26] border-[#25293A] text-slate-200'
                                : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                                active
                                  ? 'bg-blue-600 text-white'
                                  : 'border border-slate-400'
                              }`}
                            >
                              {active && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{addon.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block font-editorial-tag text-xs uppercase tracking-wider text-blue-600 font-bold mb-3">
                      3. Sprint Delivery Pace
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'standard', label: 'Standard Sprint', mult: '1.0x Base Rate' },
                        { id: 'priority', label: 'Priority (-25% Time)', mult: '1.2x Rate' },
                        { id: 'express', label: 'Express (-45% Time)', mult: '1.4x Rate' }
                      ].map(tier => {
                        const active = urgencyLevel === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setUrgencyLevel(tier.id)}
                            className={`p-3.5 rounded-full border text-center transition-all ${
                              active
                                ? darkMode
                                  ? 'bg-white text-slate-950 border-white font-extrabold shadow-xs'
                                  : 'bg-slate-900 text-white border-slate-900 font-extrabold shadow-xs'
                                : darkMode
                                ? 'bg-[#171A26] border-[#25293A] text-slate-200 font-semibold'
                                : 'bg-slate-50 border-slate-200 text-slate-800 font-semibold hover:border-slate-300'
                            }`}
                          >
                            <div className="text-xs">{tier.label}</div>
                            <div className="text-[10px] opacity-80 mt-0.5">{tier.mult}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: Quote Summary + Razorpay Checkout */}
                <div className={`${cardSurface} lg:col-span-5 rounded-3xl border p-6 sm:p-8 space-y-6`}>
                  <div className={`flex items-center justify-between border-b ${borderSubtle} pb-4`}>
                    <div>
                      <span className="font-editorial-tag text-xs uppercase text-blue-600 font-bold">
                        Architecture Estimate
                      </span>
                      <h3 className="text-xl font-extrabold mt-0.5">{scopeEstimate.projectLabel}</h3>
                    </div>
                    <Sliders className="w-5 h-5 text-blue-600 shrink-0" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-2xl border ${
                        darkMode ? 'bg-[#171A26] border-[#25293A]' : 'bg-slate-50 border-slate-200/90'
                      }`}
                    >
                      <div className={`text-xs font-bold ${mutedText}`}>Estimated Investment</div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-editorial-tag mt-1 text-blue-600">
                        ₹{scopeEstimate.totalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border ${
                        darkMode ? 'bg-[#171A26] border-[#25293A]' : 'bg-slate-50 border-slate-200/90'
                      }`}
                    >
                      <div className={`text-xs font-bold ${mutedText}`}>Delivery Window</div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-editorial-tag mt-1">
                        ~{scopeEstimate.estimatedDays} Days
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={`font-editorial-tag text-xs uppercase font-bold ${mutedText} mb-2.5`}>
                      Selected Stack &amp; Modules:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scopeEstimate.stack.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            darkMode
                              ? 'bg-[#171A26] border-[#25293A] text-slate-200'
                              : 'bg-slate-100 border-slate-200 text-slate-900'
                          }`}
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() =>
                        openRazorpayCheckout(
                          scopeEstimate.projectLabel,
                          `₹${scopeEstimate.totalPrice.toLocaleString('en-IN')}`,
                          'Custom Configured Build',
                          razorpayConfig.masterCheckoutUrl
                        )
                      }
                      className="btn-pill-razorpay w-full py-4 px-6 rounded-full font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₹{scopeEstimate.totalPrice.toLocaleString('en-IN')} via Razorpay</span>
                    </button>

                    <button
                      onClick={() => openOrderWithConfig()}
                      className={`btn-pill-secondary w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm border flex items-center justify-center gap-2 ${
                        darkMode
                          ? 'border-[#25293A] bg-[#171A26] text-white'
                          : 'border-slate-300 bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>Proceed with This Configuration</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LATEST REAL ARTICLES WITH FEATURED IMAGES / ARCHITECTURAL THUMBNAIL BANNERS */}
          <section className={`py-16 border-b ${borderSubtle}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                    Engineering Documentation • Synced from WordPress
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                    Latest Production Guides from Techmov.in
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">

                  <button
                    onClick={() => navigateToPage('blog')}
                    className={`btn-pill-secondary px-5 py-2.5 rounded-full text-xs font-bold border ${
                      darkMode
                        ? 'border-[#25293A] bg-[#12141D] text-white'
                        : 'border-slate-300 bg-white text-slate-900'
                    }`}
                  >
                    Browse All 20 Articles →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {blogPosts.slice(0, 6).map(post => (
                  <article
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    className={`${cardSurface} card-editorial cursor-pointer rounded-3xl border overflow-hidden flex flex-col justify-between group`}
                  >
                    <div>
                      {/* Featured Image or Architectural Blueprint Banner */}
                      {renderPostFeaturedMedia(post, 'h-44')}

                      <div className="p-6 sm:p-7 pb-0">
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="font-editorial-tag text-[11px] font-bold uppercase tracking-wider text-blue-600">
                            {post.editorialDesk || 'SYSTEMS DESK'} • {post.author}
                          </span>
                          <time
                            dateTime={post.isoDate}
                            className={`font-editorial-tag text-xs font-bold ${mutedText}`}
                          >
                            {post.date}
                          </time>
                        </div>

                        <h3 className="font-extrabold text-lg sm:text-[19px] leading-snug group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>

                        <p className={`text-xs sm:text-sm font-medium mt-2.5 line-clamp-3 leading-relaxed ${mutedText}`}>
                          {post.excerpt}
                        </p>

                        <div
                          className={`mt-4 p-3.5 rounded-2xl border text-xs leading-relaxed ${
                            darkMode
                              ? 'bg-[#171A26] border-[#25293A] text-slate-200'
                              : 'bg-slate-50 border-slate-200/90 text-slate-800'
                          }`}
                        >
                          <strong className="font-editorial-tag uppercase text-[10px] tracking-wider text-blue-600 block mb-0.5">
                            Key Pattern:
                          </strong>
                          <span className="font-semibold line-clamp-2">{post.keyTakeaway}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`px-6 sm:px-7 py-4 mt-5 border-t ${borderSubtle} flex items-center justify-between text-xs font-bold`}>
                      <span className={subText}>{post.readTime}</span>
                      <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-colors">
                        <span>Read Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SEO FAQ SECTION */}
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                  Technical &amp; Billing FAQ
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Common Engineering, Bundle &amp; Razorpay Questions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SEO_FAQS.map((faq, idx) => (
                  <div key={idx} className={`${cardSurface} rounded-3xl border p-6`}>
                    <h3 className="font-extrabold text-sm sm:text-base flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 shrink-0 mt-1 text-blue-600" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className={`text-xs sm:text-sm font-medium mt-2.5 leading-relaxed ${mutedText}`}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 2: ALL-IN-ONE LAUNCH BUNDLES PAGE (.COM + HOSTING + RAZORPAY)   */}
      {/* ==================================================================== */}
      {activeTab === 'bundles' && (
        <main id="main-content" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <div className={`flex flex-wrap items-center justify-between gap-4 border-b ${borderSubtle} pb-8`}>
            <div className="max-w-2xl">
              <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                Turnkey Launch Packages • Domain + Cloud Hosting + Code
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
                All-in-One Software &amp; Automation Bundles
              </h1>
              <p className={`mt-2 text-sm sm:text-base font-medium ${mutedText}`}>
                Every bundle combines custom software engineering, production n8n automation, a free <code className="font-mono font-bold">.com</code> or <code className="font-mono font-bold">.in</code> domain registration, and managed cloud/VPS hosting—ready for 1-click Razorpay checkout.
              </p>
            </div>
            <button
              onClick={() => openOrderWithConfig('Custom Enterprise Bundle + Dedicated VPS', '₹85,000+', '3–4 Weeks', 'Custom SaaS + n8n + Dedicated VPS + .com Domain')}
              className="btn-pill-secondary px-5 py-3 rounded-full text-xs font-bold border border-blue-600/40 text-blue-600 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Custom Enterprise Bundle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {COMBO_BUNDLES.map(bundle => {
              const rzpUrl = razorpayConfig.bundles?.[bundle.id] || razorpayConfig.masterCheckoutUrl;
              return (
                <div
                  key={bundle.id}
                  className={`${cardSurface} card-editorial rounded-3xl border p-7 flex flex-col justify-between relative overflow-hidden ${
                    bundle.popular ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  {bundle.popular && <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600" />}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`font-editorial-tag text-[11px] font-bold uppercase px-3 py-1 rounded-full border ${
                          bundle.popular
                            ? 'bg-blue-600 text-white border-blue-600'
                            : darkMode
                            ? 'bg-white/5 border-white/15 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        {bundle.tier}
                      </span>
                      <span className="font-editorial-tag text-xs font-bold text-blue-600">
                        {bundle.delivery}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">{bundle.title}</h2>
                    <p className={`text-xs sm:text-sm font-medium mt-1.5 ${mutedText}`}>{bundle.tagline}</p>

                    <div className="mt-5 flex items-baseline gap-2.5">
                      <span className="text-3xl sm:text-4xl font-extrabold font-editorial-tag text-blue-600">
                        {bundle.priceDisplay}
                      </span>
                      <span className={`text-sm font-editorial-tag line-through ${mutedText}`}>
                        {bundle.originalPrice}
                      </span>
                    </div>

                    <div
                      className={`mt-5 p-4 rounded-2xl border space-y-2 text-xs font-bold ${
                        darkMode
                          ? 'bg-blue-950/25 border-blue-500/30 text-blue-200'
                          : 'bg-blue-50/90 border-blue-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{bundle.domainPerk}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{bundle.hostingPerk}</span>
                      </div>
                    </div>

                    <ul className={`mt-5 space-y-2.5 border-t ${borderSubtle} pt-4`}>
                      {bundle.includes.map((inc, i) => (
                        <li key={i} className="text-xs sm:text-[13px] font-semibold flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span className={subText}>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`mt-7 pt-4 border-t ${borderSubtle} space-y-2.5`}>
                    <button
                      onClick={() =>
                        openRazorpayCheckout(bundle.title, bundle.priceDisplay, bundle.tier, rzpUrl)
                      }
                      className="btn-pill-razorpay w-full py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay {bundle.priceDisplay} via Razorpay</span>
                    </button>

                    <button
                      onClick={() =>
                        openOrderWithConfig(
                          bundle.title,
                          bundle.priceDisplay,
                          bundle.delivery,
                          `Bundle includes: ${bundle.domainPerk} + ${bundle.hostingPerk}`,
                          rzpUrl
                        )
                      }
                      className={`btn-pill-secondary w-full py-2.5 px-4 rounded-full font-bold text-xs border ${
                        darkMode
                          ? 'border-[#25293A] bg-[#171A26] text-slate-200'
                          : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      Specify Preferred .com Domain &amp; Order →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 3: SERVICES & CLIENT ORDER PORTAL (INR ₹ + RAZORPAY)            */}
      {/* ==================================================================== */}
      {activeTab === 'services' && (
        <main id="main-content" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className={`flex flex-wrap items-center justify-between gap-4 border-b ${borderSubtle} pb-8`}>
            <div>
              <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                Client Order Portal • Techmov.in
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
                Software Engineering &amp; Automation Services
              </h1>
              <p className={`mt-2 max-w-2xl text-sm sm:text-base font-medium ${mutedText}`}>
                Book any turnkey package immediately via Razorpay or submit a custom project specification. All packages include full GitHub repository ownership.
              </p>
            </div>
            <button
              onClick={() => openOrderWithConfig('Custom Software / Automation Build', '₹45,000+', '2–3 Weeks', '')}
              className={`btn-pill-primary w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'
              }`}
            >
              + Submit Custom Project Brief
            </button>
          </div>

          {submittedOrders.length > 0 && (
            <div className={`${cardSurface} rounded-3xl border p-6 space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Submitted Client Orders ({submittedOrders.length})</span>
                </h2>
                <span className="font-editorial-tag text-xs font-bold text-blue-600">
                  Queued for Architecture Review
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {submittedOrders.map(ord => (
                  <div
                    key={ord.orderId}
                    className={`p-4 rounded-2xl border space-y-2 text-xs ${
                      darkMode ? 'bg-[#171A26] border-[#25293A]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-editorial-tag font-bold text-blue-600">{ord.orderId}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600/10 text-blue-600 font-bold">
                        {ord.status}
                      </span>
                    </div>
                    <div className="font-extrabold text-sm">{ord.serviceTitle}</div>
                    <div className={`font-medium ${mutedText}`}>
                      Client: {ord.name} ({ord.email}) • Budget: {ord.budget}
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() =>
                          openRazorpayCheckout(ord.serviceTitle, ord.budget, `Order ${ord.orderId}`, ord.paymentLink)
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 text-white font-bold text-[11px]"
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>Complete Payment via Razorpay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {AGENCY_SERVICES.map(srv => {
              const IconComponent = srv.icon;
              const rzpUrl = razorpayConfig.services?.[srv.id] || razorpayConfig.masterCheckoutUrl;
              return (
                <div
                  key={srv.id}
                  className={`${cardSurface} card-editorial rounded-3xl border p-7 flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-blue-500 dark:via-blue-400 dark:to-slate-800" />
                  <div>
                    <div className="flex items-center justify-between mb-4 pt-1">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                          darkMode
                            ? 'bg-[#171A26] border-[#25293A] text-blue-400'
                            : 'bg-blue-50 border-blue-200 text-blue-700'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-editorial-tag text-xs font-bold text-blue-600">{srv.delivery}</span>
                    </div>
                    <h2 className="text-xl font-extrabold">{srv.title}</h2>
                    <p className={`text-sm font-medium mt-2 leading-relaxed ${mutedText}`}>{srv.summary}</p>
                    <ul className={`mt-5 space-y-2.5 border-t ${borderSubtle} pt-4`}>
                      {srv.deliverables.map((item, i) => (
                        <li key={i} className="text-xs sm:text-[13px] font-semibold flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span className={subText}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`mt-6 pt-4 border-t ${borderSubtle} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold uppercase font-editorial-tag ${mutedText}`}>
                        Package Estimate
                      </span>
                      <span className="font-editorial-tag font-extrabold text-base text-blue-600">
                        {srv.priceRange}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() =>
                          openRazorpayCheckout(
                            srv.title,
                            `₹${srv.basePrice.toLocaleString('en-IN')}`,
                            srv.category,
                            rzpUrl
                          )
                        }
                        className="btn-pill-razorpay py-2.5 px-3 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5 shrink-0" />
                        <span>Razorpay</span>
                      </button>
                      <button
                        onClick={() =>
                          openOrderWithConfig(srv.title, srv.priceRange, srv.delivery, srv.summary, rzpUrl)
                        }
                        className={`btn-pill-primary py-2.5 px-3 rounded-full text-xs font-bold ${
                          darkMode ? 'bg-white text-slate-950' : 'bg-slate-900 text-white hover:bg-blue-600'
                        }`}
                      >
                        Configure Order
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 4: ARCHITECTURE SIMULATOR SANDBOX                               */}
      {/* ==================================================================== */}
      {activeTab === 'sandbox' && (
        <main id="main-content" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                Pipeline Execution Inspector
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Production n8n &amp; Backend Architecture Blueprints
              </h1>
              <p className={`text-sm font-medium mt-1 ${mutedText}`}>
                Select any blueprint or step node below to inspect how payloads move through our client deployments.
              </p>
            </div>
            <button
              onClick={triggerTestPayload}
              className={`btn-pill-primary px-6 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Webhook Burst</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKFLOW_BLUEPRINTS.map((bp, i) => (
              <div
                key={bp.id}
                onClick={() => {
                  setSelectedBlueprintIdx(i);
                  setActiveNodeIdx(0);
                }}
                className={`${cardSurface} card-editorial cursor-pointer rounded-3xl border p-6 transition-all ${
                  selectedBlueprintIdx === i ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                <div className="flex items-center justify-between font-editorial-tag text-xs font-bold text-blue-600 mb-2">
                  <span>BLUEPRINT 0{i + 1}</span>
                  <span>5 NODES</span>
                </div>
                <h2 className="font-extrabold text-lg">{bp.name}</h2>
                <p className={`text-xs sm:text-sm font-medium mt-2 leading-relaxed ${mutedText}`}>{bp.description}</p>
              </div>
            ))}
          </div>

          <div className={`${cardSurface} rounded-3xl border p-6 sm:p-8 space-y-6`}>
            <h2 className="text-base sm:text-xl font-extrabold">
              Step-by-Step Node Trace: <span className="text-blue-600">{currentBlueprint.name}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {currentBlueprint.nodes.map((n, idx) => {
                const IconComponent = n.icon;
                const active = idx === activeNodeIdx;
                return (
                  <div
                    key={n.id}
                    onClick={() => setActiveNodeIdx(idx)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      active
                        ? darkMode
                          ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500'
                          : 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/20'
                        : darkMode
                        ? 'bg-[#171A26] border-[#25293A]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-editorial-tag text-xs font-bold text-blue-600">STEP 0{idx + 1}</span>
                      <span className={`font-editorial-tag text-xs font-bold ${mutedText}`}>{n.latency}</span>
                    </div>
                    <div className="flex items-center gap-2 font-extrabold text-sm">
                      <IconComponent className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{n.label}</span>
                    </div>
                    <p className={`text-xs font-semibold ${mutedText} mt-1`}>{n.sub}</p>
                    <div
                      className={`mt-3 p-2.5 rounded-xl font-mono text-[11px] font-medium break-words border ${
                        darkMode
                          ? 'bg-black/40 border-[#25293A] text-slate-200'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {n.log}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 5: ALL 20 REAL TECHMOV.IN BLOG POSTS + FEATURED BANNERS         */}
      {/* ==================================================================== */}
      {activeTab === 'blog' && (
        <main id="main-content" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b ${borderSubtle} pb-6`}>
            <div>
              <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                Complete Archive • All 20 Posts from techmov.in
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
                n8n Workflows &amp; Systems Engineering Notes
              </h1>
              <p className={`text-sm sm:text-base font-medium mt-1 ${mutedText}`}>
                Written by <strong>axiomcompute</strong> — practical architecture patterns, PostgreSQL memory setups, and compliant WhatsApp automations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  aria-label="Search blog articles"
                  value={blogSearch}
                  onChange={e => setBlogSearch(e.target.value)}
                  placeholder="Search 20 guides (Postgres, WhatsApp)..."
                  className={`w-full pl-9 pr-4 py-2.5 rounded-full text-xs font-semibold border focus:outline-none focus:border-blue-600 ${
                    darkMode
                      ? 'bg-[#12141D] border-[#25293A] text-white placeholder-slate-400'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                />
              </div>

              <div className="flex items-center gap-1.5">
                {['All', 'N8N Workflows', 'Blog'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setBlogCategory(cat)}
                    className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-full text-xs font-bold transition-colors ${
                      blogCategory === cat
                        ? darkMode
                          ? 'bg-white text-slate-950'
                          : 'bg-slate-900 text-white'
                        : darkMode
                        ? 'bg-[#12141D] text-slate-200 border border-[#25293A]'
                        : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => setActivePost(post)}
                className={`${cardSurface} card-editorial cursor-pointer rounded-3xl border overflow-hidden flex flex-col justify-between group`}
              >
                <div>
                  {renderPostFeaturedMedia(post, 'h-44')}
                  <div className="p-6 sm:p-7 pb-0">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-editorial-tag text-xs font-bold text-blue-600">
                        By {post.author}
                      </span>
                      <time dateTime={post.isoDate} className={`font-editorial-tag text-xs font-bold ${mutedText}`}>
                        {post.date}
                      </time>
                    </div>

                    <h2 className="text-lg sm:text-[19px] font-extrabold leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className={`text-xs sm:text-sm font-medium mt-2.5 leading-relaxed ${mutedText}`}>
                      {post.excerpt}
                    </p>

                    <div
                      className={`mt-4 p-3.5 rounded-2xl border text-xs leading-relaxed ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-slate-200'
                          : 'bg-slate-50 border-slate-200/90 text-slate-800'
                      }`}
                    >
                      <strong className="font-editorial-tag uppercase text-[10px] tracking-wider text-blue-600 block mb-0.5">
                        Key Pattern:
                      </strong>
                      <span className="font-semibold line-clamp-2">{post.keyTakeaway}</span>
                    </div>
                  </div>
                </div>

                <div className={`px-6 sm:px-7 py-4 mt-5 border-t ${borderSubtle}`}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(post.tags || []).map((t, idx) => (
                      <span
                        key={idx}
                        className={`font-editorial-tag text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          darkMode
                            ? 'bg-[#171A26] border-[#25293A] text-slate-200'
                            : 'bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={subText}>{post.readTime}</span>
                    <span className="text-blue-600 group-hover:underline">Read + Code →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 6B: TECHNICAL SEO, JSON-LD SCHEMA & MULTI-SCREEN RESPONSIVE HUB */}
      {/* ==================================================================== */}
      {activeTab === 'seo' && (
        <main id="main-content" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div id="seo" className={`border-b ${borderSubtle} pb-6`}>
            <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
              Search Engine &amp; Viewport Architecture
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
              Technical SEO &amp; Responsive Breakpoint Verification
            </h1>
            <p className={`text-sm sm:text-base font-medium mt-2 max-w-3xl ${mutedText}`}>
              Built with semantic HTML5 landmarks, dynamic OpenGraph &amp; canonical tags, injected Schema.org JSON-LD (`ProfessionalService` in INR, `OfferCatalog`, `Blog`, `FAQPage`), and fluid multi-device breakpoints from 320px mobile to 4K screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${cardSurface} p-6 rounded-3xl border`}>
              <div className="flex items-center gap-2.5 font-extrabold text-sm mb-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span>Mobile Viewports (320px – 639px)</span>
              </div>
              <p className={`text-xs sm:text-sm font-medium ${mutedText} leading-relaxed`}>
                Touch-friendly 44px+ pill buttons, collapsible navigation drawer, adaptive single-column grids, and zero horizontal scroll.
              </p>
            </div>
            <div className={`${cardSurface} p-6 rounded-3xl border`}>
              <div className="flex items-center gap-2.5 font-extrabold text-sm mb-2">
                <Tablet className="w-5 h-5 text-blue-600" />
                <span>Tablet &amp; Foldables (640px – 1023px)</span>
              </div>
              <p className={`text-xs sm:text-sm font-medium ${mutedText} leading-relaxed`}>
                Adaptive 2-column service &amp; blog grids, responsive full-bleed 3D canvas resizing, and balanced typographic scale.
              </p>
            </div>
            <div className={`${cardSurface} p-6 rounded-3xl border`}>
              <div className="flex items-center gap-2.5 font-extrabold text-sm mb-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                <span>Desktop &amp; 4K (1024px – 2560px+)</span>
              </div>
              <p className={`text-xs sm:text-sm font-medium ${mutedText} leading-relaxed`}>
                Full-bleed interactive 3D topology backdrop behind hero text, custom cursor spring ring (with On/Off toggle), and 3-column matrices.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${cardSurface} p-6 rounded-3xl border space-y-4`}>
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-base flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-blue-600" />
                  <span>Active Head Meta &amp; Canonical URLs</span>
                </h2>
                <span className="font-editorial-tag text-xs text-blue-600 font-bold">LIVE DOM</span>
              </div>
              <div
                className={`p-4 rounded-2xl border font-mono text-xs space-y-2 overflow-x-auto ${
                  darkMode ? 'bg-black/40 border-[#25293A] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <div>&lt;title&gt;{currentSeoMeta.title}&lt;/title&gt;</div>
                <div>&lt;meta name="description" content="{currentSeoMeta.description}" /&gt;</div>
                <div>&lt;link rel="canonical" href="{currentSeoMeta.canonical}" /&gt;</div>
                <div>&lt;meta property="og:type" content="{currentSeoMeta.ogType}" /&gt;</div>
                <div>&lt;meta property="og:site_name" content="Techmov.in" /&gt;</div>
              </div>
            </div>

            <div className={`${cardSurface} p-6 rounded-3xl border space-y-4`}>
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-base flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  <span>Injected JSON-LD Schema.org Graph</span>
                </h2>
                <button
                  onClick={() => handleCopyCode(JSON.stringify(jsonLdSchema, null, 2))}
                  className="font-editorial-tag text-xs text-blue-600 hover:underline font-bold"
                >
                  {copiedCode ? 'Copied Schema!' : 'Copy JSON-LD'}
                </button>
              </div>
              <pre
                className={`p-4 rounded-2xl border font-mono text-[11px] max-h-56 overflow-y-auto ${
                  darkMode ? 'bg-black/40 border-[#25293A] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                {JSON.stringify(jsonLdSchema, null, 2)}
              </pre>
            </div>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 7: ABOUT AXIOMCOMPUTE & TECHMOV AGENCY                          */}
      {/* ==================================================================== */}
      {activeTab === 'about' && (
        <main id="main-content" className="relative z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className={`${cardSurface} rounded-3xl border p-6 sm:p-10`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-editorial-tag text-2xl font-extrabold shrink-0 ${
                  darkMode ? 'bg-white text-slate-950' : 'bg-slate-900 text-white'
                }`}
              >
                AC
              </div>
              <div>
                <span className="font-editorial-tag text-xs uppercase text-blue-600 font-bold">
                  Founder &amp; Lead Systems Architect • techmov.in
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Meet axiomcompute</h1>
                <blockquote className={`mt-3 text-sm sm:text-base font-medium italic border-l-4 border-blue-600 pl-4 ${subText}`}>
                  "I'm a developer who's into tech, automation, and figuring things out in my own way. I like thinking beyond the usual approach and building systems that actually work in real life. I pick things up fast, so I'm always experimenting with new tools and ideas. Lately, I've also started writing blogs to share what I'm learning and building along the way."
                </blockquote>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t ${borderSubtle}`}>
              <div>
                <h2 className="font-extrabold text-base">Production-Tested Architecture</h2>
                <p className={`text-xs sm:text-sm font-medium ${mutedText} mt-1.5 leading-relaxed`}>
                  Every pattern on Techmov—from 24-hour WhatsApp window SQL checks to Postgres Dead Letter Queues—comes from solving real production bottlenecks.
                </p>
              </div>
              <div>
                <h2 className="font-extrabold text-base">Full-Stack + Workflow Engineering</h2>
                <p className={`text-xs sm:text-sm font-medium ${mutedText} mt-1.5 leading-relaxed`}>
                  When visual nodes hit their limit, we write clean JavaScript, parameterized SQL, and full-stack React applications.
                </p>
              </div>
              <div>
                <h2 className="font-extrabold text-base">Complete Client Ownership</h2>
                <p className={`text-xs sm:text-sm font-medium ${mutedText} mt-1.5 leading-relaxed`}>
                  Whether we deploy your web app or self-host your n8n instance on a Linux VPS, you own 100% of the repository, domain, database, and credentials.
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 8: DEDICATED CONTACT & DIRECT CLIENT ORDER PAGE                 */}
      {/* ==================================================================== */}
      {activeTab === 'contact' && (
        <main id="main-content" className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-editorial-tag text-xs uppercase tracking-widest text-blue-600 font-bold">
                  Direct Engineering Desk
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
                  Start Your Project with Techmov.in
                </h1>
                <p className={`text-sm sm:text-base font-medium mt-2 ${mutedText}`}>
                  Send your software specification, automation requirements, or preferred <code className="font-mono font-bold">.com</code> domain for a Launch Bundle.
                </p>
              </div>

              <div className={`${cardSurface} rounded-3xl border p-6 space-y-4 text-xs sm:text-sm`}>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold">Direct Engineering Contact</div>
                    <div className={mutedText}>contact@techmov.in • Founder: axiomcompute</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold">Architecture Review SLA</div>
                    <div className={mutedText}>Detailed scope &amp; milestone response within 4 business hours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold">Instant Razorpay Checkout</div>
                    <div className={mutedText}>Supports UPI, Credit/Debit Cards, NetBanking &amp; GST Invoices</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${cardSurface} lg:col-span-7 rounded-3xl border p-6 sm:p-8`}>
              <h2 className="text-xl font-extrabold mb-4">Submit Your Project Brief</h2>
              <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold mb-1">Full Name or Organization *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.name}
                      onChange={e => setOrderForm({ ...orderForm, name: e.target.value })}
                      placeholder="Enter your name or company"
                      className={`w-full px-4 py-2.5 rounded-xl border font-medium focus:outline-none focus:border-blue-600 ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white placeholder-slate-400'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Work Email or WhatsApp *</label>
                    <input
                      type="email"
                      required
                      value={orderForm.email}
                      onChange={e => setOrderForm({ ...orderForm, email: e.target.value })}
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-2.5 rounded-xl border font-medium focus:outline-none focus:border-blue-600 ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white placeholder-slate-400'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Package or Bundle Selection</label>
                  <input
                    type="text"
                    value={orderForm.serviceTitle}
                    onChange={e => setOrderForm({ ...orderForm, serviceTitle: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border font-bold focus:outline-none focus:border-blue-600 ${
                      darkMode
                        ? 'bg-[#171A26] border-[#25293A] text-blue-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold mb-1">Estimated Budget (INR ₹)</label>
                    <input
                      type="text"
                      value={orderForm.budget}
                      onChange={e => setOrderForm({ ...orderForm, budget: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border font-semibold ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Target Timeline</label>
                    <input
                      type="text"
                      value={orderForm.timeline}
                      onChange={e => setOrderForm({ ...orderForm, timeline: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border font-semibold ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Project Scope &amp; Preferred .com Domain</label>
                  <textarea
                    rows={4}
                    value={orderForm.requirements}
                    onChange={e => setOrderForm({ ...orderForm, requirements: e.target.value })}
                    placeholder="Outline your web app features, WhatsApp Cloud API flows, database schema needs, or preferred .com domain..."
                    className={`w-full px-4 py-2.5 rounded-xl border font-medium focus:outline-none focus:border-blue-600 ${
                      darkMode
                        ? 'bg-[#171A26] border-[#25293A] text-white placeholder-slate-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className={`btn-pill-primary flex-1 py-3.5 px-6 rounded-full font-bold text-sm ${
                      darkMode ? 'bg-white text-slate-950' : 'bg-slate-900 text-white hover:bg-blue-600'
                    }`}
                  >
                    Submit Project Brief
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openRazorpayCheckout(
                        orderForm.serviceTitle,
                        orderForm.budget,
                        'Direct Project Deposit',
                        razorpayConfig.masterCheckoutUrl
                      )
                    }
                    className="btn-pill-razorpay flex-1 py-3.5 px-6 rounded-full font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Deposit via Razorpay</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* VIEW 9, 10, 11: CLEAR LEGAL & COMPLIANCE PAGES (PRIVACY/TERMS/REFUND)*/}
      {/* ==================================================================== */}
      {(activeTab === 'privacy' || activeTab === 'terms' || activeTab === 'refund') && (
        <main id="main-content" className="relative z-10 flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`${cardSurface} rounded-3xl border p-6 sm:p-10 space-y-6`}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <span className="font-editorial-tag text-xs uppercase text-blue-600 font-bold">
                  Techmov.in Legal &amp; Compliance Documentation
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  {activeTab === 'privacy' && 'Privacy Policy & Data Protection'}
                  {activeTab === 'terms' && 'Terms of Service & Repository Ownership'}
                  {activeTab === 'refund' && 'Refund, Cancellation & Milestone SLA Policy'}
                </h1>
              </div>
              <div className="flex gap-2">
                {['privacy', 'terms', 'refund'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => navigateToPage(tab)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize border ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'privacy' && (
              <div className={`space-y-4 text-sm leading-relaxed font-medium ${subText}`}>
                <p>
                  <strong>1. Zero Third-Party Data Monetization:</strong> Techmov.in collects only the contact details and project specifications you explicitly submit through our Order Configurator or Razorpay checkout to engineer and deliver your software system.
                </p>
                <p>
                  <strong>2. Credential &amp; Environment Isolation:</strong> All client API keys (Meta WhatsApp Cloud API, OpenAI, Neon PostgreSQL, Razorpay) are stored strictly in encrypted environment variables on your isolated instance with <code className="font-mono">N8N_BLOCK_ENV_ACCESS_IN_NODE=true</code> enforced.
                </p>
                <p>
                  <strong>3. Payment Security:</strong> All INR (₹) transactions are processed directly through PCI-DSS compliant Razorpay checkout links. Techmov never stores raw card numbers or UPI PINs on its servers.
                </p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className={`space-y-4 text-sm leading-relaxed font-medium ${subText}`}>
                <p>
                  <strong>1. 100% Client Intellectual Property Ownership:</strong> Upon project completion, you receive full ownership of the GitHub source code repository, custom React frontend, n8n workflow JSON blueprints, and database schemas.
                </p>
                <p>
                  <strong>2. Free .com/.in Domain &amp; Cloud Hosting Bundles:</strong> Launch Bundles include 1 year of domain name registration and 3 to 12 months of managed cloud/VPS hosting as specified on the selected bundle tile. Domains are registered directly under the client’s ownership.
                </p>
                <p>
                  <strong>3. Production Warranty:</strong> Every automation pipeline and web application includes a 30-day post-launch bug-fix and schema-verification warranty.
                </p>
              </div>
            )}

            {activeTab === 'refund' && (
              <div className={`space-y-4 text-sm leading-relaxed font-medium ${subText}`}>
                <p>
                  <strong>1. Milestone-Backed Assurance:</strong> Every software or automation order is broken into clear, verifiable architecture milestones (Architecture Spec → Staging Preview → Production Deployment).
                </p>
                <p>
                  <strong>2. Pre-Kickoff Cancellation:</strong> If you cancel an order before architecture provisioning and domain registration begin, 100% of your Razorpay deposit is refunded within 5–7 business days.
                </p>
                <p>
                  <strong>3. Domain Registration Deduction:</strong> Once a custom <code className="font-mono">.com</code> or <code className="font-mono">.in</code> domain name has been registered in your name, the domain registrar fee is non-refundable, and you retain full ownership of the domain.
                </p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* FULL SELF-CONTAINED ARTICLE READER (ZERO EXTERNAL WORDPRESS LINKS!)  */}
      {/* ==================================================================== */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
          <div className={`${cardSurface} max-w-4xl w-full rounded-3xl border overflow-hidden shadow-2xl max-h-[92vh] flex flex-col`}>
            {/* Sticky Reader Top Bar (Never Overlaps Image or Text) */}
            <div className={`px-5 sm:px-8 py-4 border-b ${borderSubtle} flex items-center justify-between gap-4 shrink-0 ${darkMode ? 'bg-[#12141D]' : 'bg-white'}`}>
              <div className="flex flex-wrap items-center gap-2 font-editorial-tag text-xs text-blue-600 font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600/10 text-blue-600">
                  #{String(activePost.order).padStart(2, '0')} • {activePost.category}
                </span>
                <span>•</span>
                <time dateTime={activePost.isoDate}>{activePost.date}</time>
                <span>•</span>
                <span>{activePost.readTime}</span>
              </div>
              <button
                onClick={() => setActivePost(null)}
                aria-label="Close article reader"
                className={`px-3.5 py-1.5 rounded-full border ${borderSubtle} text-xs font-bold inline-flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-white/10 shrink-0`}
              >
                <X className="w-4 h-4" />
                <span>Close Article</span>
              </button>
            </div>

            {/* Single Unified Scroll Container for Featured Diagram + Full Article Body */}
            <div className="overflow-y-auto flex-1">
              {/* Full Featured Diagram / Image (Uncropped & Clean) */}
              {renderPostFeaturedMedia(activePost, 'min-h-[220px] sm:min-h-[320px] max-h-[420px]')}

              <div className="p-5 sm:p-8 lg:p-10 space-y-6">
                <div>
                  <h1 className="text-xl sm:text-3xl font-extrabold leading-tight">
                    {activePost.title}
                  </h1>
                  <div className={`mt-2 text-xs font-semibold ${mutedText}`}>
                    Written by <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{activePost.author}</strong> • Published on Techmov.in (Self-Contained Local Edition)
                  </div>
                </div>

                {activePost.keyTakeaway && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border ${
                      darkMode ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50/90 border-blue-200'
                    }`}
                  >
                    <div className="font-editorial-tag text-xs uppercase text-blue-600 font-bold mb-1">
                      Architectural Takeaway
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">{activePost.keyTakeaway}</p>
                  </div>
                )}

                {/* If exported via node export_techmov_wp.js, render the complete WordPress HTML body natively! */}
                {activePost.htmlContent ? (
                  <div
                    className={`wp-native-article space-y-4 text-sm sm:text-base font-medium leading-relaxed ${subText}`}
                    onClick={(e) => {
                      const a = e.target.closest('a');
                      if (!a) return;
                      const internalSlug = a.getAttribute('data-internal-slug');
                      if (internalSlug) {
                        e.preventDefault();
                        const target = blogPosts.find(p => p.slug === internalSlug);
                        if (target) setActivePost(target);
                      }
                    }}
                    dangerouslySetInnerHTML={{ __html: activePost.htmlContent }}
                  />
                ) : (
                  <div className="space-y-5 text-sm sm:text-base font-medium leading-relaxed">
                    {(activePost.content || []).map((para, i) => (
                      <p key={i} className={subText}>
                        {para}
                      </p>
                    ))}

                    {/* Deep-Dive Architecture Breakdown Section (Always Rendered Locally) */}
                    <div className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#171A26] border-[#25293A]' : 'bg-slate-50 border-slate-200'}`}>
                      <h3 className="font-extrabold text-base sm:text-lg">
                        Step-by-Step Production Architecture ({activePost.category})
                      </h3>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span><strong>1. Deterministic Ingestion Layer:</strong> Validate incoming webhook signatures and normalize phone numbers, timestamps, and JSON payloads before touching downstream APIs.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span><strong>2. Atomic State in Neon PostgreSQL:</strong> Store operational state and idempotency keys using parameterized queries (<code>$1, $2</code>) to prevent race conditions and SQL injection.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span><strong>3. Resilient Error Recovery:</strong> Route any upstream API timeout to a dedicated <code>workflow_dead_letter_queue</code> table with instant Telegram/Slack retry alerts.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activePost.codeSnippet && (
                  <div className="rounded-2xl bg-[#0F172A] text-slate-100 p-4 sm:p-5 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-700 text-slate-300 font-bold">
                      <span>Production Implementation Snippet</span>
                      <button
                        onClick={() => handleCopyCode(activePost.codeSnippet)}
                        className="inline-flex items-center gap-1 text-blue-400 hover:underline"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="text-slate-100 overflow-x-auto whitespace-pre-wrap">
                      {activePost.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* Self-Contained Local Route Footer + Next/Prev Article Navigation (Zero External Links!) */}
                <div className={`flex flex-wrap items-center justify-between gap-3 pt-6 border-t ${borderSubtle}`}>
                  <div className="flex items-center gap-2">
                    <span className={`font-editorial-tag text-xs font-bold px-3 py-1.5 rounded-full border ${borderSubtle}`}>
                      Local Route: /#/blog/{activePost.slug}
                    </span>
                    <button
                      onClick={() => {
                        const nextIdx = activePost.order % blogPosts.length;
                        setActivePost(blogPosts[nextIdx]);
                      }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-600 hover:underline"
                    >
                      Next Guide →
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        const title = `Custom Implementation: ${activePost.title.slice(0, 44)}...`;
                        setActivePost(null);
                        openRazorpayCheckout(title, '₹18,000', 'Turnkey Workflow Setup', razorpayConfig.masterCheckoutUrl);
                      }}
                      className="btn-pill-razorpay flex-1 sm:flex-initial px-4 py-2.5 rounded-full text-xs font-bold bg-blue-600 text-white flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Book via Razorpay</span>
                    </button>
                    <button
                      onClick={() => {
                        const title = `Custom Implementation: ${activePost.title.slice(0, 48)}...`;
                        setActivePost(null);
                        openOrderWithConfig(title, '₹18,000 – ₹45,000', '5–7 Days', `Please build this architecture based on your guide: ${activePost.title}`);
                      }}
                      className={`btn-pill-primary flex-1 sm:flex-initial px-4 py-2.5 rounded-full text-xs font-bold ${
                        darkMode ? 'bg-white text-slate-950' : 'bg-slate-900 text-white hover:bg-blue-600'
                      }`}
                    >
                      Order Setup →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: INSTANT RAZORPAY CHECKOUT LAUNCHER                          */}
      {/* ==================================================================== */}
      {activeRazorpayCheckout && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className={`${cardSurface} max-w-md w-full rounded-3xl border p-6 sm:p-8 shadow-2xl space-y-5`}>
            <div className={`flex items-center justify-between border-b ${borderSubtle} pb-4`}>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-editorial-tag text-[11px] uppercase text-blue-600 font-bold">
                    Razorpay Verified Checkout • INR (₹)
                  </span>
                  <h2 className="text-lg font-extrabold leading-tight">Instant Project Booking</h2>
                </div>
              </div>
              <button
                onClick={() => setActiveRazorpayCheckout(null)}
                className={`p-2 rounded-full border ${borderSubtle}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                darkMode ? 'bg-[#171A26] border-[#25293A]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-editorial-tag text-xs uppercase font-bold text-blue-600">
                {activeRazorpayCheckout.category}
              </div>
              <div className="font-extrabold text-base">{activeRazorpayCheckout.title}</div>
              <div className="text-2xl font-extrabold font-editorial-tag text-blue-600 pt-1">
                {activeRazorpayCheckout.amount}
              </div>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Supports UPI (GPay, PhonePe, Paytm), Cards &amp; NetBanking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Instant automated webhook receipt + onboarding kickoff</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={activeRazorpayCheckout.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-razorpay w-full py-3.5 px-5 rounded-full font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center gap-2"
              >
                <span>Open Razorpay Checkout ({activeRazorpayCheckout.amount})</span>
                <ExternalLink className="w-4 h-4" />
              </a>

            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 3: CLIENT SOFTWARE ORDER SUBMISSION DRAWER                     */}
      {/* ==================================================================== */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className={`${cardSurface} max-w-xl w-full rounded-3xl border p-5 sm:p-8 shadow-2xl space-y-5 my-6`}>
            <div className={`flex items-center justify-between border-b ${borderSubtle} pb-4`}>
              <div>
                <span className="font-editorial-tag text-xs uppercase text-blue-600 font-bold">
                  Project Order Specification
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold">Submit Your Software / Automation Order</h2>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                aria-label="Close order modal"
                className={`p-2 rounded-full border ${borderSubtle}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {latestOrderReceipt ? (
              <div className="space-y-4 py-4">
                <div
                  className={`p-5 rounded-2xl border space-y-2 ${
                    darkMode ? 'bg-blue-950/20 border-blue-500/40' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-blue-600 font-extrabold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Order {latestOrderReceipt.orderId} Logged</span>
                  </div>
                  <p className={`text-xs font-medium ${subText}`}>
                    Thank you, <strong>{latestOrderReceipt.name}</strong>. Your specification for{' '}
                    <strong>{latestOrderReceipt.serviceTitle}</strong> ({latestOrderReceipt.budget}) has been queued for{' '}
                    <strong>axiomcompute</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={latestOrderReceipt.paymentLink || razorpayConfig.masterCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-razorpay py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm bg-blue-600 text-white flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay via Razorpay Now</span>
                  </a>
                  <button
                    onClick={() => {
                      setOrderModalOpen(false);
                      navigateToPage('services');
                    }}
                    className="btn-pill-primary py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm bg-slate-900 text-white"
                  >
                    View Active Orders in Portal
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Full Name or Organization *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.name}
                      onChange={e => setOrderForm({ ...orderForm, name: e.target.value })}
                      placeholder="Enter your name or company"
                      className={`w-full px-4 py-2.5 rounded-xl border font-medium focus:outline-none focus:border-blue-600 ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white placeholder-slate-400'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Work Email or WhatsApp *</label>
                    <input
                      type="email"
                      required
                      value={orderForm.email}
                      onChange={e => setOrderForm({ ...orderForm, email: e.target.value })}
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-2.5 rounded-xl border font-medium focus:outline-none focus:border-blue-600 ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white placeholder-slate-400'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Selected Package / Deliverable</label>
                  <input
                    type="text"
                    value={orderForm.serviceTitle}
                    onChange={e => setOrderForm({ ...orderForm, serviceTitle: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border font-bold focus:outline-none focus:border-blue-600 ${
                      darkMode
                        ? 'bg-[#171A26] border-[#25293A] text-blue-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Estimated Budget (INR ₹)</label>
                    <input
                      type="text"
                      value={orderForm.budget}
                      onChange={e => setOrderForm({ ...orderForm, budget: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border font-semibold ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Target Timeline</label>
                    <input
                      type="text"
                      value={orderForm.timeline}
                      onChange={e => setOrderForm({ ...orderForm, timeline: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border font-semibold ${
                        darkMode
                          ? 'bg-[#171A26] border-[#25293A] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Project Scope &amp; Technical Requirements</label>
                  <textarea
                    rows={3}
                    value={orderForm.requirements}
                    onChange={e => setOrderForm({ ...orderForm, requirements: e.target.value })}
                    placeholder="Outline your web app features, API endpoints, WhatsApp flows, or preferred .com domain..."
                    className={`w-full px-4 py-2.5 rounded-xl border font-medium focus:outline-none focus:border-blue-600 ${
                      darkMode
                        ? 'bg-[#171A26] border-[#25293A] text-white placeholder-slate-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-pill-primary w-full py-3.5 rounded-full font-bold text-sm ${
                    darkMode ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'
                  }`}
                >
                  Confirm &amp; Dispatch Client Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* COMPREHENSIVE ARCHITECTURAL MULTI-COLUMN FOOTER                      */}
      {/* ==================================================================== */}
      <footer
        className={`border-t ${borderSubtle} pt-14 pb-10 mt-20 relative z-10 ${
          darkMode ? 'bg-[#07080C] text-slate-300' : 'bg-white text-slate-700'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top 5-Column Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Col 1 (4 Cols): Brand, Mission & Razorpay Trust Badge */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src={BRAND_ASSETS.logoLocal}
                    alt="Techmov.in Footer Logo"
                    onError={(e) => {
                      if (e.currentTarget.src !== BRAND_ASSETS.logoRemote) {
                        e.currentTarget.src = BRAND_ASSETS.logoRemote;
                      } else if (e.currentTarget.src !== BRAND_ASSETS.iconRemote) {
                        e.currentTarget.src = BRAND_ASSETS.iconRemote;
                      } else {
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <span className="font-editorial-tag font-bold text-xs text-white select-none">TM</span>
                </div>
                <div>
                  <span className={`font-extrabold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                    Techmov.in
                  </span>
                  <p className="text-[11px] font-editorial-tag uppercase tracking-wider text-blue-600 font-bold">
                    Live the life of Automation
                  </p>
                </div>
              </div>

              <p className={`text-xs sm:text-sm font-medium leading-relaxed ${mutedText}`}>
                Full-stack software studio and n8n workflow automation consultancy led by{' '}
                <strong className={darkMode ? 'text-white' : 'text-slate-900'}>axiomcompute</strong>. We build resilient web applications, compliant Meta WhatsApp Cloud API CRMs, and PostgreSQL-backed AI agents.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-editorial-tag font-bold bg-blue-600/10 text-blue-600 border border-blue-600/20">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Razorpay INR (₹) Verified</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-editorial-tag font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Repo Ownership</span>
                </span>
              </div>
            </div>

            {/* Col 2 (3 Cols): Launch Bundles & Services */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className={`font-editorial-tag text-xs uppercase tracking-wider font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                Bundles &amp; Services
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold">
                <li>
                  <button onClick={() => navigateToPage('bundles')} className="hover:text-blue-600 transition-colors">
                    Starter Bundle + Free .com (₹19,999)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('bundles')} className="hover:text-blue-600 transition-colors">
                    Growth Web App + WhatsApp CRM (₹39,999)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('bundles')} className="hover:text-blue-600 transition-colors">
                    SaaS MVP + AI Agent + 12m VPS (₹69,999)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('services')} className="hover:text-blue-600 transition-colors">
                    Custom Full-Stack Web App (₹45,000+)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('services')} className="hover:text-blue-600 transition-colors">
                    Self-Hosted n8n VPS Hardening
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 (3 Cols): Engineering Resources & WP Sync */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className={`font-editorial-tag text-xs uppercase tracking-wider font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                Engineering &amp; Tools
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold">
                <li>
                  <button onClick={() => navigateToPage('blog')} className="hover:text-blue-600 transition-colors">
                    All 20 n8n Engineering Guides
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('sandbox')} className="hover:text-blue-600 transition-colors">
                    Interactive Workflow Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('home'); setTimeout(() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blue-600 transition-colors">
                    Interactive Project Scope Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('bundles')} className="hover:text-blue-600 transition-colors">
                    Free .com Domain &amp; Cloud Bundles
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('seo')} className="hover:text-blue-600 transition-colors">
                    Technical SEO &amp; JSON-LD Schema
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4 (2 Cols): Company & Legal Pages */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className={`font-editorial-tag text-xs uppercase tracking-wider font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                Company &amp; Legal
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold">
                <li>
                  <button onClick={() => navigateToPage('about')} className="hover:text-blue-600 transition-colors">
                    About axiomcompute
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('contact')} className="hover:text-blue-600 transition-colors">
                    Contact &amp; Order Desk
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('privacy')} className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('terms')} className="hover:text-blue-600 transition-colors">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('refund')} className="hover:text-blue-600 transition-colors">
                    Refund &amp; SLA Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-8 border-t ${borderSubtle} flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold ${mutedText}`}>
            <div>
              © {new Date().getFullYear()} <strong className={darkMode ? 'text-white' : 'text-slate-900'}>Techmov.in</strong> — Engineered by{' '}
              <strong className={darkMode ? 'text-white' : 'text-slate-900'}>axiomcompute</strong>. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  openRazorpayCheckout(
                    'Quick Project Retainer / Deposit',
                    '₹10,000',
                    'Instant Retainer',
                    razorpayConfig.masterCheckoutUrl
                  )
                }
                className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Instant Razorpay Checkout</span>
              </button>
              <span>•</span>
              <button onClick={() => setCursorMotionEnabled(!cursorMotionEnabled)} className="hover:underline">
                Cursor Motion FX: {cursorMotionEnabled ? 'On' : 'Off'}
              </button>
              <span>•</span>
              <button onClick={() => setDarkMode(!darkMode)} className="hover:underline">
                Theme: {darkMode ? 'Dark' : 'Light (Default)'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
