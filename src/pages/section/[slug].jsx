import { getAllMarkdown, getSectionMarkdown } from 'src/lib/markdown'
import {
    About,
    Projects,
    Layout,
    Experience,
    Form,
    Section_Hero,
} from '@components'
import { useEffect } from 'react'
import { themeConfig } from 'twTheme'
import { layoutVariants } from '@motion'

const SlugToContent = ({ ...data }) => {
    switch (data.id) {
        case 'about':
            return <About {...data} />
        case 'experience':
            return <Experience {...data} />
        case 'projects':
            return <Projects {...data} />
        case 'contact':
            return <Form {...data} />
        default:
            return null
    }
}

export default function SectionPage({
    activeSection,
    isLg,
    isMd,
    isRouting,
    Data,
    ...pageProps
}) {
    Data = {
        isMd: isMd,
        isLg: isLg,
        ...pageProps,
        ...Data,
    }
    const heroData = Data.id == 'projects' ? Data.projects.data : Data.data
    const title = Data.id.charAt(0).toUpperCase() + Data.id.slice(1)
    const bgColor = themeConfig.getSectionColor(activeSection)

    useEffect(() => window.scrollTo({ top: 0, behavior: 'auto' }))

    return (
        <Layout
            title={title}
            description={Data.description}
            variants={layoutVariants[isLg ? 'SectionPage' : 'Mobile']}
        >
            {isLg && (
                <Section_Hero
                    key={`${Data.id}-hero`}
                    even={activeSection % 2 == 0}
                    bgColor={bgColor}
                    isRouting={isRouting}
                    isLg={isLg}
                    {...heroData}
                />
            )}
            <div
                id={`${Data.id}-section-content`}
                data-reading-section
                className={`flex-col-center relative mx-auto h-auto min-h-screen w-full gap-y-24 px-2 py-14 lg:px-12 ${
                    Data.id !== 'projects' && 'max-w-[1200px]'
                }`}
            >
                <SlugToContent {...Data} />
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const data = await getAllMarkdown()
    const paths = [data.about, data.experience, data.projects].map((obj) => {
        const slug = obj.data.id
        return { params: { slug } }
    })
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const Data = await getSectionMarkdown(params.slug)
    return {
        props: { Data },
    }
}
