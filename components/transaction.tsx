import { View, Text, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { useRouter } from 'expo-router'

dayjs.extend(relativeTime)

type paymentMethods = 'credit-card' | 'debit-card' | 'cash' | 'pix'

export function Transaction({ transaction }: { transaction: transaction }) {
  const router = useRouter()

  const friendlyPaymentMethods: { [key in paymentMethods]: string } = {
    'credit-card': 'cartão de crédito',
    'debit-card': 'cartão de débito',
    cash: 'dinheiro',
    pix: 'PIX',
  }

  const borderColor = transaction.isDeposit
    ? 'green'
    : transaction.paymentMethod === 'pix'
    ? 'royalblue'
    : transaction.paymentMethod === 'credit-card'
    ? 'chocolate'
    : transaction.paymentMethod === 'debit-card'
    ? 'orangered'
    : transaction.paymentMethod === 'cash'
    ? 'mediumturquoise'
    : 'transparent'

  return (
    <TouchableOpacity
      className="mb-4 h-18"
      onPress={() => router.push('transaction/' + JSON.stringify(transaction))}
    >
      <View className="py-3 px-4 border-l" style={{ borderColor: borderColor }}>
        <View className="flex flex-row justify-between">
          <Text className="text-white">
            {transaction.isDeposit
              ? 'Depósito'
              : `Compra no ${
                  friendlyPaymentMethods[transaction.paymentMethod]
                }`}
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
    </TouchableOpacity>
  )
}
