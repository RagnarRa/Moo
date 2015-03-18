SET OLDDIR=%CD%
call npm install
CD %OLDDIR%
call bower install
CD %OLDDIR%
call grunt
CD %OLDDIR%
call runhttpserver.bat
SET OLDDIR=
