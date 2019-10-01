/**
 * External dependencies
 */
import { uniq, includes, isUndefined } from 'lodash'

export default ( plurals ) => {
	const words = Array.from( plurals.keys() ),
		length = words.length,
		output = []

	output.push( words.join( ' ' ) )

	function recursive( recursiveWords ) {
		plurals.forEach( ( plural, word ) => {
			if ( plural === word || includes( recursiveWords, plural ) ) {
				return
			}
			output.push( recursiveWords.join( ' ' ).replace( word, plural ) )
		} )
	}

	for ( let i = 0; i < ( length * length ); i++ ) {
		if ( ! isUndefined( output[ i ] ) ) {
			recursive( output[ i ].split( ' ' ) )
		}
	}
	output.push( Array.from( plurals.values() ).join( ' ' ) )

	return uniq( output )
}
