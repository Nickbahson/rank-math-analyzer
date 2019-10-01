/**
 * External dependencies
 */
import { deburr } from 'lodash'

/**
 * Sanitize and slugify text
 *
 * @param {string} text The string being slugify.
 *
 * @return {string} The manipulated text.
 */
export default ( text ) => deburr( text )
	.replace( / /gi, '-' )
	.toLowerCase()
