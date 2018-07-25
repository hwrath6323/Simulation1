UPDATE products
SET 
    product_url = ${url},
    product_name = ${name},
    product_price = ${price}
WHERE id = ${id}