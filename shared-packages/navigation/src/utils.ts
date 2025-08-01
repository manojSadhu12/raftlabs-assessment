export function objectToQueryString(obj: Record<string, any>): string {
    const params = new URLSearchParams();
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            // Handle array values by appending each element
            if (Array.isArray(value)) {
                value.forEach(item => params.append(key, String(item)));
            } else if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        }
    }
    return params.toString();
}