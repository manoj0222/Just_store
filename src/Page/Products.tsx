import React, { useState, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  selectProducts,
  filterProducts,
} from "./features/product/productSlice";
import { Link } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import useFetch from "../hooks/useFecth";
import useMemorizedCategories from "../hooks/useMemorizedCategories";
import "../styles/product.css";
import { motion } from "framer-motion";
import ProductType from "src/interfaces/ProductType";

// Lazy load components
const Pagination = React.lazy(() => import("./features/pagination/Pagination"));
const Search = React.lazy(() => import("./features/search/Search"));
const SlideOver = React.lazy(() => import("./features/Modals/SlideOver"));

export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};



const Products: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [sortFilter, setSortFilter] = useState<boolean>(false);
  const dispatch = useDispatch();
  useFetch(getProducts, []);
  const { products, isLoading, error, allProducts } =
    useSelector(selectProducts);

  const memorizedCategory = useMemorizedCategories(allProducts);

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(filterProducts({ searchText: query, category: category }));
    },
    [dispatch, category]
  );

  const handleCategory = useCallback(
    (query: string) => {
      setCategory(query);
      dispatch(filterProducts({ searchText: "", category: query }));
    },
    [dispatch]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-80">
        <Suspense fallback={<div>Loading Search...</div>}>
          <Search
            onSearch={handleSearch}
            products={products}
            categories={memorizedCategory}
            handleCategory={handleCategory}
          />
        </Suspense>
      <section
        className=" 
        inline-flex 
        lg:justify-start w-auto ml-12
        sm:w-auto ml-2
        md:ml-6 gap-2  
        mt-2 cursor-pointer items-center"
        onClick={() => {
          setSortFilter(!sortFilter);
        }}
      >
        <IoFilterSharp className="lg:text-3xl md:text-xl sm:text-6xl" />
        <p className="lg:text-2xl md:text-xl sm:text-9xl">Filter</p>
        <Suspense fallback={<div>Loading Filter...</div>}>
          <SlideOver open={sortFilter} setOpen={setSortFilter} />
        </Suspense>
      </section>
      <motion.ul
        className="productlist p-4 mt-2"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {products.map((product: ProductType) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className=" 
                lg:w-1/4 h-auto
                md:w-1/2 h-auto
                sm:w-full h-full
                hover:opacity-75 
                rounded-l 
                p-1
                "
          >
            <section
              className="productimage border border-rose-100 
                "
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center group-hover:opacity-75 "
              />
            </section>
            <span>
              <p className="text-sm text-gray-700 text-start text-pretty mt-2">
                {product.title}
              </p>
              <p className="mt-1 text-lg font-medium text-gray-900 text-start">
                ${product.price}
              </p>
            </span>
          </Link>
        ))}
      </motion.ul>
      <Suspense fallback={<div>Loading Pagination...</div>}>
        <Pagination />
      </Suspense>
    </div>
  );
};

export default Products;
