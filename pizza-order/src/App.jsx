import './App.css';
import './components/components.css';
import Header from './components/Header';
import StepNav from './components/StepNav';
import PizzaGrid from './components/PizzaGrid';
import SidesGrid from './components/SidesGrid';
import DrinksGrid from './components/DrinksGrid';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import CustomizeModal from './components/CustomizeModal';
import { currentStep, customizingPizza } from './stores/orderStore';

function App() {
  return (
    <div class="app">
      <Header />
      <StepNav />

      <main class="main-content">
        <div class="content-area">
          {currentStep() === 'pizzas' && <PizzaGrid />}
          {currentStep() === 'sides' && <SidesGrid />}
          {currentStep() === 'drinks' && <DrinksGrid />}
          {currentStep() === 'checkout' && <Checkout />}
        </div>
        <Cart />
      </main>

      {customizingPizza() && <CustomizeModal />}
    </div>
  );
}

export default App;
