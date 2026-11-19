import type { SVGProps } from "react";

type IconName = "folder" | "message" | "mail" | "eye" | "globe" | "user" | "arrow-up-right" | "arrow-right" | "arrow-up" | "arrow-down" | "close" | "plus" | "check" | "code" | "pause" | "play";

const paths: Record<IconName, string> = {
  folder: "M3 7V5h6l2 2h10v13H3Z",
  message: "M4 4h16v12H9l-5 4Z M8 8h8M8 12h5",
  mail: "M3 5h18v14H3Z m0 1 9 7 9-7",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c-5 5-5 13 0 18 5-5 5-13 0-18",
  user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-2a8 8 0 0 1 16 0v2",
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
