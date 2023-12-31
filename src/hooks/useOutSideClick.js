import { useEffect, useRef } from "react";

export function useOutSideClick(handler, listenerCapturing = true){
    const ref = useRef();

    useEffect(function(){
      function clickHandler(e){
        if(ref.current && !ref.current.contains(e.target))
        handler()
      }
  
      document.addEventListener('click', clickHandler, listenerCapturing)
  
      return ()=> document.removeEventListener('click', clickHandler, listenerCapturing);
    },[handler])
    
    return ref;
}