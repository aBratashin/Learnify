const YooKassa = require('yookassa')

export default async function getPay(sum: number, desc: any[]) {
	const yooKassa = new YooKassa({
		shopId: process.env['SHOP_ID'],
		secretKey: process.env['PAYMENT_TOKEN']
	})

	const payment = await yooKassa.createPayment({
		amount: {
			value: sum.toFixed(2),
			currency: 'RUB'
		},
		payment_method_data: {
			type: 'bank_card'
		},
		confirmation: {
			type: 'redirect',
			return_url: 'http://localhost:3000/bought'
		},
		description: desc
	})

	return payment
}
