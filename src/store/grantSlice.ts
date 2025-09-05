import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { GrantState } from "../types/grant";

export interface Grant {
  id: string;
  company: string;
  symbol: string;
  grantDate: string; 
  shares: number;
  grantPrice: number;
  vestingSchedule: string; 
  vestedShares: number;
}


const initialState: GrantState = {
  grants: [],
  mode:'dark'
};

const grantSlice = createSlice({
  name: "grants",
  initialState,
  reducers: {
    addGrant: (state, action: PayloadAction<Omit<Grant, "id">>) => {
      state.grants.push({ ...action.payload, id: uuidv4() });
    },
    updateGrant: (
      state,
      action: PayloadAction<{ id: string; updated: Partial<Grant> }>
    ) => {
      const { id, updated } = action.payload;
      const index = state.grants.findIndex((g) => g.id === id);
      if (index !== -1) {
        state.grants[index] = { ...state.grants[index], ...updated };
      }
    },
    deleteGrant: (state, action: PayloadAction<string>) => {
      state.grants = state.grants.filter((g) => g.id !== action.payload);
    },
    clearGrants: (state) => {
      state.grants = [];
    },
    toggleMode:(state)=>{
      console.log("toggling mode",state.mode)
      state.mode=state.mode==='dark'?'light':'dark'
    }
  },
});

export const { addGrant, updateGrant, deleteGrant, clearGrants,toggleMode } =
  grantSlice.actions;

export default grantSlice.reducer;
