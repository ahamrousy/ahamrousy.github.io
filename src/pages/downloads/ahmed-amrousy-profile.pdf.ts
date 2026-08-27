import type { APIRoute } from 'astro';
import PDFDocument from 'pdfkit';

import { SITE_URL, brand, contact } from '~/site.config';
import { person, frameworks, tools } from '~/data/person';

/**
 * The downloadable one-page profile.
 *
 * Built as an Astro endpoint rather than a standalone script for the same
 * reason the OG cards are: it reads src/data/person.ts directly, so the PDF a
 * conference organiser downloads says exactly what the About page says. There
 * is no second copy of the biography to update.
 *
 * Typeset in Helvetica — one of the fourteen fonts every PDF reader has built
 * in. Embedding IBM Plex would need a TTF, and the only formats in the
 * dependency tree are woff/woff2, which pdfkit cannot read. A media-kit
 * one-pager is not the place to add a font-binary dependency to the repo.
 */

const CORAL = brand.colors.coralStrong;
const GREEN = brand.colors.greenStrong;
const INK = brand.colors.ink;
const GREY = '#6B7280';

const PAGE = { margin: 48, width: 595.28, height: 841.89 }; // A4 in points
const CONTENT_WIDTH = PAGE.width - PAGE.margin * 2;

export const GET: APIRoute = async () => {
  const doc = new PDFDocument({
    size: 'A4',
    margin: PAGE.margin,
    info: {
      Title: `${person.name} — profile`,
      Author: person.name,
      Subject: 'AI-for-Business training — Menova',
      Keywords: 'Ahmed Amrousy, Menova, AI training, AUC, Nile Air, Egypt, GCC',
    },
  });

  const chunks: Buffer[] = [];
  doc.on('data', (chunk: Buffer) => chunks.push(chunk));
  const finished = new Promise<void>((resolve) => doc.on('end', () => resolve()));

  const rule = (y: number) => {
    doc.moveTo(PAGE.margin, y).lineTo(PAGE.width - PAGE.margin, y).lineWidth(0.75).strokeColor('#E5E7EB').stroke();
  };

  const heading = (text: string) => {
    doc.moveDown(0.9);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(CORAL).text(text.toUpperCase(), { characterSpacing: 1.1 });
    doc.moveDown(0.35);
  };

  // ── Masthead ─────────────────────────────────────────────────────────────
  // The official Menova mark (green shield + coral dot), embedded from the
  // same PNG the site header uses.
  const markX = PAGE.margin;
  const markY = PAGE.margin;
  doc.image('public/images/menova-mark.png', markX, markY + 2, { height: 24 });

  doc.font('Helvetica-Bold').fontSize(15).fillColor(INK).text('Menova', markX + 44, markY + 5);
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(GREY)
    .text('AI-for-Business training', markX + 108, markY + 8.5);

  doc.y = markY + 40;
  rule(doc.y);
  doc.moveDown(1.1);

  // ── Name and roles ───────────────────────────────────────────────────────
  doc.font('Helvetica-Bold').fontSize(26).fillColor(INK).text(person.name, { characterSpacing: -0.4 });
  doc.moveDown(0.25);
  doc.font('Helvetica').fontSize(10).fillColor(GREY).text(person.jobTitle.en, { width: CONTENT_WIDTH });
  doc.moveDown(0.6);
  doc.font('Helvetica-Oblique').fontSize(11).fillColor(CORAL).text(`“${person.tagline.en}”`, { width: CONTENT_WIDTH });

  // ── Biography ────────────────────────────────────────────────────────────
  heading('Profile');
  doc.font('Helvetica').fontSize(9.5).fillColor(INK).text(person.bios.en.medium, {
    width: CONTENT_WIDTH,
    align: 'justify',
    lineGap: 1.6,
  });

  // ── Two columns: roles / credentials ─────────────────────────────────────
  heading('Current roles');
  const colTop = doc.y;
  const colWidth = (CONTENT_WIDTH - 20) / 2;

  doc.font('Helvetica').fontSize(9).fillColor(INK);
  for (const role of person.roles) {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(INK).text(role.title.en, PAGE.margin, doc.y, { width: colWidth });
    doc.font('Helvetica').fontSize(8.5).fillColor(GREY).text(role.org.en, { width: colWidth });
    doc.moveDown(0.35);
  }
  const leftBottom = doc.y;

  doc.y = colTop;
  const rightX = PAGE.margin + colWidth + 20;
  for (const item of person.education) {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(INK).text(item.degree.en, rightX, doc.y, { width: colWidth });
    if (item.org.en) {
      doc.font('Helvetica').fontSize(8.5).fillColor(GREY).text(item.org.en, rightX, doc.y, { width: colWidth });
    }
    doc.moveDown(0.35);
  }
  doc.font('Helvetica').fontSize(8.5).fillColor(GREY).text(person.memberships[0].en, rightX, doc.y, { width: colWidth });

  doc.x = PAGE.margin;
  doc.y = Math.max(leftBottom, doc.y) + 4;

  // ── Track record ─────────────────────────────────────────────────────────
  heading('Selected training record');
  const record = [
    'Kahraba (National Electricity Technology Company) — 65 executives trained on Microsoft Copilot, incl. the CEO, rated 4.8/5',
    'Kahraba leadership — advanced Claude Cowork & Fable 5 session for the CEO and senior managers',
    'Engineering Export Council of Egypt — two-day AI for Business Strategy workshop for member companies',
    'Cairo University FEPS — "Mastering AI for Smarter Teaching" for faculty, with Logic Consulting',
  ];
  doc.font('Helvetica').fontSize(9).fillColor(INK);
  for (const line of record) {
    doc.text(`•  ${line}`, PAGE.margin, doc.y, { width: CONTENT_WIDTH, lineGap: 1.4 });
    doc.moveDown(0.18);
  }

  // ── Method ───────────────────────────────────────────────────────────────
  heading('How he teaches');
  doc.font('Helvetica').fontSize(9).fillColor(INK).text(
    '70% hands-on, 30% theory. Delivered verbally in Arabic with English slides, or fully in English. ' +
      'Live demonstrations on the client’s own datasets, with a deliberate demonstration every 90 minutes.',
    { width: CONTENT_WIDTH, lineGap: 1.4 },
  );
  doc.moveDown(0.4);
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(INK)
    .text('Frameworks: ', { continued: true })
    .font('Helvetica')
    .text(
      `${frameworks.pocab.acronym} (${frameworks.pocab.expansion}) · ${frameworks.gcsef.acronym} (${frameworks.gcsef.expansion}) · SOSTAC · Playing to Win`,
      { width: CONTENT_WIDTH },
    );
  doc.moveDown(0.25);
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(INK)
    .text('Tools: ', { continued: true })
    .font('Helvetica')
    .text(tools.map((tool) => tool.name).join(' · '), { width: CONTENT_WIDTH });

  // ── Programmes ───────────────────────────────────────────────────────────
  heading('Programmes');
  doc.font('Helvetica').fontSize(9).fillColor(INK).text(
    'AI for Business · AI for Executives · AI for Marketing & Sales · AI for Educators · ' +
      'AI for Automation · AI for Entrepreneurs (24 hours) · AI for Business Strategy (flagship, 16 hours)',
    { width: CONTENT_WIDTH, lineGap: 1.4 },
  );

  // ── Footer ───────────────────────────────────────────────────────────────
  const footerY = PAGE.height - PAGE.margin - 34;
  doc.moveTo(PAGE.margin, footerY).lineTo(PAGE.margin + 90, footerY).lineWidth(2.5).strokeColor(CORAL).stroke();
  doc.moveTo(PAGE.margin + 90, footerY).lineTo(PAGE.margin + 180, footerY).lineWidth(2.5).strokeColor(GREEN).stroke();

  doc.font('Helvetica-Bold').fontSize(9).fillColor(INK).text(contact.email, PAGE.margin, footerY + 9, { width: CONTENT_WIDTH });
  doc
    .font('Helvetica')
    .fontSize(8.5)
    .fillColor(GREY)
    .text(
      `WhatsApp ${contact.whatsappDisplay}  ·  ${contact.linkedin.replace('https://www.', '')}  ·  ${SITE_URL.replace('https://', '')}  ·  Cairo, Egypt`,
      PAGE.margin,
      doc.y + 1,
      { width: CONTENT_WIDTH },
    );

  doc.end();
  await finished;

  return new Response(new Uint8Array(Buffer.concat(chunks)), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="ahmed-amrousy-profile.pdf"',
    },
  });
};
