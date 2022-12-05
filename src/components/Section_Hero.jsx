import { motion } from 'framer-motion'
import { sectionHeroVariants as variants } from '@motion'
import { Styled } from '@components'

const BgDecorations = ({ even }) =>
    [true, false].map((bool, i) => (
        <motion.div
            key={`decoration-${i}`}
            className={`flex-center absolute -z-10 h-3/4 w-full ${
                bool ? 'top-0 bg-slate-40/25 ' : 'bottom-0 bg-slate-90/50'
            } ${
                even
                    ? bool
                        ? 'left-0 origin-left rounded-br-full'
                        : ' right-0 origin-right rounded-tl-full'
                    : bool
                    ? 'right-0 origin-right rounded-bl-full'
                    : 'left-0 origin-left rounded-tr-full'
            }`}
            variants={variants.Items}
            custom={bool ? !even : even}
        />
    ))

const Section_Hero = ({ even, bgColor, isMd, isRouting, ...data }) => {
    const isProjectsSection = data.id == 'projects'
    return (
        <>
            <div
                id={`${data.id}Page-hero`}
                className="relative h-auto w-full py-3 md:flex md:h-screen md:overflow-hidden md:py-0"
                style={{ backgroundColor: bgColor }}
            >
                {!isProjectsSection && (
                    <Styled.Image
                        src={data.src}
                        alt={data.alt}
                        style={{
                            marginLeft: even ? 'auto' : 0,
                            marginRight: even ? 0 : 'auto',
                            zIndex: 1,
                            borderRadius: 0,
                            opacity: 0.25,
                        }}
                    />
                )}

                <motion.div
                    className="flex-col-center absolute inset-0 z-20 gap-y-8 text-center"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={variants.Container}
                >
                    <motion.h2
                        className="relative animate-none text-8xl"
                        variants={variants.Items}
                    >
                        {data.title}
                        <motion.span
                            className="styled-underline left-0 w-full origin-center"
                            variants={variants.Decoration}
                        />
                    </motion.h2>

                    <motion.p
                        className="origin-center text-4xl leading-10 text-white"
                        variants={variants.Items}
                    >
                        {data.description}
                    </motion.p>
                    <BgDecorations even={even} />
                </motion.div>
            </div>
        </>
    )
}
export default Section_Hero