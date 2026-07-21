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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      archived_journeys: {
        Row: {
          ended_at: string
          ended_reason: string
          id: string
          lifecycle: string
          snapshot: Json
          started_at: string
          user_id: string
        }
        Insert: {
          ended_at?: string
          ended_reason: string
          id?: string
          lifecycle: string
          snapshot: Json
          started_at: string
          user_id: string
        }
        Update: {
          ended_at?: string
          ended_reason?: string
          id?: string
          lifecycle?: string
          snapshot?: Json
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      journeys: {
        Row: {
          lifecycle: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          lifecycle: string
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          lifecycle?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pregnancy_journeys: {
        Row: {
          due_date: string
          lmp_date: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          due_date: string
          lmp_date: string
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          due_date?: string
          lmp_date?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reflections: {
        Row: {
          content: string
          created_at: string
          first_written_at: string | null
          first_written_content: string | null
          id: string
          updated_at: string
          user_id: string
          week: number
        }
        Insert: {
          content?: string
          created_at?: string
          first_written_at?: string | null
          first_written_content?: string | null
          id?: string
          updated_at?: string
          user_id: string
          week: number
        }
        Update: {
          content?: string
          created_at?: string
          first_written_at?: string | null
          first_written_content?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          week?: number
        }
        Relationships: []
      }
      saved_journeys: {
        Row: {
          created_at: string
          due_date: string
          id: string
          journey_type: string
          lmp_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          due_date: string
          id?: string
          journey_type?: string
          lmp_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          due_date?: string
          id?: string
          journey_type?: string
          lmp_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      ttc_journeys: {
        Row: {
          actively_trying: string | null
          current_cycle_start: string | null
          cycle_length_days: number | null
          cycle_regularity: string | null
          expected_period_date: string | null
          fertile_window_end: string | null
          fertile_window_start: string | null
          id: string
          ivf_consideration: string | null
          last_period_date: string | null
          likely_ovulation_date: string | null
          period_length_days: number | null
          positive_test_status: string | null
          possible_test_date: string | null
          stage: string | null
          started_at: string
          support_status: string | null
          tracks_symptoms: string | null
          updated_at: string
          user_id: string
          uses_ovulation_tests: string | null
        }
        Insert: {
          actively_trying?: string | null
          current_cycle_start?: string | null
          cycle_length_days?: number | null
          cycle_regularity?: string | null
          expected_period_date?: string | null
          fertile_window_end?: string | null
          fertile_window_start?: string | null
          id?: string
          ivf_consideration?: string | null
          last_period_date?: string | null
          likely_ovulation_date?: string | null
          period_length_days?: number | null
          positive_test_status?: string | null
          possible_test_date?: string | null
          stage?: string | null
          started_at?: string
          support_status?: string | null
          tracks_symptoms?: string | null
          updated_at?: string
          user_id: string
          uses_ovulation_tests?: string | null
        }
        Update: {
          actively_trying?: string | null
          current_cycle_start?: string | null
          cycle_length_days?: number | null
          cycle_regularity?: string | null
          expected_period_date?: string | null
          fertile_window_end?: string | null
          fertile_window_start?: string | null
          id?: string
          ivf_consideration?: string | null
          last_period_date?: string | null
          likely_ovulation_date?: string | null
          period_length_days?: number | null
          positive_test_status?: string | null
          possible_test_date?: string | null
          stage?: string | null
          started_at?: string
          support_status?: string | null
          tracks_symptoms?: string | null
          updated_at?: string
          user_id?: string
          uses_ovulation_tests?: string | null
        }
        Relationships: []
      }
      ttc_logs: {
        Row: {
          created_at: string
          id: string
          journey_id: string
          log_date: string
          log_type: string
          notes: string | null
          updated_at: string
          user_id: string
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          journey_id: string
          log_date: string
          log_type: string
          notes?: string | null
          updated_at?: string
          user_id: string
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          journey_id?: string
          log_date?: string
          log_type?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ttc_logs_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "ttc_journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      week_photos: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          storage_path: string
          updated_at: string
          user_id: string
          week: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          storage_path: string
          updated_at?: string
          user_id: string
          week: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          storage_path?: string
          updated_at?: string
          user_id?: string
          week?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_active_journey: {
        Args: { p_lifecycle: string }
        Returns: boolean
      }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      save_pregnancy_journey: {
        Args: { p_due_date: string; p_lmp_date: string }
        Returns: undefined
      }
      save_ttc_journey: {
        Args: {
          p_actively_trying: string
          p_cycle_length_days: number
          p_cycle_regularity: string
          p_expected_period_date: string
          p_fertile_window_end: string
          p_fertile_window_start: string
          p_ivf_consideration: string
          p_last_period_date: string
          p_likely_ovulation_date: string
          p_period_length_days: number | null
          p_possible_test_date: string
          p_stage: string
          p_support_status: string
          p_tracks_symptoms: string
          p_uses_ovulation_tests: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
