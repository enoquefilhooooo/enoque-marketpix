'use client'

import { useEffect, useState } from 'react'

type CartItem = { id:number; name:string; price:number; qty:number }

export default function Checkout(){
  const [items,setItems]=useState<CartItem[]>([])
  const [copied,setCopied]=useState(false)
  const [pixKey,setPixKey]=useState('')

  useEffect(()=>{
    try{
      setItems(JSON.parse(localStorage.getItem('marketpix-cart')||'[]'))
      setPixKey(localStorage.getItem('marketpix-pix-key')||'')
    }catch{}
  },[])

  const total=items.reduce((s,i)=>s+i.price*i.qty,0)
  const pixText=pixKey||'Configure sua chave PIX no painel administrativo'

  function copy(){
    if(!pixKey)return
    navigator.clipboard?.writeText(pixKey)
    setCopied(true)
    setTimeout(()=>setCopied(false),1800)
  }

  return <main className="checkoutPage"><div className="checkoutBox"><a href="/" className="checkoutLogo">Market<span>PIX</span></a><h1>Finalizar compra</h1>{items.length===0?<><p>Seu carrinho está vazio.</p><a href="/" className="checkoutButton">Voltar para a loja</a></>:<><div className="checkoutItems">{items.map(i=><div className="checkoutItem" key={i.id}><span>{i.name} × {i.qty}</span><b>R$ {(i.price*i.qty).toFixed(2).replace('.',',')}</b></div>)}</div><div className="total"><span>Total</span><strong>R$ {total.toFixed(2).replace('.',',')}</strong></div><div className="pixCard"><div className="pixIcon">PIX</div><h2>Pagamento via PIX</h2><p>Copie a chave PIX abaixo e faça o pagamento no seu banco.</p><div className="pixKey">{pixText}</div><button className="checkoutButton" onClick={copy}>{copied?'Chave copiada!':'Copiar chave PIX'}</button></div><p className="notice">Após o pagamento, envie o comprovante pelo WhatsApp da loja.</p></>}</div></main>
}
