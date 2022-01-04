export default interface Menu {
    id: string,
    name: string,
    category: string,
    ingredients: string[],
    allergens: string[],
    price: number
}