import { createSlice } from "@reduxjs/toolkit";

const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const initialState = {
  income: [],
  expense: [],
};

const financeDataSlice = createSlice({
  name: "financeData",
  initialState: initialState,
  reducers: {
    addRecord: (state, action) => {
      // ambil data yg diperlukan dari form untuk validasi
      const getDate = new Date(action.payload.date);
      const getType = action.payload.type;

      const dateSame = state[getType].find((items) => items.year === getDate.getFullYear());

      if (dateSame) {
        if (dateSame.data[monthsList[getDate.getMonth()]]) {
          dateSame.data[monthsList[getDate.getMonth()]].push(action.payload);
        } else {
          dateSame.data[monthsList[getDate.getMonth()]] = [action.payload];
        }
      } else {
        state[getType].push({
          year: getDate.getFullYear(),
          data: {
            [monthsList[getDate.getMonth()]]: [action.payload],
          },
        });
      }
    },
    editRecord: (state, action) => {
      // ambil data baru
      const dataNew = action.payload;
      const yearArray = state[dataNew.type];

      // cek di local
      for (const year of yearArray) {
        for (let month in year.data) {
          year.data[month] = year.data[month].map((item) => (item.id === dataNew.id ? dataNew : item));
        }
      }
    },
    deleteRecord: (state, action) => {
      const id = action.payload;

      for (let typeKey in state) {
        for (const year of state[typeKey]) {
          for (let month in year.data) {
            year.data[month] = year.data[month].filter((item) => item.id !== id);

            // cek bulan jika kosong = hapus
            if (year.data[month].length === 0) {
              delete year.data[month];
            }

            // cek tahun jika kosong semua bulannya = hapus tahun
            state[typeKey] = state[typeKey].filter((year) => {
              return Object.values(year.data).some((arr) => arr.length > 0);
            });
          }
        }
      }
    },
  },
});

export const { addRecord, editRecord, deleteRecord } = financeDataSlice.actions;
export default financeDataSlice.reducer;
