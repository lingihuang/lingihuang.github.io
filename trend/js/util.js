window.TREND = window.TREND || {};

window.TREND.util = (function () {
	var selectors = {};

	function getSelector(selector) {
		if (!selectors[selector]) {
			selectors[selector] = $(selector);
		}
		return selectors[selector];
	}

	function amountFormatter(format, value) {
		var val;
		if (value >= 1000) {
			val = value / 1000;
			if (val < 10) {
				return val.toFixed(1) + 'K';
			}
			return val.toFixed(0) + 'K';
		}
		return value;
	}

	return {
		getSelector     : getSelector,
		amountFormatter : amountFormatter
	};
})();
