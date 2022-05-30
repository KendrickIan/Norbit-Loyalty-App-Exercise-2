// src/items/items.service.ts

/**
* Data Model Interfaces
*/
import {db} from '../connection';

/**
* Service Methods
*/
export const getAllTransactions = async () => {
    return await db.query(`SELECT * FROM transaction_table`);
};

export const createTransaction = async (
    transactionType: string, 
    transactionSourceName: string, 
    transactionSourceId: string,
    customerId: number
) => {

    // console.log(transactionType);
    // console.log(transactionSourceName);
    // console.log(transactionSourceId);
    // console.log(customerId);
    let customerDetails = await db.query(`SELECT * FROM customer_table WHERE id = ${customerId}`);

// if below can be converted to a function pero nexttime nalang, sad
    if (transactionType === "spend") {
        let getPointsCost = await db.query(`
            SELECT points_cost 
            FROM source_table st 
            LEFT JOIN transaction_table tt 
                ON tt.source_id = st.source_id
            WHERE st.source_id = '${transactionSourceId}'`
        );
console.log(customerDetails[0].customer_name, "NAME???");

        if(parseInt(customerDetails[0].points_earned) >= parseInt(getPointsCost[0].points_cost)) {
            let totalPoints = parseInt(customerDetails[0].points_earned) - parseInt(getPointsCost[0].points_cost);
            return await db.query(`
                INSERT INTO transaction_table (customer_name, customer_total_points, source_name, source_id)
                VALUES ('${customerDetails[0].customer_name}', ${totalPoints}, '${transactionSourceName}', '${transactionSourceId}')`)
        }
    } else if (transactionType === "earn") {
        let qrPoints: number[] = [10, 20, 30, 40, 50, 69, 70, 80, 90, 100];
        let totalPoints = parseInt(customerDetails[0].points_earned) + qrPoints[Math.floor(Math.random() * qrPoints.length)];
            return await db.query(`
                INSERT INTO transaction_table (customer_name, customer_total_points, source_name, source_id)
                VALUES ('${customerDetails[0].customer_name}', ${totalPoints}, null, null)`
            );
    }
};