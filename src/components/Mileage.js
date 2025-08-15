import './Mileage.css';
import './table.css';
import { useState, useEffect } from "react";

//TODO: Set up calculateMonthlyAverages
//TODO: Set up a table builder function to avoid code duplication
//TODO: Use new table function to build the two tables
//TODO: Because modern web design is all about making things harder than they need to be, make two table one and be able to select which one to show

function Mileage({ selectedCar }) {
  const [monthlyAverages, setMonthlyAverages] = useState({});
  const [rawAverages, setRawAverages] = useState([]);

  useEffect(() => {

    fetch(`http://127.0.0.1:3031/mileage?carID=${selectedCar}`)
      .then(res => res.json())
      .then(data => {
        setRawAverages(calculateRawAverages(data));
        setMonthlyAverages(calculateMonthlyAverages(data));
      })
      .catch(err => console.error("Fetch error:", err));
  }, [selectedCar]);

  function calculateRawAverages(data) {
    return data.slice(1).map((entry, i) => {
      const mileageDiff = entry.odometerReading - data[i].odometerReading;
      const daysDiff = (new Date(entry.readingDate) - new Date(data[i].readingDate)) / 86400000;
      return {
        diff: mileageDiff,
        date: entry.readingDate,
        dayDiff: daysDiff,
        average: Number((mileageDiff / daysDiff).toFixed(2))
      };
    });
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  // Calculate overall average miles per day
  const overallAverage = rawAverages.length
    ? (rawAverages.reduce((acc, curr) => acc + curr.average, 0) / rawAverages.length).toFixed(2)
    : "N/A";

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Reading Date</th>
            <th>Mileage Difference</th>
            <th>Average Miles per Day</th>
          </tr>
        </thead>
        <tbody>
          {[...rawAverages]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((mileage, index) => (
              <tr key={index}>
                <td>{formatDate(mileage.date)}</td>
                <td>{mileage.diff}</td>
                <td>{mileage.average}</td>
              </tr>
            ))}
          <tr>
            <td colSpan="2" style={{ textAlign: 'right' }}>Average miles per day</td>
            <td>{overallAverage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Mileage;