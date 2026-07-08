interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

export default function PageHeader({
  badge,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header>
      {badge && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
          {badge}
        </p>
      )}

      <h1 className="text-4xl font-bold text-blue-950">{title}</h1>

      {description && (
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">{description}</p>
      )}
    </header>
  );
}
