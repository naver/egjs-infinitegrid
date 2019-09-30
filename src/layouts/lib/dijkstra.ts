/* eslint-disable */
/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
function single_source_shortest_paths(
	graph: (x: string) => ({ [key: string]: number }),
	s: string,
	d: string,
) {
	// Predecessor map for each node that has been encountered.
	// node ID => predecessor node ID
	const predecessors: { [key: string]: string } = {};
	// Costs of shortest paths from s to all nodes encountered.
	// node ID => cost
	const costs: { [key: string]: number } = {};
	costs[s] = 0;

	// Costs of shortest paths from s to all nodes encountered; differs from
	// `costs` in that it provides easy access to the node that currently has
	// the known shortest path from s.
	// XXX: Do we actually need both `costs` and `open`?
	const open = new BinaryHeap<{ value: string, cost: number }>(x => x.cost);
	open.push({ value: s, cost: 0 });

	let closest;
	let u;
	let cost_of_s_to_u;
	let adjacent_nodes;
	let cost_of_e;
	let cost_of_s_to_u_plus_cost_of_e;
	let cost_of_s_to_v;
	let first_visit: boolean;

	while (open.size()) {
		// In the nodes remaining in graph that have a known cost from s,
		// find the node, u, that currently has the shortest path from s.
		closest = open.pop();
		u = closest.value;
		cost_of_s_to_u = closest.cost;

		// Get nodes adjacent to u...
		adjacent_nodes = graph(u) || {};

		// ...and explore the edges that connect u to those nodes, updating
		// the cost of the shortest paths to any or all of those nodes as
		// necessary. v is the node across the current edge from u.
		for (const v in adjacent_nodes) {
			// Get the cost of the edge running from u to v.
			cost_of_e = adjacent_nodes[v];

			// Cost of s to u plus the cost of u to v across e--this is *a*
			// cost from s to v that may or may not be less than the current
			// known cost to v.
			cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

			// If we haven't visited v yet OR if the current known cost from s to
			// v is greater than the new cost we just found (cost of s to u plus
			// cost of u to v across e), update v's cost in the cost list and
			// update v's predecessor in the predecessor list (it's now u).
			cost_of_s_to_v = costs[v];
			first_visit = (typeof costs[v] === "undefined");
			if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
				costs[v] = cost_of_s_to_u_plus_cost_of_e;
				open.push({ value: v, cost: cost_of_s_to_u_plus_cost_of_e });
				predecessors[v] = u;
			}
		}
	}

	if (typeof costs[d] === "undefined") {
		const msg = ["Could not find a path from ", s, " to ", d, "."].join("");
		throw new Error(msg);
	}

	return predecessors;
}
function extract_shortest_path_from_predecessor_list(
	predecessors: { [key: string]: string },
	d: string,
) {
	const nodes: string[] = [];
	let u = d;

	while (u) {
		nodes.push(u);
		u = predecessors[u];
	}
	nodes.reverse();
	return nodes;
}
function find_path(
	graph: (x: string) => ({ [key: string]: number }),
	s: string,
	d: string,
) {
	const predecessors = single_source_shortest_paths(graph, s, d);

	return extract_shortest_path_from_predecessor_list(predecessors, d);
}

class BinaryHeap<T> {
	private content: T[];
	private scoreFunction: (x: T) => number;

	constructor(scoreFunction: (x: T) => number) {
		this.content = [];
		this.scoreFunction = scoreFunction;
	}
	public push(element: T) {
		// Add the new element to the end of the array.
		this.content.push(element);
		// Allow it to bubble up.
		this.bubbleUp(this.content.length - 1);
	}
	public pop() {
		// Store the first element so we can return it later.
		const result = this.content[0];
		// Get the element at the end of the array.
		const end = this.content.pop()!;
		// If there are any elements left, put the end element at the
		// start, and let it sink down.
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	}
	public size() {
		return this.content.length;
	}
	public bubbleUp(_n: number) {
		let n = _n;
		// Fetch the element that has to be moved.
		const element = this.content[n];
		// When at 0, an element can not go up any further.
		while (n > 0) {
			// Compute the parent element's index, and fetch it.
			const parentN = Math.floor((n + 1) / 2) - 1;
			const parent = this.content[parentN];

			// Swap the elements if the parent is greater.
			if (this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;
				// Update 'n' to continue at the new position.
				n = parentN;
			} else {
				// Found a parent that is less, no need to move it further.
				break;
			}
		}
	}
	public sinkDown(n: number) {
		// Look up the target element and its score.
		const length = this.content.length;
		const element = this.content[n];
		const elemScore = this.scoreFunction(element);
		let child1Score;

		while (true) {
			// Compute the indices of the child elements.
			const child2N = (n + 1) * 2;
			const child1N = child2N - 1;
			// This is used to store the new position of the element,
			// if any.
			let swap: number | null = null;
			// If the first child exists (is inside the array)...
			if (child1N < length) {
				// Look it up and compute its score.
				const child1 = this.content[child1N];
				child1Score = this.scoreFunction(child1);
				// If the score is less than our element's, we need to swap.
				if (child1Score < elemScore) {
					swap = child1N;
				}
			}
			// Do the same checks for the other child.
			if (child2N < length) {
				const child2 = this.content[child2N];
				const child2Score = this.scoreFunction(child2);

				if (child2Score < (swap == null ? elemScore : child1Score)) {
					swap = child2N;
				}
			}

			// If the element needs to be moved, swap it, and continue.
			if (swap !== null) {
				this.content[n] = this.content[swap];
				this.content[swap] = element;
				n = swap;
			} else {
				// Otherwise, we are done.
				break;
			}
		}
	}
}

export { find_path };
