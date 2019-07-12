 import deburr from 'lodash/deburr'

/**
 * Sanitize and slugify text
 *
 * @param {String} text The string being slugify.
 *
 * @return {String} The manipulated text.
 */
export default text => deburr( text )
		.replace( / /gi, '-' )
		.toLowerCase()
