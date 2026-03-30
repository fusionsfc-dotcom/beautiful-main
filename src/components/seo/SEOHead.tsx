import { Helmet } from "react-helmet-async";

type SEOHeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
};

const DEFAULTS = {
  title: "뷰티풀한방병원 | 국립암센터 인근 통합 암 면역 회복 전문",
  description:
    "수술·항암·방사선 치료 후 면역과 체력 회복을 돕는 뷰티풀한방병원입니다. 국립암센터 차량 15분, 양·한·치과 통합진료, 24시간 의료진 상주.",
  keywords:
    "암요양병원, 한방암치료, 면역암치료, 항암후관리, 암회복, 뷰티풀한방병원, 국립암센터근처병원, 통합암치료, 암환자재활",
  ogImage: "https://www.btful.co.kr/og-image.jpg",
} as const;

export default function SEOHead(props: SEOHeadProps) {
  const title = props.title ?? DEFAULTS.title;
  const description = props.description ?? DEFAULTS.description;
  const keywords = props.keywords ?? DEFAULTS.keywords;
  const ogImage = props.ogImage ?? DEFAULTS.ogImage;
  const ogUrl = props.ogUrl ?? "https://www.btful.co.kr/";
  const canonical = props.canonical ?? ogUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="뷰티풀한방병원" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="뷰티풀한방병원" />

      <meta name="naver-site-verification" content="NAVER_VERIFICATION_CODE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="theme-color" content="#e91e8c" />
    </Helmet>
  );
}

