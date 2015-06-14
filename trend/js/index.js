$(function() {
	var IS_ACTIVE_CLASS = 'is-active',
		sideMenuSel,
		iframeSel;

	function handleClickMenu(e) {
		e.preventDefault();

		var url = $(this).attr('href');
		sideMenuSel.find('li').removeClass(IS_ACTIVE_CLASS);
		$(this).parent().addClass(IS_ACTIVE_CLASS);

		if (!iframeSel) {
			iframeSel = $('<iframe id="content-iframe" name="content-iframe" height="100%" width="100%" src="' + url + '" allowtransparency="true" frameborder="0" scrolling="No"></iframe>').appendTo($('#content'));
		} else {
			iframeSel.attr('src', url);
		}
	}

	function resizeIframe(height) {
		if (iframeSel) {
			iframeSel.attr('height', height);
		}
	}

	sideMenuSel = window.TREND.util.getSelector('#side-menu');
	sideMenuSel.on('click', 'li > a', handleClickMenu);

	if (!window.TREND) {
		window.TREND = {
			resizeIframe: resizeIframe
		};
	} else {
		window.TREND = $.extend({}, window.TREND, {resizeIframe: resizeIframe});
	}
});