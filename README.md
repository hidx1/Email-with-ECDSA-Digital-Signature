# ECC-Digital-Signature
Ini merupakan sebuah program client e-mail yang dapat melakukan enkripsi dengan block cipher Trident dan tanda tangan digital dengan Elliptic Curve Digital Signature Algorithm (ECDSA) yang menggunakan fungsi hash SHA3-256 (Keccak). Email perlu terdaftar terlebih dahulu pada Google API Console milik kelompok agar dapat mengirim dan menerima email.

## Anggota Kelompok 
|NIM       | NAMA          |
|----------|---------------|
|13517014  | Yoel Susanto  |
|13517059  | Nixon Andhika |
|13517090  | Vania Velda   |
|13517116  | Ferdy Santoso |


## Prerequisite
|No | Prerequisite                                                                     |
|---|----------------------------------------------------------------------------------|
|1. | Email yang dapat digunakan hanya email yang ***telah*** terdaftar pada server    |
|2. | CORS **harus** diaktifkan sebelum menjalankan program                            |
|3. | Contoh extension CORS untuk Chrome : **Allow CORS: Access-Control-Allow-Origin** |
|4. | Contoh extension CORS untuk Firefox : **CORS Everywhere**                        |
|5. | Versi python >=3.8                                                               |

## Run program 
1. Navigasi ke folder **gui**
2. Install dependencies
    ```sh
    npm -i install
    ```
3. Run
    ```sh
    npm start
    ```
4. Buka browser yang dapat mengaktifkan CORS
5. Klik tombol Sign in
6. Sign in dengan email yang telah terdaftar di server
7. Allow access ke Gmail
8. Tutup window sign in
9. Tampilan utama GUI akan muncul

## Sending message
1. Klik tombol "Compose"
2. Isi alamat tujuan, subjek, dan pesan email
3. Pilih apakah ingin mengenkripsi dan/atau menandatangani pesan
4. Jika iya, isi kunci privat yang akan digunakan sepanjang 8 karakter
5. Jika enkripsi dipilih, akan dikirim ciphertext ke alamat tujuan
6. Jika tanda tangan dipilih, tanda tangan digital akan ditambahkan di akhir pesan
7. Jika enkripsi dan tanda tangan dipilih, akan dikirim ciphertext dengan penambahan tanda tangan di akhir

## Receiving message
1. Buka tab "Inbox"
2. Pilih salah satu email
3. Email akan terbuka dan isi pesan terlihat
4. Pengguna dapat memilih untuk mendekripsi pesan dan/atau memverifikasi tanda tangan digital
5. Jika mendekripsi pesan, isi kunci privat dan hasil plaintext akan ditampilkan ke layar
6. Jika verifikasi pesan, akan ditampilkan label apakah nilai pesan sesuai dengan nilai public key dari tanda tangan
7. Jika mendekripsi dan verifikasi pesan, isi kunci privat dan hasil plaintext beserta label valid atau tidak akan ditampilkan