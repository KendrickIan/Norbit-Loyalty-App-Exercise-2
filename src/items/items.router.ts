/**
* Required External Modules and Interfaces
*/
import express from "express";
import * as ItemController from "./items.controller";
/**
* Router Definition
*/
export const itemsRouter = express.Router();

// GET ALL Transactions
itemsRouter.get("/get-all-transactions", ItemController.getAllTransactions);

//POST new Transaction
itemsRouter.post("/add-transaction", ItemController.createTransaction);