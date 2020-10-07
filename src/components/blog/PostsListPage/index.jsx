import React from "react"
import { Link } from "gatsby"
import _capitalize from "lodash/capitalize"
import _isEmpty from "lodash/isEmpty"

import Layout from "~/src/components/layout"
import PostsList from "~/src/components/blog/PostsList"
import SEO from "~/src/components/SEO"
import Title from "~/src/components/blog/title"

import styles from "./index.module.scss"

function renderFilter(tag) {
  return (
    <li key={tag} className={styles.filtersListItem}>
      <Link to={`/blog/tag/${tag}`}>{_capitalize(tag)}</Link>
    </li>
  )
}

function renderFilters({ tags }) {
  if (_isEmpty(tags)) return null

  return (
    <>
      <div className={styles.filtersTitle}>
        <span className={styles.filtersTitleText}>Filter by:</span>
      </div>
      <ul className={styles.filtersList}>{tags.map(renderFilter)}</ul>
    </>
  )
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
