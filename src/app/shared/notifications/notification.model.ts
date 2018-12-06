export class Notification {
  id: number;
  label: string;
  description: string;
  type: string;
  viewed: boolean;
  data?: {
    type: string;
    id: number;
  };
}
