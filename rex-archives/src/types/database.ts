export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      memories: {
        Row: {
          id: string;
          created_at: string;
          type: "photo" | "video" | "audio" | null;
          url: string | null;
          title: string | null;
          description: string | null;
          category: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          type?: "photo" | "video" | "audio" | null;
          url?: string | null;
          title?: string | null;
          description?: string | null;
          category?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          type?: "photo" | "video" | "audio" | null;
          url?: string | null;
          title?: string | null;
          description?: string | null;
          category?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
