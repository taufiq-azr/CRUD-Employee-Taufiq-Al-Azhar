$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/all',  // Endpoint API untuk mendapatkan semua employee
        method: 'GET',
        success: function (response) {
            // Mengecek apakah respons berhasil dan memiliki data
            if (response.success && response.data) {
                let dataTable = $('#dataTable');
                dataTable.empty();
                response.data.forEach((employee, index) => {
                    dataTable.append(`
                        <tr >
                            <td>${index + 1}</td>
                            <td>${employee.nik}</td>
                            <td style="width: 15%;">${employee.fullName}</td>
                            <td>${employee.age}</td>
                            <td style="width: 10%;">${employee.birthDate}</td>
                            <td>${employee.gender}</td>
                            <td>${employee.address}</td>
                            <td>${employee.country}</td>
                            <td style="width: 17%;">
                                <a class="text-success btn-sm btn-link" onclick="detailData(${employee.id})">Detail</a>
                                <a class="text-primary btn-sm btn-link" onclick="editData(${employee.id})">Edit</a>
                                <a class="text-danger btn-sm btn-link" onclick="deleteData(${employee.id})">Delete</a>
                            </td>
                        </tr>
                    `);
                });
            } else {
                console.log("Data tidak ditemukan atau terjadi kesalahan.");
            }
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
}


function searchData() {
    let nik = $('#nik').val();
    let nama = $('#nama').val();

    // Membuat query parameter dinamis berdasarkan input yang ada
    let queryParams = [];
    if (nik) queryParams.push(`nik=${nik}`);
    if (nama) queryParams.push(`name=${nama}`);
    let queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';

    $.ajax({
        url: `http://localhost:8080/api/v1/employee/find-by-nik-and-name${queryString}`,
        method: 'GET',
        success: function (response) {
            // Tampilkan data pencarian
            let dataTable = $('#dataTable');
            dataTable.empty();
            response.data.forEach((employee, index) => {
                dataTable.append(`
                    <tr >
                            <td>${index + 1}</td>
                            <td>${employee.nik}</td>
                            <td style="width: 15%;">${employee.fullName}</td>
                            <td>${employee.age}</td>
                            <td style="width: 10%;">${employee.birthDate}</td>
                            <td>${employee.gender}</td>
                            <td>${employee.address}</td>
                            <td>${employee.country}</td>
                            <td style="width: 17%;">
                                <a class="text-success btn-sm btn-link" onclick="detailData(${employee.id})">Detail</a>
                                <a class="text-primary btn-sm btn-link" onclick="editData(${employee.id})">Edit</a>
                                <a class="text-danger btn-sm btn-link" onclick="deleteData(${employee.id})">Delete</a>
                            </td>
                        </tr>
                `);
            });
        }
    });
}

function openOverlay() {
    fetch('addFormOverlay.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('overlayContainer').innerHTML = html;
            document.getElementById('overlay').style.display = 'block';
            const countries = [
                "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
                "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
                "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
                "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
                "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
                "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
                "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica",
                "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
                "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
                "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
                "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
                "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
                "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
                "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
                "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
                "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
                "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
                "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
                "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
                "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
                "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
                "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
                "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
                "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
                "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
                "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
                "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
                "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
                "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
                "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
                "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
            ];
            const $countrySelect = $('#country');

            countries.forEach(country => {
                $countrySelect.append(new Option(country, country));
            });

            // Mengaktifkan select2 dengan placeholder
            $countrySelect.select2({
                placeholder: "Pilih Negara",
                allowClear: true
            });
        })
        .catch(error => console.error('Error loading overlay:', error));
}


function closeOverlay() {
    document.getElementById('overlay').style.display = 'none'; // Sembunyikan overlay
}

function saveData() {
    // Ambil nilai input dari form
    const nik = document.getElementById("nik-data").value;
    const fullName = document.getElementById("fullname-data").value;
    const age = document.getElementById("age").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const birthDate = document.getElementById("birthDate").value;
    const address = document.getElementById("address").value;
    const country = document.getElementById("country").value;

    // Validasi input gender (untuk memastikan pilihan radio diisi)
    if (!gender) {
        alert("Pilih jenis kelamin terlebih dahulu.");
        return;
    }

    if (nik === "") {
        alert("NIK tidak boleh kosong");
        return;
    }

    if (fullName === "") {
        alert("Nama Lengkap tidak boleh kosong");
        return;
    }

    function formatDateToDDMMYYYY(dateString) {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    const formattedBirthDate = formatDateToDDMMYYYY(birthDate);


    // Buat objek data sesuai dengan DTO EmployeeDTO
    const employeeData = {
        nik: nik,
        fullName: fullName,
        age: age,
        gender: gender,
        birthDate: formattedBirthDate,
        address: address,
        country: country
    };

    // Kirim data ke API menggunakan fetch
    fetch("http://localhost:8080/api/v1/employee", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(employeeData)
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Ubah response menjadi JSON jika response OK
            } else {
                throw new Error("Gagal menyimpan data: " + response.status);
            }
        })
        .then(data => {
            // Cek keberhasilan respons API berdasarkan data yang dikembalikan
            if (data.success) {
                showSuccessMessage();  // Tampilkan pesan berhasil
                setTimeout(() => {
                    window.location.reload();  // Refresh layar setelah pesan berhasil tampil
                }, 1000);
                closeOverlay(); // Tutup overlay setelah berhasil
            } else {
                alert("Gagal menyimpan data: " + (data.message || "Data gagal disimpan"));
            }
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat menyimpan data.");
        });
}

function showSuccessMessage() {
    const successMessage = document.getElementById("successMessage");
    successMessage.classList.add("show"); // Tambahkan kelas untuk menampilkan pesan

    // Hilangkan pesan setelah 3 detik
    setTimeout(() => {
        successMessage.classList.remove("show");
    }, 3000);
}

function deleteData(employeeId) {
    if (confirm("Anda yakin ingin menghapus data ini?")) {
        fetch(`http://localhost:8080/api/v1/employee/${employeeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    showDeleteMessage();
                    setTimeout(() => {
                        window.location.reload();  // Refresh layar setelah pesan berhasil tampil
                    }, 1000);  // Tambahkan delay 3 detik agar pesan muncul dulu
                } else {
                    throw new Error("Gagal menghapus data: " + response.status);
                }
            })
            .catch(error => {
                console.error("Terjadi kesalahan:", error);
                alert("Terjadi kesalahan saat menghapus data.");
            });
    }
}

function showDeleteMessage() {
    const deleteMessage = document.getElementById("deleteMessage");
    deleteMessage.classList.add("show"); // Tambahkan kelas 'show' untuk menampilkan pesan

    // Hilangkan pesan setelah 3 detik
    setTimeout(() => {
        deleteMessage.classList.remove("show");
    }, 3000);
}

let $countrySelect;
// Fungsi untuk memuat konten form dari file HTML terpisah
function loadEditForm() {
    fetch("updateFromOverlay.html") // Ganti dengan path yang sesuai
        .then(response => response.text())
        .then(data => {
            // Tempatkan konten form edit di dalam elemen div pada halaman utama
            document.getElementById("overlayContainer").innerHTML = data;
            document.getElementById("overlay-update").style.display = "block";

            const countries = [
                "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
                "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
                "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
                "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
                "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
                "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
                "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica",
                "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
                "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
                "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
                "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
                "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
                "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
                "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
                "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
                "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
                "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
                "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
                "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
                "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
                "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
                "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
                "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
                "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
                "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
                "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
                "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
                "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
                "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
                "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
                "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
            ];
            $countrySelect = $('#country');

            $countrySelect.empty();
            countries.forEach(country => {
                $countrySelect.append(new Option(country, country));
            });

            // Mengaktifkan select2 dengan placeholder
            $countrySelect.select2({
                placeholder: "Pilih Negara",
                allowClear: true
            });

        })
        .catch(error => {
            console.error("Gagal memuat form edit:", error);
        });
}

// Fungsi untuk menampilkan data karyawan di form edit

function editData(employeeId) {
    // Ambil data karyawan berdasarkan ID
    fetch(`http://localhost:8080/api/v1/employee/${employeeId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const employee = data.data;

                function formatDateToYYYYMMDD(dateString) {
                    const parts = dateString.split('-');
                    return `${parts[2]}-${parts[1]}-${parts[0]}`;
                }

                // Konversi tanggal sebelum mengirim
                const formattedBirthDate = formatDateToYYYYMMDD(employee.birthDate);

                // Tampilkan form edit
                loadEditForm(); // Muat form dari file eksternal

                // Tunggu form termuat sepenuhnya, lalu isi data
                setTimeout(() => {
                    document.getElementById("nik-data").value = employee.nik;
                    document.getElementById("fullname-data").value = employee.fullName;
                    document.getElementById("age").value = employee.age;
                    document.getElementById("birthDate").value = formattedBirthDate;
                    document.getElementById("address").value = employee.address;
                    document.getElementById("country").value = employee.country;
                    $countrySelect.val(employee.country).trigger('change');
                    document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;

                    document.getElementById("editFormContainer").setAttribute("data-id", employeeId);
                }, 100); // Jeda untuk memastikan form sudah termuat
            } else {
                alert("Gagal mengambil data karyawan");
            }
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat mengambil data karyawan.");
        });
}

function saveDataUpdate() {

    const employeeId = document.getElementById("editFormContainer").getAttribute("data-id");

    // Ambil nilai input dari form
    const nik = document.getElementById("nik-data").value;
    const fullName = document.getElementById("fullname-data").value;
    const age = document.getElementById("age").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const birthDate = document.getElementById("birthDate").value;
    const address = document.getElementById("address").value;
    const country = document.getElementById("country").value;

    function formatDateToDDMMYYYY(dateString) {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    const formattedBirthDate = formatDateToDDMMYYYY(birthDate);

    // Buat objek data sesuai dengan DTO EmployeeDTO
    const employeeData = {
        id: employeeId,
        nik: nik,
        fullName: fullName,
        age: age,
        gender: gender,
        birthDate: formattedBirthDate,
        address: address,
        country: country
    };

    // Kirim data ke API menggunakan fetch
    fetch(`http://localhost:8080/api/v1/employee/${employeeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(employeeData)
    })
        .then(response => {
            if (response.ok) {
                closeEditForm();
                showUpdatedMessage();
                setTimeout(() => {
                    window.location.reload();  // Refresh layar setelah pesan berhasil tampil
                }, 1000); // Kembali ke halaman utama setelah update
            } else {
                throw new Error("Gagal memperbarui data: " + response.status);
            }
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat memperbarui data.");
        });
}

function showUpdatedMessage() {
    const updatedMessage = document.getElementById("updatedMessage");
    updatedMessage.classList.add("show"); // Tambahkan kelas untuk menampilkan pesan

    // Hilangkan pesan setelah 3 detik
    setTimeout(() => {
        updatedMessage.classList.remove("show");
    }, 3000);
}

// Fungsi untuk menutup form edit
function closeEditForm() {
    document.getElementById("overlay-update").style.display = "none";
}

function loadDetailForm() {
    fetch("detailFormOverlay.html")
        .then(response => response.text())
        .then(data => {
            // Tempatkan konten form edit di dalam elemen div pada halaman utama
            document.getElementById("overlayContainer").innerHTML = data;
            document.getElementById("overlay-detail").style.display = "block";

            const countries = [
                "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
                "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
                "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
                "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
                "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
                "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
                "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica",
                "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
                "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
                "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
                "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
                "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
                "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
                "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
                "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
                "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
                "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
                "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
                "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
                "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
                "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
                "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
                "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
                "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
                "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
                "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
                "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
                "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
                "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
                "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
                "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
            ];
            $countrySelect = $('#country');

            $countrySelect.empty();
            countries.forEach(country => {
                $countrySelect.append(new Option(country, country));
            });

            // Mengaktifkan select2 dengan placeholder
            $countrySelect.select2({
                placeholder: "Pilih Negara",
                allowClear: true
            });

        })
        .catch(error => {
            console.error("Gagal memuat form edit:", error);
        });
}


function detailData(employeeId) {
    fetch(`http://localhost:8080/api/v1/employee/${employeeId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const employee = data.data;

                function formatDateToYYYYMMDD(dateString) {
                    const parts = dateString.split('-');
                    return `${parts[2]}-${parts[1]}-${parts[0]}`;
                }

                // Konversi tanggal sebelum mengirim
                const formattedBirthDate = formatDateToYYYYMMDD(employee.birthDate);


                loadDetailForm(); // Muat form dari file eksternal

                // Tunggu form termuat sepenuhnya, lalu isi data
                setTimeout(() => {
                    document.getElementById("nik-data").value = employee.nik;
                    document.getElementById("fullname-data").value = employee.fullName;
                    document.getElementById("age").value = employee.age;
                    document.getElementById("birthDate").value = formattedBirthDate;
                    document.getElementById("address").value = employee.address;
                    document.getElementById("country").value = employee.country;
                    $countrySelect.val(employee.country).trigger('change');
                    document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;

                    document.getElementById("editFormContainer").setAttribute("data-id", employeeId);
                }, 100); // Jeda untuk memastikan form sudah termuat
            } else {
                alert("Gagal mengambil data karyawan");
            }
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat mengambil data karyawan.");
        });
}

function closeDetailForm() {
    document.getElementById("overlay-detail").style.display = "none";
}



// Functions untuk Add, Detail, Edit, Delete bisa ditambahkan di sini sesuai kebutuhan
