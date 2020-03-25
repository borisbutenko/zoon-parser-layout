;(function () {

	/**
	 * Get the viewport height and multiple it by 1% to get a value for a vh unit
	 * Set the value in the --vh custom property to the root of the document
	 *
	 * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
	 */
	function fix_viewport_height () {
		document.documentElement.style
			.setProperty('--vh', `${window.innerHeight * 0.01}px`);
	}

	window.addEventListener('resize', fix_viewport_height);
	document.addEventListener('DOMContentLoaded', fix_viewport_height);

})();
