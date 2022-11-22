import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { useMediaQuery } from '@hooks'
import { experienceMotion } from '@motion'
const variants = experienceMotion.Certs

const AccordionContent = ({ Links, desc, isMd }) => (
    <>
        <p className="p-4 text-sm">{desc}</p>
        {Links.map(([href, text], i) => (
            <a
                key={`cert-link-${i}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`whitespace-nowrap px-2 py-1
                                                    ${
                                                        isMd
                                                            ? 'styled_link'
                                                            : 'styled-btn'
                                                    }
                                                `}
            >
                {text}&nbsp;&raquo;
            </a>
        ))}
    </>
)

const Cert_Image = ({ title, src }) => (
    <motion.div
        className="relative mx-auto flex aspect-[22.05/17] w-[90%] overflow-hidden rounded-3xl shadow-md"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={variants.image}
    >
        <Image
            src={src}
            alt={`${title} certification image`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/assets/certifications/blurDataCertificate.png"
        />
    </motion.div>
)

const Certifications = ({ ...data }) => {
    const isMd = useMediaQuery(768)
    const [activeItem, setActiveItem] = useState(isMd ? 0 : 100)
    const certs = data.certifications

    return (
        <div className="flex-top full relative">
            <ul className="md:flex-col-top w-full space-y-2 overflow-hidden md:h-[550px]">
                {certs.map(([title, desc, sitename, href, src], i) => {
                    const ACTIVE = activeItem === i
                    const Links = [
                        [href, sitename],
                        [src, 'View Certificate'],
                    ]
                    const handleClick = () => {
                        if (isMd & ACTIVE) return
                        setActiveItem(ACTIVE ? 100 : i)
                    }

                    return (
                        <motion.li
                            layout="size"
                            key={`certification-${i}`}
                            className="overflow-hidden rounded-2xl bg-grey-10 p-1 md:w-full md:p-0"
                        >
                            {/** [  CLICKABLE LIST  ] **/}

                            <p
                                className="list-item-bg cursor-pointer rounded-t-2xl p-2"
                                data-active={ACTIVE}
                                onClick={handleClick}
                            >
                                {title}
                            </p>

                            {/** [  EXPANDED INFO  ] **/}
                            <AnimatePresence mode="wait" initial={false}>
                                {ACTIVE & (activeItem !== 100) && (
                                    <motion.div
                                        key={`cert-content-${i}`}
                                        className="flex-col-top"
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={variants.accordion}
                                    >
                                        {/** [  MOBILE LAYOUT  ] **/}
                                        <AccordionContent
                                            Links={Links}
                                            desc={desc}
                                            isMd={isMd}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.li>
                    )
                })}
            </ul>
            {/** [  MD LAYOUT  ] **/}
            {isMd ? (
                <div
                    className="flex-col-center sticky top-[25%] mb-44 w-full md:top-[50%]  xl:top-0"
                    style={{ position: '-webkit-sticky' }}
                >
                    <AnimatePresence mode="wait">
                        {activeItem !== 100 && (
                            <Cert_Image
                                key={`certimg-${activeItem}`}
                                title={certs[activeItem][0]}
                                src={certs[activeItem][4]}
                            />
                        )}
                    </AnimatePresence>
                </div>
            ) : null}
        </div>
    )
}

export default Certifications