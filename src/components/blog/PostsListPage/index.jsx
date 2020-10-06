import React from "react"
import _isEmpty from "lodash/isEmpty"

import Layout from "~/src/components/layout"
import PostsList from "~/src/components/blog/PostsList"
import SEO from "~/src/components/SEO"
import Title from "~/src/components/blog/title"

import styles from "./index.module.scss"

function renderFilters({ tags }) {
  if (_isEmpty(tags)) return null

  return <span>Filter by</span>
}

function renderTitle({ title }) {
  if (!title) return null

  return <Title className={styles.title}>{title}</Title>
}

export default ({ seo, tags, title, ...rest }) => (
  <>
    <SEO {...seo} />
    <Layout currentPath="/blog/">
      <div className={styles.root}>
        <div className={styles.filters}>{renderFilters({ tags })}</div>
        <div className={styles.posts}>
          {renderTitle({ title })}
          <PostsList {...rest} />
        </div>
      </div>
    </Layout>
  </>
)
