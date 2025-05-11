"use client"

import { motion, type MotionValue, useScroll, useSpring, useTransform } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance])
}

function ImageComp({
    id,
    src,
    title,
    description,
}: {
    id: number
    src: string
    title: string
    description: string
}) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 300)

    // Get heading text based on image id
    const getHeadingText = () => {
        switch (id) {
            case 1:
                return "Report a Problem"
            case 2:
                return "Complaint Gets Logged"
            case 3:
                return "Track Complaint Status"
        }
    }

    // Get subheading text based on image id
    const getSubheadingText = () => {
        switch (id) {
            case 1:
                return "Select the category, location, and describe the issue anonymously or with contact."
            case 2:
                return "Your complaint is categorized and sent to the concerned transport authority."
            case 3:
                return "Get a unique complaint ID to check real-time updates and resolution status."

        }
    }

    return (
        <section className="img-container">
            <motion.div
                className="section-heading"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
            >
                <motion.h1
                    initial={{ letterSpacing: "-5px" }}
                    whileInView={{ letterSpacing: "0px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: false, margin: "-100px 0px -100px 0px" }}

                >
                    {getHeadingText()}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.2, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
                >
                    {getSubheadingText()}
                </motion.p>
            </motion.div>

            <div ref={ref} className="img-wrapper">
                <Image width={500} height={600} src={src} alt="A London skyscraper" />
            </div>
            <motion.h2
                // Hide until scroll progress is measured
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "visible" }}
                style={{ y }}
            >{`#00${id}`}</motion.h2>
        </section>
    )
}

const content = [
    {
        src: "/nelia-iv-7j9X536STZA-unsplash.jpg",
        title: "✅ Report a Problem",
        description: "Select the category, location, and describe the issue anonymously or with contact.",
    },
    {
        src: "/nelia-iv-7j9X536STZA-unsplash.jpg",
        title: "🗂 Complaint Gets Logged",
        description: "Your complaint is categorized and sent to the concerned transport authority.",
    },
    {
        src: "/nelia-iv-7j9X536STZA-unsplash.jpg",
        title: "📍 Track Complaint Status",
        description: "Get a unique complaint ID to check real-time updates and resolution status.",
    },
]



export default function Parallax() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div id="example">

            {content.map((item, index) => (
                <ImageComp
                    key={index}
                    id={index + 1}
                    src={item.src}
                    title={item.title}
                    description={item.description}
                />
            ))}
            <motion.div className="progress" style={{ scaleX }} />
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
       

        .img-container {
            height: 100vh;
            scroll-snap-align: start;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .img-container > div {
            width: 300px;
            height: 400px;
            margin: 20px;
            background: var(--white);
            overflow: hidden;
        }

        .img-container img {
            width: 500px;
            height: 500px;
            border-radius: 20px;
        }

        @media (max-width: 500px) {
            .img-container > div {
                width: 150px;
                height: 200px;
            }

            .img-container img {
                width: 150px;
                height: 200px;
            }
        }

        .img-container h2 {
            color: var(--hue-6);
            margin: 0;
            font-family: "Azeret Mono", monospace;
            font-size: 50px;
            font-weight: 700;
            letter-spacing: -3px;
            line-height: 1.2;
            position: absolute;
            display: inline-block;
            top: calc(50% - 25px);
            left: calc(50% + 120px);
        }

        .progress {
            position: fixed;
            left: 0;
            right: 0;
            height: 5px;
            background: var(--hue-6);
            bottom: 50px;
            transform: scaleX(0);
        }

        .section-heading {
          position: absolute;
          top: 50px;
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 10;
          pointer-events: none;
        }

        .section-heading h1 {
          font-family: "Azeret Mono", monospace;
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--hue-6);
          margin: 0;
          text-transform: uppercase;
        }

        .section-heading p {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          color: var(--white);
          margin: 0;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .section-heading h1 {
            font-size: 2rem;
          }
          
          .section-heading p {
            font-size: 0.9rem;
          }
        }

        .header-container {
            position: fixed;
            top: 20px;
            left: 0;
            width: 100%;
            z-index: 10;
            text-align: center;
            pointer-events: none;
        }

        .main-heading {
            font-family: "Azeret Mono", monospace;
            font-size: 4rem;
            font-weight: 700;
            color: var(--hue-6);
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0px;
        }

        .sub-heading {
            font-family: "Inter", sans-serif;
            font-size: 1rem;
            color: var(--white);
            margin: 0;
            opacity: 0.7;
        }

        @media (max-width: 768px) {
            .main-heading {
                font-size: 2.5rem;
            }
            
            .sub-heading {
                font-size: 0.8rem;
            }
        }

.img-wrapper{
width:500px!important;
height:500px!important;
}


    `}</style>
    )
}
