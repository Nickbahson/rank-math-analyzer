import { has } from 'lodash'
import getWords from './getWords'
import countSentences from '../helpers/countSentences'
import countSyllables from '../helpers/countSyllables'
import stripNumbers from '../helpers/stripNumbers'

function fleschEase( sentences, words, syllables ) {
	return 206.835 - ( 1.015 * ( words / sentences ) ) - ( 84.6 * ( syllables / words ) )
}

/**
 * Calculate how readable the text is, based on the Flesch reading ease test.
 *
 * @param {String} text Text to check.
 *
 * @return {Integer} Flesch ease score
 */
export default ( text ) => {
	if ( '' === text ) {
		return false
	}

	text = stripNumbers( text )

	let words = getWords( text ),
		numberOfSentences = countSentences( text ),
		numberOfWords = words.length

	// Prevent division by zero errors.
	if ( 0 === numberOfSentences || 0 === numberOfWords ) {
		return false
	}

	let numberOfSyllables = countSyllables( words )

	return fleschEase( numberOfSentences, numberOfWords, numberOfSyllables ).toFixed( 2 )
}
