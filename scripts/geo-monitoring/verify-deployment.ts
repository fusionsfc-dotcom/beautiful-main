#!/usr/bin/env tsx
/**
 * 배포 검증 스크립트 — prerender 적용 확인
 *
 * 사용법:
 *   npm run geo:verify https://btful-git-feature-geo-...vercel.app
 *   npm run geo:verify https://btful.co.kr
 */

import { execSync } from "child_process";

// ─── 설정 ────────────────────────────────────────────────────────────────────
const BASE_URL = process.argv[2];

if (!BASE_URL) {
  console.error("❌ 사용법: npm run geo:verify <URL>");
  console.error("   예시: npm run geo:verify https://btful.co.kr");
  process.exit(1);
}

const ROUTES = [
  { path: "/",                                    keywords: ["뷰티풀한방병원", "암요양병원"],         label: "홈" },
  { path: "/clinics",                             keywords: ["클리닉", "암케어"],                   label: "클리닉 목록" },
  { path: "/clinics/beautiful-cancer-care",       keywords: ["뷰티풀 암케어", "면역"],               label: "뷰티풀 암케어" },
  { path: "/clinics/cancer-specific-care",        keywords: ["암별", "유방암"],                     label: "암별 집중케어" },
  { path: "/clinics/post-surgery-recovery",       keywords: ["수술", "회복"],                      label: "수술 후 회복" },
  { path: "/clinics/chemotherapy-care",           keywords: ["항암", "부작용"],                     label: "항암 케어" },
  { path: "/clinics/radiation-care",              keywords: ["방사선", "치료"],                     label: "방사선 케어" },
  { path: "/facilities",                          keywords: ["치료환경", "입원"],                   label: "치료환경" },
  { path: "/columns",                             keywords: ["칼럼", "뷰티풀이야기"],               label: "뷰티풀이야기" },
  { path: "/cases",                               keywords: ["치료사례", "사례"],                   label: "치료사례" },
  { path: "/about",                               keywords: ["병원소개", "이형석"],                 label: "병원소개" },
  { path: "/reservation",                         keywords: ["예약", "상담"],                      label: "예약·상담" },
  { path: "/health-check",                        keywords: ["건강", "체크"],                      label: "건강체크" },
];

const AI_BOTS = [
  { name: "ClaudeBot",     ua: "ClaudeBot/1.0" },
  { name: "GPTBot",        ua: "GPTBot/1.0" },
  { name: "PerplexityBot", ua: "PerplexityBot/1.0" },
];

const MIN_CONTENT_BYTES = 500;

// ─── 타입 ────────────────────────────────────────────────────────────────────
interface RouteResult {
  path: string;
  label: string;
  sizeBytes: number;
  hasTitle: boolean;
  hasMeta: boolean;
  hasJsonLd: boolean;
  keywordsFound: string[];
  keywordsMissing: string[];
  pass: boolean;
}

// ─── curl 실행 ───────────────────────────────────────────────────────────────
function fetchWithBot(url: string, ua: string): string {
  try {
    return execSync(
      `curl -s -A "${ua}" --max-time 15 --location "${url}"`,
      { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 }
    );
  } catch {
    return "";
  }
}

// ─── 단일 라우트 검증 ──────────────────────────────────────────────────────
function verifyRoute(path: string, html: string, keywords: string[], label: string): RouteResult {
  const sizeBytes = Buffer.byteLength(html, "utf-8");
  const hasTitle = /<title>[^<]{5,}<\/title>/i.test(html);
  const hasMeta = /meta name="description"/i.test(html);
  const hasJsonLd = /"@type"\s*:/.test(html);
  const keywordsFound = keywords.filter((k) => html.includes(k));
  const keywordsMissing = keywords.filter((k) => !html.includes(k));

  const pass =
    sizeBytes >= MIN_CONTENT_BYTES &&
    hasTitle &&
    hasMeta &&
    keywordsFound.length > 0;

  return { path, label, sizeBytes, hasTitle, hasMeta, hasJsonLd, keywordsFound, keywordsMissing, pass };
}

// ─── 결과 출력 ───────────────────────────────────────────────────────────────
function printResults(botName: string, results: RouteResult[]) {
  const passed = results.filter((r) => r.pass).length;
  const total = results.length;
  const allPass = passed === total;

  console.log(`\n${"─".repeat(72)}`);
  console.log(`  ${botName} — ${passed}/${total} 통과 ${allPass ? "✅" : "⚠️"}`);
  console.log("─".repeat(72));
  console.log(
    `  ${"라우트".padEnd(32)} ${"크기".padStart(7)} ${"title".padEnd(6)} ${"meta".padEnd(6)} ${"JSON-LD".padEnd(8)} 결과`
  );
  console.log("─".repeat(72));

  for (const r of results) {
    const size = `${Math.round(r.sizeBytes / 1024)}KB`.padStart(7);
    const title = r.hasTitle ? "✅" : "❌";
    const meta = r.hasMeta ? "✅" : "❌";
    const jsonld = r.hasJsonLd ? "✅" : "❌";
    const result = r.pass ? "✅ PASS" : "❌ FAIL";
    console.log(`  ${(r.label + " " + r.path).slice(0, 32).padEnd(32)} ${size}  ${title.padEnd(6)} ${meta.padEnd(6)} ${jsonld.padEnd(8)} ${result}`);
    if (r.keywordsMissing.length > 0) {
      console.log(`    누락 키워드: ${r.keywordsMissing.join(", ")}`);
    }
  }
}

// ─── 인증 페이지 노출 차단 확인 ──────────────────────────────────────────────
function checkForbiddenPages(baseUrl: string, botUa: string): void {
  const forbidden = ["/admin", "/my-consultations", "/my-results", "/my-reports"];
  console.log("\n  [보안 확인] 인증 페이지 prerender 차단");
  for (const path of forbidden) {
    const html = fetchWithBot(`${baseUrl}${path}`, botUa);
    // prerender됐다면 고유 키워드가 있을 것. SPA fallback이면 앱 셸만 있음
    const isPrerendered = html.includes("내 상담") || html.includes("내 검사") || html.includes("관리자");
    if (isPrerendered) {
      console.log(`  ⚠️  ${path} — 콘텐츠 노출 가능성 확인 필요`);
    } else {
      console.log(`  ✅ ${path} — SPA 셸만 반환 (정상)`);
    }
  }
}

// ─── 메인 ────────────────────────────────────────────────────────────────────
async function main() {
  const url = BASE_URL.replace(/\/$/, "");
  console.log(`\n🔍 배포 검증 시작`);
  console.log(`   대상 URL: ${url}`);
  console.log(`   라우트: ${ROUTES.length}개`);
  console.log(`   봇 에이전트: ${AI_BOTS.map((b) => b.name).join(", ")}`);
  console.log(`   최소 콘텐츠: ${MIN_CONTENT_BYTES}B\n`);

  // 첫 번째 봇(ClaudeBot)으로 전체 라우트 검증
  const primaryBot = AI_BOTS[0];
  console.log(`  📡 ${primaryBot.name} 전체 라우트 검증 중...`);

  const results: RouteResult[] = [];
  for (const route of ROUTES) {
    process.stdout.write(`    ${route.path} ...`);
    const html = fetchWithBot(`${url}${route.path}`, primaryBot.ua);
    const result = verifyRoute(route.path, html, route.keywords, route.label);
    results.push(result);
    console.log(result.pass ? " ✅" : " ❌");
  }

  printResults(primaryBot.name, results);

  // 나머지 봇은 홈페이지만 빠르게 확인
  console.log(`\n  📡 GPTBot / PerplexityBot — 홈페이지 샘플 확인`);
  for (const bot of AI_BOTS.slice(1)) {
    const html = fetchWithBot(`${url}/`, bot.ua);
    const result = verifyRoute("/", html, ["뷰티풀한방병원", "암요양병원"], "홈");
    console.log(`  ${bot.name.padEnd(16)} ${result.pass ? "✅ PASS" : "❌ FAIL"} (${Math.round(result.sizeBytes / 1024)}KB)`);
  }

  // 보안 확인
  checkForbiddenPages(url, primaryBot.ua);

  // 최종 요약
  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass);
  console.log(`\n${"═".repeat(72)}`);
  console.log(`  최종 결과: ${passed}/${ROUTES.length} 통과`);
  if (failed.length > 0) {
    console.log(`  실패 라우트:`);
    failed.forEach((r) => console.log(`    ❌ ${r.path}`));
  } else {
    console.log(`  🎉 모든 라우트 검증 통과 — 프리뷰 배포 준비 완료`);
  }
  console.log("═".repeat(72) + "\n");

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("❌ 오류:", err);
  process.exit(1);
});
