import { useState } from "react";
import { Copy } from "lucide-react";

export default function CopyButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div>
      <button onClick={handleCopy} className="p-2 transition-colors">
        {isCopied ? (
          <span className="font-semibold text-emerald-900 text-opacity-80">Copied Group Code!</span>
        ) : (
          <div>
            <span className="font-semibold text-emerald-900 text-opacity-80">
              {textToCopy}
            </span>
            <Copy className="w-4 h-4 text-emerald-900/80 place-self-center" />
          </div>
        )}
      </button>
    </div>
  );
}
