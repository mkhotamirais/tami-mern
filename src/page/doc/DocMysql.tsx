export default function DocMysql() {
  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold">Mysql Theory</h2>
        <p>Berikut hal pertama yang harus dilakukan</p>
        <ul className="list-inside list-disc">
          <li>Install XAMPP lalu buka XAMPP (control panel) dan aktifkan apache dan mysql</li>
          <li>Buka terminal lalu ketik: `mysql -u root -p` lalu enter dua kali, maka akan masuk ke terminal mysql</li>
          <li>
            Dari sini kamu bisa memasukkan semua perintah mysql seperti SHOW DATABASES
            <pre className="text-sm overflow-x-scroll">{`
--- masuk terminal mysql
c:> mysql -u root -p                masuk mysql dengan username 'root' dan password kosong, jika diminta password kosonkan saja, kecuali jika authentication nya disetting
mysql> SET PASSWORD FOR root@localhost = PASSWORD('new_password')     ubah password
mysql> CREATE DATABASE dbeduwork    membuat db baru
mysql> CREATE TABLE user (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR NOT NULL,
age INT
)
mysql> INSERT INTO users (name, age) VALUES ("ahmad", 20)
mysql> DELETE FROM users WHERE id=3
mysql> UPDATE users SET nama="ayu", age="23" WHERE id=3
mysql> SHOW TABLES
mysql> SHOW DATABASES
mysql> DESCRIBE table_name
mysql> SELECT * FROM users
mysql> SELECT name FROM users WHERE age=20
mysql> SELECT * FROM users WHERE name LIKE "%mad%
AND OR
mysql>
mysql>
`}</pre>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Koneksi</h2>
        <p>
          Karena database itu berjalan di server maka mysql tidak bisa connect langsung ke client, untuk membuat server
          salah satunya bisa dengan Nodejs (Expressjs, Nextjs) atau lainnya. Maka wajib dipelajari sisi servernya.
        </p>
        <p>
          Nodejs (npm) menyediakan package/driver diantaranya mysql, mysql2, sequelize dll. untuk koneksi server ke
          database. Kamu perlu mempelajari dokumentasi setiap package itu. Restapi adalah mekanisme pertukaran data
          client server melauil HTTP Request (get, post, patch/put dan delete) Data client dapat berupa form data /
          json, response server bisa berupa json / xml. Primary key (unik dan representasi data); Foreign Key (untuk
          relasi tabel); Tipe relasi (one to one; one to many dan many to many); tipe join (inner join; left join; right
          join dan full join)
        </p>
      </div>
      <h2 className="text-lg font-semibold">Perintan Dasar</h2>
      <pre className="text-sm overflow-x-scroll">{`
SHOW DATABASES;
CREATE DATABASE db_name;
USE db_name
CREATE TABLE table_name (
id int primary key auto_increment,
name varchar(100),
age int(2),
)
SHOW TABLES
DESCRIBE table_name
DROP TABLE table_name
DROP DATABASE db_name

SELECT <columns> FROM <table_name> <options>
<columns>: [*] | [columnA, columnB] | [columnN]
<options>: WHERE | ORDER BY | LIMIT
  WHERE <conditions(operators|null)>
    <operators>: = > < >= <= <> (not equal) BETWEEN LIKE IN
    contoh: WHERE nama = 'ahmad' | WHERE id < 5
    <null>: <columns> IS NULL | IS NOT NULL
    contoh: WHERE nama IS NULL
  ORDER BY ASC | DESC
  LIMIT number OFFSET number
SELECT DISTINCT <columns> FROM table_name // only distinct/different value
SELECT <functions>(<columns>) FROM table_name
<functions>: MAX | MIN | COUNT | AVG | SUM
contoh: MAX(id)
aliases

INSERT INTO table_name (columnA, columnB, columnN) VALUES (valueA, valueB, valueN)
INSERT INTO table_name VALUES (null, urutanA, urutanB)
// table_name tanpa () valuesnya harus berurutan, jika ada nilai default bisa diberi null

UPDATE table_name SET columnA='valueA', columnB='valueB', columnN='valueN' WHERE <conditions>
// jika tanpa operator WHERE maka akan diubah semua yang terseleksi

DELETE FROM table_name WHERE <conditions>
// jika tanpa operator WHERE maka akan dihapus semua yang terseleksi
        `}</pre>
      <h2 className="text-lg font-semibold">Keteragan lanjutan</h2>
      <p>
        Mysql (bahasa Sql structure query language, RDBMD, gratis, open source, cors platform, rilis 1995, dipegang
        Oracle) RDBMS adalah dasar untuk semua sistem database modern seperti MySQL, Microsoft SQL Server, Oracle, dan
        Microsoft Access.
      </p>
      <p>
        Database adalah kumpulan data yang disimpan secara sistematik hingga dapat digunakan kembali. Data adalah
        representasi dari objek yang ada di kehidupan seperti manusia, peristiwa, konsep, keadaan dll. Manfaat
        memudahkan pengelolaan data, akses data karena menggunakan bahasa universal SQL, pengamanan data, sharing data
        karena data bersifat terpusat. Jenis Database: Hirarcical (struktur seperti pohon) Network (konsep jaringan
        1960) relational (tabel yang terhubung 1970) NoSql (not only sql: document, key-value, graph 2000)
        <a href="https://db-engines.com/en/ranking">Lihat Ranking DBMS</a>
      </p>
      <p>
        berdasar fungsinya SQL dikelompokkan jadi 3 jenis: Data Definition Language (DDL) untuk edit struktur tabel,
        buat, hapus. Data Manipulation Language (DML) untuk menampilkan, menamba, edit, hapus baris data. Data Control
        Language (DCL) untuk mengatur hak akses pengguna MySql query
      </p>
    </div>
  );
}
