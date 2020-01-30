/**
 * External dependencies
 */
import { flow } from 'lodash'

/**
 * Internal dependencies
 */
import stripTags from '@researches/stripTags'
import stripStyle from '@helpers/stripStyles'
import stripSpaces from '@helpers/stripSpaces'
import stripScript from '@helpers/stripScripts'
import normalizeQuotes from '@helpers/normalizeQuotes'
import stripHTMLComments from '@helpers/stripHTMLComments'
import stripHTMLEntities from '@helpers/stripHTMLEntities'

/**
 * Clean HTML strip all html entities and comments.
 *
 * @param {string} text Text to clean.
 *
 * @return {string} The clean text.
 */
export function cleanHTML( text ) {
	return flow(
		[
			stripStyle,
			stripScript,
			stripHTMLComments,
			stripHTMLEntities,
			stripSpaces,
			normalizeQuotes,
		]
	)( text )
}

/**
 * Clean text strip out all html tags, entities and comments.
 *
 * @param {string} text Text to clean.
 *
 * @return {string} The clean text.
 */
export function cleanText( text ) {
	return flow(
		[
			stripStyle,
			stripScript,
			stripTags,
			stripHTMLComments,
			stripHTMLEntities,
			stripSpaces,
			normalizeQuotes,
		]
	)( text )
}

/**
 * Clean text strip out all html tags, entities and comments.
 *
 * @param {string} text Text to clean.
 *
 * @return {string} The clean text.
 */
export function cleanTagsOnly( text ) {
	return flow(
		[
			stripTags,
			stripSpaces,
		]
	)( text )
}

/**
 * Clean text strip out all html tags, entities and comments.
 *
 * @param {string} text Text to clean.
 *
 * @return {string} The clean text.
 */
export function sanitizeText( text ) {
	return flow(
		[
			stripStyle,
			stripScript,
			stripTags,
			stripHTMLComments,
		]
	)( text )
}
