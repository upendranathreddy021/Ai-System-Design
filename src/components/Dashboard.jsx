import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import InputData from "./InputData.jsx";
import ArchDiagram from "./diagram/ArchDiagram.jsx";
import UserService from "../services/UserService";
import { APIS } from "../constant";
import toast from "../utils/toast";
import Seo from "./Seo.jsx";

export default function Dashboard() {
  const { addToast } = useAuth();
  const [architecture, setArchitecture] = useState(null);
  const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const handleGenerate = async (payload) => {
  setLoading(true);
  setArchitecture(null);
  setError(null);

  try {
    const res = await UserService.postMethod(APIS.SYSTEM_DESIGN.GENERATE, payload, { timeout: 60000 });

    if (res?.nodes && res?.edges) {
      setArchitecture(res);
      toast.success("Architecture generated successfully");
    } else {
      setError("Received an unexpected response shape from the server.");
      toast.error("Generation succeeded but response was malformed");
    }
  } catch (err) {
    const detail = err?.response?.data?.detail || "Failed to generate architecture";
    setError(detail);
    toast.error(detail);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="dashboard-container">.
    <Seo
  title="SystemDesign.ai | Generate System Architecture Diagrams with AI"
  description="Describe your app and get an interactive architecture diagram with simulations and beginner-friendly explanations."
  path="/dashboard"
/>
      <div className="neu-raised welcome-banner">
        <InputData onGenerate={handleGenerate} loading={loading} />
      </div>

       {error && (
        <div
          className="neu-inset"
          style={{
            marginTop: '1rem', padding: '1rem 1.25rem', borderRadius: '14px',
            borderLeft: '4px solid #ef4444', color: '#b91c1c', fontSize: '0.85rem',
          }}
        >
          {error}
        </div>
      )}

      {architecture && (
        <div className="neu-raised welcome-banner" style={{ marginTop: '1.5rem' }}>
          <ArchDiagram architecture={architecture} />
        </div>
      )}
    </div>
  );
}