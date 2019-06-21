'use strict'

const response = require('./response');
const connection = require('./connect');
const jikan = require('moment');

// Test API Server
exports.welcome = function (req, res) {
    let timeText = jikan().format('YYYY-MM-DD HH:mm:ss');
    response.ok('Welcome to NoteApp API!! (' + timeText + ')', res);
}

// Read Data tb_note
exports.note = function (req, res) {
    let queryParams = { // Query Script Function
        search: req.query.search,
        sort: req.query.sort,
        page: req.query.page,
        limit: req.query.limit,
    }

    let searching = queryParams.search ? queryParams.search : ''; // This Code Will Check If 'queryParam.search' is Undefined or not
    let sortings = queryParams.sort ? queryParams.sort : ''; // This Code Will Check If 'queryParam.sort' is Undefined or not
    let limits = queryParams.limit ? queryParams.limit : 10; // This Code Will Check If 'queryParam.limit' is Undefined or not
    let page = queryParams.page ? queryParams.page : 1; // This Code Will Check If 'queryParam.page' is Undefined or not
    let startLimit = (queryParams.page > 1) ? (queryParams.page * limits) - limits : 0;

    connection.query( // Count Total data on Data Note
        `SELECT COUNT(id_note) AS total FROM tb_note`,
        function (err, rows) {
            if (err) {
                throw err;
            }else{
                var total = rows[0].total;
                var pages = Math.ceil(rows[0].total/limits);
            }

        if (queryParams.search == undefined && queryParams.sort == undefined && queryParams.page == undefined) { // If All Undefined, Run this Code
            connection.query(
                `SELECT tb_note.id_note, tb_note.note, tb_note.time_created, tb_note.time_update, tb_category.name FROM tb_note JOIN tb_category ON tb_category.id_category = tb_note.id_category LIMIT ${limits} OFFSET ${startLimit}`,
                function (err, rows, field) {
                    if (err) {
                        console.log(err)
                    } else {
                        response.okInfo(rows, total, page, pages, limits, res)
                    }
                }
            )
        }else if (queryParams.search != undefined && queryParams.sort != undefined && queryParams.page != undefined) { // If All Defined, Run this Code
            connection.query(
                `SELECT COUNT(id_note) AS total FROM tb_note WHERE note LIKE '%${searching}%' `,
                function (err, rows) {
                    if (err) {
                        console.log(err)
                    }else{
                        var pages = Math.ceil(rows[0].total/limits);
                    }

                connection.query(
                    `SELECT tb_note.id_note, tb_note.note, tb_note.time_created, tb_note.time_update, tb_category.name FROM tb_note JOIN tb_category ON tb_category.id_category = tb_note.id_category WHERE tb_note.note LIKE '%${searching}%' ORDER BY tb_note.time_created ${sortings} LIMIT ${limits} OFFSET ${startLimit}`,
                    function (err, rows, field) {
                        if (err) {
                            console.log(err)
                        }else{
                            if (rows.length > 0) {
                                response.okInfo(rows, total, queryParams.page, pages, limits, res)
                            }else{
                                response.notFound("Query '"+searchs+"' Not Found", res)
                            }
                        }
                    })
                }
            )
        }else if(searching == '' && sortings != '' && queryParams.page == undefined){ // Only sort is Defined
            console.log('Sorting')
            connection.query(
                `SELECT tb_note.id_note, tb_note.note, tb_note.time_created, tb_note.time_update, tb_category.name FROM tb_note JOIN tb_category ON tb_category.id_category = tb_note.id_category ORDER BY tb_note.time_created ${sortings} LIMIT ${limits} OFFSET ${startLimit}`,
                function (err, rows, field) {
                    if (err) {
                        console.log(err)
                    }else{
                        response.okInfo(rows, total, page, pages, limits, res)
                    }
                }
            )
        }else{
            connection.query(
                `SELECT COUNT(id_note) AS total FROM tb_note WHERE note LIKE '%${searching}%' `,
                function (err, rows) {
                    if (err) {
                        console.log(err)
                    }else{
                        var pages = Math.ceil(rows[0].total/limits);
                    }

                connection.query(
                    `SELECT tb_note.id_note, tb_note.note, tb_note.time_created, tb_note.time_update, tb_category.name FROM tb_note JOIN tb_category ON tb_category.id_category = tb_note.id_category WHERE tb_note.note LIKE '%${searching}%' ORDER BY tb_note.time_created ${sortings} LIMIT ${limits} OFFSET ${startLimit}`,
                    function (err, rows, field) {
                        if (err) {
                            console.log(err)
                        }else{
                            if (rows.length > 0) {
                                response.okInfo(rows, total, page, pages, limits, res)
                            }else{
                                response.notFound("Query '"+searchs+"' Not Found", res)
                            }
                        }
                    })
                }
            )
        }
    })
}

// Read Data tb_category
exports.category = function (req, res) {
    connection.query(
        'SELECT * FROM tb_category',
        function (err, rows, field) {
            if (err) {
                console.log(err)
            } else {
                response.ok(rows, res)
            }
        }
    )
}

// Create Data tb_note
exports.sendNote = function (req, res) {
    let noteText = req.body.note_text;
    let timeText = jikan().format('YYYY-MM-DD HH:mm:ss');
    let categoryId = req.body.category_id;
    connection.query(
        `INSERT INTO tb_note SET note=?, time_created=?, id_category=?`,
        [noteText, timeText, categoryId],
        function (err, rows, field) {
            if (err) {
                throw err;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    message: 'Data Note has been Created (データNoteが作成されました)'
                })
            }
        }
    )
}

// Create Data tb_category
exports.sendCategory = function (req, res) {
    let categoryText = req.body.category_text;
    connection.query(
        `INSERT INTO tb_category SET name=?`,
        [categoryText],
        function (err, rows, field) {
            if (err) {
                throw err;
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'Data Category has been Created (データCategoryが作成されました)'
                })
            }
        }
    )
}

// Update Data tb_note
exports.updateNote = function (req, res) {
    let noteText = req.body.note_text;
    let categoryId = req.body.category_id;
    let noteID = req.body.note_id;
    connection.query(
        `UPDATE tb_note SET note=?, id_category=? WHERE id_note=?`,
        [noteText, categoryId, noteID],
        function (err, rows, field) {
            if (err) {
                console.log(err)
                throw err;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    message: 'Data Note has been Edited (データNoteが編集されました)'
                })
            }
        }
    )
}

// Update Data tb_category
exports.updateCategory = function (req, res) {
    let categoryText = req.body.category_text;
    let categoryID = req.body.category_id;
    connection.query(
        `UPDATE tb_category SET name=? WHERE id_category=?`,
        [categoryText, categoryID],
        function (err, rows, field) {
            if (err) {
                throw err;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    message: 'Data Category has been Edited (データCategoryが編集されました)'
                })
            }
        }
    )
}

// Delete Data tb_note
exports.deleteNote = function (req, res) {
    let noteID = req.body.note_id;
    connection.query(
        `DELETE FROM tb_note WHERE id_note=?`,
        [noteID],
        function (err, rows, field) {
            if (err) {
                throw err;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    message: 'Data Note has been Deleted (データNoteは削除されました)'
                })
            }
        }
    )
}

// Delete Data tb_category
exports.deleteCategory = function (req, res) {
    let categoryID = req.body.category_id;
    connection.query(
        `DELETE FROM tb_category WHERE id_category=?`,
        [categoryID],
        function (err, rows, field) {
            if (err) {
                throw err;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    message: 'Data Category has been Deleted (データCategoryは削除されました)'
                })
            }
        }
    )
}