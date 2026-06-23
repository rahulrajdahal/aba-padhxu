import { Input } from "@/components";
import Textarea from "@/components/Textarea/Textarea";
import { Money } from "@meistericons/react";

export default function page() {
  return (
    <form action="#" method="POST" className="p-6 sm:p-10 space-y-6">
      <div>
        <label
          htmlFor="bookId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Book (ISBN or Title)
        </label>
        <div className="relative rounded-lg shadow-sm">
          <input
            type="text"
            id="bookId"
            name="bookId"
            required
            placeholder="Search by Title, Author, or ISBN..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-gray-400"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Links your listing to our global book registry database.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Book Condition
          </label>
          <select
            id="condition"
            name="condition"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors shadow-sm"
          >
            <option value="">Select Condition</option>
            <option value="NEW">New</option>
            <option value="LIKE_NEW">Like New</option>
            <option value="VERY_GOOD">Very Good</option>
            <option value="GOOD">Good</option>
            <option value="ACCEPTABLE">Acceptable</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantity Available
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            required
            min="1"
            defaultValue="1"
            value="1"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Selling Price
        </label>

        <Input
          label="Selling Price"
          name="price"
          required
          placeholder="0.00"
          min="0.00"
          step="0.01"
          type="number"
          iconLeft={<Money />}
        />

        <div className="relative rounded-lg shadow-sm max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="0.00"
            min="0.00"
            step="0.01"
            className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-gray-400"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Enter the regular decimal price. It will be stored safely as cents.
        </p>
      </div>

      <Textarea
        label="Listing Description (Optional)"
        name="description"
        rows={4}
        placeholder="Mention any highlighting, notes, cover wear, or specific edition details..."
      />

      <div className="pt-2">
        <label className="relative flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            name="isActive"
            checked
            className="peer sr-only"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            Make listing active immediately
          </span>
        </label>
      </div>

      <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none transition-colors text-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors text-center shadow-md shadow-emerald-100"
        >
          Post Listing
        </button>
      </div>
    </form>
  );
}
