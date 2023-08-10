import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './home.template.html'
import styles from './home.module.scss'
import { $V } from '@/core/vquery/vquery.lib'
import { Field } from '@/components/ui/field/field.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'test',
					placeholder: 'Enter Email',
					variant: 'green'
				})
			],
			styles
		)

		$V(element).find('h1').css('color', 'blue')

		return element
	}
}
