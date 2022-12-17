import { Featured_Slides } from '@components'
import Featured_Full from './_featured/Ftd_FullProject'
import Archive from './Archive'

const Projects = ({ isSm, isMd, isLg, idx = 3, ...data }) => {
    const featuredData = data.featuredData
    const projectsData = {
        isSm: isSm,
        isMd: isMd,
        isLg: isLg,
        ...data.projectsData,
    }

    return (
        <>
            <div className="flex-col-top relative h-auto w-full">
                {isMd ? (
                    Object.keys(featuredData).map((i) => (
                        <Featured_Full
                            key={`featured-project-${i}`}
                            even={i % 2 == 0}
                            {...featuredData[i]}
                        />
                    ))
                ) : (
                    <Featured_Slides isLg={isLg} {...featuredData} />
                )}
            </div>
            <Archive {...projectsData} />
        </>
    )
}

export default Projects
