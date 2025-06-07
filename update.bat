@echo off
echo Değişiklikler kontrol ediliyor...
git add .
echo.

set /p commit_message=Güncelleme mesajını yazın: 
git commit -m "%commit_message%"
echo.

echo GitHub'a gönderiliyor...
git push
echo.

echo İşlem tamamlandı!
pause 