import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image'

interface Post {
  id: string
  frontmatter: {
    title: string
    created: string
    path: string
    tags: string[]
    category: string
    eyecatcher: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

interface PostListProps {
  posts: Post[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="columns is-multiline">
      {posts.map((post) => (
        <div key={post.id} className="column is-one-third">
          <Link to={post.frontmatter.path}>
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <GatsbyImage
                    image={post.frontmatter.eyecatcher.childImageSharp.gatsbyImageData}
                    alt={post.frontmatter.title}
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>{post.frontmatter.title}</h4>
                  <time dateTime={post.frontmatter.created}>
                    {post.frontmatter.created}
                  </time>
                  <div className="tags">
                    {post.frontmatter.tags.map((tag) => (
                      <span key={tag} className="tag is-light">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
} 