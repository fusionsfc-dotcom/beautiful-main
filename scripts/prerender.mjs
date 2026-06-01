/**
 * 프리렌더링 스크립트
 *
 * vite build 후 실행되어, 주요 공개 페이지를 Puppeteer로 방문하고
 * 렌더링된 HTML을 정적 파일로 저장합니다.
 *
 * AI 크롤러(GPTBot, PerplexityBot 등)가 JavaScript 실행 없이도
 * 페이지 콘텐츠와 JSON-LD 구조화 데이터를 읽을 수 있게 합니다.
 */

import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, "../dist");

// 프리렌더링 대상 경로 (총 13개)
// ⚠️ 절대 추가 금지: /my-consultations, /my-results, /my-reports, /admin
const ROUTES = [
  // 정적 페이지 (8개)
  "/",
  "/clinics",
  "/facilities",
  "/columns",
  "/cases",
  "/about",
  "/reservation",
  "/health-check",
  // 클리닉 상세 (5개) — ClinicDetail.tsx 실제 ID 기준 (2026-04-26 확인)
  "/clinics/beautiful-cancer-care",
  "/clinics/cancer-specific-care",
  "/clinics/post-surgery-recovery",
  "/clinics/chemotherapy-care",
  "/clinics/radiation-care",
];

// 렌더링 대기 시간 (ms)
// React 렌더링 + Supabase 데이터 로딩(notices, columns, faq 등) 대기
const RENDER_WAIT = 4000;

async function startServer(port) {
  const fallbackHtml = readFileSync(resolve(DIST_DIR, "index.html"), "utf-8");

  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${port}`);
      let filePath = resolve(DIST_DIR, url.pathname.slice(1));

      // 파일이 존재하고 디렉토리가 아니면 정적 파일 서빙
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = filePath.split(".").pop();
        const mimeTypes = {
          html: "text/html",
          js: "application/javascript",
          css: "text/css",
          json: "application/json",
          png: "image/png",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          svg: "image/svg+xml",
        };
        res.writeHead(200, {
          "Content-Type": mimeTypes[ext] || "application/octet-stream",
        });
        res.end(readFileSync(filePath));
        return;
      }

      // SPA 폴백: index.html 반환
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fallbackHtml);
    });

    server.listen(port, () => {
      console.log(`  서버 시작: http://localhost:${port}`);
      resolvePromise(server);
    });
  });
}

async function prerender() {
  console.log("\n=== 프리렌더링 시작 ===\n");

  const PORT = 4173;
  const server = await startServer(PORT);

  let browser;
  try {
    const puppeteer = await import("puppeteer");
    browser = await puppeteer.default.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const route of ROUTES) {
      const page = await browser.newPage();

      // 불필요한 리소스 차단 (이미지, 폰트 등 - 스키마/텍스트만 필요)
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const type = req.resourceType();
        if (["image", "font", "media"].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      const url = `http://localhost:${PORT}${route}`;
      console.log(`  렌더링 중: ${route}`);

      await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
      // React 렌더링 + Helmet 메타태그 적용 대기
      await new Promise((r) => setTimeout(r, RENDER_WAIT));

      const html = await page.content();

      // 파일 저장 경로 결정
      const outputPath =
        route === "/"
          ? resolve(DIST_DIR, "index.html")
          : resolve(DIST_DIR, `${route.slice(1)}/index.html`);

      const outputDir = dirname(outputPath);
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      writeFileSync(outputPath, html, "utf-8");
      console.log(`    -> ${outputPath.replace(DIST_DIR, "dist")}`);

      await page.close();
    }

    console.log(`\n  ${ROUTES.length}개 페이지 프리렌더링 완료\n`);
  } catch (error) {
    console.error("프리렌더링 오류:", error.message);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

prerender();
