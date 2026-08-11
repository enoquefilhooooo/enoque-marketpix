'use client'

import { useState } from 'react'

const initialProducts = [
  { id: 1, name: 'Camiseta Premium', price: 59.9, stock: 20, category: 'Roupas' },
  { id: 2, name: 'Boné Casual', price: 39.9, stock: 15, category: 'Acessórios' },
  { id: 3, name: 'Óculos de Sol', price: 79.9, stock: 8, category: 'Acessórios' },
]

const initialBanners = [
  { id: 1, title: 'Ofertas especiais', text: 'Encontre seus produtos favoritos', active: true },
  { id: 2, title: 'Novidades na loja', text: 'Confira os lançamentos', active: true },
  { id: 3, title: 'Pague com PIX', text: 'Compra rápida e prática', active: true },
]

export default function AdminPage() {
  const [section, setSection] = useState('dashboard')
  const [products, setProducts] = useState(initialProducts)
  const [banners, setBanners] = useState(initialBanners)
  const [showProductForm, setShowProductForm] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('Roupas')

  function addProduct(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !price || !stock) return
    setProducts([...products, { id: Date.now(), name, price: Number(price), stock: Number(stock), category }])
    setName(''); setPrice(''); setStock(''); setShowProductForm(false)
  }

  function deleteProduct(id: number) {
    setProducts(products.filter((product) => product.id !== id))
  }

  function toggleBanner(id: number) {
    setBanners(banners.map((banner) => banner.id === id ? { ...banner, active: !banner.active } : banner))
  }

  return (
    <main className="admin">
      <aside className="sidebar">
        <a className="adminLogo" href="/">Market<span>PIX</span></a>
        <p className="adminLabel">ADMINISTRAÇÃO</p>
        {['dashboard', 'products', 'banners', 'categories', 'orders', 'settings'].map((item) => (
          <button key={item} className={section === item ? 'menu active' : 'menu'} onClick={() => setSection(item)}>
            {item === 'dashboard' ? '📊 Dashboard' : item === 'products' ? '📦 Produtos' : item === 'banners' ? '🖼️ Banners' : item === 'categories' ? '🏷️ Categorias' : item === 'orders' ? '🛍️ Pedidos' : '⚙️ Configurações'}
          </button>
        ))}
        <a className="backStore" href="/">← Ver loja</a>
      </aside>

      <section className="adminContent">
        <header className="adminHeader"><div><h1>{section === 'dashboard' ? 'Dashboard' : section === 'products' ? 'Produtos' : section === 'banners' ? 'Banners' : section === 'categories' ? 'Categorias' : section === 'orders' ? 'Pedidos' : 'Configurações'}</h1><p>Gerencie sua loja MarketPIX.</p></div><a className="viewStore" href="/">Ver loja ↗</a></header>

        {section === 'dashboard' && <>
          <div className="stats"><div><span>Produtos</span><strong>{products.length}</strong></div><div><span>Estoque total</span><strong>{products.reduce((sum, p) => sum + p.stock, 0)}</strong></div><div><span>Banners ativos</span><strong>{banners.filter(b => b.active).length}</strong></div><div><span>Pedidos</span><strong>0</strong></div></div>
          <div className="panel"><h2>Acesso rápido</h2><div className="quick"><button onClick={() => {setSection('products'); setShowProductForm(true)}}>＋ Adicionar produto</button><button onClick={() => setSection('banners')}>🖼️ Gerenciar banners</button><a href="/">👁️ Visualizar loja</a></div></div>
        </>}

        {section === 'products' && <div className="panel"><div className="panelTitle"><h2>Seus produtos</h2><button className="primaryAdmin" onClick={() => setShowProductForm(!showProductForm)}>＋ Novo produto</button></div>
          {showProductForm && <form className="productForm" onSubmit={addProduct}><input placeholder="Nome do produto" value={name} onChange={e => setName(e.target.value)} /><input placeholder="Preço" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} /><input placeholder="Estoque" type="number" value={stock} onChange={e => setStock(e.target.value)} /><select value={category} onChange={e => setCategory(e.target.value)}><option>Roupas</option><option>Acessórios</option><option>Calçados</option><option>Casa</option></select><button className="primaryAdmin" type="submit">Salvar produto</button></form>}
          <div className="table">{products.map(p => <div className="row" key={p.id}><div><b>{p.name}</b><small>{p.category}</small></div><strong>R$ {p.price.toFixed(2).replace('.', ',')}</strong><span>{p.stock} un.</span><button className="delete" onClick={() => deleteProduct(p.id)}>Excluir</button></div>)}</div>
        </div>}

        {section === 'banners' && <div className="panel"><div className="panelTitle"><h2>Banners da página inicial</h2><span>Ative ou desative cada banner</span></div><div className="table">{banners.map(b => <div className="row" key={b.id}><div><b>{b.title}</b><small>{b.text}</small></div><span className={b.active ? 'status on' : 'status'}>{b.active ? 'Ativo' : 'Desativado'}</span><button className="toggle" onClick={() => toggleBanner(b.id)}>{b.active ? 'Desativar' : 'Ativar'}</button></div>)}</div></div>}

        {section === 'categories' && <div className="panel"><h2>Categorias</h2><div className="categoryAdmin">{['Roupas', 'Acessórios', 'Calçados', 'Casa'].map(c => <div key={c}>🏷️ <b>{c}</b></div>)}</div></div>}
        {section === 'orders' && <div className="panel"><h2>Pedidos</h2><div className="empty">🛍️<h3>Nenhum pedido ainda</h3><p>Quando seus clientes comprarem, os pedidos aparecerão aqui.</p></div></div>}
        {section === 'settings' && <div className="panel"><h2>Configurações</h2><label>Nome da loja<input defaultValue="MarketPIX" /></label><label>WhatsApp<input placeholder="(00) 00000-0000" /></label><button className="primaryAdmin">Salvar configurações</button></div>}
      </section>
    </main>
  )
}
