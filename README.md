# uaAnalysis


uaAnalysis is a userAgent detector and it will be analysis the data by uploaded file.Currently supports '.xlsx' format files.

### How to use

* find the clone URL and clone the Repo.
* enter the path as follows: `uaAnalysis/` ,run `npm install`.

### Dependent environment
* `nodejs`



### 中文使用说明
* 在部署好环境之后，可以访问`http://localhost:3000`页面
* 上传数据源文件`xxx.xlsx`文件
	* 文件中包含一列(几万条)ua数据，每一条的内容是js命令`window.navigator.userAgent`取到的内容，类似
	`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36`
* 上传成功之后，点击分析按钮，会跳转到结果页，结果是关于几个指标的图标展示
* 关于结果可以自己定制，请直接看源码。
	