import { createContext, useContext, useMemo, useState } from 'react';

const SearchRideContext = createContext();

export function AppContext({ children }) {

    const [searchData, setSearchData] = useState({
        fieldsData: {},
        availableRides: []
    })

    // useMemorization hook for updating the state when data changing
    const data = useMemo(
        () => ({ searchData, setSearchData }),
        [searchData]
    );

    return (
        <SearchRideContext.Provider value={data}>
            {children}
        </SearchRideContext.Provider>
    );
}

export default SearchRideContext;

