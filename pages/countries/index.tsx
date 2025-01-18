import {useEffect} from 'react';
import {GetStaticProps} from 'next';
import {AnimatePresence} from 'framer-motion';

import s from './Countries.module.css';

import {ICountry} from '@/assects/types/types';
import {CountryAPI} from '@/assects/api/CountryAPI';
import {getLayout} from '@/components/layout/Layout';
import {HeadMeta} from '@/components/headMeta/HeadMeta';
import {CountryItem} from '@/components/countryItem/CountryItem';
import {useCountriesContext} from '@/contexts/CountriesContext';

export const getStaticProps: GetStaticProps = async () => {

  const initialCountryList: ICountry[] = await CountryAPI.fetchCountries();

  return {
    props: {
      initialCountryList,
    },
  };
};

interface CountriesProps {
    initialCountryList: ICountry[];
}

const Countries = ({initialCountryList}: CountriesProps ) => {

  const {countryList, setCountryList} = useCountriesContext();

  useEffect(() => {
    if (!countryList) {
      setCountryList(initialCountryList);
    }
  }, [countryList, initialCountryList, setCountryList]);

  const removeCountry = (code: string) => {
    setCountryList((prev) => {
      if (!prev) return prev;
      return prev.filter((country) => country.iso_code2 !== code);
    });
  };

  return (
    <>
      <HeadMeta title={'Countries'} content={'Countries list'}/>
      <h1 className={s.countriesContainerTitle}>Country List</h1>
      <ul className={s.countriesList}>
        <AnimatePresence>
          {countryList && countryList.map((country) => (
            <CountryItem
              key={country.iso_code2}
              country={country}
              removeCountry={removeCountry}
            />
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};

Countries.getLayout = getLayout;
export default Countries;
