const YooKassa = require('yookassa')

export default async function confirmPay(id: string) {
	const yooKassa = new YooKassa({
		shopId: process.env['SHOP_ID'],
		secretKey: process.env['PAYMENT_TOKEN']
	})

	const payment = await yooKassa.capturePayment(id)
	return payment
}
