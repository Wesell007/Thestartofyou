select p.proname, p.prosecdef, p.proconfig, pg_get_userbyid(p.proowner) owner,
  coalesce((select bool_or(a.grantee = 0) from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a where a.privilege_type='EXECUTE'), false) public_execute
from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' order by 1;
