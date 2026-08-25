import type { APIRoute } from 'astro';
import { absolute } from '~/i18n/routing';
import { asset } from '~/i18n/routing';

/**
 * robots.txt
 *
 * Every major search crawler AND every major AI crawler is explicitly allowed.
 * That is a deliberate strategic choice, not an oversight: the brief's second
 * goal is to be *cited* by generative engines, and a model that cannot crawl
 * the site cannot cite it. GPTBot, ClaudeBot, PerplexityBot, Google-Extended
 * and CCBot are named individually so the intent is unambiguous — several of
 * them treat an absent directive differently from an explicit Allow.
 */
export const GET: APIRoute = async () => {
  const agents = [
    // Search
    'Googlebot',
    'Googlebot-Image',
    'Bingbot',
    'Slurp',
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'Applebot',
    // AI / generative engines
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'CCBot',
    'Applebot-Extended',
    'Meta-ExternalAgent',
    'Bytespider',
    'Amazonbot',
    'cohere-ai',
    'YouBot',
    'Diffbot',
    'omgili',
    'Timpibot',
  ];

  const body = [
    '# Menova — ahamrousy.github.io',
    '# Search and AI crawlers are both welcome. See /llms.txt for a plain-text',
    '# summary written specifically for language models.',
    '',
    ...agents.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${absolute(asset('sitemap.xml'))}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
