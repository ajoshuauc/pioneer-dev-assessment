import { FOURSQUARE_API_KEY } from "../utils/env";
import axios from "axios";

export async function fetchRestaurant(params: any) {
    const headers = {
        authorization: `Bearer ${FOURSQUARE_API_KEY}`,
        'X-Places-Api-Version': '2025-06-17',
        'accept': 'application/json',
    };

    const response = await axios.get("https://places-api.foursquare.com/places/search", {
        headers,
        params: {
            query: params.query,
            near: params.near,
            price: params.price,
            open_now: params.open_now,
            limit: 1,
        },
    });

    return response.data.results.map((place: any) => ({
        name: place.name,
        address: place.location?.formatted_address || 'N/A',
        cuisine: place.categories?.[0]?.name || 'Unknown',
        rating: place.rating || 'N/A',
        price_level: place.price || 'N/A',
        hours: place.hours || 'N/A',
    }));
}