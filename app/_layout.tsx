import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="inverted" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </ThemeProvider>
  )
}
