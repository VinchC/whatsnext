import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import Tag, { CreateOrUpdateTag } from "../entities/Tag";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  getAllTagsQuery() {
    return Tag.getAllTags();
  }

  @Query(() => Tag)
  getTagByIdQuery(@Arg("id", () => ID) id: string) {
    return Tag.getTagById(id);
  }

  @Mutation(() => Tag)
  createTagMutation(@Args() args: CreateOrUpdateTag) {
    return Tag.saveNewTag(args);
  }

  @Mutation(() => Tag)
  updateTagMutation(
    @Arg("id", () => ID) id: string,
    @Args() args: CreateOrUpdateTag
  ) {
    return Tag.updateTag(id, args);
  }

  @Mutation(() => Tag)
  async deleteTagMutation(@Arg("id", () => ID) id: string) {
    return Tag.deleteTag(id);
  }
}
