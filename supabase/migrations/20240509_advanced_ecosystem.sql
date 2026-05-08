-- 1. Energy State Tracker
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS circadian_peak_hour INT DEFAULT 9,
  ADD COLUMN IF NOT EXISTS current_energy_level INT DEFAULT 50,
  ADD COLUMN IF NOT EXISTS energy_trend TEXT DEFAULT 'stable',
  ADD COLUMN IF NOT EXISTS last_break_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS sleep_duration_hours NUMERIC DEFAULT 7;

-- 2. Gravity Field System
CREATE TABLE IF NOT EXISTS public.gravity_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  gravity_weight NUMERIC DEFAULT 0,  -- 0-100, how much mental load
  altitude INT DEFAULT 0,  -- positioning in visual field
  orbital_status TEXT DEFAULT 'stationary',  -- 'ascending', 'orbiting', 'descending'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_gravity UNIQUE(user_id, task_id)
);

-- 3. Recovery Events
CREATE TABLE IF NOT EXISTS public.recovery_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recovery_type TEXT DEFAULT 'break',  -- 'break', 'walk', 'breathe', 'music', 'social'
  duration_minutes INT DEFAULT 5,
  effectiveness_rating INT,  -- 1-5 scale
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- 4. AI Coach History
CREATE TABLE IF NOT EXISTS public.ai_coach_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'user',  -- 'user' or 'assistant'
  content TEXT NOT NULL,
  conversation_id TEXT,  -- to group conversations
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Mental Wellness Metrics
CREATE TABLE IF NOT EXISTS public.wellness_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  metric_date DATE DEFAULT CURRENT_DATE,
  burnout_risk_score INT DEFAULT 0,  -- 0-100
  stress_level INT DEFAULT 0,  -- 1-5
  happiness_score INT DEFAULT 0,  -- 1-10
  sleep_quality INT DEFAULT 0,  -- 1-5
  medication TEXT,  -- what helped
  notes TEXT,
  CONSTRAINT unique_metrics UNIQUE(user_id, metric_date)
);

-- 6. Anti-Gravity Events (track weight being lifted)
CREATE TABLE IF NOT EXISTS public.lift_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT DEFAULT 'task_completed',  -- 'task_completed', 'loop_cleared', 'email_triaged'
  weight_removed NUMERIC DEFAULT 0,  -- cognitive load removed
  visual_effect TEXT DEFAULT 'upward_float',  -- animation type
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_gravity_fields_user_id ON public.gravity_fields(user_id);
CREATE INDEX IF NOT EXISTS idx_recovery_events_user_id ON public.recovery_events(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_coach_user_id ON public.ai_coach_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_wellness_user_id ON public.wellness_metrics(user_id);
