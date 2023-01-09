import { Category } from "./Category";

export class User{
    id:number;
    firstName :string;
    lastName: string;
    email :string;
    age :string;
    job :string;
    categories :Category[];
    userTransactions : UserTransaction [];

}