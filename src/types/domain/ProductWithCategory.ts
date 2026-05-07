
import { CategorySub } from "./categorySub";
import { Product } from "./product";
import { User } from "./user";

export interface ProductWithCategory extends Product {
  categorySub: CategorySub;
  user : {id : number};
}