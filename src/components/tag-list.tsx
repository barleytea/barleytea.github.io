import { ComponentType } from "react";
import { Tag } from "./tag";


interface TagListProps {
  tags: NonNullable<
    NonNullable<
      Queries.postsPaginationQuery["allMarkdownRemark"]["nodes"][number]["frontmatter"]
    >["tags"]
  >;
}

export const TagList: ComponentType<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap [&>*]:my-0.5 [&>*]:mx-1">
      {tags.map((t) => {
        if (!t) {
          throw new Error("Invalid tag")
        }
        return <Tag key={t} name={t} />
      })}
    </div>
  )
}