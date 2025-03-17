export type UserType = {
  id: string;
  first_name: string;
  last_name?: string;
  password?: string;
  email?: string;
  is_active?: number;
  phone?: string;
  profile_pic?: string;
  document_id?: number;
  rol_id?: string;
  plan_id_plan?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
