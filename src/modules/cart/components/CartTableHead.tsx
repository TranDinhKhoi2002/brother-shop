/* eslint-disable no-unused-vars */
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const headCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: 'Hình ảnh',
    flex: 1,
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Tên sản phẩm',
    flex: 1,
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Giá',
    flex: 1,
  },
  {
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Size',
    flex: 1,
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Số lượng',
    flex: 1,
  },
  {
    id: 'totalPrice',
    numeric: true,
    disablePadding: false,
    label: 'Thành tiền',
    flex: 1,
  },
];

type CartTableHeadProps = {
  onSelectAllClick?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
  order: 'asc' | 'desc';
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort?: (event: any, property: string) => void;
};

function CartTableHead(props: CartTableHeadProps): React.ReactElement {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="secondary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all rows',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id && order}
            sx={{ fontWeight: 'bold' }}
          >
            {headCell.label.toUpperCase()}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CartTableHead;
