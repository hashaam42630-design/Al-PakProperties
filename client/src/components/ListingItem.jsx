import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  // 1. Extra Safety: If listing prop is missing, don't render anything
  if (!listing) return null;

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            (listing.imageUrls && listing.imageUrls.length > 0)
              ? listing.imageUrls[0]
              : 'https://53.fs1.hubspotusercontent-na1.net/hubfs/53/iStock-1220146273.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name || 'No Name Listing'}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address || 'No address provided'}
            </p>
          </div>
          
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? (listing.discountPrice?.toLocaleString('en-US') || '0')
              : (listing.regularPrice?.toLocaleString('en-US') || '0')}
            {listing.type === 'rent' && ' / month'}
          </p>

          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms || 0} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms || 0} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}