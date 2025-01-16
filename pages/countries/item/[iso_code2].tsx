import {useRouter} from 'next/router';
import Image from "next/image";
import {useEffect, useState} from 'react';
import {ICountry} from '@/assects/hooks/useCountries';
import {useCountry} from "@/assects/hooks/useCountry";

import s from './CountryDetails.module.css';

async function fetchCountries(): Promise<ICountry[]> {
    const res = await fetch(
        'https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json'
    );
    if (!res.ok) {
        throw new Error('Failed to fetch countries');
    }
    return res.json();
}

export default function CountryDetails() {
    const router = useRouter();
    const { iso_code2 } = router.query;

    const {country} = useCountry(iso_code2, fetchCountries);

    const defaultFlagUrl = '/globe.svg';
    const [currentFlagUrl, setCurrentFlagUrl] = useState<string>(defaultFlagUrl);

    useEffect(() => {
        if (country?.flag_url) {
            setCurrentFlagUrl(`https:${country.flag_url}`);
        }
    }, [country]);
    const handleImageError = () => {
        setCurrentFlagUrl(defaultFlagUrl);
    };

    if (!country) {
        return <p>Loading country details...</p>;
    }

    return (
        <div
            className={s.countryDetailsContainer}
        >
            <h1>{country.name_ru}</h1>
            <Image
                src={currentFlagUrl}
                alt={`${country.name_ru} flag`}
                width={100}
                height={100}
                onError={handleImageError}
            />
            <p>ISO Code 2: {country.iso_code2}</p>
            <p>ISO Code 3: {country.iso_code3}</p>
            <button onClick={() => router.back()}>Back to list</button>
        </div>
    );
}
