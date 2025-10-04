'use client';

export const EmbedError = ({ message }) => {
  return (
    <div className="font-ovo text-xl font-bold">
      Error loading embed: {message}
    </div>
  );
};
