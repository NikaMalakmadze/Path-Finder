import { aldousBroderMaze } from "../lib/maze/aldousBroder";
import { binaryMaze } from "../lib/maze/binaryTree";
import { sideWinder } from "../lib/maze/sideWinder";
import aStar from "../lib/pathFinder/aStar";
import bfs from "../lib/pathFinder/bfs";
import dfs from "../lib/pathFinder/dfs";
import dijkstra from "../lib/pathFinder/dijkstra";

export const ROWS = 25;
export const COLUMNS = 25;
export const WALL_STYLE_ANIMATION = "animate-barrier";
export const WALL_STYLE_STATIC = "bg-blue-800";
export const START_STYLE_ANIMATION = "animate-start";
export const START_STYLE_STATIC = "bg-green-500";
export const END_STYLE_ANIMATION = "animate-end";
export const END_STYLE_STATIC = "bg-orange-500";
export const OPEN_STYLE_STATIC = "bg-rose-500";
export const OPEN_STYLE_ANIMATION = "animate-open";
export const CLOSED_STYLE_STATIC = "bg-cyan-500";
export const CLOSED_STYLE_ANIMATION = "animate-closed";
export const PATH_STYLE_STATIC = "bg-amber-600";
export const PATH_STYLE_ANIMATION = "animate-path";
export const STYLES_TO_CLEAR = [
	OPEN_STYLE_STATIC,
	CLOSED_STYLE_STATIC,
	PATH_STYLE_STATIC,
	OPEN_STYLE_ANIMATION,
	CLOSED_STYLE_ANIMATION,
	PATH_STYLE_ANIMATION,
];
export const MAZE_ALGORITHMS = ["Binary Tree", "SideWinder", "AldousBroder"];
export const MAZE_ALGORITHMS_FUNCS = new Map([
	["Binary Tree", binaryMaze],
	["SideWinder", sideWinder],
	["AldousBroder", aldousBroderMaze],
]);
export const PATH_FINDER_ALGORITHMS = ["BFS", "DFS", "Dijkstra", "AStar"];
export const PATH_FINDER_ALGORITHMS_FUNCS = new Map([
	["BFS", bfs],
	["DFS", dfs],
	["Dijkstra", dijkstra],
	["AStar", aStar],
]);
