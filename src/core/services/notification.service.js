import { $V } from '../vquery/vquery.lib'
import styles from '@/components/layout/notification/notification.module.scss'

/**
 * NotificationService is a utility class to handle displaying
 notification.
 * It can be used to display messages with different types (success,
 error) and manage the notification timeout.
 */
export class NotificationService {
	#timeout

	constructor() {
		this.#timeout = null
	}

	#setTimeout(callback, duration) {
		if (this.#timeout) {
			clearTimeout(this.#timeout)
		}
		this.#timeout = setTimeout(callback, duration)
	}

	/**
   * Show a notification with a specified message and type.
   * The notification will automatically hide after a specified duration.
   * @param {('success'|'error')} type - The type of the notification,
   only 'success' or 'error' are accepted.
   * @param {string} message - The message to be displayed in the notification.
   */
	show(type, message) {
		if (!['success', 'error'].includes(type)) {
			throw new Error(
				'Invalid notification type. Allowed types are "success" and "error".'
			)
		}

		const classNames = {
			success: styles.success,
			error: styles.error
		}

		const notificationElement = $V('#notification')
		const className = classNames[type]

		notificationElement.text(message).addClass(className)

		this.#setTimeout(() => {
			notificationElement.removeClass(className)
		}, 3000)
	}
}
