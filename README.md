## TI Protec

### Welcome to TI Protec API created in CodeIgniter 4.4.2

### Please clone this repository

```bash
git clone git@github.com:AntonioGuizar/TIProtec.git
```

## To run in your local environment please follow the instruction:
### Run the SQL script from db/script.sql
### Configura the access to the database in back/app/config/Database.php 
```bash
'hostname'     => 'localhost',
'username'     => 'root',
'password'     => '',
'database'     => 'tiprotec',
'DBDriver'     => 'MySQLi',
```
With your terminal go to the folder /back and run
```bash
php spark serve
```
After that run to the folder /front and run
```bash
npm i
npm start
```

And open in tour browser the link
http://localhost:3000

## You're ready for test the API!

#### This is the list of the available endpoints:

Users
GET all users
```bash
http://localhost:8080/users
```
GET user by id
```bash
http://localhost:8080/users/{id}
```
POST create user
```bash
http://localhost:8080/users
```
PUT update user by id
```bash
http://localhost:8080/users/{id}
```
DELETE user by id
```bash
http://localhost:8080/users/{id}
```

### You can download the POSTMAN Collection for testing the API [here](https://api.postman.com/collections/4979939-93041028-db6e-47a7-8cb8-ef3433134110?access_key=PMAT-01HDC82S914S95R941Q0ZR7XTP) and import the collection into POSTMAN APP