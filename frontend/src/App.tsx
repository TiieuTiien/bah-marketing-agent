import './App.css'
import Header from './components/common/Header/Header'
import Sidebar from './components/common/Sidebar/Sidebar'

function App() {

  return (
    <>
      <Header />
      <div className="content-container">
        <Sidebar />
      </div>
    </>
  )
}

export default App
