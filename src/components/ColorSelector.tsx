interface ColorSelectorProps {
  colors: { name: string; value: string }[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelector = ({ colors, selectedColor, onColorChange }: ColorSelectorProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-inter font-medium text-foreground">Cor</h4>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              relative w-8 h-8 rounded-full border-2 transition-all duration-200
              ${selectedColor === color.value 
                ? 'border-primary scale-110' 
                : 'border-border hover:border-muted-foreground'
              }
            `}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor === color.value && (
              <div className="absolute inset-0 rounded-full border-2 border-background" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;