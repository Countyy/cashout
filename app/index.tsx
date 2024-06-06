import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { NewTransaction } from '@/components/new-transaction'
import { Header } from '@/components/header'
import { getItem } from '@/lib/storage/getItem'
import { Transaction } from '@/components/transaction'

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false)
  const [transactions, setTransactions] = useState<transaction[]>([])

  async function fetchTransactions() {
    const items = await getItem('transactions')

    if (typeof items === 'string' || !items) return

    if (items) {
      setTransactions(items)
    }
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

      <View className="bg-background flex-1 px-4 pt-20 flex gap-y-8">
        <Header setModalVisible={setModalVisible} />

        <FlatList
          className="flex-1"
          fadingEdgeLength={200}
          data={transactions}
          renderItem={({ item }) => {
            return <Transaction transaction={item} key={item.id} />
          }}
        />
      </View>
    </>
  )
}
