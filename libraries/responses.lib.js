"use strict";

exports.ok = (res, message) => {
  const result = {
    error: false,
    message: message,
  };
  res.status(200);
  res.json(result);
  res.end();
};
