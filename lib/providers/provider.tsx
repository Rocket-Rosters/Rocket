import { createContext } from 'react';
import AllData, { Data } from './context';
export const Context = createContext<Data>({
  id: '',
  setId: (string) => {},
  role: '',
  setRole: (string) => {}
});
export const Provider = ({ children }: any) => {
  const data = AllData();
  return <Context.Provider value={data}>{children}</Context.Provider>;
};
