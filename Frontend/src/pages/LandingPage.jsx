import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';
import HomeHbtProCard from '../components/common/HomeHbtProCard';
import { Check, ChartNoAxesCombined, BellRing, Award } from 'lucide-react';
import HomeStepCard from '../components/common/HomeStepCard';
import ReviewCard from '../components/common/ReviewCard';
import { motion } from 'motion/react';

function LandingPage() {
 const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

   // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const homeCardData = [
    {
      heading: "Create Your Habits",
      number: 1,
      desc : 'Define the habits you want to build, and set your frequency and schedule.',
    },
    {
      heading: "Track Your Progress",
      number: 2,
      desc : 'Check off completed habits and monitor your streaks and consistency.',    
    },
    {
      heading: "Achieve Your Goals",
      number: 3,  
      desc : 'Transform your life through consistent action and habit building.',
    },
  ];

  const habitProData = [
    {
      heading: "Track Your Progress",
      icon: <Check className="w-8 h-8 text-teal-600" strokeWidth={2.5} />,
      iconColor: 'bg-teal-100',
      description: "Create and track habits with customizable frequencies and reminders."
    },
    {
      heading : "Visualize Progress",
      icon: <ChartNoAxesCombined className="w-8 h-8 text-blue-800" strokeWidth={2} />,
      iconColor: 'bg-blue-100',
      description: "Visualize your habit journey with insightful graphs and statistics."
    },
    {
      heading: "Smart Reminders",
      icon: <BellRing className="w-8 h-8 text-orange-800" strokeWidth={2} />, 
      iconColor: 'bg-amber-100',
      description: "Get timely reminders to keep you on track with your habits."
    },
    {
      heading: "Earn Achievements",
      icon: <Award className="w-8 h-8 text-teal-800" strokeWidth={2} />,
      iconColor: 'bg-teal-100',
      description: "Stay motivated with rewards, streaks, and milestones for your achievements."
    }
  ]
  return (
    <div>
      <div className="py-20 bg-gradient-to-br from-teal-900 to-blue-800 flex items-center justify-center px-4">
        <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center max-w-4xl mx-auto">
          <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Build Better Habits
          </motion.h1>
          <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed  mx-auto">
            Create lasting habits, track your progress, set reminder and achieve your goals
            <br />
            with HabitAura.
          </motion.p>
  
          <Link to={"/dashboard/overview"}>
          <button
           className="inline-flex items-center gap-3 bg-teal-600 hover:bg-green-600 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </button>
          </Link>
        </motion.div>
      </div>

    <div className="py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          Transform Your Life With Better Habits
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Our science-backed approach helps you build lasting habits and break bad ones.
        </p>
      </div>

      <motion.div
         initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 py-8">
        {
          habitProData.map((item, index) => (
            <HomeHbtProCard 
              key={index}
              heading={item.heading}
              icon={item.icon}
              iconColor={item.iconColor}
              description={item.description}
              
            />
          ))
        }
      </motion.div>
    </div>

    <div className='bg-gray-50'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once:true, amount: 0.2 }}
        variants={staggerContainer}
       className='mx-auto text-center py-16 px-4'>

        <motion.h2 
        variants={scrollVariants}
        className='text-3xl md:text-4xl font-bold text-gray-800'>
          How It Works
        </motion.h2>

        <motion.p 
        variants={scrollVariants}
        className='text-lg md:text-xl text-gray-600 mt-4 mb-8'>
          Simple steps to transform your habits and achieve your goals.
        </motion.p>
      </motion.div>

      {/* process box */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once:true, amount: 0.2 }}
        variants={staggerContainer}
       className='grid grid-cols-1 md:grid-cols-3 gap-8'>

        {homeCardData.map(items => (
          <motion.div key={items.number}
          variants={scrollVariants}>
          <HomeStepCard
          key={items.number}
          number={items.number}
          heading={items.heading}
          description={items.desc}
          />
          </motion.div>
         ))} 
      </motion.div>

      <motion.div 
        initial='hidden'
        whileInView='visible'
        viewport={{ once:true, amount: 0.2 }}
        variants={staggerContainer}
       className='py-16 mx-auto text-center'>
        <Link to={"/dashboard/overview"}>
          <motion.button variants={scrollVariants} className="inline-flex items-center gap-3 bg-teal-700 hover:bg-green-600 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>
    </div>

    <motion.div 
      initial='hidden'
        whileInView='visible'
        viewport={{ once:true, amount: 0.2 }}
        variants={staggerContainer}
        >
      <motion.div variants={scrollVariants} className='mx-auto text-center py-16 px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
          What Our Users Say
        </h2>
        <p className='text-lg md:text-xl text-gray-600 mt-4 mb-8'>
          Join thousands of people who have transformed their lives with HabitAura.
        </p>
      </motion.div>

      {/* Review Card */}
      <motion.div variants={scrollVariants} className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4'>
          <ReviewCard
          nameUpperLatter='HM'
          userName="Himangshu Mishra"
          review="habitAura has completely changed how I approach my fitness goals. I've been able to maintain a consistent workout routine for over 6 months now!"
          />
          <ReviewCard
          logoBgColor='bg-blue-100'
          logoLatterColor='text-blue-800'
          nameUpperLatter='AM'
          userName="Alok Mishra"
          review="As someone who struggles with consistency, this app has been a game-changer. The streak feature keeps me motivated to maintain my coding practice."
          />
          <ReviewCard
          logoBgColor='bg-amber-100'
          logoLatterColor='text-orange-800'
          nameUpperLatter='ARB'
          userName="Amiya Ranjan Behera"
          review="The visual progress charts help me see how far I've come with my study habits. I'm more productive and organized than ever before."
          />
      </motion.div>
    </motion.div>

    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{once: true, amount: 0.8 }}
      variants={staggerContainer}
     className="py-20 bg-gradient-to-br from-teal-800 to-blue-900 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 variants={scrollVariants} className="text-3xl md:text-3xl lg:text-4xl font-semibold text-white mb-8 leading-tight">
            Ready to Transform Your Habits?
          </motion.h1>
          <motion.p variants={scrollVariants} className="text-md md:text-xl text-white/90 mb-12 leading-relaxed  mx-auto">
            Join thousands of users who are building better habits and achieving their goals with HabitAura.
          </motion.p>
  
          <Link to={"/dashboard/overview"}>
          <motion.button variants={scrollVariants} className="inline-flex items-center gap-3 bg-teal-600 hover:bg-green-600 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default LandingPage;
