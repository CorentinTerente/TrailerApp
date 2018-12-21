import React from 'react';

export const TrailerContext = React.createContext({
    isConnected: undefined,
    trailersList: [],
    getTrailersList: () => {},
})