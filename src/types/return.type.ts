export type ServerResponse<T = never> =
  | { success: true; error: null; data?: T }
  | { success: false; error: string }
