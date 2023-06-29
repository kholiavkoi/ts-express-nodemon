import { Request, Response, Router } from "express";

const addresses = [{ id: 1, value: 'Alma-atynska' }, { id: 2, value: 'Tyraspolska' }]

export const addressesRouter = Router()

addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addresses.find(ad => ad.id === +req.params.id)
    if (address) {
        res.status(200).send(address)
    } else {
        res.status(404).send({ message: 'No such address' })
    }
})
