import carouselImg from '../assets/images/asd.jpg'
import carouselImg2 from '../assets/images/asd1.jpg'
import carouselImg3 from '../assets/images/asd2.jpg'
import carouselImg4 from '../assets/images/asd3.jpeg'
import banner from '../assets/images/banner.webp'
import 'flowbite'
const AboutUs = ({ reversed }) => {
  return (
    <>
      <div id="about" className="relative bg-white overflow-hidden mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="50,0 100,0 50,100 0,100"></polygon>
            </svg>

            <div className="pt-1"></div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="my-6 text-2xl tracking-tight font-extrabold text-indigo-700 sm:text-3xl md:text-4xl">
                  About us
                </h2>

                <p>
                  Introducing RepsPH Gym, the rapidly rising star in the fitness industry, known for its exceptional trainers and transformative client results.
                  Our dedicated trainers are not just experts in their fields but also passionate motivators who inspire clients to complete their fitness journeys with personalized workout plans, unwavering support, and innovative techniques.
                  Their influence goes beyond physical training, instilling confidence and a positive mindset in every individual. As our community continues to grow, we're excited to announce the launch of our brand-new website shop, offering top-quality gym equipment, apparel, and nutritional supplements to support your fitness goals. Join the movement and experience the Peak Performance difference today!
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src={banner} alt="" />
        </div>
      </div>



      <div className="bg-gray-200 p-4 pb-32">
        <div className="max-w-7xl mx-auto h-max px-6 md:px-12 xl:px-6">
          <div className="md:w-2/3 lg:w-1/2">

            <h2 className="my-8 text-2xl font-extrabold text-indigo-700 md:text-4xl">2024 Subscription Tiers</h2>
            <p className="text-black">Choose the right fitness journey for you!</p>
          </div>
          <div
            className="mt-16 grid divide-x divide-y  divide-gray-700 overflow-hidden rounded-3xl border text-gray-600 border-gray-700 sm:grid-cols-2 lg:grid-cols-4  lg:divide-y-0 xl:grid-cols-4">
            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8">
                <div className='text-5xl font-extrabold text-indigo-300'>
                  &#8369;180 <span className='text-sm'>/day</span>
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-white transition mb-6">Daily Members</h5>
                  <ul className='list-disc text-gray-300 ml-4'>
                    <li>Single Day Access</li>
                    <li>Use of basic equipments</li>
                    <li>Locker/Shower Access</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8">

                <div className='text-5xl font-extrabold text-indigo-300'>
                  &#8369;1,800 <span className='text-sm'>/mo.</span>
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-white transition mb-6">Silver Tier</h5>

                  <ul className='list-disc text-gray-300 ml-4'>
                    <li>Unlimited access to gym facilities</li>
                    <li>5 group fitness classes per month</li>
                    <li>Free fitness assessment and consultation</li>
                    <li> Basic member discounts (10%) on merchandise and café items</li>
                   
                  </ul>
                </div>
                
              </div>
            </div>

            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8">

                <div className='text-5xl font-extrabold text-indigo-300'>
                  &#8369;4,500 <span className='text-sm'>/mo.</span>
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-white transition mb-6">Gold Tier</h5>

                  <ul className='list-disc text-gray-300 ml-4'>
                    <li>Unlimited access to gym facilities</li>
                    <li>Unlimited group fitness classes</li>
                    <li>2 personal training sessions per month</li>
                    <li>Enhanced member discounts (15%) on merchandise and café items</li>
                    <li>Priority booking for classes and events</li>
                    <li>Limited to 2 personal training sessions per month</li>
                  </ul>
                </div>
                
              </div>
            </div>

            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8">

                <div className='text-5xl font-extrabold text-indigo-300'>
                  &#8369;7,500 <span className='text-sm'>/mo.</span>
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-white transition mb-6">Platinum Tier</h5>

                  <ul className='list-disc text-gray-300 ml-4'>
                    <li>Unlimited access to gym facilities, group fitness classes, and personal training sessions</li>
                    <li>Basic member discounts (20%) on merchandise and café items</li>
                    <li>Priority booking for classes and events</li>
                    <li>Access to exclusive Platinum-only events, workshops, and retreats</li>
                    <li>Complimentary nutrition consultations and custom meal planning</li>
                    <li>Access to the VIP lounge with complimentary beverages and snacks</li>
                    <li>Personalized fitness and wellness tracking app</li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
