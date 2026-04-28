import axios from "axios";

const API = "/data/db.json";

export async function searchTrip({
                                     searchName,
                                     searchStartTime,
                                     searchEndTime,
                                     searchCategory,
                                     page = 1,
                                     limit = 3
                                 }) {
    try {
        // 1. load data
        const res = await axios.get(API);
        let trips = res.data.trips;

        // 2. SEARCH NAME
        if (searchName) {
            const keyword = searchName.toLowerCase();
            trips = trips.filter(trip =>
                trip.name.toLowerCase().includes(keyword)
            );
        }

        // 3. FILTER CATEGORY
        if (searchCategory) {
            trips = trips.filter(trip =>
                trip.categoryId === Number(searchCategory)
            );
        }

        // 4. FILTER TIME RANGE (OVERLAP LOGIC)
        if (searchStartTime || searchEndTime) {
            trips = trips.filter(trip => {
                const start = searchStartTime ? new Date(searchStartTime) : null;
                const end = searchEndTime ? new Date(searchEndTime) : null;

                const tripStart = new Date(trip.startTime);
                const tripEnd = new Date(trip.endTime);

                // overlap condition
                const matchStart = !end || tripStart < end;
                const matchEnd = !start || tripEnd > start;

                return matchStart && matchEnd;
            });
        }

        // 5. TOTAL PAGE
        const totalPage = Math.ceil(trips.length / limit);

        // 6. PAGINATION
        const startIndex = (page - 1) * limit;
        const paginatedData = trips.slice(startIndex, startIndex + limit);

        // 7. RETURN RESULT
        return {
            data: paginatedData,
            totalPage
        };

    } catch (error) {
        console.log(error);
        return {
            data: [],
            totalPage: 0
        };
    }
}