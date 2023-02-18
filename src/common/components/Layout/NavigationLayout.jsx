import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faSignOut } from '@fortawesome/free-solid-svg-icons';
// import { logout } from '../../store/auth';
import { useRouter } from 'next/router';
import { logout } from '@/redux/slices/auth';

function NavigationLayout({ title, children }) {
  const dispatch = useDispatch();

  const router = useRouter();

  const backHandler = () => {
    router.back();
  };

  const logoutHandler = () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (
    <div className="mt-20 xl:px-[5%]">
      <div className="flex items-center py-1 px-4 mb-2 bg-[#e9ecef]">
        <button onClick={backHandler}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-xl text-[#444444] hover:text-blue transition duration-300 cursor-pointer"
          />
        </button>
        <span className="mx-2">/</span>
        <strong className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</strong>
        {router.pathname === '/account' && (
          <div onClick={logoutHandler} className="hover:text-primary transition duration-150 cursor-pointer">
            <FontAwesomeIcon icon={faSignOut} className="ml-1 mr-3" />
            <span className="font-normal">Đăng xuất</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default NavigationLayout;
