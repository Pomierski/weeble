export const compareUnknownNumberValue = (a: unknown, b: unknown): boolean => {
    if (Number.isNaN(a) || Number.isNaN(b)) {
        return false;
    }

    if (typeof a === 'number' && typeof b === 'number') {
        return a > b;
    }

    return false;
}