import React, { useState } from 'react';
import './AddNewCar.css';

function AddNewCar() {
  const [ownerName, setOwnerName] = useState('');
  const [VIN, setVIN] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');
  const [image, setImage] = useState(null);

  const nhtsaReachOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${VIN}?format=json`);
      const data = await response.json();
      const result = data.Results[0];
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
      <form className="add-new-car-form">
        <div className='form-row'>
        <label>VIN Number: </label>
        <input
          type="text"
          placeholder="Vin Number"
          value={VIN}
          onChange={(e) => setVIN(e.target.value)}/>
        </div>
        <div className='form-row'>
        <label>License Plate: </label>
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}/>
        </div>
        <div className='form-row'>
        <label>Year: </label>
        <input
          type="text"
          placeholder="Model Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}/>
        </div>
        <div className='form-row'>
        <label>Make: </label>
        <input
          type="text"
          placeholder="Make (Brand)"
          value={make}
          onChange={(e) => setMake(e.target.value)}/>
        </div>
        <div className='form-row'>
        <label>Model: </label>
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}/>
        </div>
        <div className='form-row'>
        <label>Trim: </label>
        <input
          type="text"
          placeholder="Tirm"
          value={trim}
          onChange={(e) => setTrim(e.target.value)}/>
        </div>
        <button onClick={nhtsaReachOut} className="fetch-button">Get Year, Make, Model, Tirm Data Via VIN</button>
        <div className='form-row'>
          <label>Owner Name: </label>
          <select value={ownerName} onChange={(e) => setOwnerName(e.target.value)}>
            <option value="">Select Owner</option>
            <option value="danny">Danny Erikson</option>
            <option value="angie">Angie Juares</option>
            <option value="mom">Mom</option>
          </select>
        </div>
        <div className='form-row'>
          <label>Upload Image:</label>
            <input
              type="file"
              id="carImage"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
        </div>
        <div className='form-row'>
          {image && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Car Preview"
                  style={{ width: '200px', borderRadius: '10px' }}
                />
              </div>
            )}
        </div>
        <div className='bottom-row'> 
          <button className="submit-button">Submit</button> {/* FIXME: this is still broken */}
        </div>
      </form>
    </div>
  );
}

export default AddNewCar;
