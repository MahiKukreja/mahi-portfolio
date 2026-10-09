import { LazyMotion } from 'motion/react'
import { Home } from './pages/Home'

const loadFeatures = () => import('./motionFeatures').then((m) => m.default)

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <Home />
    </LazyMotion>
  )
}
