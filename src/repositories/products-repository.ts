let products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }, { id: 3, title: 'apple' }]

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if (title) {
            return products.filter(p => p.title.includes(title))
        } else {
            return products
        }
    },
    getProductById(id: number) {
        return products.find(p => p.id === id)
    },
    createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title
        }
        products.push(newProduct)
        
        return newProduct
    },
    updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: number) {
        const initialLength = products.length
        products = products.filter(p => p.id !== id)
        
        return initialLength !== products.length;
    }
}