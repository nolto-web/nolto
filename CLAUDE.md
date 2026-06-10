# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NOLTO is a static portfolio/LP site for AI-assisted web production services. It is hosted on Netlify at `https://friendly-toffee-1c8e33.netlify.app/`. There is no build step — edit files and deploy by uploading to Netlify manually.

## Architecture

Pure static HTML/CSS/JS. No npm, no bundler, no framework.

**Main site pages** (root level) share a single `style.css` and `script.js`:
- `index.html` — top page (hero, services overview, production records, sample LPs, pricing plans, FAQ)
- `records.html` — production records list
- `tools.html` — recommended tools
- `templates.html` — free template downloads
- `contact.html` — contact form (submits to Google Apps Script; plan pre-selected via `?plan=` query param)
- `privacy.html` — privacy policy

**Sample LPs** are self-contained subdirectories with their own `style.css` and `script.js`:
- `sample/` — construction company (工務店) sample LP
- `sample-relaxation/` — relaxation salon sample LP

**Ops dashboard** (`ops/`) is a standalone localStorage-based management tool. It does not share styles or scripts with the main site. Data is never sent to a server.

**Static assets:**
- `downloads/` — free template files (docx, pdf, xlsx, md)
- `images/` — OGP image

## CSS Design System

CSS custom properties are defined in `:root` in `style.css`:
```
--navy / --navy-dark / --navy-light: primary colors
--orange / --orange-dark: accent/CTA colors
--gray-bg / --gray-line / --gray-mid / --text / --text-muted: neutrals
--radius / --shadow / --shadow-lg / --ease: shared tokens
```

Japanese sans-serif font stack: `'Hiragino Kaku Gothic ProN'`, `'Hiragino Sans'`, `'Noto Sans JP'`, `'Yu Gothic Medium'`

## JavaScript Patterns (`script.js`)

Shared across all main-site pages. Four behaviors:
1. **FAQ accordion** — one-at-a-time open/close with `aria-expanded`
2. **Mobile hamburger menu** — `#hamburger` / `#mobileNav` with `is-open` class toggle
3. **Header scroll shadow** — `.header.scrolled` class added after 50px scroll
4. **Scroll-in animation** — `IntersectionObserver` adds `.in` to `.anim` elements at 0.12 threshold; elements listed explicitly in the selector array

## Contact Form

`contact.html` POSTs JSON to a Google Apps Script endpoint via `fetch` with `mode: "no-cors"`. The `GAS_ENDPOINT` constant is hardcoded in the page's inline `<script>`. Plan options can be pre-selected by linking to `contact.html?plan=<plan-name>`.

## Deployment

No CLI. Upload files directly to Netlify via the dashboard. `sitemap.xml` must be updated manually when adding new pages.

## Checklist

`checklist.md` at the root is a pre-publish checklist for LP deliverables (meta tags, OGP, links, performance, GitHub Pages publishing steps). It is not part of the site itself.

---

## LP Design Quality Rules

LPを制作・修正するときは、単なる実装者ではなくシニアWebデザイナー兼UI/UXデザイナーとして振る舞う。

### 基本方針

ありきたりなテンプレートLPではなく、ブランドの強み、顧客心理、視線誘導、余白、タイポグラフィ、CV導線まで設計した上で実装する。

### 必ず避けること

- 汎用的なSaaS風テンプレートに見えるデザイン
- 青系グラデーション、白いカード、角丸、薄い影だけに頼った構成
- 中央寄せのヒーローとCTAだけで済ませる構成
- 意味のないアイコンや装飾
- 単調なカードの羅列
- Tailwind CSSのデフォルト感が強い配色・余白・角丸・影
- どの会社にも使えそうな抽象的なコピー
- PCでは整っているがスマホで読みにくいレイアウト

### デザイン品質基準

- ファーストビューで「誰に、何を、なぜ選ぶべきか」が3秒で伝わること
- セクションごとに明確な役割を持たせること
- 余白、文字サイズ、行間、コントラストに明確な意図を持たせること
- CTAまでの導線を自然に設計すること
- 見出し、本文、ボタン、カード、フォームに視覚的な階層を作ること
- モバイルファーストで読みやすく設計すること
- ブランドらしさが伝わる配色・写真・質感・余白を使うこと
- アニメーションは意味のある箇所だけに控えめに使うこと

### 実装前に必ず考えること

コードを書く前に以下を整理してから実装する。

1. ターゲットユーザー
2. ユーザーの悩み
3. LPで一番伝えるべき訴求
4. ファーストビューの見せ方
5. セクション構成
6. CVへの導線
7. デザイントーン
8. 既視感を避けるための工夫

### レイアウト方針

- 8pxグリッドを基本にする
- セクションごとの余白にメリハリをつける
- 最大幅を適切に制御し、横に間延びさせない
- スマホでは1画面内の情報量を詰め込みすぎない
- CTAは目立たせるが、過度に派手にしない
- ファーストビュー→課題提起→解決策→実績→導入メリット→FAQ→CTAの流れを自然に設計する

### コピー方針

- 抽象的な表現を避ける
- ユーザーの悩みや欲求に直接刺さる言葉を使う
- 機能説明ではなく、得られる結果を伝える
- 見出しだけを読んでも価値が伝わるようにする
- 「選ばれる理由」「導入メリット」「よくある不安」を明確にする

### 実装後の自己レビュー

実装後、必ず以下の観点で自己レビューし、必要なら修正する。

- 量産型LPに見える箇所はないか
- ファーストビューだけで価値が伝わるか
- 余白、文字サイズ、行間、コントラストは適切か
- CTAへの流れは自然か
- スマホで読みやすいか
- ブランドらしさがあるか
- 不要な装飾がないか
- コンバージョンにつながる説得材料が足りているか
