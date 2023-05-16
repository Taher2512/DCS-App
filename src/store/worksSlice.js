import {createSlice} from '@reduxjs/toolkit';

const date = new Date();
const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const initialDate =
  date.getDate().toString() +
  '/' +
  month[date.getMonth().toString()] +
  '/' +
  date.getFullYear().toString();

const initialState = {
  user: null,
  allWorks: [],
  works: [],
  date: initialDate,
  headerDates: [],
};

export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },

    setDate: (state, action) => {
      const newDate = action.payload;
      const splitDate = newDate.split('/');
      const formattedDate =
        splitDate[0] + '/' + splitDate[1] + '/' + splitDate[2];
      state.date = formattedDate;
    },

    setHeaderDates: (state, action) => {
      state.headerDates = action.payload;
    },

    setWorks: (state, action) => {
      state.works = action.payload;
    },

    setAllWorks: (state, action) => {
      state.allWorks = action.payload;
    },
  },
});
