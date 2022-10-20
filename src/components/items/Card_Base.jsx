import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import Styled_Button from './StyledButton'
import { cardVariants as variants } from '@motion'

// Motion Variants
const smCardVars = variants.CardSm
const imgVars = variants.Img
const contentVars = variants.Content

// Next Image w/Props
const Styled_Image = ({ src, alt, isAbout, isMd, pRM }) => {
    const Styled_Img = () => (
        <div className="relative aspect-[4/3] w-10/12 overflow-hidden rounded-xl shadow-md md:mx-auto md:mt-6 md:aspect-auto md:h-[90%] md:w-[calc(100%-24px)]">
            <Image
                src={src}
                alt={alt}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                quality={100}
            />
        </div>
    )
    return isMd ? (
        <motion.div
            data-mdimg
            className="relative -z-10 h-full w-1/2 overflow-hidden motion-reduce:z-10 motion-reduce:rounded-[3rem]"
            variants={imgVars}
            custom={pRM ? 0 : isAbout ? '-10%' : '10%'}
        >
            <Styled_Img />
        </motion.div>
    ) : (
        <Styled_Img />
    )
}

// Background clipPath @Media >= 768px
const Md_Bg = ({ anim }) => {
    return (
        <>
            <motion.div
                data-mdbg
                className="absoluteFull rounded-[3rem] bg-grey-90 will-change-transform dark:bg-teal-99"
                initial={false}
                animate={anim}
                variants={variants.MdBg}
            />
            <div className="absolute top-0 h-full bg-grey-90 dark:bg-grey-30" />
        </>
    )
}

const Card_Base = ({ data, isAbout, isMd, expanded, setExpanded }) => {
    const ref = useRef()
    const inView = useInView(ref, { once: true, amount: 0.1 })
    const pRM = useReducedMotion()

    // Animation Trigger
    const anim = !inView ? 'hidden' : expanded ? 'expanded' : 'show'

    // Props
    const styledImageProps = {
        src: data.src,
        alt: data.alt,
        isAbout: isAbout,
        isMd: isMd,
        pRM: pRM,
    }

    return (
        <motion.div
            data-cardbase
            data-expanded={expanded}
            className="full relative md:flex"
            initial={false}
            animate={anim}
            variants={!isMd && smCardVars}
            ref={ref}
        >
            {/** [  Styled-Image  |  Background-Animation ] **/}
            {isMd && (
                <>
                    <Styled_Image {...styledImageProps} />
                    <Md_Bg anim={anim} />
                </>
            )}

            {/** [  Styled-Info  ] **/}
            <motion.div
                className={`relative overflow-hidden   ${
                    isMd
                        ? 'h-full w-1/2    '
                        : 'full rounded-[3rem] bg-gradient_card py-10'
                }`}
                style={{ order: isAbout ? 1 : 2 }}
            >
                <motion.div
                    className={`flex-col-center whitespace-pre-line ${
                        isMd ? `absoluteFull` : ' space-y-4'
                    }`}
                    variants={contentVars}
                    custom={isMd}
                >
                    {/** [  TITLE  ] + [  BRIEF  ] **/}
                    <h3>{data.section}</h3>
                    <p
                        className="text-center text-xl font-medium text-grey-40 dark:text-grey-60 md:text-lg"
                        dangerouslySetInnerHTML={{ __html: data.brief }}
                    />

                    {/** [  IMAGE  ] (mobile only)) **/}
                    {!isMd && <Styled_Image {...styledImageProps} />}

                    {/** [  READ MORE BUTTON  ] **/}
                    <Styled_Button
                        action={() => setExpanded(true)}
                        toTextAt={isMd}
                        allowScroll={isMd ? true : false}
                        btnStyle="py-4 w-3/4 md:hidden"
                        textStyle="mt-20"
                    >
                        Read More
                    </Styled_Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Card_Base