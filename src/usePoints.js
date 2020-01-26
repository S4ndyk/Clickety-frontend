import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('/')

export const usePoints = (startingPoints) => {
  const [clicks, setClicks] = useState(0)
  const [points, setPoints] = useState(startingPoints)

  useEffect(() => {
    const prevPoints = window.localStorage.getItem('points')
    if (prevPoints) {
      setPoints(parseInt(prevPoints))
    }
  }, [])

  const getPrize = (clk) => {
    if (clk <= 0) return 0
    if (clk % 500 === 0) return 250
    if (clk % 100 === 0) return 40
    if (clk % 10 === 0) return 5
    return 0
  }

  socket.on('totalClicks', total => {
    setClicks(total)
  })

  const click = () => {
    if (points > 0) {
      const newPoints = (points - 1) + getPrize(clicks + 1)
      setPoints(newPoints)
      window.localStorage.setItem('points', newPoints)
      socket.emit('click')
    }
    const clicksToNextPrize = 9 - clicks % 10
    const prize = points > 0 ? getPrize(clicks + 1) : 0
    return [clicksToNextPrize, prize]
  }

  const restart = () => setPoints(startingPoints)

  return [points, click, restart]
}

