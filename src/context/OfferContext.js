import { createContext } from "react";

const values = {
    data : [],
    setData : () => {}
}

export const OfferContext = createContext(values)