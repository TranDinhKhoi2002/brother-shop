import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import EmptyCart from './EmptyCart';
import CartTableToolbar from './CartTableToolbar';
import CartTableHead from './CartTableHead';
import { ChangeEvent, useEffect, useState } from 'react';
import { assignProductsToCart, fetchRemoveItemsFromCart, selectCartProducts } from '@/redux/slices/cart';
import { selectCurrentUser, selectIsAuthenticated } from '@/redux/slices/auth';
import CartTableItem from './CartTableItem';
import { toast } from 'react-toastify';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CartItem } from '@/types/customer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Product } from '@/types/product';

function CartTable() {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('price');
  const [selected, setSelected] = useState<CartItem[]>([]);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<CartItem[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const cartProducts = useAppSelector<CartItem[]>(selectCartProducts);
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (cartProducts || user) {
      setRows(cartProducts);
    }
  }, [cartProducts, user]);

  const handleDelete = async () => {
    const currentRows = [...rows];
    const restRows = currentRows.filter(
      (row) =>
        selected.findIndex(
          (item) => (item.productId as Product)._id === (row.productId as Product)._id && item.size === row.size,
        ) === -1,
    );

    setRows(restRows);
    setSelected([]);

    if (!isAuthenticated) {
      dispatch(assignProductsToCart({ cart: restRows }));
      setConfirmDelete(false);
      return;
    }

    try {
      const removedItems = selected.map((item) => ({ productId: (item.productId as Product)._id, size: item.size }));
      const { success, cart } = await dispatch(fetchRemoveItemsFromCart({ items: removedItems })).unwrap();
      if (success) {
        dispatch(assignProductsToCart({ cart: cart }));
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
        setConfirmDelete(false);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, row: CartItem) => {
    const selectedIndex = selected.findIndex((item) => item._id === row._id && item.size === row.size);
    let newSelected: CartItem[] = [];

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

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (row: CartItem) =>
    selected.findIndex((item) => item._id === row._id && item.size === row.size) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cartProducts?.length) : 0;

  return (
    <>
      <Box sx={{ width: '100%', mt: 6 }}>
        {rows && rows.length > 0 && (
          <>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CartTableToolbar numSelected={selected.length} onDelete={() => setConfirmDelete(true)} />
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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                labelRowsPerPage="Số sản phẩm mỗi trang"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} trên ${count !== -1 ? count : `more than ${to}`}`
                }
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        )}

        {rows && rows?.length === 0 && <EmptyCart />}
      </Box>
      <ConfirmModal
        isOpen={confirmDelete}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        confirmTextBtn="Xóa"
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default CartTable;