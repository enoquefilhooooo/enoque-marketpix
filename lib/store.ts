export type Product = { id: number; name: string; price: number; stock: number; category: string }
export type Banner = { id: number; title: string; text: string; active: boolean }

const products: Product[] = [
  { id: 1, name: 'Camiseta Premium', price: 59.9, stock: 20, category: 'Roupas' },
  { id: 2, name: 'Boné Casual', price: 39.9, stock: 15, category: 'Acessórios' },
  { id: 3, name: 'Óculos de Sol', price: 79.9, stock: 8, category: 'Acessórios' },
]

const banners: Banner[] = [
  { id: 1, title: 'Ofertas especiais', text: 'Encontre seus produtos favoritos', active: true },
  { id: 2, title: 'Novidades na loja', text: 'Confira os lançamentos', active: true },
  { id: 3, title: 'Pague com PIX', text: 'Compra rápida e prática', active: true },
]

export function getProducts() { return products }
export function getBanners() { return banners.filter(b => b.active) }
export function addProduct(product: Omit<Product, 'id'>) { products.push({ ...product, id: Date.now() }); return products.at(-1) }
export function deleteProduct(id: number) { const i = products.findIndex(p => p.id === id); if (i >= 0) products.splice(i, 1) }
export function setBannerActive(id: number, active: boolean) { const b = banners.find(x => x.id === id); if (b) b.active = active }
