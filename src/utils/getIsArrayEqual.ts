export const getIsArrayEqual = (array1: unknown[], array2: unknown[]) => {
    const array1Sorted = array1.toSorted();
    const array2Sorted = array2.toSorted();

    return array1Sorted.length === array2Sorted.length &&
        array1Sorted.every((value, index) =>
            value === array2Sorted[index]
        );
}