import { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { NewTransaction } from '@/components/new-transaction'
import { Header } from '@/components/header'

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <NewTransaction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View className="bg-background flex-1 px-4 pt-20 flex gap-y-8">
        <Header setModalVisible={setModalVisible} />

        <View className="flex-1 space-y-4">
          <View className="py-3 px-4 border-l border-l-yellow-500">
            <View className="flex flex-row justify-between">
              <Text className="text-white">Compra no cartão de crédito</Text>
              <Text className="text-white/30">Há 2 horas</Text>
            </View>
            <Text className="text-white text-lg">R$ 100,00</Text>
          </View>

          <View className="py-3 px-4 border-l border-l-emerald-500">
            <View className="flex flex-row justify-between">
              <Text className="text-white">Recebimento</Text>
              <Text className="text-white/30">Há 3 horas</Text>
            </View>
            <Text className="text-white text-lg">R$ 150,00</Text>
          </View>

          <View className="py-3 px-4 border-l border-l-red-500">
            <View className="flex flex-row justify-between">
              <Text className="text-white">Compra no cartão de débito</Text>
              <Text className="text-white/30">Há 1 mês</Text>
            </View>
            <Text className="text-white text-lg">R$ 150,00</Text>
          </View>

          <View className="py-3 px-4 border-l border-l-orange-400">
            <View className="flex flex-row justify-between">
              <Text className="text-white">Compra em dinheiro</Text>
              <Text className="text-white/30">Há 1 ano</Text>
            </View>
            <Text className="text-white text-lg">R$ 150,00</Text>
          </View>

          <View className="py-3 px-4 border-l border-l-blue-500">
            <View className="flex flex-row justify-between">
              <Text className="text-white">Compra no PIX</Text>
              <Text className="text-white/30">Há 1 ano</Text>
            </View>
            <Text className="text-white text-lg">R$ 150,00</Text>
          </View>
        </View>
      </View>
    </>
  )
}
