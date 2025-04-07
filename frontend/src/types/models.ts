export interface Supplier {
    id: number;
    name: string;
    //TODO: contact
}

export interface SupplierEvaluation {
    id: number;
    supplier: Supplier;
    evaluation_score: number;
    evaluation_date: string;          // ISO-Datum, z. B. "2025-04-07"
    comments: string;
}
  