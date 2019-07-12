import {
	filter,
	flow,
	map
} from 'lodash'

import stripTags from './stripTags'
import stripHTMLComments from '../helpers/stripHTMLComments'
import stripShortcodes from '../helpers/stripShortcodes'
import stripSpaces from '../helpers/stripSpaces'
import stripHTMLEntities from '../helpers/stripHTMLEntities'
import stripConnectors from '../helpers/stripConnectors'
import stripRemovables from '../helpers/stripRemovables'
import removePunctuation from './removePunctuation'

/**
 * Returns an array with words used in the text.
 *
 * @param {String} text The text to be counted.
 *
 * @returns {Array} The array with all words.
 */
const getWords = ( text ) => {
	text = flow([
		stripTags,
		stripHTMLComments,
		stripShortcodes,
		stripSpaces,
		stripHTMLEntities,
		stripConnectors,
		stripRemovables
	])( text )

	if ( '' === text ) {
		return []
	}

	var words = text.split( /\s/g )
	words = map( words, ( word ) => {
		return removePunctuation( word )
	})

	return filter( words, ( word ) => {
		return '' !== word.trim()
	})
}

/**
 * Returns an array with words used in the text.
 *
 * @param {String}  text  The text to be counted.
 * @param {integer} limit THe number of words required.
 *
 * @returns {Array} The array with all words.
 */
export default ( text, limit ) => {
	let words = getWords( text )
	limit = limit || false

	if ( 0 === words.length ) {
		return false
	}

	if ( false === limit ) {
		return words
	}

	return words.slice( 0, limit )
}
