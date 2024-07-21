import AsyncStorage from '@react-native-async-storage/async-storage'
import { getItem } from './getItem'

export async function removeItem(key: keys, id: string) {
  try {
    const items = await getItem<values>(key)

    if (!Array.isArray(items)) throw new Error('The returned item is not an array.')

    const newItems = items.filter((item: values) => item.id !== id)

    await AsyncStorage.setItem(key, JSON.stringify(newItems))
  } catch (error) {
    return error
  }
}
