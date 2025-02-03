import { sdk } from "../config";

export async function getProductslist() {
    try {
        const response = await sdk.admin.product.list({
            limit: 10,
            offset: 0
        });
        
        // Return the products data to React Query
        return response.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}
