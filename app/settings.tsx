import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useRouter } from 'expo-router'

export default function Settings() {
  const router = useRouter()
  return (
    <View className="bg-background min-h-screen px-4 pt-12 flex gap-y-8">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="chevron-small-left" size={36} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-3xl">Configurações</Text>
      </View>
    </View>
  )
}
