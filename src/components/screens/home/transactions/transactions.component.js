import ChildComponent from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import styles from './transactions.module.scss'
import template from './transactions.template.html'
import { Heading } from '@/components/ui/heading/heading.component'
import { Store } from '@/core/store/store'
import { TransactionService } from '@/api/transaction.resvice'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { $V } from '@/core/vquery/vquery.lib'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { TransactionItem } from './transaction-item/transaction-item.component'

export class Transactions extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.transactionService = new TransactionService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Recent transactions')],
			styles
		)
		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted
		)
	}

	#onTransactionCompleted = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.transactionService.getAll(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const transactionList = $V(this.element).find('#transactions-list')
			transactionList.text('')

			if (data.length) {
				for (const transaction of data.transactions) {
					transactionList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionList.text('Transactions not found!')
			}
		})
	}

	render() {
		if (this.store.user) {
			$V(this.element).append(new Loader().render())
			this.fetchData()
		}

		return this.element
	}
}
