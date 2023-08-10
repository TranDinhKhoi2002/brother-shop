// import CartDrawer from '@/modules/cart/components/CartDrawer';
import { ReactElement, ReactNode, useState } from 'react';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  children?: ReactNode;
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

  const render = (drawerChildren?: ReactNode) => {
    return (
      <Drawer isVisible={isOpen} onClose={handleCloseDrawer}>
        {drawerChildren}
      </Drawer>
    );
  };

  return {
    render,
    onOpen: handleOpenDrawer,
  };
}
