import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { NewTransaction } from '@/components/new-transaction'

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <NewTransaction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View className="bg-background flex-1 px-8 py-12">
        <View className="flex flex-row justify-between mb-4 items-center">
          <Text className="text-white text-4xl font-semibold">
            Balanço Mensal
          </Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon
              name="pluscircle"
              color={'white'}
              className="bg-red-400"
              size={28}
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center gap-0 mb-2">
          <View className="flex flex-row items-center">
            <Icon name="upcircle" size={20} color={'green'} />
            <Text className="text-green-600 text-xl"> R$350,00</Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <View className="flex flex-row items-center">
              <Icon name="upcircle" size={12} color={'green'} />
              <Text className="text-green-300 text-xs"> R$400,00</Text>
            </View>

            <View className="flex flex-row items-center">
              <Icon name="downcircle" size={12} color={'red'} />
              <Text className="text-red-300 text-xs"> R$50,00</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row gap-2 items-center">
          <Icon name="creditcard" size={24} color={'white'} />
          <Text className="text-white text-base">
            Fatura do cartão: R$238,90
          </Text>
        </View>
      </View>
    </>
  )
}
