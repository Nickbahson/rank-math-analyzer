/**
 * Normalizes quotes to 'regular' quotes.
 *
 * @param {string} text Text to normalize.
 *
 * @return {string} The normalized text.
 */
export default ( text ) => {
	return text.replace( /[‘’‛`]/g, '\'' ).replace( /[“”〝〞〟‟„]/g, '"' )
}
