import {
	uniq,
	includes,
	isUndefined
} from 'lodash'

export default ( plurals ) => {
	var words = Array.from( plurals.keys() ),
		length = words.length,
		output = []

	output.push( words.join( ' ' ) )

	function recursive( words ) {
		plurals.forEach( ( plural, word ) => {
			if ( plural === word || includes( words, plural ) ) {
				return
			}
			output.push( words.join( ' ' ).replace( word, plural ) )
		})
	}

	for ( var i = 0; i < ( length * length ); i++ ) {
		if ( ! isUndefined( output[ i ]) ) {
			recursive( output[ i ].split( ' ' ) )
		}
	}
	output.push( Array.from( plurals.values() ).join( ' ' ) )

	return uniq( output )
}
