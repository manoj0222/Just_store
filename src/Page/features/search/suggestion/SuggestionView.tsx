import React from "react";
import ProductType from "interfaces/ProductType";
import "../../../../styles/search.css";
import { Link } from "react-router-dom";

type SuggestionViewProp = {
  product: ProductType;
  text: string;
};

// Helper function to highlight the search text
const highlightText = (content: string, searchText: string) => {
  if (!searchText) {
    return content;
  }
  const regex = new RegExp(`(${searchText})`, "gi");
  const parts = content.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <span key={index} className="text-blue-800 font-semibold text-lg">
        {part}
      </span>
    ) : (
      <span key={index} className="text-grey-100 font-thin text-xs">
        {part}
      </span>
    )
  );
};

const SuggestionView: React.FC<SuggestionViewProp> = ({ product, text }) => {
  return (
    <Link className="border 
     suggestionContainer
     rounded-xl
     mb-2
     hover:cursor-pointer hover:bg-slate-100
     focus:bg-slate-100
     bg-white
     "
     to={`/products/${product.id}`}
     >
      <span className="flex items-center justify-center p-1">
        <img src={product.image} className="sm:w-20
        h-20 
        rounded" alt="productImage" />
      </span>
      <section className="p-2 ">
        <p className="text-wrap font-semibold">
          {highlightText(product.title, text)}
        </p>
        <p className="text-wrap">
          {highlightText(product.description,text)}
        </p>
      </section>
    </Link>
  );
};

export default React.memo(SuggestionView);
