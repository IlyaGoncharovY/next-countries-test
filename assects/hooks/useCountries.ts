import {useEffect, useState} from "react";

export interface ICountry {
    flag_url : string,
    "name_ru" : string,
    "iso_code2" : string,
    "iso_code3" : string
}

export const useCountries = (fetchCountries: () => Promise<ICountry[]>) => {
    const [countryList, setCountryList] = useState<ICountry[]>([]);

    const removeCountry = (code: string) => {
        setCountryList((prev) => prev.filter((country) => country.iso_code2 !== code));
    };

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const countries = await fetchCountries();
                setCountryList(countries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        loadCountries();
    }, [fetchCountries]);

    return {
        countryList,
        removeCountry,
    }
};
