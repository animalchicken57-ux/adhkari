-- ============================================================
--  أذكاري — مخطط قاعدة البيانات (Supabase / PostgreSQL)
--  شغّل هذا الملف كاملاً في: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ------------------------------------------------------------
-- 1) جدول الملفات الشخصية (profiles)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- إنشاء ملف شخصي تلقائيًا عند تسجيل مستخدم جديد
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 2) كتالوج الأذكار (adhkar)
-- ------------------------------------------------------------
create table if not exists public.adhkar (
  id int primary key,
  category text not null check (category in ('morning','evening')),
  title text not null,
  body text not null,
  repeat int not null default 1,
  virtue text,
  sort_order int not null default 0
);

alter table public.adhkar enable row level security;

drop policy if exists "adhkar_readable" on public.adhkar;
create policy "adhkar_readable" on public.adhkar
  for select using (true);

-- ------------------------------------------------------------
-- 3) سجلّ إتمام الأذكار (dhikr_completions)
-- ------------------------------------------------------------
create table if not exists public.dhikr_completions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  adhkar_id int not null references public.adhkar(id) on delete cascade,
  day date not null default current_date,
  created_at timestamptz default now(),
  unique (user_id, adhkar_id, day)
);

alter table public.dhikr_completions enable row level security;

drop policy if exists "completions_select_own" on public.dhikr_completions;
create policy "completions_select_own" on public.dhikr_completions
  for select using (auth.uid() = user_id);

drop policy if exists "completions_insert_own" on public.dhikr_completions;
create policy "completions_insert_own" on public.dhikr_completions
  for insert with check (auth.uid() = user_id);

drop policy if exists "completions_delete_own" on public.dhikr_completions;
create policy "completions_delete_own" on public.dhikr_completions
  for delete using (auth.uid() = user_id);

create index if not exists idx_completions_user_day
  on public.dhikr_completions(user_id, day);

-- ------------------------------------------------------------
-- 4) تذاكر الدعم/التواصل (support_tickets)
-- ------------------------------------------------------------
create table if not exists public.support_tickets (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  category text not null default 'general',
  message text not null,
  status text not null default 'open',
  created_at timestamptz default now()
);

alter table public.support_tickets enable row level security;

drop policy if exists "tickets_select_own" on public.support_tickets;
create policy "tickets_select_own" on public.support_tickets
  for select using (auth.uid() = user_id);

drop policy if exists "tickets_insert_own" on public.support_tickets;
create policy "tickets_insert_own" on public.support_tickets
  for insert with check (auth.uid() = user_id);

-- ============================================================
--  بذور الأذكار (Seed) — أذكار الصباح والمساء
-- ============================================================
insert into public.adhkar (id, category, title, body, repeat, virtue, sort_order) values
-- ---------- أذكار الصباح ----------
(1,  'morning', 'آية الكرسي',
 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
 1, 'من قالها حين يُصبح أُجير من الجنّ حتى يُمسي.', 1),
(2,  'morning', 'سورة الإخلاص',
 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.',
 3, 'من قالها ثلاثًا كفته من كل شيء.', 2),
(3,  'morning', 'سورة الفلق',
 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِنْ شَرِّ مَا خَلَقَ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
 3, 'حِرزٌ بإذن الله من كل شر.', 3),
(4,  'morning', 'سورة الناس',
 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ.',
 3, 'حِرزٌ بإذن الله من الوسواس.', 4),
(5,  'morning', 'أصبحنا وأصبح الملك لله',
 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ.',
 1, null, 5),
(6,  'morning', 'اللهم بك أصبحنا',
 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.',
 1, null, 6),
(7,  'morning', 'سيّد الاستغفار',
 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
 1, 'من قالها موقنًا بها فمات من يومه دخل الجنّة.', 7),
(8,  'morning', 'اللهم عافني في بدني',
 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ.',
 3, 'دعاءٌ بالعافية.', 8),
(9,  'morning', 'حسبي الله لا إله إلا هو',
 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.',
 7, 'من قالها سبعًا كفاه الله ما أهمّه.', 9),
(10, 'morning', 'بسم الله الذي لا يضر مع اسمه شيء',
 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
 3, 'لم يضرّه شيء بإذن الله.', 10),
(11, 'morning', 'رضيت بالله ربًّا',
 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.',
 3, 'كان حقًّا على الله أن يُرضيه يوم القيامة.', 11),
(12, 'morning', 'لا إله إلا الله وحده لا شريك له',
 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
 10, 'كانت له عدل عشر رقاب.', 12),
(13, 'morning', 'سبحان الله وبحمده',
 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
 100, 'من قالها مائة مرة حُطّت خطاياه وإن كانت مثل زبد البحر.', 13),
(14, 'morning', 'الصلاة على النبي ﷺ',
 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.',
 10, 'من صلّى عليّ عشرًا حين يُصبح وحين يُمسي أدركته شفاعتي يوم القيامة.', 14),
(15, 'morning', 'الاستغفار',
 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.',
 3, 'خير الاستغفار وطريق مغفرة الذنوب.', 15),
-- ---------- أذكار المساء ----------
(51, 'evening', 'آية الكرسي',
 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
 1, 'من قالها حين يُمسي أُجير من الجنّ حتى يُصبح.', 1),
(52, 'evening', 'سورة الإخلاص',
 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.',
 3, 'من قالها ثلاثًا كفته من كل شيء.', 2),
(53, 'evening', 'سورة الفلق',
 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِنْ شَرِّ مَا خَلَقَ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
 3, 'حِرزٌ بإذن الله من كل شر.', 3),
(54, 'evening', 'سورة الناس',
 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ.',
 3, 'حِرزٌ بإذن الله من الوسواس.', 4),
(55, 'evening', 'أمسينا وأمسى الملك لله',
 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا.',
 1, null, 5),
(56, 'evening', 'اللهم بك أمسينا',
 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.',
 1, null, 6),
(57, 'evening', 'سيّد الاستغفار',
 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
 1, 'من قالها موقنًا بها فمات من ليلته دخل الجنّة.', 7),
(58, 'evening', 'اللهم عافني في بدني',
 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ.',
 3, 'دعاءٌ بالعافية.', 8),
(59, 'evening', 'حسبي الله لا إله إلا هو',
 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.',
 7, 'من قالها سبعًا كفاه الله ما أهمّه.', 9),
(60, 'evening', 'بسم الله الذي لا يضر مع اسمه شيء',
 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
 3, 'لم يضرّه شيء بإذن الله.', 10),
(61, 'evening', 'رضيت بالله ربًّا',
 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.',
 3, 'كان حقًّا على الله أن يُرضيه يوم القيامة.', 11),
(62, 'evening', 'لا إله إلا الله وحده لا شريك له',
 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
 10, 'كانت له عدل عشر رقاب.', 12),
(63, 'evening', 'سبحان الله وبحمده',
 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
 100, 'من قالها مائة مرة حُطّت خطاياه وإن كانت مثل زبد البحر.', 13),
(64, 'evening', 'الصلاة على النبي ﷺ',
 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.',
 10, 'من صلّى عليّ عشرًا حين يُصبح وحين يُمسي أدركته شفاعتي يوم القيامة.', 14),
(65, 'evening', 'الاستغفار',
 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.',
 3, 'خير الاستغفار وطريق مغفرة الذنوب.', 15)
on conflict (id) do update set
  category   = excluded.category,
  title      = excluded.title,
  body       = excluded.body,
  repeat     = excluded.repeat,
  virtue     = excluded.virtue,
  sort_order = excluded.sort_order;
