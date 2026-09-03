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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_rate_limits: {
        Row: {
          rate_key: string
          request_count: number
          updated_at: string
          window_started_at: string
        }
        Insert: {
          rate_key: string
          request_count?: number
          updated_at?: string
          window_started_at?: string
        }
        Update: {
          rate_key?: string
          request_count?: number
          updated_at?: string
          window_started_at?: string
        }
        Relationships: []
      }
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
      babies: {
        Row: {
          birth_order: number
          created_at: string
          date_of_birth: string
          id: string
          is_primary: boolean
          name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          birth_order?: number
          created_at?: string
          date_of_birth: string
          id?: string
          is_primary?: boolean
          name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          birth_order?: number
          created_at?: string
          date_of_birth?: string
          id?: string
          is_primary?: boolean
          name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      baby_movement_notes: {
        Row: {
          created_at: string
          id: string
          noted_at: string
          notes: string | null
          pattern_label: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          noted_at?: string
          notes?: string | null
          pattern_label?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          noted_at?: string
          notes?: string | null
          pattern_label?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      birth_plans: {
        Row: {
          answers: Json
          completion: number
          created_at: string
          id: string
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          completion?: number
          created_at?: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          completion?: number
          created_at?: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      companion_conversations: {
        Row: {
          archived_at: string | null
          created_at: string
          id: string
          last_message_at: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          id?: string
          last_message_at?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          id?: string
          last_message_at?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      companion_memories: {
        Row: {
          category: Database["public"]["Enums"]["companion_memory_category"]
          created_at: string
          id: string
          normalised_value: string | null
          source: Database["public"]["Enums"]["companion_memory_source"]
          updated_at: string
          user_id: string
          value: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["companion_memory_category"]
          created_at?: string
          id?: string
          normalised_value?: string | null
          source: Database["public"]["Enums"]["companion_memory_source"]
          updated_at?: string
          user_id?: string
          value: string
        }
        Update: {
          category?: Database["public"]["Enums"]["companion_memory_category"]
          created_at?: string
          id?: string
          normalised_value?: string | null
          source?: Database["public"]["Enums"]["companion_memory_source"]
          updated_at?: string
          user_id?: string
          value?: string
        }
        Relationships: []
      }
      companion_messages: {
        Row: {
          client_message_id: string | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_message_id?: string | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_message_id?: string | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "companion_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "companion_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      contraction_events: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          session_id: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          session_id: string
          started_at: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          session_id?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contraction_events_session_id_user_id_fkey"
            columns: ["session_id", "user_id"]
            isOneToOne: false
            referencedRelation: "contraction_sessions"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      contraction_sessions: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          notes: string | null
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          notes?: string | null
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          notes?: string | null
          started_at?: string
          updated_at?: string
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
      first_year_care_events: {
        Row: {
          amount_ml: number | null
          baby_id: string
          created_at: string
          ended_at: string | null
          event_type: string
          feed_method: string | null
          id: string
          metadata: Json
          nappy_type: string | null
          note: string | null
          occurred_at: string
          side: string | null
          sleep_kind: string | null
          started_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_ml?: number | null
          baby_id: string
          created_at?: string
          ended_at?: string | null
          event_type: string
          feed_method?: string | null
          id?: string
          metadata?: Json
          nappy_type?: string | null
          note?: string | null
          occurred_at: string
          side?: string | null
          sleep_kind?: string | null
          started_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_ml?: number | null
          baby_id?: string
          created_at?: string
          ended_at?: string | null
          event_type?: string
          feed_method?: string | null
          id?: string
          metadata?: Json
          nappy_type?: string | null
          note?: string | null
          occurred_at?: string
          side?: string | null
          sleep_kind?: string | null
          started_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "first_year_care_events_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      first_year_entries: {
        Row: {
          answered: boolean
          baby_id: string | null
          created_at: string
          entry_date: string
          id: string
          kind: string
          lane: string
          note: string | null
          tags: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          answered?: boolean
          baby_id?: string | null
          created_at?: string
          entry_date: string
          id?: string
          kind: string
          lane: string
          note?: string | null
          tags?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          answered?: boolean
          baby_id?: string | null
          created_at?: string
          entry_date?: string
          id?: string
          kind?: string
          lane?: string
          note?: string | null
          tags?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "first_year_entries_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      first_year_journeys: {
        Row: {
          archived_pregnancy_journey_id: string | null
          source_pregnancy_lmp_date: string | null
          started_at: string
          status: Database["public"]["Enums"]["first_year_journey_status"]
          status_changed_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          archived_pregnancy_journey_id?: string | null
          source_pregnancy_lmp_date?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["first_year_journey_status"]
          status_changed_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          archived_pregnancy_journey_id?: string | null
          source_pregnancy_lmp_date?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["first_year_journey_status"]
          status_changed_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "first_year_journeys_archived_pregnancy_journey_id_fkey"
            columns: ["archived_pregnancy_journey_id"]
            isOneToOne: false
            referencedRelation: "archived_journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      first_year_memories: {
        Row: {
          baby_id: string | null
          created_at: string
          id: string
          memory_date: string
          memory_scope: string
          note: string
          photo_height: number | null
          photo_mime: string | null
          photo_path: string | null
          photo_size_bytes: number | null
          photo_width: number | null
          source_entry_id: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          baby_id?: string | null
          created_at?: string
          id?: string
          memory_date: string
          memory_scope?: string
          note: string
          photo_height?: number | null
          photo_mime?: string | null
          photo_path?: string | null
          photo_size_bytes?: number | null
          photo_width?: number | null
          source_entry_id?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          baby_id?: string | null
          created_at?: string
          id?: string
          memory_date?: string
          memory_scope?: string
          note?: string
          photo_height?: number | null
          photo_mime?: string | null
          photo_path?: string | null
          photo_size_bytes?: number | null
          photo_width?: number | null
          source_entry_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "first_year_memories_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "first_year_memories_source_entry_id_fkey"
            columns: ["source_entry_id"]
            isOneToOne: false
            referencedRelation: "first_year_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      first_year_reminders: {
        Row: {
          baby_id: string | null
          created_at: string
          due_at: string
          id: string
          label: string | null
          reminder_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          baby_id?: string | null
          created_at?: string
          due_at: string
          id?: string
          label?: string | null
          reminder_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          baby_id?: string | null
          created_at?: string
          due_at?: string
          id?: string
          label?: string | null
          reminder_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "first_year_reminders_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_bag_items: {
        Row: {
          category: string
          created_at: string
          id: string
          is_custom: boolean
          item_key: string
          label: string
          packed_at: string | null
          sort_order: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          is_custom?: boolean
          item_key: string
          label: string
          packed_at?: string | null
          sort_order?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_custom?: boolean
          item_key?: string
          label?: string
          packed_at?: string | null
          sort_order?: number
          updated_at?: string
          user_id?: string
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
      midwife_questions: {
        Row: {
          answer_notes: string | null
          answered: boolean
          appointment_id: string | null
          category: string
          created_at: string
          follow_up: boolean
          id: string
          question: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answer_notes?: string | null
          answered?: boolean
          appointment_id?: string | null
          category: string
          created_at?: string
          follow_up?: boolean
          id?: string
          question: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answer_notes?: string | null
          answered?: boolean
          appointment_id?: string | null
          category?: string
          created_at?: string
          follow_up?: boolean
          id?: string
          question?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pregnancy_appointments: {
        Row: {
          appointment_at: string | null
          appointment_type: string | null
          created_at: string
          follow_up: string | null
          id: string
          location: string | null
          notes: string | null
          questions: string | null
          updated_at: string
          user_id: string
          week: number | null
        }
        Insert: {
          appointment_at?: string | null
          appointment_type?: string | null
          created_at?: string
          follow_up?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          questions?: string | null
          updated_at?: string
          user_id: string
          week?: number | null
        }
        Update: {
          appointment_at?: string | null
          appointment_type?: string | null
          created_at?: string
          follow_up?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          questions?: string | null
          updated_at?: string
          user_id?: string
          week?: number | null
        }
        Relationships: []
      }
      pregnancy_journeys: {
        Row: {
          due_date: string
          lmp_date: string
          outcome_date: string | null
          started_at: string
          status: Database["public"]["Enums"]["pregnancy_journey_status"]
          status_changed_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          due_date: string
          lmp_date: string
          outcome_date?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["pregnancy_journey_status"]
          status_changed_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          due_date?: string
          lmp_date?: string
          outcome_date?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["pregnancy_journey_status"]
          status_changed_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pregnancy_symptom_notes: {
        Row: {
          created_at: string
          follow_up: string | null
          id: string
          mention_at_appointment: boolean
          noted_at: string
          notes: string | null
          personal_severity: number | null
          symptom_label: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          follow_up?: string | null
          id?: string
          mention_at_appointment?: boolean
          noted_at?: string
          notes?: string | null
          personal_severity?: number | null
          symptom_label: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          follow_up?: string | null
          id?: string
          mention_at_appointment?: boolean
          noted_at?: string
          notes?: string | null
          personal_severity?: number | null
          symptom_label?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          baby_illustration_style:
            | Database["public"]["Enums"]["baby_illustration_style"]
            | null
          companion_name: string | null
          companion_tone: string | null
          created_at: string
          first_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          baby_illustration_style?:
            | Database["public"]["Enums"]["baby_illustration_style"]
            | null
          companion_name?: string | null
          companion_tone?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          baby_illustration_style?:
            | Database["public"]["Enums"]["baby_illustration_style"]
            | null
          companion_name?: string | null
          companion_tone?: string | null
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
      week_media_memories: {
        Row: {
          caption: string | null
          created_at: string
          duration_seconds: number | null
          file_size_bytes: number
          id: string
          media_type: string
          mime_type: string
          storage_path: string
          updated_at: string
          user_id: string
          week: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_size_bytes: number
          id?: string
          media_type: string
          mime_type: string
          storage_path: string
          updated_at?: string
          user_id: string
          week: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_size_bytes?: number
          id?: string
          media_type?: string
          mime_type?: string
          storage_path?: string
          updated_at?: string
          user_id?: string
          week?: number
        }
        Relationships: []
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
      consume_ai_rate_limit: {
        Args: { p_key: string; p_limit: number; p_window_seconds: number }
        Returns: {
          allowed: boolean
          retry_after_seconds: number
        }[]
      }
      delete_active_journey: { Args: { p_lifecycle: string }; Returns: boolean }
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
      normalise_companion_memory: { Args: { p_value: string }; Returns: string }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      save_first_year_journey: { Args: { p_babies: Json }; Returns: undefined }
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
          p_period_length_days: number
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
      baby_illustration_style: "default" | "light" | "medium" | "deep"
      companion_memory_category:
        | "preference"
        | "personal_detail"
        | "plan"
        | "relationship"
        | "support_preference"
        | "other"
      companion_memory_source: "explicit_command" | "settings"
      first_year_journey_status: "active" | "paused" | "completed"
      pregnancy_journey_status:
        | "active"
        | "given_birth"
        | "no_longer_pregnant"
        | "pregnancy_loss"
        | "paused"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      baby_illustration_style: ["default", "light", "medium", "deep"],
      companion_memory_category: [
        "preference",
        "personal_detail",
        "plan",
        "relationship",
        "support_preference",
        "other",
      ],
      companion_memory_source: ["explicit_command", "settings"],
      first_year_journey_status: ["active", "paused", "completed"],
      pregnancy_journey_status: [
        "active",
        "given_birth",
        "no_longer_pregnant",
        "pregnancy_loss",
        "paused",
      ],
    },
  },
} as const
