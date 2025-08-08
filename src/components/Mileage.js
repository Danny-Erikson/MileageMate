import './Mileage.css';
import './table.css';
import { useState, useEffect } from "react";

function Mileage(selectedCar) {
  const [mileages, setMileages] = useState([]);
  const [mileageDiffs, setMileageDiffs] = useState([]);

  useEffect(() => {
    // Fetch your mileage data from backend
    fetch(`http://127.0.0.1:3031/mileage?carID=${selectedCar.selectedCar}`)
      .then(res => res.json())
      .then(data => {
        setMileages(data);

        // Build the "temporary JSON doc" of differences
        const diffs = data.slice(1).map((entry, i) => {
        const mileageDiff = entry.odometerReading - data[i].odometerReading;
        const daysDiff = (new Date(entry.readingDate) - new Date(data[i].readingDate)) / 86400000; // ms to days
        return {
          diff: mileageDiff,
          date: entry.readingDate,
          dayDiff: daysDiff,
          average: Number((mileageDiff / daysDiff).toFixed(2))
        };
      });

        setMileageDiffs(diffs);
      });
  }, [selectedCar]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Reading Date</th>
            <th>Mileage Difference</th>
            <th>Avgerge Miles per Day</th>
          </tr>
        </thead>
        <tbody>
          {[...mileageDiffs]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((mileage, index) => (
              <tr key={index}>
                <td>{formatDate(mileage.date)}</td>
                <td>{mileage.diff}</td>
                <td>{mileage.average}</td>
              </tr>
            ))}
          <tr>
            <td colSpan="2" style={{ textAlign: 'right' }}>{`Avgerge miles per day`}</td>
            <td>{(mileageDiffs.reduce((acc, curr) => acc + curr.average, 0) / mileageDiffs.length).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Mileage;