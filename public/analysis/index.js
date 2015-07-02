$(function () {
	var analysis = {};
	analysis = {
		initialize: function () {
			var self = this;
			self.analysisData();
			this.bindUI();
		},
		bindUI: function () {
			var self = this;
			$("#file_upload").click(function () {
				self.uploadFile();
			});
			$("#J_Files").click(function () {
				$("#spanMessage").html("选择文件，并上传");
			});
			$("body").delegate("#J_analysis", "click", function () {
				location.href = './handle';
			})
		},
		uploadFile: function () {

			var formData = new FormData($("#frmUploadFile")[0]);
			$.ajax({
				url: './upload',
				type: 'POST',
				data: formData,
				async: false,
				cache: false,
				contentType: false,
				processData: false,
				success: function (data) {
					if (200 === data.code) {
						var span = $("#spanMessage")
						span.html("上传成功");
						$(".J_analysis").show();
					} else {
						$("#spanMessage").html("上传失败");
					}
				},
				error: function () {
					$("#spanMessage").html("与服务器通信发生错误");
				}
			});
		},
		analysisData: function () {
			var self = this;
			var os = {};
			var deviceType = {};
			var deviceName = {};
			var browserName = {};
			if (!window.UADATA) return;
			$("#J_num").text(window.UADATA.length - 1);
			$.each(UADATA, function (index, items) {
				var item = detector.parse(items[0]);
				//计算os的平台及个数
				var ons = item.os.name;
				if (ons in os) {
					os[ons]++;
				} else {
					os[ons] = 1;
				}
				//计算设备厂家
				var dt = item.device.name;
				if (dt in deviceType) {
					deviceType[dt]++;
				} else {
					deviceType[dt] = 1;
				}
				//计算设备型号
				var dn = item.device.name + (item.device.fullVersion == -1 ? '' : ' ' + item.device.fullVersion);
				if (dn in deviceName) {
					deviceName[dn]++;
				} else {
					deviceName[dn] = 1;
				}
				//浏览器分布
				var bn = item.browser.name;
				if (bn in browserName) {
					browserName[bn]++;
				} else {
					browserName[bn] = 1;
				}
			})

			self.chart(self.objToArray(os), 'os的平台及个数')
			self.chart(self.objToArray(deviceType), '设备厂家分布')
			self.chart(self.objToArray(deviceName), '设备型号分布')
			self.chart(self.objToArray(browserName), '浏览器分布')

		},
		objToArray: function (obj) {
			var tempArr = [];
			for (var i in obj) {
				var ta = [];
				ta[0] = i;
				ta[1] = obj[i];
				tempArr.push(ta)
			}
			return tempArr;
		},
		chart: function (data, title) {
			var ts = +new Date();
			var ele = document.createElement('div');
			ele.setAttribute("id", "chart_" + ts);
			ele.setAttribute("class", "chart");
			$("body").append(ele)
			$('#chart_' + ts).highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: title
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				credits: {
					enabled: false
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							style: {
								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						}
					}
				},
				series: [{
					type: 'pie',
					name: '百分比',
					data: data
				}]
			});
		}

	}

	analysis.initialize();
})