"use strict"

export const getDefaultValue = (devValue, prodValue) => {
    return import.meta.env.MODE === "development" ? devValue : prodValue
}
