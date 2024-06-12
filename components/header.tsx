import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useRouter } from 'expo-router'

export function Header({
  setModalVisible,
}: {
  setModalVisible: (visible: boolean) => void
}) {
  const router = useRouter()
  return (
    <View className="px-4">
      <View className="flex flex-row justify-between mb-4 items-center">
        <Text className="text-white text-3xl font-semibold">
          Balanço Mensal
        </Text>

        <View className='flex flex-row gap-x-2'>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Icon name="setting" color={'white'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="pluscircle" color={'white'} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-row items-center gap-x-0 mb-1">
        <View className="flex flex-row items-center">
          <Icon name="upcircle" size={16} color={'green'} />
          <Text className="text-green-600 text-lg"> R$350,00</Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <View className="flex flex-row items-center">
            <Icon name="upcircle" size={12} color={'green'} />
            <Text className="text-green-500 text-xs"> R$400,00</Text>
          </View>

          <View className="flex flex-row items-center">
            <Icon name="downcircle" size={12} color={'red'} />
            <Text className="text-red-500 text-xs"> R$50,00</Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row gap-x-1 items-center">
        <Icon name="creditcard" size={16} color={'white'} />
        <Text className="text-white text-lg">R$238,90</Text>
      </View>
    </View>
  )
}
