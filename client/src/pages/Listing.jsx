import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  const params = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleListingDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      const res = await fetch(`/api/listing/delete/${listing._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      // REDIRECT TO HOME: Now takes you back to the main grid instead of profile
      navigate('/'); 
    } catch (error) {
      console.log(error.message);
    }
  };

  // FLEXIBLE CHECK: Matches real MongoDB ID OR your "Hashaam_Admin" placeholder
  const isOwner = currentUser && listing && (
    listing.userRef === currentUser._id || 
    listing.userRef === currentUser.id ||
    listing.userRef === "Hashaam_Admin"
  );

  return (
    <main className='bg-white min-h-screen'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      
      {listing && !loading && !error && (
        <div className='max-w-6xl mx-auto p-3 my-7'>
          <div className='flex flex-col lg:flex-row gap-8'>
            
            {/* Left Side: Image Section */}
            <div className='flex-1 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex justify-center items-center h-[400px] lg:h-[500px] shadow-sm'>
              <img 
                src={listing.imageUrls[0]} 
                alt="listing" 
                className='max-w-full max-h-full object-contain p-4'
              />
            </div>

            {/* Right Side: Info Section */}
            <div className='flex-1 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <p className='text-3xl font-bold text-slate-800'>
                  {listing.name} - ${' '}
                  {listing.offer
                    ? listing.discountPrice.toLocaleString('en-US')
                    : listing.regularPrice.toLocaleString('en-US')}
                  {listing.type === 'rent' && ' / month'}
                </p>

                {/* DELETE BUTTON: Only visible to the owner */}
                {isOwner && (
                  <button 
                    onClick={handleListingDelete}
                    className='bg-red-700 text-white px-4 py-2 rounded-lg uppercase hover:opacity-90 shadow-md transition'
                  >
                    Delete Listing
                  </button>
                )}
              </div>
              
              <p className='flex items-center gap-2 text-slate-600 text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {listing.address}
              </p>

              <div className='flex gap-4'>
                <p className='bg-red-700 w-full max-w-[200px] text-white text-center p-2 rounded-lg font-semibold shadow-md'>
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {listing.offer && (
                  <p className='bg-green-700 w-full max-w-[200px] text-white text-center p-2 rounded-lg font-semibold shadow-md'>
                    ${(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} discount
                  </p>
                )}
              </div>

              <div className='bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2'>
                <p className='text-slate-800 leading-relaxed'>
                  <span className='font-bold text-black'>Description - </span>
                  {listing.description}
                </p>
              </div>

              <ul className='text-green-800 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-4 border-t pt-6'>
                <li className='flex items-center gap-2 whitespace-nowrap '>
                  <FaBed className='text-xl' />
                  {listing.bedrooms > 1 ? `${listing.bedrooms} Beds ` : `${listing.bedrooms} Bed `}
                </li>
                <li className='flex items-center gap-2 whitespace-nowrap '>
                  <FaBath className='text-xl' />
                  {listing.bathrooms > 1 ? `${listing.bathrooms} Baths ` : `${listing.bathrooms} Bath `}
                </li>
                <li className='flex items-center gap-2 whitespace-nowrap '>
                  <FaParking className='text-xl' />
                  {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className='flex items-center gap-2 whitespace-nowrap '>
                  <FaChair className='text-xl' />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
              </ul>

              {/* CONTACT BUTTON: Shows if NOT the owner */}
              {currentUser && !isOwner && !contact && (
                <button
                  onClick={() => setContact(true)}
                  className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-4'
                >
                  Contact Landlord
                </button>
              )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}