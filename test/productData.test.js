import assert from 'node:assert/strict';
import test from 'node:test';
import { validateProducts } from '../src/productData.js';

const validProduct = {
  title: 'Mechanical Keyboard',
  price: '$79.99',
  priceWhole: '79',
  image: 'https://example.com/keyboard.jpg',
};

test('accepts products with required text fields', () => {
  const products = [validProduct];

  assert.equal(validateProducts(products), products);
});

test('accepts a different required schema for JSON products', () => {
  const products = [{ name: 'Sticker', price: '$5.00', image: 'https://example.com/sticker.jpg' }];

  assert.equal(validateProducts(products, ['name', 'price', 'image']), products);
});

test('rejects a non-array result', () => {
  assert.throws(() => validateProducts(null), {
    name: 'TypeError',
    message: 'La extracción debe devolver una lista de productos.',
  });
});

test('rejects an empty result with selector guidance', () => {
  assert.throws(() => validateProducts([]), /verifica los selectores/);
});

test('rejects missing or empty required fields', () => {
  assert.throws(() => validateProducts([{ ...validProduct, title: '  ' }]), /no tiene un valor válido en "title"/);
});

test('rejects required fields with non-string values', () => {
  assert.throws(() => validateProducts([{ ...validProduct, price: 79.99 }]), /no tiene un valor válido en "price"/);
});
