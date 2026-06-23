import { Button, Input } from "@/components";

//  <div className="flex items-center justify-between">
//           <select
//             name="type"
//             //   value={address.type}
//             //   onChange={handleAddressChange}
//             className="text-xs font-semibold px-3 py-1.5 border border-gray-300 rounded-md bg-gray-50 focus:ring-1 focus:ring-indigo-500"
//           >
//             <option value="SHIPPING">SHIPPING ADDRESS</option>
//             <option value="BILLING">BILLING ADDRESS</option>
//           </select>
//         </div>
export default function AddressSettings() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-6 gap-6">
      <Input
        label="Recipient Name"
        name="recipientName"
        placeholder="Full Name or Business Entity"
        wrapperClassName="md:col-span-full"
      />
      <Input
        label="Street Address"
        name="addressLine1"
        placeholder="123 Main St"
        wrapperClassName="md:col-span-4"
      />

      <Input
        label="Apt, Suite, Unit (Opt)"
        name="addressLine2"
        placeholder="Apt 4B"
        wrapperClassName="md:col-span-2"
      />

      <Input
        label="City"
        name="city"
        placeholder="New York"
        wrapperClassName="md:col-span-2"
      />

      <Input
        label="State / Province"
        name="stateProvince"
        placeholder="NY"
        wrapperClassName="md:col-span-2"
      />

      <Input
        label="ZIP / Postal Code"
        name="postalCode"
        placeholder="10001"
        wrapperClassName="md:col-span-2"
      />

      <Input
        label="Country ISO Code"
        name="countryCode"
        placeholder="US"
        wrapperClassName="md:col-span-2"
      />

      <div className="md:col-span-4 flex items-center pt-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="isDefault"
            //   checked={address.isDefault}
            //   onChange={handleAddressChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Set as my default address fallback
          </span>
        </label>
      </div>

      <div className="md:col-span-full mt-4">
        <Button type="submit">Update Address</Button>
      </div>
    </form>
  );
}
