import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/styles';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';
import Image from 'next/image';

function OrderItem({ order }) {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          #{order._id.slice(0, 8).toUpperCase()}
        </TableCell>
        <TableCell align="center">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
        <TableCell align="center">{order.products.length}</TableCell>
        <TableCell align="center">{printNumberWithCommas(order.totalProductsPrice)}đ</TableCell>
        <TableCell align="center">{order.shippingStatus}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Thông tin đặt hàng
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead sx={{ backgroundColor: theme.palette.grey[300] }}>
                  <TableRow>
                    <TableCell align="center">ĐỊA CHỈ</TableCell>
                    <TableCell align="center">PHƯƠNG THỨC VẬN CHUYỂN</TableCell>
                    <TableCell align="center">PHƯƠNG THỨC THANH TOÁN</TableCell>
                    <TableCell align="center">TÌNH TRẠNG</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {order.toAddress}
                    </TableCell>
                    <TableCell align="center">{order.shippingMethod}</TableCell>
                    <TableCell align="center">{order.paymentMethod}</TableCell>
                    <TableCell align="center">{order.paymentStatus}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography variant="h6" gutterBottom component="div" sx={{ mt: 3 }}>
                Danh sách sản phẩm
              </Typography>
              <Table size="medium" aria-label="products">
                <TableHead sx={{ backgroundColor: theme.palette.grey[300] }}>
                  <TableRow>
                    <TableCell align="center">HÌNH ẢNH</TableCell>
                    <TableCell align="center">TÊN SẢN PHẨM</TableCell>
                    <TableCell align="center">ĐƠN GIÁ</TableCell>
                    <TableCell align="center">SỐ LƯỢNG</TableCell>
                    <TableCell align="center">THÀNH TIỀN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell align="center">
                        <Image src={product.image} width={100} height={100} alt={product.name} />
                      </TableCell>
                      <TableCell align="center">{product.name}</TableCell>
                      <TableCell align="center">{printNumberWithCommas(product.price)}đ</TableCell>
                      <TableCell align="center">{product.amount}</TableCell>
                      <TableCell align="center">{printNumberWithCommas(product.price * product.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PurchaseHistoryTable({ orders }) {
  const theme = useTheme();

  console.log(orders);

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[300] }}>
            <TableCell />
            <TableCell align="center">MÃ ĐƠN HÀNG</TableCell>
            <TableCell align="center">NGÀY MUA</TableCell>
            <TableCell align="center">SỐ SẢN PHẨM</TableCell>
            <TableCell align="center">TỔNG TIỀN</TableCell>
            <TableCell align="center">TÌNH TRẠNG</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
