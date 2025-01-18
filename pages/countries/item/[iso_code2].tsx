import {GetStaticPaths, GetStaticProps} from 'next';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';

import s from './CountryDetails.module.css';

import {ICountry} from '@/assects/types/types';
import {CountryAPI} from '@/assects/api/CountryAPI';


interface CountryDetailsProps {
    country: ICountry;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await CountryAPI.fetchCountries();

  const paths = countries.map((country) => ({
    params: { iso_code2: country.iso_code2 },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { iso_code2 } = params!;
  const countries = await CountryAPI.fetchCountries();
  const country = countries.find((c) => c.iso_code2 === iso_code2);

  if (!country) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      country,
    },
  };
};

const CountryDetails = ({ country }: CountryDetailsProps) => {
  const router = useRouter();
  const defaultFlagUrl = '/globe.svg';

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.5 }}
      className={s.countryDetailsContainer}
    >
      <Image
        src={`https:${country.flag_url || defaultFlagUrl}`}
        alt={`Flag of ${country.name_ru}`}
        width={40}
        height={30}
        className={s.countryFlag}
        onError={(e) => (e.currentTarget.src = defaultFlagUrl)}
      />
      <span className={s.countryName}>{country.name_ru}</span>
      <button onClick={() => router.back()} className={s.backButton}>
                Back
      </button>
    </motion.div>
  );
};

export default CountryDetails;
