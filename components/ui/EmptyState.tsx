import type { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Card className="mt-12 p-10 text-center">
      <h2 className="text-2xl font-bold text-blue-950">{title}</h2>

      <p className="mt-3 text-slate-600">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}
