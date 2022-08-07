import { useEffect, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'

import { Featured_Items } from '@components'
import { slideshow_variants as variants } from '@variants'

const slides = [0, 1, 2]

const Slideshow = ({ contentProps = null }) => {
    const [[currentSlide, direction], setSlide] = useState([0, 0])
    const [reset, SetReset] = useState(false)
    const i = wrap(0, slides.length, currentSlide)
    // ========================
    function detectGesture(e, { offset, velocity }) {
        const swipe = Math.abs(offset.x) * velocity.x
        const nextSlide = currentSlide
        const threshold = 100

        if (swipe < -threshold) {
            paginate(1)
            nextSlide = currentSlide + 1
        } else if (swipe > threshold) {
            paginate(-1)
            nextSlide = currentSlide - 1
        }
    }
    const paginate = (newDirection) => {
        if (
            currentSlide + newDirection < slides.length &&
            currentSlide + newDirection >= 0
        ) {
            // moving , normal
            setSlide([currentSlide + newDirection, newDirection])
        } else if (currentSlide + newDirection === slides.length) {
            // last slide >> first slide
            setSlide([0, newDirection])
        } else if (currentSlide + newDirection === -1) {
            // first slide >> last slide
            setSlide([slides.length - 1, newDirection])
        }
    }
    function handleIndicator(selectedSlide, newDirection) {
        if (!newDirection) newDirection = selectedSlide - currentSlide
        setSlide([selectedSlide, newDirection])
    }
    useEffect(() => {
        if (reset) SetReset(false)

        const interval = setInterval(() => {
            if (currentSlide + 1 === slides.length) {
                setSlide([0, 1])
            } else {
                setSlide([currentSlide + 1, 1])
            }
        }, 9000)
        return () => clearInterval(interval)
    }, [currentSlide, setSlide, reset])
    // ========================
    contentProps = {
        key: currentSlide,
        custom: direction,
        variants: variants,
        initial: 'enter',
        animate: 'display',
        exit: 'exit',
        drag: 'x',
        dragConstraints: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        dragElastic: 1,
        onDragEnd: detectGesture,
        onDrag: () => SetReset(true),
    }

    return (
        <>
            <div className="slideshow">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        className="slide"
                        data-slide={currentSlide}
                        {...contentProps}
                    >
                        <Featured_Items currentSlide={i} />
                    </motion.div>
                </AnimatePresence>
            </div>
            <Indicators
                currentSlide={currentSlide}
                handleIndicator={handleIndicator}
            />
        </>
    )
}
const Indicators = ({ currentSlide, handleIndicator }) => {
    return (
        <LayoutGroup>
            <div className="Indicators">
                {slides.map((item) => (
                    <div key={item} onClick={() => handleIndicator(item)}>
                        <div>
                            {item === currentSlide && (
                                <motion.div layoutId="highlight" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </LayoutGroup>
    )
}
export default Slideshow