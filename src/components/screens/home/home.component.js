import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './home.template.html'
import styles from './home.module.scss'
import { $V } from '@/core/vquery/vquery.lib'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(template, [], styles)

		$V(element).find('h1').css('color', 'darkBlue')

		return element.outerHTML
	}
}
