import { Request, Response, Router } from "express";
import { productsRepository } from "../repositories/products-repository";
import { body, validationResult } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middlware";

export const productsRouter = Router()

const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 10
}).withMessage('Title length should be from 3 to 10 symbols')


productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.post('/', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
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

productsRouter.put('/:id', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
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
