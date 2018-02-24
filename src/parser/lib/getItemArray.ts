export default function getItemArray<T>(
    map : Map<number, T>,
    items : number[] | null,
) {
    if (!items) {
        return [] as T[]
    }

    return items.reduce((acc, i) => {
        if (map.has(i)) {
            acc.push(map.get(i)!)
        }

        return acc
    }, [] as T[])
}
