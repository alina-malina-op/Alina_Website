const express = require('express')
const path = require('path') //модуль для корректной работы с путями
const {v4}= require('uuid') //небольшая библиотека; функция v4 генерирует новый айдишник
const app = express()

// let CONTACTS = [
//     {id: v4(), name: 'Alina', value: '+375-000-00-00'} 
// ]

app.use(express.json()) //по умолчанию объект req не умеет работать с json

//GET
app.get('/api/contacts', (req, res) => { //в express получаем html(это не правильно), поэтому создаём url для получения данных; callback
    res.status(200).json(CONTACTS) //есть много statusов; 200-если всё хорошо то можно с ним работать
})

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4()} //создаю новый контакт, разворачиваю 
    CONTACTS.push(contact) //добавляем контакт в базу данных
    res.status(201).json(contact) //status 201 - элемент был создан
})

//DELETE
app.delete('/api/contacts/:id', (req, res) => { //:id - id элемента который нужно удалить
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json()
})


//нижние запросы должны отрабатываться последними

app.use(express.static(path.resolve(__dirname, 'docs'))) //для корректности обозначаем папку как статическую, static-метод(там находится папка которую нужно сделать статической); resolve-преобразует пути в абсолютный путь; например если не преобразуем то файл js не подтянется со всеми

app.get('*', (req, res) => { //метод get по любым роутам (*) - express будет смотреть за любыми get апросами которые существуют у нас
    res.sendFile(path.resolve(__dirname, 'docs', 'index.html')) // sendFile - вызываем определённый файл
})

app.listen(3000, () => console.log('Serv port 3000...'))
