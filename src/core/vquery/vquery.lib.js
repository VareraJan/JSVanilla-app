/**
 * Represents the VQuery class for working with DOM elements.
 */
class VQuery {
	/**
	 * Create a new VQuery instance.
	 * @param {string|HTMLElement} selector  - A CSS selector string or an HTMLElement.
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type!')
		}
	}

	/**
	 * Find the first element that matches the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {VQuery} A new VQuery instance for the found element.
	 */
	find(selector) {
		const element = new VQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found!`)
		}
	}

	/**
	 * Set the CSS style of the selected element.
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 * @returns {VQuery} The current VQuery instance for chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('property and value must be strings')
		}

		this.element.style[property] = value
		return this
	}
}

/**
 * Create a new VQuery instance for the given selector.
 * @param {string|HTMLElement} selector  - A CSS selector string or an HTMLElement.
 * @returns {VQuery} A new VQuery instance for the given selector.
 */
export function $V(selector) {
	return new VQuery(selector)
}
