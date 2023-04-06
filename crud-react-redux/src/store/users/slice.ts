import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserWithId } from "./slice";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "peter@hotmail.com",
		github: "leo",
	},
	{
		id: "2",
		name: "Alexandru Alexandrov",
		email: "peter2@hotmail.com",
		github: "alaldo",
	},
	{
		id: "3",
		name: "Peter Doe3",
		email: "peter3@hotmail.com",
		github: "midudev",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
			// return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserPresent = state.some((user) => user.id === action.payload.id);

			if (!isUserPresent) {
				state.push(action.payload);
				// return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
