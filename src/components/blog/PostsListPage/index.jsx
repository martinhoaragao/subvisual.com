import React from "react"

import Layout from "~/src/components/layout"
import PostsList from "~/src/components/blog/PostsList"
import SEO from "~/src/components/SEO"
import Title from "~/src/components/blog/title"

import styles from "./index.module.scss"

function renderTitle({ title }) {
  if (!title) return null

  return <Title className={styles.title}>{title}</Title>
}

export default ({ seo, title, ...rest }) => (
  <>
    <SEO {...seo} />
    <Layout currentPath="/blog/">
      <div className={styles.root}>
        <div className={styles.content}>
          {renderTitle({ title })}
          <PostsList {...rest} />
        </div>
      </div>
    </Layout>
  </>
)
