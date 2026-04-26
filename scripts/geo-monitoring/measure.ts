#!/usr/bin/env tsx
/**
 * GEO 측정 스크립트 — AI 검색엔진에서 뷰티풀한방병원 인용 여부 측정
 *
 * 사용법:
 *   npx tsx scripts/geo-monitoring/measure.ts
 *
 * 결과:
 *   reports/geo-baseline-{date}.json
 *   reports/geo-baseline-{date}.md
 */

import { writeFileSync, mkdirSync } from "fs";
import { QUERIES, TARGET_HOSPITAL, type QueryCategory } from "./queries";

// ─── 타입 ───────────────────────────────────────────────────────────────
interface QueryResult {
  query: string;
  category: QueryCategory;
  primary: boolean;
  mentioned: boolean;       // 병원명/도메인 언급 여부
  mentionType: "name" | "domain" | "director" | "alias" | "none";
  snippet: string;          // AI 응답 첫 300자
  measuredAt: string;
  note: string;             // 수동 메모용
}

interface MeasurementRun {
  runId: string;
  phase: "before" | "after";
  measuredAt: string;
  previewUrl?: string;
  results: QueryResult[];
  summary: {
    total: number;
    mentioned: number;
    mentionRate: number;
    byCategory: Record<QueryCategory, { total: number; mentioned: number }>;
  };
}

// ─── 언급 감지 ───────────────────────────────────────────────────────────
function detectMention(text: string): QueryResult["mentionType"] {
  const lower = text.toLowerCase();
  if (lower.includes(TARGET_HOSPITAL.domain)) return "domain";
  if (text.includes(TARGET_HOSPITAL.name)) return "name";
  if (text.includes(TARGET_HOSPITAL.director)) return "director";
  for (const alias of TARGET_HOSPITAL.aliases) {
    if (text.includes(alias)) return "alias";
  }
  return "none";
}

// ─── 수동 입력 모드 (AI API 없이 사용 가능) ──────────────────────────────
function createManualTemplate(): MeasurementRun {
  const now = new Date().toISOString();
  const runId = `run-${now.slice(0, 10)}`;

  const results: QueryResult[] = QUERIES.map((q) => ({
    query: q.text,
    category: q.category,
    primary: "primary" in q ? Boolean(q.primary) : false,
    mentioned: false,
    mentionType: "none",
    snippet: "",
    measuredAt: now,
    note: "수동 측정 필요 — 각 AI 검색엔진에서 직접 검색 후 결과 입력",
  }));

  return {
    runId,
    phase: "before",
    measuredAt: now,
    results,
    summary: computeSummary(results),
  };
}

// ─── 요약 계산 ───────────────────────────────────────────────────────────
function computeSummary(results: QueryResult[]): MeasurementRun["summary"] {
  const categories: QueryCategory[] = ["location", "treatment", "condition", "general", "brand"];
  const byCategory = Object.fromEntries(
    categories.map((cat) => {
      const catResults = results.filter((r) => r.category === cat);
      const mentioned = catResults.filter((r) => r.mentioned).length;
      return [cat, { total: catResults.length, mentioned }];
    })
  ) as Record<QueryCategory, { total: number; mentioned: number }>;

  const mentioned = results.filter((r) => r.mentioned).length;
  return {
    total: results.length,
    mentioned,
    mentionRate: Math.round((mentioned / results.length) * 100),
    byCategory,
  };
}

// ─── 마크다운 리포트 생성 ─────────────────────────────────────────────────
function generateMarkdownReport(run: MeasurementRun): string {
  const categoryLabels: Record<QueryCategory, string> = {
    location: "지역 검색",
    treatment: "치료 키워드",
    condition: "암종별",
    general: "일반 한방암치료",
    brand: "브랜드 직접 검색",
  };

  const lines = [
    `# GEO 측정 리포트 — ${run.phase === "before" ? "Before (Prerender 적용 전)" : "After"}`,
    ``,
    `- **측정일:** ${run.measuredAt.slice(0, 10)}`,
    `- **Run ID:** ${run.runId}`,
    `- **Phase:** ${run.phase}`,
    run.previewUrl ? `- **Preview URL:** ${run.previewUrl}` : "",
    ``,
    `## 전체 요약`,
    ``,
    `| 항목 | 수치 |`,
    `|------|------|`,
    `| 총 쿼리 수 | ${run.summary.total}개 |`,
    `| 병원 언급됨 | ${run.summary.mentioned}개 |`,
    `| **인용률** | **${run.summary.mentionRate}%** |`,
    ``,
    `## 카테고리별 결과`,
    ``,
    `| 카테고리 | 총 쿼리 | 언급 | 인용률 |`,
    `|---------|---------|------|--------|`,
    ...Object.entries(run.summary.byCategory).map(
      ([cat, { total, mentioned }]) =>
        `| ${categoryLabels[cat as QueryCategory]} | ${total} | ${mentioned} | ${total > 0 ? Math.round((mentioned / total) * 100) : 0}% |`
    ),
    ``,
    `## 쿼리별 상세 결과`,
    ``,
    ...run.results.map(
      (r) =>
        `### ${r.primary ? "⭐ " : ""}[${r.category}] ${r.query}\n` +
        `- 언급: ${r.mentioned ? `✅ (${r.mentionType})` : "❌"}\n` +
        (r.snippet ? `- 스니펫: "${r.snippet.slice(0, 200)}..."\n` : "") +
        (r.note ? `- 메모: ${r.note}\n` : "")
    ),
  ];

  return lines.filter((l) => l !== "").join("\n");
}

// ─── 메인 ────────────────────────────────────────────────────────────────
function main() {
  console.log("🔍 GEO 측정 시작 — 뷰티풀한방병원 (btful.co.kr)");
  console.log(`📋 총 ${QUERIES.length}개 쿼리`);
  console.log("");

  mkdirSync("reports", { recursive: true });

  const run = createManualTemplate();
  const date = run.measuredAt.slice(0, 10);

  // JSON 저장
  const jsonPath = `reports/geo-baseline-${date}.json`;
  writeFileSync(jsonPath, JSON.stringify(run, null, 2), "utf-8");
  console.log(`✅ JSON 저장: ${jsonPath}`);

  // 마크다운 저장
  const mdPath = `reports/geo-baseline-${date}.md`;
  writeFileSync(mdPath, generateMarkdownReport(run), "utf-8");
  console.log(`✅ 마크다운 저장: ${mdPath}`);

  console.log("");
  console.log("📌 다음 단계:");
  console.log("  1. 각 쿼리를 ChatGPT, Perplexity, Claude.ai에서 직접 검색");
  console.log("  2. 결과를 reports/geo-baseline-{date}.json 에 입력");
  console.log("  3. 'mentioned: true/false' 및 'snippet' 필드 채우기");
  console.log("  4. npm run geo:report 로 마크다운 재생성");
}

main();
