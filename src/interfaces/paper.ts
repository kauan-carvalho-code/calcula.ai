export interface PaperWithoutId {
  name: string;
  width: number;
  height: number;
  value: number;
  grammage: number;
}

export interface Paper extends PaperWithoutId {
  id: string;
}
