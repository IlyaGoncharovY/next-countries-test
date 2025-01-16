import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {ICountry} from "@/assects/hooks/useCountries";

export const useCountry = (iso_code2: string | string[] | undefined, fetchCountries?: () => Promise<ICountry[]>) => {

    const router = useRouter();

    const [country, setCountry] = useState<ICountry | null>(null);

    useEffect(() => {
        if (!fetchCountries) return;
        const loadCountry = async () => {
            try {
                const countries = await fetchCountries();
                const foundCountry = countries.find((c) => c.iso_code2 === iso_code2);
                setCountry(foundCountry || null);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        if (iso_code2) {
            loadCountry();
        }
    }, [fetchCountries, iso_code2]);

    const handleItemClick = () => {
        router.push(`/countries/item/${iso_code2}`);
    };

    return {
        country,
        handleItemClick
    }
};
