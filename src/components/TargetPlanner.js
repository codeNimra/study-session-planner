import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const defaultTargets = {
  daily: 2,
  weekly: 10,
  monthly: 40
};

export default function TargetPlanner() {
  const [targets, setTargets] = useState(() => {
    const saved = localStorage.getItem("pocketstudy:targets");
    return saved ? JSON.parse(saved) : defaultTargets;
  });

  useEffect(() => {
    localStorage.setItem("pocketstudy:targets", JSON.stringify(targets));
  }, [targets]);

  const data = {
    labels: ["Daily", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Target sessions",
        data: [targets.daily, targets.weekly, targets.monthly],
        backgroundColor: ["#6c63ff", "#8b5cf6", "#a78bfa"]
      }
    ]
  };

  return (
    <div>
      <h3>Targets</h3>
      <div className="target-list">
        <div className="target-item">
          <div>Daily</div>
          <input type="number" min="0" value={targets.daily} onChange={(e) => setTargets({...targets, daily: Number(e.target.value)})} />
        </div>
        <div className="target-item">
          <div>Weekly</div>
          <input type="number" min="0" value={targets.weekly} onChange={(e) => setTargets({...targets, weekly: Number(e.target.value)})} />
        </div>
        <div className="target-item">
          <div>Monthly</div>
          <input type="number" min="0" value={targets.monthly} onChange={(e) => setTargets({...targets, monthly: Number(e.target.value)})} />
        </div>
      </div>

      <div style={{marginTop:12}}>
        <Bar data={data} options={{responsive:true, plugins:{legend:{display:false}}}} />
      </div>
    </div>
  );
}