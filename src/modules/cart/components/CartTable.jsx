import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import EmptyCart from './EmptyCart';
import CartTableToolbar from './CartTableToolbar';
import CartTableHead from './CartTableHead';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemoveItemsFromCart, selectCartProducts } from '@/redux/slices/cart';
import { selectCurrentUser } from '@/redux/slices/auth';
import Cookies from 'js-cookie';
import CartTableItem from './CartTableItem';

function descendingComparator(a, b, orderBy) {
  console.log(b[orderBy], a[orderBy], typeof orderBy, a, b);
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function CartTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('price');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const cartProducts = useSelector(selectCartProducts);
  const user = useSelector(selectCurrentUser);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [requestLoginModal, setRequestLoginModal] = useState(false);

  useEffect(() => {
    if (cartProducts || user) {
      setRows(cartProducts);
    }
  }, [cartProducts, user]);

  const handleDelete = async () => {
    const currentRows = [...rows];
    const restRows = currentRows.filter(
      (row) => selected.findIndex((item) => item.productId._id === row.productId._id && item.size === row.size) === -1,
    );
    setRows(restRows);
    setSelected([]);

    if (!Boolean(token)) {
      dispatch(assignProductsToCart({ cart: restRows }));
      return;
    }

    try {
      const removedItems = selected.map((item) => ({ productId: item.productId._id, size: item.size }));
      const { success } = await dispatch(fetchRemoveItemsFromCart({ items: removedItems })).unwrap();
      if (success) {
        toast.success('Removed items successfully!!');
      }
    } catch (error) {
      toast.error('Something went wrong!! Please try again');
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.findIndex((item) => item._id === row._id && item.size === row.size);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const token = Cookies.get('token');
  const handleCheckout = async () => {
    router.push('/checkout/login');
  };

  const isSelected = (row) => selected.findIndex((item) => item._id === row._id && item.size === row.size) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cartProducts?.length) : 0;

  return (
    <Box sx={{ width: '100%', mt: 6 }}>
      {rows && rows.length > 0 && (
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <CartTableToolbar numSelected={selected.length} onDelete={handleDelete} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                <CartTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <CartTableItem
                          key={index}
                          item={row}
                          labelId={labelId}
                          isItemSelected={isItemSelected}
                          onClick={handleClick}
                        />
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="contained"
              sx={{ paddingX: 8, paddingY: 2, fontSize: '1rem', borderRadius: 4, textTransform: 'uppercase' }}
              onClick={handleContinueShopping}
            >
              Shop Now
            </Button>
            <Button
              variant="contained"
              sx={{ paddingX: 8, paddingY: 2, fontSize: '1rem', borderRadius: 4, textTransform: 'uppercase' }}
              onClick={handleCheckout}
            >
              Check Out
            </Button>
          </Stack>
        </>
      )}

      {rows && rows?.length === 0 && <EmptyCart />}
    </Box>
  );
}

export default CartTable;
