import { Transaction } from './Transaction';
import { User } from './User';

export class Category{
      id!: number;
      name!: string;
      budget!: number;
      transaction!: Transaction;
      type!:string
      user!: User;
}