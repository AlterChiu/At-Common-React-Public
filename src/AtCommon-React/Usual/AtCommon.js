export function isArrayEquals(array1 , array2){
    return Array.isArray(array1) &&
        Array.isArray(array2) &&
        array1.length === array2.length &&
        array1.every((val, index) => val === array2[index]);
}