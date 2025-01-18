import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from 'react';

import {ICountry} from '@/assects/types/types';
import {Nullable} from '@/assects/types/commonTypes';

interface CountriesContextType {
  countryList: Nullable<ICountry[]>;
  setCountryList: Dispatch<SetStateAction<Nullable<ICountry[]>>>;
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export const CountriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [countryList, setCountryList] = useState<Nullable<ICountry[]>>(null);

  return (
    <CountriesContext.Provider value={{ countryList, setCountryList }}>
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountriesContext = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useCountriesContext must be used within a CountriesProvider');
  }
  return context;
};
