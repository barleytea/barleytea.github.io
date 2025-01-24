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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.id} to={post.frontmatter.path} className="no-underline">
          <article className="card h-full">
            <div className="card-image aspect-video">
              <GatsbyImage
                image={post.frontmatter.eyecatcher.childImageSharp.gatsbyImageData}
                alt={post.frontmatter.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-content">
              <h4>{post.frontmatter.title}</h4>
              <time dateTime={post.frontmatter.created}>
                {post.frontmatter.created}
              </time>
              <div className="tags">
                {post.frontmatter.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
} 