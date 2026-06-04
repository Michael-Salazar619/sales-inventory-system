INSERT INTO users (name, email, password_hash, role) VALUES
('Admin Demo', 'admin@demo.com', '$2a$12$jYvMEcf1L0y.luYkUEJss.XWLZmlBhm/fDcfI9EClc4D2C1Zr45fq', 'admin'),
('Supervisor Demo', 'supervisor@demo.com', '$2a$12$jYvMEcf1L0y.luYkUEJss.XWLZmlBhm/fDcfI9EClc4D2C1Zr45fq', 'supervisor'),
('Empleado Demo', 'empleado@demo.com', '$2a$12$jYvMEcf1L0y.luYkUEJss.XWLZmlBhm/fDcfI9EClc4D2C1Zr45fq', 'empleado')
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;

INSERT INTO categories (name) VALUES ('Tecnologia'), ('Oficina'), ('Hogar')
ON CONFLICT (name) DO NOTHING;

INSERT INTO suppliers (name, email, phone) VALUES
('Tech Supply SAS', 'ventas@techsupply.test', '+57 300 000 0000'),
('OfiMarket', 'contacto@ofimarket.test', '+57 301 000 0000')
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (name, code, description, price, stock, min_stock, category_id, supplier_id, image_url)
SELECT product.name, product.code, product.description, product.price, product.stock, product.min_stock, c.id, s.id, product.image_url
FROM (
  VALUES
    ('Laptop empresarial', 'PROD-001', 'Equipo portatil para oficina y ventas', 2800.00, 14, 5, 'Tecnologia', 'Tech Supply SAS', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'),
    ('Monitor 24 pulgadas', 'PROD-002', 'Monitor LED Full HD para estaciones de trabajo', 640.00, 22, 6, 'Tecnologia', 'Tech Supply SAS', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf'),
    ('Teclado mecanico', 'PROD-003', 'Teclado profesional retroiluminado', 180.00, 35, 8, 'Tecnologia', 'Tech Supply SAS', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3'),
    ('Mouse ergonomico', 'PROD-004', 'Mouse inalambrico para productividad', 95.00, 48, 10, 'Tecnologia', 'Tech Supply SAS', 'https://images.unsplash.com/photo-1527814050087-3793815479db'),
    ('Impresora multifuncional', 'PROD-005', 'Impresora con escaner para oficina', 920.00, 9, 3, 'Tecnologia', 'Tech Supply SAS', 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6'),
    ('Router empresarial', 'PROD-006', 'Router de alto rendimiento para sucursales', 390.00, 13, 4, 'Tecnologia', 'Tech Supply SAS', 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2'),
    ('Silla ergonomica', 'PROD-007', 'Silla ajustable para jornadas largas', 760.00, 17, 5, 'Oficina', 'OfiMarket', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'),
    ('Escritorio ejecutivo', 'PROD-008', 'Escritorio moderno para oficina', 1150.00, 8, 3, 'Oficina', 'OfiMarket', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'),
    ('Archivador metalico', 'PROD-009', 'Archivador de tres gavetas con llave', 420.00, 12, 4, 'Oficina', 'OfiMarket', 'https://images.unsplash.com/photo-1517705008128-361805f42e86'),
    ('Caja de papel A4', 'PROD-010', 'Resma multiple de papel blanco para oficina', 145.00, 60, 15, 'Oficina', 'OfiMarket', 'https://images.unsplash.com/photo-1586449480558-33ae5203f02c'),
    ('Calculadora financiera', 'PROD-011', 'Calculadora para contabilidad y ventas', 120.00, 24, 6, 'Oficina', 'OfiMarket', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71'),
    ('Cafetera compacta', 'PROD-012', 'Cafetera para sala de descanso empresarial', 260.00, 10, 3, 'Hogar', 'OfiMarket', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'),
    ('Dispensador de agua', 'PROD-013', 'Dispensador frio/caliente para oficina', 690.00, 7, 2, 'Hogar', 'OfiMarket', 'https://images.unsplash.com/photo-1523362628745-0c100150b504'),
    ('Lampara LED escritorio', 'PROD-014', 'Lampara ajustable de bajo consumo', 135.00, 28, 7, 'Hogar', 'OfiMarket', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c'),
    ('Organizador modular', 'PROD-015', 'Organizador para documentos y accesorios', 85.00, 40, 10, 'Oficina', 'OfiMarket', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72')
) AS product(name, code, description, price, stock, min_stock, category_name, supplier_name, image_url)
JOIN categories c ON c.name = product.category_name
JOIN suppliers s ON s.name = product.supplier_name
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  stock = EXCLUDED.stock,
  min_stock = EXCLUDED.min_stock,
  category_id = EXCLUDED.category_id,
  supplier_id = EXCLUDED.supplier_id,
  image_url = EXCLUDED.image_url;
