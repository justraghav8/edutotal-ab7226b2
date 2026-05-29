export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      careers: {
        Row: {
          apply_email: string
          created_at: string | null
          description: string
          id: string
          job_title: string
          location: string | null
          published: boolean | null
          qualifications: Json | null
          responsibilities: Json | null
          updated_at: string | null
        }
        Insert: {
          apply_email: string
          created_at?: string | null
          description: string
          id?: string
          job_title: string
          location?: string | null
          published?: boolean | null
          qualifications?: Json | null
          responsibilities?: Json | null
          updated_at?: string | null
        }
        Update: {
          apply_email?: string
          created_at?: string | null
          description?: string
          id?: string
          job_title?: string
          location?: string | null
          published?: boolean | null
          qualifications?: Json | null
          responsibilities?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          order_index: number | null
          published: boolean | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          order_index?: number | null
          published?: boolean | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          order_index?: number | null
          published?: boolean | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          service_interest: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          service_interest?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          service_interest?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          image_url: string
          order_index: number | null
          published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          order_index?: number | null
          published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          order_index?: number | null
          published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hero_banners: {
        Row: {
          background_image_url: string | null
          created_at: string | null
          cta_primary_link: string | null
          cta_primary_text: string | null
          cta_secondary_link: string | null
          cta_secondary_text: string | null
          id: string
          page_key: string
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string | null
          cta_primary_link?: string | null
          cta_primary_text?: string | null
          cta_secondary_link?: string | null
          cta_secondary_text?: string | null
          id?: string
          page_key: string
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          background_image_url?: string | null
          created_at?: string | null
          cta_primary_link?: string | null
          cta_primary_text?: string | null
          cta_secondary_link?: string | null
          cta_secondary_text?: string | null
          id?: string
          page_key?: string
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      industries: {
        Row: {
          content_box: string | null
          created_at: string | null
          description: string
          focus_areas: Json | null
          how_we_support: string | null
          icon_key: string | null
          id: string
          image_url: string | null
          order_index: number | null
          published: boolean | null
          slug: string
          tagline: string | null
          title: string
          updated_at: string | null
          whats_happening: Json | null
        }
        Insert: {
          content_box?: string | null
          created_at?: string | null
          description: string
          focus_areas?: Json | null
          how_we_support?: string | null
          icon_key?: string | null
          id?: string
          image_url?: string | null
          order_index?: number | null
          published?: boolean | null
          slug: string
          tagline?: string | null
          title: string
          updated_at?: string | null
          whats_happening?: Json | null
        }
        Update: {
          content_box?: string | null
          created_at?: string | null
          description?: string
          focus_areas?: Json | null
          how_we_support?: string | null
          icon_key?: string | null
          id?: string
          image_url?: string | null
          order_index?: number | null
          published?: boolean | null
          slug?: string
          tagline?: string | null
          title?: string
          updated_at?: string | null
          whats_happening?: Json | null
        }
        Relationships: []
      }
      industry_services: {
        Row: {
          id: string
          industry_id: string
          service_id: string
        }
        Insert: {
          id?: string
          industry_id: string
          service_id: string
        }
        Update: {
          id?: string
          industry_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "industry_services_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "industry_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      insights: {
        Row: {
          author: string | null
          body: string
          cover_image_url: string | null
          created_at: string | null
          excerpt: string
          featured: boolean | null
          id: string
          publish_date: string | null
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          type: Database["public"]["Enums"]["insight_type"]
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          body: string
          cover_image_url?: string | null
          created_at?: string | null
          excerpt: string
          featured?: boolean | null
          id?: string
          publish_date?: string | null
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          type: Database["public"]["Enums"]["insight_type"]
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          body?: string
          cover_image_url?: string | null
          created_at?: string | null
          excerpt?: string
          featured?: boolean | null
          id?: string
          publish_date?: string | null
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          type?: Database["public"]["Enums"]["insight_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          approach: Json | null
          benefits: Json | null
          category: Database["public"]["Enums"]["service_category"]
          created_at: string | null
          domestic_expertise: string | null
          icon_key: string | null
          id: string
          image_url: string | null
          international_expertise: string | null
          order_index: number | null
          overview: string
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          approach?: Json | null
          benefits?: Json | null
          category: Database["public"]["Enums"]["service_category"]
          created_at?: string | null
          domestic_expertise?: string | null
          icon_key?: string | null
          id?: string
          image_url?: string | null
          international_expertise?: string | null
          order_index?: number | null
          overview: string
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          approach?: Json | null
          benefits?: Json | null
          category?: Database["public"]["Enums"]["service_category"]
          created_at?: string | null
          domestic_expertise?: string | null
          icon_key?: string | null
          id?: string
          image_url?: string | null
          international_expertise?: string | null
          order_index?: number | null
          overview?: string
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          accent_color: string | null
          business_hours: string | null
          careers_email: string | null
          contact_address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          logo_url: string | null
          primary_color: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_links: Json | null
          social_twitter: string | null
          social_youtube: string | null
          tagline: string
          updated_at: string | null
        }
        Insert: {
          accent_color?: string | null
          business_hours?: string | null
          careers_email?: string | null
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_links?: Json | null
          social_twitter?: string | null
          social_youtube?: string | null
          tagline?: string
          updated_at?: string | null
        }
        Update: {
          accent_color?: string | null
          business_hours?: string | null
          careers_email?: string | null
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_links?: Json | null
          social_twitter?: string | null
          social_youtube?: string | null
          tagline?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          biography: string
          category: Database["public"]["Enums"]["team_category"]
          created_at: string | null
          designation: string
          email: string | null
          id: string
          linkedin_url: string | null
          name: string
          order_index: number | null
          photo_url: string | null
          published: boolean | null
          show_email: boolean | null
          show_linkedin: boolean | null
          updated_at: string | null
        }
        Insert: {
          biography: string
          category: Database["public"]["Enums"]["team_category"]
          created_at?: string | null
          designation: string
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          order_index?: number | null
          photo_url?: string | null
          published?: boolean | null
          show_email?: boolean | null
          show_linkedin?: boolean | null
          updated_at?: string | null
        }
        Update: {
          biography?: string
          category?: Database["public"]["Enums"]["team_category"]
          created_at?: string | null
          designation?: string
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          order_index?: number | null
          photo_url?: string | null
          published?: boolean | null
          show_email?: boolean | null
          show_linkedin?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          created_at: string | null
          id: string
          logo_url: string | null
          organization: string | null
          photo_url: string | null
          published: boolean | null
          quote: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          organization?: string | null
          photo_url?: string | null
          published?: boolean | null
          quote: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          organization?: string | null
          photo_url?: string | null
          published?: boolean | null
          quote?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
      insight_type:
        | "Thought Leadership"
        | "Case Study"
        | "Whitepaper"
        | "Blog"
        | "Event"
      service_category:
        | "Institution Development & Internationalisation"
        | "Human Resources & Recruitment"
        | "Corporate Consulting, M&A & Regulation"
        | "Financial & Legal Services"
        | "Digital Learning & Innovation"
        | "Educational Real Estate & Campus Development"
        | "Media, Branding & PR"
        | "Testing & Examination Services"
        | "Conferences & Workshops"
        | "Country Office"
      team_category: "Leadership" | "Advisory" | "Staff" | "Team"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
      insight_type: [
        "Thought Leadership",
        "Case Study",
        "Whitepaper",
        "Blog",
        "Event",
      ],
      service_category: [
        "Institution Development & Internationalisation",
        "Human Resources & Recruitment",
        "Corporate Consulting, M&A & Regulation",
        "Financial & Legal Services",
        "Digital Learning & Innovation",
        "Educational Real Estate & Campus Development",
        "Media, Branding & PR",
        "Testing & Examination Services",
        "Conferences & Workshops",
        "Country Office",
      ],
      team_category: ["Leadership", "Advisory", "Staff", "Team"],
    },
  },
} as const
