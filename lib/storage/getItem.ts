import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getItem(
  key: keys
): Promise<string | transaction[] | null> {
  try {
    const value = (await AsyncStorage.getItem(key)) as string | null

    if (!value) return null

    const transactions = JSON.parse(value) as transaction[]

    return transactions
  } catch (e: any) {
    return e.toString()
  }
}
