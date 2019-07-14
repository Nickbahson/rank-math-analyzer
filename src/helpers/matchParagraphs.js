import { map } from 'lodash'
import { autop } from '@wordpress/autop'
import stripHTML from '../researches/stripTags'
import stripShortcodes from './stripShortcodes'

/**
 * Matches the paragraphs in <p>-tags and returns the text in them.
 *
 * @param {String} text The text to match paragraph in.
 * @param {Boolean} stripTags Should strip html within paragraphs.
 *
 * @returns {Array} An array containing all paragraphs texts.
 */
const getParagraphsInTags = ( text, stripTags ) => {
	let paragraphs = []
	stripTags = stripTags || false

	// Matches everything between the <p> and </p> tags.
	let regex = /<p(?:[^>]+)?>(.*?)<\/p>/ig
	let match

	while ( null !== ( match = regex.exec( text ) ) ) {
		paragraphs.push( match )
	}

	// Returns only the text from within the paragraph tags.
	return map( paragraphs, ( paragraph ) => {
		return stripTags ? stripHTML( paragraph[ 1 ]) : paragraph[ 1 ]
	})
}

/**
 * Returns an array with all paragraphs from the text.
 *
 * @param {String} text The text to match paragraph in.
 * @param {Boolean} stripTags Should strip html within paragraphs.
 *
 * @returns {Array} The array containing all paragraphs from the text.
 */
export default ( text, stripTags ) => {
	let paragraphs = getParagraphsInTags( autop( stripShortcodes( text ) ), stripTags )

	if ( 0 < paragraphs.length ) {
		return paragraphs
	}

	// If no paragraphs are found, return an array containing the entire text.
	return [ text ]
}
