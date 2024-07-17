import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getItem<T>(key: keys): Promise<string | T[] | null> {
  try {
    const value = (await AsyncStorage.getItem(key)) as string | null

    if (!value) return null

    const items = JSON.parse(value) as T[]

    return items
  } catch (e: any) {
    return e.toString()
  }
}
