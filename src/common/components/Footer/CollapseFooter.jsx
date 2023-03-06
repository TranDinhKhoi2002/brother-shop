import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import useCollapse from 'react-collapsed';

function CollapseFooter(props) {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <Box>
      <Box
        sx={{ color: '#00ffff', cursor: 'pointer', fontSize: '13px', display: 'relative' }}
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <Typography component="span" sx={{ fontWeight: 'light' }}>
          Xem thêm Thông tin Brother Shop
        </Typography>
        <FontAwesomeIcon icon={faAngleDown} className="ml-2 cursor-pointer" />
      </Box>

      <ul {...getCollapseProps()} className="mt-3">
        <li>Giới thiệu về YaMe.vn</li>
        <li>Tuyển dụng</li>
        <li>.</li>
        <li>Quy chế hoạt động</li>
        <li>Điều khoản mua bán</li>
        <li>.</li>
        <li>Mã Voucher giảm giá</li>
        <br />
        <p>Đặt hàng và thu tiền tận nơi toàn quốc</p>
        <h5 className="text-xl font-medium">(028) 7307 1441</h5>
        <br />
        <h4 className="text-2xl font-medium mb-2">FAQ</h4>
        <ul>
          <li>Vận chuyển</li>
          <li>Chính sách đổi trả</li>
          <li>Chính sách bảo hành</li>
          <li>Khách hàng VIP</li>
          <li>Đối tác cung cấp</li>
        </ul>
      </ul>
    </Box>
  );
}

export default CollapseFooter;
