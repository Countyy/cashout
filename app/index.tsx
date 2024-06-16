import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { NewTransaction } from '@/components/new-transaction'
import { Header } from '@/components/header'
import { getItem } from '@/lib/storage/getItem'
import { Transaction } from '@/components/transaction'

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false)
  const [transactions, setTransactions] = useState<transaction[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  async function fetchTransactions() {
    setRefreshing(true)
    const items = await getItem('transactions')

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

  useEffect(() => {
    setInterval(async () => {
      await fetchTransactions()
    }, 60000)
  }, [])

  return (
    <>
      <NewTransaction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        fetchTransactions={fetchTransactions}
      />

      <View className="bg-background min-h-screen px-4 pt-20 flex gap-y-8">
        <Header setModalVisible={setModalVisible} />

        <FlatList
          className="flex-1"
          fadingEdgeLength={200}
          data={transactions}
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
    </>
  )
}
