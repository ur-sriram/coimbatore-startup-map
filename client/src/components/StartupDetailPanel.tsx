/** Atlas Field Notes design contract: the selected company is presented as a concise field dossier, never a generic modal. */
import { CalendarDays, ExternalLink, Landmark, MapPin, Users, X } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { formatFunding, type Startup } from "@/lib/startup-types";

type StartupDetailPanelProps = {
  startup: Startup;
  onClose: () => void;
};

function Datum({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  if (!value || value === "Not listed") return null;
  return (
    <div className="dossier-datum">
      <div className="dossier-datum__label">{icon}{label}</div>
      <div className="dossier-datum__value">{value}</div>
    </div>
  );
}

export function StartupDetailPanel({ startup, onClose }: StartupDetailPanelProps) {
  const hasVerifiedLocation = startup.coordinateQuality === "place_verified" && Boolean(startup.verifiedAddress);
  const location = hasVerifiedLocation ? startup.verifiedAddress! : startup.location;
  return (
    <aside className="startup-dossier" aria-label={`${startup.name} details`}>
      <div className="dossier-topline">
        <span>Startup dossier</span>
        <button className="icon-button" onClick={onClose} aria-label="Close company details"><X size={18} /></button>
      </div>
      <div className="dossier-identity">
        <LogoMark startup={startup} size="lg" selected />
        <div>
          <div className="stage-label">{startup.stage}</div>
          <h2>{startup.name}</h2>
          <p>{startup.sector}{startup.subsector ? ` · ${startup.subsector}` : ""}</p>
        </div>
      </div>
      <p className="dossier-description">{startup.description}</p>
      <div className="dossier-actions">
        {startup.website && <a className="primary-action" href={startup.website} target="_blank" rel="noreferrer">Visit website <ExternalLink size={15} /></a>}
        {startup.sourceUrl && <a className="quiet-action" href={startup.sourceUrl} target="_blank" rel="noreferrer">Research sources <ExternalLink size={14} /></a>}
      </div>
      <div className="dossier-grid">
        <Datum label={hasVerifiedLocation ? "Verified street location" : "City"} value={location} icon={<MapPin size={13} />} />
        <Datum label="Founded" value={startup.foundedYear} icon={<CalendarDays size={13} />} />
        <Datum label="Team size" value={startup.teamSize} icon={<Users size={13} />} />
        <Datum label="Funding" value={formatFunding(startup.fundingUsd)} icon={<Landmark size={13} />} />
      </div>
      {(startup.founders || startup.investors) && (
        <div className="dossier-notes">
          {startup.founders && <Datum label="Founders" value={startup.founders} />}
          {startup.investors && <Datum label="Investors" value={startup.investors} />}
        </div>
      )}
      <div className="coordinate-note">
        <span className="coordinate-note__dot" />
        {hasVerifiedLocation
          ? <>Map pin matched the company name and a documented Coimbatore street address. {startup.geocoderSource && <a href={startup.geocoderSource} target="_blank" rel="noreferrer">View verification</a>}</>
          : "No verified street-level pin is displayed for this company. It remains available in the directory."}
      </div>
    </aside>
  );
}
