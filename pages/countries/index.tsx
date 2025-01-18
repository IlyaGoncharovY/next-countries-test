import {useState} from "react";
import {GetStaticProps} from "next";

import {AnimatePresence} from 'framer-motion';
import {ICountry} from "@/assects/types/types";
import {CountryAPI} from "@/assects/api/CountryAPI";
import {getLayout} from "@/components/layout/Layout";
import {HeadMeta} from "@/components/headMeta/HeadMeta";
import {CountryItem} from "@/components/countryItem/CountryItem";

import s from './Countries.module.css';

export const getStaticProps: GetStaticProps = async () => {
    try {
        const initialCountryList: ICountry[] = await CountryAPI.fetchCountries();

        return {
            props: {
                initialCountryList,
            },
        };
    } catch (error) {
        console.error('Failed to fetch countries:', error);
        return {
            props: {
                initialCountryList: [],
            },
        };
    }
};

interface CountriesProps {
    initialCountryList: ICountry[];
}

const Countries = ({initialCountryList}: CountriesProps ) => {

    const [countryList, setCountryList] = useState<ICountry[]>(initialCountryList);

    const removeCountry = (code: string) => {
        setCountryList((prev) => prev.filter((country) => country.iso_code2 !== code));
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
}

Countries.getLayout = getLayout;
export default Countries;
