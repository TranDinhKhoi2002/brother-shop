import Menu from '../Popper/Menu/Menu';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectCategories } from '@/redux/slices/data';

function MainNavigation() {
  const categories = useSelector(selectCategories);
  const mainCategories = [...categories].slice(0, 4);
  const detailCategories = [...categories].slice(-2);

  return (
    <nav className="hidden lg:block">
      <ul className="flex">
        {mainCategories.map((category, index) => (
          <li key={index} className="py-0 px-5">
            {category.types.length > 0 ? (
              <Menu items={category.types}>
                <Link
                  className="transition duration-300 text-[#f3f3f4] hover:text-primary"
                  href={{
                    pathname: `/category/${category._id}`,
                    query: { title: category.name },
                  }}
                  as={`/category/${category._id}`}
                >
                  {category.name}
                  <FontAwesomeIcon className="ml-[6px] text-[12px]" icon={faAngleDown} />
                </Link>
              </Menu>
            ) : (
              <Link
                className="transition duration-300 text-[#f3f3f4] hover:text-primary"
                href={{
                  pathname: `/category/${category._id}`,
                  query: { title: category.name },
                }}
                as={`/category/${category._id}`}
              >
                {category.name}
              </Link>
            )}
          </li>
        ))}

        <li>
          <Menu detail={true} items={detailCategories}>
            <div className="transition duration-300 text-[#f3f3f4] cursor-pointer hover:text-primary">
              <FontAwesomeIcon className="ml-[6px] text-[12px]" icon={faBars} />
              <FontAwesomeIcon className="ml-[6px] text-[12px]" icon={faAngleDown} />
            </div>
          </Menu>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
