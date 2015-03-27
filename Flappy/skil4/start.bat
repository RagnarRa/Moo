SET OLDDIR=%CD%
call grunt compass
CD %OLDDIR%
call grunt server
CD %OLDDIR%
SET OLDDIR=
