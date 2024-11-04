# Employee Management API Documentation 

# Front-End ( HTML, Javascript, CSS (JQuery, Bootstrap) )

Aplikasi ini merupakan front-end untuk mengelola data karyawan dengan menggunakan HTML, JavaScript, CSS, JQuery, dan Bootstrap. Front-end ini berkomunikasi dengan back-end yang dibangun menggunakan Java Spring Boot.

## Fitur Utama

- Menampilkan daftar karyawan.
- Menambahkan karyawan baru.
- Memperbarui informasi karyawan.
- Menghapus karyawan.
- Mencari karyawan berdasarkan NIK, atau nama.

## Prasyarat

Pastikan Anda memiliki hal-hal berikut sebelum memulai:
- **Web Browser**: Google Chrome, Mozilla Firefox, atau browser modern lainnya.
- **IDE (Integrated Development Environment)**: Seperti IntelliJ IDEA atau VS Code untuk menjalankan back-end.
- **Live Server Extension**: Jika menggunakan Visual Studio Code, instal extension Live Server.
- **Java 17 >**: Jika menggunakan Visual Studio Code, instal extension Live Server.

## Memulai Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi front-end Employee Management.

### 1. Jalankan Server Back-End

Buka proyek back-end menggunakan IDE yang sesuai, kemudian jalankan server dengan salah satu metode berikut:
- Gunakan perintah **Run** di IDE.
- Atau jalankan melalui terminal dengan perintah berikut:

    ```bash
    ./mvnw spring-boot:run
    ```
    atau, jika menggunakan Gradle:
    ```bash
    ./gradlew bootRun
    ```

Server back-end harus berjalan agar front-end dapat mengambil data karyawan dengan benar.

### 2. Buka Halaman Utama

Buka folder `client` di proyek front-end, kemudian:
- Buka file `index.html` menggunakan Live Server (misalnya, dengan Visual Studio Code) untuk menjalankan aplikasi di browser.
- Aplikasi akan terbuka di URL seperti `http://127.0.0.1:5500/index.html`.

### 3. Tambahkan Data Karyawan Awal

Karena back-end menggunakan H2 Database (in-memory database), data karyawan akan kosong pada awalnya. Gunakan fitur "Add" pada aplikasi untuk memasukkan data karyawan pertama agar data muncul dalam daftar karyawan.

# Employee Management API Documentation Back-End (Java Spring Boot)

API ini menyediakan berbagai endpoint untuk mengelola data karyawan, termasuk pembuatan, pembaruan, penghapusan, dan pencarian karyawan berdasarkan ID, NIK, atau nama.

## Daftar Endpoint

### 1. Buat Karyawan Baru
- **URL**: `/api/v1/employee`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ```json
    {
      "id": 1,
      "nik": "12038437326252",
      "fullName": "Jhon Doe",
      "age": 22,
      "birthDate": "29-08-2002",
      "gender": "Laki-Laki",
      "address": "8851 Katrice Junctions, New Keikoberg, OR 48746-5262",
      "country": "United States"
    }
    ```
- **Response**:
  - `200 OK`: Karyawan berhasil dibuat.
  - `400 Bad Request`: Data tidak valid.

### 2. Perbarui Data Karyawan
- **URL**: `/api/v1/employee/{id}`
- **Method**: `PUT`
- **Request Params**: `id` (ID dari karyawan yang ingin diperbarui)
- **Request Body**:
    ```json
    {
      "id": 1,
      "nik": "12038437326252",
      "fullName": "Jhon Doe",
      "age": 22,
      "birthDate": "29-08-2002",
      "gender": "Laki-Laki",
      "address": "8851 Katrice Junctions, New Keikoberg, OR 48746-5262",
      "country": "United States"
    }
    ```
- **Response**:
  - `200 OK`: Karyawan berhasil diperbarui.
  - `404 Not Found`: Karyawan dengan ID tersebut tidak ditemukan.

### 3. Hapus Karyawan
- **URL**: `/api/v1/employee/{id}`
- **Method**: `DELETE`
- **Request Params**: `id` (ID dari karyawan yang ingin dihapus)
- **Response**:
  - `204 No Content`: Karyawan berhasil dihapus.
  - `404 Not Found`: Karyawan dengan ID tersebut tidak ditemukan.

### 4. Dapatkan Semua Karyawan
- **URL**: `/api/v1/employee/all`
- **Method**: `GET`
- **Response**:
  - `200 OK`: Berhasil mengambil semua data karyawan.

### 5. Dapatkan Karyawan Berdasarkan NIK
- **URL**: `/api/v1/employee/nik/{nik}`
- **Method**: `GET`
- **Request Params**: `nik` (NIK dari karyawan)
- **Response**:
  - `200 OK`: Karyawan ditemukan berdasarkan NIK.
  - `404 Not Found`: Karyawan dengan NIK tersebut tidak ditemukan.

### 6. Dapatkan Karyawan Berdasarkan ID
- **URL**: `/api/v1/employee/{id}`
- **Method**: `GET`
- **Request Params**: `id` (ID dari karyawan)
- **Response**:
  - `200 OK`: Karyawan ditemukan berdasarkan ID.
  - `404 Not Found`: Karyawan dengan ID tersebut tidak ditemukan.

### 7. Dapatkan Karyawan Berdasarkan Nama
- **URL**: `/api/v1/employee/name/{name}`
- **Method**: `GET`
- **Request Params**: `name` (nama karyawan)
- **Response**:
  - `200 OK`: Karyawan ditemukan berdasarkan nama.
  - `404 Not Found`: Karyawan dengan nama tersebut tidak ditemukan.

### 8. Cari Karyawan Berdasarkan NIK dan Nama
- **URL**: `/api/v1/employee/find-by-nik-and-name`
- **Method**: `GET`
- **Request Params**:
  - `nik` (opsional): NIK karyawan
  - `name` (opsional): Nama karyawan
- **Response**:
  - `200 OK`: Karyawan yang cocok ditemukan.
  - `404 Not Found`: Karyawan dengan kriteria tersebut tidak ditemukan.

## Struktur Response

Seluruh endpoint akan merespons dengan struktur JSON berikut:
```json
{
  "success": true,
  "message": "Pesan status",
  "status": 200/204/404/500,
  "data": "Data karyawan atau null"
}
```

## Error Handling
Kode ini menangani beberapa jenis error, termasuk:
- **ValidationException**: Kesalahan validasi pada data karyawan.
- **NotFoundException**: Karyawan tidak ditemukan.
- **Exception**: Kesalahan umum lainnya, seperti error dari basis data.



**Author**: Taufiq Al Azhar


