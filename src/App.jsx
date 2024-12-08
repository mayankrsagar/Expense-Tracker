import { ExpenseProvider } from './components/Context/ExpenseProvider';
import Home from './pages/Home/Home';

function App() {

  return (
    <>
<ExpenseProvider>
  
  <Home />
 
      
      </ExpenseProvider>
    </>
  )
}

export default App
