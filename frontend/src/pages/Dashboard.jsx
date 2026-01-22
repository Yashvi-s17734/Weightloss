import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getWeights } from "../services/api";
import Navbar from "../components/Navbar";
import WeightForm from "../components/WeightForm";

export default function Dashboard({ onLogout }) {
  const [weights, setWeights] = useState([]);

  const loadData = async () => {
    try {
      setWeights(await getWeights());
    } catch (err) {
      alert(err.message);
      onLogout();
    }
  };

  return (
    <>
      <Navbar onLogout={onLogout} />
      <div className="dashboard">
        <WeightForm refresh={loadData} />

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
              {weights.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No weight records yet
                  </td>
                </tr>
              )}

              {weights.map((w) => (
                <tr key={w.id}>
                  <td>{new Date(w.date).toLocaleDateString()}</td>
                  <td>{w.weight} kg</td>
                  <td>{new Date(w.createdAt).toLocaleDateString()}</td>
                  <td className={w.gainLoss > 0 ? "gain" : "loss"}>
                    {w.gainLoss ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
