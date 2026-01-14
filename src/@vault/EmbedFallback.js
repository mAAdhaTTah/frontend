'use client';

export const EmbedError = ({ error }) => {
  return (
    <div className="font-ovo text-xl font-bold">
      Error loading embed: {error.message}
    </div>
  );
};
