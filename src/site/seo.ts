export const siteName = "Eelex Code Hub";

export const defaultDescription = "一个关于代码、设计与学习的个人空间。";

export const siteUrl = new URL("https://harmonious-sprite-8b742a.netlify.app/");

export function createPageTitle(title: string) {
  return title === siteName ? siteName : `${title} | ${siteName}`;
}

export function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl);
}
