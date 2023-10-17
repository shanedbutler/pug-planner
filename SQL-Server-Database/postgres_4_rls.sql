ALTER TABLE public.game_roster ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Game Roster authenticated users access" 
  ON public.game_roster
  AS PERMISSIVE FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Games authenticated users access" 
  ON public.games
  AS PERMISSIVE FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles authenticated users access" 
  ON public.profiles
  AS PERMISSIVE FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Positions authenticated users access" 
  ON public.positions
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (true);

ALTER TABLE public.pronouns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pronouns authenticated users access" 
  ON public.pronouns
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (true);