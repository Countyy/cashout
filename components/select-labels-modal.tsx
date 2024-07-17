import { View, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign'

export function Labels({
  isModalVisible,
  setIsModalVisible,
  labels,
}: {
  isModalVisible: boolean
  setIsModalVisible: (value: boolean) => void
  labels: label[] | null
}) {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={() => setIsModalVisible(false)}
      onBackdropPress={() => setIsModalVisible(false)}
      className="flex justify-center items-center"
    >
      <View className="w-[99%] h-[99%] bg-background px-8 py-6">
        <View className="flex-row items-center mb-4 gap-x-2">
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Icon name="left" size={20} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-2xl font-medium">Etiquetas</Text>
        </View>
        <View className="px-4">
          {labels === null ? (
            <Text className="text-white/40 text-center">
              Não há etiquetas criadas. Você pode criá-las nas configurações.
            </Text>
          ) : (
            labels.map((label) => {
              return (
                <View className="flex">
                  <View
                    className="rounded-full w-4 h-4"
                    style={{ backgroundColor: label.color }}
                  ></View>
                  <Text>{label.name}</Text>
                </View>
              )
            })
          )}
        </View>
      </View>
    </Modal>
  )
}
