export default function getItem<T>(
    map : Map<number, T>,
    id : number | null | undefined,
) {
    if (id == null || id === undefined) {
        return null
    }

    return map.get(id) || null
}
