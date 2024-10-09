import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import Lp, { CreateOrUpdateLp } from "../entities/Lp";

// LpResolver is a class that must list all queries and mutations related to an Lp object
@Resolver()
export class LpResolver {
  @Query(() => [Lp])
  lpsQuery(@Arg("category", { nullable: true }) category: number) {
    return Lp.getAllLps(category ?? undefined);
  }

  @Query(() => Lp)
  // this query takes an id as parameter which is of ID type-graphql and is linked to the id used by the method function
  lpByIdQuery(@Arg("id", () => ID) id: string) {
    return Lp.getLpById(id);
  }

  // this mutation takes as a parameter the data of CreateLp type that are defined in the entity
  @Mutation(() => Lp)
  createLpMutation(@Args() args: CreateOrUpdateLp) {
    return Lp.saveNewLp(args);
  }

  // this mutation takes two parameters, the first being the id of the item, the second being the data sent
  @Mutation(() => Lp)
  updateLpMutation(
    @Arg("id", () => ID) id: string,
    @Args() args: CreateOrUpdateLp
  ) {
    return Lp.updateLp(id, args);
  }

  @Mutation(() => Lp)
  // why is it asynchrone ?
  async deleteLpMutation(@Arg("id", () => ID) id: string) {
    return Lp.deleteLp(id);
  }
}
