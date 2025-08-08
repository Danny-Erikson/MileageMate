import './app.css';
import { useState, useEffect} from 'react';
import LoginModal from './components/LoginModal';
import CarView from './components/CarView';
import Mileage from './components/Mileage';
import Service from './components/Service';
import AddNewCar from './components/AddNewCar';

//TODO: add car data to car view

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState('');
  const [activeComponent, setActiveComponent] = useState('carView');
  const [carData, setCarData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3031/getGroupCars?groupID=${sessionStorage.groupID}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setCarData(data);
        if (data.length > 0) {
          const match = data.find(car => String(car.ownerID) === String(sessionStorage.getItem("userID")));
          if (match) {
          setSelectedCar(match.carID);
          }
        } else {
          setSelectedCar('addNew');
        }
      } catch (err) {
        console.error('Fetch failed', err);
      }
    };
    fetchData();
  }, [showLogin]);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch("http://127.0.0.1:3031/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.username === username && data.password === password) {
        sessionStorage.setItem("userID", data.userID);
        sessionStorage.setItem("groupID", data.groupID);
        setError('');
        setShowLogin(false);
      } else {
        setError('Invalid login');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Unexpected end of JSON input')) {
        setError('Invalid Login');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  let content;
  if (selectedCar === 'addNew') content = <AddNewCar />;
  else if (activeComponent === 'carView') content = <CarView selectedCar={selectedCar} carData={carData}/>
  else if (activeComponent === 'mileage') content = <Mileage selectedCar={selectedCar} />;
  else if (activeComponent === 'service') content = <Service selectedCar={selectedCar} />;

  return (
    <div className="app">
      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onLogin={handleLogin}
          error={error}
        />
      )}
      <div className="center-box">
        <div className='taskbar'>
          <select onChange={(e) => setSelectedCar(e.target.value)} value={selectedCar || ''}>
            {carData.map(c => (
              <option key={c.carID} value={c.carID}>{`${c.year} ${c.model}`}</option>
            ))}
            <option value="addNew">Add New</option>
          </select>
          <button onClick={() => setActiveComponent('carView')} className={selectedCar === 'addNew' ? 'disabled-button' : 'taskbar-button'}>Car View</button>
          <button onClick={() => setActiveComponent('mileage')} className={selectedCar === 'addNew' ? 'disabled-button' : 'taskbar-button'}>Mileage</button>
          <button onClick={() => setActiveComponent('service')} className={selectedCar === 'addNew' ? 'disabled-button' : 'taskbar-button'}>Service</button>
          <button onClick={() => setShowLogin(true)} className='taskbar-button logout-button'>Logout</button>
        </div>
          {content}
      </div>
    </div>
  );
}

export default App;