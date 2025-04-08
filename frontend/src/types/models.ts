// Modell für einen Lieferanten
export interface Supplier {
    id: number;
    name: string;
  }
  
  // Modell für eine Bewertung (wie sie vom Backend zurückkommt)
  export interface SupplierEvaluation {
    id: number;
    supplier: Supplier;
    evaluation_score: number;
    evaluation_date: string; // im ISO-Format, z. B. "2025-04-07"
    comments: string;
  }
  
  // Modell für das Erstellen oder Aktualisieren einer Bewertung (ohne verschachteltes Objekt)
  export interface SupplierEvaluationCreate {
    supplier_id: number;
    evaluation_score: number;
    evaluation_date: string;
    comments: string;
  }
  