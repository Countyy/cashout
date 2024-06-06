import AsyncStorage from '@react-native-async-storage/async-storage'
import { getItem } from './getItem'

export async function setItem(key: keys, value: transaction) {
  try {
    const existingTransactions = await getItem('transactions')
    const newTransactions = Array.isArray(existingTransactions)
      ? [value, ...existingTransactions]
      : [value]

    await AsyncStorage.setItem(key, JSON.stringify(newTransactions))

    return 0
  } catch (e) {
    return e
  }
}
