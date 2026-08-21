/** Atlas Field Notes design contract: a map-first Coimbatore startup atlas with reference-aligned top controls and warm cartographic detail. */
import { useEffect, useMemo, useState } from "react";
import { Grid2X2, Map, Search, Send, SlidersHorizontal } from "lucide-react";
import startupsData from "@/data/startups.json";
import { LogoMark } from "@/components/LogoMark";
import { StartupDetailPanel } from "@/components/StartupDetailPanel";
import { StartupMap } from "@/components/StartupMap";
import type { Startup } from "@/lib/startup-types";

const startups = startupsData as unknown as Startup[];
const unique = (values: string[]) => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));

export default function Home() {
  const [query, setQuery] = useState("");
  const [entityType, setEntityType] = useState("all");
  const [stage, setStage] = useState("all");
  const [sector, setSector] = useState("all");
  const [area, setArea] = useState("all");
  const [selected, setSelected] = useState<Startup | null>(null);
  const [view, setView] = useState<"map" | "grid">("map");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const stages = useMemo(() => unique(startups.map((item) => item.stage)), []);
  const sectors = useMemo(() => unique(startups.map((item) => item.sector)), []);
  const areas = useMemo(() => unique(startups.map((item) => item.area)), []);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return startups.filter((item) => {
      const haystack = [item.name, item.description, item.sector, item.subsector, item.tags.join(" "), item.website, item.founders].join(" ").toLowerCase();
      return (
        entityType !== "vcs" &&
        (!normalizedQuery || haystack.includes(normalizedQuery)) &&
        (stage === "all" || item.stage === stage) &&
        (sector === "all" || item.sector === sector) &&
        (area === "all" || item.area === area)
      );
    });
  }, [area, entityType, query, sector, stage]);

  useEffect(() => {
    if (selected && !filtered.some((item) => item.id === selected.id)) setSelected(null);
  }, [filtered, selected]);

  const activeFilters = [entityType, stage, sector, area].filter((value) => value !== "all").length + (query ? 1 : 0);
  const verifiedMapCount = startups.filter((item) => item.coordinateQuality === "place_verified").length;
  const resetFilters = () => { setQuery(""); setEntityType("all"); setStage("all"); setSector("all"); setArea("all"); };

  return (
    <main className="atlas-shell">
      <StartupMap startups={filtered} selected={selected} onSelect={setSelected} />

      <header className="atlas-header">
        <a className="brand-lockup" href="#top" aria-label="Coimbatore Startup Map home"><span className="brand-seal" aria-hidden="true"><i /></span><span><b>Coimbatore</b><em>Startup Map</em></span></a>
        <div className="control-strip" aria-label="Search and filters">
          <label className="top-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search startups, sectors, founders…" /></label>
          <select value={entityType} onChange={(event) => setEntityType(event.target.value)} aria-label="Startup type"><option value="all">All types</option><option value="startups">Startups</option><option value="vcs">VCs</option></select>
          <select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Area"><option value="all">All areas</option>{areas.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={stage} onChange={(event) => setStage(event.target.value)} aria-label="Stage"><option value="all">All stages</option>{stages.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={sector} onChange={(event) => setSector(event.target.value)} aria-label="Sector"><option value="all">All sectors</option>{sectors.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <button className={`mobile-filter-button ${mobileFiltersOpen ? "is-active" : ""}`} onClick={() => setMobileFiltersOpen((open) => !open)} aria-expanded={mobileFiltersOpen} aria-label="Open filters"><SlidersHorizontal size={14} /></button>
          <div className="view-toggle" aria-label="Directory view"><button className={view === "map" ? "is-active" : ""} onClick={() => setView("map")}><Map size={14} />Map</button><button className={view === "grid" ? "is-active" : ""} onClick={() => setView("grid")}><Grid2X2 size={14} />Grid</button></div>
          <a className="submit-button" href="mailto:hello@example.com?subject=Coimbatore%20Startup%20Map%20submission"><Send size={13} />Submit</a>
        </div>
      </header>

      {mobileFiltersOpen && <section className="mobile-filter-drawer" aria-label="Startup filters"><label className="mobile-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search startups, sectors, founders…" /></label><div className="mobile-filter-row"><select value={entityType} onChange={(event) => setEntityType(event.target.value)} aria-label="Startup type"><option value="all">All types</option><option value="startups">Startups</option><option value="vcs">VCs</option></select><select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Area"><option value="all">All areas</option>{areas.map((value) => <option key={value} value={value}>{value}</option>)}</select></div><div className="mobile-filter-row"><select value={stage} onChange={(event) => setStage(event.target.value)} aria-label="Stage"><option value="all">All stages</option>{stages.map((value) => <option key={value} value={value}>{value}</option>)}</select><select value={sector} onChange={(event) => setSector(event.target.value)} aria-label="Sector"><option value="all">All sectors</option>{sectors.map((value) => <option key={value} value={value}>{value}</option>)}</select></div><button onClick={() => { resetFilters(); setMobileFiltersOpen(false); }}>Clear all filters</button></section>}

      <section className="result-strip" aria-live="polite"><span className="result-strip__count">{filtered.length} <em>results</em></span>{activeFilters > 0 ? <button onClick={resetFilters}>Clear filters</button> : <span className="result-strip__hint">{verifiedMapCount} verified street pins · {startups.length - verifiedMapCount} directory-only</span>}</section>

      {filtered.length > 0 && !selected && view === "map" && <section className="startup-rail" aria-label="Visible startup results">{filtered.slice(0, 4).map((startup) => <button key={startup.id} onClick={() => setSelected(startup)}><LogoMark startup={startup} size="sm" /><span><b>{startup.name}</b><em>{startup.stage}</em></span></button>)}{filtered.length > 4 && <span className="rail-more">+{filtered.length - 4} more</span>}</section>}

      {view === "grid" && filtered.length > 0 && <section className="directory-grid" aria-label="Startup grid directory"><div className="directory-grid__head"><div><span className="eyebrow">Directory</span><h2>All startups in this field</h2></div><button onClick={() => setView("map")}><Map size={14} />Return to map</button></div><div className="directory-grid__list">{filtered.map((startup) => <button key={startup.id} onClick={() => { setSelected(startup); setView("map"); }}><LogoMark startup={startup} size="md" /><span><b>{startup.name}</b><em>{startup.stage} · {startup.sector}</em><small>{startup.description}</small></span></button>)}</div></section>}

      {selected && <StartupDetailPanel startup={selected} onClose={() => setSelected(null)} />}
      {filtered.length === 0 && <section className="empty-field"><span className="eyebrow">No records in this field</span><h2>Try widening the search.</h2><p>Clear a filter or search another sector to bring the map back into focus.</p><button onClick={resetFilters}>Reset all filters</button></section>}
      <footer className="atlas-attribution"><SlidersHorizontal size={13} /> Public startup data, visualized with care · <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO Voyager</a></footer>
    </main>
  );
}
