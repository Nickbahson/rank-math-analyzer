import urlMethods from 'url'
import includes from 'lodash/includes'

const urlFromAnchorRegex = /href=(["'])([^"']+)\1/i

/**
 * Check if external link exists in nofllow/excludeDomains
 */
function couldBeDoFollow( url ) {
	var isDoFollow = true,
		parsedUrl  = urlMethods.parse( url, false, true )

	// Check if domain is in nofollow list.
	if ( rankMath.noFollowDomains.length ) {
		rankMath.noFollowDomains.forEach( ( domain ) => {
			if ( includes( parsedUrl.host, domain ) ) {
				isDoFollow = false
			}
		})

		return isDoFollow
	}

	// Check if domains is NOT in list.
	if ( ! rankMath.noFollowExcludeDomains.length ) {
		return false
	}
	isDoFollow = false
	rankMath.noFollowExcludeDomains.forEach( ( domain ) => {
		if ( includes( parsedUrl.host, domain ) ) {
			isDoFollow = true
		}
	})

	return isDoFollow
}

/**
 * Retrieves the URL from an anchor tag.
 */
function getFromAnchorTag( anchorTag ) {
	var urlMatch = urlFromAnchorRegex.exec( anchorTag )

	return ( null === urlMatch ) ? '' : urlMatch[ 2 ]
}

/**
 * Returns the protocol of a URL.
 */
function getProtocol( url ) {
	return urlMethods.parse( url ).protocol
}

/**
 * Checks whether the protocol is either HTTP: or HTTPS:.
 */
function isHttpScheme( protocol ) {
	if ( ! protocol ) {
		return false
	}

	return ( 'http:' === protocol || 'https:' === protocol )
}

/**
 * Determines whether the link is a relative fragment URL.
 */
function isRelativeFragmentURL( url ) {
	return '#' === url[0]
}

/**
 * Determine whether a URL is internal.
 */
function isInternalLink( url, host ) {

	// Check if the URL starts with a single slash.
	if ( ! includes( url, '//' ) && '/' === url[0]) {
		return true
	}

	// Check if the URL starts with a # indicating a fragment.
	if ( '#' === url[0]) {
		return false
	}

	const parsedUrl = urlMethods.parse( url, false, true )

	// No host indicates an internal link.
	if ( ! parsedUrl.host ) {
		return true
	}

	return includes( parsedUrl.host, host )
}

/**
 * Determines the type of link.
 */
export function getLinkType( text, url ) {
	const anchorUrl = getFromAnchorTag( text )

	/**
	 * A link is "Other" if:
	 * - The protocol is neither null, nor http, nor https.
	 * - The link is a relative fragment URL (starts with #), because it won't navigate to another page.
	 */
	const protocol = getProtocol( anchorUrl )
	if ( protocol && ! isHttpScheme( protocol ) ||
		isRelativeFragmentURL( anchorUrl ) ) {
		return 'other'
	}

	if ( isInternalLink( anchorUrl, url ) ) {
		return 'internal'
	}

	return 'external'
}

/**
 * Checks if a link has a `rel` attribute with a `nofollow` value. If it has, returns Nofollow, otherwise Dofollow.
 */
export function checkNofollow( anchorHTML, linkType ) {
	anchorHTML = anchorHTML.toLowerCase()

	if ( 'internal' !== linkType && rankMath.noFollowExternalLinks && ! includes( anchorHTML, 'rel=' ) ) {
		return couldBeDoFollow( getFromAnchorTag( anchorHTML ) ) ? 'Dofollow' : 'Nofollow'
	}

	if ( ! includes( anchorHTML, '<a' ) || ! includes( anchorHTML, 'rel=' ) ) {
		return 'Dofollow'
	}

	if ( includes( anchorHTML, 'nofollow' ) ) {
		return 'Nofollow'
	}

	return 'Dofollow'
}
