import { useSearchContext } from "../context/SearchContext";
import { useQuery } from "react-query";
import * as apiCLient from "../utils/api-clients";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";

//we are not going to push the search values to the url, we are going to use context to share the search values across the app

const Search = () => {
  const search = useSearchContext(); //since the context is shared by the entire app we can easily access the values of the search from anywhere

  const [page, setPage] = useState(1); //by default the user will always be on the first page
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCapacity: search.adults.toString(),
    childrenCapacity: search.child.toString(),
    page: page.toString(),
    stars: selectedStars,
  };

  const { data: hotelData, isLoading } = useQuery(
    ["searchHotels", searchParams],
    () => apiCLient.searchHotels(searchParams)
  );

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const star = event.target.value;
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter((s) => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination && ` in ${search.destination}`}
          </span>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : hotelData ? (
          hotelData.data.map((hotel) => (
            <div key={hotel._id}>
              <SearchResultCard hotel={hotel} />
            </div>
          ))
        ) : (
          <div>
            No hotels found. Maybe the deployed backend server is taking time to
            start after a long period of inactivity. Try again after a few
            seconds.
          </div>
        )}
        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Search;
