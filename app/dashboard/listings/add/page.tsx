import { Input, Select, Switch, Textarea } from "@/components";
import { Money } from "@meistericons/react";

export default function page() {
  return (
    <form action="#" method="POST" className="p-6 sm:p-10 space-y-6">
      <Input
        label="Select Book (ISBN or Title)"
        name="bookId"
        required
        placeholder="Search by Title, Author, or ISBN..."
        helperText="Links your listing to our global book registry database."
      />

      <div className="flex items-center gap-6">
        <Select
          options={[
            { value: "NEW", label: "New" },
            { value: "LIKE_NEW", label: "Like New" },
            { value: "VERY_GOOD", label: "Very Good" },
            { value: "GOOD", label: "Good" },
            { value: "ACCEPTABLE", label: "Acceptable" },
          ]}
          label="Condition"
        />

        <Input
          type="number"
          label="Quantity"
          name="quantity"
          required
          min="1"
          defaultValue="1"
          value="1"
        />
      </div>

      <Input
        label="Selling Price"
        name="price"
        required
        placeholder="0.00"
        min="0.00"
        step="0.01"
        type="number"
        iconLeft={<Money />}
        helperText="Enter the regular decimal price. It will be stored safely as cents."
      />

      <Textarea
        label="Listing Description (Optional)"
        name="description"
        rows={4}
        placeholder="Mention any highlighting, notes, cover wear, or specific edition details..."
      />

      <Switch name="isActive" checked={false} label="Make listing active" />

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
