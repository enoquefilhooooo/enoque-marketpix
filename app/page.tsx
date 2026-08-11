'use client'

import { useState } from 'react'

const banners = [
  { title: 'Ofertas especiais', text: 'Encontre seus produtos favoritos', className: 'bannerOne' },
  { title: 'Novidades na loja', text: 'Confira os lançamentos', className: 'bannerTwo' },
  { title: 'Pague com PIX', text: 'Compra rápida e prática', className: 'bannerThree' },
]

const products = [
  { id: 1, name: 'Camiseta Premium', price: 59.9, category: 'Roupas', emoji: '👕' },
  { id: 2, name: 'Boné Casual', price: 39.9, category: 'Acessórios', emoji: '🧢' },
  { id: 3, name: 'Óculos de Sol', price: 79.9, category: 'Acessórios', emoji: '🕶️' },
  { id: 4, name: 'Tênis Casual', price: 149.9, category: 'Calçados', emoji: '👟' },
]

export default function Home() {
  const [banner, setBanner] = useState(0)
  const [search, setSearch] = useState('')
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <header className="header">
        <div className="headerInner">
          <a className="logo" href="#">Market<span>PIX</span></a>
          <div className="searchBox">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produtos..." />
            <button aria-label="Buscar">🔍</button>
          </div>
          <button className="cart">🛒 Carrinho <b>0</b></button>
        </div>
      </header>

      <nav className="nav"><div className="container"><a href="#produtos">Produtos</a><a href="#categorias">Categorias</a><a href="#ofertas">Ofertas</a><a href="#contato">Contato</a></div></nav>

      <section className={`banner ${banners[banner].className}`}>
        <div className="bannerContent">
          <small>MARKETPIX</small>
          <h1>{banners[banner].title}</h1>
          <p>{banners[banner].text}</p>
          <button className="primary">Comprar agora</button>
        </div>
        <div className="dots">{banners.map((_, i) => <button key={i} className={i === banner ? 'dot active' : 'dot'} onClick={() => setBanner(i)} aria-label={`Banner ${i + 1}`} />)}</div>
      </section>

      <section id="categorias" className="container section">
        <h2>Categorias</h2>
        <div className="categories"><div>👕<span>Roupas</span></div><div>🧢<span>Acessórios</span></div><div>👟<span>Calçados</span></div><div>🏠<span>Casa</span></div></div>
      </section>

      <section id="produtos" className="container section">
        <div className="sectionTitle"><h2>Produtos em destaque</h2><a href="#produtos">Ver todos →</a></div>
        <div className="products">{filtered.map((product) => <article className="product" key={product.id}><div className="productImage">{product.emoji}</div><div className="productInfo"><small>{product.category}</small><h3>{product.name}</h3><strong>R$ {product.price.toFixed(2).replace('.', ',')}</strong><button className="buy">Adicionar ao carrinho</button></div></article>)}</div>
        {filtered.length === 0 && <p>Nenhum produto encontrado.</p>}
      </section>

      <section id="ofertas" className="offer"><div className="container"><h2>Pagamento fácil com PIX</h2><p>Finalize suas compras de forma rápida e segura.</p></div></section>

      <footer id="contato"><div className="container"><div><a className="logo" href="#">Market<span>PIX</span></a><p>Sua loja online.</p></div><div><h3>Atendimento</h3><p>WhatsApp: (00) 00000-0000</p></div></div></footer>
    </main>
  )
}
