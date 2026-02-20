# Comfy-PR Brand Colors

Consistent color palette for all video materials.

## Primary Colors

```
Background (Dark)   : #0d1117  (GitHub dark)
Background (Medium) : #1a1a2e  (Slate dark)
Background (Light)  : #161b22  (Card bg)
```

## Accent Colors

```
Primary Orange      : #ff9900  (Main brand color)
Secondary Yellow    : #ffcc00  (Gradient accent)
Success Green       : #27c93f  (Positive actions)
Error Red           : #ff5f56  (Warnings/problems)
Info Blue           : #0366d6  (Links/info)
Purple              : #8b5cf6  (Dashboard highlights)
```

## Text Colors

```
Primary Text        : #ffffff  (Headings)
Secondary Text      : #c9d1d9  (Body text)
Muted Text          : #8b949e  (Labels, metadata)
Code Text           : #ff9900  (Inline code)
```

## Usage

- **Hero sections**: Orange gradient (#ff9900 → #ffcc00)
- **Problem states**: Red backgrounds with white text
- **Solution states**: Green accents with dark backgrounds
- **Code/Terminal**: Dark bg (#0d1117) + orange highlights
- **Dashboard UI**: Purple accents for stats, blue for links

## Tailwind Classes

```html
<div class="bg-[#0d1117] text-white">
  <h1 class="text-[#ff9900]">Comfy-PR</h1>
  <code class="text-[#ff9900] bg-[#161b22]">bunx comfy-pr</code>
</div>
```
