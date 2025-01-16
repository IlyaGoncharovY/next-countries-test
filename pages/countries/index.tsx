// import {Geist, Geist_Mono} from "next/font/google";
import s from './Countries.module.css';
import {AnimatePresence} from 'framer-motion';
import {ICountry, useCountries} from "@/assects/hooks/useCountries";
import {CountryItem} from "@/components/countryItem/CountryItem";
import {HeadMeta} from "@/components/headMeta/HeadMeta";
import {getLayout} from "@/components/layout/Layout";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });


async function fetchCountries(): Promise<ICountry[]> {
    const res = await fetch(
        'https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json'
    );
    if (!res.ok) {
        throw new Error('Failed to fetch countries');
    }
    return res.json();
}

function Countries() {

    const {countryList, removeCountry} = useCountries(fetchCountries);

    return (
        <>
            <HeadMeta title={'Countries'} content={'Countries list'}/>
            <h1 className={s.countriesContainerTitle}>Country List</h1>
            <ul className={s.countriesList}>
                <AnimatePresence>
                    {countryList.map((country) => (
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
