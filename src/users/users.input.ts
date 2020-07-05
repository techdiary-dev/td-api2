import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LinksInput {
  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  link?: string;
}

@InputType()
export class WorkInfoInput {
  @Field()
  name: string;

  @Field()
  designation: string;

  @Field()
  startTime: string;

  @Field({ nullable: true })
  endTime?: string;
}

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  profilePhoto?: string;

  @Field({ nullable: true })
  education?: string;

  @Field({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [LinksInput], { nullable: true })
  links?: LinksInput[];

  @Field(() => [String], { nullable: true })
  skills?: string[];

  @Field(() => [WorkInfoInput], { nullable: true })
  workInfo?: WorkInfoInput[];
}
