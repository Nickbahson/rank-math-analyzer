/**
 * Internal dependencies
 */
import { getLinkType, checkNofollow } from '@helpers/url.js'

export default ( text ) => {
	const anchors = text.match( /<a(?:[^>]+)?>/gi ),
		linkCount = {
			total: null === anchors ? 0 : anchors.length,
			internalTotal: 0,
			internalDofollow: 0,
			internalNofollow: 0,
			externalTotal: 0,
			externalDofollow: 0,
			externalNofollow: 0,
			otherTotal: 0,
			otherDofollow: 0,
			otherNofollow: 0,
			anchors,
		}

	if ( null === anchors ) {
		return linkCount
	}

	anchors.forEach( ( anchor ) => {
		const linkType = getLinkType( anchor, rankMath.parentDomain )
		const linkFollow = checkNofollow( anchor, linkType )

		linkCount[ linkType + 'Total' ]++
		linkCount[ linkType + linkFollow ]++
	} )

	return linkCount
}
