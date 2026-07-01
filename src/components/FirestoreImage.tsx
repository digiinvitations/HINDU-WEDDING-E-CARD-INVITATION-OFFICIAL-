import React, { useState, useEffect } from "react";
import { fetchFromFsdb } from "../lib/fsdb";

export function FirestoreImage(props: React.ComponentProps<"img">) {
  const { src, ...rest } = props;
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(src);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src && src.startsWith("fsdb://")) {
      setLoading(true);
      setError(false);
      fetchFromFsdb(src).then(base64 => {
        if (!base64) {
          setError(true);
        } else {
          setResolvedSrc(base64);
        }
        setLoading(false);
      });
    } else {
      setResolvedSrc(src);
      setError(!src);
    }
  }, [src]);

  if (loading) {
    return (
      <div 
        className={`animate-pulse bg-pink-100 flex items-center justify-center ${props.className || ''}`}
        style={props.style}
      >
        <span className="text-xs text-pink-300">Loading...</span>
      </div>
    );
  }

  if (error || !resolvedSrc) {
    return (
      <div 
        className={`bg-gray-100 flex flex-col items-center justify-center border border-gray-200 ${props.className || ''}`}
        style={props.style}
      >
        <span className="text-xs text-gray-400">Image Unavailable</span>
      </div>
    );
  }

  return <img src={resolvedSrc} {...rest} onError={() => setError(true)} />;
}
