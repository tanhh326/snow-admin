export interface DynamicTableColumn {
  title?: string;
  prop?: string;
  type?: string;
  show: boolean;
  width?: string;
  render?: (scope: Scope) => JSX.Element[] | JSX.Element | string;
}

export interface Scope {
  row: any;
  column: string;
  $index: number;
}

export type Action = 'add' | 'delete' | 'import' | 'export';
