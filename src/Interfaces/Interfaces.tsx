export interface ItemInterface { id: string, name: string, order: number, count: number }
export interface PackageInterface { id: string, name: string, order: number, items: ItemInterface[] }