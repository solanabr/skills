import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// Build-time OG image generation (same idea as Next's ImageResponse, done
// statically): one shared brand template, satori → SVG, resvg → PNG.

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// This module runs bundled from dist/ at build time, so import.meta.url no
// longer points at src/ — resolve assets from the project root instead.
let fonts: { inter400: Buffer; inter600: Buffer; inter700: Buffer } | null =
  null;
const loadFonts = () => {
  if (!fonts) {
    const dir = join(process.cwd(), "src/assets/og");
    fonts = {
      inter400: readFileSync(join(dir, "inter-400.ttf")),
      inter600: readFileSync(join(dir, "inter-600.ttf")),
      inter700: readFileSync(join(dir, "inter-700.ttf")),
    };
  }
  return fonts;
};

// Solana mark as a self-contained SVG data URI — satori renders it as <img>,
// which keeps gradient defs intact.
const SOLANA_MARK_SVG = `<svg width="101" height="88" viewBox="0 0 101 88" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="8" y1="90" x2="95" y2="-3" gradientUnits="userSpaceOnUse"><stop offset="0.08" stop-color="#9945FF"/><stop offset="0.3" stop-color="#8752F3"/><stop offset="0.5" stop-color="#5497D5"/><stop offset="0.6" stop-color="#43B4CA"/><stop offset="0.72" stop-color="#28E0B9"/><stop offset="0.97" stop-color="#19FB9B"/></linearGradient></defs><path fill="url(#g)" d="M100.48 69.3817L83.8068 86.8015C83.4444 87.1799 83.0058 87.4816 82.5185 87.6878C82.0312 87.894 81.5055 88.0003 80.9743 88H1.93563C1.55849 88 1.18957 87.8926 0.874202 87.6912C0.558829 87.4897 0.31074 87.2029 0.160416 86.8659C0.0100923 86.529 -0.0359181 86.1566 0.0280382 85.7945C0.0919944 85.4324 0.263131 85.0964 0.520422 84.8278L17.2061 67.408C17.5676 67.0306 18.0047 66.7295 18.4904 66.5234C18.9762 66.3172 19.5002 66.2104 20.0301 66.2095H99.0644C99.4415 66.2095 99.8104 66.3169 100.126 66.5183C100.441 66.7198 100.689 67.0067 100.84 67.3436C100.99 67.6806 101.036 68.0529 100.972 68.415C100.908 68.7771 100.737 69.1131 100.48 69.3817ZM83.8068 34.3032C83.4444 33.9248 83.0058 33.6231 82.5185 33.4169C82.0312 33.2108 81.5055 33.1045 80.9743 33.1048H1.93563C1.55849 33.1048 1.18957 33.2121 0.874202 33.4136C0.558829 33.615 0.31074 33.9019 0.160416 34.2388C0.0100923 34.5758 -0.0359181 34.9482 0.0280382 35.3103C0.0919944 35.6723 0.263131 36.0083 0.520422 36.277L17.2061 53.6968C17.5676 54.0742 18.0047 54.3752 18.4904 54.5814C18.9762 54.7876 19.5002 54.8944 20.0301 54.8952H99.0644C99.4415 54.8952 99.8104 54.7879 100.126 54.5864C100.441 54.385 100.689 54.0981 100.84 53.7612C100.99 53.4242 101.036 53.0518 100.972 52.6897C100.908 52.3277 100.737 51.9917 100.48 51.723L83.8068 34.3032ZM1.93563 21.7905H80.9743C81.5055 21.7908 82.0312 21.6845 82.5185 21.4783C83.0058 21.2721 83.4444 20.9705 83.8068 20.592L100.48 3.17219C100.737 2.90357 100.908 2.56758 100.972 2.2055C101.036 1.84342 100.99 1.47103 100.84 1.13408C100.689 0.797123 100.441 0.510264 100.126 0.308814C99.8104 0.107363 99.4415 4.68306e-05 99.0644 0L20.0301 0C19.5002 0.000858433 18.9762 0.107673 18.4904 0.313848C18.0047 0.520022 17.5676 0.821087 17.2061 1.19845L0.524723 18.6183C0.267681 18.8866 0.0966198 19.2223 0.0325185 19.5839C-0.0315827 19.9456 0.0140624 20.3177 0.163856 20.6545C0.31365 20.9913 0.561081 21.2782 0.875804 21.4799C1.19053 21.6817 1.55886 21.7896 1.93563 21.7905Z"/></svg>`;
const SOLANA_MARK_URI = `data:image/svg+xml;base64,${Buffer.from(SOLANA_MARK_SVG).toString("base64")}`;

/** Read a repo logo from public/logos as a data URI (null if unavailable). */
export function logoDataUri(
  logoPath: string | null | undefined,
): string | null {
  if (!logoPath) return null;
  try {
    const buf = readFileSync(join(process.cwd(), "public", logoPath));
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

type El = { type: string; props: Record<string, unknown> };
const h = (
  type: string,
  props: Record<string, unknown> = {},
  ...children: (El | string | null)[]
): El => {
  const kids = children.filter(Boolean);
  const merged: Record<string, unknown> = { ...props };
  if (kids.length > 0) merged.children = kids.length === 1 ? kids[0] : kids;
  return { type, props: merged };
};

export interface OgSpec {
  title: string;
  subtitle?: string | null;
  /** Small chip above the title, e.g. "Official" or the vendor name. */
  badge?: string | null;
  /** Second muted chip next to the badge, e.g. the repo slug. */
  badge2?: string | null;
  /** Shown in the bottom bar: kit.superteam.codes<path>. */
  path?: string;
  /** Vendor logo data URI (use logoDataUri()). */
  logo?: string | null;
}

const clamp = (s: string, n: number) =>
  s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s;

export async function renderOgPng(spec: OgSpec): Promise<Buffer> {
  const title = clamp(spec.title, 64);
  const subtitle = spec.subtitle ? clamp(spec.subtitle, 170) : null;
  const displayUrl = `kit.superteam.codes${spec.path ?? ""}`;

  const tree = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000000",
        backgroundImage:
          "radial-gradient(55% 70% at 82% 0%, rgba(20, 241, 149, 0.10), rgba(0,0,0,0) 60%), radial-gradient(50% 80% at 8% 0%, rgba(153, 69, 255, 0.16), rgba(0,0,0,0) 60%)",
        position: "relative",
        fontFamily: "Inter",
      },
    },
    // Top accent bar — the Solana gradient
    h("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 14,
        background:
          "linear-gradient(90deg, #9945ff 0%, #8752f3 25%, #5497d5 50%, #43b4ca 60%, #28e0b9 72%, #19fb9b 97%)",
      },
    }),
    // Decorative oversized mark, right side
    h("img", {
      src: SOLANA_MARK_URI,
      width: 520,
      height: 453,
      style: {
        position: "absolute",
        right: -120,
        bottom: -140,
        opacity: 0.07,
      },
    }),
    // Header: mark + wordmark
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "56px 80px 0 80px",
        },
      },
      h("img", { src: SOLANA_MARK_URI, width: 42, height: 37 }),
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          },
        },
        "Solana Skills",
      ),
    ),
    // Main content
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: "0 80px",
        },
      },
      spec.badge || spec.logo
        ? h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 26,
              },
            },
            spec.logo
              ? h("img", {
                  src: spec.logo,
                  width: 44,
                  height: 44,
                  style: { borderRadius: 10 },
                })
              : null,
            spec.badge
              ? h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#14f195",
                      border: "1.5px solid rgba(20, 241, 149, 0.45)",
                      borderRadius: 999,
                      padding: "6px 20px",
                      backgroundColor: "rgba(20, 241, 149, 0.08)",
                    },
                  },
                  spec.badge,
                )
              : null,
            spec.badge2
              ? h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      fontSize: 22,
                      color: "#85859a",
                      border: "1.5px solid rgba(255, 255, 255, 0.18)",
                      borderRadius: 999,
                      padding: "6px 20px",
                    },
                  },
                  spec.badge2,
                )
              : null,
          )
        : null,
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: title.length > 26 ? 62 : 78,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            marginBottom: subtitle ? 24 : 0,
            maxWidth: 940,
          },
        },
        title,
      ),
      subtitle
        ? h(
            "div",
            {
              style: {
                display: "flex",
                fontSize: 28,
                fontWeight: 400,
                color: "#b8b8c8",
                lineHeight: 1.45,
                maxWidth: 860,
              },
            },
            subtitle,
          )
        : null,
    ),
    // Bottom bar: URL + accent dot
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px 48px 80px",
        },
      },
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 26,
            color: "#85859a",
            letterSpacing: "0.01em",
          },
        },
        displayUrl,
      ),
      h("div", {
        style: {
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: "#14f195",
        },
      }),
    ),
  );

  const { inter400, inter600, inter700 } = loadFonts();
  const svg = await satori(tree as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: "Inter", data: inter400, weight: 400, style: "normal" },
      { name: "Inter", data: inter600, weight: 600, style: "normal" },
      { name: "Inter", data: inter700, weight: 700, style: "normal" },
    ],
  });
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
  }).render();
  return Buffer.from(png.asPng());
}
