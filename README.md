
# Upscalix BE Test

This application is supposed to send birthday email to users based on their timezone. Application developed using Express JS for framework and MYSQL for databases. How its works? So after add user with POST at `/user` with firstName, lastName, birthday (in format YYYY-MM-DD) and location (in format timezone eg: Asia/Jakarta).



## Environment Variables

To run this project,first you need create database with name `upscalix` you have to set the following environment variables to your config/db.conf.js

- `HOST` = 'localhost'
- `USER` = 'root'
- `PASSWORD` = 'root'
- `DB` = 'upscalix'
- `DIALECT` = 'mysql'




## Features

- CRUD User
- Send Birthday By Scheduler


## Installation Process

After cloning this repository. Install all package that needs

Install all npm package with 
```bash
  npm install
```
start app 
```bash
  npm start
```


## Authors

- [@sadrydoy](https://github.com/sadriansyah)

