-- ============================================
-- KEKERE FORUM SEED DATA
-- Realistic Nigerian parenting community
-- ============================================

DO $$
DECLARE
  -- User IDs (we'll create these)
  ada_id UUID;
  chiamaka_id UUID;
  ifeanyi_id UUID;
  ngozi_id UUID;
  tunde_id UUID;
  
  -- Topic IDs
  pregnancy_topic UUID;
  newborn_topic UUID;
  feeding_topic UUID;
  sleep_topic UUID;
  development_topic UUID;
  behavior_topic UUID;
  health_topic UUID;
  activities_topic UUID;
  
  -- Question IDs
  q1_id UUID;
  q2_id UUID;
  q3_id UUID;
  q4_id UUID;
  q5_id UUID;
  q6_id UUID;
  q7_id UUID;
  q8_id UUID;
  q9_id UUID;
  q10_id UUID;
  
BEGIN
  -- ============================================
  -- CREATE DUMMY USERS IN AUTH
  -- Note: These need to be created in auth.users first
  -- For now, we'll generate UUIDs and you'll need to manually create these users via signup
  -- ============================================
  
  ada_id := gen_random_uuid();
  chiamaka_id := gen_random_uuid();
  ifeanyi_id := gen_random_uuid();
  ngozi_id := gen_random_uuid();
  tunde_id := gen_random_uuid();
  
  -- Insert into auth.users (This requires admin privileges)
  -- We'll skip this and just use your existing user
  
  -- Get your actual logged-in user
  SELECT id INTO ada_id FROM public.users LIMIT 1;
  
  IF ada_id IS NULL THEN
    RAISE EXCEPTION 'Please log in first and create your profile!';
  END IF;
  
  -- We'll use your user for all seed data for now
  chiamaka_id := ada_id;
  ifeanyi_id := ada_id;
  ngozi_id := ada_id;
  tunde_id := ada_id;

  -- Get topic IDs
  SELECT id INTO pregnancy_topic FROM public.topics WHERE name = 'Feeding'; -- Using Feeding as proxy for Pregnancy
  SELECT id INTO newborn_topic FROM public.topics WHERE name = 'Development'; -- Proxy for Newborn
  SELECT id INTO sleep_topic FROM public.topics WHERE name = 'Sleep';
  SELECT id INTO feeding_topic FROM public.topics WHERE name = 'Feeding';
  SELECT id INTO development_topic FROM public.topics WHERE name = 'Development';
  SELECT id INTO behavior_topic FROM public.topics WHERE name = 'Behavior';
  SELECT id INTO health_topic FROM public.topics WHERE name = 'Health';
  SELECT id INTO activities_topic FROM public.topics WHERE name = 'Activities';

  -- ============================================
  -- PREGNANCY & FERTILITY QUESTIONS
  -- ============================================

  -- Q1: Morning sickness
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'What are some safe ways to manage morning sickness?',
    'I''m in my first trimester and struggling with nausea all day. What remedies worked for you without harming the baby?',
    pregnancy_topic, chiamaka_id, NOW() - INTERVAL '3 days'
  ) RETURNING id INTO q1_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('I found ginger tea really helped, plus small frequent meals throughout the day instead of big ones.',
     q1_id, ada_id, NOW() - INTERVAL '2 days'),
    ('Resting often and staying hydrated worked for me. Also avoid strong smells that trigger nausea.',
     q1_id, ngozi_id, NOW() - INTERVAL '1 day');

  -- Q2: Tracking pregnancy
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How can I track my pregnancy milestones?',
    'I want to keep track of important dates, symptoms, and baby movements. What''s the best way to do this in Nigeria?',
    pregnancy_topic, chiamaka_id, NOW() - INTERVAL '5 days'
  ) RETURNING id INTO q2_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('I used a simple calendar to mark doctor visits and when I felt baby kicks. Works perfectly!',
     q2_id, ada_id, NOW() - INTERVAL '4 days'),
    ('Apps are helpful, but honestly a notebook works too and doesn''t need data or charging.',
     q2_id, tunde_id, NOW() - INTERVAL '3 days');

  -- Q3: Pregnancy fatigue
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'Tips for handling pregnancy fatigue?',
    'I''m exhausted all the time, even after sleeping. How did you manage tiredness during pregnancy while still working?',
    pregnancy_topic, chiamaka_id, NOW() - INTERVAL '1 week'
  ) RETURNING id INTO q3_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Rest when you can, eat well, and accept help from family. Don''t try to be superwoman!',
     q3_id, ngozi_id, NOW() - INTERVAL '6 days'),
    ('Light exercise like short walks actually boosted my energy. Sounds counterintuitive but it works.',
     q3_id, ada_id, NOW() - INTERVAL '5 days');

  -- Q4: Food cravings
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How do I deal with food cravings safely?',
    'I''m craving fried plantain and ice cream at 2am! How do I satisfy cravings without gaining too much weight?',
    pregnancy_topic, chiamaka_id, NOW() - INTERVAL '4 days'
  ) RETURNING id INTO q4_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Moderation is key. I swapped fried foods for baked alternatives most of the time.',
     q4_id, tunde_id, NOW() - INTERVAL '3 days'),
    ('Small portions of cravings worked for me without overindulging. Listen to your body!',
     q4_id, ada_id, NOW() - INTERVAL '2 days');

  -- ============================================
  -- NEWBORN CARE QUESTIONS
  -- ============================================

  -- Q5: Preparing home
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How do I prepare my home for a newborn?',
    'Baby coming in 2 months! What essentials should I have ready? I don''t want to over-buy or miss important items.',
    newborn_topic, ada_id, NOW() - INTERVAL '2 days'
  ) RETURNING id INTO q5_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Set up a safe sleeping area first, then stock up on diapers, clothes, and baby soap. Start with basics.',
     q5_id, ngozi_id, NOW() - INTERVAL '1 day'),
    ('Don''t forget baby wipes, swaddling blankets, and a good thermometer. You''ll use these daily!',
     q5_id, ifeanyi_id, NOW() - INTERVAL '18 hours');

  -- Q6: Soothing crying baby
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How do I soothe a crying baby?',
    'My 3-week-old cries a lot and I''ve tried everything. What techniques work when nothing else does?',
    newborn_topic, ada_id, NOW() - INTERVAL '6 hours'
  ) RETURNING id INTO q6_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Check if hungry, diaper is wet, too hot/cold, or just needs cuddling. Process of elimination helps.',
     q6_id, tunde_id, NOW() - INTERVAL '4 hours'),
    ('Rock gently and use white noise from phone or fan. It mimics the womb and works wonders!',
     q6_id, ngozi_id, NOW() - INTERVAL '2 hours');

  -- Q7: Sleep routine
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How do I create a sleep routine for my newborn?',
    'My baby sleeps randomly throughout the day and night. How do I establish a proper routine?',
    sleep_topic, ada_id, NOW() - INTERVAL '1 week'
  ) RETURNING id INTO q7_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Consistent nap times and bedtime routines are very helpful. Same time, same activities every day.',
     q7_id, ifeanyi_id, NOW() - INTERVAL '5 days'),
    ('Dim lights and quiet surroundings in the evening helped my baby understand night vs day.',
     q7_id, tunde_id, NOW() - INTERVAL '4 days');

  -- Q8: Unsolicited advice
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How do I deal with unsolicited parenting advice?',
    'Everyone has an opinion about how I should raise my baby! My mother-in-law, neighbors, even strangers. It''s overwhelming.',
    behavior_topic, ngozi_id, NOW() - INTERVAL '3 days'
  ) RETURNING id INTO q8_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Politely acknowledge advice with "thank you, I''ll consider it" but trust your instincts as the parent.',
     q8_id, chiamaka_id, NOW() - INTERVAL '2 days'),
    ('I usually thank them and smile, then follow what works for me and my baby. You know best!',
     q8_id, ada_id, NOW() - INTERVAL '1 day');

  -- Q9: Diaper changes
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How often should I change diapers?',
    'My baby is 2 weeks old. Should I wake her to change diapers or wait until she wakes naturally?',
    newborn_topic, ifeanyi_id, NOW() - INTERVAL '8 hours'
  ) RETURNING id INTO q9_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Every 2-3 hours during the day or when soiled works best. At night, only if poopy or very wet.',
     q9_id, ada_id, NOW() - INTERVAL '6 hours'),
    ('I check at night by touching the diaper. If not too wet, I let baby sleep. Babies are unpredictable!',
     q9_id, tunde_id, NOW() - INTERVAL '4 hours');

  -- Q10: Bonding with newborn
  INSERT INTO public.questions (title, content, topic_id, user_id, created_at) 
  VALUES (
    'How can I bond with my newborn?',
    'I''m a first-time dad and want to build a strong connection with my baby. What activities help with bonding?',
    newborn_topic, tunde_id, NOW() - INTERVAL '2 days'
  ) RETURNING id INTO q10_id;

  INSERT INTO public.answers (content, question_id, user_id, created_at) VALUES
    ('Skin-to-skin contact during feeding or nap time, and gentle play foster strong bonding.',
     q10_id, ngozi_id, NOW() - INTERVAL '1 day'),
    ('Talking and singing to your baby really helps them feel secure and recognize your voice.',
     q10_id, tunde_id, NOW() - INTERVAL '12 hours');

  -- ============================================
  -- ADD UPVOTES FOR REALISM
  -- ============================================

  -- Upvote popular questions
  INSERT INTO public.upvotes (user_id, question_id) VALUES
    (ada_id, q1_id),
    (ada_id, q6_id),
    (ada_id, q8_id),
    (ada_id, q10_id);

  -- Upvote helpful answers
  INSERT INTO public.upvotes (user_id, answer_id)
  SELECT ada_id, id FROM public.answers WHERE question_id IN (q1_id, q2_id, q6_id, q7_id) LIMIT 6;

  RAISE NOTICE '✅ Seed data created successfully!';
  RAISE NOTICE '📝 10 questions created';
  RAISE NOTICE '💬 20 answers created';
  RAISE NOTICE '👍 10 upvotes created';

END $$;