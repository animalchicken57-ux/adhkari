/** ترويسة موحّدة لكل الصفحات — أيقونة، عنوان، وصف، وفاصل زخرفي */
export default function PageHeader({
  icon,
  title,
  subtitle,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8 text-center">
      {icon && (
        <div className="text-5xl" aria-hidden>
          {icon}
        </div>
      )}
      <h1 className="page-title mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-xl leading-relaxed text-[var(--muted)]">
          {subtitle}
        </p>
      )}
      <div className="title-rule" aria-hidden>
        ❁
      </div>
    </header>
  );
}
