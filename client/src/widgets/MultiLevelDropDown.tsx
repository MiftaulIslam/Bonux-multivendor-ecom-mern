import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { multiLevelDropDownProp } from '../models/PropType';
import { useLoader } from '../hooks/LoaderProvider';

const MultiLevelDropDown:React.FC<multiLevelDropDownProp> = ({  className }) => {
const navigate = useNavigate()
  // const [hoveredItem, setHoveredItem] = React.useState(null);
  const [categories, setCategories] = React.useState<any>(null);
  const {showLoader, hideLoader} = useLoader()
  const getCategories = async()=>{
showLoader()
  const categories = await fetch(`https://dummyjson.com/products/categories`)
  if(categories.ok){
    setCategories(await categories.json())
  }
  hideLoader()
}
useEffect(() => {
getCategories()
}, [])

  // const handleMouseEnter = (item:any) => {
  //   setHoveredItem(item);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredItem(null);
  // };


  return (
    <div>
      {/* <ul className={`${className}`}>
        {items?.map((item:any, index:number) => (
          <li
            key={index}
            className="px-2 py-2 cursor-pointer hover:bg-[#ddd] duration-300"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >   {item.level === 0 ? (
            <span>{item.name}</span>
          ) : (
            <Link to={item.slug} className='block'  >
              {item.name}
            </Link>
          )}
            {item.children.length > 0 && hoveredItem === item && (
              <MultiLevelDropDown
                items={item.children}
                className="py-1 absolute z-10 shadow-md top-[-1px] left-[270px] w-[280px] h-[400px] bg-white border"
              
              />
            )}
          </li>
        ))}
      </ul> */}
      <ul className={`${className}`}>
        {categories && categories?.map((item:any, index:number) => (
          <li
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:shadow text-xs duration-300"
            onClick={()=> navigate(`/category?product=${item.slug}`)}
            
          >   
            <span>{item.name}</span>
        
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiLevelDropDown;