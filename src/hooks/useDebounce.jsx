import { useState, useEffect } from "react";



export const useDebounce = (value, delay = 300) => {

    const [debounced, setDebounced] = useState('')
  
    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler)
    }, [value, delay])
  
    return debounced

  }