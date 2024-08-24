export default function DocMongodb() {
  return (
    <div>
      Mongodb
      <div>
        <div>Mongodb</div>
        <div>Database</div>
        <ul className="list-inside list-disc">
          <li>
            untuk memahami database perlu dipahami dulu data. Data adalah representasi fakta di dunia nyata, suatu data
            selalu terkait dengan data lain, misalnya buku siapa pengarangnya, penerbitnya, dll
          </li>
          <li>
            menyimpan data bisa di mana saja (kertas, notepad, excel) tapi perlu diperhatikan maalah kapasitas,
            kecepatan, keamanan, duplikasi dll. Solusinya skalabilitas, ketersesiaan saat dibutuhkan, keamanan, permanen
            dll. dan semua solusi itu sudah ada dalam database
          </li>
          <li>
            database adalah data di dalam DBMS. DBMS (database management system) adalah softwarenya seperti Mysql,
            mongodb, dll. Jenis DBMS: rasional, hierarcical, network, NoSql. Sql adalah bahasa untuk melakukan interaksi
            dengan database.
          </li>
          <li>
            RDBMS memiliki banyak tabel. Setiap tabel semestinya memiliki primary key (sebuah data yang dapat
            merepresentasikan satu baris recordnya) sifatnya harus unik dan harus string sekalipun seluruhnya berupa
            nomor karena jika nomor diawali nol maka nol dianggap tidak ada.
          </li>
          <li>istilah: field/column, row, primary key, foreign key, auto increment, relationship, normalizer</li>
        </ul>
        <div>Mongodb eduwork</div>
        <ul className="list-inside list-disc">
          <li>
            Mongodb adalah db dengan model noSql, di mana data disimpan dalam bentuk document mirip json (mongodb
            menyebutnya dengan istilah BSON)
          </li>
          <li>
            Document: menyimpan data dalam format document mirip dengan format JSON (javascript object notation). Setiap
            dokumen berisi pasangan field/kolom dan nilainya. nilai dapat berupa string, angka, boolean, array atau
            object. Dokumen database ini mengandung relasi antar data, berbagai tipe data serta SQL hingga membuatnya
            bisa dikomparasikan dengan relational db.
          </li>
          <li>
            key-value adalah bentuk db noSql paling sederhana. umumnya digunakan untuk menyimpan data sederhana seperti
            logging, cache, pengaturan app. Redis dan DynamoDB adalah contoh key-value db paling populer
          </li>
          <li>
            wide-column menyimpan data dalam bentuk tabel, baris, kolom yang dinamis. Model ini lebih dinamis dibanding
            relasional karena setiap baris pada tabel tidak harus memiliki kolom yang sama. Db jenis ini bisa digunakan
            untuk menyimpan data pada data IoT (internet of thinks) dan data profil pengguna. Contoh db ini adalah:
            cassandra dan HBase
          </li>
          <li>
            Graph: menyimpan data dalam node dan edge. Node menyimpan info tentang orang, tempat dan apapun itu. Edge
            meyimpan info tentang hubungan masing masing node. Db jenis ini digunakan untuk menyimpan data model
            jaringan, fraud detection dan machine learning. Contohnya Neo4j dan JanusGraph
          </li>
          <li>
            MongoDB merupakan db dengan menggunakan model document base, yang menyimpan datanya dalam bentuk document
            mirip json
          </li>
          <li>
            perbandingan istilah sql db dan mogodb: table = collection, row = document/BSON document, column = field,
            table join = $lookup, embedded document. database = database, index = index, primary key = primary key
          </li>
        </ul>
        <div>CRUD Mongodb / Mongodb Commands</div>
        <ul className="list-inside list-disc">
          <li>Dimulai dengan membuka mongodb di terminal</li>
          <pre className="text-sm overflow-x-scroll">{`
mongosh                           : test> (artinya kita memulai dari database bawaan bernama 'test')
test> show dbs / show databases   : menampilkan semua db
test> db                          : menampilkan db saat ini
test> use new_db                  : membuat/berpindah db
new_db> db.products / db.getCollection('products')     (collection dengan nama 'products' otomatis ditambahkan menjadi collection baru jika belum ada)
.insertOne({...})               : menambah satu data
.deleteOne({"_id": ObjectId("place_24_id_string_here")})  : hapus data dengan id tertentu misalnya: 65b16c7e53bbafa4cb4bcb46
.insertOne({name: "ahmad", age: 10, active: true})
.insertMany([{name: "abdul", age: 11, status: false}, {name: "siti", age: 12, status: true}])
new_db> db.createCollection('products2')
new_db> db.products
.find()                         : menampilkan semua data di collection 'products'
.find().pretty()                : menampilkan semua data dengan rapi
.find({age: 11})                : menampilkan yang memiliki data age 11 saja
.find({age: 11, status: true})  : menampilkan yang memiliki data age 11 dan status true
.find().sort({age: 1})          : menampilkan secara urut, nilai 1 = ascending, -1 = descending
.find().limit(2)                : menampilkan hanya sebagian data jika limit(2) maka 2 data yang tampil
.count() [deprecated]           : menghitung jumlah data
.countDocuments() / estimatedDocumentCount()
.find({age: {$lt 10}})          : $lt: less than $tg: greater than $lte $gte equal $in in array
.find({name: {$in: ['ahmad', 'abdul']}})
new_db> show tables / show collections  : menampilkan semua tabel pada database saat ini
new_db> db.products.drop()        : menghapus collection 'products'
new_db> db.products.updateOne({name: "ahmad"}, {$set: {age: 12, status: false}})
new_db> db.products.updateMany({age: 12, {$set: {status: true}}})
new_db> db.products.deleteOne()
new_db> db.products.deleteMany()`}</pre>
          <li>
            Authentication adalah mekanisme keamanan untuk membatasi hak akses pada db. Secara default kita masuk
            mongosh tanpa otentikasi, untuk aktifkan auth, kita harus tambahkan security pada konfigurasi mongo kita,
            caranya: cari file konfigurasi yakni tempat mongodb diunduh C:\Program Files\MongoDB\Server\6.0\bin, buka
            file mongod.cfg atau langsung search `mongod.cfg`. Lalu tambahkan berikut ini:
          </li>
          <pre>{`
security:
authorization: enabled`}</pre>
          <li>
            lalu restart server mongodb: salah satu caranya melalui services, langsung saja search `services` lalu cari
            `MongoDb Server` tekan tombol restart.
          </li>
          <li>
            Role yang ada pada MongoDb: read, readWrite, dbAdmin, userAdmin, dbOwner, readAnyDatabase,
            userAdminAnyDatabase, dbAdminAnyDatabase, root
          </li>
        </ul>
        <div>Komunikasi ke mongodb</div>
        <ul className="list-inside list-disc">
          <li>
            dibutuhkan driver. di npm ada driver yang dibuat mongodb bernama mongodb, ada juga library mongoose.
            Salahsatu manfaatnya yaitu memahami ODM (object document mapping) kalau di Sql itu ORM (object relational
            mapping). driver ini hanya perantara jadi dibutuhkan pengetahuan query native dan promise.
          </li>
          <li>
            mongoose adalah ODM (object data manager) paling populer mongoDB. mendukung pembuatan model dan validasi,
            custom method, query building
          </li>
        </ul>
        <div>Ngga tau dari mana</div>
        <pre className="text-sm overflow-x-scroll">{`
db.grantRolesToUser("root", [
{ role: "readWriteAnyDatabase", db: "admin" },])

myeduwork 220598Ota
myeduworkSecond 220598OtaSecond


show dbs / show database
use db_name
show tables / show collections
db.createCollection('table_name');
db.table_name.drop()
db.table_name.insertOne({
nama: "ahmad",
umur: 20,
status: true
})
db.table_name.find()
db.table_name.insertMany(
[
    {
        nama: "siti",
        umur: 20,
        status: true
    },
    {
        nama: "abdul",
        umur: 21,
        status: false
    }
]    
)
db.table_name.find({status: false})
db.table_name.find().sort({price: 1}) // sorting ascending
db.table_name.find().sort({price: -1}).limit(2) // sorting descending with limit 2
db.table_name.find().count() // total data
db.table_name.find({price: {$lt: 2000}});
db.table_name.find({name: {$in: ["pulpen"]}})
------ $lt < $gt > $lte <= $gte >= $in in array
db.table_name.updateOne({name: "pulpen"}, {$set: {name: "penggaris"}})


****** Atuhentication *******
mekanisme keamanan untuk membatasi hak akses pada suatu database
cari: C:Program Files/MongoDB/Server/6.0/bin/mongod.cfg open 

tambahkan baris code berikut
#security:
security:
authorization: enabled

kembali ke terminal
use.admin
db.createUser({
user: 'my_name',
pwd: 'my_password',
roles: [{

    role: 'readWrite',
    db: 'my_database'
}]
})
------- role: read; readWrite; dbAdmin; userAdmin; dbOwner; readAnyDatabase; userAdminAnyDatabase; dbAdminAnyDatabase; root
db.system.users.find()
  `}</pre>
      </div>
    </div>
  );
}
