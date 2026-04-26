#!/usr/bin/env tsx
/**
 * GEO 모니터링 — Claude API로 뷰티풀한방병원 인용 측정
 *
 * 사용법:
 *   npm run geo:monitor          # 실제 측정 (API 30회 호출)
 *   npm run geo:dry-run          # dry-run (API 호출 없음, 흐름 시뮬레이션)
 */

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { QUERIES, TARGET_HOSPITAL, type QueryCategory } from "./queries.js";

// ─── 환경 변수 로드 (.env.local) ────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../../.env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (key && !process.env[key]) process.env[key] = val;
  }
} catch {
  // .env.local 없으면 환경변수에서 직접 읽음
}

// ─── 설정 ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://pzivoxyngofrrpdjramu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6aXZveHluZ29mcnJwZGpyYW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODIzMjksImV4cCI6MjA4ODE1ODMyOX0.RCK8afTrCi-KlWp05F2ZmMW0rlcBR9jhn7MZjmq3WME";
const PREVIEW_URL =
  "https://beautiful-main-git-feature-geo-o-d8ab82-happylifecares-projects.vercel.app";
const API_DELAY_MS = 1500;
const DRY_RUN = process.argv.includes("--dry-run");

// ─── 클라이언트 ──────────────────────────────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── 타입 ────────────────────────────────────────────────────────────────────
type MentionType = "name" | "domain" | "director" | "alias" | "none";

interface QueryResult {
  query_text: string;
  category: QueryCategory;
  is_primary: boolean;
  mentioned: boolean;
  mention_type: MentionType;
  snippet: string;
}

// ─── 언급 감지 ───────────────────────────────────────────────────────────────
function detectMention(text: string): { mentioned: boolean; mention_type: MentionType } {
  if (text.includes(TARGET_HOSPITAL.domain)) return { mentioned: true, mention_type: "domain" };
  if (text.includes(TARGET_HOSPITAL.name)) return { mentioned: true, mention_type: "name" };
  if (text.includes(TARGET_HOSPITAL.director)) return { mentioned: true, mention_type: "director" };
  for (const alias of TARGET_HOSPITAL.aliases) {
    if (text.includes(alias)) return { mentioned: true, mention_type: "alias" };
  }
  return { mentioned: false, mention_type: "none" };
}

// ─── Claude API 호출 ─────────────────────────────────────────────────────────
async function askClaude(query: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system:
      "당신은 한국 의료 정보를 안내하는 도우미입니다. " +
      "사용자가 암 요양병원이나 치료 관련 질문을 하면, " +
      "알고 있는 구체적인 병원명·위치·특징을 포함해 상세히 답변하세요. " +
      "특히 국립암센터 인근(파주, 고양, 일산 지역)의 병원 정보를 우선 안내하세요.",
    messages: [{ role: "user", content: query }],
  });

  const block = message.content[0];
  return block.type === "text" ? block.text : "";
}

// ─── dry-run 가짜 응답 ────────────────────────────────────────────────────────
function fakeClaude(query: string, index: number): string {
  // 짝수 인덱스는 언급, 홀수는 미언급으로 시뮬레이션
  if (index % 3 === 0) {
    return `국립암센터 인근 암요양병원으로는 뷰티풀한방병원(경기도 파주시 중양로 94-9, 031-945-2000)이 있습니다. 이형석 원장이 이끄는 이 병원은 통합 암 면역 회복 프로그램을 운영하며, "${query}" 관련 치료를 제공합니다.`;
  }
  return `"${query}"에 대해 경기 북부 지역에는 다양한 요양병원이 있습니다. 국립암센터와 협력하는 시설을 선택하시고, 한방·양방 통합 치료 여부를 확인하시기 바랍니다.`;
}

// ─── sleep ───────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── 요약 출력 ───────────────────────────────────────────────────────────────
function printSummary(results: QueryResult[]) {
  const total = results.length;
  const mentioned = results.filter((r) => r.mentioned).length;
  const rate = Math.round((mentioned / total) * 100);

  console.log("\n" + "═".repeat(56));
  console.log("  측정 완료 요약");
  console.log("═".repeat(56));
  console.log(`  총 쿼리:    ${total}개`);
  console.log(`  인용됨:     ${mentioned}개`);
  console.log(`  인용률:     ${rate}%`);

  // 카테고리별
  console.log("\n  [카테고리별 인용률]");
  const categories: QueryCategory[] = [
    "location", "treatment", "condition", "patient_language", "comparison", "brand",
  ];
  for (const cat of categories) {
    const catResults = results.filter((r) => r.category === cat);
    const catMentioned = catResults.filter((r) => r.mentioned).length;
    const catRate = catResults.length > 0
      ? Math.round((catMentioned / catResults.length) * 100)
      : 0;
    const bar = "█".repeat(Math.round(catRate / 10)) + "░".repeat(10 - Math.round(catRate / 10));
    console.log(`  ${cat.padEnd(18)} ${bar} ${catMentioned}/${catResults.length} (${catRate}%)`);
  }

  // mention_type별 분포
  console.log("\n  [인용 유형 분포]");
  const types: MentionType[] = ["name", "alias", "domain", "director", "none"];
  for (const t of types) {
    const count = results.filter((r) => r.mention_type === t).length;
    console.log(`  ${t.padEnd(10)} ${count}개`);
  }
  console.log("═".repeat(56) + "\n");
}

// ─── 메인 ────────────────────────────────────────────────────────────────────
async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!DRY_RUN && (!apiKey || !apiKey.startsWith("sk-"))) {
    console.error("❌ ANTHROPIC_API_KEY 가 설정되지 않았습니다. .env.local 확인");
    process.exit(1);
  }

  const now = new Date();
  const hhmm = now.toTimeString().slice(0, 5).replace(":", "");
  const dateStr = now.toISOString().slice(0, 10);
  const runId = `run_baseline_${dateStr}_${hhmm}`;

  console.log(DRY_RUN ? "\n🧪 DRY-RUN 모드" : "\n🔍 GEO 측정 시작");
  console.log(`   run_id : ${runId}`);
  console.log(`   phase  : before`);
  console.log(`   쿼리 수: ${QUERIES.length}개`);
  console.log(`   엔진   : claude-sonnet-4-5`);
  if (DRY_RUN) console.log("   ※ API 실제 호출 없음 — 가짜 응답으로 흐름 시뮬레이션\n");
  else console.log();

  // 1. run 생성
  if (!DRY_RUN) {
    const { error } = await supabase.from("geo_monitoring_runs").insert({
      run_id: runId,
      phase: "before",
      preview_url: PREVIEW_URL,
      measured_at: now.toISOString(),
    });
    if (error) {
      console.error("❌ run 생성 실패:", error.message);
      process.exit(1);
    }
    console.log("✅ geo_monitoring_runs 레코드 생성\n");
  } else {
    console.log("  [dry] geo_monitoring_runs INSERT 시뮬레이션\n");
  }

  // 2. 쿼리별 측정
  const results: QueryResult[] = [];

  for (let i = 0; i < QUERIES.length; i++) {
    const q = QUERIES[i];
    const label = `[${String(i + 1).padStart(2, "0")}/${QUERIES.length}]`;

    let responseText = "";
    try {
      if (DRY_RUN) {
        responseText = fakeClaude(q.text, i);
        await sleep(80);
      } else {
        responseText = await askClaude(q.text);
        await sleep(API_DELAY_MS);
      }
    } catch (err) {
      console.warn(`  ${label} ⚠️  API 오류, 1회 재시도...`);
      try {
        await sleep(3000);
        responseText = DRY_RUN ? fakeClaude(q.text, i) : await askClaude(q.text);
      } catch {
        console.warn(`  ${label} ❌ 재시도 실패, skip`);
        results.push({
          query_text: q.text,
          category: q.category,
          is_primary: "primary" in q ? Boolean(q.primary) : false,
          mentioned: false,
          mention_type: "none",
          snippet: "[API 오류]",
        });
        continue;
      }
    }

    const { mentioned, mention_type } = detectMention(responseText);
    const snippet = responseText.slice(0, 300);
    const icon = mentioned ? "✅" : "❌";

    console.log(
      `  ${label} ${q.text.slice(0, 28).padEnd(28)} → ${icon}${mentioned ? ` ${mention_type}` : ""}`
    );

    const result: QueryResult = {
      query_text: q.text,
      category: q.category,
      is_primary: "primary" in q ? Boolean(q.primary) : false,
      mentioned,
      mention_type,
      snippet,
    };
    results.push(result);

    if (!DRY_RUN) {
      const { error } = await supabase.from("geo_monitoring_results").insert({
        run_id: runId,
        query_text: q.text,
        category: q.category,
        is_primary: result.is_primary,
        ai_engine: "claude",
        mentioned,
        mention_type,
        snippet,
        measured_at: new Date().toISOString(),
      });
      if (error) console.warn(`    ⚠️  DB INSERT 실패: ${error.message}`);
    } else {
      console.log(`    [dry] geo_monitoring_results INSERT 시뮬레이션`);
    }
  }

  // 3. 요약
  printSummary(results);

  if (DRY_RUN) {
    console.log("  ✅ dry-run 완료 — 실제 API/DB 변경 없음");
    console.log("  실제 측정: npm run geo:monitor\n");
  } else {
    console.log(`  ✅ 측정 완료. Supabase run_id: ${runId}\n`);
  }
}

main().catch((err) => {
  console.error("❌ 오류:", err);
  process.exit(1);
});
