import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Lp from "../entities/Lp";

// LpResolver is a class that must list all queries and mutations related to an Lp object
@Resolver()
export class LpResolver {
  @Query(() => [Lp])
  lps(@Arg("category", { nullable: true }) category: number) {
    return Lp.getAllLps(category ?? undefined);
  }

  @Query(() => Lp)
  lp() {
    //...
  }

  @Mutation(() => Lp)
  createLpMutation() {
    //...
  }
}
