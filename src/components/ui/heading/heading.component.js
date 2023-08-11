import ChildComponent from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import styles from './heading.module.scss'
import template from './heading.template.html'
import { $V } from '@/core/vquery/vquery.lib'

export class Heading extends ChildComponent {
	constructor(title = '') {
		super()
		this.title = title
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$V(this.element).text(this.title)

		return this.element
	}
}
