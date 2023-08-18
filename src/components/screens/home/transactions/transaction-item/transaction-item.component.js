import ChildComponent from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import styles from './transaction-item.module.scss'
import template from './transaction-item.template.html'
import { $V } from '@/core/vquery/vquery.lib'
import { formatDate } from '@/utils/format/format-to-date'
import { formatToCurrency } from '@/utils/format/format-to-currency'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()

		this.transaction = transaction
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			$V(this.element).addClass(styles.income)
		}

		$V(this.element).find('#transaction-name').text(name)

		$V(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))

		$V(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}
