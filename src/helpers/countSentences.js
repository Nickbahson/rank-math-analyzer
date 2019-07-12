import {
	flow,
	filter
} from 'lodash'

import stripTags from '../researches/stripTags'
import stripHTMLComments from './stripHTMLComments'
import stripShortcodes from './stripShortcodes'
import stripSpaces from './stripSpaces'
import stripHTMLEntities from './stripHTMLEntities'
import stripConnectors from './stripConnectors'
import English from 'parse-english'

/**
 * Count Sentences
 *
 * @param {String} text Text to count sentences.
 *
 * @return {Integer}
 */
export default ( text ) => {

	text = flow([
		stripTags,
		stripHTMLComments,
		stripShortcodes,
		stripSpaces,
		stripHTMLEntities,
		stripConnectors
	])( text )

	if ( '' === text ) {
		return 0
	}

	let paragraphs = new English().tokenizeParagraph( text ).children
	return filter( paragraphs, { type: 'SentenceNode' }).length
}
