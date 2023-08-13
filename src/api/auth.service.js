import { NotificationService } from '@/core/services/notification.service'
import { vareraQuery } from '@/core/varera-query/varera-query.lib'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		// storage

		this.notificationService = new NotificationService()
	}

	main(type, body) {
		return vareraQuery({
			path: `${this.#BASE_URL}/${type}`,
			body,
			onSuccess: data => {
				// login store
				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			},
			method: 'POST'
		})
	}
}
