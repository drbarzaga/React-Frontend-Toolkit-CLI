export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  commandToInstall?: string;
  tags?: string[];
  github?: string;
}

export interface ToolsData {
  [category: string]: Tool[];
}
