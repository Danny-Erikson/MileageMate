


//INSERT INTO ReoccurringServices
//VALUES (oil change, coolant, air filter);

//This needs to be handled when the car is created as we need to know the carID

function CarView({ selectedCar }) {
  return (
    <div>
      <h1>Car View</h1>
      <p>Selected Car: {selectedCar}</p>
    </div>
  );
}

export default CarView;
