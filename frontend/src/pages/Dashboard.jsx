import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getWeights } from "../services/api";
import Navbar from "../components/Navbar";
import WeightForm from "../components/WeightForm";

export default function Dashboard({ onLogout }) {
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeights();
      setWeights(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      if (err.message.includes("Session expired")) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar onLogout={onLogout} />
      <div className="dashboard">
        <WeightForm refresh={loadData} />

        {loading && (
          <div className="text-center p-6">Loading weight records...</div>
        )}
        {error && !loading && (
          <div className="text-center p-6 text-red-500">{error}</div>
        )}

        {!loading && !error && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight</th>
                  <th>Added On</th>
                  <th>Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {weights.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No weight records yet
                    </td>
                  </tr>
                ) : (
                  weights.map((w) => (
                    <tr key={w.id}>
                      <td>{new Date(w.date).toLocaleDateString()}</td>
                      <td>{w.weight} kg</td>
                      <td>{new Date(w.createdAt).toLocaleDateString()}</td>
                      <td
                        className={
                          w.gainLoss > 0 ? "gain" : w.gainLoss < 0 ? "loss" : ""
                        }
                      >
                        {w.gainLoss !== null
                          ? `${w.gainLoss > 0 ? "+" : ""}${w.gainLoss} kg`
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
