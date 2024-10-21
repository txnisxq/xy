import { IMG_CDN_URL } from "../utils/Constant";
 
const foodItem= ({
    
  name,
  defaultPrice,
  imageId,
  price,
}) => {
  return (
   
<>

    <div className="p-1  items-center flex flex-row justify-between"> 
        
            <img src={IMG_CDN_URL+imageId} className="h-20 rounded-2xl " />
          <h2 className="font-semibold mx-1">{name}</h2>
          <h3 className="ml-10 font-bold"> {  (price? price:defaultPrice)/100}</h3> 
          
        
    </div>
</>
  )
}
export default foodItem;


