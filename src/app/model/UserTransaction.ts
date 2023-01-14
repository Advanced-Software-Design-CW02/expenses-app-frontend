import { Transaction } from './Transaction';
import { User } from './User';

export class UserTransaction{
    id!: number;
    user!: User;
    transaction!: Transaction;
    note!: string;
    date!: string;
    status!: string;

}