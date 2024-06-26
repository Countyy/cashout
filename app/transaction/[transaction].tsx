import { ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import dayjs from 'dayjs'
import ptbr from 'dayjs/locale/pt-br'

dayjs.locale(ptbr)

export default function Transaction() {
  const local = useLocalSearchParams() as { transaction: string }

  const transaction = JSON.parse(local.transaction) as transaction

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

  if (transaction.isDeposit) {
    return (
      <View className="py-12 px-4 flex h-screen">
        <Text
          className=" text-white text-2xl font-medium mb-1"
          style={{ color: borderColor }}
        >
          Depósito
        </Text>
        <Text className=" text-white text-lg mb-8">
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(transaction.amount)}{' '}
        </Text>
        <ScrollView fadingEdgeLength={200}>
          <Text className="text-white flex-1 text-lg">
            {transaction.description}
          </Text>
        </ScrollView>

        <Text className="text-white text-xs mt-4">
          {dayjs(transaction.date).format(
            '[Depósito feito] dddd[,] DD/MM/YYYY[, às] HH:mm[.]'
          )}
        </Text>
      </View>
    )
  }

  return (
    <View className="py-12 px-4 flex h-screen">
      <Text
        className=" text-white text-2xl font-medium mb-1"
        style={{ color: borderColor }}
      >
        Compra no {friendlyPaymentMethods[transaction.paymentMethod]}
      </Text>
      <Text className=" text-white text-lg mb-8">
        {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(transaction.amount)}{' '}
      </Text>
      <ScrollView fadingEdgeLength={200}>
        <Text className="text-white flex-1 text-lg">
          {transaction.description}
        </Text>
      </ScrollView>

      <Text className="text-white text-xs mt-4">
        {dayjs(transaction.date).format(
          '[Compra feita] dddd[,] DD/MM/YYYY[, às] HH:mm[.]'
        )}
      </Text>
    </View>
  )
}
