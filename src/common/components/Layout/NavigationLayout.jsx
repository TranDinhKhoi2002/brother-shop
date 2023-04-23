import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function NavigationLayout({ title, children }) {
  const router = useRouter();

  const backHandler = () => {
    router.back();
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
      </div>
      {children}
    </div>
  );
}

export default NavigationLayout;
