import { Request, Response, Router } from "express";
import { productsRepository } from "../repositories/products-repository";

export const productsRouter = Router()

productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.getProductById(+req.params.id)
    if (product) {
        res.status(200).send(product)
    } else {
        res.status(404).send({ message: 'There is no product' })
    }
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const updatedProduct = productsRepository.getProductById(+req.params.id)
        res.status(200).send(updatedProduct)
    } else {
        res.status(404).send({ message: 'There is no product' })
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        return res.send(204)
    } else {
        return res.send(404)
    }
})
