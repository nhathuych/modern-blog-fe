const Hero = () => {
  return (
    <div className='bg-gradient-to-br from-indigo-500 to-indigo-950 pt-16 text-white'>
      <div className='flex md:flex-row flex-col flex-wrap items-center mx-auto px-3 container'>
        {/* Left col */}
        <div className='flex flex-col justify-center items-start w-full md:w-2/5 md:text-left text-center'>
          <p className='w-full capitalize tracking-wide'>Explore Insights, Tutorials, And Stories For Curious Minds Like Yours</p>
          <h2 className='my-5 font-bold text-5xl leading-tight'>Welcome to my Modern Blog</h2>

          <p className='my-5 font-bold text-xl capitalize leading-tight'>Join a community that thrives on learning, creating and growing together.</p>
        </div>

        {/* Right col */}
        <div className='flex justify-center py-7 w-full md:w-3/5 text-center'>
          <img src='/blog.svg' alt='blog section' className='z-30 w-full md:w-3/4'/>
        </div>
      </div>
    </div>
  )
}

export default Hero
