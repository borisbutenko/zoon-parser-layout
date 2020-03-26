;(function () {
	const discovery_label = 'discovery';
	const direct_label = 'direct';

	/**
	 * @param {array} clicks_data_list - see <const clicks_data = {}>
	 * @returns {array} month list
	 */
	function get_month_list (clicks_data_list) {
		return clicks_data_list.map(function (obj) {
			return obj.month_name;
		});
	}

	/**
	 * @param {array} clicks_data_list - see <const clicks_data = {}>
	 * @returns {array} highcharts series.data list
	 */
	function get_chart_data (clicks_data_list) {
		return clicks_data_list.map(function (obj) {
			return [obj.month_name, obj.value];
		});
	}

	/**
	 * @param {string} month
	 * @returns {string}
	 */
	function get_locale_month (month) {
		return new Date(month).toLocaleString('default', { month: 'long' });
	}

	/**
	 * @param {object} chart
	 */
	function hide_different_chart_labels (chart) {
		let discovery_series = chart.series[0];
		let direct_series = chart.series[1];
		discovery_series.yData.forEach(function (val, idx) {
			if (val <= direct_series.yData[idx]) {
				discovery_series.points[idx].dataLabel.element.style.visibility = 'hidden';
			}
		});
	}

	const clicks_data = {
		[discovery_label]: [
			{ month_name: '2019-03', value: 2 },
			{ month_name: '2019-04', value: 3 },
			{ month_name: '2019-05', value: 1 },
			{ month_name: '2019-06', value: 1 },
			{ month_name: '2019-07', value: 2 },
			{ month_name: '2019-08', value: 4 },
			{ month_name: '2019-09', value: 7 },
			{ month_name: '2019-10', value: 18 },
			{ month_name: '2019-11', value: 50 },
			{ month_name: '2019-12', value: 45 },
			{ month_name: '2020-01', value: 51 },
			{ month_name: '2020-02', value: 60 },
			{ month_name: '2020-03', value: 31 },
		],
		[direct_label]: [
			{ month_name: '2019-03', value: 7 },
			{ month_name: '2019-04', value: 8 },
			{ month_name: '2019-05', value: 14 },
			{ month_name: '2019-06', value: 21 },
			{ month_name: '2019-07', value: 16 },
			{ month_name: '2019-08', value: 28 },
			{ month_name: '2019-09', value: 36 },
			{ month_name: '2019-10', value: 85 },
			{ month_name: '2019-11', value: 53 },
			{ month_name: '2019-12', value: 40 },
			{ month_name: '2020-01', value: 50 },
			{ month_name: '2020-02', value: 59 },
			{ month_name: '2020-03', value: 40 },
		],
	};

	const months = get_month_list(clicks_data[discovery_label]);

	const chart_opt = {
		chart: { type: 'column' },
		title: {
			text: '<h2 class="section__title">Статистика</h2>',
			useHTML: true,
			align: 'left',
		},
		plotOptions: {
			series: { grouping: false, borderWidth: 0 },
		},
		legend: { enabled: false },
		xAxis: {
			text: null,
			type: 'category',
			gridLineWidth: 1,
			labels: {
				// форматируем месяц в удобочитаемый локальный формат
				formatter: function () {
					let result = null;
					let value = this.value;
					let idx = months.length;
					while (idx--) {
						let month = months[idx];
						if (month === value) {
							result = get_locale_month(month);
							break;
						}
					}
					return result;
				},
			},
		},
		yAxis: {
			title: { text: null },
		},
		tooltip: {
			shared: true,
			formatter: function() {
				let discovery_point = this.points[0].point;
				let direct_point = this.points[1].point;
				let title_color = (discovery_point.y <= direct_point.y)
					? direct_point.color
					: discovery_point.color;
				return `
					<b style="font-size:14px;font-weight:bold;color:${title_color}">
						${get_locale_month(discovery_point.name)}
					</b>
					<br>
					<span style="color:${discovery_point.color}">\u25CF</span>
					Дискавери-переход**: <b>${discovery_point.y}</b>
					<br>
					<span style="color:${direct_point.color}">\u25CF</span>
					Прямой переход*: <b>${direct_point.y}</b>
				`;
			},
		},
		series: [
			{
				name: discovery_label,
				linkedTo: direct_label,
				color: 'var(--color-purple-2)',
				pointPlacement: -0.1,
				dataLabels: {
					enabled: true,
					className: `chart-label chart-label--${discovery_label}`,
				},
				data: get_chart_data(clicks_data[discovery_label]),
			},
			{
				id: direct_label,
				name: direct_label,
				color: 'var(--color-purple-3)',
				dataLabels: {
					enabled: true,
					className: `chart-label chart-label--${direct_label}`,
				},
				data: get_chart_data(clicks_data[direct_label]),
			},
		],
	};

	window.Highcharts.chart('chart', chart_opt);
	hide_different_chart_labels(window.Highcharts.charts[0]);
})();
