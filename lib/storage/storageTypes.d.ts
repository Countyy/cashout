type paymentMethods = 'credit-card' | 'debit-card' | 'cash' | 'pix'
type keys = 'transactions'

type transaction = {
  id: string
  amount: number
  date: Date

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
