$(function() {
	var dataUrl = '../data/birth.json',
		plot;

	function handleResize(e) {
		if (!plot) {
			return;
		}
		plot.replot({
			resetAxes: true
		});
	}

	function resizeIframe() {
		if (window.self !== window.parent) {
			window.parent.TREND.resizeIframe($('body').outerHeight());
		}
	}

	function draw(data) {
		// jqPlot Documentation http://www.jqplot.com/
		plot = $.jqplot('line-chart', data, {
			axesDefaults: {
				tickOptions: {
					fontFamily : 'Arial',
					fontSize   : '12px'
		        }
			},
			axes: {
				xaxis: {
					min         : '2006-01-01',
					max         : '2014-01-01',
					renderer    : $.jqplot.DateAxisRenderer,
					tickOptions : {
						fontFamily    : 'Arial',
						fontSize      : '12px',
						formatString  : '%Y',
						labelPosition : 'middle',
						showGridline  : false
					},
					tickRenderer: $.jqplot.CanvasAxisTickRenderer
				},
				yaxis: {
					label        : 'People',
					labelOptions : {
						fontFamily : 'Arial',
						fontSize   : '12px'
					},
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					min          : 70000,
					tickInterval : 10000,
					tickOptions  : {
						formatter: window.TREND.util.amountFormatter
					}
				}
			},
			grid: {
				background  : '#fff',
				borderColor : '#999',
				borderWidth : 0,
				shadow      : false 
			},
			seriesDefaults: {
				lineWidth     : 1,
				markerOptions : {
					shadow : false,
					size   : 6,
					style  : 'filledCircle'
				},
				shadow		  : false
			},
			legend: {
				location  : 'e',
				placement : 'outside',
				show      : true
	        },
			series: [
				{
					color: '#68bbf2',
					label: 'Male'
				},
				{
					color: '#666',
					label: 'Female'
				}
			]
		});
	}

	function queryData() {
		$.ajax({
			url     : dataUrl,
			method  : 'GET',
			dataType: 'json',
			success : function (data, textStatus, jqXHR) {
				var responseData = [];
				$.each(data, function(idx, item) {
					responseData.push(item);
				});
				draw(responseData);
			},
			error   : function (jqXHR, textStatus, errorThrown) {

			}
		});
	}

	queryData();
	resizeIframe();
	$(window).bind('resize', handleResize);
	
});
