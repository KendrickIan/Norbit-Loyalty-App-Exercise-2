import pgPromise from 'pg-promise';
const pg = pgPromise({});
export const db = pg("postgres://postgres:74165293883@localhost:5432/Norbit");