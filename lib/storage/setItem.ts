import AsyncStorage from '@react-native-async-storage/async-storage'
import { getItem } from './getItem'

export async function setItem(key: keys, value: transaction) {
  try {
    const existingItems = await getItem('transactions')
    const newItems = Array.isArray(existingItems)
      ? [value, ...existingItems]
      : [value]

    await AsyncStorage.setItem(key, JSON.stringify(newItems))

    return 0
  } catch (e) {
    return e
  }
}
