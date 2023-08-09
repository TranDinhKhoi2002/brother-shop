// import CartDrawer from '@/modules/cart/components/CartDrawer';
import { ReactElement, useState } from 'react';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

type DrawerComponent = (_props: DrawerProps) => ReactElement;

export default function useDrawer(Drawer: DrawerComponent) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  const render = () => {
    return <Drawer isVisible={isOpen} onClose={handleCloseDrawer} />;
  };

  return {
    render,
    onOpen: handleOpenDrawer,
  };
}
