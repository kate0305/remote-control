import { MouseClass } from "@nut-tree/nut-js";

export type MouseCommandHandler = (number: number) => Promise<MouseClass>;
export type MousePositionHandler = () => Promise<string>;