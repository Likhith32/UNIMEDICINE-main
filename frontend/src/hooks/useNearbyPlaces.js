// useNearbyPlaces.js placeholder
// src/hooks/useNearbyPlaces.js

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

/**
 * useNearbyPlaces
 *
 * Automatically fetches nearby medical shops & hospitals
 * based on:
 *  - student hostel (from UserContext)
 *  - or explicit hostel override
 *
 * Params:
 *  - options.hostel (optional)  -> fallback to student's hostel
 *  - options.type (optional)    -> "hospital" | "medical_shop" | undefined (both)
 */
export function useNearbyPlaces(options = {}) {
  const { apiBaseUrl } = useAuth();
  const { studentProfile } = useUser();

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const targetHostel = options.hostel || studentProfile?.hostel || null;
  const type = options.type || null; // hospital | medical_shop | null

  useEffect(() => {
    // Don’t call API if we have no hostel yet
    if (!targetHostel) return;

    let cancelled = false;
    const controller = new AbortController();

    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append("hostel", targetHostel);
        if (type) params.append("type", type);

        const res = await fetch(`${apiBaseUrl}/api/places?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load nearby places");
        }

        const data = await res.json();
        if (!cancelled) {
          setPlaces(data || []);
        }
      } catch (err) {
        if (cancelled || err.name === "AbortError") return;
        console.error("Nearby places error:", err);
        setError(err.message || "Could not fetch places.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPlaces();

    // Cleanup on hostel/type change or unmount
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [apiBaseUrl, targetHostel, type]);

  return {
    places,
    loading,
    error,
    hostel: targetHostel,
    type,
  };
}
