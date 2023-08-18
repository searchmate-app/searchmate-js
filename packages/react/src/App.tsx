import { useEffect, useState } from 'react'
import './App.css'
import { Search } from './components'

function App() {
  const [open, setOpen] = useState(false)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <h3>This will be my app because u know</h3>
      <Search onOpenChange={setOpen} isOpen={open} onResultSelect={(result) => {
        console.log(result)
      }} appId='c0a59e72-b8cc-4142-9149-9981df4943a3' />
    </>
  )
}

export default App
