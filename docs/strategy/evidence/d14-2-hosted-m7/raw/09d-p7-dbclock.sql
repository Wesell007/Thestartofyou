-- P7 bring-forward evaluated in database time (same-transaction now()): next_attempt_at must equal analytics_resolved_at
select id, status, user_id is null anonymised, analytics_persons_found, analytics_resolved_at, next_attempt_at,
       next_attempt_at = analytics_resolved_at as brought_forward_to_resolution_now,
       next_attempt_at >= final_sweep_after as not_before_window,
       now() - clock_timestamp() as _ , clock_timestamp() db_clock
from private.account_deletion_requests where id = '74af678e-f954-42d6-8791-fb5082167a1f';
