import { PosterElement } from '../../types';
import { cn } from '../../../../lib/utils';

const colorClassMap = {
  'black-100': 'text-black-100',
  'white-default': 'text-white-default',
  red: 'text-red',
  blue: 'text-blue',
  green: 'text-green',
} as const;

interface TextElementProps {
  element: PosterElement;
  isSelected: boolean;
  onTextChange: (id: string, value: string) => void;
  updateElement: (id: string, updates: Partial<PosterElement>) => void;
}

export function TextElement({ element, isSelected, onTextChange, updateElement }: TextElementProps) {
  if (isSelected) {
    return (
      <textarea
        value={element.content}
        placeholder='Type your text here'
        className={cn('w-full h-full p-2 outline-none', colorClassMap[element.color || 'black-100'])}
        onChange={e => onTextChange(element.id, e.target.value)}
        onBlur={() => updateElement(element.id, { isEditing: false })}
        autoFocus
        style={{ fontSize: `${element.fontSize}px` }}
      />
    );
  }

  return (
    <p
      className={cn(colorClassMap[element.color || 'black-100'])}
      style={{
        fontSize: `${element.fontSize}px`,
        wordWrap: 'break-word',
        textAlign: 'center',
      }}
    >
      {element.content || 'Type your text here'}
    </p>
  );
}
