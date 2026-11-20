export function normalizeTags(value) {
  const values = Array.isArray(value) ? value : [value ?? ""];
  return [
    ...new Set(
      values
        .flatMap((tag) => String(tag).split(","))
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ];
}
