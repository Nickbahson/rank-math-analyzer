import { createHooks } from '@wordpress/hooks'
import { sprintf, _n } from '@wordpress/i18n';

( function( $ ) {

	'use strict'

	window.rankMath = window.rankMath || {}
	window.rankMath.hooks = createHooks()

	function initializePostAnalysis() {
		rankMath.hooks.doAction( 'rankMath.init' )
	}

	$( document ).ready( initializePostAnalysis )

}( jQuery ) )
