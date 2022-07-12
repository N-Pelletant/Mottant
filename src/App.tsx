import { Header } from './Components'
import classes from './App.module.css'
import { Game } from './pages'

const App = () => {
  return (
    <div className={classes.app}>
      <Header />
      <Game />
      {/* 
      <Informations />
      <Statistics />
      <Settings /> 
      */}
    </div>
  )
}

export default App
