const SITE_NAME = 'Varera Bank'
export const getTitle = title => {
	return title ? `${title} | ${SITE_NAME}` : `${SITE_NAME}`
}
