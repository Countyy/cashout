import { useEffect, useState, useCallback } from 'react'
import { FlatList, RefreshControl, View, Text } from 'react-native'
import { Header } from '@/components/header'
import { getItem } from '@/lib/storage/getItem'
import { Transaction } from '@/components/transaction'
import { useFocusEffect } from '@react-navigation/native'

export default function Index() {
  const [transactions, setTransactions] = useState<transaction[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  async function fetchTransactions() {
    setRefreshing(true)
    const items = await getItem<transaction>('transactions')

    if (typeof items === 'string' || !items) {
      setTransactions([])
      return setRefreshing(false)
    }

    if (items) {
      setTransactions(items)
    }
    setRefreshing(false)
  }

  useEffect(() => {
    async function startFetchTransactions() {
      await fetchTransactions()
    }
    startFetchTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
    }, [])
  )

  return (
    <View className="bg-background h-full w-full px-4 pt-12 flex">
      <Header transactions={transactions} />

      <FlatList
        className="flex-1 mt-8"
        fadingEdgeLength={200}
        data={transactions}
        ListEmptyComponent={
          <Text className="text-center text-gray-400">
            Nenhuma transação cadastrada
          </Text>
        }
        renderItem={({ item }) => {
          return <Transaction transaction={item} key={item.id} />
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchTransactions}
          />
        }
      />
    </View>
  )
}
