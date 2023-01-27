import { useCallback, useEffect, useState } from "react";

import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from "./requests";

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);
  const [isLaunchAdded, setLaunchAdded] = useState({
    ok: true,
    error: "",
  });

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(
    async (e) => {
      e.preventDefault();
      setPendingLaunch(true);
      const data = new FormData(e.target);
      const launchDate = new Date(data.get("launch-day"));
      const mission = data.get("mission-name");
      const rocket = data.get("rocket-name");
      const target = data.get("planets-selector");
      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        target,
      });

      // TODO: Set success based on response.
      const success = response.ok;
      if (success) {
        getLaunches();
        setTimeout(() => {
          setPendingLaunch(false);
          setLaunchAdded({ ok: true, error: "" });
          onSuccessSound();
        }, 800);
      } else {
        setPendingLaunch(false);
        response.json().then((json) => {
          setLaunchAdded({
            ok: false,
            error: json.error,
          });
        });
        onFailureSound();
      }
    },
    [getLaunches, onSuccessSound, onFailureSound]
  );

  const abortLaunch = useCallback(
    async (id) => {
      const response = await httpAbortLaunch(id);

      // TODO: Set success based on response.
      const success = response.ok;
      if (success) {
        getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onAbortSound, onFailureSound]
  );

  return {
    launches,
    isPendingLaunch,
    isLaunchAdded,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
