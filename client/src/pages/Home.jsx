import React, { useEffect, useState } from 'react'
import Banner , {BannerSkeleton} from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features';
import Testimonial from '../components/home/Testimonial';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/home/Footer';
import ResumeSwitcher from '../components/ResumeSwitcher';

const Home = () => {
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='p-2'>
      {loading ? <BannerSkeleton /> : <Banner />}
       <Hero />
       <Features/>
       <ResumeSwitcher />
       <Testimonial />
       <CallToAction />
       <Footer/>
    </div>
  )
}

export default Home