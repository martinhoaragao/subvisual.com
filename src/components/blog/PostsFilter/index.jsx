import React from "react"
import { Link } from "gatsby"
import _capitalize from "lodash/capitalize"
import _isEmpty from "lodash/isEmpty"

import styles from "./index.module.scss"

function renderFilter(tag) {
  return (
    <li key={tag} className={styles.filter}>
      <Link to={`/blog/tag/${tag}/`}>{_capitalize(tag)}</Link>
    </li>
  )
}

export default ({ className, tags }) => {
  if (_isEmpty(tags)) return null

  return (
    <div className={className}>
      <div className={styles.title}>
        <span className={styles.titleText}>Filter by:</span>
      </div>
      <ul className={styles.filters}>
        <li className={styles.filter}>
          <Link to="/blog/">All</Link>
        </li>
        {tags.map(renderFilter)}
      </ul>
    </div>
  )
}
