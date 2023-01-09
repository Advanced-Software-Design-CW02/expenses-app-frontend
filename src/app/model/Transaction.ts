import { Category } from './Category';
export class Transaction{
    id:number;
    baseType :string;
    source :string;
    amount :number;
    userTransactions :UserTransaction[];
    categories : Category[];
}