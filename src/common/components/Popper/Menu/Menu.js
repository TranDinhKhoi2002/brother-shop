import Tippy from '@tippyjs/react/headless';
import Link from 'next/link';

import 'tippy.js/dist/tippy.css';
import PopperWrapper from './PopperWrapper';
import MenuItem from './MenuItem';

function Menu({ items = [], children, detail = false }) {
  return (
    <Tippy
      delay={[0, 100]}
      interactive
      placement="bottom-start"
      offset={[12, 8]}
      render={(attrs) => (
        <div
          className={`absolute top-3 left-[-18px] w-[228px] inline-flex animate-headerMenuFadeIn ${
            detail && 'w-[200px] left-[-100px]'
          }`}
          tabIndex="-1"
          {...attrs}
        >
          <PopperWrapper>
            {detail ? (
              <div className="flex flex-wrap">
                {items.map((item, index) => (
                  <div key={index} className="p-4 text-[#f3f3f4]">
                    <Link
                      className="hover:text-primary transition duration-300"
                      href={{
                        pathname: item._id,
                        query: { title: item.name },
                      }}
                      as={item._id}
                    >
                      {item.name}
                    </Link>
                    <ul>
                      {item.types.map((child, index) => (
                        <li className="hover:text-primary transition duration-300" key={index}>
                          <Link
                            href={{
                              pathname: child._id,
                              query: { title: child.type },
                            }}
                            as={child._id}
                          >
                            {child.type}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              items.map((item, index) => <MenuItem key={index} title={item.type} path={`/category/${item._id}`} />)
            )}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
