'use strict'

module.exports = function (app, corsOptions) {
    const controller = require('./controller');
    const cors = require('cors')

    // GET 「取得」
    app.get('/notejs/', cors(corsOptions), controller.welcome)
    app.get('/notejs/data/note', cors(corsOptions), controller.note)
    app.get('/notejs/data/category', cors(corsOptions), controller.category)

    // POST 「役職」
    app.post('/notejs/send/data_note', controller.sendNote)
    app.post('/notejs/send/data_category', controller.sendCategory)

    // PATCH 「パッチ」
    app.patch('/notejs/edit/data_note', controller.updateNote)
    app.patch('/notejs/edit/data_category', controller.updateCategory)

    // DELETE 「削除」
    app.delete('/notejs/delete/data_note', controller.deleteNote)
    app.delete('/notejs/delete/data_category', controller.deleteCategory)
}