import { ChangeEvent, useEffect, useState } from "react";
import { useFilter } from "../components/FilterContext";


interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const Sidebar = () => {
    const {
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        keyword, setKeyword
    } = useFilter();

    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "Apple", "Watch", "Fashion", "Trend", "Shoes", "Shirt",
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                const data: FetchResponse = await response.json();
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error Fetching Product", error);
            }
        };
        fetchCategories();
    }, []);

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    };

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category); // ✅ Fix: Use setSelectedCategory
    };

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword);
    };

    const handleResetFilter = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setMaxPrice(undefined);
        setMinPrice(undefined);
        setKeyword("");
    };

    return (
        <div className="w-64 p-5 h-screen">
            <h1 className="text-2xl font-bold mb-10 mt-4">Nitin <span className="text-red-500">Dharmesh</span></h1>

            <section>
                {/* Search Input */}
                <input 
                    type="text" 
                    className="border-2 sm:mb-0 w-full px-3 py-2" 
                    placeholder="Search Product" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                />

                {/* Price Range Inputs */}
                <div className="flex justify-center items-center mt-4">
                    <input 
                        type="number" // 
                        className="border-2 mr-2 px-5 py-2 w-full" 
                        placeholder="Min" 
                        value={minPrice ?? ""} 
                        onChange={handleMinPriceChange} 
                    />
                    <input 
                        type="number" 
                        className="border-2 px-5 py-2 w-full" 
                        placeholder="Max" 
                        value={maxPrice ?? ""} 
                        onChange={handleMaxPriceChange} 
                    />
                </div>

                {/* Categories */}
                <div className="mb-5 mt-4">
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                    {categories.map((category, index) => (
                        <label key={index} className="block mb-2">
                            <input 
                                type="radio" 
                                name="category" 
                                value={category}
                                onChange={() => handleRadioChangeCategories(category)}
                                className="mr-2 w-[16px] h-[16px]"
                                checked={selectedCategory === category} 
                            />
                            {category.toUpperCase()} 
                        </label>
                    ))}
                </div>

                {/* Keyword Section */}
                <div className="mb-5 mt-4">
                    <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                    <div>
                        {keywords.map((keyword, index) => (
                            <button 
                                key={index}
                                onClick={() => handleKeywordClick(keyword)}
                                className="block mb-2 px-4 w-full text-left border rounded hover:bg-pink-200"
                            >
                                {keyword.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset Button */}
                <button 
                    onClick={handleResetFilter} 
                    className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
                >
                    Reset Filter
                </button>
            </section>
        </div>
    );
};

export default Sidebar;
