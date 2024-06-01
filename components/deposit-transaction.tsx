import { useState } from "react"
import { View, Text, TextInput } from "react-native"
import CurrencyInput from "react-native-currency-input"

export function DepositTransaction() {
  const [value, setValue] = useState<number | null>(null)
  const [description, setDescription] = useState<string>('')

  return (
    <View className='space-y-4 h-full w-full mt-4'>
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
            value={value}
            onChangeValue={setValue}
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
    </View>
  )
}