import { NavigationContainer } from '@react-navigation/native'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './components/LoadingComponent'
import { persistor, store } from './redux/store'
import Main from './screens/MainComponent'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  )
}
