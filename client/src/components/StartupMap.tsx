/** Atlas Field Notes design contract: the map is the document, while marker seals remain stable and tactile at every zoom. */
import { useEffect, useMemo, useState } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { faviconUrl, getInitials, type Startup } from "@/lib/startup-types";

const COIMBATORE: [number, number] = [11.0168, 76.9558];

type StartupMapProps = {
  startups: Startup[];
  selected: Startup | null;
  onSelect: (startup: Startup) => void;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

function markerIcon(startup: Startup, selected: boolean, compact: boolean) {
  const favicon = faviconUrl(startup.website);
  const fallback = escapeHtml(getInitials(startup.name));
  const title = escapeHtml(startup.name);
  return divIcon({
    className: "startup-marker-shell",
    iconSize: compact ? [32, 32] : [42, 42],
    iconAnchor: compact ? [16, 16] : [21, 21],
    html: `<span class="startup-pin ${selected ? "is-selected" : ""} ${compact ? "is-compact" : ""}" title="${title}"><img src="${favicon}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><b style="display:none">${fallback}</b></span>`,
  });
}

const clusterIcon = (cluster: { getChildCount: () => number }) => {
  const count = cluster.getChildCount();
  return divIcon({
    className: "atlas-cluster-shell",
    iconSize: [52, 52],
    iconAnchor: [26, 26],
    html: `<span class="atlas-cluster"><b>${count}</b><em>startups</em></span>`,
  });
};

function MapNavigator({ selected }: { selected: Startup | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selected) return;
    map.flyTo([selected.displayLat, selected.displayLng], Math.max(map.getZoom(), 14), {
      animate: true,
      duration: 0.7,
    });
  }, [map, selected]);
  return null;
}

function ZoomWatcher({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const map = useMapEvents({
    zoomend: () => onZoomChange(map.getZoom()),
  });
  return null;
}

export function StartupMap({ startups, selected, onSelect }: StartupMapProps) {
  const [zoom, setZoom] = useState(15);
  const compact = zoom < 14;
  const markerLayer = useMemo(
    () =>
      startups.map((startup) => (
        <Marker
          key={startup.id}
          position={[startup.displayLat, startup.displayLng]}
          icon={markerIcon(startup, selected?.id === startup.id, compact)}
          eventHandlers={{ click: () => onSelect(startup) }}
          keyboard
          title={startup.name}
        />
      )),
    [compact, onSelect, selected?.id, startups],
  );

  return (
    <MapContainer center={COIMBATORE} zoom={15} zoomControl={false} minZoom={10} maxZoom={18} className="startup-map" aria-label="Interactive map of Coimbatore startups">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="bottomright" />
      <ZoomWatcher onZoomChange={setZoom} />
      <MapNavigator selected={selected} />
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={52}
        disableClusteringAtZoom={14}
        spiderfyOnMaxZoom
        showCoverageOnHover={false}
        iconCreateFunction={clusterIcon}
      >
        {markerLayer}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
