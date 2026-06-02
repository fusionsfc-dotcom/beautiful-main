const IMAGE_MD_REGEX = /!\[[^\]]*\]\(([^)]+)\)/g;

/** 저장된 본문·썸네일에서 텍스트와 이미지 URL 목록 분리 */
export function parseCaseContent(
  content: string,
  thumbnail: string | null | undefined,
): { text: string; images: string[] } {
  const images: string[] = [];
  if (thumbnail?.trim()) {
    images.push(thumbnail.trim());
  }

  const found: string[] = [];
  let match: RegExpExecArray | null;
  const regex = new RegExp(IMAGE_MD_REGEX.source, "g");
  while ((match = regex.exec(content)) !== null) {
    found.push(match[1]);
  }
  for (const url of found) {
    if (!images.includes(url)) {
      images.push(url);
    }
  }

  const text = content.replace(IMAGE_MD_REGEX, "").trim();
  return { text, images };
}

/** 본문 + 이미지 URL → DB content 필드 */
export function buildCaseContent(text: string, imageUrls: string[]): string {
  const trimmed = text.trim();
  const imageBlock = imageUrls
    .map((url, i) => `![이미지 ${i + 1}](${url})`)
    .join("\n\n");
  if (!imageBlock) return trimmed;
  if (!trimmed) return imageBlock;
  return `${trimmed}\n\n${imageBlock}`;
}
