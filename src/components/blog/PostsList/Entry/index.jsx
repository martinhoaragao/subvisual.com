import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import dateFormat from "dateformat"
import _isEmpty from "lodash/isEmpty"

import styles from "./index.module.scss"

const renderAuthor = ({ className, key, name }) => {
  if (!key || !name) return null

  return (
    <Link to={`/blog/author/${key}`} className={className}>
      By {name}
    </Link>
  )
}

function renderTags({ tags }) {
  if (_isEmpty(tags)) return null

  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          <Link to={`/blog/tag/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  )
}

const Entry = ({ author, date, intro, path, tags, title }) => {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")
  const to = path.startsWith("/") ? `/blog${path}` : `/blog/${path}`

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Link to={to}>{title}</Link>
      </div>
      <p className={styles.intro}>
        <Link to={to}>
          <span>{intro}</span>
        </Link>
      </p>
      <div className={styles.info}>
        {renderAuthor({ className: styles.author, ...author })}
        <span className={styles.date}>On {formattedDate}</span>
      </div>
      {renderTags({ tags })}
    </div>
  )
}

Entry.propTypes = {
  author: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  date: PropTypes.instanceOf(Date).isRequired,
  intro: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default Entry
