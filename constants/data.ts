import { SettingItem } from '@/types/constant.types';
import { Payment } from '@/types/constant.types';
// 🧍 USER SETTINGS
export const userSettings: SettingItem[] = [
  {
    title: 'Profile',
    icon: 'person-outline',
    role: 'user',
    navigate:'/ContactDetails'
  },
  {
    title: 'Wallet',
    icon: 'wallet-outline',
    role: 'user',
    navigate:'/Wallet'
  },
  {
    title: 'Payment History',
    icon: 'time-outline',
    role: 'user',
     navigate:'/PaymentHistory'
  },
  {
    title: 'Change Password',
    icon: 'key-outline',
    role: 'user',
     navigate:'/ChangePassword'
  },
  {
    title: 'Report Issue',
    icon: 'alert-circle-outline',
    role: 'user',
     navigate:'/ReportIssue'
  },
];



// ✅ COMBINED EXPORT (optional)
export const settings: SettingItem[] = [...userSettings];

const payments: Payment[] = [
  { id: "1", amount: 500, date: "2025-10-09T12:00:00Z", method: "UPI", status: "success" },
  { id: "2", amount: 250, date: "2025-10-08T15:30:00Z", method: "hee", status: "success" },
  { id: "3", amount: 100, date: "2025-10-07T09:20:00Z", method: "UPI", status: "pending" },
];
export default payments;