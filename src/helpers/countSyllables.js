import {
	map,
	sum
} from 'lodash'

/**
 * Count syllables
 *
 * @link https://medium.com/@andrewhartnett/to-parse-a-haiku-using-only-javascript-was-interesting-5ea64ce31948
 *
 * @param {String} word Word to look for syllables.
 *
 * @return {Integer}
 */
function countSyllablesInWord( word ) {
	word = word.toLowerCase()
	if ( 3 >= word.length ) {
		return 1
	}

	word = word.replace( /(?:[^laeiouy]es|ed|lle|[^laeiouy]e)$/, '' )
		.replace( /^y/, '' )
		.match( /[aeiouy]{1,2}/g )

	return null === word ? 0 : word.length
}

export default ( words ) => {
	var syllableCounts = map( words, ( word ) => {
		return countSyllablesInWord( word )
	})

	return sum( syllableCounts )
}
