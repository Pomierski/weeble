export const isDefined = <T,>(arg: T | undefined | null): arg is T => {
    return arg !== undefined && arg !== null
}