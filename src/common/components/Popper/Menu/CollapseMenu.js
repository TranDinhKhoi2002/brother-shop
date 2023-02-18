import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import useCollapse from 'react-collapsed';
import Link from 'next/link';

function CollapseMenu(props) {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
  });

  return (
    <div className="relative">
      <Link
        href={props.to}
        state={{ title: props.title, products: props.products }}
        className="text-xl px-5 py-[5px] hover:text-primary transition duration-300"
      >
        {props.title}
      </Link>
      <span
        className="w-9 h-9 leading-9 rounded-full text-center bg-transparent hover:bg-[#f8f9fa] absolute right-0"
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <FontAwesomeIcon icon={faAngleDown} className={`${isExpanded && 'rotate-180'} transition duration-300`} />
      </span>
      <ul {...getCollapseProps()} className="ml-10">
        {props.children.map((item, index) => (
          <li key={index} className="my-2">
            <Link href={item.path} state={{ title: item.name, products: item.products }}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollapseMenu;
