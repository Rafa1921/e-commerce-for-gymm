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

            <div class="" data-carousel-item>
              <img src={carouselImg} class="absolute block w-full " alt="..."/>
            </div>

            <div class="">
              <img src={carouselImg2} class="absolute block w-full" alt="..."/>
            </div>

            <div class="">
              <img src={carouselImg3} class="absolute block w-full" alt="..."/>
            </div>
   
            <div class="">
              <img src={carouselImg4} class="absolute block w-full " alt="..."/>
            </div>
          </div>


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
