export function getSafeContent(i18nContent = []) {
  return typeof i18nContent === 'object' ? Object.assign([], i18nContent) : [];
}
