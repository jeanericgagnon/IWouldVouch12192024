import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";

interface RoleInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  error: string | null;
}

export function RoleInput({
  value,
  onChange,
  onAdd,
  error
}: RoleInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter role (e.g., Senior Software Engineer)"
          className={error ? 'border-red-500' : ''}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onAdd();
            }
          }}
        />
        <Button 
          type="button"
          onClick={onAdd}
          className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
        >
          Add
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}