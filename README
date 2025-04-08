# Supplier Evaluation Dashboard

Dieses Projekt bietet eine Webanwendung zur Verwaltung von Lieferanten und Bewertungen. Das Backend ist mit Django und Django REST Framework entwickelt, das Frontend mit React.

## Inhaltsverzeichnis
1. [Projektstruktur](#projektstruktur)
2. [Backend einrichten](#backend-einrichten)
3. [Frontend einrichten](#frontend-einrichten)
4. [Datei-Uploads (CSV) für Lieferantenbewertungen](#datei-upload)
5. [Technologien](#technologien)

---

## Projektstruktur

### Backend:
- **`backend/`**
  - **`supplier/`**
    - **`models.py`**: Definiert Modelle für Lieferanten und Bewertungen.
    - **`serializers.py`**: Serialisiert Daten für die API-Endpunkte.
    - **`views.py`**: Logik für die API-Endpunkte.
    - **`urls.py`**: Definiert URLs für die API-Endpunkte.
  - **`manage.py`**: Django-Server starten und Migrationen ausführen.
  - **`db.sqlite3`**: SQLite-Datenbank.

### Frontend:
- **`frontend/`**
  - **`src/`**
    - **`components/`**: Formulare, Listen, Upload-Formulare.
    - **`pages/`**: Seitenkomponenten.
    - **`services/`**: API-Kommunikation.
  - **`package.json`**: JavaScript-Abhängigkeiten.

---

## Backend einrichten

1. **Virtuelle Umgebung erstellen:**

   ```bash
   python -m venv env
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Datenbankmigrationen ausführen:**

   ```bash
   python manage.py migrate
   ```

4. **Server starten:**

   ```bash
   python manage.py runserver
   ```

   Das Backend ist nun unter `http://localhost:8000` verfügbar.

---

## Frontend einrichten

1. **Node.js und npm installieren:** 

   [Node.js herunterladen](https://nodejs.org/).

2. **Abhängigkeiten installieren:**

   ```bash
   cd frontend
   npm install
   ```

3. **Frontend starten:**

   ```bash
   npm start
   ```

   Das Frontend ist nun unter `http://localhost:3000` verfügbar.

---

## Datei-Uploads (CSV) für Lieferantenbewertungen

1. **CSV-Datei Format:**

   | evaluation_score | evaluation_comment |
   |------------------|--------------------|
   | 85               | Gute Lieferung     |
   | 90               | Sehr zufrieden     |

2. **Schritte:**
   - Wähle die CSV-Datei aus.
   - Klicke auf "Datei hochladen", um die Daten zu senden. Falls der Lieferant existiert, wird die Bewertung hinzugefügt. Andernfalls wird der Lieferant erstellt.

---

## Technologien

- **Backend:** Django, Django REST Framework
- **Frontend:** React, Ant Design
- **Datenbank:** SQLite
- **CSV-Parser:** PapaParse
- **API:** JSON REST API
