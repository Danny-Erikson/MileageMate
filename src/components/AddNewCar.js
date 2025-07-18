import React, { useState } from 'react';

function AddNewCar() {
  const [ownerName, setOwnerName] = useState('');
  const [mechanicName, setMechanicName] = useState('');
  const [VIN, setVIN] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');
  const [image, setImage] = useState(null);

  // angie vin: 3n1cn7ap7h831452
  // danny vin: 1hgcm82633a004352
  const nhtsaReachOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${VIN}?format=json`);
      const data = await response.json();
      const result = data.Results[0];
      console.log(result);
      setYear(result.ModelYear || '');
      setMake(result.Make ? result.Make.charAt(0).toUpperCase() + result.Make.slice(1).toLowerCase() : '');
      setModel(result.Model || '');
      setTrim(result.Trim || '');
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again later.');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Add New Car</h1>

      <form onSubmit={nhtsaReachOut} style={{ textAlign: 'center', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter VIN"
          value={VIN}
          onChange={(e) => setVIN(e.target.value)}
          style={{ fontSize: '18px', padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '18px' }}>
          Test VIN
        </button>
      </form>

      {year || make || model || trim ? (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Fetched Data:</h3>
          <p><strong>Year:</strong> {year}</p>
          <p><strong>Make:</strong> {make}</p>
          <p><strong>Model:</strong> {model}</p>
          <p><strong>Trim:</strong> {trim}</p>
        </div>
      ) : null}
    </div>
  );
}

export default AddNewCar;
