import './app.css';
import { useState } from 'react';
import CarView from './components/CarView';
import Mileage from './components/Mileage';
import Service from './components/Service';

function App() {
  const [activeComponent, setActiveComponent] = useState('carView');
  const [selectedCar, setSelectedCar] = useState('car1');

  let content;
  if (activeComponent === 'carView') content = <CarView selectedCar={selectedCar}/>;
  else if (activeComponent === 'mileage') content = <Mileage selectedCar={selectedCar} />;
  else if (activeComponent === 'service') content = <Service selectedCar={selectedCar}/>;

  return (
    <div className="app">
      <div className="center-box">
        <div className='taskbar'>
          <select onChange={(e) => setSelectedCar(e.target.value)} value={selectedCar}>
            <option value="car1">Car 1</option>
            <option value="car2">Car 2</option>
            <option value="car3">Car 3</option>
            <option value="addNew">Add New</option>
          </select>
          <button onClick={() => setActiveComponent('carView')}>Car View</button>
          <button onClick={() => setActiveComponent('mileage')}>Mileage</button>
          <button onClick={() => setActiveComponent('service')}>Service</button>
        </div>
        {content}
      </div>
    </div>
  );
}


export default App;