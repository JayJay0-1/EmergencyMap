# EmergencyMap

Aplikacja internetowa przedstawijąca rozmieszczenie jednostek służb ratowniczyc na terenie powiatu Wałeckiego. 
Działa ona po przez pobieranie danych z bazy danych za pomocą serwera (skryptu Python wraz modułem Flask) i przesłaniem ich do aplikacji. 
Znajdują się tu również funkcje analizy sieciowej np. wybierz najszybszą drogę.

# Wykorzystane wtyczki Leaflet: 
- Sidebar: https://github.com/Turbo87/leaflet-sidebar
- Stylizacja poligonów (pattern): https://github.com/teastman/Leaflet.pattern?tab=readme-ov-file
- Icon Layer: https://github.com/ScanEx/Leaflet-IconLayers

# Uruchomienie aplikacji:
  1. Wczytanie bazy danych w Pg admin 4
  2. Ustawić połącznie bazy z serwerem w pliku app.py (linia 12)
  4. Uruchomić skrypt app.py
  5. Serwer rozpoczął pracę na porcie 5000
