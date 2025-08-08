import './CarView.css';
import carImage from './test_image.jpg';
//INSERT INTO ReoccurringServices
//VALUES (oil change, coolant, air filter);

//This needs to be handled when the car is created as we need to know the carID

function CarView({ selectedCar, carData }) {
  const car = carData.find(c => String(c.carID) === String(selectedCar));

  if (!car) return <div>No car selected or data not available.</div>;

  return (
    <div>
      <div className='car-view-header'>
        <h1>{`${car.year} ${car.make} ${car.model} `}<span>{`${car.trim || ''}`}</span></h1>
      </div>
      <div className='car-view-details'>
        <div>
          <img src={carImage || 'https://via.placeholder.com/150'} alt={`${car.make} ${car.model}`} className='car-image' />
        </div>
        <div>
          <p><strong>VIN:</strong> {car.VINNumber}</p>
          <p><strong>License Plate:</strong> {car.licensePlate}</p>
          <p><strong>Main Driver:</strong> {car.displayName || 'Unknown'}</p>
        </div>
      </div>
    </div>
  );
}

export default CarView;

