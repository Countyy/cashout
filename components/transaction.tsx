import { View, Text } from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
// dayjs.locale(ptBr)

type paymentMethods = 'credit-card' | 'debit-card' | 'cash' | 'pix'

export function Transaction({
  transaction
}: {
  transaction: {
    paymentMethod: paymentMethods
    amount: number
    date: Date
    isDeposit?: boolean
  }
}) {
  const friendlyPaymentMethods: { [key in paymentMethods]: string } = {
    'credit-card': 'cartão de crédito',
    'debit-card': 'cartão de débito',
    cash: 'dinheiro',
    pix: 'pix',
  }
  return (
    <View className="flex-1 mb-4">
      {!transaction.isDeposit && (
        <View className="py-3 px-4 border-l border-l-yellow-500">
          <View className="flex flex-row justify-between">
            <Text className="text-white">
              Compra no {friendlyPaymentMethods[transaction.paymentMethod]}
            </Text>
            <Text className="text-white/30">
              {dayjs(transaction.date).locale('pt-br').fromNow()}
            </Text>
          </View>
          <Text className="text-white text-lg">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(transaction.amount)}
          </Text>
        </View>
      )}
    </View>
  )
}
