interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-inter font-medium text-foreground">Tamanho</h4>
      <div className="flex space-x-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`
              px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200
              ${selectedSize === size
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:border-muted-foreground'
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;