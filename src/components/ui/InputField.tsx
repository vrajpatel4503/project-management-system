type InputFieldProps = {
  label: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function InputField({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}