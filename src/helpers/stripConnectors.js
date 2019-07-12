/**
 * Replaces items matched in the regex with spaces.
 *
 * @param {String} text The string being counted.
 *
 * @return {String} The manipulated text.
 */
export default text => text.replace( /--|\u2014/g, ' ' )
