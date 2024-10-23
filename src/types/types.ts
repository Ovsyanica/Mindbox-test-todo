export enum StatusTypes {
	ALL = 'ALL',
	ACTIVE = 'ACTIVE',
	COMPLETED = 'COMPLETED',
}

export type FilterByStatusType =
	StatusTypes.ALL
	| StatusTypes.ACTIVE
	| StatusTypes.COMPLETED

export type TodoStatusType =
	StatusTypes.ACTIVE
	| StatusTypes.COMPLETED

export interface Todo {
	id: number;
	description: string;
	status: TodoStatusType;
}