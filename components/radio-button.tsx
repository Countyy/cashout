import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export function RadioButton<T>({
  name,
  icon,
  id,
  selectedRadioButton,
  setSelectedRadioButton,
}: {
  name: string
  icon: string
  id: T
  selectedRadioButton: T | null
  setSelectedRadioButton: (id: T) => void
}) {
  return (
    <>
      {selectedRadioButton === id ? (
        <TouchableOpacity
          className="flex-1 aspect-square mx-1 mb-2 border rounded-lg flex justify-center items-center p-2 border-yellow-300 min-w-[40%]"
          onPress={() => setSelectedRadioButton(id)}
        >
          <View className="flex-1 flex justify-center items-center">
            <Icon size={Dimensions.get('window').width / 10} name={icon} color={'white'} className="flex-1" />
          </View>
          <View className="h-8 flex justify-center items-center">
            <Text className="text-white text-center text-xs">{name}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="flex-1 aspect-square mx-1 mb-2 border rounded-lg flex justify-center items-center p-2 border-zinc-800 min-w-[40%]"
          onPress={() => setSelectedRadioButton(id)}
        >
          <View className="flex-1 flex justify-center items-center">
            <Icon size={Dimensions.get('window').width / 10} name={icon} color={'white'} className="flex-1" />
          </View>
          <View className="h-8 flex justify-center items-center">
            <Text className="text-white text-center text-xs">{name}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  )
}
