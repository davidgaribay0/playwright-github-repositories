export function isSortedAlphabetically(items: string[]) {
    for (let i = 0; i < items.length - 1; i++) {
        if (items[i] > items[i + 1]) {
            return false;
        }
    }
    return true;
}