$(function() {
	var HIDE_CLASS = 'hide',
		IS_DISABLED_CLASS = 'is-disabled',
		IS_ERROR_CLASS    = 'is-error',
		ICON_CLASS = {
			clear : 'clear',
			cloud : 'cloud',
			rain  : 'rain',
			none  : 'none'
		},
		dataUrl    = 'http://api.openweathermap.org/data/2.5/weather',
		formSel,
		messageSel;

	function handleSubmit(e) {
		e.preventDefault();

		var loadingSel = window.TREND.util.getSelector('#weather-form-loading'),
			sectionSel,
			inputSels,
			arr;

		messageSel.addClass(HIDE_CLASS).html('');
		resizeIframe();

		inputSels = $(this).find('input[type="text"]'),
		arr       = [];
		inputSels.each(function (idx, element) {
			var value = $(element).val();
			if (value) {
				arr.push(value);
			}
		});
		if (!arr.length) {
			messageSel.removeClass(HIDE_CLASS)
					.html('<a href="#" class="m-form-close-button">&times;</a>Please input the city or country name.');
			resizeIframe();
			return;
		}

		sectionSel = window.TREND.util.getSelector('#weather-section');
		$.ajax({
			url        : dataUrl,
			method     : 'GET',
			data       : {
				q     : arr.join(','),
				units : 'metric'
			},
			beforeSend : function (jqXHR, settings) {
				loadingSel.removeClass(HIDE_CLASS);
				sectionSel.html('');
			}
		}).done(function (data, textStatus, jqXHR) {
			loadingSel.addClass(HIDE_CLASS);
			if (data.cod && parseInt(data.cod, 10) === 404) {
				messageSel.removeClass(HIDE_CLASS)
						.html('<a href="#" class="m-form-close-button">&times;</a>' + data.message);
			} else {
				sectionSel.html(getTemplate(data));
			}
			resizeIframe();
		}).fail(function (jqXHR, textStatus, errorThrown) {
			loadingSel.addClass(HIDE_CLASS);
		});
	}

	function handleClickClose(e) {
		e.preventDefault();
		var messageSel = window.TREND.util.getSelector('#weather-message');
		messageSel.addClass(HIDE_CLASS).html('');
		resizeIframe();
	}

	function resizeIframe() {
		if (window.self !== window.parent) {
			window.parent.TREND.resizeIframe($('body').outerHeight());
		}
	}

	function getIcon(val) {
		var str = ICON_CLASS.none;
		$.each(ICON_CLASS, function(key, value) {
			if (key !== 'none' && val.toLowerCase().indexOf(value) !== -1) {
				str = value;
			}
		});
		return str;
	}

	function getTemplate(data) {
		var icon  = getIcon(data.weather[0].description),
			htmls = [];
		htmls = [
			'<div class="main">',
				'<i class="m-icon m-icon-' + icon + '"></i>',
				'<div class="info">',
					'<h3 class="title">' + data.weather[0].main + '</h3>',
					'<p class="sub">' + data.weather[0].description + '</p>',
				'</div>',
			'</div>',
			'<p class="info">',
				'<span class="label">Temperature:</span>',
				'<span>' + data.main.temp_min + '&deg;C ~ ' + data.main.temp_max + '&deg;C</span>',
			'</p>',
			'<p class="info">',
				'<span class="label">Humidity:</span>',
				'<span>' + data.main.humidity + '%</span>',
			'</p>'
		];
		return htmls.join('');
	}

	formSel    = window.TREND.util.getSelector('#weather-form');
	messageSel = window.TREND.util.getSelector('#weather-message');
	formSel.on('submit', handleSubmit);
	messageSel.on('click', '.m-form-close-button', handleClickClose);

	resizeIframe();
	
});