import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import CSSTransition from 'react-transition-group/CSSTransition';
import CollapseMenu from '@/common/components/Popper/Menu/CollapseMenu';
import Backdrop from './Backdrop';
import { useSelector } from 'react-redux';
import { selectCategories } from '@/redux/slices/data';

import styles from './Sidebar.module.css';

const animationTiming = {
  enter: 300,
  exit: 1000,
};

const Sidebar = ({ isVisible, onHide }) => {
  const [loaded, setLoaded] = useState(false);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={isVisible}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: '',
        enterActive: styles.SidebarOpen,
        exit: '',
        exitActive: styles.SidebarClosed,
      }}
    >
      <>
        <div className={styles.Sidebar}>
          <div className="flex justify-between items-center px-3 w-full h-[62px] bg-[#111]">
            <h3 className="text-white text-xl">Danh mục</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={onHide}
              className="text-white hover:text-[#3d3f45] transition duration-300 w-6 h-6 cursor-pointer"
            />
          </div>
          <div className="overflow-y-scroll p-5 h-[calc(100vh-140px)]">
            <ul>
              {categories.map((category) => (
                <li key={category._id} className="my-3">
                  {category.types.length > 0 ? (
                    <CollapseMenu to={`/category/${category._id}`} title={category.name} items={category.types} />
                  ) : (
                    <Link
                      href={{ pathname: `/category/${category._id}`, query: { title: category.name } }}
                      as={`/category/${category._id}`}
                      className="text-xl px-5 py-[5px] hover:text-primary transition duration-300"
                    >
                      {category.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Backdrop isVisible={isVisible} onHideSidebar={onHide} />
      </>
    </CSSTransition>,
    document.getElementById('__next'),
  );
};

export default Sidebar;
