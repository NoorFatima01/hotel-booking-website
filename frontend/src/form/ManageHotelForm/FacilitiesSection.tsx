import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities (Choose at least 2)</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility, index) => (
          <label key={index} className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facility.value}
              {...register("facilities", {
                validate: (facilities) => {
                  // Ensure facilities is always an array
                  const facilitiesArray = Array.isArray(facilities) ? facilities : [facilities];
                  if (facilitiesArray.length === 0) {
                    return "At least one facility is required";
                  }
                  return true;
                },
              })}
            />
            <span>{facility.label}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
