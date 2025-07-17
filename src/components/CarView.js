// const vin = '1HGCM82633A004352';
// fetch(
//   `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`
// )
//   .then(response => response.json())
//   .then(data => {
//     const result = data.Results[0];
//     let makeTitleCase = result.Make.charAt(0).toUpperCase() + result.Make.slice(1).toLowerCase();
//     console.log(
//       result.ModelYear,
//       makeTitleCase,
//       result.Model,
//       result.Trim
//     );
//   })
//   .catch(error => console.error('Error fetching VIN data:', error));


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
