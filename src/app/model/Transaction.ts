import { Category } from './Category';
import { UserTransaction } from './UserTransaction';
export class Transaction{
    id!: number;
    baseType!: string;
    source!: string;
    amount!: number;
    userTransactions!: UserTransaction[];
    categories!: Category[];
}