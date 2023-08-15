import renderService from '@/core/services/render.service'

import styles from './auth.module.scss'
import template from './auth.template.html'
import { BaseScreen } from '@/core/components/base-screen.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { AuthService } from '@/api/auth.service'
import { Button } from '@/components/ui/button/button.component'
import { $V } from '@/core/vquery/vquery.lib'
import { Field } from '@/components/ui/field/field.component'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#handleSubmit = event => {
		console.log(event.target)
	}

	#changeFormType = event => {
		event.preventDefault()

		$V(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign In')

		$V(event.target).text(this.#isTypeLogin ? 'Sign In' : 'Register')
		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		)

		$V(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

		$V(this.element).find('#change-form-type').click(this.#changeFormType)
		// .click(e => this.#changeFormType(e))
		// .click(this.#changeFormType.bind(this))

		$V(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}
