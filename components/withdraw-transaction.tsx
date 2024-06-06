import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { RadioButton } from './radio-button'
import CurrencyInput from 'react-native-currency-input'
import { useState } from 'react'
import { setItem } from '@/lib/storage/setItem'
import { randomUUID } from 'expo-crypto'

type paymentMethods = 'credit-card' | 'debit-card' | 'cash' | 'pix'

export function WithdrawTransaction({
  setModalVisible,
  fetchTransactions
}: {
  setModalVisible: (visible: boolean) => void
  fetchTransactions: () => Promise<void>
}) {
  const [paymentMethod, setPaymentMethod] = useState<paymentMethods | null>(
    null
  )
  const [amount, setAmount] = useState<number | null>(null)
  const [description, setDescription] = useState<string>('')

  async function handleSubmitTransaction() {
    if (!paymentMethod || !amount || !description) return
    await setItem('transactions', {
      amount,
      paymentMethod,
      description,
      date: new Date(),
      id: randomUUID(),
    })
    setModalVisible(false)
    fetchTransactions()
  }

  return (
    <View className="space-y-4 h-full w-full mt-4">
      <View className="space-y-1">
        <Text className="text-lg text-white font-semibold">
          Forma de Pagamento
        </Text>
        <View className="flex flex-row w-full justify-between items-center flex-wrap h-fit flex-grow">
          <RadioButton
            selectedRadioButton={paymentMethod}
            setSelectedRadioButton={setPaymentMethod}
            id="credit-card"
            name="Cartão de Crédito"
            icon="credit-card"
          />
          <RadioButton
            selectedRadioButton={paymentMethod}
            setSelectedRadioButton={setPaymentMethod}
            id="debit-card"
            name="Cartão de Débito"
            icon="credit-card"
          />
          <RadioButton
            selectedRadioButton={paymentMethod}
            setSelectedRadioButton={setPaymentMethod}
            id="cash"
            name="Dinheiro"
            icon="attach-money"
          />
          <RadioButton
            selectedRadioButton={paymentMethod}
            setSelectedRadioButton={setPaymentMethod}
            id="pix"
            name="PIX"
            icon="pix"
          />
        </View>
      </View>

      <View className="space-y-1">
        <Text className="text-lg text-white font-semibold">
          Valor da compra
        </Text>
        <View className="">
          <CurrencyInput
            inputMode="numeric"
            prefix="R$"
            separator=","
            placeholder="R$99,99"
            className="border-zinc-800 border rounded-lg text-white px-2 w-full h-10"
            placeholderTextColor={'rgb(39, 39, 42)'}
            value={amount}
            onChangeValue={setAmount}
          />
        </View>
      </View>
      <View className="space-y-1">
        <Text className="text-lg text-white font-semibold">
          Descrição da transação
        </Text>
        <View className="">
          <TextInput
            placeholder="Pagamento para fulano"
            className="border-zinc-800 border rounded-lg text-white px-2 w-full min-h-[40px]"
            placeholderTextColor={'rgb(39, 39, 42)'}
            multiline
            value={description}
            onChange={(e) => {
              setDescription(e.nativeEvent.text)
            }}
          />
        </View>
      </View>
      <View className="flex flex-row justify-between w-full space-x-1 mb-10">
        <TouchableOpacity
          className="border border-zinc-800 rounded-lg h-12 flex-1 flex justify-center items-center px-4"
          onPress={() => setModalVisible(false)}
        >
          <Text className="text-white">Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border rounded-lg h-12 flex-1 flex justify-center items-center bg-yellow-300 px-4"
          disabled={!paymentMethod || !amount || !description}
          onPress={() => handleSubmitTransaction()}
        >
          <Text className="text-black font-semibold text-center">
            Registrar Transação
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
