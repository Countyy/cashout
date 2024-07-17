import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useRouter } from 'expo-router'

export function Header({ transactions = [] }: { transactions: transaction[] }) {
  const router = useRouter()

  const totalIncome = transactions.reduce((acc, transaction) => {
    if (transaction.isDeposit) return acc + transaction.amount
    return acc
  }, 0)
  const totalOutcome = transactions.reduce((acc, transaction) => {
    if (
      !transaction.isDeposit &&
      !(transaction.paymentMethod === 'credit-card')
    )
      return acc + transaction.amount
    return acc
  }, 0)
  const creditCardBill = transactions.reduce((acc, transaction) => {
    if (!transaction.isDeposit && transaction.paymentMethod === 'credit-card')
      return acc + transaction.amount
    return acc
  }, 0)
  const total = totalIncome - totalOutcome

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <View className="px-4">
      <View className="flex flex-row justify-between mb-4 items-center">
        <Text className="text-white text-3xl font-semibold">
          Balanço Mensal
        </Text>

        <View className="flex flex-row gap-x-2">
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Icon name="setting" color={'white'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/new-transaction')}>
            <Icon name="pluscircle" color={'white'} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-row items-center gap-x-0 mb-1">
        <View className="flex flex-row items-center">
          {total > 0 ? (
            <>
              <Icon name="upcircle" size={16} color={'green'} />
              <Text className="text-green-600 text-lg">
                {' '}
                {formatter.format(total)}
              </Text>
            </>
          ) : total < 0 ? (
            <>
              <Icon name="downcircle" size={16} color={'red'} />
              <Text className="text-red-600 text-lg">
                {' '}
                {formatter.format(total * -1)}
              </Text>
            </>
          ) : (
            total == 0 && (
              <>
                <Icon name="minuscircle" size={16} color={'white'} />
                <Text className="text-white text-lg">
                  {' '}
                  {formatter.format(0)}
                </Text>
              </>
            )
          )}
        </View>

        <View className="flex flex-row items-center gap-2">
          <View className="flex flex-row items-center">
            {totalIncome > 0 ? (
              <>
                <Icon name="upcircle" size={16} color={'green'} />
                <Text className="text-green-600 text-xs">
                  {' '}
                  {formatter.format(totalIncome)}
                </Text>
              </>
            ) : (
              totalIncome == 0 && (
                <>
                  <Icon name="minuscircle" size={12} color={'white'} />
                  <Text className="text-white text-xs">
                    {' '}
                    {formatter.format(0)}
                  </Text>
                </>
              )
            )}
          </View>

          <View className="flex flex-row items-center">
            {totalOutcome > 0 ? (
              <>
                <Icon name="downcircle" size={12} color={'red'} />
                <Text className="text-red-600 text-xs">
                  {' '}
                  {formatter.format(totalOutcome)}
                </Text>
              </>
            ) : (
              totalOutcome == 0 && (
                <>
                  <Icon name="minuscircle" size={12} color={'white'} />
                  <Text className="text-white text-xs">
                    {' '}
                    {formatter.format(0)}
                  </Text>
                </>
              )
            )}
          </View>
        </View>
      </View>

      <View className="flex flex-row gap-x-1 items-center">
        <Icon name="creditcard" size={16} color={'white'} />
        <Text className="text-white text-lg">
          {formatter.format(creditCardBill)}
        </Text>
      </View>
    </View>
  )
}
