import { vareraQuery } from '@/core/varera-query/varera-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return vareraQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
