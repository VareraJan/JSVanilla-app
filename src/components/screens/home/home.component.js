import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './home.template.html'
import styles from './home.module.scss'
import { $V } from '@/core/vquery/vquery.lib'
import { Field } from '@/components/ui/field/field.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

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
				}),
				new UserItem(
					{
						avatarPath:
							'https://avatars.dzeninfra.ru/get-zen_doc/4414226/pub_60b322993204ed6102ac6bb8_60b322c82174cf46a996d44b/scale_1200',
						name: 'Valera'
					},
					false,
					() => alert()
				)
			],
			styles
		)

		$V(element).find('h1').css('color', 'blue')

		return element
	}
}
