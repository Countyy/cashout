import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { RadioButton } from './radio-button'
import CurrencyInput from 'react-native-currency-input'
import { useState } from 'react'
import { setItem } from '@/lib/storage/setItem'
import { randomUUID } from 'expo-crypto'
import Icon from 'react-native-vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import { Labels } from './select-labels-modal'

type paymentMethods = 'credit-card' | 'debit-card' | 'cash' | 'pix'

export function WithdrawTransaction({
  fetchTransactions,
}: {
  fetchTransactions: () => Promise<void>
}) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<paymentMethods | null>(
    null
  )
  const [amount, setAmount] = useState<number | null>(null)
  const [description, setDescription] = useState<string>('')
  const [labels, setLabels] = useState<label[] | null>(null)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  async function handleSubmitTransaction() {
    if (!paymentMethod || !amount || !description) return
    await setItem('transactions', {
      amount,
      paymentMethod,
      description,
      labels,
      date: new Date(),
      id: randomUUID(),
      isDeposit: false,
    })
    router.back()
    fetchTransactions()
  }

  return (
    <>
      <Labels
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        labels={labels}
      />

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
        <View>
          <Text className="text-lg text-white font-semibold">Etiquetas</Text>
          <View className="">
            <TouchableOpacity
              className="h-10 w-full border border-zinc-800 rounded-lg flex justify-center items-end px-2"
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="down" color={'white'} size={20} />
            </TouchableOpacity>
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
            onPress={() => router.back()}
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
    </>
  )
}
