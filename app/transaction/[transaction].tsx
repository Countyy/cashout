import { Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function Transaction() {
  const local = useLocalSearchParams() as { transaction: string }

  const transaction = JSON.parse(local.transaction) as transaction

  const friendlyPaymentMethods: { [key in paymentMethods]: string } = {
    'credit-card': 'cartão de crédito',
    'debit-card': 'cartão de débito',
    cash: 'dinheiro',
    pix: 'PIX',
  }

  if (transaction.isDeposit) return

  return (
    <View className="py-12 px-4">
      <Text className=" text-white text-2xl font-medium mb-1">Compra no {friendlyPaymentMethods[transaction.paymentMethod]}</Text>
      <Text className=" text-white text-lg">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}</Text>
    </View>
  )
}
