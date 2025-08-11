import React, { useEffect, useState } from 'react';

const ShoesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this with your actual script URL and API key
  const API_URL = "https://script.google.com/macros/s/AKfycbwv4oYz0GbAUOwo1T6IHWzc_DAxo0BFKwswcigSnJU8rw1tMh0VBa2NJnJ7Yg_SUaHvqA/exec?key=your-secret-key";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Google Sheet Data</h2>
      <table className="w-full border border-collapse">
        <thead>
          <tr>
            {data[0] && Object.keys(data[0]).map((key) => (
              <th key={key} className="border px-3 py-2 bg-gray-100">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j} className="border px-3 py-2">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoesData;
