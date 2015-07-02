'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multipart = require('connect-multiparty');

router.get('/', function (req, res) {
	res.render('analysis/useragent', {});
});
// 上传
router.post('/upload', multipart(), function (req, res) {
	var filename = req.files.files.originalFilename || path.basename(req.files.files.ws.path);

	var targetPath = path.join(__dirname, '../') + 'public/analysis/assets/temp.xlsx';

	//删除已有文件，删除文件的时候可以不用带后缀，带了后缀反而报错，catch异常的时候可以发现问题
	fs.unlink(path.join(__dirname, '../') + 'public/analysis/assets/temp', function (err) {
		console.warn(err)
	})
	fs.createReadStream(req.files.files.ws.path).pipe(fs.createWriteStream(targetPath));

	res.json({
		code: 200,
		msg: "文件上传成功"
	});
});

//解析数据
router.get('/handle', function (req, res) {
	var xlsx = require('node-xlsx');
	var obj = xlsx.parse(path.join(__dirname, '../') + 'public/analysis/assets/temp.xlsx');
	res.render('analysis/result', {
		data: JSON.stringify(obj[0])
	});
})



module.exports = router;