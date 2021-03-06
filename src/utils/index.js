export const navDelay = 3000
/*export const spring = "spring(1,20,20,5)";*/

/*
SPRING DEFAULTS =
    {
        type: 'spring',
        bounce: 0.25,
        damping: 10,
        mass: 1,
        stiffness: 100,
        velocity: 2,
        restSpeed: 0.01,
        restDelta: 0.01,
    },
*/

const default_spring = {
    type: 'spring',
    stiffness: 150,
    damping: 30,
    velocity: 50,
}

export const myVariants = {
    entry: {
        hide: {
            opacity: 0,
            y: '-10px',
        },
        enter: {
            opacity: 1,
            y: '0px',
        },
        exit: {
            opacity: 0,
            y: '10px',
            transitionEnd: { y: '0px' },
        },
    },
    nav: {
        parent: {
            show: {
                transition: default_spring,
            },
            hidden: {},
        },
        child: {
            show: (largeScreen = false) => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: largeScreen ? 1.5 : 0,
                    duration: 0.5,
                },
            }),
            hidden: {
                opacity: 0,
                transition: default_spring,
            },
        },

        logo: {
            show: (largeScreen = false) => ({
                opacity: [
                    0, 0.5, 0.25, 0.75, 0.1, 0.75, 0, 0, 0, 0, 0.5, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0.5, 0.25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5,
                    0.25, 0.75, 1,
                ],
                transition: {
                    when: 'afterChildren',
                    delay: largeScreen ? 2 : 1.25,
                    duration: 1.5,
                },
            }),
            hidden: {
                opacity: 0,
                transition: default_spring,
            },
        },
        links: {
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    staggerDirection: 1,
                },
            },
            hidden: {
                opacity: 0,
                transition: {
                    exitTransition: default_spring,
                    when: 'beforeChildren',
                },
            },
        },
        links_child: {
            show: {
                opacity: 1,
                y: 0,
                transition: {
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    velocity: 50,
                },
            },
            hidden: {
                y: '-50px',
            },
        },
    },
    burger: {
        top: {
            closed: {
                rotate: 0,
                translateY: [2, 0],
            },
            opened: {
                rotate: [0, 0, 45],
                translateY: [0, 2, 2],
            },
        },
        center: {
            closed: {
                pathLength: [0, 0, 5],
                opacity: [0, 1, 1],
            },
            opened: {
                pathLength: [5, 5, 0],
                opacity: [1, 0, 0],
            },
        },
        bottom: {
            closed: {
                rotate: 0,
                translateY: [-2, 0],
            },
            opened: {
                rotate: [0, 0, -45],
                translateY: [-0, -2, -2],
            },
        },
    },
    menu: {
        menu_clip: {
            show: {
                clipPath: `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)`,
                transition: {
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    velocity: 50,
                    restDelta: 0.02,
                },
            },
            hide: {
                clipPath: `polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%)`,
                transition: {
                    type: 'spring',
                    delay: 0.2,
                    stiffness: 150,
                    damping: 35,
                    velocity: -50,
                },
            },
        },
        parent: {
            show: (custom = true) => ({
                transition: {
                    when: 'beforeChildren',
                    staggerChildren: 0.05,
                    delayChildren: custom ? 0 : 0.5,
                },
            }),
            hide: (custom = true) => ({
                transition: {
                    staggerChildren: custom ? 0.05 : 0,
                    delayChildren: custom ? 0.15 : 0,
                    staggerDirection: custom ? -1 : 1,
                },
            }),
        },
        child: {
            show: {
                y: '0px',
                opacity: 1,
                transition: {
                    type: 'spring',
                    stiffness: 1000,
                    velocity: -300,
                },
            },
            hide: (dy = 50) => ({
                y: -dy + 'px',
                opacity: 0,
                transition: {
                    type: 'spring',
                    stiffness: 150,
                },
            }),
        },
    },
}

export function toggleScrolling(state) {
    if (typeof window !== undefined) {
        document.querySelector('body').style.overflow =
            state == true ? 'auto' : 'hidden'
    }
}
