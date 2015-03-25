SET OLDDIR=%CD%
call npm install
CD %OLDDIR%
call bower install
CD %OLDDIR%
call grunt compass
CD %OLDDIR%
call grunt server
SET OLDDIR=
