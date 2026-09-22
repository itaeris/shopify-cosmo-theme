# Aeris Beauté — Cosmo Theme

Shopify theme untuk store [Aeris Beauté](https://aerisbeaute.myshopify.com), berdasarkan **FoxEcom Zest 9.3.0** (Copy of Cosmo).

Theme remote yang dipakai untuk development:

- Store: `aerisbeaute.myshopify.com`
- Theme: **Copy of Cosmo** (`#150027960362`) — unpublished
- Preview: https://aerisbeaute.myshopify.com/?preview_theme_id=150027960362

Jangan push langsung ke theme live. Review dulu di Copy of Cosmo, baru publish dari admin Shopify.

## Stack

- Shopify CLI 4
- Node.js 18+
- Liquid, JSON templates, CSS

## Setup

```bash
npm install
```

Login ke akun Shopify yang punya akses store Aeris:

```bash
npx shopify auth login
```

Jalankan development server (sync live ke theme unpublished):

```bash
npx shopify theme dev --store aerisbeaute.myshopify.com --theme 150027960362
```

Atau pakai script:

```bash
npm run theme:dev
```

Storefront password-protected. CLI akan minta **store password** (bukan password akun Shopify).

Preview lokal: http://127.0.0.1:9292

## Perintah lain

```bash
# Tarik file terbaru dari theme remote
npm run theme:pull

# Upload file lokal ke theme remote
npm run theme:push
```

Store dan theme default ada di `shopify.theme.toml`.

## Struktur

```
assets/      # CSS, JS, gambar theme
config/      # settings_schema.json, settings_data.json
layout/      # theme.liquid, password.liquid
locales/     # terjemahan
sections/    # section homepage, header, footer
snippets/    # partial Liquid
templates/   # template halaman (index, product, collection, dll)
```

Homepage dirakit di `templates/index.json`. Section-nya ada di `sections/`.

## Custom Aeris

Bagian yang sudah dikustom:

| Area | File |
| --- | --- |
| Hero Merlot | `sections/aeris-merlot-hero.liquid` |
| Header + mega menu banner | `sections/header.liquid`, `snippets/site-nav.liquid` |
| Footer Aeris | `sections/aeris-footer.liquid` |
| Header group settings | `sections/header-group.json` |
| Footer group settings | `sections/footer-group.json` |

Hero copy campaign saat ini: **MERLOT** / Unlock Your True Power / Discover now.

Banner dropdown Shop All: **Ultra Luxurious Bristles** / MERLOT is now available / SHOP NOW.

## Alur kerja

1. `npm run theme:dev` — biarkan terminal ini tetap jalan
2. Edit file Liquid / JSON / CSS
3. Perubahan sync ke theme **Copy of Cosmo**
4. Cek desktop dan mobile di preview
5. Commit, lalu push ke GitHub
6. Publish theme dari admin Shopify hanya setelah disetujui

## Yang tidak di-commit

Sudah ada di `.gitignore`:

- `node_modules/`
- `.shopify-user/` — session login lokal
- `.shopify/`

Jangan commit password store, token Theme Access, atau file `.env`.
