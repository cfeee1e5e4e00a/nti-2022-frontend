import { useContext, useRef } from 'react';
import { RealtimeContext } from 'contexts/realtime';
import { RealtimeSensorTag } from 'services/realtime';
import shallowequal from 'shallowequal';

export const useRealtime = () => {
  const state = useContext(RealtimeContext);
  const isLoadingFinished = useRef(false);

  let loaded = false;
  if (!isLoadingFinished.current) {
    if (!shallowequal(state, {})) {
      isLoadingFinished.current = true;
      loaded = true;
    }
  } else {
    loaded = true;
  }

  const selector = <T extends RealtimeSensorTag>(tag: T) => state[tag];

  return {
    selector,
    loaded,
  };
};
