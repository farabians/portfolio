@echo off
echo Degisiklikler kontrol ediliyor...
git add .
echo.

set /p commit_message=Guncelleme mesajini yazin: 
git commit -m "%commit_message%"
echo.

echo GitHub'a gönderiliyor...
git push
echo.

echo Islem tamamlandı!
pause 