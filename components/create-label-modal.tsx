import { setItem } from '@/lib/storage/setItem'
import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { randomUUID } from 'expo-crypto'
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker'

export function CreateLabel({
  setModalVisible,
  fetchLabels,
}: {
  setModalVisible: (value: boolean) => void
  fetchLabels: () => Promise<void>
}) {
  const [color, setColor] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit() {
    if (!name || !color) return

    setLoading(true)

    await setItem('labels', { name, color, id: randomUUID() })

    setLoading(false)
    setModalVisible(false)
    fetchLabels()
  }

  return (
    <View className="m-auto bg-background rounded-lg px-6 py-4 border border-zinc-800 w-[98%] h-[92%]">
      <View className="flex-1">
        <Text className="text-white text-2xl font-medium">Nova etiqueta</Text>

        <View className="mb-6">
          <TextInput
            placeholder="Nome"
            className="border border-zinc-800 rounded-md px-2 h-10 mt-2 text-white"
            placeholderTextColor={'rgb(80 80 80)'}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
        </View>
        <View>
          <ColorPicker onComplete={(color) => setColor(color.hex)}>
            <HueSlider style={{ marginBottom: 24 }} />
            <Panel1 />
          </ColorPicker>
        </View>
      </View>
      <View className="flex-row justify-between gap-x-2 mt-auto">
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="border border-zinc-700 flex-1 h-12 rounded-md flex justify-center"
          disabled={loading}
        >
          <Text className="text-white text-center">Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          className="flex-1 h-12 rounded-md flex justify-center bg-yellow-300"
          disabled={loading || !(name && color)}
        >
          <Text className="text-black text-center font-semibold">Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
