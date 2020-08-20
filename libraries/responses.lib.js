"use strict";

exports.ok = (res, message) => {
  const result = {
    error: false,
    message,
  };
  res.status(200);
  res.json(result);
  res.end();
};

exports.resMapping = (res, data, otherParams, message) => {
  const result = {
    error: false,
    message,
    data,
  };

  Object.entries(otherParams).forEach(([key, value]) => {
    result[key] = value;
  });

  res.status(200);
  res.json(result);
  res.end();
};

exports.error = (res, code, message, detail, error) => {
  const result = {
    error: typeof error === "undefined" ? true : error !== null ? error : true,
    message
  };

  if (detail !== null) result.errorDetail = detail;

  if (code !== null) res.status(code);
  res.json(result);
  res.end();
};
