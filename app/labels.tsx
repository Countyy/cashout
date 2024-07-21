import { useFocusEffect, useRouter } from 'expo-router'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome6'
import Modal from 'react-native-modal'
import { useCallback, useState } from 'react'
import { getItem } from '@/lib/storage/getItem'
import { CreateLabel } from '@/components/create-label-modal'
import { removeItem } from '@/lib/storage/removeItem'

export default function Labels() {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  const [labels, setLabels] = useState<label[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  async function fetchLabels() {
    setRefreshing(true)
    const items = await getItem<label>('labels')

    if (typeof items === 'string' || !items) {
      setLabels([])
      return setRefreshing(false)
    }

    if (items) {
      setLabels(items)
    }
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchLabels()
    }, [])
  )

  async function deleteLabel(id: string) {
    await removeItem('labels', id)

    setLabels(labels.filter((label) => label.id !== id))
  }

  return (
    <View className="flex w-full h-full bg-background">
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        children={
          <CreateLabel
            setModalVisible={setModalVisible}
            fetchLabels={fetchLabels}
          />
        }
        statusBarTranslucent
      />
      <View className="pt-12 px-4 mb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="chevron-small-left" size={36} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-3xl font-medium">Etiquetas</Text>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="circle-with-plus" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        className="flex-1 mt-8 flex px-8 w-full"
        contentContainerStyle={{
          flexDirection: 'row',
          columnGap: 8,
          rowGap: 8,
          flexWrap: 'wrap',
        }}
        fadingEdgeLength={200}
        data={labels}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 w-full">
            Nenhuma etiqueta cadastrada
          </Text>
        }
        renderItem={({ item }) => {
          return (
            <View
              className="flex flex-row space-x-3 items-center border w-fit rounded-xl m-0 py-1 px-2"
              key={item.id}
              style={{ borderColor: `${item.color}` }}
            >
              <View className="flex flex-row items-center space-x-2">
                <View
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></View>
                <Text className="text-white">{item.name}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteLabel(item.id)}>
                <FontAwesome name="times-circle" color="red" size={14} />
              </TouchableOpacity>
            </View>
          )
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchLabels} />
        }
      />
    </View>
  )
}
