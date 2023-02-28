import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from '@/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Actions(props) {
  const products = useSelector((state) => state.cart.products);
  const router = useRouter();
  const isLoggedin = useSelector((state) => state.auth.isAuth);

  const checkoutHandler = () => {
    router.push(config.routes.checkoutLogin);
  };

  const authHandler = () => {
    if (isLoggedin) {
      router.push(config.routes.account);
    } else {
      router.push(config.routes.login);
    }
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center">
      <button
        className="w-4 h-4 leading-4 bg-transparent text-[#868995] cursor-pointer mx-3 transition duration-300 ease-linear hover:text-[#3d3f45]"
        onClick={props.openSearch}
      >
        <FontAwesomeIcon className="ml-[6px] text-[16px]" icon={faSearch} />
      </button>
      <button
        onClick={authHandler}
        className="w-4 h-4 leading-4 bg-transparent text-[#868995] cursor-pointer mx-3 transition duration-300 ease-linear hover:text-[#3d3f45]"
      >
        <FontAwesomeIcon className="ml-[6px] text-[16px]" icon={faUser} />
      </button>
      <button
        onClick={checkoutHandler}
        className="relative w-4 h-4 leading-4 bg-transparent text-[#868995] cursor-pointer mx-3 transition duration-300 ease-linear hover:text-[#3d3f45]"
      >
        <FontAwesomeIcon className="ml-[6px] text-[16px]" icon={faBagShopping} />
        <span className="absolute top-[-11px] left-4 w-5 h-5 leading-5 rounded-full bg-[#ee4266] text-white text-[12px]">
          {products.length}
        </span>
      </button>
      <button
        onClick={() => {
          props.showSideBar();
        }}
        className="w-[25px] h-[25px] text-[#868995] hover:text-[#3d3f45] transition duration-300 ease-linear ml-5 inline-block lg:hidden"
      >
        <FontAwesomeIcon className="text-2xl" icon={faBars} />
      </button>
    </div>
  );
}

export default Actions;
