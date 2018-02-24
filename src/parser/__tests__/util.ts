interface Iterable<T> {
    forEach : (callback: (item : T) => void) => void
}

export function denormalizeCheck<T extends { id : number }>(
    res : Map<number, T> | T[],
    key : keyof T,
    finalCheck : (item : T) => number = item => item[key].id,
    id_key = `${key}_id`,
) {
    it(`should denormalize ${key}`, () => {
        (res as Iterable<T>).forEach((item) => {
            expect(item[key]).toBeDefined()
            expect(item[key]).not.toBeNull()
            expect((item as any)[id_key]).toBeUndefined()
            // fixtures are setup with foreign id === id
            expect(finalCheck(item)).toBe(item.id)
        })
    })
}

export function dateCheck<T>(
    res : Map<number, T> | T[],
    key : keyof T,
) {
    it('should convert the date', () => {
        (res as Iterable<T>).forEach((item) => {
            expect(item[key]).toBeInstanceOf(Date)
            expect((item[key] as any as Date).getTime()).not.toBeNaN()
        })
    })
}
