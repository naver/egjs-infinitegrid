import {window} from "./browser";

/**
 * @name eg.InfiniteGrid.DIRECTION_NONE
 * @constant
 * @type {Number}
 */
/**
 * @name eg.InfiniteGrid.DIRECTION_LEFT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.InfiniteGrid.DIRECTION_RIGHT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.InfiniteGrid.DIRECTION_UP
 * @constant
 * @type {Number}
 */
/**
 * @name eg.InfiniteGrid.DIRECTION_DOWN
 * @constant
 * @type {Number}
*/
/**
 * @name eg.InfiniteGrid.DIRECTION_HORIZONTAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.InfiniteGrid.DIRECTION_VERTICAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.InfiniteGrid.DIRECTION_ALL
 * @constant
 * @type {Number}
*/
const direction = {
	DIRECTION_NONE: 1,
	DIRECTION_LEFT: 2,
	DIRECTION_RIGHT: 4,
	DIRECTION_UP: 8,
	DIRECTION_DOWN: 16,
	DIRECTION_HORIZONTAL: 2 | 4,
	DIRECTION_VERTICAL: 8 | 16
};

direction.DIRECTION_ALL = direction.DIRECTION_HORIZONTAL |
	direction.DIRECTION_VERTICAL;
export const DIRECTION = direction;
export const UNIQUEKEY = "__MOVABLECOORD__";
export const SUPPORT_TOUCH = "ontouchstart" in window;

