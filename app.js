const express = require("express");
const app = express();
app.use(express.json());

let gymMembers = [
    {
        id: 1,
        nama: "Rizky Maulana",
        noHp: "081234567890",
        jenisMembership: "bulanan",
        tanggalDaftar: "2026-09-01",
        aktif: true
    },
    {
        id: 2,
        nama: "Alya Putri",
        noHp: "082112223333",
        jenisMembership: "harian",
        tanggalDaftar: "2026-09-05",
        aktif: true
    },
    {
        id: 3,
        nama: "Fajar Ramadhan",
        noHp: "085677889900",
        jenisMembership: "tahunan",
        tanggalDaftar: "2026-08-20",
        aktif: false
    }
];

app.get("/gym-members", function(req, res) {

    if (req.query.jenisMembership) {

        let hasil = [];

        for (let i = 0; i < gymMembers.length; i++) {
            if (gymMembers[i].jenisMembership == req.query.jenisMembership) {
                hasil.push(gymMembers[i]);
            }
        }

        res.status(200).json(hasil);

    } else {
        res.status(200).json(gymMembers);
    }

});


app.get("/gym-members/:id", function(req, res) {

    let id = parseInt(req.params.id);
    let member = null;

    for (let i = 0; i < gymMembers.length; i++) {

        if (gymMembers[i].id == id) {
            member = gymMembers[i];
            break;
        }

    }

    if (member == null) {

        res.status(404).json({
            status: "error",
            message: "Data member tidak ditemukan"
        });

    } else {

        res.status(200).json(member);

    }

});


// POST tambah member
app.post("/gym-members", function(req, res) {

    let data = req.body;

    if (
        !data.nama ||
        !data.noHp ||
        !data.jenisMembership ||
        !data.tanggalDaftar
    ) {

        return res.status(400).json({
            status: "error",
            message: "Data wajib diisi"
        });

    }

    if (
        data.jenisMembership != "harian" &&
        data.jenisMembership != "bulanan" &&
        data.jenisMembership != "tahunan"
    ) {

        return res.status(400).json({
            status: "error",
            message: "Jenis membership tidak valid"
        });

    }

    let idBaru = gymMembers.length + 1;

    let memberBaru = {
        id: idBaru,
        nama: data.nama,
        noHp: data.noHp,
        jenisMembership: data.jenisMembership,
        tanggalDaftar: data.tanggalDaftar,
        aktif: data.aktif
    };

    gymMembers.push(memberBaru);

    res.status(201).json(memberBaru);

});


app.put("/gym-members/:id", function(req, res) {

    let id = parseInt(req.params.id);
    let data = req.body;
    let ditemukan = false;

    for (let i = 0; i < gymMembers.length; i++) {

        if (gymMembers[i].id == id) {

            gymMembers[i].nama = data.nama;
            gymMembers[i].noHp = data.noHp;
            gymMembers[i].jenisMembership = data.jenisMembership;
            gymMembers[i].tanggalDaftar = data.tanggalDaftar;
            gymMembers[i].aktif = data.aktif;

            ditemukan = true;

            res.status(200).json(gymMembers[i]);

            break;
        }

    }

    if (ditemukan == false) {

        res.status(404).json({
            status: "error",
            message: "Data member tidak ditemukan"
        });

    }

});


app.delete("/gym-members/:id", function(req, res) {

    let id = parseInt(req.params.id);
    let ditemukan = false;

    for (let i = 0; i < gymMembers.length; i++) {

        if (gymMembers[i].id == id) {

            gymMembers.splice(i, 1);

            ditemukan = true;

            res.status(200).json({
                message: "Data member berhasil dihapus"
            });

            break;
        }

    }

    if (ditemukan == false) {

        res.status(404).json({
            status: "error",
            message: "Data member tidak ditemukan"
        });

    }

});


app.listen(3000, function() {
    console.log("Server berjalan di http://localhost:3000");
});