#!/usr/bin/env tsx
/**
 * Before vs After 비교 리포트 생성
 *
 * 사용법:
 *   npx tsx scripts/geo-monitoring/compare.ts \
 *     reports/geo-baseline-2026-04-26.json \
 *     reports/geo-after-2026-05-10.json
 */

import { readFileSync, writeFileSync } from "fs";
import type { QueryCategory } from "./queries";

interface MeasurementRun {
  runId: string;
  phase: "before" | "after";
  measuredAt: string;
  results: Array<{
    query: string;
    category: QueryCategory;
    primary: boolean;
    mentioned: boolean;
    mentionType: string;
    snippet: string;
  }>;
  summary: {
    total: number;
    mentioned: number;
    mentionRate: number;
    byCategory: Record<QueryCategory, { total: number; mentioned: number }>;
  };
}

function loadRun(path: string): MeasurementRun {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function compare(before: MeasurementRun, after: MeasurementRun): string {
  const delta = after.summary.mentionRate - before.summary.mentionRate;
  const deltaSign = delta >= 0 ? "+" : "";

  const categories: QueryCategory[] = ["location", "treatment", "condition", "general", "brand"];
  const categoryLabels: Record<QueryCategory, string> = {
    location: "지역 검색",
    treatment: "치료 키워드",
    condition: "암종별",
    general: "일반 한방암치료",
    brand: "브랜드",
  };

  const lines = [
    `# GEO Before vs After 비교 리포트`,
    ``,
    `| | Before | After | 변화 |`,
    `|--|--------|-------|------|`,
    `| 측정일 | ${before.measuredAt.slice(0, 10)} | ${after.measuredAt.slice(0, 10)} | — |`,
    `| 총 쿼리 | ${before.summary.total} | ${after.summary.total} | — |`,
    `| 언급 수 | ${before.summary.mentioned} | ${after.summary.mentioned} | ${deltaSign}${after.summary.mentioned - before.summary.mentioned} |`,
    `| **인용률** | **${before.summary.mentionRate}%** | **${after.summary.mentionRate}%** | **${deltaSign}${delta}%p** |`,
    ``,
    `## 카테고리별 비교`,
    ``,
    `| 카테고리 | Before | After | 변화 |`,
    `|---------|--------|-------|------|`,
    ...categories.map((cat) => {
      const b = before.summary.byCategory[cat];
      const a = after.summary.byCategory[cat];
      const bRate = b.total > 0 ? Math.round((b.mentioned / b.total) * 100) : 0;
      const aRate = a.total > 0 ? Math.round((a.mentioned / a.total) * 100) : 0;
      const d = aRate - bRate;
      return `| ${categoryLabels[cat]} | ${bRate}% | ${aRate}% | ${d >= 0 ? "+" : ""}${d}%p |`;
    }),
    ``,
    `## 새로 언급된 쿼리 (Before ❌ → After ✅)`,
    ``,
    ...after.results
      .filter((ar) => {
        const br = before.results.find((r) => r.query === ar.query);
        return ar.mentioned && br && !br.mentioned;
      })
      .map((r) => `- ${r.primary ? "⭐ " : ""}[${r.category}] **${r.query}**`),
    ``,
    `## 여전히 미언급 쿼리`,
    ``,
    ...after.results
      .filter((r) => !r.mentioned)
      .map((r) => `- ${r.primary ? "⭐ " : ""}[${r.category}] ${r.query}`),
  ];

  return lines.join("\n");
}

function main() {
  const [, , beforePath, afterPath] = process.argv;

  if (!beforePath || !afterPath) {
    console.log("사용법: npx tsx scripts/geo-monitoring/compare.ts <before.json> <after.json>");
    process.exit(1);
  }

  const before = loadRun(beforePath);
  const after = loadRun(afterPath);
  const report = compare(before, after);

  const outPath = `reports/geo-comparison-${after.measuredAt.slice(0, 10)}.md`;
  writeFileSync(outPath, report, "utf-8");
  console.log(`✅ 비교 리포트 저장: ${outPath}`);
  console.log(report);
}

main();
