import { getAllMarkdown, getSectionMarkdown } from 'src/lib/markdown'
import { About, Projects, Layout, Experience, Form } from '@components'
import { useEffect } from 'react'

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
    isMd,
    Data,
    sectionScrollRef,
    ...pageProps
}) {
    Data = {
        isMd: isMd,
        ...pageProps,
        ...Data,
    }

    useEffect(() => window.scrollTo(0, 0))

    return (
        <Layout
            title={Data.id}
            description={Data.description}
            isHome={false}
            isMd={pageProps.isMd}
            scrollRef={sectionScrollRef}
        >
            <SlugToContent {...Data} />
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const data = await getAllMarkdown()
    const paths = [data.about, data.experience, data.projects].map((obj) => {
        const slug = obj.data.slug
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
