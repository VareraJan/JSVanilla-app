import ChildComponent from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import styles from './loader.module.scss'
import template from './loader.template.html'
import { $V } from '@/core/vquery/vquery.lib'

export const LOADER_SELECTOR = '[data-component="loader"]'

export class Loader extends ChildComponent {
	constructor(width = 100, height = 100) {
		super()

		this.width = width
		this.height = height
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$V(this.element)
			.css('width', `${this.width}px`)
			.css('height', `${this.height}px`)
			.addClass('bounce')

		return this.element
	}
}
