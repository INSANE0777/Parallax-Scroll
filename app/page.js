'use client';

import styles from './page.module.scss';
import Image from 'next/image';
import { useTransform, useScroll, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import useDimension from './useDimension';
import useMousePosition from './utils/useMousePosition';
import { ArrowUpRight } from 'lucide-react';

const images = Array.from({ length: 12 }, (_, i) => `${i + 1}.jpg`);

const socialLinks = [
  { name: "GITHUB", url: "https://github.com/INSANE0777/" },
  { name: "X", url: "#" },
  { name: "INSTAGRAM", url: "https://www.instagram.com/_insaneee7/" },
  { name: "LINKEDIN", url: "#" },
];

export default function Home() {
  const container = useRef(null);
  const footerRef = useRef(null);
  const { height } = useDimension();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });
  

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 100;
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsFooterVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    const footerElement = footerRef.current;
    if (footerElement) observer.observe(footerElement);
    return () => {
      if (footerElement) observer.unobserve(footerElement);
    };
  }, []);

  return (
    <main className={styles.main}>

<section className={styles.hero}>
  {/* Underlying hero content */}
  <div className={styles.heroContent}>
    <h1 
      className="text-white text-6xl font-bold"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      ..........Parallax is Cool..........
    </h1>
  </div>

  <motion.div 
    className={styles.heroMask}
    animate={{
      WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
      WebkitMaskSize: `${size}px`
    }}
    transition={{ type: "tween", ease: "backOut" }}
  >
    <div className={styles.maskText}>
      <h1 className="text-black text-6xl font-bold">
        ..........This is even cooler!..........
      </h1>
    </div>
  </motion.div>
</section>

      
     
      <div ref={container} className={styles.gallery}>
        <Column images={[images[9], images[1], images[2]]} y={y1} />
        <Column images={[images[5], images[4], images[3]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[0], images[10], images[11]]} y={y4} />
      </div>
      
    
      <div className={styles.spacer}>
        <div className={styles.footerWrapper}>
          <footer ref={footerRef} className="py-20 px-6 md:px-20" id="contact">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
                <div className="flex items-center mb-8 md:mb-0">
                  <motion.div
                    initial={{ rotate: -45 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 border-2 border-white transform -rotate-45"
                  />
                  <h2 className="text-white text-3xl md:text-4xl font-bold ml-6">
                    LET&apos;S WORK
                    <br />TOGETHER
                  </h2>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black rounded-full font-semibold flex items-center gap-2"
                  onClick={() =>
                    (window.location.href =
                      "mailto:s24bcau0171@bennett.edu.in?subject=Let's Work Together&body=Hi Afjal,%0D%0A%0D%0AI would like to discuss a potential project with you.")
                  }
                >
                  SEND ME A MESSAGE
                  <ArrowUpRight size={20} />
                </motion.button>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-white/20 pt-8">
                <div className="mb-8 md:mb-0">
                  <h3 className="text-white text-4xl md:text-6xl font-bold tracking-tighter">
                    AFJAL HUSSEIN
                  </h3>
                  <p className="text-sm text-neutral-400 mt-2">
                    © 2025 DESIGN BY AFJAL HUSSEIN. ALL RIGHT RESERVED.
                  </p>
                </div>

                <div className="flex gap-6 flex-wrap">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
                <div className="text-left w-full md:w-1/3 text-white">
                  Built with Nextjs and deployed with Vercel.
                </div>
                <div className="text-right w-full md:w-1/3 text-white">
                  Text is set in the DOTO typeface.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {isFooterVisible && (
        <motion.button 
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.scrollToTop}
          style={{
            position: 'fixed',
            right: '2rem',
            bottom: '2rem',
            zIndex: 100,
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          <ArrowUpRight size={20} style={{ transform: 'rotate(-45deg)' }} />
        </motion.button>
      )}
    </main>
  );
}

const Column = ({ images, y = 0 }) => {
  return (
    <motion.div style={{ y }} className={styles.column}>
      {images.map((src, index) => (
        <div key={index} className={styles.imageContainer}>
          <Image src={`/images/${src}`} fill alt="image" />
        </div>
      ))}
    </motion.div>
  );
};
