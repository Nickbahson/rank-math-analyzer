import { createHooks } from '@wordpress/hooks'

( function( $ ) {

	'use strict'

	window.rankMath = window.rankMath || {}
	window.rankMath.hooks = createHooks()

	function initializePostAnalysis() {
		rankMath.hooks.doAction( 'rankMath.init' )
	}

	$( document ).ready( initializePostAnalysis )

}( jQuery ) )
