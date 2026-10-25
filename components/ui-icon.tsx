import type { SVGProps } from "react";

type IconName = "arrow-up-right" | "arrow-right" | "arrow-up" | "arrow-down" | "close" | "plus" | "check" | "code" | "pause" | "play";

const paths: Record<IconName, string> = {
  pause: "M9 5v14M15 5v14",
  play: "m8 5 11 7-11 7Z",
  "arrow-up-right": "M6 18 18 6M6 6h12v12",
  "arrow-right": "M4 12h16m-6-6 6 6-6 6",
  "arrow-up": "M12 20V4m-6 6 6-6 6 6",
  "arrow-down": "M12 4v16m-6-6 6 6 6-6",
  close: "m6 6 12 12M6 18 18 6",
  plus: "M12 5v14M5 12h14",
  check: "m5 12 4 4L19 6",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18",
};

export function UiIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={paths[name]} /></svg>;
}
