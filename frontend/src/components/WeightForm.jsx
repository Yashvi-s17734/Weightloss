import { useState } from "react";
import { addWeight } from "../services/api";
import Loader from "./Loader";

export default function WeightForm({ refresh }) {
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await addWeight({ date, weight, description });
      alert(res.message);
      refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="weight-card">
        <h3 className="weight-title">Add Weight</h3>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="date"
            className="auth-input"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="number"
            step="0.1"
            placeholder="Weight (kg)"
            className="auth-input"
            onChange={(e) => setWeight(e.target.value)}
          />

          <input
            placeholder="Description (optional)"
            className="auth-input"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="auth-btn" disabled={loading}>
            {loading ? "Saving..." : "Add"}
          </button>
        </form>
      </div>
    </>
  );
}
