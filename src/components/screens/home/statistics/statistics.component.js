import ChildComponent from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import styles from './statistics.module.scss'
import template from './statistics.template.html'
import { Heading } from '@/components/ui/heading/heading.component'
import { Store } from '@/core/store/store'
import { StatisticService } from '@/api/statistic.service'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { $V } from '@/core/vquery/vquery.lib'
import { StatisticsItem } from './statistics-item/statistics-item.component'
import { formatToCurrency } from '@/utils/format/format-to-currency'

export class Statistics extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Statistics')],
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
		this.statisticService.main(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const statisticsItemsElement = $V(this.element).find('#statistics-items')
			statisticsItemsElement.text('')

			// const circleChartElement = $V(this.element).find('#circle-chart')
			// circleChartElement.text('')

			statisticsItemsElement
				.append(
					new StatisticsItem(
						'Income:',
						formatToCurrency(data[0].value),
						'green'
					).render()
				)
				.append(
					new StatisticsItem(
						'Expense:',
						formatToCurrency(data[1].value),
						'purple'
					).render()
				)
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
