import axios from "axios"

const API = "https://restcountries.com/v3.1/all?fields=name,flags,translations"

export const getCountries = async () => {
    const response = await axios.get(API)
    return response.data.map(c => ({
        name: c.translations?.spa?.common || c.name.common,
        flag: c.flags?.png
    })).sort((a, b) => a.name.localeCompare(b.name))
}