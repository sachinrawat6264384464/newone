# AGENT.md — SEO Competitor Intelligence Agent

## Mission

Build and maintain an SEO Competitor Intelligence Agent that uses Antigravity's built-in AI/agent capabilities for reasoning and orchestration, while using SerpApi only as the external Google SERP data source.

## Critical Constraint

DO NOT use OpenAI API, OpenAI SDK, OpenAI API keys, or any separate external LLM API.

The AI reasoning, planning, analysis, and recommendation generation must be performed by the Antigravity agent environment/capabilities available to this project.

SerpApi is allowed only for SERP/search data.

Required secret:
- SERPAPI_API_KEY

Never expose API keys in frontend code, source control, logs, or responses.

## Objective

Given:
- our website/page URL
- target keyword(s)
- country
- language
- device

the agent should:

1. Search Google SERPs through SerpApi.
2. Identify relevant ranking competitors.
3. Collect only publicly accessible competitor page information.
4. Analyze competitor SEO signals.
5. Analyze our own page.
6. Compare our page against competitors.
7. Identify SEO/content/topic gaps.
8. Generate original SEO recommendations.
9. Present recommendations for human approval.
10. Apply approved changes only when an authorized publishing integration exists.
11. Maintain a change history and rollback information.
12. Support scheduled re-analysis later.

## Non-Goals

Do not:
- copy competitor articles or paragraphs;
- scrape private/authenticated content;
- bypass CAPTCHAs, paywalls, robots restrictions, or access controls;
- guarantee Google rankings;
- publish production changes without approval;
- use OpenAI APIs or another external LLM API.

## Agent Responsibilities

The agent is responsible for:
- planning the analysis;
- selecting tools;
- deciding which keywords/pages need analysis;
- interpreting SERP results;
- comparing SEO signals;
- producing structured recommendations;
- explaining the evidence behind recommendations.

The agent should distinguish:
- Observed data
- Derived analysis
- AI recommendation

Do not present inference as fact.

## SerpApi Tool

Create a clean SerpApi integration.

Input:
- query/keyword
- country/location
- language
- device

Output should be normalized into an internal structure containing, where available:
- position
- title
- URL
- domain
- snippet
- result type
- SERP features

Handle:
- authentication errors
- rate limits
- timeouts
- invalid responses
- retries with bounded exponential backoff

Cache SERP results when appropriate.

## Website Analyzer

Analyze our website and publicly accessible competitor pages.

Extract, where available:
- HTTP status
- title
- meta description
- canonical
- robots meta
- H1/H2/H3
- main content
- FAQs
- internal links
- external links
- images and alt text
- structured data/schema
- language
- URL structure

Do not store unnecessary full competitor content. Prefer structured observations and concise summaries.

## Competitor Discovery

Classify SERP results as:
- direct competitor
- indirect competitor
- marketplace
- directory
- informational/blog
- government/official
- social platform
- other

Allow users to include/exclude domains manually.

## SEO Gap Analysis

Compare our page with selected competitors across:

- search intent
- title
- meta description
- heading structure
- keyword/topic coverage
- subtopics
- FAQs
- entities/topics
- internal linking opportunities
- structured data
- image/alt opportunities
- content completeness

Create an internal opportunity score. Clearly label it as an internal score, not Google's ranking score.

## Recommendations

Each recommendation should have:

- category
- priority
- current state
- recommended state
- reason
- evidence/reference
- confidence
- estimated effort
- expected SEO opportunity

Use cautious language. Never claim a recommendation guarantees a ranking increase.

Example categories:
- title
- meta description
- H1
- headings
- content
- keyword/topic
- FAQ
- internal links
- schema
- image alt
- technical SEO

## Human Approval

Default workflow:

Analyze
→ Recommend
→ Human Review
→ Approve/Reject/Edit
→ Publish

Never publish automatically unless the user explicitly enables an approved automation policy.

## Publishing

Use an abstraction such as PublishingProvider.

Support future adapters for:
- custom REST API
- WordPress
- Next.js/custom CMS

Publishing credentials must remain server-side.

Every change must record:
- old value
- new value
- recommendation
- approver
- approval time
- publish time
- rollback value

## Security

Implement:
- environment variables
- URL validation
- SSRF protection
- HTTP/HTTPS only
- private/loopback IP blocking
- redirect validation
- request timeout
- response-size limits
- rate limiting
- authentication/authorization where needed
- audit logging

## Agent Tool Architecture

Prefer small tools instead of one giant tool.

Recommended tools:

- serp_search
- fetch_public_page
- analyze_page
- discover_competitors
- compare_seo
- generate_recommendations
- get_project_context
- save_analysis
- request_human_approval
- publish_approved_change
- rollback_change

The exact tool mechanism must match Antigravity's available agent/tool capabilities.

## Runtime AI Constraint

Do not create a runtime dependency on an external LLM API.

If a feature requires model inference, use the AI/agent capability available inside the Antigravity environment according to its supported runtime mechanism.

If Antigravity cannot provide runtime inference for the deployed application, STOP and clearly document that limitation rather than silently adding OpenAI or another LLM API.

## Data Model

Recommended entities:

- projects
- keywords
- serp_snapshots
- serp_results
- competitors
- competitor_pages
- page_analysis
- seo_observations
- recommendations
- approval_actions
- published_changes
- analysis_tasks
- agent_runs
- tool_calls
- audit_logs

Use UUIDs, timestamps, foreign keys, indexes, and proper constraints.

## Workflow Example

Input:

Website:
https://example.com/real-estate-crm

Keyword:
real estate CRM

Country:
India

Language:
English

Device:
desktop

Agent:

1. Search keyword with SerpApi.
2. Read top SERP results.
3. Select relevant competitors.
4. Fetch publicly accessible pages.
5. Analyze competitor SEO structure.
6. Analyze our page.
7. Identify gaps.
8. Generate original recommendations.
9. Show evidence and confidence.
10. Wait for approval.
11. Publish only approved changes through a configured publishing adapter.
12. Save the complete change history.

## Development Rules

Before implementation:

1. Inspect the existing repository.
2. Identify existing framework, database, frontend, backend, and deployment setup.
3. Do not replace existing architecture unnecessarily.
4. Reuse existing components where appropriate.
5. Create an architecture plan.
6. Create database schema/migrations.
7. Create tool interfaces.
8. Implement SerpApi integration.
9. Implement website analyzer.
10. Implement SEO comparison.
11. Implement Antigravity agent orchestration.
12. Implement approval flow.
13. Add tests.
14. Document setup.

Work incrementally and keep the application runnable after each phase.

## Definition of Done

The system must be able to:

- accept a project and target keyword;
- query SerpApi;
- identify competitors;
- analyze our page;
- analyze selected competitor pages;
- perform SEO gap analysis;
- generate original recommendations using Antigravity's available AI/agent capability;
- provide evidence for recommendations;
- require human approval before publishing;
- track changes;
- support rollback;
- protect secrets;
- prevent SSRF;
- handle API failures;
- provide tests and documentation.

## Final Instruction to Antigravity

Treat this AGENT.md as the project's operating specification.

Before making architectural decisions, inspect the repository and existing Antigravity capabilities.

Do not introduce OpenAI API keys or external LLM APIs.

Use SerpApi for SERP data and Antigravity's built-in agent/AI capability for reasoning.

If a required capability is unavailable, report the limitation clearly and propose the smallest compatible architecture change without violating the no-external-LLM constraint.
