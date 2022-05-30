import {Request, Response} from 'express';
import * as loyaltyService from './items.service'

export function getAllTransactions(req: Request, res: Response) {
    try {
        loyaltyService.getAllTransactions().then(
            (transactions) => {
                res.send(transactions);
            }
        );
      } catch (error) {
          if (error instanceof Error) {
              res.status(500).send(error.message);
          }
      }
};

export function createTransaction(req: Request, res: Response) {
    try {
        let transactionType = req.query.transaction_type;
        const transactionSourceName = req.query.source_name;
        const transactionSourceId = req.query.source_id;
        const customerId = req.query.customer_id;

        loyaltyService.createTransaction(
            transactionType, 
            transactionSourceName, 
            transactionSourceId, 
            customerId
        ).then((transaction) => {
            res.send(transaction);
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
}
