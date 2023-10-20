import { PageProps, graphql } from "gatsby";
import { TagListContext } from "../../gatsby-node";
import { Layout } from "../components/layout";
import { CardList } from "../components/card-list";

const PostsByTag = ({
  data,
  pageContext,
}: PageProps<Queries.postsByTagQuery, TagListContext>) => {
  return (
    <Layout>
      <h1 className="my-4 text-xl text-[color:var(--text-color)]">{pageContext.tag} の記事一覧</h1>
      <CardList nodes={data.allMarkdownRemark.nodes} />
    </Layout>
  );
};

export default PostsByTag;

export const postsPaginationQuery = graphql`
  query postsByTag($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { frontmatter: { created: DESC } }
    ) {
      nodes {
        frontmatter {
          path
          title
          created
          tags
          eyecatcher {
            childImageSharp {
              gatsbyImageData(width: 300, height: 300)
            }
          }
        }
        id
      }
    }
  }
`;