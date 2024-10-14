import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import Tag, { CreateOrUpdateTag } from "../entities/Tag";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  tags() {
    return Tag.getAllTags();
  }

  @Query(() => Tag)
  tagById(@Arg("id", () => ID) id: string) {
    return Tag.getTagById(id);
  }

  @Mutation(() => Tag)
  createTag(@Args() args: CreateOrUpdateTag) {
    return Tag.saveNewTag(args);
  }

  @Mutation(() => Tag)
  updateTag(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdateTag) {
    return Tag.updateTag(id, args);
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id", () => ID) id: string) {
    return Tag.deleteTag(id);
  }
}
