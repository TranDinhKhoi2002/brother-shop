import config from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface BreadcrumbItem {
  id: string;
  url: string;
  name: string;
}

interface InitialState {
  items: BreadcrumbItem[];
  maxLevel: number;
}

const baseBreadcrumb = {
  id: 'home',
  url: config.routes.home,
  name: 'Trang chủ',
};

const initialState: InitialState = {
  items: [baseBreadcrumb],
  maxLevel: 4,
};

const breadcrumbSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    add(state, { payload: { item } }) {
      const { items, maxLevel } = state;
      let newItem = { ...item };
      if (newItem.url === items[items.length - 1].url || items.length > maxLevel) {
        return;
      }

      if (items.length === maxLevel) {
        newItem = { ...item, name: '...', url: '' };
      }

      state.items.push(newItem);
    },
    addMultiple(state, { payload: { items } }) {
      state.items = [baseBreadcrumb, ...items];
      if (state.items.length > state.maxLevel) {
        state.items[state.maxLevel] = { ...state.items[state.maxLevel], name: '...', url: '' };
      }
    },
    addOrReplace(state, { payload: { item } }) {
      const { items } = state;
      const isExisted = items.some(({ id }) => id === item.id);
      if (isExisted) {
        state.items = [...items.slice(0, items.length - 1), item];
      } else {
        state.items = [...items, item];
      }
    },
    update(state, { payload: { index } }) {
      const { items } = state;
      if (index === 0) {
        state.items = [];
      } else {
        state.items = items.slice(0, index + 1);
      }
    },
    updateBrandNewBreadcrumb(state, { payload: { item } }) {
      state.items = [baseBreadcrumb, item];
    },
    updateLatestItem(state, { payload: { item } }) {
      const { items } = state;
      const newItems = [...items.slice(0, items.length - 1), item];
      state.items = [...newItems];
    },
    updateItem(state, { payload: { item } }) {
      const { items } = state;
      const newItems = items.map((prevItem) => {
        if (prevItem.id === item.id) {
          return { ...prevItem, ...item };
        }
        return prevItem;
      });
      state.items = [...newItems];
    },
    removeLatestItem(state) {
      const { items } = state;
      state.items = items.slice(0, items.length - 1);
    },
    clear(state) {
      state.items = [baseBreadcrumb];
    },
  },
});

export const {
  add,
  addMultiple,
  addOrReplace,
  update,
  updateBrandNewBreadcrumb,
  updateLatestItem,
  updateItem,
  removeLatestItem,
  clear,
} = breadcrumbSlice.actions;

export const selectBreadcrumbItems = (state: RootState) => state.breadcrumbs.items;

export default breadcrumbSlice.reducer;
