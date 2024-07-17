import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Dimensions, View } from 'react-native'

export default function RootLayout() {
  return (
    <View
      className="p-0 m-0"
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
      }}
    >
      <StatusBar style="light" />
      <Stack
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
    </View>
  )
}
