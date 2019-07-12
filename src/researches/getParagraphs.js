import filter from 'lodash/filter'
import wordCount from './wordCount'
import matchParagraphs from '../helpers/matchParagraphs'

/**
 * Gets all paragraphs and their word counts from the text.
 *
 * @param {string} content The text to get paragraphs from.
 * @returns {Array} The array containing an object with the paragraph word count and paragraph text.
 */
export default ( content ) => {
	let paragraphsLength = []
	matchParagraphs( content ).map( ( paragraph ) => {
		paragraphsLength.push({
			wordCount: wordCount( paragraph ),
			text: paragraph
		})
	})

	return filter( paragraphsLength, ( paragraphLength ) => {
		return ( 0 < paragraphLength.wordCount )
	})
}
