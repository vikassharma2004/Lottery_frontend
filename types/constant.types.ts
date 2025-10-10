export type SettingItem = {
  title: string;
  icon: string;
  role: 'user' | 'admin';
  navigate?: string; // path to navigate
};
export type Payment = {
  id: string;
  amount: number;
  date: string;       // ISO string
  method: string;     // e.g., "UPI", "Card"
  status: "success" | "pending" | "failed";
};
