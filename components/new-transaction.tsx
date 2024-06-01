import { RadioButton } from '@/components/radio-button'
import Modal from 'react-native-modal'
import {
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { WithdrawTransaction } from './withdraw-transaction'
import { DepositTransaction } from './deposit-transaction'

export function NewTransaction({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}) {
  const [transactionType, setTransactionType] = useState<
    'deposit' | 'withdraw' | null
  >('withdraw')

  return (
    <Modal
      isVisible={modalVisible}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOutTiming={300}
      onBackButtonPress={() => setModalVisible(false)}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      onBackdropPress={() => setModalVisible(false)}
      className="flex items-center"
    >
      <View className='h-[90%] w-full'>
        <ScrollView className="w-full bg-background rounded-lg px-8 py-6 space-y-8" fadingEdgeLength={200}>
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
          {transactionType === 'withdraw' && <WithdrawTransaction setModalVisible={setModalVisible}/>}
          {transactionType === 'deposit' && <DepositTransaction />}
        </ScrollView>
      </View>
    </Modal>
  )
}
