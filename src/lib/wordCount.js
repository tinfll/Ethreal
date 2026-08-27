/**
 * Rough word count for mixed CJK/Latin text.
 * Counts each CJK character and each Latin word, ignoring markdown syntax.
 */
export function countWords(text) {
  const cleaned = String(text ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|=\-]/g, ' ');

  const cjk = cleaned.match(/[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/g)?.length ?? 0;
  const latin = cleaned.match(/[a-zA-Z0-9]+(?:['’\-][a-zA-Z0-9]+)*/g)?.length ?? 0;

  return cjk + latin;
}
