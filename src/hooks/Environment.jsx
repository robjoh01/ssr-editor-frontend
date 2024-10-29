"use strict"

/**
 * Returns a value based on the environment mode.
 *
 * @param {any} devValue - The value to return in development mode.
 * @param {any} prodValue - The value to return in production mode.
 *
 * @returns {any} The value determined by the current environment mode.
 */
export const useDefaultValue = (devValue, prodValue) => {
    return import.meta.env.ENV_MODE === "development" ? devValue : prodValue
}
