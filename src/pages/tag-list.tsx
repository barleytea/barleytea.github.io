import { Link, PageProps, graphql } from "gatsby";
import { Layout } from "../components/layout";

const TagList = ({ data }: PageProps<Queries.getAllTagsQuery>) => {
  return (
    <Layout>
      <h1 className="my-4 text-xl text-[color:var(--text-color)]">タグ一覧</h1>
      <ul className="flex flex-wrap">
        {data.tags.group.map((t) => (
          <li key={t.tag} className="my-1 mx-2 text-[color:var(--primary-color)] hover:invert">
            <Link to={`/tag-list/${t.tag}`}>
              {t.tag}({t.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TagList;

export const allTags = graphql`
  query getAllTags {
    tags: allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;