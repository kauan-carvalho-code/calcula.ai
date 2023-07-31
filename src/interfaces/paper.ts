interface PaperSize {
  width: number;
  height: number;
}

export interface Paper {
  id: number;
  name: string;
  size: PaperSize;
  value: number;
  grammage: number;
}