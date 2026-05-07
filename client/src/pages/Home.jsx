import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/listing/get?limit=6');
        const data = await res.json();
        setAllListings(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-slate-400 text-xs sm:text-sm'>
          Al-Pak Properties helps you find your home fast, easy and comfortable.
          <br />
          Our expert support is always available.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's Start now...
        </Link>
      </div>

      {/* Swiper Slideshow - LOCKED to your local images */}
      <Swiper navigation>
        {["/home1.jpeg", "/home2.jpeg", "/home3.jpeg"].map((url) => (
          <SwiperSlide key={url}>
            <div
              className='h-[500px]'
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Listing Display */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {loading ? (
          <p className='text-center text-2xl font-semibold text-slate-700'>Loading Properties...</p>
        ) : allListings && allListings.length > 0 ? (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Properties</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search'}>
                Show more properties.
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {allListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        ) : (
          <div className='text-center border-2 border-dashed p-10 rounded-xl'>
            <p className='text-slate-500 mb-4'>No properties available in the database.</p>
            <Link to='/create-listing' className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>
              Add Your First Property
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}