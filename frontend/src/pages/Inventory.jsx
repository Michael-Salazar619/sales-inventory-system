import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/products', { params: { search } }).then(({ data }) => setProducts(data));
  }, [search]);

  return (
    <div className="grid gap-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <h1 className="text-xl font-bold">Inventario</h1>
        <input className="input md:max-w-xs" placeholder="Buscar producto o codigo" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr><th className="p-3">Producto</th><th>Codigo</th><th>Precio</th><th>Stock</th><th>Categoria</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="border-t border-slate-100" key={product.id}>
                <td className="p-3 font-medium">{product.name}</td>
                <td>{product.code}</td>
                <td>${product.price}</td>
                <td className={product.stock <= product.min_stock ? 'font-bold text-red-600' : ''}>{product.stock}</td>
                <td>{product.category_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
