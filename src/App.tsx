import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [pointsPerClick, setPointsPerClick] = useState(1)
  const [upgradeLevel, setUpgradeLevel] = useState(0)
  const [autoClickerLevel, setAutoClickerLevel] = useState(0)
  const [doubleClickActive, setDoubleClickActive] = useState(false)
  const [doubleClickTimeout, setDoubleClickTimeout] = useState<number | null>(null)

  const upgradeCost = 10 * (upgradeLevel + 1)
  const autoClickerCost = 50 * (autoClickerLevel + 1)
  const doubleClickCost = 100 + (doubleClickActive ? 1000 : 0)

  useEffect(() => {
    if (autoClickerLevel > 0) {
      const interval = setInterval(() => {
        setScore(s => s + autoClickerLevel)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [autoClickerLevel])

  useEffect(() => {
    if (doubleClickActive) {
      if (doubleClickTimeout) clearTimeout(doubleClickTimeout)
      const timeout = setTimeout(() => {
        setDoubleClickActive(false)
      }, 30000)
      setDoubleClickTimeout(timeout)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line
  }, [doubleClickActive])

  return (
    <div className="game-layout">
      <aside className="powerups-sidebar">
        <h2>Powerups</h2>
        <button
          className="upgrade-btn"
          onClick={() => {
            if (score >= autoClickerCost) {
              setScore(score - autoClickerCost)
              setAutoClickerLevel(autoClickerLevel + 1)
            }
          }}
          disabled={score < autoClickerCost}
        >
          Auto Clicker (+1/sec) - Cost: {autoClickerCost}
        </button>
        <div>Auto Clicker Level: {autoClickerLevel}</div>
        <button
          className="upgrade-btn"
          onClick={() => {
            if (!doubleClickActive && score >= doubleClickCost) {
              setScore(score - doubleClickCost)
              setDoubleClickActive(true)
            }
          }}
          disabled={doubleClickActive || score < doubleClickCost}
        >
          Double Click Points (30s) - Cost: {doubleClickCost}
        </button>
        <div>
          Double Click: {doubleClickActive ? <span style={{ color: '#ff9800' }}>Active</span> : 'Inactive'}
        </div>
      </aside>
      <main className="clicker-main">
        <h1>Clicker Game</h1>
        <div className="score">Score: {score}</div>
        <button
          className="click-btn"
          onClick={() => setScore(score + (doubleClickActive ? pointsPerClick * 2 : pointsPerClick))}
        >
          Click Me! (+{doubleClickActive ? pointsPerClick * 2 : pointsPerClick})
        </button>
        <div className="upgrade-section">
          <button
            className="upgrade-btn"
            onClick={() => {
              if (score >= upgradeCost) {
                setScore(score - upgradeCost)
                setUpgradeLevel(upgradeLevel + 1)
                setPointsPerClick(pointsPerClick + 1)
              }
            }}
            disabled={score < upgradeCost}
          >
            Upgrade (+1/click) - Cost: {upgradeCost}
          </button>
          <div>Upgrade Level: {upgradeLevel}</div>
        </div>
      </main>
    </div>
  )
}

export default App

