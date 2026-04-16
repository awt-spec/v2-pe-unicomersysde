import { MAX_ROWS, MAX_COLS, CELL_W } from "./puzzleData";

export type Edge = "flat" | "tab" | "blank";

export type PieceEdges = {
  topEdges: Edge[];
  bottomEdges: Edge[];
  left: Edge;
  right: Edge;
};

/** Legacy single-edge helper (still used for simple pieces) */
export const getEdges = (row: number, col: number, colSpan: number = 1): { top: Edge; right: Edge; bottom: Edge; left: Edge } => {
  const endCol = col + colSpan - 1;
  const top: Edge = row === 0 ? "flat" : ((row - 1 + col) % 2 === 0 ? "blank" : "tab");
  const bottom: Edge = row === MAX_ROWS - 1 ? "flat" : ((row + col) % 2 === 0 ? "tab" : "blank");
  const left: Edge = col === 0 ? "flat" : ((row + col - 1) % 2 === 0 ? "blank" : "tab");
  const right: Edge = endCol === MAX_COLS - 1 ? "flat" : ((row + endCol) % 2 === 0 ? "tab" : "blank");
  return { top, right, bottom, left };
};

/** Multi-edge helper: returns per-cell top/bottom edges for colSpan pieces */
export const getPieceEdges = (row: number, col: number, colSpan: number = 1): PieceEdges => {
  const topEdges: Edge[] = [];
  const bottomEdges: Edge[] = [];
  for (let c = col; c < col + colSpan; c++) {
    topEdges.push(row === 0 ? "flat" : ((row - 1 + c) % 2 === 0 ? "blank" : "tab"));
    bottomEdges.push(row === MAX_ROWS - 1 ? "flat" : ((row + c) % 2 === 0 ? "tab" : "blank"));
  }
  const left: Edge = col === 0 ? "flat" : ((row + col - 1) % 2 === 0 ? "blank" : "tab");
  const endCol = col + colSpan - 1;
  const right: Edge = endCol === MAX_COLS - 1 ? "flat" : ((row + endCol) % 2 === 0 ? "tab" : "blank");
  return { topEdges, bottomEdges, left, right };
};

const T = 18;
const NW = 14;
const BW = 22;

/** Build SVG path with multiple tabs per edge for wide pieces */
export const buildPathMulti = (
  W: number, H: number, cellW: number,
  edges: PieceEdges
): string => {
  let d = `M 0,0 `;

  // TOP — one tab per cell segment
  for (let i = 0; i < edges.topEdges.length; i++) {
    const startX = i * cellW;
    const endX = (i + 1) * cellW;
    const edge = edges.topEdges[i];
    if (edge === "flat") {
      d += `L ${endX},0 `;
    } else {
      const cx = startX + cellW / 2;
      const dir = edge === "tab" ? -1 : 1;
      d += `L ${cx - NW},0 L ${cx - NW},${dir * 6} `;
      d += `C ${cx - BW},${dir * T} ${cx + BW},${dir * T} ${cx + NW},${dir * 6} `;
      d += `L ${cx + NW},0 L ${endX},0 `;
    }
  }

  // RIGHT
  if (edges.right === "flat") {
    d += `L ${W},${H} `;
  } else {
    const cy = H / 2;
    const dir = edges.right === "tab" ? 1 : -1;
    d += `L ${W},${cy - NW} L ${W + dir * 6},${cy - NW} `;
    d += `C ${W + dir * T},${cy - BW} ${W + dir * T},${cy + BW} ${W + dir * 6},${cy + NW} `;
    d += `L ${W},${cy + NW} L ${W},${H} `;
  }

  // BOTTOM — one tab per cell segment, drawn right-to-left
  for (let i = edges.bottomEdges.length - 1; i >= 0; i--) {
    const endX = i * cellW;
    const edge = edges.bottomEdges[i];
    if (edge === "flat") {
      d += `L ${endX},${H} `;
    } else {
      const cx = i * cellW + cellW / 2;
      const dir = edge === "tab" ? 1 : -1;
      d += `L ${cx + NW},${H} L ${cx + NW},${H + dir * 6} `;
      d += `C ${cx + BW},${H + dir * T} ${cx - BW},${H + dir * T} ${cx - NW},${H + dir * 6} `;
      d += `L ${cx - NW},${H} L ${endX},${H} `;
    }
  }

  // LEFT
  if (edges.left === "flat") {
    d += `L 0,0 `;
  } else {
    const cy = H / 2;
    const dir = edges.left === "tab" ? -1 : 1;
    d += `L 0,${cy + NW} L ${dir * 6},${cy + NW} `;
    d += `C ${dir * T},${cy + BW} ${dir * T},${cy - BW} ${dir * 6},${cy - NW} `;
    d += `L 0,${cy - NW} L 0,0 `;
  }

  d += "Z";
  return d;
};

/** Legacy single-tab builder (kept for compatibility) */
export const buildPath = (
  W: number, H: number,
  edges: { top: Edge; right: Edge; bottom: Edge; left: Edge }
) => {
  // Convert to multi format with 1 segment
  return buildPathMulti(W, H, W, {
    topEdges: [edges.top],
    bottomEdges: [edges.bottom],
    left: edges.left,
    right: edges.right,
  });
};
