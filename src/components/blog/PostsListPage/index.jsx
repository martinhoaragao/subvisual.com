import React from "react"

import Layout from "~/src/components/layout"
import PostsFilter from "~/src/components/blog/PostsFilter"
import PostsList from "~/src/components/blog/PostsList"
import SEO from "~/src/components/SEO"
import Title from "~/src/components/blog/title"

import styles from "./index.module.scss"

function renderTitle({ title }) {
  if (!title) return null

  return <Title className={styles.title}>{title}</Title>
}

export default ({ seo, tags, title, ...rest }) => (
  <>
    <SEO {...seo} />
    <Layout currentPath="/blog/">
      <div className={styles.root}>
        <PostsFilter className={styles.filters} tags={tags} />
        <div className={styles.posts}>
          {renderTitle({ title })}
          <PostsList {...rest} />
        </div>
      </div>
    </Layout>
  </>
)
