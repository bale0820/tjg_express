import { CategorySub } from "./categorySub";

export interface CategoryMain {
    id : number,
    name : string,
    subCategories : CategorySub[] 
}