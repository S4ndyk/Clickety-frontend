import { useState } from 'react'

export const usePopUp = () => {
  const [notification, setNotification] = useState(null)
  const [prevTimeout, setPrevTimeout] = useState(null)

  const notify = (message, time = 3) => {
    clearTimeout(prevTimeout)
    setNotification(message)
    setPrevTimeout(setTimeout(() => setNotification(null), 1000 * time))
  }

  return [notification, notify]
}

export default usePopUp