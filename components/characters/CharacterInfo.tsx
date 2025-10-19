interface CharacterInfoProps {
  label: string;
  content: string;
}
export default function CharacterInfo({ label, content }: CharacterInfoProps) {
  return (
    <div className="text-lg text-center font-semibold dark:text-white border-1 p-2 rounded-md">
      <span className="block text-gray-600 text-sm uppercase dark:text-gray-500 mb-1">
        {label}
      </span>
      <span className="block">{content} </span>
    </div>
  );
}
