import { useParams } from "react-router-dom";
import {
    swiggy_menu_api_URL,
    IMG_CDN_URL,
    MENU_ITEM_TYPE_KEY,
    RESTAURANT_TYPE_KEY,
} from "../utils/Constant";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const [restaurant, menuItems] = useRestaurant(
        swiggy_menu_api_URL,
        resId,
        RESTAURANT_TYPE_KEY,
        MENU_ITEM_TYPE_KEY
    ); 
    const dispatch = useDispatch();

    const addFoodItem = (item) => {
        dispatch(addItem(item));
        console.log(item);

    };

    
    return !restaurant ? (
        <Shimmer />
    ) : (
        <div className="restaurant-menu mx-auto min-h-screen w-auto p-2">
            <div className="restaurant-summary flex h-52 justify-center align-middle overflow-y-hidden bg-slate-800 text-cyan-50">
                <img
                    className="restaurant-img w-64 h-44 border-r-4 mt-4"
                    src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
                    alt={restaurant?.name}
                /> 
                <div className="restaurant-summary-details flex flex-col m-5">
                    <h2 className="restaurant-title text-2xl max-w-lg text-opacity-70">
                        {restaurant?.name}
                    </h2>
                    <p className="restaurant-tags flex-nowrap opacity-70 text-base max-w-lg">
                        {restaurant?.cuisines?.join(", ")}
                    </p>
                </div>
            </div>

            <div className="restaurant-menu-content flex justify-center p-3">
                <div className="menu-items-container mt-2 max-w-3xl">
                    <div className="menu-title-wrap p-5">
                        <h3 className="menu-title text-zinc-600">Recommended</h3>
                        <p className="menu-count mt-2">{menuItems?.length} ITEMS</p>
                    </div>
                    <div className="menu-items-list flex justify-between flex-col">
                        {menuItems.map((item) => (
                            <div className="menu-item flex flex-col" key={item?.id}>
                                <div className="menu-item-details">
                                    <h3 className="item-title flex flex-initial overflow-hidden text-2xl">
                                        {item?.name}
                                    </h3>
                                    <p className="item-cost">
                                        { (item.price? item.price : item.defaultPrice)/100 > 0
                                            ? new Intl.NumberFormat("en-IN", {
                                                  style: "currency",
                                                  currency: "INR",
                                              }).format((item.price? item.price : item.defaultPrice)/100)
                                            : " "}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-start text-gray-500">
                                        {item?.description}
                                    </div>
                                    <div className="text-right">
                                        <button
                                            className="add-btn justify-center pr-1.5 w-16 h-8 bg-orange-700 text-end rounded-lg"
                                            onClick={() => addFoodItem(item)} 
                                        >
                                            ADD+
                                        </button>
                                    </div>
                                </div>
                                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
