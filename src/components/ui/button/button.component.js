import ChildComponent from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import styles from './button.module.scss'
import template from './button.template.html'
import { $V } from '@/core/vquery/vquery.lib'

export class Button extends ChildComponent {
	constructor({ children, onClick, variant }) {
		super()

		if (!children) throw new Error('Childrem is empty!')
		this.children = children
		this.onClick = onClick
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$V(this.element).html(this.children).click(this.onClick)

		if (this.variant) {
			$V(this.element).addClass(styles[this.variant])
		}

		return this.element
	}
}
