import { useState } from "react";
import {
  COMPONENT_MODULES, FRAMEWORKS, DATA_STORE_STRATEGIES,
  SCALE_TIERS, CLOUD_TARGETS, ARCHITECTURE_STYLES,
} from "../constant";
import {
  FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText,
} from "@mui/material";
import toast from "../utils/toast";

export default function InputData({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState("");
  const [filters, setFilters] = useState({
    architectureStyle: '',
    cloudTarget: '',
    scaleTier: '',
    dataStoreType: '',
    framework: '',
    components: [],
  });

  const handleSubmit = () => {
    if (!prompt.trim()) {
        toast.error("Please enter a Prompt describing your system.");
    
      return; // parent/toast can handle validation messaging
    }

    onGenerate({
      prompt,
      architectureStyle: filters.architectureStyle,
      cloudTarget: filters.cloudTarget,
      scaleTier: filters.scaleTier,
      dataStoreStrategy: filters.dataStoreType,
      languageFramework: filters.framework,
      componentModules: filters.components,
    });
  };

  return (
    <div className="row g-3">
      <div className="col-12">
        <label className="form-label">Describe your system</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Design an e-commerce app where users browse products, add to cart, place orders, and make payments."
          className="neu-inset input-field InputDataClass"
          rows={3}
          style={{ width: '100%', resize: 'vertical' }}
        />
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label">Architecture Style</label>
        <select
          value={filters.architectureStyle}
          onChange={(e) => setFilters((p) => ({ ...p, architectureStyle: e.target.value }))}
          className="neu-inset input-field InputDataClass"
        >
          <option value="" disabled>Select...</option>
          {ARCHITECTURE_STYLES.map((opt) => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label">Cloud Target</label>
        <select
          value={filters.cloudTarget}
          onChange={(e) => setFilters((p) => ({ ...p, cloudTarget: e.target.value }))}
          className="neu-inset input-field InputDataClass"
        >
          <option value="" disabled>Select...</option>
          {CLOUD_TARGETS.map((opt) => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label">Scale Tier</label>
        <select
          value={filters.scaleTier}
          onChange={(e) => setFilters((p) => ({ ...p, scaleTier: e.target.value }))}
          className="neu-inset input-field InputDataClass"
        >
          <option value="" disabled>Select...</option>
          {SCALE_TIERS.map((opt) => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label">Data Store Type</label>
        <select
          value={filters.dataStoreType}
          onChange={(e) => setFilters((p) => ({ ...p, dataStoreType: e.target.value }))}
          className="neu-inset input-field InputDataClass"
        >
          <option value="" disabled>Select...</option>
          {DATA_STORE_STRATEGIES.map((opt) => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label">Language/Framework</label>
        <select
          value={filters.framework}
          onChange={(e) => setFilters((p) => ({ ...p, framework: e.target.value }))}
          className="neu-inset input-field InputDataClass"
        >
          <option value="" disabled>Select...</option>
          {FRAMEWORKS.map((opt) => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>

<div className="col-12 col-md-4" style={{ minWidth: 0 }}>
  <FormControl fullWidth sx={{ minWidth: 0 }}>
    <InputLabel>Components</InputLabel>
    <Select multiple value={filters.components}  onChange={(e) => {
        const value = e.target.value;
        if (value.includes("__ALL__")) {
          const allSelected =
            filters.components.length === COMPONENT_MODULES.length;
          setFilters((p) => ({...p,components: allSelected ? [] : COMPONENT_MODULES.map((opt) => opt.label),}));
          return;
        }
        setFilters((p) => ({...p, components: value, }));
      }}
      renderValue={(selected) => selected.length === 0 ? "Select components" : `${selected.length} component${selected.length > 1 ? "s" : ""} selected`
      }
      label="Components"
      sx={{ width: "100%", minWidth: 0,}}
    >
      <MenuItem value="__ALL__">
        <Checkbox checked={ filters.components.length === COMPONENT_MODULES.length }
          indeterminate={ filters.components.length > 0 && filters.components.length < COMPONENT_MODULES.length }
        />

        <ListItemText
          primary={ filters.components.length === COMPONENT_MODULES.length ? "Deselect All" : "Select All" }
        />
      </MenuItem>

      {COMPONENT_MODULES.map((opt) => (
        <MenuItem key={opt.label} value={opt.label}>
          <Checkbox checked={filters.components.includes(opt.label)} />
          <ListItemText primary={opt.label} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>
      

      <div className="col-12">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="neu-primary-btn"
          style={{ padding: '0.75rem 1.5rem' }}
        >
          {loading ? 'Generating...' : 'Generate Architecture'}
        </button>
      </div>
    </div>
  );
}