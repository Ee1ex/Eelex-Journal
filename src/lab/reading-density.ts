export const densityOptions = [
  {
    value: "compact",
    label: "紧凑",
    description: "让信息更集中，适合快速浏览。",
  },
  {
    value: "comfortable",
    label: "舒适",
    description: "在阅读节奏和信息密度之间取得平衡。",
  },
  {
    value: "relaxed",
    label: "宽松",
    description: "留出更充裕的呼吸感，适合慢读。",
  },
] as const;

export type ReadingDensity = (typeof densityOptions)[number]["value"];

export const defaultDensity = "comfortable" satisfies ReadingDensity;

const previewClasses: Record<ReadingDensity, string> = {
  compact: "space-y-2 leading-6",
  comfortable: "space-y-4 leading-7",
  relaxed: "space-y-6 leading-8",
};

export function getDensityPreviewClass(density: ReadingDensity): string {
  return previewClasses[density];
}
