"use strict";

const Time = require("moment");
const Response = require("../libraries/responses.lib");
const Category = require("../controllers/category");

require("dotenv").config();

module.exports = (app) => {
  /* CONFIG */
  app.get(`${process.env.BASE_URI}`, (_, res) => {
    Response.ok(res, "API NoteApp Connected Successfully");
    console.log(
      '"/notes/v1" Requested at ' + Time().format("YYYY/MM/DD HH:mm:ss")
    );
  });

  /* CATEGORY */
  app.get(`${process.env.BASE_URI}/get/category`, Category.getCategory);
  app.post(`${process.env.BASE_URI}/add/category`, Category.addCategory);
  app.patch(`${process.env.BASE_URI}/edit/category/:id`, Category.editCateory);
  app.delete(
    `${process.env.BASE_URI}/delete/category/:id`,
    Category.deleteCategory
  );

  // // GET
  // app.get("/notejs/data/category", controller.category);

  // // POST
  // app.post("/notejs/send/data_note", controller.sendNote);

  // // PATCH
  // app.patch("/notejs/edit/data_note", controller.updateNote);

  // // DELETE
  // app.delete("/notejs/delete/data_note", controller.deleteNote);
};
