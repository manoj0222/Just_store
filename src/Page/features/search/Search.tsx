import React, { useState } from "react";
import ProductType from "../../../interfaces/ProductType";
import "../../../styles/search.css"; // Import CSS for styling
import Suggestion from "./suggestion/Suggestion";

type SearchProps = {
  products: ProductType[]; // Array of products
  categories: string[]; // Array of category names
  handleCategory: (query: string) => void; // Callback function for category selection
};

const Search: React.FC<SearchProps> = ({
  products,
  categories,
  handleCategory,
}) => {
  const [searchContent, setSearchContent] = useState<string>(""); // State to hold search input value
  const [category,setCategory] = useState<string>("");

  // Handler for search input change
  const handleSearch = (value: string) => {
    setSearchContent(value); // Update searchContent state with input value
  };

  // Handler for category select change
  const handleSelectedCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategory(e.target.value); // Call handleCategory callback with selected category value
    setCategory(e.target.value);
  };

  return (
    <div className="p-2 rounded-md mt-6 
    flex
    flex-row
    flex-wrap
    justify-center
    items-center
    relative z-2
    w-full "> {/* Container for search component */}
      <div className="w-full 
      flex items-center justify-center
       sm:flex-row flex-wrap 
       searchcontainer
       "> {/* Flex container for input and select */}
        <input
          type="text"
          name="price"
          id="price"
          className="
          w-full
          lg:w-1/2 
          rounded-md border py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder="Search by name or description"
          value={searchContent}
          onChange={(e) => handleSearch(e.target.value)} // Invoke handleSearch on input change
        />
        <select
          id="currency"
          name="currency"
          className="
           lg:w-1/6 
           md:w-1/6 
           sm:w-1/5 py-1 
           category_container rounded-md py-2 pl-1 text-gray-700 border-2 border-gray-300 outline-none 
          flex items-center justify-center
          font-bold text-blue-300 bg-gray-100 sm:text-sm"
          defaultValue=""
          onChange={handleSelectedCategory} // Invoke handleSelectedCategory on select change
          data-testid="category-select" // Test ID for testing purposes
        >
          <option value="" className="text-center">Categories</option> {/* Default category option */}
          {/* Map through categories to render options */}
          {categories.map((category, index) => (
            <option key={index} value={category} className="text-blue-300 p-1 text-center">
              {category}
            </option>
          ))}
        </select>
      </div>
      <span  className="w-full flex items-center justify-center z-20">
          {searchContent.length>0&&<Suggestion category={category} searchedText={searchContent}/>}
      </span>
    </div>

  );
};

export default Search;
