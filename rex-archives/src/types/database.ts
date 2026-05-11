export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      memories: {
        Row: {
          id: string;
          created_at: string;
          user_id: string | null;
          type: "image" | "video" | "audio";
          media_url: string;
          thumbnail_url: string | null;
          transcript: string | null;
          user_text_testimonial: string | null;
          metadata: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          type: "image" | "video" | "audio";
          media_url: string;
          thumbnail_url?: string | null;
          transcript?: string | null;
          user_text_testimonial?: string | null;
          metadata?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          type?: "image" | "video" | "audio";
          media_url?: string;
          thumbnail_url?: string | null;
          transcript?: string | null;
          user_text_testimonial?: string | null;
          metadata?: Json;
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
