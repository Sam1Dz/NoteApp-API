"use strict";

const Time = require("moment");
const Response = require("../libraries/responses.lib");
const Database = require("../database");

require("dotenv").config();

exports.getCategory = (_, res) => {
  console.log(
    `"${process.env.BASE_URI}/get/category" Requested at ${Time().format(
      "YYYY/MM/DD HH:mm:ss"
    )}`
  );

  Database.query("SELECT * FROM public.td_category")
    .then((dbRes) => {
      Response.resMapping(
        res,
        dbRes.rows,
        { total: dbRes.rowCount },
        "Get Category Success"
      );
    })
    .catch((err) => {
      Response.error(res, 400, err.stack, err, true);
    });
};

exports.addCategory = (req, res) => {
  console.log(
    `"${process.env.BASE_URI}/add/category" Requested at ${Time().format(
      "YYYY/MM/DD HH:mm:ss"
    )}`
  );

  // Request
  const value = req.body.value;

  Database.query(
    "INSERT INTO public.td_category (category, date_created) VALUES ($1, NOW())",
    [value]
  )
    .then(() => {
      Response.ok(res, "Create Category Success!");
    })
    .catch((err) => {
      Response.error(res, 400, err.stack, err, true);
    });
};

exports.editCateory = (req, res) => {
  console.log(
    `"${process.env.BASE_URI}/edit/category" Requested at ${Time().format(
      "YYYY/MM/DD HH:mm:ss"
    )}`
  );

  // Request
  const id = req.params.id;
  const value = req.body.value;

  Database.query(
    "SELECT count(*) AS total FROM public.td_category WHERE id_category = $1",
    [id]
  )
    .then((dbRes) => {
      if (dbRes.rows[0].total > 0) {
        Database.query(
          "UPDATE public.td_category SET category = $2, date_updated = NOW() WHERE id_category = $1",
          [id, value]
        )
          .then(() => {
            Response.ok(res, "Edit Category Success!");
          })
          .catch((err) => {
            Response.error(res, 400, err.stack, err, true);
          });
      } else {
        Response.ok(res, "Category Not Found!");
      }
    })
    .catch((err) => {
      Response.error(res, 400, err.stack, err, true);
    });
};

exports.deleteCategory = (req, res) => {
  console.log(
    `"${process.env.BASE_URI}/delete/category" Requested at ${Time().format(
      "YYYY/MM/DD HH:mm:ss"
    )}`
  );

  // Request
  const id = req.params.id;

  Database.query(
    "SELECT count(*) AS total FROM public.td_category WHERE id_category = $1",
    [id]
  )
    .then((dbRes) => {
      if (dbRes.rows[0].total > 0) {
        Database.query(
          "DELETE FROM public.td_category WHERE id_category = $1",
          [id]
        )
          .then(() => {
            Response.ok(res, "Delete Category Success!");
          })
          .catch((err) => {
            Response.error(res, 400, err.stack, err, true);
          });
      } else {
        Response.ok(res, "Category Not Found!");
      }
    })
    .catch((err) => {
      Response.error(res, 400, err.stack, err, true);
    });
};
