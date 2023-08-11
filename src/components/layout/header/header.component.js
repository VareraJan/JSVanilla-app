import ChildComponent from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import styles from './header.module.scss'
import template from './header.template.html'
import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({
					router: this.router
				}),
				Search,
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

		return this.element
	}
}
