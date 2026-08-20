/** Atlas Field Notes design contract: company marks are compact cartographic seals with a verified favicon fallback. */
import { useState } from "react";
import { faviconUrl, getInitials, type Startup } from "@/lib/startup-types";

type LogoMarkProps = {
  startup: Startup;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
};

export function LogoMark({ startup, size = "md", selected = false }: LogoMarkProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={`company-mark company-mark--${size} ${selected ? "company-mark--selected" : ""}`} aria-hidden="true">
      {!failed && startup.website ? (
        <img src={faviconUrl(startup.website)} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="company-mark__monogram">{getInitials(startup.name)}</span>
      )}
    </span>
  );
}
