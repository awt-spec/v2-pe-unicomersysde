CREATE TABLE public.chat_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert chat logs"
ON public.chat_logs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can read chat logs"
ON public.chat_logs
FOR SELECT
USING (false);