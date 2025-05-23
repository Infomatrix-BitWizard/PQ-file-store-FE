export interface IFolder {
  id: string;
  name: string;
  user_id?: string;
  group_id?: string | null;
  create_date?: string;
  update_date?: string;
}
