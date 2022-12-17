import { useState, useRef } from 'react'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { ToastContainer } from 'react-toastify'

import { Navbar, Loader } from '@components'
import { useIsRouting, useMediaQuery, useScreenOrientation } from '@hooks'

import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const isHome = router.pathname === '/'
    const url = `https://mikejayne.com/Portfolio${router.pathname}`

    const [isLoading, setIsLoading] = useState(isHome)
    const [activeSection, setSection] = useState(0)
    const [isSm, isMd, isLg] = useMediaQuery(414, 768, 1024)
    const isRouting = useIsRouting(true)

    // Page Properties
    pageProps = {
        isHome: isHome,
        isFirstLoad: useRef(true),
        isRouting: isRouting,
        isSm: isSm,
        isMd: isMd,
        isLg: isLg,
        screenOrientation: useScreenOrientation(),
        activeSection: activeSection,
        setSection: setSection,
        ...pageProps,
    }
    return (
        <>
            <Head>
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="./assets/favicon.ico"
                />
            </Head>
            <DefaultSeo
                titleTemplate="Mike Jayne | %s"
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url,
                    description:
                        'The personal portfolio for Michael Jayne, data analyst | software developer.',
                    site_name: 'Mike Jayne | mikejayne.com',
                    images: [],
                }}
                canonical={url}
            />
            <h1>Mike Jayne</h1>
            {isLoading && isHome ? (
                <Loader setIsLoading={setIsLoading} />
            ) : (
                <>
                    <MotionConfig reducedMotion="user">
                        <Navbar
                            isHome={isHome}
                            isMd={isMd}
                            isRouting={isRouting}
                        />
                        <>
                            <AnimatePresence mode="sync">
                                <Component {...pageProps} key={url} />
                            </AnimatePresence>
                        </>
                        <ToastContainer />
                    </MotionConfig>
                </>
            )}
        </>
    )
}

export default MyApp
