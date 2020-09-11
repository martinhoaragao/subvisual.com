import React from "react"
import PropTypes from "prop-types"

import Entry from "./Entry"

import styles from "./index.module.scss"

const renderItem = ({ author, date, intro, path, tags, title }, index) => (
  <li key={index} className={styles.item}>
    <Entry {...{ author, date, intro, path, tags, title }} />
  </li>
)

const BlogPostsList = ({ posts }) => (
  <ol className={styles.root}>{posts.map(renderItem)}</ol>
)

BlogPostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.object,
      date: PropTypes.instanceOf(Date).isRequired,
      intro: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default BlogPostsList
