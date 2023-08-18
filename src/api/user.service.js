import { vareraQuery } from '@/core/varera-query/varera-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return vareraQuery({
			path: `${this.#BASE_URL}${
				searchTerm ? `?${new URLSearchParams({ searchTerm })}` : ''
			}`,
			onSuccess
		})
	}
}
