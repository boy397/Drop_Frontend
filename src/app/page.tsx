"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShoppingBag, Watch, Laptop } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 opacity-40"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
          <Image 
            src="/images/fashion.png" 
            alt="Premium Fashion" 
            fill 
            className="object-cover object-top"
            priority
          />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter gradient-text"
          >
            Redefine Your Style
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Discover our curated collection of premium products, designed for the modern lifestyle.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
          >
            Shop Now <ArrowRight size={20} />
          </motion.button>
        </div>
      </section>

      {/* Collage Section */}
      <section className="py-32 px-4 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Curated Excellence</h2>
          <p className="text-gray-400 text-xl">The finest categories for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
          {/* Fashion Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
            <Image src="/images/fashion.png" alt="Fashion" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-10 left-10 z-20 glass p-6 rounded-2xl">
              <ShoppingBag className="mb-3 text-accent" size={32} />
              <h3 className="text-3xl font-bold mb-2">Fashion</h3>
              <p className="text-gray-300">Explore the latest trends</p>
            </div>
          </motion.div>

          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {/* Tech Block */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
              <Image src="/images/gadget.png" alt="Tech" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 z-20">
                <Laptop className="mb-2 text-white" size={24} />
                <h3 className="text-2xl font-bold">Tech</h3>
              </div>
            </motion.div>

            {/* Accessories Block */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
              <Image src="/images/watch.png" alt="Accessories" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 z-20">
                <Watch className="mb-2 text-white" size={24} />
                <h3 className="text-2xl font-bold">Accessories</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
