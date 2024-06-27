import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useRouter } from 'expo-router'
import Modal from 'react-native-modal'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Settings() {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(<></>)
  const router = useRouter()

  function handleOpenModal(variation: string) {
    switch (variation) {
      case 'delete-all':
        setModalChildren(
          <DeleteAllTransactions setModalVisible={setModalVisible} />
        )
    }
    setModalVisible(true)
  }

  return (
    <>
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
        children={modalChildren}
        backdropOpacity={0.85}
      />
      <View className="bg-background h-full">
        <View className="space-y-4 px-4 pt-12 flex">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="chevron-small-left" size={36} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-3xl font-medium">
              Configurações
            </Text>
          </View>

          <View>
            <TouchableOpacity
              className="border-red-600 border rounded justify-center items-center py-4"
              onPress={() => handleOpenModal('delete-all')}
            >
              <Text className="text-red-600 text-base">
                Apagar todas as transações
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

function DeleteAllTransactions({
  setModalVisible,
}: {
  setModalVisible: (value: boolean) => void
}) {
  return (
    <View className="w-10/12 h-1/5 bg-background rounded-lg py-4 px-6 justify-between border-[0.5px] border-gray-200">
      <Text className="bg-background text-white text-center">
        Tem certeza que deseja apagar todas as transações do registro?
      </Text>

      <View className="flex-row gap-x-1">
        <TouchableOpacity
          className="flex-1 border-[0.5px] border-gray-200 rounded py-2"
          onPress={() => setModalVisible(false)}
        >
          <Text className="text-gray-200 text-center">Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-red-600 rounded py-2"
          onPress={async () => {
            await AsyncStorage.clear()
            setModalVisible(false)
            ToastAndroid.show('Transações apagadas', ToastAndroid.SHORT)
          }}
        >
          <Text className="text-white text-center">Apagar tudo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
