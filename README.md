# Aeris Beauté — Cosmo Theme

Shopify theme untuk store [Aeris Beauté](https://aerisbeaute.myshopify.com), berdasarkan **FoxEcom Zest 9.3.0** (Copy of Cosmo).

Theme remote yang dipakai untuk development:

- Store: `aerisbeaute.myshopify.com`
- Theme: **Copy of Cosmo** (`#150027960362`) — unpublished
- Preview: [https://aerisbeaute.myshopify.com/?preview_theme_id=150027960362](https://aerisbeaute.myshopify.com/?preview_theme_id=150027960362)

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

### 3. Jalankan [localhost](http://localhost)

```bash
# macOS / Linux / WSL
HOME="$PWD/.shopify-user" npx shopify theme dev --store aerisbeaute.myshopify.com --theme 150027960362 --theme-editor-sync
```

Windows PowerShell:

```powershell
$env:HOME = "$PWD\.shopify-user"
npx shopify theme dev --store aerisbeaute.myshopify.com --theme 150027960362 --theme-editor-sync
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

Jangan pakai `theme push` tanpa `--only`. Perintah itu mengunggah JSON template dan mengosongkan gambar di theme editor. Langkah aman ada di [Alur kerja](#alur-kerja).

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


| Area                      | File                                                 |
| ------------------------- | ---------------------------------------------------- |
| Hero Merlot               | `sections/aeris-merlot-hero.liquid`                  |
| Header + mega menu banner | `sections/header.liquid`, `snippets/site-nav.liquid` |
| Footer Aeris              | `sections/aeris-footer.liquid`                       |
| Header group settings     | `sections/header-group.json`                         |
| Footer group settings     | `sections/footer-group.json`                         |


Hero copy campaign saat ini: **MERLOT** / Unlock Your True Power / Discover now.

Banner dropdown Shop All: **Ultra Luxurious Bristles** / MERLOT is now available / SHOP NOW.

## Alur kerja

Gambar yang diisi di theme editor tersimpan di `templates/*.json`, `config/settings_data.json`, dan `sections/*-group.json`. Jangan upload file itu dari lokal, kecuali memang sengaja mengubah susunan section. Push seluruh tema menimpa isian gambar di admin sampai kotaknya kosong.

`$env:HOME` di PowerShell hanya berlaku di jendela terminal yang sama. Set sekali, lalu perintah berikutnya di jendela itu tidak perlu diulang.

### 1. Tarik setting gambar dari admin

Jalankan di awal, atau setiap kali ada yang mengisi gambar di theme editor.

macOS / Linux / WSL:

```bash
cd shopify-cosmo
HOME="$PWD/.shopify-user" npx shopify theme pull --store aerisbeaute.myshopify.com --theme 150027960362 --only "templates/*.json" --only config/settings_data.json --only "sections/*.json"
```

Windows PowerShell:

```powershell
cd C:\Users\Lewz\Documents\shopify-cosmo-theme
New-Item -ItemType Directory -Force -Path .shopify-user
$env:HOME = "$PWD\.shopify-user"
npx shopify theme pull --store aerisbeaute.myshopify.com --theme 150027960362 --only "templates/*.json" --only config/settings_data.json --only "sections/*.json"
```



### 2. Nyalakan preview, biarkan terminalnya tetap terbuka

macOS / Linux / WSL:

```bash
HOME="$PWD/.shopify-user" npx shopify theme dev --store aerisbeaute.myshopify.com --theme 150027960362 --theme-editor-sync
```

Windows PowerShell:

```powershell
npx shopify theme dev --store aerisbeaute.myshopify.com --theme 150027960362 --theme-editor-sync
```

Kalau CLI menanyakan file yang beda antara lokal dan remote, pilih **Keep the remote version**. Itu mempertahankan gambar yang sudah diisi di admin.

Preview: [http://127.0.0.1:9292](http://127.0.0.1:9292)

### 3. Edit kodenya

Ubah file Liquid, CSS, atau JS, lalu simpan. Terminal menulis `Synced`. Refresh preview.

### 4. Kalau `theme dev` tidak jalan, upload hanya file yang diubah

Ganti path-nya dengan file yang benar-benar diedit.

macOS / Linux / WSL:

```bash
HOME="$PWD/.shopify-user" npx shopify theme push --store aerisbeaute.myshopify.com --theme 150027960362 --only snippets/nama-file.liquid --nodelete
```

Windows PowerShell:

```powershell
$env:HOME = "$PWD\.shopify-user"
npx shopify theme push --store aerisbeaute.myshopify.com --theme 150027960362 --only snippets/nama-file.liquid --nodelete
```

Jangan jalankan `theme push` tanpa `--only`.

### 5. Setelah beres

Cek desktop dan mobile di preview. Commit, lalu push ke GitHub. Publish theme dari admin Shopify hanya setelah disetujui.

## Yang tidak di-commit

Sudah ada di `.gitignore`:

- `node_modules/`
- `.shopify-user/` — session login lokal
- `.shopify/`

Jangan commit password store, token Theme Access, atau file `.env`.