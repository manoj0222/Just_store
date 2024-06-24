import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../product/productSlice";
import "../../../../styles/search.css";
import SuggestionView from "./SuggestionView";
import ProductType from "interfaces/ProductType";

type SuggestionProps = {
  category: string;
  searchedText: string;
};

const Suggestion: React.FC<SuggestionProps> = ({ category, searchedText }) => {
  const { allProducts } = useSelector(selectProducts);

  const filterProducts = (
    products: ProductType[],
    categ: string,
    searchText: string
  ): ProductType[] => {
    return products
      .filter((product) => {
        if (categ && product.category !== categ) {
          return false;
        }
        return true;
      })
      .filter((product) => {
        if (
          searchText &&
          (product.title.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return true;
        }
        return false;
      });
  };

  const memoizedfilteredProducts = useMemo(()=>filterProducts(allProducts,category,searchedText),[allProducts,category,searchedText])

  return (
    <div className="w-auto border suggestion rounded-xl p-1 overflow-y-auto h-96 overflow-x-hidden">
      {memoizedfilteredProducts.length === 0 ? (
        <div className="flex justify-center items-center font-semibold text-red-200">Requested Data Not Available</div>
      ) : (
        memoizedfilteredProducts.map((product) => (
          <SuggestionView key={product.id} product={product} text={searchedText} />
        ))
      )}
    </div>
  );
};

export default Suggestion;
