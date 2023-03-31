import { Button } from '@mui/material';

function RemoveAllButton({ onClick }) {
  return (
    <Button
      sx={{
        backgroundColor: 'white !important',
        border: '1px solid #e1e2e3',
        textTransform: 'uppercase',
        py: '4px',
        px: 3,
        borderRadius: '20px',
        height: '39.6px',
      }}
      onClick={onClick}
    >
      Xoá tất cả
    </Button>
  );
}

export default RemoveAllButton;
