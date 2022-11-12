import { useState, useEffect, useCallback } from 'react'
import anime from 'animejs'
import { theme } from 'tailwind.config'

const Loader = ({ setIsLoading }) => {
    const el_size = 15
    const loader_size = el_size ** 2 + el_size + 3
    const [elSize] = useState(el_size + 'px')
    const [loaderSize] = useState(loader_size + 'px')
    const [isMounted, setIsMounted] = useState(false)

    const animate = useCallback(() => {
        const spring = 'spring(1, 20, 10, 10)'
        const loader = anime.timeline({
            complete: () => {
                setIsLoading(false)
            },
        })
        loader
            .add(
                {
                    targets: '#loader-wrap',
                    opacity: [1, 0],
                    duration: 750,
                    easing: 'easeInQuad',
                },
                4000
            )
            .add(
                {
                    targets: '#loader',
                    scale: [{ value: 1, easing: spring, duration: 0 }],
                    rotateZ: [
                        {
                            value: [0, 180],
                            easing: 'easeOutQuad',
                            duration: 2500,
                        },
                    ],
                },
                50
            )
            .add(
                {
                    targets: '#loader-bg',
                    opacity: {
                        value: 1,
                        easing: spring,
                        duration: 400,
                    },
                    scale: [
                        {
                            value: [0, 2.5],
                            easing: spring,
                            duration: 500,
                            delay: 400,
                        },
                        {
                            value: [4, 0],
                            easing: 'easeInBack',
                            delay: 1700,
                        },
                    ],
                },
                50
            )
            /** Out **/
            .add(
                {
                    targets: '.square',
                    opacity: { value: 1, easing: spring, duration: 100 },
                    scale: [
                        { value: 0, easing: spring, duration: 300 },
                        {
                            value: 0.5,
                            easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
                            duration: 150,
                        },
                        {
                            value: 0,
                            easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
                            duration: 300,
                        },
                        {
                            value: 0.5,
                            easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
                            duration: 150,
                        },
                    ],
                    translateX: anime.stagger(5, {
                        grid: [`${el_size}`, `${el_size}`],
                        from: 'center',
                        axis: 'x',
                    }),
                    translateY: anime.stagger(5, {
                        grid: [`${el_size}`, `${el_size}`],
                        from: 'center',
                        axis: 'y',
                    }),
                    rotateZ: anime.stagger([0, 315], {
                        grid: [`${el_size}`, `${el_size}`],
                        from: 'center',
                        axis: 'x',
                    }),
                    delay: anime.stagger(145, {
                        grid: [`${el_size}`, `${el_size}`],
                        from: 'center',
                    }),
                },
                0
            )
            /** In **/
            .add(
                {
                    targets: '.square',
                    scale: [
                        { value: 0.25, easing: spring, duration: 350 },
                        { value: 0, easing: spring, duration: 250 },
                        { value: 0.5, easing: spring, duration: 250 },
                        { value: 0, easing: spring, duration: 250 },
                    ],
                    translateX: anime.stagger(-`${el_size}`, {
                        grid: [`${el_size}`, `${el_size}`],
                        from: 'center',
                        axis: 'x',
                    }),
                    translateY: anime.stagger(-`${el_size}`, {
                        grid: [`${el_size}`, `${el_size}`],
                        from: 'center',
                        axis: 'y',
                    }),
                    delay: anime.stagger(50, {
                        grid: [`${el_size}`, `${el_size}`],
                        from: 'center',
                    }),
                    easing: spring,
                },
                2250
            )
    }, [setIsLoading])

    useEffect(() => {
        const delay = setTimeout(() => setIsMounted(true), 0)
        animate()
        return () => clearTimeout(delay)
    }, [animate])

    return (
        <div
            id="loader-wrap"
            className="flex-center relative z-[99] h-screen w-screen overflow-hidden bg-background"
            style={{ opacity: `${isMounted ? 100 : 0}` }}
        >
            <div
                id="loader"
                className="flex-col-center relative m-auto"
                style={{ height: loaderSize, width: loaderSize }}
            >
                <div
                    id="loader-items"
                    className="m-0 flex h-full w-full flex-wrap items-start justify-start p-0"
                >
                    {[...Array(el_size ** 2).keys()].map((i) => (
                        <div
                            className="square relative m-[0.5px] rounded bg-white opacity-0 odd:bg-teal dark:bg-teal-40 dark:odd:bg-teal"
                            style={{
                                height: elSize,
                                width: elSize,
                                backgroundColor:
                                    i % 4 == 0 || i % 6 == 0
                                        ? theme.colors.teal.neon
                                        : null,
                            }}
                            key={i}
                        />
                    ))}
                </div>
            </div>
            <div
                id="loader-bg"
                className="absolute -z-10 mx-auto translate-y-[-50%] scale-0 bg-gradient_radial  opacity-0 dark:z-10"
                style={{
                    height: loaderSize,
                    width: loaderSize,
                }}
            />
        </div>
    )
}

export default Loader