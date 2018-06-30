INSERT INTO products (
    product_url,
    product_name,
    product_price
)
VALUES (
    ${url},
    ${name},
    ${price}
);


SELECT * FROM products 
ORDER BY id DESC 
LIMIT 1; 