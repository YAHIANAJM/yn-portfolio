-- Run this in your Supabase SQL editor (Dashboard → SQL Editor)

-- 1. Create table
CREATE TABLE IF NOT EXISTS testimonials (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  last_name   TEXT NOT NULL DEFAULT '',
  gender      TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  avatar_url  TEXT NOT NULL DEFAULT '',
  comment     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row-level security (allow public read + insert)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read"   ON testimonials FOR SELECT TO anon USING (true);
CREATE POLICY "public_insert" ON testimonials FOR INSERT TO anon WITH CHECK (true);

-- 3. Seed — 10 comments about the portfolio itself
INSERT INTO testimonials (name, last_name, gender, avatar_url, comment, created_at) VALUES
(
  'Karim', 'B.', 'male',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Karim&backgroundColor=b6e3f4',
  'The animations on this portfolio are next level. I have visited hundreds of dev portfolios and this one actually made me stop scrolling.',
  NOW() - INTERVAL '10 days'
),
(
  'Salma', 'R.', 'female',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Salma&backgroundColor=ffdfbf',
  'I love how the music player is built right into the header. Such a subtle detail that completely changes the vibe of the whole site.',
  NOW() - INTERVAL '9 days'
),
(
  'Adam', 'L.', 'male',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Adam&backgroundColor=c0aede',
  'The typography choices here are insane. Every section feels designed, not just coded. You can tell Yahia thinks like a designer first.',
  NOW() - INTERVAL '8 days'
),
(
  'Nour', 'M.', 'female',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Nour&backgroundColor=d1f4d1',
  'This portfolio is proof that you can have personality and professionalism at the same time. The fashion section was a nice surprise.',
  NOW() - INTERVAL '7 days'
),
(
  'Youssef', 'K.', 'male',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Youssef&backgroundColor=ffd5dc',
  'The scroll experience is buttery smooth. No jank, no weird transitions — just clean motion design done right. Bookmarked it immediately.',
  NOW() - INTERVAL '6 days'
),
(
  'Ines', 'C.', 'female',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Ines&backgroundColor=ffd5dc',
  'That hero section hooked me in the first five seconds. The layered depth effect with the portrait image is genuinely creative.',
  NOW() - INTERVAL '5 days'
),
(
  'Mehdi', 'A.', 'male',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Mehdi&backgroundColor=b6e3f4',
  'Not many devs can pull off a dark-luxury aesthetic without it feeling overdone. The vintage cream and cherry palette is perfect.',
  NOW() - INTERVAL '4 days'
),
(
  'Lina', 'T.', 'female',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Lina&backgroundColor=c0aede',
  'I came for the dev work and stayed for the outfits section. This site shows a full person, not just a list of skills. Refreshing.',
  NOW() - INTERVAL '3 days'
),
(
  'Omar', 'H.', 'male',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Omar&backgroundColor=d1f4d1',
  'The custom cursor is such a small touch but it elevates the whole experience. Every micro-interaction feels intentional.',
  NOW() - INTERVAL '2 days'
),
(
  'Amira', 'S.', 'female',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Amira&backgroundColor=ffdfbf',
  'I sent this to my whole team as a reference. This is how you build a personal brand through a portfolio — every pixel earns its place.',
  NOW() - INTERVAL '1 day'
);
