import { createHooks } from '@wordpress/hooks'
import App from './App'

( function( $ ) {

	'use strict'

	window.rankMath = window.rankMath || {}
	window.rankMath.hooks = createHooks()

	$( document ).ready( function() {
		window.rankMath.app = new App
	})

}( jQuery ) )
