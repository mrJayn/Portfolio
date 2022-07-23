import data from '@data'
import Image from 'next/image'

import { FaGithub } from 'react-icons/fa'

const Project_Item = ({ currentSlide }) => {
    const slide = data.projects[currentSlide]
    return (
        <div className="project useInView" key={slide.item}>
            <div className="gh-link">
                <a href={slide.github} target="_blank" rel="noreferrer">
                    <FaGithub size={25} />
                </a>
            </div>
            <a
                href="visit-project"
                aria-label="Project Link"
                target="_blank"
                className="pr-wrap"
            >
                <h4>{slide.title}</h4>
                <div>
                    <div className="pr-tech">
                        {slide.technologies.map((item) => {
                            return (
                                <p className="tech-item" key={item}>
                                    {item}
                                </p>
                            )
                        })}
                    </div>
                    <div className="pr-desc">
                        <p>{slide.message}</p>
                    </div>
                </div>
            </a>
            <Image
                src={slide.src}
                alt={`${slide.title} Project Image`}
                layout="fill"
                objectFit="cover"
            />
        </div>
    )
}

export default Project_Item
