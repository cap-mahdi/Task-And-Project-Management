import useAppContext from '../context/useAppContext';

export default function useEvent(events: string[]) {
  const [globalState, setGlobalState] = useAppContext();

  return events.map((event) => () => {
    setGlobalState((state) => ({
      ...state,
      events: {
        ...state.events,
        [event]: state.events[event] + 1,
      },
    }));
  });
}
