import { cn } from '../../lib/utils';

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-24 h-24',
  xxl: 'w-72 h-72',
} as const;

const fillClasses = {
  default: 'fill-black-75',
  primary: 'fill-primary',
  alert: 'fill-red',
  success: 'fill-green-400',
  warning: 'fill-yellow-400',
} as const;

export interface IconBaseProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  size?: keyof typeof sizeClasses;
  fill?: keyof typeof fillClasses;
  className?: string;
  children: React.ReactNode;
}

export interface IconProps extends Omit<IconBaseProps, 'children'> {}

export function IconBase({
  size = 'md',
  fill = 'default',
  className = '',
  children,
  viewBox = '0 0 32 32',
  ...props
}: IconBaseProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox}
      className={cn(sizeClasses[size], fillClasses[fill], className)}
      {...props}
    >
      {children}
    </svg>
  );
}
