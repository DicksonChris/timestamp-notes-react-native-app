import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export function useBackHandler(handler: () => boolean, isModalVisible: boolean) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [isModalVisible])
}
