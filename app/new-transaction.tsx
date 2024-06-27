import { RadioButton } from '@/components/radio-button'
import Modal from 'react-native-modal'
import { Text, View } from 'react-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { WithdrawTransaction } from '@/components/withdraw-transaction'
import { DepositTransaction } from '../components/deposit-transaction'
import { useRouter } from 'expo-router'

export default function NewTransaction({
  fetchTransactions,
}: {
  fetchTransactions: () => Promise<void>
}) {
  const router = useRouter()
  const [transactionType, setTransactionType] = useState<
    'deposit' | 'withdraw' | null
  >('withdraw')

  return (
    <View className="h-full w-full bg-background">
      <ScrollView
        className="w-full bg-background rounded-lg px-8 space-y-8 mt-8"
        fadingEdgeLength={200}
      >
        <View className="h-fit space-y-1">
          <Text className="text-white font-bold text-xl">
            Tipo de transação
          </Text>
          <View className="flex flex-row">
            <RadioButton
              name="Pagamento"
              id="withdraw"
              icon="payment"
              selectedRadioButton={transactionType}
              setSelectedRadioButton={() => setTransactionType('withdraw')}
            />
            <RadioButton
              name="Recebimento"
              id="deposit"
              selectedRadioButton={transactionType}
              setSelectedRadioButton={() => setTransactionType('deposit')}
              icon="payments"
            />
          </View>
        </View>
        {transactionType === 'withdraw' && (
          <WithdrawTransaction fetchTransactions={fetchTransactions} />
        )}
        {transactionType === 'deposit' && (
          <DepositTransaction fetchTransactions={fetchTransactions} />
        )}
      </ScrollView>
    </View>
  )
}
