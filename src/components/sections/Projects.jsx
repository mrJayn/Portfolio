import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@components'
import data from '@data'

const threshold = 100

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        transition: { duration: 0.25, ease: 'easeIn' },
    }),
    active: {
        x: 0,
        opacity: 1,
        transition: { delay: 0.25 },
    },
    exit: (direction) => ({
        x: direction > 0 ? '-100%' : '100%',
        opacity: 0,
        transition: { duration: 0.25, ease: 'easeIn' },
    }),
}

const slides = [...Array(data.projects.length).keys()]

const Projects = () => {
    const [[currentSlide, direction], setCurrentSlide] = useState([0, 0])

    function detectGesture(e, { offset }) {}

    const paginate = (newDirection) => {}

    return (
        <Section id="projects" count={false} subsection={true}>
            <h3>Other Projects by Me</h3>
            <div className="projects-slider-container">
                <AnimatePresence custom={direction}>
                    <motion.div
                        className="project-slide"
                        key={currentPage}
                        data-page={currentPage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="active"
                        exit="exit"
                        drag="x"
                        onDrag={detectPaginationGesture}
                        onDragEnd={detectGesture}
                        dragConstraints={{ left: 0, right: 0 }}
                    ></motion.div>
                </AnimatePresence>
            </div>
        </Section>
    )
}

const SlideSelectors = ({ currentSlide, setPage }) => {
    return (
        <AnimateSharedLayout>
            <div className="Indicators">
                {pages.map((page) => (
                    <Indicator
                        key={page}
                        onClick={() => setPage(page)}
                        isSelected={page === currentSlide}
                    />
                ))}
            </div>
        </AnimateSharedLayout>
    )
}

const Indicator = ({ isSelected, onClick }) => {
    return (
        <div className="Indicator-container" onClick={onClick}>
            <div className="Indicator">
                {isSelected && (
                    <motion.div
                        className="Indicator-highlight"
                        layoutId="highlight"
                    />
                )}
            </div>
        </div>
    )
}

export default Projects
