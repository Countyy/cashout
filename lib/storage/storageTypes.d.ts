type paymentMethods = 'credit-card' | 'debit-card' | 'cash' | 'pix'
type keys = 'transactions' | 'labels'

type transaction = {
  id: string
  amount: number
  date: Date
  labels?: label[] | null
  description: string
} & (
  | {
      isDeposit: true
    }
  | {
      isDeposit: false 
      paymentMethod: paymentMethods
    }
)

type label = {
  name: string
  color: string
}