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
 * Count Sentences
 *
 * @param {string} text Text to count sentences.
 *
 * @return {number} Count of sentences.
 */
export default ( text ) => flow(
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
