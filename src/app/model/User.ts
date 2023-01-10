import { Category } from "./Category";
import { UserTransaction } from "./UserTransaction";

export class User{
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    age!: string;
    job!: string;
    categories!: Category[];
    userTransactions!: UserTransaction[];

}