import React from "react"
import PropTypes from "prop-types"
import _uniqueId from "lodash/uniqueId"
import { motion } from "framer-motion"

import Background from "./Planet/Background"
import useWindowSize from "../../utils/use_window_size"

import styles from "./Planet.module.scss"

const getBoundingBox = (elem) => {
  if (!elem || !elem.getBoundingClientRect) return {}

  return elem.getBoundingClientRect()
}

const getRootInitial = ({ windowSize }) => {
  const { width, height } = windowSize
  const diameter = Math.max(width, height) * 1.5

  return {
    x: width / 2 - diameter / 2,
    y: height / 2 - diameter / 2,
    width: diameter,
    height: diameter,
  }
}

const getRootAnimate = ({ anchors, initial, transition, variant }) => {
  if (variant === "splash") return initial

  const anchor = anchors[variant]
  const boundingBox = getBoundingBox(anchor)
  const { x, y, width, height } = boundingBox

  return {
    x,
    y,
    width,
    height,
    transition,
  }
}

const Planet = ({ children, heroTittle, transition, variant }) => {
  const windowSize = useWindowSize()

  const radialGradientID = _uniqueId("animated-planet-radial-gradient-")
  const rootInitial = getRootInitial({ windowSize })
  const rootAnimate = getRootAnimate({
    anchors: { heroTittle },
    initial: rootInitial,
    variant,
  })

  return (
    <motion.div
      className={styles.root}
      initial={rootInitial}
      animate={rootAnimate}
      transition={transition}
    >
      <svg
        className={styles.image}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
        <circle cx="50" cy="50" r="50" fill={`url(#${radialGradientID})`} />

        <defs>
          <radialGradient
            id={radialGradientID}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(127.684 38.403 29.669) scale(81.6467 85.3669)"
          >
            <stop stopColor="#045cfc" stopOpacity=".6" />
            <stop offset="1" stopColor="#045cfc" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

Planet.propTypes = {
  children: PropTypes.node.isRequired,
  heroTittle: PropTypes.object,
  transition: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
}

Planet.Background = Background

export default Planet
