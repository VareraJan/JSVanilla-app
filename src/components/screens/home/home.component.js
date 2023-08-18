import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './home.template.html'
import styles from './home.module.scss'
import { CardInfo } from './card-info/card-info.component'
import { Actions } from './actions/actions.component'
import { Contacts } from './contacts/contacts.component'
import { Transactions } from './transactions/transactions.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[CardInfo, Actions, Contacts, Transactions],
			styles
		)

		return element
	}
}
