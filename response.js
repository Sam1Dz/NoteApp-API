'use strict'

exports.ok = function (value, res){
    const data = {
        status: 200,
        values: value
    };
    res.json(data);
    res.end();
}

exports.okInfo = function (value, total, page, pages, limits ,res){
	const data = {
		status: 200,
		values: value,
		total: total,
		page: page,
		totalPage: pages,
		limit: limits
	};
	res.json(data);
	res.end();
}

exports.notFound = function (value, res){
	const data = {
		status: 404,
		values: value
	};
	res.json(data);
	res.end();
}