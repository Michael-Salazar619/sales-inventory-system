import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('Cliente mostrador');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/products').then(({ data }) => {
      setProducts(data);
      setProductId(data[0]?.id || '');
    });
  }, []);

  const selectedProduct = useMemo(() => products.find((product) => product.id === productId), [products, productId]);
  const subtotal = Number(selectedProduct?.price || 0) * Number(quantity || 0);
  const tax = subtotal * 0.19;

  async function createSale() {
    if (!selectedProduct) return;
    await api.post('/sales', {
      customerName,
      tax,
      discount: 0,
      items: [{ productId: selectedProduct.id, quantity: Number(quantity), unitPrice: Number(selectedProduct.price) }]
    });
    setMessage('Venta creada correctamente');
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-bold">Ventas</h1>
      <section className="panel grid gap-4 p-5 md:max-w-xl">
        <input className="input" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <select className="input" value={productId} onChange={(e) => setProductId(e.target.value)}>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name} · stock {product.stock}</option>)}
        </select>
        <input className="input" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <div className="rounded-md bg-slate-50 p-3 text-sm">
          Subtotal: ${subtotal.toFixed(2)} · IVA: ${tax.toFixed(2)} · Total: ${(subtotal + tax).toFixed(2)}
        </div>
        <button className="btn" onClick={createSale}>Crear venta</button>
        {message && <p className="text-sm text-green-700">{message}</p>}
      </section>
    </div>
  );
}
