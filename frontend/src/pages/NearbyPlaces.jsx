// src/pages/NearbyPlaces.jsx

import React, { useMemo, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useNearbyPlaces } from "../hooks/useNearbyPlaces";
import { useUser } from "../context/UserContext";
import { PLACE_TYPES } from "../utils/constants";

// ---- Fix Leaflet default marker icons for Vite ----
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).href,
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).href,
});

<<<<<<< HEAD
// Custom marker icons for different place types
const hospitalIcon = new L.Icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "hospital-marker",
});

const medicalShopIcon = new L.Icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "medical-shop-marker",
});

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
// Campus center: JNTU-GV Vizianagaram
const CAMPUS_CENTER = [18.1511, 83.3757];

// Demo markers around campus (used if DB has no places)
const DEMO_PLACES = [
  {
    id: "demo-1",
    name: "Campus Health Centre",
    type: PLACE_TYPES.HOSPITAL,
    latitude: 18.1518,
    longitude: 83.3765,
    address: "Inside JNTU-GV Campus, Vizianagaram",
    phone: "9876543210",
  },
  {
    id: "demo-2",
    name: "Sri Sai Medical & General Store",
    type: PLACE_TYPES.MEDICAL_SHOP,
    latitude: 18.1498,
    longitude: 83.3742,
    address: "Near College Main Gate, Vizianagaram",
    phone: "9876501234",
  },
  {
    id: "demo-3",
    name: "City Care Hospital",
    type: PLACE_TYPES.HOSPITAL,
    latitude: 18.1535,
    longitude: 83.3785,
    address: "NH-26, Vizianagaram",
    phone: "9876512345",
  },
];

// ---- Helpers: distance + directions ----
const toRad = (deg) => (deg * Math.PI) / 180;

const distanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const buildDirectionsUrl = (userLocation, place) => {
  if (!place.latitude || !place.longitude) return "#";

  const destination = `${place.latitude},${place.longitude}`;

  if (userLocation) {
    const origin = `${userLocation.lat},${userLocation.lng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
};

// Helper: pan map to selected place
const MapFocus = ({ place }) => {
  const map = useMap();

  useEffect(() => {
    if (!place || !place.latitude || !place.longitude) return;
    map.setView([place.latitude, place.longitude], 16, { animate: true });
  }, [place, map]);

  return null;
};

<<<<<<< HEAD
// Map Legend Component
const MapLegend = ({ isMobile }) => {
  return (
    <div style={{
      ...styles.legend,
      ...(isMobile ? styles.legendMobile : {})
    }}>
      <div style={styles.legendTitle}>Legend</div>
      <div style={styles.legendItem}>
        <span style={{ ...styles.legendDot, backgroundColor: "#3b82f6" }}>🏥</span>
        <span style={styles.legendText}>Hospital / Clinic</span>
      </div>
      <div style={styles.legendItem}>
        <span style={{ ...styles.legendDot, backgroundColor: "#22c55e" }}>💊</span>
        <span style={styles.legendText}>Medical Shop</span>
      </div>
      <div style={styles.legendItem}>
        <span style={{ ...styles.legendDot, backgroundColor: "#a5b4fc" }}>⚪</span>
        <span style={styles.legendText}>Campus Radius</span>
      </div>
    </div>
  );
};

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
const RADIUS_OPTIONS = [5, 10, 20]; // km options

// soft bg animation like AIChat
const keyframeStyles = `
  @keyframes bgGradientShift {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 0%; }
  }
<<<<<<< HEAD

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 6px 16px rgba(99,102,241,0.25); }
    50% { box-shadow: 0 8px 20px rgba(99,102,241,0.4); }
  }

  .hospital-marker img {
    filter: hue-rotate(200deg) saturate(1.5);
  }

  .medical-shop-marker img {
    filter: hue-rotate(90deg) saturate(1.5);
  }
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
`;

const NearbyPlaces = () => {
  const { studentProfile } = useUser();
  const { places, loading, error, hostel } = useNearbyPlaces();

  const [selectedId, setSelectedId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
<<<<<<< HEAD
  const [radiusKm, setRadiusKm] = useState(20); // Increased default radius to 20km

  // Responsive states
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  // Screen size detection
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
=======
  const [radiusKm, setRadiusKm] = useState(10);
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setLocationError(
          "Could not get your current location. Directions will start from 'Your location'."
        );
      }
    );
  }, []);

  const hasRealPlaces = places && places.length > 0;

<<<<<<< HEAD
  // Debug: Log backend places
  useEffect(() => {
    console.log("✅ Backend places loaded:", places?.length, places);
  }, [places]);

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  const mapPlaces = useMemo(
    () => (hasRealPlaces ? places : DEMO_PLACES),
    [hasRealPlaces, places]
  );

<<<<<<< HEAD
  // Dynamic map center: use user location if available, otherwise campus center
  const mapCenter = useMemo(() => {
    if (userLocation) {
      return [userLocation.lat, userLocation.lng];
    }
    return CAMPUS_CENTER;
  }, [userLocation]);

  const visiblePlaces = useMemo(() => {
    const [centerLat, centerLng] = mapCenter;

    return mapPlaces
      .filter((p) => {
        if (typeof p.latitude !== "number" || typeof p.longitude !== "number") {
          return false;
        }
        const d = distanceKm(centerLat, centerLng, p.latitude, p.longitude);
        return d <= radiusKm;
      })
      .map((p) => ({
        ...p,
        distanceKm: distanceKm(centerLat, centerLng, p.latitude, p.longitude),
      }));
  }, [mapPlaces, radiusKm, mapCenter]);
=======
  const visiblePlaces = useMemo(() => {
    const [centerLat, centerLng] = CAMPUS_CENTER;

    return mapPlaces.filter((p) => {
      if (typeof p.latitude !== "number" || typeof p.longitude !== "number") {
        return false;
      }
      const d = distanceKm(centerLat, centerLng, p.latitude, p.longitude);
      return d <= radiusKm;
    });
  }, [mapPlaces, radiusKm]);
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

  const hospitals = visiblePlaces.filter(
    (p) => p.type === PLACE_TYPES.HOSPITAL
  );
  const medicalShops = visiblePlaces.filter(
    (p) => p.type === PLACE_TYPES.MEDICAL_SHOP
  );

  const selectedPlace =
    visiblePlaces.find((p) => p.id === selectedId) || visiblePlaces[0] || null;

<<<<<<< HEAD
  // UNIFIED CLICK LOGIC: Select + Open Directions
  const handlePlaceClick = (place) => {
    // Use stable ID for selection (fallback if id is undefined)
    const stableId = place.id || `${place.name}-${place.latitude}-${place.longitude}`;
    setSelectedId(stableId);

=======
  const handlePlaceClick = (place) => {
    setSelectedId(place.id);
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    if (place.latitude && place.longitude) {
      const url = buildDirectionsUrl(userLocation, place);
      window.open(url, "_blank");
    }
  };

<<<<<<< HEAD
  const responsiveStyles = getResponsiveStyles(isMobile, isTablet);

  return (
    <div style={responsiveStyles.page}>
      <style>{keyframeStyles}</style>

      <div style={responsiveStyles.card}>
        <div style={responsiveStyles.layout}>
          {/* LEFT: Info block */}
          <div style={responsiveStyles.left}>
            <h2 style={responsiveStyles.heading}>Nearby Care Around Your Hostel</h2>
            <p style={responsiveStyles.tagline}>
=======
  return (
    <div style={styles.page}>
      <style>{keyframeStyles}</style>

      <div style={styles.card}>
        <div style={styles.layout}>
          {/* LEFT: Info block */}
          <div style={styles.left}>
            <h2 style={styles.heading}>Nearby Care Around Your Hostel</h2>
            <p style={styles.tagline}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
              Find hospitals and medical shops within a safe radius of your campus.
            </p>

            {studentProfile && (
<<<<<<< HEAD
              <p style={responsiveStyles.studentInfo}>
=======
              <p style={styles.studentInfo}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                <strong>{studentProfile.name}</strong> (
                {studentProfile.level} –{" "}
                {studentProfile.branch || studentProfile.department || "N/A"})
                <br />
                Hostel: <strong>{studentProfile.hostel}</strong>
              </p>
            )}

            {hostel && (
<<<<<<< HEAD
              <p style={responsiveStyles.hostelInfo}>
=======
              <p style={styles.hostelInfo}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                Showing locations around: <strong>{hostel}</strong>
              </p>
            )}

<<<<<<< HEAD
            {loading && <p style={responsiveStyles.subtle}>Syncing locations…</p>}
            {error && <p style={responsiveStyles.error}>{error}</p>}
            {locationError && <p style={responsiveStyles.subtle}>{locationError}</p>}

            {!hasRealPlaces && !loading && !error && (
              <p style={responsiveStyles.subtle}>
=======
            {loading && <p style={styles.subtle}>Syncing locations…</p>}
            {error && <p style={styles.error}>{error}</p>}
            {locationError && <p style={styles.subtle}>{locationError}</p>}

            {!hasRealPlaces && !loading && !error && (
              <p style={styles.subtle}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                No registered medical shops or hospitals found in the system for this hostel yet.
                <br />
                <strong>
                  Showing demo markers around JNTU-GV Vizianagaram campus for preview.
                </strong>
              </p>
            )}

<<<<<<< HEAD
            {/* Radius selector - Pill Style */}
            <div style={responsiveStyles.radiusSection}>
              <span style={responsiveStyles.radiusLabel}>
                Search radius (from your location):
              </span>
              <div style={responsiveStyles.radiusPills}>
                {RADIUS_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRadiusKm(r)}
                    style={{
                      ...responsiveStyles.radiusPill,
                      ...(radiusKm === r ? responsiveStyles.radiusPillActive : {}),
                    }}
                  >
                    {r} km
                  </button>
                ))}
              </div>
            </div>

            <div style={responsiveStyles.contactBlock}>
              <div style={responsiveStyles.contactRow}>
                <span>📞</span>
                <span>Campus Health Centre: 98765 43210</span>
              </div>
              <div style={responsiveStyles.contactRow}>
                <span>📧</span>
                <span>healthcenter@jntugv.ac.in</span>
              </div>
              <div style={responsiveStyles.contactRow}>
=======
            {/* Radius selector */}
            <div style={styles.radiusRow}>
              <span style={styles.radiusLabel}>Search radius (from campus):</span>
              <select
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                style={styles.radiusSelect}
              >
                {RADIUS_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r} km
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.contactBlock}>
              <div style={styles.contactRow}>
                <span>📞</span>
                <span>Campus Health Centre: 98765 43210</span>
              </div>
              <div style={styles.contactRow}>
                <span>📧</span>
                <span>healthcenter@jntugv.ac.in</span>
              </div>
              <div style={styles.contactRow}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                <span>📍</span>
                <span>JNTU-GV, Vizianagaram – 535003</span>
              </div>
            </div>

            <button
              type="button"
<<<<<<< HEAD
              style={responsiveStyles.ctaButton}
=======
              style={styles.ctaButton}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
              onClick={() => {
                const el = document.getElementById("places-list");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Nearby Options
            </button>
          </div>

<<<<<<< HEAD
          {/* RIGHT: Map with Legend */}
          <div style={responsiveStyles.right}>
            <div style={responsiveStyles.mapContainer}>
              <MapContainer
                center={mapCenter}
                zoom={isMobile ? 13 : 14}
                scrollWheelZoom={true}
                style={responsiveStyles.map}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Campus radius circle with soft medical colors */}
                <Circle
                  center={mapCenter}
                  radius={radiusKm * 1000}
                  pathOptions={{
                    color: "#6366f1",
                    weight: 2,
                    fillColor: "#a5b4fc",
                    fillOpacity: 0.18,
                  }}
                />

                {userLocation && (
                  <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {visiblePlaces
                  .filter(
                    (p) =>
                      typeof p.latitude === "number" &&
                      typeof p.longitude === "number"
                  )
                  .map((place) => {
                    const distanceText = `${place.distanceKm.toFixed(1)} km from your location`;
                    const stableId = place.id || `${place.name}-${place.latitude}-${place.longitude}`;

                    const icon = place.type === PLACE_TYPES.HOSPITAL 
                      ? hospitalIcon 
                      : medicalShopIcon;

                    return (
                      <Marker
                        key={stableId}
                        position={[place.latitude, place.longitude]}
                        icon={icon}
                        eventHandlers={{
                          click: () => handlePlaceClick(place),
                        }}
                      >
                        <Popup>
                          <strong>{place.name}</strong>
                          <br />
                          {place.type === PLACE_TYPES.HOSPITAL
                            ? "🏥 Hospital / Clinic"
                            : "💊 Medical Shop"}
                          {place.address && (
                            <>
                              <br />
                              {place.address}
                            </>
                          )}
                          {distanceText && (
                            <>
                              <br />
                              📏 {distanceText}
                            </>
                          )}
                          {place.phone && (
                            <>
                              <br />
                              📞 {place.phone}
                            </>
                          )}
                          <br />
                          <em style={{ color: "#6366f1", fontSize: "0.85rem" }}>
                            Opening directions…
                          </em>
                        </Popup>
                      </Marker>
                    );
                  })}

                <MapFocus place={selectedPlace} />
              </MapContainer>
              
              {/* Legend overlay */}
              <MapLegend isMobile={isMobile} />
            </div>
=======
          {/* RIGHT: Map */}
          <div style={styles.right}>
            <MapContainer
              center={CAMPUS_CENTER}
              zoom={14}
              scrollWheelZoom={true}
              style={styles.map}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Campus radius circle with soft medical colors */}
              <Circle
                center={CAMPUS_CENTER}
                radius={radiusKm * 1000}
                pathOptions={{
                  color: "#6366f1",          // outline
                  weight: 2,
                  fillColor: "#a5b4fc",      // light indigo fill
                  fillOpacity: 0.18,
                }}
              />

              {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]}>
                  <Popup>You are here</Popup>
                </Marker>
              )}

              {visiblePlaces
                .filter(
                  (p) =>
                    typeof p.latitude === "number" &&
                    typeof p.longitude === "number"
                )
                .map((place) => {
                  const [centerLat, centerLng] = CAMPUS_CENTER;
                  let distanceText = "";
                  if (place.latitude && place.longitude) {
                    const d = distanceKm(
                      centerLat,
                      centerLng,
                      place.latitude,
                      place.longitude
                    );
                    distanceText = `${d.toFixed(1)} km from campus`;
                  }

                  return (
                    <Marker
                      key={place.id}
                      position={[place.latitude, place.longitude]}
                      eventHandlers={{
                        click: () => handlePlaceClick(place),
                      }}
                    >
                      <Popup>
                        <strong>{place.name}</strong>
                        <br />
                        {place.type === PLACE_TYPES.HOSPITAL
                          ? "Hospital / Clinic"
                          : "Medical Shop"}
                        {place.address && (
                          <>
                            <br />
                            {place.address}
                          </>
                        )}
                        {distanceText && (
                          <>
                            <br />
                            📏 {distanceText}
                          </>
                        )}
                        {place.phone && (
                          <>
                            <br />
                            📞 {place.phone}
                          </>
                        )}
                        {place.latitude && place.longitude && (
                          <>
                            <br />
                            <a
                              href={buildDirectionsUrl(userLocation, place)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              ▶ Get Directions
                            </a>
                          </>
                        )}
                      </Popup>
                    </Marker>
                  );
                })}

              <MapFocus place={selectedPlace} />
            </MapContainer>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
          </div>
        </div>

        {/* List under the main row */}
<<<<<<< HEAD
        <div id="places-list" style={responsiveStyles.listWrapper}>
          <h3 style={responsiveStyles.listTitle}>
            Nearby Hospitals & Medical Shops (within {radiusKm} km of your location)
          </h3>
          <div style={responsiveStyles.listGrid}>
            <div>
              <h4 style={responsiveStyles.sectionTitle}>🏥 Hospitals / Clinics</h4>
              {hospitals.length === 0 && (
                <p style={responsiveStyles.subtle}>No hospitals available.</p>
              )}
              <ul style={responsiveStyles.list}>
                {hospitals.map((p) => {
                  const distanceText = `${p.distanceKm.toFixed(1)} km from your location`;
                  const stableId = p.id || `hospital-${p.name}-${p.latitude}-${p.longitude}`;

                  return (
                    <li
                      key={stableId}
                      style={{
                        ...responsiveStyles.listItem,
                        ...(selectedId === stableId ? responsiveStyles.listItemActive : {}),
                      }}
                      onClick={() => handlePlaceClick(p)}
                    >
                      <div style={responsiveStyles.listItemHeader}>
                        <strong>{p.name}</strong>
                        {selectedId === stableId && (
                          <span style={responsiveStyles.activeIndicator}>Active</span>
                        )}
                      </div>
                      {p.address && (
                        <div style={responsiveStyles.listDetail}>{p.address}</div>
                      )}
                      {distanceText && (
                        <div style={responsiveStyles.listDistance}>📏 {distanceText}</div>
                      )}
                      {p.phone && (
                        <div style={responsiveStyles.listPhone}>📞 {p.phone}</div>
                      )}
                      <button
                        type="button"
                        style={responsiveStyles.directionsButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaceClick(p);
                        }}
                      >
                        Get Directions →
                      </button>
=======
        <div id="places-list" style={styles.listWrapper}>
          <h3 style={styles.listTitle}>
            Nearby Hospitals & Medical Shops (within {radiusKm} km of campus)
          </h3>
          <div style={styles.listGrid}>
            <div>
              <h4 style={styles.sectionTitle}>Hospitals / Clinics</h4>
              {hospitals.length === 0 && (
                <p style={styles.subtle}>No hospitals available.</p>
              )}
              <ul style={styles.list}>
                {hospitals.map((p) => {
                  const [centerLat, centerLng] = CAMPUS_CENTER;
                  let distanceText = "";
                  if (p.latitude && p.longitude) {
                    const d = distanceKm(
                      centerLat,
                      centerLng,
                      p.latitude,
                      p.longitude
                    );
                    distanceText = `${d.toFixed(1)} km from campus`;
                  }

                  return (
                    <li
                      key={p.id}
                      style={styles.listItem}
                      onClick={() => handlePlaceClick(p)}
                    >
                      <strong>{p.name}</strong>
                      {p.address && (
                        <div style={styles.listDetail}>{p.address}</div>
                      )}
                      {distanceText && (
                        <div style={styles.listDistance}>{distanceText}</div>
                      )}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
<<<<<<< HEAD
              <h4 style={responsiveStyles.sectionTitle}>💊 Medical Shops / Pharmacies</h4>
              {medicalShops.length === 0 && (
                <p style={responsiveStyles.subtle}>No medical shops available.</p>
              )}
              <ul style={responsiveStyles.list}>
                {medicalShops.map((p) => {
                  const distanceText = `${p.distanceKm.toFixed(1)} km from your location`;
                  const stableId = p.id || `shop-${p.name}-${p.latitude}-${p.longitude}`;

                  return (
                    <li
                      key={stableId}
                      style={{
                        ...responsiveStyles.listItem,
                        ...(selectedId === stableId ? responsiveStyles.listItemActive : {}),
                      }}
                      onClick={() => handlePlaceClick(p)}
                    >
                      <div style={responsiveStyles.listItemHeader}>
                        <strong>{p.name}</strong>
                        {selectedId === stableId && (
                          <span style={responsiveStyles.activeIndicator}>Active</span>
                        )}
                      </div>
                      {p.address && (
                        <div style={responsiveStyles.listDetail}>{p.address}</div>
                      )}
                      {distanceText && (
                        <div style={responsiveStyles.listDistance}>📏 {distanceText}</div>
                      )}
                      {p.phone && (
                        <div style={responsiveStyles.listPhone}>📞 {p.phone}</div>
                      )}
                      <button
                        type="button"
                        style={responsiveStyles.directionsButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaceClick(p);
                        }}
                      >
                        Get Directions →
                      </button>
=======
              <h4 style={styles.sectionTitle}>Medical Shops / Pharmacies</h4>
              {medicalShops.length === 0 && (
                <p style={styles.subtle}>No medical shops available.</p>
              )}
              <ul style={styles.list}>
                {medicalShops.map((p) => {
                  const [centerLat, centerLng] = CAMPUS_CENTER;
                  let distanceText = "";
                  if (p.latitude && p.longitude) {
                    const d = distanceKm(
                      centerLat,
                      centerLng,
                      p.latitude,
                      p.longitude
                    );
                    distanceText = `${d.toFixed(1)} km from campus`;
                  }

                  return (
                    <li
                      key={p.id}
                      style={styles.listItem}
                      onClick={() => handlePlaceClick(p)}
                    >
                      <strong>{p.name}</strong>
                      {p.address && (
                        <div style={styles.listDetail}>{p.address}</div>
                      )}
                      {distanceText && (
                        <div style={styles.listDistance}>{distanceText}</div>
                      )}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

<<<<<<< HEAD
          <p style={responsiveStyles.footerNote}>
=======
          <p style={styles.footerNote}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            ℹ️ Markers on the map are either actual places from the telemedicine
            system or demo locations around JNTU-GV Vizianagaram for preview.
            For real emergencies, always contact official campus authorities.
          </p>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
const getResponsiveStyles = (isMobile, isTablet) => {
  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "1rem 0.75rem" : isTablet ? "1.25rem" : "1.5rem 1rem",
      backgroundImage:
        "radial-gradient(circle at top, #e0f2fe 0, #fdf2ff 40%, #fef9c3 100%)",
      backgroundSize: "140% 140%",
      animation: "bgGradientShift 22s ease-in-out infinite",
    },
    card: {
      width: "100%",
      maxWidth: isMobile ? "100%" : isTablet ? "95%" : "1100px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(239,246,255,0.96))",
      borderRadius: isMobile ? "18px" : "24px",
      boxShadow: "0 20px 50px rgba(15,23,42,0.22)",
      padding: isMobile
        ? "1.25rem 1rem"
        : isTablet
        ? "1.4rem 1.4rem"
        : "1.6rem 1.6rem 1.4rem",
      boxSizing: "border-box",
      border: "1px solid rgba(148,163,184,0.4)",
      backdropFilter: "blur(10px)",
    },
    layout: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1.1fr 1.2fr",
      gap: isMobile ? "1rem" : isTablet ? "1.25rem" : "1.5rem",
      alignItems: "stretch",
    },
    left: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: isMobile ? "0.65rem" : "0.75rem",
    },
    right: {
      borderRadius: isMobile ? "16px" : "18px",
      overflow: "hidden",
      border: "1px solid #e5e7eb",
      boxShadow: "0 12px 30px rgba(15,23,42,0.18)",
    },
    mapContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    map: {
      width: "100%",
      height: isMobile ? "280px" : isTablet ? "320px" : "360px",
    },
    legend: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "rgba(255,255,255,0.95)",
      borderRadius: "12px",
      padding: "0.6rem 0.8rem",
      boxShadow: "0 4px 12px rgba(15,23,42,0.2)",
      zIndex: 1000,
      border: "1px solid rgba(148,163,184,0.3)",
    },
    legendMobile: {
      top: "8px",
      right: "8px",
      padding: "0.5rem 0.6rem",
      fontSize: "0.7rem",
    },
    legendTitle: {
      fontSize: isMobile ? "0.7rem" : "0.75rem",
      fontWeight: 700,
      color: "#0f172a",
      marginBottom: "0.4rem",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      marginBottom: "0.3rem",
      fontSize: isMobile ? "0.7rem" : "0.75rem",
    },
    legendDot: {
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.6rem",
      flexShrink: 0,
    },
    legendText: {
      color: "#374151",
      fontSize: isMobile ? "0.7rem" : "0.75rem",
    },
    heading: {
      margin: 0,
      fontSize: isMobile ? "1.5rem" : isTablet ? "1.7rem" : "1.9rem",
      fontWeight: 800,
      color: "#0f172a",
    },
    tagline: {
      margin: 0,
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      color: "#4b5563",
    },
    studentInfo: {
      margin: 0,
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      color: "#111827",
    },
    hostelInfo: {
      margin: 0,
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      color: "#4b5563",
    },
    subtle: {
      margin: 0,
      fontSize: isMobile ? "0.8rem" : "0.85rem",
      color: "#6b7280",
    },
    error: {
      color: "#b91c1c",
      fontSize: isMobile ? "0.8rem" : "0.85rem",
    },
    contactBlock: {
      marginTop: "0.5rem",
      paddingTop: "0.5rem",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      gap: "0.3rem",
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      color: "#374151",
    },
    contactRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
    },
    ctaButton: {
      marginTop: "0.8rem",
      alignSelf: "flex-start",
      width: isMobile ? "100%" : "auto",
      padding: isMobile ? "0.65rem 1rem" : "0.6rem 1.2rem",
      borderRadius: "999px",
      border: "none",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "#fff",
      fontSize: isMobile ? "0.82rem" : "0.85rem",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 10px 24px rgba(79,70,229,0.4)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    radiusSection: {
      marginTop: "0.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
    },
    radiusLabel: {
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      color: "#374151",
      fontWeight: 600,
    },
    radiusPills: {
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
    },
    radiusPill: {
      padding: isMobile ? "0.35rem 0.8rem" : "0.4rem 1rem",
      borderRadius: "999px",
      border: "1px solid #cbd5f5",
      fontSize: isMobile ? "0.8rem" : "0.85rem",
      backgroundColor: "#ffffff",
      color: "#6b7280",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontWeight: 600,
    },
    radiusPillActive: {
      backgroundColor: "#6366f1",
      color: "#ffffff",
      borderColor: "#6366f1",
      boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
    },
    listWrapper: {
      marginTop: isMobile ? "1rem" : "1.25rem",
    },
    listTitle: {
      margin: 0,
      marginBottom: "0.5rem",
      fontSize: isMobile ? "1rem" : "1.1rem",
      color: "#0f172a",
    },
    listGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "1rem",
    },
    sectionTitle: {
      marginTop: 0,
      marginBottom: "0.35rem",
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      color: "#0f172a",
      fontWeight: 700,
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    listItem: {
      borderRadius: isMobile ? "10px" : "12px",
      border: "1px solid #e5e7eb",
      padding: isMobile ? "0.5rem 0.6rem" : "0.6rem 0.75rem",
      fontSize: isMobile ? "0.8rem" : "0.85rem",
      cursor: "pointer",
      backgroundColor: "#ffffff",
      transition: "all 0.2s ease",
    },
    listItemActive: {
      borderColor: "#6366f1",
      backgroundColor: "#eef2ff",
      boxShadow: "0 6px 16px rgba(99,102,241,0.25)",
      animation: "pulseGlow 2s ease-in-out infinite",
    },
    listItemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.3rem",
      flexWrap: "wrap",
      gap: "0.3rem",
    },
    activeIndicator: {
      fontSize: isMobile ? "0.65rem" : "0.7rem",
      padding: "0.15rem 0.5rem",
      borderRadius: "999px",
      backgroundColor: "#6366f1",
      color: "#ffffff",
      fontWeight: 600,
    },
    listDetail: {
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      color: "#6b7280",
      marginBottom: "0.2rem",
    },
    listDistance: {
      fontSize: isMobile ? "0.73rem" : "0.78rem",
      color: "#4b5563",
      marginBottom: "0.2rem",
    },
    listPhone: {
      fontSize: isMobile ? "0.73rem" : "0.78rem",
      color: "#4b5563",
      marginBottom: "0.4rem",
    },
    directionsButton: {
      marginTop: "0.3rem",
      width: isMobile ? "100%" : "auto",
      padding: isMobile ? "0.4rem 0.6rem" : "0.35rem 0.7rem",
      borderRadius: "999px",
      border: "none",
      backgroundColor: "#eff6ff",
      color: "#1d4ed8",
      fontSize: isMobile ? "0.72rem" : "0.75rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    footerNote: {
      marginTop: "0.75rem",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      color: "#6b7280",
    },
  };

  return styles;
};

const styles = {
  legend: {},
  legendTitle: {},
  legendItem: {},
  legendDot: {},
  legendText: {},
};

export default NearbyPlaces;
=======
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem 1rem",
    backgroundImage:
      "radial-gradient(circle at top, #e0f2fe 0, #fdf2ff 40%, #fef9c3 100%)",
    backgroundSize: "140% 140%",
    animation: "bgGradientShift 22s ease-in-out infinite",
  },
  card: {
    width: "100%",
    maxWidth: "1100px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(239,246,255,0.96))",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(15,23,42,0.22)",
    padding: "1.6rem 1.6rem 1.4rem",
    boxSizing: "border-box",
    border: "1px solid rgba(148,163,184,0.4)",
    backdropFilter: "blur(10px)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1.2fr",
    gap: "1.5rem",
    alignItems: "stretch",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.75rem",
  },
  right: {
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 12px 30px rgba(15,23,42,0.18)",
  },
  map: {
    width: "100%",
    height: "360px",
  },
  heading: {
    margin: 0,
    fontSize: "1.9rem",
    fontWeight: 800,
    color: "#0f172a",
  },
  tagline: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#4b5563",
  },
  studentInfo: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#111827",
  },
  hostelInfo: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#4b5563",
  },
  subtle: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  error: {
    color: "#b91c1c",
    fontSize: "0.85rem",
  },
  contactBlock: {
    marginTop: "0.5rem",
    paddingTop: "0.5rem",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    fontSize: "0.9rem",
    color: "#374151",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  ctaButton: {
    marginTop: "0.8rem",
    alignSelf: "flex-start",
    padding: "0.6rem 1.2rem",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(79,70,229,0.4)",
  },
  radiusRow: {
    marginTop: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
  },
  radiusLabel: {
    color: "#374151",
  },
  radiusSelect: {
    padding: "0.25rem 0.6rem",
    borderRadius: "999px",
    border: "1px solid #cbd5f5",
    fontSize: "0.85rem",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
  },
  listWrapper: {
    marginTop: "1.25rem",
  },
  listTitle: {
    margin: 0,
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
    color: "#0f172a",
  },
  listGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "0.35rem",
    fontSize: "0.95rem",
    color: "#0f172a",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  listItem: {
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    padding: "0.4rem 0.6rem",
    fontSize: "0.85rem",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    transition: "background-color 0.2s, border-color 0.2s, box-shadow 0.2s",
  },
  listDetail: {
    fontSize: "0.8rem",
    color: "#6b7280",
  },
  listDistance: {
    fontSize: "0.78rem",
    color: "#4b5563",
  },
  footerNote: {
    marginTop: "0.75rem",
    fontSize: "0.8rem",
    color: "#6b7280",
  },
};

export default NearbyPlaces;
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
