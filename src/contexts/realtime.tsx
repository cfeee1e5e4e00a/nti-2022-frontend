import { coreApiOrigin } from 'api/core';
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { RealtimeState, RealtimeService } from 'services/realtime';

type UseRealtimeHook = (url: URL) => RealtimeState;

const useRealtime: UseRealtimeHook = (url: URL) => {
  const [state, setState] = useState<RealtimeState>({});
  const realtimeService = useRef<RealtimeService>();

  useEffect(() => {
    realtimeService.current = new RealtimeService(url);

    realtimeService.current.setOnUpdate((newState) => {
      setState({ ...state, ...newState });
    });

    return () => realtimeService.current?.disconnect();
  }, [url]);

  realtimeService.current?.setOnUpdate((newState) => {
    setState({ ...state, ...newState });
  });

  return state;
};

export const RealtimeContext = createContext<RealtimeState>({});

type RealtimeProviderProps = {
  children: ReactNode;
};

// TODO: use .env
const url = new URL(`ws://${coreApiOrigin.host}/api/ws`);

export const RealtimeProvider = ({ children }: RealtimeProviderProps) => {
  const state = useRealtime(url);

  return (
    <RealtimeContext.Provider value={state}>
      {children}
    </RealtimeContext.Provider>
  );
};
