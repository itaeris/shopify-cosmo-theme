# Setup Promo Discount (harga coret otomatis dari tag)

Panduan memasang promo dengan **tag produk**. Cukup pasang tag di produk, lalu:

- **Website** (halaman produk, kartu produk, search, quick view) menampilkan harga coret, misalnya ~~Rp 199.000~~ **Rp 139.300** dengan label "Save 30%".
- **Cart & checkout** memotong harga lewat **Automatic discount** Shopify.

> **Aturan utama:** persentase di **Theme settings** harus **sama persis** dengan persentase di **Automatic discount**. Theme hanya *menampilkan* harga, sedangkan potongan yang benar-benar dibayar customer diatur oleh Automatic discount. Kalau keduanya tidak sama, harga di website akan beda dengan harga di checkout.

---

## Gambaran

| Bagian | Diatur di | Fungsi |
|---|---|---|
| Tag produk | Admin → Products | Menandai produk yang ikut promo |
| Collection otomatis | Admin → Collections | Mengumpulkan produk ber-tag (dipakai oleh discount) |
| Automatic discount | Admin → Discounts | Memotong harga di cart & checkout |
| Aeris promo (slot 1–5) | Theme settings | Menampilkan harga coret di website |

Promo bisa didaftarkan di dua tempat. Keduanya bisa dipakai bersamaan:

- **Theme settings → Aeris promo:** 5 slot tetap.
- **Content → Metaobjects → Aeris promo:** daftar promo yang bisa **ditambah sendiri tanpa batas** (tombol **Add entry**). Disarankan untuk tim admin. Setup awalnya ada di [Setup sekali: Metaobject Aeris promo](#setup-sekali-metaobject-aeris-promo).

Kalau satu tag ada di dua tempat, slot di Theme settings yang dipakai.

---

## Langkah setup (contoh: promo Payday 30%, tag `payday`)

### 1. Pasang tag di produk

1. **Products** → centang produk-produk yang ikut promo.
2. **"…" (More actions) → Add tags** → ketik `payday` → **Add**.

Huruf besar atau kecil tidak masalah (`Payday` = `payday`).

### 2. Buat collection otomatis

1. **Products → Collections → Add collection**.
2. Isi judul, misalnya `Payday`.
3. Di panel kanan, klik **+ Add condition** → pilih **Tag** → operator **includes** → ketik `payday`.
4. **Save**.

Produk yang diberi tag `payday` (sekarang atau nanti) otomatis masuk ke collection ini.

> Collection **Promo** (`/collections/promo`) sudah dipakai oleh menu **PROMOTION** di website. Kalau promo ini mau tampil di menu Promotion, tambahkan kondisi tag di collection **Promo** yang sudah ada. Jangan buat collection baru dengan judul "Promo", karena Shopify akan memberinya alamat `/collections/promo-1`, dan menu Promotion tetap mengarah ke collection lama.

### 3. Buat Automatic discount

1. **Discounts → Create discount → Amount off products**.
2. Method: **Automatic discount**. Isi judul, misalnya `Payday 30%`. Judul ini terlihat oleh customer di cart dan checkout.
3. Value: **Percentage → 30**.
4. Applies to: **Specific collections → Payday**.
5. Atur **Active dates**, yaitu tanggal mulai dan selesai.
6. **Save**.

### 4. Daftarkan promo supaya harga coret tampil

Pilih salah satu:

**A. Lewat Metaobject (disarankan, bisa tambah sendiri)**

1. **Content → Metaobjects → Aeris promo → Add entry**.
2. Isi:
   - **Name:** `Payday 30%` (hanya label, bebas)
   - **Tag:** `payday`
   - **Percent:** `30`
3. **Save**. Kalau definisi dibuat dengan opsi **Publishable**, ubah status entry ke **Active**.

**B. Lewat Theme settings (5 slot)**

1. **Online Store → Themes → Customize**.
2. Klik ikon **Theme settings** (gear) → **Aeris promo**.
3. Pilih slot yang kosong, misalnya **Promo 2**:
   - **Tag:** `payday`
   - **Discount:** `30%`
4. **Save**.

### 5. Cek

1. Buka salah satu produk ber-tag `payday` di website. Harga coret dan label "Save 30%" harus muncul.
2. Add to cart. Harga di cart dan checkout harus **sama** dengan harga di halaman produk.

---

## Setup sekali: Metaobject Aeris promo

Langkah ini cukup dilakukan **sekali** oleh admin. Setelah itu, tim tinggal **Add entry** untuk setiap promo baru.

1. **Settings → Custom data → Metaobjects → Add definition**.
2. **Name:** `Aeris promo`. Pastikan **Type** otomatis terisi `aeris_promo`. Type ini **harus persis** `aeris_promo`, karena theme membaca nama ini.
3. Tambahkan field:

   | Field name | Key | Type | Catatan |
   |---|---|---|---|
   | Name | `name` | Single line text | Label promo, untuk admin saja |
   | Tag | `tag` | Single line text | Tag produk, misalnya `payday` |
   | Percent | `percent` | Integer | Validasi: min 1, max 90 |

   Key **`tag`** dan **`percent`** harus persis seperti di tabel.
4. Di bagian **Access / Options**:
   - Aktifkan **Storefronts** (Storefront access). **Wajib.** Tanpa ini, theme tidak bisa membaca daftar promo.
   - Opsional: aktifkan **Publishable** supaya setiap entry punya status Draft/Active. Entry Draft tidak dipakai theme, cocok untuk menyiapkan promo lebih awal.
5. **Save**.

Menu **Content → Metaobjects → Aeris promo** sekarang muncul dengan tombol **Add entry**.

---

## Mematikan promo

1. Matikan tampilan harga coret di theme:
   - **Metaobject:** hapus entry-nya, set ke **Draft** (kalau Publishable), atau isi **Percent** dengan 0.
   - **Theme settings:** set **Discount** slot itu ke **0%**, atau kosongkan Tag-nya.
2. Automatic discount berhenti sendiri sesuai **Active dates**. Kalau perlu berhenti lebih cepat, buka **Discounts** dan **Deactivate**.
3. Opsional: hapus tag dari produk (**Products** → centang → **"…" → Remove tags**).

> Lakukan langkah 1 dan 2 bersamaan. Kalau theme masih menampilkan diskon padahal Automatic discount sudah berhenti, customer akan melihat harga promo di website tapi membayar harga normal di checkout.

---

## Mengganti persentase promo

Ubah di **dua** tempat:

1. **Discounts** → buka discount-nya → ubah **Value**.
2. Ubah juga persentasenya di tempat promo itu didaftarkan: entry **Metaobject** (Percent), atau **Theme settings → Aeris promo** (Discount di slot yang sama).

---

## Aturan & batasan

- **Satu produk, satu tag promo.** Kalau satu produk punya beberapa tag promo, theme memakai slot Theme settings dengan **nomor terkecil**. Kalau tidak ada yang cocok di slot, theme memakai entry Metaobject pertama yang cocok. Di checkout, Shopify bisa saja memakai diskon lain, tergantung pengaturan *Combinations* di Discounts. Supaya tidak beda, pastikan satu produk hanya ikut satu promo.
- **Harga coret manual tetap dipakai.** Kalau produk sudah punya **Compare-at price** yang lebih besar dari Price, theme menampilkan harga manual itu dan **tidak** menambah diskon dari tag. Ini supaya harga tidak terlihat terpotong dua kali.
- **Pembulatan:** harga setelah diskon dibulatkan ke bawah ke rupiah. Untuk harga normal (misalnya 199.000), hasilnya sama dengan checkout.
- **Desty:** kalau Desty menyinkronkan harga ke Shopify, cara ini aman, karena Price dan Compare-at price produk tidak diubah. Diskon hanya ada di Automatic discount dan tampilan theme.

---

## Alternatif: harga coret manual

Untuk promo satu atau dua produk saja, bisa tanpa tag:

1. Buka produk → bagian **Price** (per varian kalau ada varian).
2. **Price** = harga promo (misalnya `150000`), **Compare-at price** = harga normal (misalnya `199000`). Compare-at price **harus lebih besar** dari Price.
3. **Save**.

Untuk banyak produk sekaligus: **Products** → centang → **Bulk edit** → isi kolom Price dan Compare-at price.

Kalau Desty menyinkronkan harga, perubahan manual ini bisa tertimpa lagi oleh harga dari Desty.

---

## Untuk developer

| File | Isi |
|---|---|
| `snippets/aeris-promo-percent.liquid` | Mencari slot Theme settings, lalu entry metaobject `aeris_promo` (`tag`, `percent`), yang cocok dengan tag produk. Output persentasenya (0 kalau tidak ada) |
| `snippets/price.liquid` | Harga di halaman produk, quick view, sticky ATC, search |
| `snippets/product-card.liquid` | Harga & badge sale di kartu produk |
| `config/settings_schema.json` | Grup **Aeris promo**: `aeris_promo_tag` / `aeris_promo_percent` (slot 1), `aeris_promo_tag_N` / `aeris_promo_percent_N` (slot 2–5) |

Logika: kalau produk **tidak** punya compare-at price aktif dan cocok dengan salah satu slot, maka `compare_at_price = price` dan `price = price × (100 − persen) / 100`. Cart dan checkout tidak disentuh theme, karena potongannya berasal dari Automatic discount Shopify (`line_level_discount_allocations`).
