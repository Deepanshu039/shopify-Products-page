export async function getProductsData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    return await response.json();
  } catch (error) {
    return [];
  }
}
