import { ICountry } from '@/assects/types/types';

const BASE_URL = 'https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json';

export const CountryAPI = {
    async fetchCountries(): Promise<ICountry[]> {
        const res = await fetch(BASE_URL);

        if (!res.ok) {
            throw new Error('Failed to fetch countries');
        }

        return res.json();
    },

    async updateCountry(iso_code2: string, updatedData: Partial<ICountry>): Promise<void> {
        const res = await fetch(`${BASE_URL}/${iso_code2}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!res.ok) {
            throw new Error('Failed to update country');
        }
    },

    async postCountry(newCountry: ICountry): Promise<void> {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCountry),
        });

        if (!res.ok) {
            throw new Error('Failed to add country');
        }
    },

    async deleteCountry(iso_code2: string): Promise<void> {
        const res = await fetch(`${BASE_URL}/${iso_code2}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Failed to delete country');
        }
    },
};
