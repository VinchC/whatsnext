import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import Lp, { CreateOrUpdateLp } from "../entities/Lp";

@Resolver()
export class LpResolver {
  @Query(() => [Lp])
  lps(@Arg("category", { nullable: true }) category: number) {
    return Lp.getAllLps(category ?? undefined);
  }

  @Query(() => Lp)
  lpById(@Arg("id", () => ID) id: string) {
    return Lp.getLpById(id);
  }

  @Mutation(() => Lp)
  createLp(@Args() args: CreateOrUpdateLp) {
    return Lp.saveNewLp(args);
  }

  @Mutation(() => Lp)
  updateLp(
    @Arg("id", () => ID) id: string,
    @Args() args: CreateOrUpdateLp
  ) {
    return Lp.updateLp(id, args);
  }

  @Mutation(() => Lp)
  // why is it asynchrone ?
  async deleteLp(@Arg("id", () => ID) id: string) {
    return Lp.deleteLp(id);
  }
}
