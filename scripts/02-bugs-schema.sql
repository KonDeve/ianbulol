-- Bugs table for tracking bugs and errors
create table public.bugs (
  id text not null,
  game_id text not null,
  description text not null,
  screenshot_url text null,
  status text not null default 'open',
  created_at bigint not null,
  updated_at bigint not null default (
    (
      EXTRACT(
        epoch
        from
          now()
      )
    )::bigint * 1000
  ),
  constraint bugs_pkey primary key (id),
  constraint bugs_game_id_fkey foreign KEY (game_id) references games (id) on delete CASCADE,
  constraint bugs_status_check check (
    (
      status = any (
        array[
          'open'::text,
          'in-progress'::text,
          'done'::text,
          'wont-fix'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_bugs_game_id on public.bugs using btree (game_id) TABLESPACE pg_default;
create index IF not exists idx_bugs_created_at on public.bugs using btree (created_at desc) TABLESPACE pg_default;
create index IF not exists idx_bugs_status on public.bugs using btree (status) TABLESPACE pg_default;
