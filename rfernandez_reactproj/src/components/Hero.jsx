import carouselImg from '../assets/images/asd.jpg'
import carouselImg2 from '../assets/images/asd1.jpg'
import carouselImg3 from '../assets/images/asd2.jpg'
import carouselImg4 from '../assets/images/asd3.jpeg'
import 'flowbite'
const Hero = ({
  title = 'Welcome to the RepsPh Gym Family!',
  subtitle = 'Together we aim to defeat the worst versions of ourselves',
}) => {
  return (
    <section className='bg-gray-200 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>


        <div id="default-carousel" class="relative w-full" data-carousel="slide">

          <div class="relative h-56 overflow-hidden rounded-lg md:h-96">

            <div class=" duration-700 ease-in-out" data-carousel-item>
              <img src={carouselImg} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
            </div>

            <div class=" duration-700 ease-in-out" data-carousel-item>
              <img src={carouselImg2} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
            </div>

            <div class=" duration-700 ease-in-out" data-carousel-item>
              <img src={carouselImg3} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
            </div>
   
            <div class=" duration-700 ease-in-out" data-carousel-item>
              <img src={carouselImg4} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
            </div>
          </div>



          <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
              </svg>
              <span class="sr-only">Previous</span>
            </span>
          </button>
          <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
              <span class="sr-only">Next</span>
            </span>
          </button>
        </div>

      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-10'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            {title}
          </h1>
          <p className='my-4 text-xl text-gray-900'>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
