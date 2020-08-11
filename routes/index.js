"use strict";

const Response = require("../libraries/responses.lib");
// const controller = require("../controller");

module.exports = (app) => {
  /* CONFIG */
  app.get("/notes/v1", (_, res) =>
    Response.ok(res, "API NoteApp Connected Successfully")
  );

  //   // GET
  //   app.get("/notejs/", controller.welcome);
  //   app.get("/notejs/data/note", controller.note);
  //   app.get("/notejs/data/category", controller.category);

  //   // POST
  //   app.post("/notejs/send/data_note", controller.sendNote);
  //   app.post("/notejs/send/data_category", controller.sendCategory);

  //   // PATCH
  //   app.patch("/notejs/edit/data_note", controller.updateNote);
  //   app.patch("/notejs/edit/data_category", controller.updateCategory);

  //   // DELETE
  //   app.delete("/notejs/delete/data_note", controller.deleteNote);
  //   app.delete("/notejs/delete/data_category", controller.deleteCategory);
};
