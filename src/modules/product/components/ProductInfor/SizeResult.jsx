import { Box, Typography } from '@mui/material';
import Button from '@/common/components/UI/Button';

function SizeResult({ selectedSize, onChooseSize, onChooseAgain }) {
  return (
    <>
      {selectedSize && selectedSize !== 'wrong' && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            Size phù hợp với bạn
          </Typography>
          <Box sx={{ my: 6 }}>
            <Typography sx={{ px: 4, py: 1, border: '1px solid #111111', display: 'inline-block', fontWeight: 500 }}>
              {selectedSize}
            </Typography>
          </Box>
          <Box>
            <Button className="rounded-none px-10 font-medium" onClick={onChooseSize.bind(this, selectedSize)}>
              Chọn size {selectedSize}
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button className={`rounded-none font-medium !bg-transparent text-gray`} onClick={onChooseAgain}>
              Tôi muốn chọn size khác
            </Button>
          </Box>
        </Box>
      )}

      {selectedSize && selectedSize === 'wrong' && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            Size phù hợp với bạn
          </Typography>
          <Typography sx={{ fontWeight: 400, my: 3, px: 4 }}>
            Dường như những thông tin bạn chọn không khớp với nhau hoặc chúng tôi không tìm thấy size nào phù hợp với
            bạn
          </Typography>
          <Button className="rounded-none px-10 font-medium mt-3" onClick={onChooseAgain}>
            Chọn lại
          </Button>
        </Box>
      )}
    </>
  );
}

export default SizeResult;
