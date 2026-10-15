const defaultRequiredTextFields = ['title', 'price', 'image'];

export const validateProducts = (products, requiredTextFields = defaultRequiredTextFields) => {
  if (!Array.isArray(products)) {
    throw new TypeError('La extracción debe devolver una lista de productos.');
  }

  if (products.length === 0) {
    throw new Error('No se encontraron productos; verifica los selectores del catálogo.');
  }

  products.forEach((product, index) => {
    requiredTextFields.forEach((field) => {
      if (typeof product?.[field] !== 'string' || product[field].trim() === '') {
        throw new Error(`El producto ${index + 1} no tiene un valor válido en "${field}".`);
      }
    });
  });

  return products;
};
