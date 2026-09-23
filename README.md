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

## Setup di device baru

Prasyarat:

- Node.js 18+ (`node -v`)
- npm (`npm -v`)
- Git
- Akses staff ke store `aerisbeaute.myshopify.com`

CLI Shopify di-install **lokal di project** (`npx`), tidak perlu `npm install -g`. Session login disimpan di `.shopify-user/` (sudah di-gitignore), bukan di home user OS — supaya tidak bentrok permission di WSL/Linux.

### 1. Clone dan install

```bash
git clone <repo-url>
cd shopify-cosmo
npm install
```

### 2. Login Shopify (sekali per device)

Pakai `HOME` ke folder project supaya token CLI tidak ditulis ke `~/.config`:

```bash
# macOS / Linux / WSL
mkdir -p .shopify-user
HOME="$PWD/.shopify-user" npx shopify auth login
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path .shopify-user
$env:HOME = "$PWD\.shopify-user"
npx shopify auth login
```

Login dengan akun yang punya akses Aeris. Browser akan terbuka untuk authorize.

### 3. Jalankan localhost

```bash
# macOS / Linux / WSL
HOME="$PWD/.shopify-user" npx shopify theme dev --store aerisbeaute.myshopify.com --theme 150027960362
```

Windows PowerShell:

```powershell
$env:HOME = "$PWD\.shopify-user"
npx shopify theme dev --store aerisbeaute.myshopify.com --theme 150027960362
```

Storefront password-protected. CLI akan minta **store password** (bukan password akun Shopify).

Preview: [http://127.0.0.1:9292](http://127.0.0.1:9292)

Kalau 9292 kepakai, CLI naik ke 9293. Jangan publish — command ini sync ke theme **Copy of Cosmo** unpublished.

Biarkan terminal ini tetap jalan saat edit. File Liquid/JSON/CSS sync otomatis.

### 4. Cek sudah benar

- Terminal menampilkan `Synced` setelah edit
- Buka `http://127.0.0.1:9292` — header Aeris, bukan theme live
- URL admin preview: `https://aerisbeaute.myshopify.com/?preview_theme_id=150027960362`

### Perintah lain (device yang sudah login)

```bash
HOME="$PWD/.shopify-user" npx shopify theme pull --store aerisbeaute.myshopify.com --theme 150027960362
HOME="$PWD/.shopify-user" npx shopify theme push --store aerisbeaute.myshopify.com --theme 150027960362
```

Atau `npm run theme:pull` / `npm run theme:push` — tetap set `HOME` dulu seperti di atas.

Store dan theme default ada di `shopify.theme.toml`.

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
