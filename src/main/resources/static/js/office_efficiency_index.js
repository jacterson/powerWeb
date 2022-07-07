//全局客户类型(1:公众;2:政企)
var g_custType = "1";
//数据日期
var g_dataDate = "20191231"
//全局渠道信息
var g_channelInfo = {};
var g_channelCode = "";
var g_channelName = "";
var myChart_pie;
var dataCake;

//企业用户聚类类别数量占比分布图

function loadChannelBaseInfo(data) {

	// var dataCake = [
	// 	{ value: 66, name: '0类' },
	// 	{ value: 33, name: '1类' },
	// 	{ value: 70, name: '2类' },
	// 	{ value: 100, name: '3类' }
	// ]
	var data_info = data.labels_count;
	dataCake = data_info[0];

	var option = {
		title: {
			text: '',
			subtext: '',
			left: 'center'
		},
		tooltip: {
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '20',
				color: '#ffffff'//字体颜色
			},
			trigger: 'item',
			formatter: "{b} : {c} 人  占{d}%"   //鼠标放上去 展示内容
		},
		legend: {
			orient: 'vertical',
			left: '63%',  //图例距离左的距离
			top: '24%',
			// y: 'center',  //图例上下居中
			itemGap: 20,
			formatter: function (name) {
				let target, percentage;
				for (let i = 0; i < dataCake.length; i++) {
					if (dataCake[i].name === name) {
						target = dataCake[i].value
						// percentage = dataCake[i].percentage
					}
				}
				let arr = [name + ' ', " " + target + "人 "]
				return arr.join(" ")
			},
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			}

		},
		color: ['#e3935d', '#eecb5f', '#61a5e8',
			'#e16757', '#9570e4'],//五个数据，五个颜色
		series: [
			{
				name: '企业用户聚类类别数量',
				type: 'pie',
				// radius: ['40%', '70%'],
				radius: '63%', // 控制饼图大小
				center: ['33%', '45%'], //性设置图的上下左右的位置
				data: dataCake,
				// 设置值域的标签
				label: {
					normal: {
						fontSize: '18',
						position: 'inside',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
						// formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
						// {a}指series.name  {b}指series.data的name
						// {c}指series.data的value  {d}%指这一部分占总数的百分比
						formatter: '{d}%'
						// formatter: '{b}'

					}
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '30',
						fontWeight: 'bold',
					},
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};


	myChart_pie = echarts.init(document.getElementById('base-info'));
	myChart_pie.clear();
	myChart_pie.setOption(option);

}


//渠道报告内容建议说明
// function channelReportContent(rePortData) {
// 	var reportContent = "很抱歉，目前暂无可分析的数据";
// 	if (undefined != rePortData.channelAvgTime && "" != rePortData.channelAvgTime) {
// 		if (rePortData.channelAvgTime > 20) {
// 			if (rePortData.popval <= 0.3) {
// 				reportContent = "业绩很棒，受理偏慢，请适当加快受理";
// 			} else {
// 				reportContent = "受理速度偏慢，影响客户感知，请加强受理技能培训";
// 			}
// 		} else {
// 			//判断厅是否有排队机
// 			if (rePortData.lineUpData.length > 0) {
// 				var callTime = rePortData.lineUpData[rePortData.lineUpData.length - 1];
// 				var t1 = rePortData.channelAvgTime - callTime;
// 				if (t1 >= 3) {
// 					if (rePortData.popval <= 0.3) {
// 						reportContent = "门店运营良好，可适当提升受理速度";
// 					} else {
// 						reportContent = "门店运营良好，建议加强营销";
// 					}
// 				} else if (callTime > rePortData.channelAvgTime) {
// 					reportContent = "门店台席规划不合理，存在客户积压，请按业务类型分流";
// 				} else if (0 <= t1 && t1 < 3) {
// 					if (rePortData.popval <= 0.3) {
// 						reportContent = "门店运营状态良好，台席规划合理，请继续保持";
// 					} else {
// 						reportContent = "台席规划合理，建议适当加强营销";
// 					}
// 				}
// 			} else {
// 				var custNum = rePortData.custNumData[rePortData.custNumData.length - 1] || 0;
// 				if (custNum <= 50) {
// 					if (rePortData.popval <= 0.3) {
// 						reportContent = "营业效能规划合理，厅内客流量仍有上升空间";
// 					} else {
// 						reportContent = "客流较小，请加强营销手段";
// 					}
// 				} else {
// 					if (rePortData.popval <= 0.3) {
// 						reportContent = "厅店客流量大，营业效能规划合理，请继续保持";
// 					} else {
// 						reportContent = "厅店客流量大，请把握机会加强营销";
// 					}
// 				}
// 			}
// 		}
// 	}
// 	$(".analysis-info").text(reportContent);
// }

//用户用电曲线聚类类别分析一览图
function loadChannelHandleDetail(data) {
	// console.log(data.ylabels[0].num1);
	$(".date").text(data.date[0]) // 显示日期
	$(".counts").text("220位企业用户")


	var option = {
		tooltip: { trigger: 'axis', axisPointer: { lineStyle: { color: '#fff' } } },
		legend: {
			icon: 'rect',
			itemWidth: 14, itemHeight: 5, itemGap: 10,
			data: ['0类', '1类', '2类', '3类'],
			right: '10px', top: '0px',
			textStyle: { fontSize: 12, color: '#fff' }
		},
		grid: { x: 40, y: 50, x2: 45, y2: 40, left: '5%' },
		xAxis: [{
			type: 'category', boundaryGap: false, axisLine: { lineStyle: { color: '#57617B' } }, axisLabel: { textStyle: { color: '#fff' } },
			data: data.xlabels
		}],
		yAxis: [{
			name: '平均用电量',
			nameTextStyle: {
				color: "#ffffff",
				fontSize: 14,
				padding: 10
			},
			type: 'value',
			axisTick: {
				show: false
			},
			axisLine: { lineStyle: { color: '#57617B' } },
			axisLabel: { margin: 10, textStyle: { fontSize: 12 }, textStyle: { color: '#fff' }, formatter: '{value}kw' },
			splitLine: { lineStyle: { color: '#57617B' } }
		}, {
			type: 'value',
			axisTick: {
				show: false
			},
			axisLine: { lineStyle: { color: '#57617B' } },
			axisLabel: { margin: 10, textStyle: { fontSize: 12 }, textStyle: { color: '#fff' }, formatter: '{value}' },
			splitLine: { show: false, lineStyle: { color: '#57617B' } }
		}
		],
		series: [{
			name: '0类', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
			yAxisIndex: 0,
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(185,150,248,0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(185,150,248,0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: { normal: { color: '#B996F8' } },
			data: data.ylabels[0].num1
		}, {
			name: '1类', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
			yAxisIndex: 0,
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(3, 194, 236, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(3, 194, 236, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: { normal: { color: '#03C2EC' } },
			data: data.ylabels[0].num2
		}, {
			name: '2类', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
			yAxisIndex: 1,
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(218, 57, 20, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(218, 57, 20, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: { normal: { color: '#DA3914' } },
			data: data.ylabels[0].num3
		}, {
			name: '3类', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
			yAxisIndex: 1,
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(232, 190, 49, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(232, 190, 49, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: { normal: { color: '#E8BE31' } },
			data: data.ylabels[0].num4
		}]


	};
	var myChart = echarts.init(document.getElementById('channel_handle_detail'));
	myChart.clear();
	myChart.setOption(option);

	// if (data.handleTimeData.length > 0) {
	// 	myChart.setOption(option);
	// } else {
	// 	noDataTip($("#channel_handle_detail"));
	// }


	// 设置定时器动态更新数据源来实现动态折线、动态饼图的效果
	setInterval(function () {
		//random方法随机生成一个下标，随机显示不同日期(7月1日-7月31日）的聚类曲线
		let n = 31;
		let random_number = Math.floor(Math.random() * Math.floor(n));

		// myChart.clear()
		// myChart.setOption(option2)
		myChart.setOption({
			series: [{
				name: '0类',
				data: data.ylabels[random_number].num1
			},
			{
				name: '1类',
				data: data.ylabels[random_number].num2
			},
			{
				name: '2类',
				data: data.ylabels[random_number].num3
			},
			{
				name: '3类',
				data: data.ylabels[random_number].num4
			}]
		});

		// console.log(random_number);
		// console.log(data.labels_count[12]);
		// 同步更新企业用户聚类类别数量对比分析图的数据源
		dataCake = data.labels_count[random_number]
		myChart_pie.setOption({
			series: [{
				// name: '企业用户聚类类别数量',
				data: dataCake
			}]
		});

		$(".date").text(data.date[random_number]) // 显示日期

	}, 3000); //3s更新一次数据源

}


//用户缴费价值分析
function loadStaffHandleDetail(data) {
	// //获取员工违规信息
	// var staffWgInfo=data.staffWgInfo;
	// //获取员工积分信息
	// var channelJfMap=data.channelJfMap;
	// var channelStaffLen=data.channelStaffLen;
	// 基本信息
	var staffHandleInfo = data.staffHandleInfo || [], staffHandleInfoLen = staffHandleInfo.length;
	var html = [], index = 0;
	for (var key in staffHandleInfo) {
		var itemArr = staffHandleInfo[key]; // 获取字典/对象下每个键的值（是个字典列表）
		// console.log("itemArr",itemArr)

		index++;
		// var indexClass=(1==index)?"first":"";
		// var wgCount=staffWgInfo[itemArr[0].staffCode] || "0";
		var tr1 = [
			'<tr class="td-avg-time">',
			'<td colspan="3">',
			'<div style="color:#FFD14E;font-size:18px;font-weight:600;">用户ID</div>',
			'<div class="staff-name">&nbsp;&nbsp;' + itemArr[0].userId + '</div>',
			// '<div class="avg-time-label">|&nbsp;&nbsp;厅排名</div>',
			// '<div class="avg-time-value">'+itemArr[0].index+'/'+channelStaffLen+'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td> ',
			'<div class="staff-cust-time">',
			'<span style="font-size:15px;">缴费总金额</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">' + itemArr[0].userTotalPayMoney + '元</span>',
			'</div>',
			'</td>',
			'<td>',
			'<div class="staff-order-count">',
			'<span style="font-size:15px;">缴费总次数</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">' + itemArr[0].singleUserPayCount + '次</span>',
			'</div>',
			'</td>',
			'<td>',
			'<div class="staff-alarm">',
			'<span style="font-size:15px;">用户类型</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">' + itemArr[0].userType + '</span>',
			'</div>',
			'</td>',
			'</tr> ',
			'<tr class="td-integral" style="height:40px;"> ',
			'<td colspan="3"> ',
			'<div class="integral-label">排名：<span>' + itemArr[0].rank + '</span></div> ',
			// '<div class="integral-value">分</div> ',
			// '<div class="integral-label" style="width:60px;">|厅排名</div>',
			'<div class="integral-value" style="width:100px;"></div>',
			'</td> ',
			'</tr> ',
		];
		var tr2 = [];
		if (itemArr.length > 1) { //若每个字典列表中包含的用户超过1个则动态创建
			index++;
			// var indexClass=(2==index)?"second":"";
			// var wgCount=staffWgInfo[itemArr[1].staffCode] || "0";
			tr2 = [
				'<tr class="td-avg-time" style="margin-top:150px">',
				'<td colspan="3">',
				'<div style="color:#FFD14E;font-size:18px;font-weight:600;" >用户ID</div>',
				'<div class="staff-name">&nbsp;&nbsp;' + itemArr[1].userId + '</div>',
				// '<div class="avg-time-label">|&nbsp;&nbsp;厅排名</div>',
				// '<div class="avg-time-value">'+itemArr[0].index+'/'+channelStaffLen+'</div>',
				'</td>',
				'</tr>',
				'<tr>',
				'<td> ',
				'<div class="staff-cust-time">',
				'<span style="font-size:15px;">缴费总金额</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">' + itemArr[1].userTotalPayMoney + '元</span>',
				'</div>',
				'</td>',
				'<td>',
				'<div class="staff-order-count">',
				'<span style="font-size:15px;">缴费总次数</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">' + itemArr[1].singleUserPayCount + '次</span>',
				'</div>',
				'</td>',
				'<td>',
				'<div class="staff-alarm">',
				'<span style="font-size:15px;">用户类型</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">' + itemArr[1].userType + '</span>',
				'</div>',
				'</td>',
				'</tr> ',
				'<tr class="td-integral" style="height:40px;"> ',
				'<td colspan="3"> ',
				'<div class="integral-label">排名：<span>' + itemArr[1].rank + '</span></div> ',
				// '<div class="integral-value">分</div> ',
				// '<div class="integral-label" style="width:60px;">|厅排名</div>',
				'<div class="integral-value" style="width:100px;"></div>',
				'</td> ',
				'</tr> ',
			]
		}

		var staffHtml = [
			'<div class="swiper-slide">',
			'<table>',
			tr1.join(""),
			tr2.join(""),
			'</table>',
			'</div> '
		];
		html.push(staffHtml.join(""));
	}
	$("#staff-info").html("");
	if (html.length > 0) {
		var dataHtml = "<div class='swiper-container visual_swiper_staffInfo'><div class='swiper-wrapper'>" + html.join("") + "</div>"
		$("#staff-info").html(dataHtml);

		var mySwiper1 = new Swiper('.visual_swiper_staffInfo', {
			autoplay: false,//可选选项，自动滑动
			speed: 1500,//可选选项，滑动速度
			autoplay: {
				delay: 2000,//毫秒
			}
		});
	} else {
		noDataTip($("#staff-info"));
	}
}




//【新增】 tab切换 改变数据源
function tab_change(data) {
	// 平均缴费金额相关数据
	var staffHandleInfo2 = data.staffHandleInfo2 || []
	var staffHandleInfo2Len = Object.keys(staffHandleInfo2).length * 2;
	// console.log(staffHandleInfo2);
	// console.log(staffHandleInfo2Len);

	// 总缴费金额相关数据
	var staffHandleInfo = data.staffHandleInfo || []
	var staffHandleInfoLen = Object.keys(staffHandleInfo).length * 2;
	// console.log(staffHandleInfo);
	// console.log(staffHandleInfoLen);

	// 整理数据
	var userAvgMoney_list = [], singleUserPayCount_list = [], userType_list = [], rank_list = [];
	var userTotalPayMoney_list = [], singleUserPayCount_list2 = [], userType_list2 = [], rank_list2 = [];

	// 整理平均缴费金额等相关数据
	for (var key in staffHandleInfo2) {
		var itemArr = staffHandleInfo2[key];
		// console.log(itemArr[0].userAvgMoney);
		// 平均缴费金额
		userAvgMoney_list.push(itemArr[0].userAvgMoney)
		userAvgMoney_list.push(itemArr[1].userAvgMoney)
		// 平均缴费次数
		singleUserPayCount_list.push(itemArr[0].singleUserPayCount)
		singleUserPayCount_list.push(itemArr[1].singleUserPayCount)
		// 价值类型
		userType_list.push(itemArr[0].userType)
		userType_list.push(itemArr[1].userType)
		// 排名
		rank_list.push(itemArr[0].rank)
		rank_list.push(itemArr[1].rank)
	}

	// console.log(userAvgMoney_list);
	// console.log(singleUserPayCount_list);
	// console.log(userType_list);
	// console.log(rank_list);

	// 整理缴费总金额等相关数据
	for (var key in staffHandleInfo) {
		var itemArr = staffHandleInfo[key];
		// 缴费总金额
		userTotalPayMoney_list.push(itemArr[0].userTotalPayMoney)
		userTotalPayMoney_list.push(itemArr[1].userTotalPayMoney)
		// 总缴费次数
		singleUserPayCount_list2.push(itemArr[0].singleUserPayCount)
		singleUserPayCount_list2.push(itemArr[1].singleUserPayCount)
		// 价值类型
		userType_list2.push(itemArr[0].userType)
		userType_list2.push(itemArr[1].userType)
		// 排名
		rank_list2.push(itemArr[0].rank)
		rank_list2.push(itemArr[1].rank)
	}

	// console.log(userAvgMoney_list);
	// console.log(singleUserPayCount_list);
	// console.log(userType_list2);
	// console.log(rank_list2);


	// tab栏选项切换轮播图展示内容（选项变换选中颜色）
	$(".cust-type-default").on("click", function () {
		$(this).addClass("active").siblings().removeClass("active");
		// g_custType = $(this).attr("type");
		// $("#query-page-data").trigger("click");
		// console.log(111);
	});



	// 按月选项
	$(".month").on("click", function () {

		// console.log($("#staff-info .staff-cust-time>span:nth-child(3)")[1]);

		$("#staff-info .staff-cust-time>span:nth-child(1)").text("平均缴费金额")
		$("#staff-info .staff-order-count>span:nth-child(1)").text("缴费次数")

		// 设置值
		$('#staff-info .staff-cust-time span:nth-child(3)').each(function (i) { // 遍历平均缴费金额并设置新值
			console.log($(this).text());
			$(this).text(userAvgMoney_list[i])
		});

		$('#staff-info .staff-order-count span:nth-child(3)').each(function (i) { // 遍历平均缴费次数并设置新值
			console.log($(this).text());
			$(this).text(singleUserPayCount_list[i])
		});

		$('#staff-info .staff-alarm span:nth-child(3)').each(function (i) { // 遍历价值类别设置新的值
			console.log($(this).text());
			$(this).text(userType_list[i])

			// 特定值时更改span标签样式
			if ($(this).text() == "高价值型客户") {
				console.log("true");
				// $(this).addClass("high_value")
				$(this).css('color', '#96B97D');
			}
		});

		$('.integral-label>span').each(function (i) { // 遍历排名并设置新值
			console.log($(this).text());
			$(this).text(rank_list[i])
		});

	});

	// 按年选项
	$(".year").on("click", function () {

		// console.log($("#staff-info .staff-cust-time>span:nth-child(3)")[1]);

		$("#staff-info .staff-cust-time>span:nth-child(1)").text("缴费总金额")
		$("#staff-info .staff-order-count>span:nth-child(1)").text("缴费总次数")

		// 设置值

		$('#staff-info .staff-cust-time span:nth-child(3)').each(function (i) { // 遍历缴费总金额
			console.log($(this).text());
			$(this).text(userTotalPayMoney_list[i])
		});

		$('#staff-info .staff-order-count span:nth-child(3)').each(function (i) { // 遍历缴费总次数
			console.log($(this).text());
			$(this).text(singleUserPayCount_list2[i])
		});

		$('#staff-info .staff-alarm span:nth-child(3)').each(function (i) { // 遍历价值类别设置新的值
			console.log($(this).text());
			$(this).text(userType_list2[i])

			// if ($(this).text() == "高价值型客户") {
			// 	console.log("true");
			// 	$(this).addClass("high_value")
			// }
		});

		$('.integral-label>span').each(function (i) { // 遍历排名并设置新值
			// console.log($(this).text());
			$(this).text(rank_list2[i])
		});

	});

	// console.log($('#staff-info .staff-alarm span:nth-child(3)').text());

	// 将所有为高价值类型的span标签设置新样式
	$('#staff-info .staff-alarm span:nth-child(3)').each(function (i) { // 遍历价值类别设置新的值
		// console.log($(this).text());
		// console.log(typeof ($(this).text()));

		if ($(this).text() == "高价值型客户") {
			// console.log("true");
			// $(this).addClass("high_value")
			$(this).css('color', '#96B97D');

		}
	});

}

var gradeImg = "电力人员.png";
var gradeImg2 = "用电分析1.png";


//加载用户缴费基本情况
function loadChannelDeviceDetail(data) {
	var html = [];
	//设置台席灯
	$(".device-alarm").eq(2).find("span[type='greenGrade']").text(data.greenGrade || "0");
	$(".device-alarm").eq(1).find("span[type='redGrade']").text(data.redGrade || "0");
	$(".device-alarm").eq(0).find("span[type='grayGrade']").text(data.grayGrade || "0");
	var deviceInfo = data.deviceInfo; //获取数据
	for (var key in deviceInfo) {
		var itemArr = deviceInfo[key];

		// itemArr[0].up = itemArr[0].up || "--";
		// itemArr[0].down = itemArr[0].down || "--";
		// var gradeImg = "";
		// if (1 == itemArr[0].healthGrade) {
		// 	gradeImg = "device-green.png";
		// } else if (2 == itemArr[0].healthGrade) {
		// 	gradeImg = "device-red.png";
		// } else {
		// 	gradeImg = "device-gray.png";
		// }

		var tr1 = [
			'<tr> ',
			'<td rowspan="3" class="device-img">',
			'<img src="images/' + gradeImg + '"/>',
			'</td> ',
			'<td><div class="label-name">用户编号</div></td> ',
			'<td rowspan="3" colspan="2" class="kuan-dai"> ',
			'<div class="progress-label">最高缴费金额&nbsp;&nbsp;&nbsp;' + itemArr[0].userMaxPayMoney + '元</div>',
			'<div style="width:180px;height:15px;"> ',
			'<div class="progress" style="float:left;height:8px;width:180px;background-color:#383E60;">',
			'<div class="progress-bar progress-bar-striped" style="min-width:0;width:' + itemArr[0].userMaxPayMoney + '%"></div>',
			'</div>',
			'</div> ',
			'<div class="progress-label">最低缴费金额&nbsp;&nbsp;&nbsp;' + itemArr[0].userMinPayMoney + '元</div>',
			'<div style="width:180px;height:15px;">',
			'<div class="progress" style="float:left;height:8px;width:180px;background-color:#383E60;">',
			'<div class="progress-bar progress-bar-striped" style="min-width:0;width:' + itemArr[0].userMinPayMoney + '%"></div>',
			'</div>',
			'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td class="label-name score">' + itemArr[0].userName + '</td>',
			'</tr>',
			'<tr>',
			'<td class="label-name"><div class="os-name" title="' + (itemArr[0].osName || "--") + '">' + (itemArr[0].osName || "--") + '</div></td>',
			'</tr>',
			'<tr class="device-use">',
			'<td></td>',
			'<td><div class="nei-cun-size"><span>' + (itemArr[0].singleUserPayCount || 0) + '</span></div></td>',
			'<td><div class="cpu-use"><span>' + itemArr[0].userTotalPayMoney + '</span></div></td>',
			'<td><div class="nei-cun-use"><span>' + itemArr[0].userAvgMoney + '</span></div></td>',
			'</tr>',
			'<tr>',
			'<td></td>',
			'<td><div class="labe-value">缴费总次数</div></td>',
			'<td><div class="labe-value">缴费总金额(元)</div></td>',
			'<td><div class="labe-value">平均缴费金额(元)</div></td>',
			'</tr>'
		];
		var tr2 = [];
		if (itemArr.length > 1) {
			itemArr[1].up = itemArr[1].up || "--";
			itemArr[1].down = itemArr[1].down || "--";
			// var gradeImg = "";
			// if (1 == itemArr[1].healthGrade) {
			// 	gradeImg = "device-green.png";
			// } else if (2 == itemArr[1].healthGrade) {
			// 	gradeImg = "device-red.png";
			// } else {
			// 	gradeImg = "device-gray.png";
			// }

			tr2 = [
				'<tr><td colspan="4"><div class="split-line"></div></td></tr>',
				'<tr> ',
				'<td rowspan="3" class="device-img">',
				'<img src="images/' + gradeImg2 + '"/>',
				'</td> ',
				'<td><div class="label-name">用户编号</div></td> ',
				'<td rowspan="3" colspan="2" class="kuan-dai"> ',
				'<div class="progress-label">最高缴费金额&nbsp;&nbsp;&nbsp;' + itemArr[1].userMaxPayMoney + '元</div>',
				'<div style="width:180px;height:15px;"> ',
				'<div class="progress" style="float:left;height:8px;width:180px;background-color:#383E60;">',
				'<div class="progress-bar progress-bar-striped" style="min-width:0;width:' + itemArr[1].userMaxPayMoney + '%"></div>',
				'</div>',
				'</div> ',
				'<div class="progress-label">最低缴费金额&nbsp;&nbsp;&nbsp;' + itemArr[1].userMinPayMoney + '元</div>',
				'<div style="width:180px;height:15px;">',
				'<div class="progress" style="float:left;height:8px;width:180px;background-color:#383E60;">',
				'<div class="progress-bar progress-bar-striped" style="min-width:0;width:' + itemArr[1].userMinPayMoney + '%"></div>',
				'</div>',
				'</div>',
				'</td>',
				'</tr>',
				'<tr>',
				'<td class="label-name score">' + itemArr[1].userName + '</td>',
				'</tr>',
				'<tr>',
				'<td class="label-name"><div class="os-name" title="' + (itemArr[0].osName || "--") + '">' + (itemArr[0].osName || "--") + '</div></td>',
				'</tr>',
				'<tr class="device-use">',
				'<td></td>',
				'<td><div class="nei-cun-size"><span>' + (itemArr[1].singleUserPayCount || 0) + '</span></div></td>',
				'<td><div class="cpu-use"><span>' + itemArr[1].userTotalPayMoney + '</span></div></td>',
				'<td><div class="nei-cun-use"><span>' + itemArr[1].userAvgMoney + '</span></div></td>',
				'</tr>',
				'<tr>',
				'<td></td>',
				'<td><div class="labe-value">缴费总次数</div></td>',
				'<td><div class="labe-value">缴费总金额(元)</div></td>',
				'<td><div class="labe-value">平均缴费金额(元)</div></td>',
				'</tr>'
			]
		}
		var deviceHtml = [
			'<div class="swiper-slide">',
			'<table>',
			tr1.join(""),
			tr2.join(""),
			'</table>',
			'</div> '
		];
		html.push(deviceHtml.join(""));
	}
	$("#device-info").html("");
	if (html.length > 0) {
		var dataHtml = "<div class='swiper-container visual_swiper_deviceInfo'><div class='swiper-wrapper'>" + html.join("") + "</div>"
		$("#device-info").html(dataHtml);
		var mySwiper1 = new Swiper('.visual_swiper_deviceInfo', {
			autoplay: true,//可选选项，自动滑动
			speed: 1500,//可选选项，滑动速度
			autoplay: {
				delay: 2000,//毫秒
			}
		});
	} else {
		noDataTip($("#device-info"));
	}
}


//加载用电量预测（220位企业用户和100名居民客户）
function loadTimeStepDetail(data) {

	// 对220位企业的用电量进行排序
	data_enterprise_predict = data.enterprise["7月"] //后面等预测数据8月份的有了换成8月
	data_enterprise_history = data.enterprise["7月"]
	// console.log(data_enterprise_predict);

	//得到按键值降序排列的键数组
	let keyArr = Object.keys(data_enterprise_predict).sort(function (a, b) {
		return data_enterprise_predict[b] - data_enterprise_predict[a];   //升序
	});
	// console.log(keyArr);
	// console.log("TOP5：", keyArr.slice(0, 5));

	// for (let key of keyArr) {   //遍历键数组
	// 	console.log(key + ":" + data_enterprise_predict[key]);
	// }

	top5_enterprise = keyArr.slice(0, 5) //top5企业名称

	// 220位企业用户预测用电量
	var option = {
		color: ['#748EDE', '#91CC75'],
		title: {
			left: '4%',
			top: '2%',
			text: '220位企业用户预测用电量TOP5',
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '22',
				color: '#ffffff'//字体颜色
			}
		},
		tooltip: {
			// formatter: '{a} <br/>{b} : {c}人 (占{d}%)',

			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			},
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			top: '1%',
			left: '63%',
			textStyle: {
				fontSize: 18,//字体大小
				color: '#ffffff'//字体颜色
			}
		},
		grid: { //控制图的大小
			top: '22%',
			left: '1%',
			right: '7%',
			bottom: '2%',
			containLabel: true
		},
		xAxis: {
			// x轴的标题和样式
			name: 'kw/h',
			nameTextStyle: {
				color: '#fff',
				fontSize: 15
			},
			type: 'value',
			boundaryGap: [0, 0.01],
			axisLabel: {
				textStyle: {
					color: '#fff',
				}
			}
		},
		yAxis: {
			name: '企业id',
			nameTextStyle: {
				color: '#fff',
				fontSize: 18
			},
			axisLabel: {
				formatter: '{value}',
				textStyle: {
					color: '#fff',
				}
			},
			type: 'category',
			data: top5_enterprise
		},
		series: [
			{
				name: '2015年8月',
				type: 'bar',
				data: [18203, 23489, 29034, 104970, 131744]
			},
			{
				name: '2015年7月',
				type: 'bar',
				data: [19325, 23438, 31000, 121594, 134141]
			}
		]
	};

	// 100位居民用户预测用电量
	data_resident = data.resident
	console.log(data_resident);
	var Xdata = [], Ydata = [];
	for (var key in data_resident) {
		Ydata.push(key)
		Xdata.push(data_resident[key])
	}
	// console.log(Xdata);
	// console.log(Ydata);

	// var Xdata = ['63.27', '27.90', '33.52', '17.98', '42.25', '24.54', '33.96', '11.73', '72.58', '45.36',];
	// var Ydata = ['西安市', '铜川市', '咸阳市', '汉中市', '商洛市', '安康市', '渭南市', '宝鸡市', '延安市', '榆林市',];

	var option2 = {
		title: {
			text: '100位居民客户未来一年预测总用电量',
			textStyle: {
				fontSize: 20,
				color: '#ffffff', //标题颜色
			},
			subtext: '',
			subtextStyle: {
				fontSize: 12,
				color: '#E4765D', //副标题标题颜色
			},
		},
		color: ["#3398DB"],
		legend: {
			top: '1%',
			left: 'right',
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			}
		},
		tooltip: {
			trigger: "axis",
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			},
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		grid: {
			top: "13%",
			left: "3%",
			right: "4%",
			bottom: "2%",
			containLabel: true,
		},
		xAxis: {
			//坐标轴类型(类目轴)
			// name: "kw/h",
			type: "value",
			nameTextStyle: {
				color: '#fff',
				fontSize: 15
			},
			axisLabel: {
				show: true,
				textStyle: {
					// fontWeight: 'normal',
					fontSize: '18',
					color: '#ffffff'//字体颜色
				}
			},
			//是否显示坐标轴刻度
			axisTick: { show: true },
			//坐标轴线线的颜色
			axisLine: {
				show: true,
				color: '#fff'
			},

			//是否显示网格线
			splitLine: {
				show: true,
			}
		},

		dataZoom: [
			//滑动条
			{
				yAxisIndex: 0, //这里是从X轴的0刻度开始
				show: false, //是否显示滑动条，不影响使用
				type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
				startValue: 0, // 从头开始。
				endValue: 4, // 一次性展示5个。
			},
		],
		yAxis: [
			{
				// name: '居民用户id',
				// bottom: '30%',
				// left: '10%',
				nameTextStyle: {
					color: '#fff',
					fontSize: 15
				},
				type: "category",
				inverse: true, //是否是反向坐标轴
				data: Ydata,
				axisLabel: {
					show: true,
					textStyle: {
						color: '#ffffff',
					},
					formatter: function (value, index) {
						var value;
						// if判断转换值
						return value;
					},
				},
				offset: 10,
				splitLine: { show: false },
				axisTick: { show: false },
				//坐标轴线线的颜色
				axisLine: {
					show: true,
					lineStyle: {
						color: '#0E3B57',
						type: 'solid',
						width: 2,
					},
				},
			},

		],
		series: [
			{
				name: "未来一年预测用电量",
				type: "bar",
				barMaxWidth: 10,
				// barWidth: "60%",
				data: Xdata,
				barWidth: 8,
				barGap: 10,
				smooth: true,
				label: {
					normal: {
						show: false,
						position: 'right',
						offset: [5, -2],
						textStyle: {
							color: '#F68300',
							fontSize: 13,
						},
					},
				},
				itemStyle: {
					emphasis: {
						barBorderRadius: 7,
					},
					//颜色渐变
					normal: {
						barBorderRadius: 7,
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
							// { offset: 0.1, color: '#040C3B' },
							{ offset: 0.5, color: '#6D3F46' },
							{ offset: 1, color: '#E4765D' }
						]),
					},
				},

			},
		],
	};

	// var myChart = echarts.init(document.getElementById('pieChartMap'));
	// myChart.clear();
	// myChart.setOption(option);

	var myChart = echarts.init(document.getElementById('timeStepAnalysis1'));
	myChart.clear();
	myChart.setOption(option);

	var myChart2 = echarts.init(document.getElementById('timeStepAnalysis2'));
	myChart2.clear();
	myChart2.setOption(option2);


	// if (data.channelTime.length > 0) {
	// 	myChart.setOption(option);
	// } else {
	// 	noDataTip($("#timeStepAnalysis1"));
	// }
	//自动滚动
	this.timeOut = setInterval(() => {
		if (option2.dataZoom[0].endValue == Xdata.length) {
			option2.dataZoom[0].endValue = 4;
			option2.dataZoom[0].startValue = 0;
		} else {
			option2.dataZoom[0].endValue = option2.dataZoom[0].endValue + 1;
			option2.dataZoom[0].startValue = option2.dataZoom[0].startValue + 1;
		}
		myChart2.setOption(option2);
	}, 2000)

	//增加轮播
	tools.loopShowTooltip(myChart, option, { loopSeries: true });
	tools.loopShowTooltip(myChart2, option2, { loopSeries: true });

	console.log($('.electric a[data-toggle="tab"]'));
	$('.electric a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// console.log(e)
		// console.log(2222222);

		//切换tab页，获取正确的宽高并刷新画布
		myChart.resize();
		myChart2.resize();

	});

}

//加载用户分类情况一览图和预测未来一年的高价值客户TOP5
function loadBusinessTypeTimeDetail(data) {

	// 设置配置项
	// 预测未来一年的高价值客户TOP5(数据源data要替换！！！)
	var option = {
		title: {
			text: '预测未来一年高价值客户的TOP5', subtext: '', top: '1', right: '140',
			textStyle: { // 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
				fontFamily: 'Arial',
				fontSize: 23,
				color: '#ffffff',
				fontStyle: 'normal',
				fontWeight: 'normal',
			},
		},
		legend: {
			top: '93%',
			left: 'center',
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			}
		},
		tooltip: {
			trigger: 'axis',
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			}
		},
		grid: { left: '5%', right: '10%', bottom: '15%' },
		xAxis: {
			type: 'category',
			axisLine: { lineStyle: { color: '#57617B' } },
			axisLabel: { interval: 0, textStyle: { color: '#fff', } },
			data: data.userId
		},
		yAxis: [
			{
				type: 'value',
				// name: '预测缴费次数',
				// nameTextStyle: {
				// 	color: "#ffffff",
				// 	fontSize: 14,
				// 	// padding: 10
				// },
				axisLine: { lineStyle: { color: '#57617B' } },
				axisLabel: { margin: 10, textStyle: { fontSize: 12 }, textStyle: { color: '#fff' }, formatter: '{value}次' },
				splitLine: { show: false }
			},
			{
				type: 'value', name: '',
				axisLabel: { margin: 10, textStyle: { fontSize: 12 }, textStyle: { color: '#fff' }, formatter: '{value}元' },
				splitLine: {
					show: true,
					lineStyle: {
						type: 'dashed',
						color: ['#25CEF3']
					}
				}
			}
		],
		series: [
			{
				name: '预测缴费次数',
				type: 'line',
				yAxisIndex: 0,
				smooth: false,
				symbolSize: 5,
				lineStyle: { normal: { width: 2 } },
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(230, 48, 123, 0.8)'
						}, {
							offset: 0.8,
							color: 'rgba(230, 48, 123, 0)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowBlur: 10
					}
				},
				itemStyle: { normal: { color: '#DA2F78' } },
				data: data.predict_one_year_pay
			},
			{
				name: '预测缴费总金额',
				type: 'bar',
				barWidth: 12,
				yAxisIndex: 1,
				itemStyle: {
					normal: {
						barBorderRadius: [10, 10, 0, 0],
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 0,
							color: "#4033F9"
						}, {
							offset: 0.8,
							color: "#BA97F9"
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				data: data.predict_one_year_money
			}
		]
	};



	// 用户分类情况一览图
	var option2 = {
		title: {
			text: ' 居民用户分类情况一览图',
			// subtext: 'Fake Data',
			left: 'center',
			textStyle: { // 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
				fontFamily: 'Arial',
				fontSize: 23,
				color: '#ffffff',
				fontStyle: 'normal',
				fontWeight: 'normal',
			},
		},
		grid: { left: '8%', right: '8%', bottom: '20%' },

		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c}人 (占{d}%)',
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			}

		},
		legend: {
			top: '93%',
			left: 'center',
			textStyle: {
				// fontWeight: 'normal',
				fontSize: '18',
				color: '#ffffff'//字体颜色
			}
		},
		series: [
			{
				name: '用户分类',
				type: 'pie',
				radius: ['37%', '70%'],
				// radius: [20, 140],
				center: ['50%', '50%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					normal: {
						fontSize: '18',
						position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
						// formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
						// {a}指series.name  {b}指series.data的name
						// {c}指series.data的value  {d}%指这一部分占总数的百分比
						formatter: '{d}%'
					}
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '26',
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: data.category
			}]


	}




	// echarts绘图
	// console.log(document.getElementById('business-type-time-detial2'));
	var myChart = echarts.init(document.getElementById('business-type-time-detial'));
	var myChart2 = echarts.init(document.getElementById('business-type-time-detial2'));


	myChart.clear();
	myChart2.clear();

	if (data.userId.length > 0) {
		myChart.setOption(option);
		//增加轮播
		tools.loopShowTooltip(myChart, option, { loopSeries: true });
	} else {
		noDataTip($("#business-type-time-detial")); //若无数据则显示暂无数据
	}

	if (data.category.length > 0) {
		myChart2.setOption(option2);
		//增加轮播
		tools.loopShowTooltip(myChart2, option2, { loopSeries: true });
	} else {
		noDataTip($("#business-type-time-detial")); //若无数据则显示暂无数据
	}

	// myChart.setOption(option);
	// myChart2.setOption(option2);



	// tab栏切换的时候重新渲染
	console.log($('a[data-toggle="tab"]'));
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// console.log(e)
		// console.log(2222222);

		//切换tab页，获取正确的宽高并刷新画布
		myChart.resize();
		myChart2.resize();

	});


}







//初始化基础信息
function initBaseInfo() {
	//初始化日期
	/*$("#data-date").my97({
	   dateFmt:'yyyyMMdd',
	   minDate:"%y-{%M}-{%d-30}",
	   maxDate:"%y-%M-{%d}",
	   startDate: [{
		   doubleCalendar: false,
		   isShowWeek: false,
		   isShowClear: false,
		   readOnly: true
	   }],
	   onpicked:function(dp){
		   g_dataDate=$('#data-date').val();
		   $("#query-page-data").trigger("click");
	   }
   });*/
	var dataDate = "2021年12月31日";
	$("#td-data-date").text(dataDate);


}


//获取渠道参数
function getGroupChannelParam() {
	var areaCode = "";
	try {
		var cityId = $('#selectCity').combobox("getValue");
		var countyId = $('#selectCounty').combobox("getValue");
		if ("" == areaCode && "" != countyId) {
			areaCode = countyId;
		} else if ("" == areaCode && "" != cityId) {
			areaCode = cityId;
		}
	} catch (e) {
	}
	var channelName = $.trim($("#channel_name").val());
	var channelParam = { 'areaCode': areaCode, "channelName": channelName };
	return channelParam;
}



function noDataTip($selector) {
	var currModH = $selector.height();
	var top = currModH > 180 ? "35%" : "13%";
	var $li = [
		"<div class='no-data' style='width:90%;position: absolute;top:" + top + ";text-align:center;color:#a59999;'>",
		"<img src='static/images/no-data.png' style='width:200px;height:200px;'/>",
		"<div style='font-size:16px;opacity:0.7;color:#fff;'>暂无数据</div>",
		"</div>"
	]
	$selector.append($li.join(""));
}

function keepTwoDecimal(currVal) {
	var result = parseFloat(currVal);
	if (isNaN(result)) {
		return false;
	}
	result = Math.round(currVal * 100) / 100;
	return result;
}


//初始化页面
function loadPageData() {
	//获取渠道信息
	var groupChannelInfo = g_channelInfo;
	//第一步：优先判断url请求参数里面
	let param = JSON.parse(gDataGather.param);
	if (Object.keys(param).length > 0) {
		groupChannelInfo = param;
		gDataGather.param = "{}";
	}
	if (Object.keys(groupChannelInfo).length == 0) {
		groupChannelInfo = window.localStorage.getItem("group-channel-info");
		if (undefined == groupChannelInfo || null == groupChannelInfo) {
			groupChannelInfo = { "channelCode": "11228790", "groupChannelCode": "3201001965930", "channelName": "中国电信南京分公司@玄武大钟亭营业厅" };
		} else {
			groupChannelInfo = JSON.parse(groupChannelInfo);
		}
	} else {
		window.localStorage.setItem("group-channel-info", JSON.stringify(groupChannelInfo));
	}
	//设置全局渠道编码、渠道名称
	g_channelCode = groupChannelInfo.channelCode;
	g_channelName = groupChannelInfo.channelName;
	//开始动画特效
	$('#load').show();
	$('#load').fadeOut(500, function () {
	});

	//引入office_efficiency_data.js缓存假数据
	if (data.code == 0) {
		$(".no-data").remove();

		//加载用户用电曲线聚类分析一览图
		loadChannelHandleDetail(data.channelHandleInfo);
		//加载用户平均用电量聚类客户类别数量一览图（不同日期下）
		loadChannelBaseInfo(data.channelHandleInfo);
		//加载用户缴费价值分析
		loadStaffHandleDetail(data.staffHandleInfo);
		//加载用户缴费基本情况
		loadChannelDeviceDetail(data.channelDeviceInfo);
		//加载用电量预测
		loadTimeStepDetail(data.timeStepAnalysis);
		//加载用户分类情况一览图
		loadBusinessTypeTimeDetail(data.businessTypeAnalysis);

		// 加载tab切换
		tab_change(data.staffHandleInfo)
	}

}
$(function () {
	//加载基础信息
	initBaseInfo();
	//加载页面数据
	loadPageData();
})



