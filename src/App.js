import './App.scss'
import { Typography, Alert } from "antd";
import CurrencyCard from './components/currency-card.component';
import { useSelector } from 'react-redux';
import { selectError } from './store/currency/currency.selector';

function App() {
  const error = useSelector(selectError)
  const { Title } = Typography
  return (
    <div className="currency-container">
      <div className="currency-app">
        {
          error
          &&
          <Alert
            message="Something Went Wrong"
            showIcon
            description="Please check your Internet Connection then try again"
            type="error"
          />
        }
        <div className="currency-box">
          <Title className="currency-title" level={2}>Currency Converter</Title>
          <CurrencyCard />
        </div>
      </div>
    </div>
  );
}

export default App;
